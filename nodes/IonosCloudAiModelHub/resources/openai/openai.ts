import type { INodeProperties } from 'n8n-workflow';

/**
 * Shared routing config to dynamically load available models from
 * the OpenAI-compatible GET /v1/models endpoint at runtime.
 * When IONOS adds or retires models the dropdown updates automatically.
 */
const modelsLoadOptions: INodeProperties['typeOptions'] = {
	loadOptions: {
		routing: {
			request: {
				method: 'GET',
				url: '/v1/models',
				baseURL: 'https://openai.inference.de-txl.ionos.com',
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
};

export const openaiOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['openai'],
			},
		},
		options: [
			{
				name: 'Chat Completion',
				value: 'chatCompletion',
				description: 'Create chat completions using OpenAI-compatible API',
				action: 'Create chat completion',
				routing: {
					request: {
						method: 'POST',
						url: '=/v1/chat/completions',
						baseURL: 'https://openai.inference.de-txl.ionos.com',
					},
				},
			},
			{
				name: 'Completion',
				value: 'completion',
				description: 'Create text completions using OpenAI-compatible API',
				action: 'Create completion',
				routing: {
					request: {
						method: 'POST',
						url: '=/v1/completions',
						baseURL: 'https://openai.inference.de-txl.ionos.com',
					},
				},
			},
			{
				name: 'Create Embeddings',
				value: 'embeddings',
				description: 'Create embedding vectors from text',
				action: 'Create embeddings',
				routing: {
					request: {
						method: 'POST',
						url: '=/v1/embeddings',
						baseURL: 'https://openai.inference.de-txl.ionos.com',
					},
				},
			},
			{
				name: 'Generate Image',
				value: 'generateImage',
				description: 'Generate images from text prompts',
				action: 'Generate image',
				routing: {
					request: {
						method: 'POST',
						url: '=/v1/images/generations',
						baseURL: 'https://openai.inference.de-txl.ionos.com',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'List available models in OpenAI-compatible format',
				action: 'Get many models',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/models',
						baseURL: 'https://openai.inference.de-txl.ionos.com',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
		],
		default: 'chatCompletion',
	},
];

export const openaiDescriptions: INodeProperties[] = [
	// Chat Completion fields
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['chatCompletion'],
			},
		},
		typeOptions: modelsLoadOptions,
		default: 'meta-llama/Llama-3.3-70B-Instruct',
		description: 'ID of the model to use for chat completions. The list is fetched live from the IONOS API.',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Messages',
		name: 'messages',
		type: 'fixedCollection',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['chatCompletion'],
			},
		},
		default: {},
		description: 'The messages to generate chat completions for',
		options: [
			{
				name: 'messageValues',
				displayName: 'Message',
				values: [
					{
						displayName: 'Role',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'System',
								value: 'system',
							},
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'Assistant',
								value: 'assistant',
							},
						],
						default: 'user',
						description: 'The role of the message',
					},
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						default: '',
						description: 'The content of the message',
						typeOptions: {
							rows: 4,
						},
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'messages',
				value: '={{ $value.messageValues }}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['chatCompletion'],
			},
		},
		options: [
			{
				displayName: 'Frequency Penalty',
				name: 'frequency_penalty',
				type: 'number',
				default: 0,
				description: 'Penalize new tokens based on their frequency in the text so far',
				routing: {
					send: {
						type: 'body',
						property: 'frequency_penalty',
					},
				},
			},
			{
				displayName: 'Logit Bias',
				name: 'logit_bias',
				type: 'json',
				default: '{}',
				description: 'Modify the probability of specific tokens appearing in the completion',
				routing: {
					send: {
						type: 'body',
						property: 'logit_bias',
					},
				},
			},
			{
				displayName: 'Max Completion Tokens',
				name: 'max_completion_tokens',
				type: 'number',
				default: 16,
				description: 'Maximum number of tokens to generate',
				routing: {
					send: {
						type: 'body',
						property: 'max_completion_tokens',
					},
				},
			},
			{
				displayName: 'Max Tokens',
				name: 'max_tokens',
				type: 'number',
				default: 16,
				description: 'Maximum number of tokens to generate (deprecated, use max_completion_tokens)',
				routing: {
					send: {
						type: 'body',
						property: 'max_tokens',
					},
				},
			},
			{
				displayName: 'Number of Completions',
				name: 'n',
				type: 'number',
				default: 1,
				description: 'Number of chat completion choices to generate',
				routing: {
					send: {
						type: 'body',
						property: 'n',
					},
				},
			},
			{
				displayName: 'Presence Penalty',
				name: 'presence_penalty',
				type: 'number',
				default: 0,
				description: 'Penalize new tokens based on their existence in the text so far',
				routing: {
					send: {
						type: 'body',
						property: 'presence_penalty',
					},
				},
			},
			{
				displayName: 'Response Format',
				name: 'response_format',
				type: 'json',
				default: '{}',
				description: 'Object specifying the format of the response (e.g., {"type": "json_object"})',
				routing: {
					send: {
						type: 'body',
						property: 'response_format',
					},
				},
			},
			{
				displayName: 'Stop',
				name: 'stop',
				type: 'string',
				default: '',
				description: 'Up to 4 sequences where the API will stop generating tokens (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'stop',
						value: '={{ $value.split(",").map(s => s.trim()) }}',
					},
				},
			},
			{
				displayName: 'Stream',
				name: 'stream',
				type: 'boolean',
				default: false,
				description: 'Whether to stream partial message deltas',
				routing: {
					send: {
						type: 'body',
						property: 'stream',
					},
				},
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				default: 1,
				description: 'Sampling temperature (0-2)',
				routing: {
					send: {
						type: 'body',
						property: 'temperature',
					},
				},
			},
			{
				displayName: 'Tool Choice',
				name: 'tool_choice',
				type: 'json',
				default: '{}',
				description: 'Controls which tool is called (none, auto, required, or specific function)',
				routing: {
					send: {
						type: 'body',
						property: 'tool_choice',
					},
				},
			},
			{
				displayName: 'Tools',
				name: 'tools',
				type: 'json',
				default: '[]',
				description: 'List of tools/functions the model may call (max 128)',
				routing: {
					send: {
						type: 'body',
						property: 'tools',
					},
				},
			},
			{
				displayName: 'Top P',
				name: 'top_p',
				type: 'number',
				default: 1,
				description: 'Alternative to sampling with temperature',
				routing: {
					send: {
						type: 'body',
						property: 'top_p',
					},
				},
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'Unique identifier for the end-user',
				routing: {
					send: {
						type: 'body',
						property: 'user',
					},
				},
			},
		],
	},
	// Completion fields
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['completion'],
			},
		},
		typeOptions: modelsLoadOptions,
		default: 'meta-llama/Llama-3.3-70B-Instruct',
		description: 'ID of the model to use for text completions. The list is fetched live from the IONOS API.',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['completion'],
			},
		},
		default: '',
		description: 'The prompt to generate completions from',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'prompt',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['completion'],
			},
		},
		options: [
			{
				displayName: 'Frequency Penalty',
				name: 'frequency_penalty',
				type: 'number',
				default: 0,
				description: 'Penalize new tokens based on their frequency',
				routing: {
					send: {
						type: 'body',
						property: 'frequency_penalty',
					},
				},
			},
			{
				displayName: 'Logit Bias',
				name: 'logit_bias',
				type: 'json',
				default: '{}',
				description: 'Modify the probability of specific tokens appearing in the completion',
				routing: {
					send: {
						type: 'body',
						property: 'logit_bias',
					},
				},
			},
			{
				displayName: 'Max Tokens',
				name: 'max_tokens',
				type: 'number',
				default: 16,
				description: 'Maximum number of tokens to generate',
				routing: {
					send: {
						type: 'body',
						property: 'max_tokens',
					},
				},
			},
			{
				displayName: 'Number of Completions',
				name: 'n',
				type: 'number',
				default: 1,
				description: 'Number of completions to generate',
				routing: {
					send: {
						type: 'body',
						property: 'n',
					},
				},
			},
			{
				displayName: 'Presence Penalty',
				name: 'presence_penalty',
				type: 'number',
				default: 0,
				description: 'Penalize new tokens based on their existence',
				routing: {
					send: {
						type: 'body',
						property: 'presence_penalty',
					},
				},
			},
			{
				displayName: 'Stop',
				name: 'stop',
				type: 'string',
				default: '',
				description: 'Sequences where the API will stop (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'stop',
						value: '={{ $value.split(",").map(s => s.trim()) }}',
					},
				},
			},
			{
				displayName: 'Stream',
				name: 'stream',
				type: 'boolean',
				default: false,
				description: 'Whether to stream partial deltas',
				routing: {
					send: {
						type: 'body',
						property: 'stream',
					},
				},
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				default: 1,
				description: 'Sampling temperature',
				routing: {
					send: {
						type: 'body',
						property: 'temperature',
					},
				},
			},
			{
				displayName: 'Top P',
				name: 'top_p',
				type: 'number',
				default: 1,
				description: 'Alternative to sampling with temperature',
				routing: {
					send: {
						type: 'body',
						property: 'top_p',
					},
				},
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'Unique identifier for the end-user',
				routing: {
					send: {
						type: 'body',
						property: 'user',
					},
				},
			},
		],
	},
	// Embeddings fields
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['embeddings'],
			},
		},
		typeOptions: modelsLoadOptions,
		default: 'BAAI/bge-large-en-v1.5',
		description: 'ID of the embedding model to use. The list is fetched live from the IONOS API.',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Input',
		name: 'input',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['embeddings'],
			},
		},
		default: '',
		description: 'Text to create embeddings for (or comma-separated for multiple)',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'input',
				value: '={{ $value.includes(",") ? $value.split(",").map(s => s.trim()) : $value }}',
			},
		},
	},
	// Image Generation fields
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['generateImage'],
			},
		},
		typeOptions: modelsLoadOptions,
		default: 'black-forest-labs/FLUX.1-schnell',
		description: 'ID of the image generation model to use. The list is fetched live from the IONOS API.',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['generateImage'],
			},
		},
		default: '',
		description: 'Text description of the desired image',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'prompt',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['openai'],
				operation: ['generateImage'],
			},
		},
		options: [
			{
				displayName: 'Number of Images',
				name: 'n',
				type: 'number',
				default: 1,
				description: 'Number of images to generate',
				routing: {
					send: {
						type: 'body',
						property: 'n',
					},
				},
			},
			{
				displayName: 'Response Format',
				name: 'response_format',
				type: 'options',
				options: [
					{
						name: 'Base64 JSON',
						value: 'b64_json',
					},
				],
				default: 'b64_json',
				description: 'Format of the response',
				routing: {
					send: {
						type: 'body',
						property: 'response_format',
					},
				},
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'options',
				options: [
					{
						name: '1024x1024',
						value: '1024x1024',
					},
					{
						name: '1024x1792',
						value: '1024x1792',
					},
					{
						name: '1792x1024',
						value: '1792x1024',
					},
				],
				default: '1024x1024',
				description: 'Size of the generated image',
				routing: {
					send: {
						type: 'body',
						property: 'size',
					},
				},
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'Unique identifier for the end-user',
				routing: {
					send: {
						type: 'body',
						property: 'user',
					},
				},
			},
		],
	},
];
