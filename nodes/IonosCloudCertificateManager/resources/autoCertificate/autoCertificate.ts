import type { INodeProperties } from 'n8n-workflow';

const showForAutoCertificateId = {
	operation: ['get', 'update', 'delete'],
	resource: ['autoCertificate'],
};

const showForAutoCertificateCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['autoCertificate'],
};

const showForAutoCertificateCreate = {
	operation: ['create'],
	resource: ['autoCertificate'],
};

const showOnlyForAutoCertificateGetMany = {
	operation: ['getAll'],
	resource: ['autoCertificate'],
};

export const autoCertificateDescriptions: INodeProperties[] = [
	{
		displayName: 'Auto Certificate ID',
		name: 'autoCertificateId',
		type: 'string',
		required: true,
		displayOptions: { show: showForAutoCertificateId },
		default: '',
		description: 'The ID of the auto certificate',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForAutoCertificateGetMany,
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
			show: showOnlyForAutoCertificateGetMany,
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
	// Additional Filters for Get Many
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForAutoCertificateGetMany },
		options: [
			{
				displayName: 'Common Name',
				name: 'commonName',
				type: 'string',
				default: '',
				description: 'Filter by the common name (DNS)',
				routing: {
					send: {
						type: 'query',
						property: 'filter.commonName',
					},
				},
			},
		],
	},
	// Fields for Create and Update
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForAutoCertificateCreateOrUpdate },
		default: '',
		description: 'The name of the auto certificate',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Provider ID',
		name: 'provider',
		type: 'string',
		required: true,
		displayOptions: { show: showForAutoCertificateCreate },
		default: '',
		description: 'The ID of the certificate provider',
		routing: {
			send: {
				type: 'body',
				property: 'properties.provider',
			},
		},
	},
	{
		displayName: 'Common Name',
		name: 'commonName',
		type: 'string',
		required: true,
		displayOptions: { show: showForAutoCertificateCreate },
		default: '',
		description: 'The common name (DNS) of the certificate',
		routing: {
			send: {
				type: 'body',
				property: 'properties.commonName',
			},
		},
	},
	{
		displayName: 'Key Algorithm',
		name: 'keyAlgorithm',
		type: 'options',
		required: true,
		displayOptions: { show: showForAutoCertificateCreate },
		options: [
			{
				name: 'RSA 2048',
				value: 'rsa2048',
			},
			{
				name: 'RSA 4096',
				value: 'rsa4096',
			},
			{
				name: 'ECDSA P256',
				value: 'ecdsa256',
			},
			{
				name: 'ECDSA P384',
				value: 'ecdsa384',
			},
		],
		default: 'rsa4096',
		description: 'The key algorithm for the certificate',
		routing: {
			send: {
				type: 'body',
				property: 'properties.keyAlgorithm',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForAutoCertificateCreate },
		options: [
			{
				displayName: 'Subject Alternative Names',
				name: 'subjectAlternativeNames',
				type: 'string',
				default: '',
				description: 'Comma-separated list of subject alternative names',
				routing: {
					send: {
						preSend: [
							async function (this, requestOptions) {
								const names = this.getNodeParameter('additionalFields.subjectAlternativeNames', 0) as string;
								if (names) {
								const body = requestOptions.body as Record<string, unknown>;
								if (!body.properties) body.properties = {};
								(body.properties as Record<string, unknown>).subjectAlternativeNames = names.split(',').map((n: string) => n.trim());
								}
								return requestOptions;
							},
						],
					},
				},
			},
		],
	},
];
