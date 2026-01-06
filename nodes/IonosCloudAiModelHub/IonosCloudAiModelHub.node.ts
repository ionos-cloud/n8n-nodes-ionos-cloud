import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import * as collection from './resources/collection';
import * as document from './resources/document';
import * as model from './resources/model';

export class IonosCloudAiModelHub implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'Ionos Cloud (AI Model Hub)',
		name: 'ionosCloudAiModelHub',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with IONOS Cloud AI Model Hub API',
		defaults: {
			name: 'IONOS Cloud AI Model Hub',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'ionosCloudApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://inference.de-txl.ionos.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Collection',
						value: 'collection',
						description: 'Manage document collections in a vector database',
					},
					{
						name: 'Document',
						value: 'document',
						description: 'Manage documents in collections',
					},
					{
						name: 'Model',
						value: 'model',
						description: 'Browse and call foundation models',
					},
				],
				default: 'collection',
			},
			...collection.descriptions,
			...document.descriptions,
			...model.descriptions,
		],
		usableAsTool: true,
	};
}
