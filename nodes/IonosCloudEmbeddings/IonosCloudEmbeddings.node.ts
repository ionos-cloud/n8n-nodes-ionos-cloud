import type {
	INodeType,
	INodeTypeDescription,
	ISupplyDataFunctions,
	SupplyData,
} from 'n8n-workflow';
import { USER_AGENT } from '../../utils/userAgent';

declare function require(module: string): unknown;

const IONOS_OPENAI_BASE_URL = 'https://openai.inference.de-txl.ionos.com/v1';

export class IonosCloudEmbeddings implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'IONOS Cloud Embeddings',
		name: 'ionosCloudEmbeddings',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		description: 'Use IONOS Cloud AI Model Hub to generate text embeddings',
		defaults: {
			name: 'IONOS Cloud Embeddings',
		},
		usableAsTool: true,
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
		outputs: ['ai_embedding'],
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
		const credentials = await this.getCredentials('ionosCloudApi');
		const model = this.getNodeParameter('model', 0) as string;
		const options = this.getNodeParameter('options', 0, {}) as {
			batchSize?: number;
			stripNewLines?: boolean;
			timeout?: number;
		};

		// @langchain/openai is provided by n8n at runtime via @n8n/n8n-nodes-langchain
		// eslint-disable-next-line @n8n/community-nodes/no-restricted-imports
		const { OpenAIEmbeddings } = require('@langchain/openai') as {
			OpenAIEmbeddings: new (config: Record<string, unknown>) => unknown;
		};

		const embeddings = new OpenAIEmbeddings({
			apiKey: credentials.accessToken as string,
			model,
			batchSize: options.batchSize ?? 512,
			stripNewLines: options.stripNewLines ?? true,
			timeout: options.timeout,
			configuration: {
				baseURL: IONOS_OPENAI_BASE_URL,
				defaultHeaders: {
					'User-Agent': USER_AGENT,
				},
			},
		});

		return { response: embeddings };
	}
}
