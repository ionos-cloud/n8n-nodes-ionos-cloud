import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { USER_AGENT } from '../../utils/userAgent';

import * as distribution from './resources/distribution';
import * as ips from './resources/ips';

export class IonosCloudCdn implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'Ionos Cloud (CDN)',
		name: 'ionosCloudCdn',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Ionos Cloud CDN API',
		defaults: {
			name: 'Ionos Cloud CDN',
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
			baseURL: 'https://cdn.de-fra.ionos.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'User-Agent': USER_AGENT,
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
						name: 'Distribution',
						value: 'distribution',
					},
					{
						name: 'Ip',
						value: 'ips',
					},
				],
				default: 'distribution',
			},
			...distribution.descriptions,
			...ips.descriptions,
		],
		usableAsTool: true,
	};
}
