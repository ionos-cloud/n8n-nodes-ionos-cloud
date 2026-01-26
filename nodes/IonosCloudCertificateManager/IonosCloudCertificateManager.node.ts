import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { USER_AGENT } from '../../utils/userAgent';
import { certificateOperations } from './resources/certificate';
import { certificateDescriptions } from './resources/certificate/certificate';
import { autoCertificateOperations } from './resources/autoCertificate';
import { autoCertificateDescriptions } from './resources/autoCertificate/autoCertificate';
import { providerOperations } from './resources/provider';
import { providerDescriptions } from './resources/provider/provider';

export class IonosCloudCertificateManager implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IONOS Cloud (Certificate Manager)',
		name: 'ionosCloudCertificateManager',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with IONOS Cloud Certificate Manager API v2',
		defaults: {
			name: 'IONOS Cloud (Certificate Manager)',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'ionosCloudApi', required: true }],
		requestDefaults: {
			baseURL: 'https://certificate-manager.de-fra.ionos.com',
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
						name: 'Certificate',
						value: 'certificate',
						description: 'Manage SSL/TLS certificates',
					},
					{
						name: 'Auto Certificate',
						value: 'autoCertificate',
						description: 'Manage auto-renewable certificates',
					},
					{
						name: 'Provider',
						value: 'provider',
						description: 'Manage certificate providers',
					},
				],
				default: 'certificate',
			},
			// Certificate Operations
			...certificateOperations,
			...certificateDescriptions,

			// AutoCertificate Operations
			...autoCertificateOperations,
			...autoCertificateDescriptions,

			// Provider Operations
			...providerOperations,
			...providerDescriptions,
		],
	};
}
