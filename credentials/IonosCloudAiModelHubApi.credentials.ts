import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class IonosCloudAiModelHubApi implements ICredentialType {
	name = 'ionosCloudAiModelHubApi';

	displayName = 'IONOS Cloud AI Model Hub API';

	documentationUrl = 'https://docs.ionos.com/cloud/ai/ai-model-hub';

	icon: Icon = { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The API token for IONOS Cloud AI Model Hub',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://inference.de-txl.ionos.com',
			url: '/models',
			method: 'GET',
		},
	};
}
