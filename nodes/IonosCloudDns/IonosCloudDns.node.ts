import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { zoneOperations } from './resources/zone';
import { zoneDescriptions } from './resources/zone/zone';
import { recordOperations } from './resources/record';
import { recordDescriptions } from './resources/record/record';
import { secondaryZoneOperations } from './resources/secondaryZone';
import { secondaryZoneDescriptions } from './resources/secondaryZone/secondaryZone';
import { zoneFileOperations } from './resources/zoneFile';
import { zoneFileDescriptions } from './resources/zoneFile/zoneFile';
import { quotaOperations } from './resources/quota';
import { quotaDescriptions } from './resources/quota/quota';
import { dnssecOperations } from './resources/dnssec';
import { dnssecDescriptions } from './resources/dnssec/dnssec';
import { reverseRecordOperations } from './resources/reverseRecord';
import { reverseRecordDescriptions } from './resources/reverseRecord/reverseRecord';

export class IonosCloudDns implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ionos Cloud (Cloud DNS)',
		name: 'ionosCloudDns',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Ionos Cloud DNS API v1',
		defaults: {
			name: 'Ionos Cloud (Cloud DNS)',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'ionosCloudApi', required: true }],
		requestDefaults: {
			baseURL: 'https://dns.de-fra.ionos.com/zones',
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
						name: 'DNSSEC',
						value: 'dnssec',
						description: 'Manage DNSSEC keys',
					},
					{
						name: 'Quota',
						value: 'quota',
						description: 'Get quota information',
					},
					{
						name: 'Record',
						value: 'record',
						description: 'Manage DNS records',
					},
					{
						name: 'Reverse Record',
						value: 'reverseRecord',
						description: 'Manage reverse DNS records',
					},
					{
						name: 'Secondary Zone',
						value: 'secondaryZone',
						description: 'Manage secondary DNS zones',
					},
					{
						name: 'Zone',
						value: 'zone',
						description: 'Manage primary DNS zones',
					},
					{
						name: 'Zone File',
						value: 'zoneFile',
						description: 'Import/export zone files in BIND format',
					},
				],
				default: 'zone',
			},
			// Zone Operations
			...zoneOperations,
			...zoneDescriptions,

			// Record Operations
			...recordOperations,
			...recordDescriptions,

			// Secondary Zone Operations
			...secondaryZoneOperations,
			...secondaryZoneDescriptions,

			// Zone File Operations
			...zoneFileOperations,
			...zoneFileDescriptions,

			// Quota Operations
			...quotaOperations,
			...quotaDescriptions,

			// DNSSEC Operations
			...dnssecOperations,
			...dnssecDescriptions,

			// Reverse Record Operations
			...reverseRecordOperations,
			...reverseRecordDescriptions,
		],
	};
}
