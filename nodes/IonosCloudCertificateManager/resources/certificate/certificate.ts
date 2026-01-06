import type { INodeProperties } from 'n8n-workflow';

const showForCertificateId = {
	operation: ['get', 'update', 'delete'],
	resource: ['certificate'],
};

const showForCertificateCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['certificate'],
};

const showForCertificateCreate = {
	operation: ['create'],
	resource: ['certificate'],
};

const showOnlyForCertificateGetMany = {
	operation: ['getAll'],
	resource: ['certificate'],
};

export const certificateDescriptions: INodeProperties[] = [
	{
		displayName: 'Certificate ID',
		name: 'certificateId',
		type: 'string',
		required: true,
		displayOptions: { show: showForCertificateId },
		default: '',
		description: 'The ID of the certificate',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForCertificateGetMany,
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
			show: showOnlyForCertificateGetMany,
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
		displayOptions: { show: showOnlyForCertificateGetMany },
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
			{
				displayName: 'Auto Certificate ID',
				name: 'autoCertificate',
				type: 'string',
				default: '',
				description: 'Filter by auto certificate ID',
				routing: {
					send: {
						type: 'query',
						property: 'filter.autoCertificate',
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
		displayOptions: { show: showForCertificateCreateOrUpdate },
		default: '',
		description: 'The name of the certificate',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Certificate',
		name: 'certificate',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		required: true,
		displayOptions: { show: showForCertificateCreate },
		default: '',
		description: 'The PEM encoded certificate',
		routing: {
			send: {
				type: 'body',
				property: 'properties.certificate',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForCertificateCreate },
		options: [
			{
				displayName: 'Certificate Chain',
				name: 'certificateChain',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				description: 'The PEM encoded certificate chain',
				routing: {
					send: {
						type: 'body',
						property: 'properties.certificateChain',
					},
				},
			},
			{
				displayName: 'Private Key',
				name: 'privateKey',
				type: 'string',
				typeOptions: {
					password: true,
					rows: 10,
				},
				default: '',
				description: 'The PEM encoded private key',
				routing: {
					send: {
						type: 'body',
						property: 'properties.privateKey',
					},
				},
			},
		],
	},
];
