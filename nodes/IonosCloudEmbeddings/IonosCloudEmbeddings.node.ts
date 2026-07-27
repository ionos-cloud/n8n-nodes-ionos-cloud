import {
	NodeConnectionTypes,
	NodeOperationError,
	type INodeType,
	type INodeTypeDescription,
	type ISupplyDataFunctions,
	type SupplyData,
} from 'n8n-workflow';
import { USER_AGENT } from '../../utils/userAgent';

const IONOS_OPENAI_BASE_URL = 'https://openai.inference.de-txl.ionos.com/v1';

// This is an AI sub-node: it supplies an ai_embedding via supplyData() and must NOT be
// usableAsTool. n8n throws "Node already has a `supplyData` method" when it tries to
// tool-wrap a node that already defines supplyData (see n8n NodeTypes.getByNameAndVersion).
export class IonosCloudEmbeddings implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IONOS Cloud Embeddings',
		name: 'ionosCloudEmbeddings',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		description: 'Use IONOS Cloud AI Model Hub to generate text embeddings',
		subtitle: '={{$parameter["model"]}}',
		defaults: {
			name: 'IONOS Cloud Embeddings',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Embeddings'],
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
		outputs: [NodeConnectionTypes.AiEmbedding],
		outputNames: ['Embeddings'],
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
					'The embedding model to use from IONOS AI Model Hub. The list is fetched live from the IONOS API.',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Batch Size',
						name: 'batchSize',
						type: 'number',
						default: 512,
						typeOptions: { minValue: 1 },
						description: 'Maximum number of texts to embed in a single request',
					},
					{
						displayName: 'Strip Newlines',
						name: 'stripNewLines',
						type: 'boolean',
						default: true,
						description: 'Whether to strip newlines from the input text before embedding',
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 60000,
						description: 'Maximum time in milliseconds to wait for a response',
					},
				],
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions): Promise<SupplyData> {
		const model = this.getNodeParameter('model', 0) as string;
		const options = this.getNodeParameter('options', 0, {}) as {
			batchSize?: number;
			stripNewLines?: boolean;
			timeout?: number;
		};
		const batchSize = Math.max(1, Math.floor(options.batchSize ?? 512));
		const stripNewLines = options.stripNewLines ?? true;
		const timeout = options.timeout ?? 60000;
		const node = this.getNode();

		const embedBatch = async (texts: string[]): Promise<number[][]> => {
			const input = stripNewLines ? texts.map((text) => text.replace(/\n/g, ' ')) : texts;
			const response = (await this.helpers.httpRequestWithAuthentication.call(
				this,
				'ionosCloudApi',
				{
					method: 'POST',
					baseURL: IONOS_OPENAI_BASE_URL,
					url: '/embeddings',
					body: { model, input },
					headers: {
						'User-Agent': USER_AGENT,
					},
					json: true,
					timeout,
				},
			)) as { data: Array<{ embedding: number[]; index: number }> };

			return response.data
				.sort((first, second) => first.index - second.index)
				.map((item) => item.embedding);
		};

		const embeddings = {
			async embedDocuments(documents: string[]): Promise<number[][]> {
				const vectors: number[][] = [];
				for (let start = 0; start < documents.length; start += batchSize) {
					vectors.push(...(await embedBatch(documents.slice(start, start + batchSize))));
				}
				return vectors;
			},
			async embedQuery(document: string): Promise<number[]> {
				const [vector] = await embedBatch([document]);
				if (!vector) {
					throw new NodeOperationError(node, 'IONOS embeddings API returned no embedding vector');
				}
				return vector;
			},
		};

		return { response: embeddings };
	}
}
