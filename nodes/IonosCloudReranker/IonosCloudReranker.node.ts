import {
	NodeConnectionTypes,
	NodeOperationError,
	type IDataObject,
	type INodeType,
	type INodeTypeDescription,
	type ISupplyDataFunctions,
	type SupplyData,
} from 'n8n-workflow';
import { USER_AGENT } from '../../utils/userAgent';

const IONOS_OPENAI_BASE_URL = 'https://openai.inference.de-txl.ionos.com/v1';

// The LangChain document shape that n8n's vector store nodes pass to a reranker
type RerankerDocument = {
	pageContent: string;
	metadata?: IDataObject;
	id?: string;
};

// This is an AI sub-node: it supplies an ai_reranker via supplyData() and must NOT be
// usableAsTool. n8n throws "Node already has a `supplyData` method" when it tries to
// tool-wrap a node that already defines supplyData (see n8n NodeTypes.getByNameAndVersion).
export class IonosCloudReranker implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IONOS Cloud Reranker',
		name: 'ionosCloudReranker',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		description:
			'Use IONOS Cloud AI Model Hub to rerank documents retrieved from a vector store by relevance to the query',
		subtitle: '={{$parameter["model"]}}',
		defaults: {
			name: 'IONOS Cloud Reranker',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Rerankers'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.ionos.com/cloud/managed-services/ai-model-hub',
					},
				],
			},
		},
		inputs: [],
		outputs: [NodeConnectionTypes.AiReranker],
		outputNames: ['Reranker'],
		credentials: [
			{
				name: 'ionosCloudApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: IONOS_OPENAI_BASE_URL,
			headers: {
				'User-Agent': USER_AGENT,
			},
		},
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				required: true,
				typeOptions: {
					loadOptions: {
						routing: {
							request: {
								method: 'GET',
								url: '/models',
								baseURL: IONOS_OPENAI_BASE_URL,
							},
							output: {
								postReceive: [
									{
										type: 'rootProperty',
										properties: {
											property: 'data',
										},
									},
									{
										type: 'setKeyValue',
										properties: {
											name: '={{$responseItem.id}}',
											value: '={{$responseItem.id}}',
										},
									},
									{
										type: 'sort',
										properties: {
											key: 'name',
										},
									},
								],
							},
						},
					},
				},
				default: '',
				description:
					'The reranking model to use from IONOS AI Model Hub, e.g. Qwen/Qwen3-VL-Reranker-8B. The list is fetched live from the IONOS API.',
			},
			{
				displayName: 'Top N',
				name: 'topN',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 3,
				description: 'The maximum number of documents to return after reranking',
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		const model = this.getNodeParameter('model', itemIndex) as string;
		const topN = this.getNodeParameter('topN', itemIndex, 3) as number;

		const rerank = async (
			documents: RerankerDocument[],
			query: string,
		): Promise<RerankerDocument[]> => {
			if (documents.length === 0) {
				return [];
			}
			const response = (await this.helpers.httpRequestWithAuthentication.call(
				this,
				'ionosCloudApi',
				{
					method: 'POST',
					baseURL: IONOS_OPENAI_BASE_URL,
					url: '/rerank',
					body: {
						model,
						query,
						documents: documents.map((document) => document.pageContent),
						top_n: topN,
					},
					headers: {
						'User-Agent': USER_AGENT,
					},
					json: true,
				},
			)) as { results: Array<{ index: number; relevance_score: number }> };

			// Results arrive sorted by relevance, each pointing back to its input by index.
			// The vector store nodes read the score from metadata.relevanceScore.
			return response.results.map(({ index, relevance_score }) => ({
				...documents[index],
				metadata: { ...documents[index].metadata, relevanceScore: relevance_score },
			}));
		};

		// n8n's vector store nodes only call compressDocuments() on a reranker
		const reranker = {
			compressDocuments: async (
				documents: RerankerDocument[],
				query: string,
			): Promise<RerankerDocument[]> => {
				// Record the call on this node so the editor shows its input and output,
				// as n8n's own rerankers do
				const { index } = this.addInputData(NodeConnectionTypes.AiReranker, [
					[{ json: { query, documents } }],
				]);
				try {
					const response = await rerank(documents, query);
					this.addOutputData(NodeConnectionTypes.AiReranker, index, [[{ json: { response } }]]);
					return response;
				} catch (error) {
					const nodeError = new NodeOperationError(this.getNode(), error as Error, {
						functionality: 'configuration-node',
					});
					this.addOutputData(NodeConnectionTypes.AiReranker, index, nodeError);
					throw nodeError;
				}
			},
		};

		return { response: reranker };
	}
}
