import type { INodeProperties } from 'n8n-workflow';

export const modelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['model'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve available AI models',
				action: 'Get many models',
				routing: {
					request: {
						method: 'GET',
						url: '/models',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'items',
								},
							},
						],
					},
				},
			},
			{
				name: 'Predict',
				value: 'predict',
				description: 'Send a request to an AI model and receive the result',
				action: 'Predict with model',
			},
		],
		default: 'getAll',
	},
];

const showForPredict = {
	resource: ['model'],
	operation: ['predict'],
};

export const modelDescriptions: INodeProperties[] = [
	// Predict operation
	{
		displayName: 'Model ID',
		name: 'modelId',
		type: 'string',
		required: true,
		displayOptions: { show: showForPredict },
		default: '',
		description: 'The ID of the model to use for prediction',
		routing: {
			request: {
				method: 'POST',
				url: '=/models/{{$value}}/predictions',
			},
		},
	},
	{
		displayName: 'Input',
		name: 'input',
		type: 'string',
		required: true,
		displayOptions: { show: showForPredict },
		default: '',
		typeOptions: {
			rows: 4,
		},
		description: 'The input text required for the model to run the prediction',
		routing: {
			send: {
				type: 'body',
				property: 'properties.input',
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'hidden',
		displayOptions: { show: showForPredict },
		default: 'prediction',
		routing: {
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForPredict },
		options: [
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				default: '',
				description: 'ID of the collection to use for RAG (Retrieval Augmented Generation)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.collectionId',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Collection Query',
				name: 'collectionQuery',
				type: 'string',
				default: '',
				description: 'Query to search the collection for relevant context',
				routing: {
					send: {
						type: 'body',
						property: 'properties.collectionQuery',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'fixedCollection',
				placeholder: 'Add Option',
				default: {},
				description: 'Model-specific options (e.g., temperature, max_length)',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'option',
						displayName: 'Option',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Option key (e.g., temperature, max_length)',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Option value',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.options',
						value: '={{ $value.option?.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {}) }}',
					},
				},
			},
		],
	},
];
