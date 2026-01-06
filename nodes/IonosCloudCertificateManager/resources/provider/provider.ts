import type { INodeProperties } from 'n8n-workflow';

const showForProviderId = {
	operation: ['get', 'update', 'delete'],
	resource: ['provider'],
};

const showForProviderCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['provider'],
};

const showForProviderCreate = {
	operation: ['create'],
	resource: ['provider'],
};

const showOnlyForProviderGetMany = {
	operation: ['getAll'],
	resource: ['provider'],
};

export const providerDescriptions: INodeProperties[] = [
	{
		displayName: 'Provider ID',
		name: 'providerId',
		type: 'string',
		required: true,
		displayOptions: { show: showForProviderId },
		default: '',
		description: 'The ID of the provider',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForProviderGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForProviderGetMany,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
			},
			operations: {
				pagination: {
					type: 'offset',
					properties: {
						limitParameter: 'limit',
						offsetParameter: 'offset',
						pageSize: 100,
						type: 'query',
					},
				},
			},
		},
	},
	// Fields for Create and Update
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForProviderCreateOrUpdate },
		default: '',
		description: 'The name of the provider',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: { show: showForProviderCreate },
		default: '',
		description: 'The email address for the ACME account',
		routing: {
			send: {
				type: 'body',
				property: 'properties.email',
			},
		},
	},
	{
		displayName: 'Server',
		name: 'server',
		type: 'string',
		required: true,
		displayOptions: { show: showForProviderCreate },
		default: 'https://acme-v02.api.letsencrypt.org/directory',
		description: 'The ACME server URL',
		routing: {
			send: {
				type: 'body',
				property: 'properties.server',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForProviderCreate },
		options: [
			{
				displayName: 'External Account Binding Key ID',
				name: 'eabKeyId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'External Account Binding HMAC Key',
				name: 'eabHmacKey',
				type: 'string',
				typeOptions: { password: true },
				default: '',
			},
		],
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
					const additionalFields = this.getNodeParameter('additionalFields', 0) as Record<string, unknown>;
					if (additionalFields.eabKeyId || additionalFields.eabHmacKey) {
						const body = requestOptions.body as Record<string, unknown>;
						if (!body.properties) body.properties = {};
						const eab: Record<string, unknown> = {};
						if (additionalFields.eabKeyId) eab.keyId = additionalFields.eabKeyId;
						if (additionalFields.eabHmacKey) eab.hmacKey = additionalFields.eabHmacKey;
						(body.properties as Record<string, unknown>).externalAccountBinding = eab;
						}
						return requestOptions;
					},
				],
			},
		},
	},
];
