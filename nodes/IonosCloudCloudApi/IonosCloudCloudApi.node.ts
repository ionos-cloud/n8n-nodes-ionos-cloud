import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { serverDescription } from './resources/server';
import { contractDescription } from './resources/contract';

export class IonosCloudCloudApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ionos Cloud (Cloud API v6)',
		name: 'ionosCloudCloudApi',
		icon: { light: 'file:ionos.dark.svg', dark: 'file:ionos.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Ionos Cloud via Cloud API v6',
		defaults: {
			name: 'Ionos Cloud (Cloud API v6)',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: "ionosCloudCloudApi", required: true }],
		requestDefaults: {
			baseURL: 'https://api.ionos.com/cloudapi/v6',
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
						name: 'Contract',
						value: 'contract',
					},
					{
						name: 'Server',
						value: 'server',
					},
				],
				default: 'contract',
			},
			...contractDescription,
			...serverDescription,
		],
	};
}
