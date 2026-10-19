import type { INodeProperties } from 'n8n-workflow';
import { modelsLoadOptions } from './openai';

const showForRerank = {
	resource: ['openai'],
	operation: ['rerank'],
};

export const rerankDescriptions: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: showForRerank,
		},
		typeOptions: modelsLoadOptions,
		default: '',
		description:
			'ID of the reranking model to use, e.g. Qwen/Qwen3-VL-Reranker-8B. The list is fetched live from the IONOS API.',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: showForRerank,
		},
		default: '',
		description:
			'The query to rank the documents against. For a multimodal query, use an expression that returns an array of text and image_url content parts.',
		typeOptions: {
			rows: 2,
		},
		routing: {
			send: {
				type: 'body',
				property: 'query',
			},
		},
	},
	{
		displayName: 'Documents',
		name: 'documents',
		type: 'json',
		required: true,
		// Parses the JSON text into an array, and rejects anything that is not one
		validateType: 'array',
		displayOptions: {
			show: showForRerank,
		},
		default: '[]',
		description:
			'JSON array of up to 1000 documents to rank. Each document is a plain string or, for multimodal models, an object with a content array of text and image_url parts. The two forms can be mixed.',
		hint: 'An image document looks like {"content": [{"type": "image_url", "image_url": {"url": "https://example.com/image.png"}}]}',
		routing: {
			send: {
				type: 'body',
				property: 'documents',
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
			show: showForRerank,
		},
		options: [
			{
				displayName: 'Return Documents',
				name: 'return_documents',
				type: 'boolean',
				default: true,
				description:
					'Whether each result includes the original document. Without it, match results to your documents by their index.',
				routing: {
					send: {
						type: 'body',
						property: 'return_documents',
					},
				},
			},
			{
				displayName: 'Top N',
				name: 'top_n',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 3,
				description: 'Number of most relevant documents to return. Omit to return all of them.',
				routing: {
					send: {
						type: 'body',
						property: 'top_n',
					},
				},
			},
		],
	},
];
