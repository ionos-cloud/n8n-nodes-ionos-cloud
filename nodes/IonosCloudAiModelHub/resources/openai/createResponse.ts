import type { INodeProperties } from 'n8n-workflow';
import { modelsLoadOptions } from './openai';

const showForCreateResponse = {
	resource: ['openai'],
	operation: ['createResponse'],
};

export const createResponseDescriptions: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: showForCreateResponse,
		},
		typeOptions: modelsLoadOptions,
		default: '',
		description:
			'ID of the model to use, e.g. openai/gpt-oss-120b. The list is fetched live from the IONOS API.',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForCreateResponse,
		},
		options: [
			{
				name: 'Text',
				value: 'text',
				description: 'A single user message',
			},
			{
				name: 'Input Items (JSON)',
				value: 'items',
				description:
					'An array of messages, images, and earlier tool calls with their results, for multi-turn conversations',
			},
		],
		default: 'text',
	},
	{
		displayName: 'Input',
		name: 'input',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				...showForCreateResponse,
				inputType: ['text'],
			},
		},
		default: '',
		description: 'The user message to respond to',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'input',
			},
		},
	},
	{
		displayName: 'Input Items',
		name: 'inputItems',
		type: 'json',
		required: true,
		// Parses the JSON text into an array, and rejects anything that is not one
		validateType: 'array',
		displayOptions: {
			show: {
				...showForCreateResponse,
				inputType: ['items'],
			},
		},
		default: '[]',
		description:
			'JSON array of input items, e.g. [{"role": "user", "content": "Hello"}]. The API keeps no conversation state, so send the whole conversation every time, including earlier function_call and function_call_output items. An image is a content part such as {"type": "input_image", "image_url": "https://example.com/image.png"}.',
		routing: {
			send: {
				type: 'body',
				property: 'input',
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
			show: showForCreateResponse,
		},
		options: [
			{
				displayName: 'Tools',
				name: 'tools',
				type: 'json',
				default: '[]',
				description:
					'JSON array of function tools the model may call, e.g. [{"type": "function", "name": "get_weather", "description": "Get the weather for a city", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}]. Unlike Chat Completion, the function is not nested under a "function" key.',
				routing: {
					send: {
						type: 'body',
						property: 'tools',
						// A JSON field holds JSON text unless an expression already produced an array
						value: '={{ typeof $value === "string" ? JSON.parse($value) : $value }}',
					},
				},
			},
		],
	},
];
