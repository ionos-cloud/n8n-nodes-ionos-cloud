import type {
	INodeType,
	INodeTypeDescription,
	ISupplyDataFunctions,
	SupplyData,
} from 'n8n-workflow';
import { USER_AGENT } from '../../utils/userAgent';

declare function require(module: string): unknown;

const IONOS_OPENAI_BASE_URL = 'https://openai.inference.de-txl.ionos.com/v1';

// This is an AI sub-node: it supplies an ai_languageModel via supplyData() and must
// NOT be usableAsTool. n8n throws "Node already has a `supplyData` method" when it tries
// to tool-wrap a node that already defines supplyData (see n8n NodeTypes.getByNameAndVersion).
// The pinned local lint plugin (@n8n/eslint-plugin-community-nodes@0.7.0) still demands the
// property; the version n8n Cloud's scanner uses (0.23.0+) already exempts AI sub-nodes.
// eslint-disable-next-line @n8n/community-nodes/node-usable-as-tool
export class IonosCloudChatModel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IONOS Cloud Chat Model',
		name: 'ionosCloudChatModel',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		description: 'Use IONOS Cloud AI Model Hub as a chat language model',
		defaults: {
			name: 'IONOS Cloud Chat Model',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Language Models', 'Language Models (Chat)'],
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
		outputs: ['ai_languageModel'],
		outputNames: ['Model'],
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
					'The model to use from IONOS AI Model Hub. The list is fetched live from the IONOS API.',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Frequency Penalty',
						name: 'frequencyPenalty',
						type: 'number',
						default: 0,
						typeOptions: { minValue: -2, maxValue: 2, numberStepSize: 0.1 },
						description:
							'Penalizes new tokens based on their frequency in the text so far (-2.0 to 2.0)',
					},
					{
						displayName: 'Maximum Number of Tokens',
						name: 'maxTokens',
						type: 'number',
						default: -1,
						typeOptions: { minValue: -1, numberStepSize: 1 },
						description: 'Maximum number of tokens to generate. Set to -1 for model default.',
					},
					{
						displayName: 'Presence Penalty',
						name: 'presencePenalty',
						type: 'number',
						default: 0,
						typeOptions: { minValue: -2, maxValue: 2, numberStepSize: 0.1 },
						description:
							'Penalizes new tokens based on whether they appear in the text so far (-2.0 to 2.0)',
					},
					{
						displayName: 'Sampling Temperature',
						name: 'temperature',
						type: 'number',
						default: 0.7,
						typeOptions: { minValue: 0, maxValue: 2, numberStepSize: 0.1 },
						description:
							'Controls randomness. Lower values make output more focused and deterministic.',
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 60000,
						description: 'Maximum time in milliseconds to wait for a response',
					},
					{
						displayName: 'Top P',
						name: 'topP',
						type: 'number',
						default: 1,
						typeOptions: { minValue: 0, maxValue: 1, numberStepSize: 0.1 },
						description:
							'Nucleus sampling: only consider tokens with the top_p cumulative probability',
					},
				],
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions): Promise<SupplyData> {
		const credentials = await this.getCredentials('ionosCloudApi');
		const model = this.getNodeParameter('model', 0) as string;
		const options = this.getNodeParameter('options', 0, {}) as {
			frequencyPenalty?: number;
			maxTokens?: number;
			presencePenalty?: number;
			temperature?: number;
			timeout?: number;
			topP?: number;
		};

		// @n8n/ai-node-sdk is provided by n8n at runtime and is on the n8n Cloud allowlist
		// eslint-disable-next-line @n8n/community-nodes/no-restricted-imports
		const { supplyModel } = require('@n8n/ai-node-sdk') as {
			supplyModel: (
				ctx: ISupplyDataFunctions,
				modelConfig: {
					type: 'openai';
					baseUrl: string;
					apiKey: string;
					model: string;
					temperature?: number;
					maxTokens?: number;
					topP?: number;
					frequencyPenalty?: number;
					presencePenalty?: number;
					timeout?: number;
					defaultHeaders?: Record<string, string>;
				},
			) => SupplyData;
		};

		return supplyModel(this, {
			type: 'openai',
			baseUrl: IONOS_OPENAI_BASE_URL,
			apiKey: credentials.accessToken as string,
			model,
			temperature: options.temperature ?? 0.7,
			maxTokens: options.maxTokens === -1 ? undefined : options.maxTokens,
			topP: options.topP,
			frequencyPenalty: options.frequencyPenalty,
			presencePenalty: options.presencePenalty,
			timeout: options.timeout ?? 60000,
			defaultHeaders: {
				'User-Agent': USER_AGENT,
			},
		});
	}
}
