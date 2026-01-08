import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
import { USER_AGENT } from '../utils/userAgent';

export class IonosCloudApi implements ICredentialType {
	name = 'ionosCloudApi';

	displayName = 'Ionos Cloud API';

	icon: Icon = { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg'};

	documentationUrl = 'https://docs.ionos.com/cloud/set-up-ionos-cloud/management/identity-access-management/token-manager';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			description:
				'The API-Token you received from Ionos Cloud. Get more info at https://docs.ionos.com/cloud/set-up-ionos-cloud/management/identity-access-management/token-manager.',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
				'User-Agent': USER_AGENT,
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.ionos.com/cloudapi/v6',
			url: '/',
		},
	};
}
