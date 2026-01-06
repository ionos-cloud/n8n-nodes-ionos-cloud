import type { INodeProperties } from 'n8n-workflow';

const showForRecordId = {
	operation: ['get', 'update', 'delete'],
	resource: ['record'],
};

const showForRecordCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['record'],
};

const showOnlyForRecordGetMany = {
	operation: ['getAll'],
	resource: ['record'],
};

const showForRecordOperations = {
	operation: ['create', 'get', 'update', 'delete'],
	resource: ['record'],
};

export const recordDescriptions: INodeProperties[] = [
	{
		displayName: 'Zone ID',
		name: 'zoneId',
		type: 'string',
		required: true,
		displayOptions: { show: showForRecordOperations },
		default: '',
		description: 'The ID of the DNS zone',
	},
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: { show: showForRecordId },
		default: '',
		description: 'The ID of the DNS record',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRecordGetMany,
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
			show: showOnlyForRecordGetMany,
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
		displayOptions: { show: showOnlyForRecordGetMany },
		options: [
			{
				displayName: 'Zone ID',
				name: 'zoneId',
				type: 'string',
				default: '',
				description: 'Filter by zone ID',
				routing: {
					send: {
						type: 'query',
						property: 'filter.zoneId',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter by record name',
				routing: {
					send: {
						type: 'query',
						property: 'filter.name',
					},
				},
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{ name: 'Provisioning', value: 'PROVISIONING' },
					{ name: 'Available', value: 'AVAILABLE' },
					{ name: 'Destroying', value: 'DESTROYING' },
					{ name: 'Failed', value: 'FAILED' },
				],
				default: 'AVAILABLE',
				description: 'Filter by provisioning state',
				routing: {
					send: {
						type: 'query',
						property: 'filter.state',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'A', value: 'A' },
					{ name: 'AAAA', value: 'AAAA' },
					{ name: 'ALIAS', value: 'ALIAS' },
					{ name: 'CAA', value: 'CAA' },
					{ name: 'CNAME', value: 'CNAME' },
					{ name: 'DS', value: 'DS' },
					{ name: 'HTTPS', value: 'HTTPS' },
					{ name: 'MX', value: 'MX' },
					{ name: 'NS', value: 'NS' },
					{ name: 'SMIMEA', value: 'SMIMEA' },
					{ name: 'SRV', value: 'SRV' },
					{ name: 'SSHFP', value: 'SSHFP' },
					{ name: 'SVCB', value: 'SVCB' },
					{ name: 'TLSA', value: 'TLSA' },
					{ name: 'TXT', value: 'TXT' },
				],
				default: 'A',
				description: 'Filter by record type',
				routing: {
					send: {
						type: 'query',
						property: 'filter.type',
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
		displayOptions: { show: showForRecordCreateOrUpdate },
		default: '',
		description: 'The record name',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: { show: showForRecordCreateOrUpdate },
		options: [
			{ name: 'A', value: 'A' },
			{ name: 'AAAA', value: 'AAAA' },
			{ name: 'ALIAS', value: 'ALIAS' },
			{ name: 'CAA', value: 'CAA' },
			{ name: 'CNAME', value: 'CNAME' },
			{ name: 'DS', value: 'DS' },
			{ name: 'HTTPS', value: 'HTTPS' },
			{ name: 'MX', value: 'MX' },
			{ name: 'NS', value: 'NS' },
			{ name: 'SMIMEA', value: 'SMIMEA' },
			{ name: 'SRV', value: 'SRV' },
			{ name: 'SSHFP', value: 'SSHFP' },
			{ name: 'SVCB', value: 'SVCB' },
			{ name: 'TLSA', value: 'TLSA' },
			{ name: 'TXT', value: 'TXT' },
		],
		default: 'A',
		description: 'The record type',
		routing: {
			send: {
				type: 'body',
				property: 'properties.type',
			},
		},
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		displayOptions: { show: showForRecordCreateOrUpdate },
		default: '',
		description: 'The record content (e.g., IP address, domain name)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.content',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForRecordCreateOrUpdate },
		options: [
			{
				displayName: 'TTL',
				name: 'ttl',
				type: 'number',
				default: 3600,
				description: 'Time to live in seconds',
				routing: {
					send: {
						type: 'body',
						property: 'properties.ttl',
					},
				},
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 10,
				description: 'Priority for MX and SRV records',
				routing: {
					send: {
						type: 'body',
						property: 'properties.priority',
					},
				},
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the record is enabled',
				routing: {
					send: {
						type: 'body',
						property: 'properties.enabled',
					},
				},
			},
		],
	},
];
