import type { INodeProperties } from 'n8n-workflow';

const showForSecondaryZoneId = {
	operation: ['get', 'update', 'delete', 'axfrGet', 'axfrStart'],
	resource: ['secondaryZone'],
};

const showForSecondaryZoneCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['secondaryZone'],
};

const showOnlyForSecondaryZoneGetMany = {
	operation: ['getAll'],
	resource: ['secondaryZone'],
};

export const secondaryZoneDescriptions: INodeProperties[] = [
	{
		displayName: 'Secondary Zone ID',
		name: 'secondaryZoneId',
		type: 'string',
		required: true,
		displayOptions: { show: showForSecondaryZoneId },
		default: '',
		description: 'The ID of the secondary zone',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSecondaryZoneGetMany,
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
			show: showOnlyForSecondaryZoneGetMany,
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
		displayOptions: { show: showOnlyForSecondaryZoneGetMany },
		options: [
			{
				displayName: 'Zone Name',
				name: 'zoneName',
				type: 'string',
				default: '',
				description: 'Filter by zone name',
				routing: {
					send: {
						type: 'query',
						property: 'filter.zoneName',
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
		],
	},
	// Fields for Create and Update
	{
		displayName: 'Zone Name',
		name: 'zoneName',
		type: 'string',
		required: true,
		displayOptions: { show: showForSecondaryZoneCreateOrUpdate },
		default: '',
		description: 'The zone name (e.g., example.com)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.zoneName',
			},
		},
	},
	{
		displayName: 'Primary IPs',
		name: 'primaryIps',
		type: 'fixedCollection',
		required: true,
		displayOptions: { show: showForSecondaryZoneCreateOrUpdate },
		default: {},
		description: 'Primary DNS server IP addresses',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'ips',
				displayName: 'IP Address',
				values: [
					{
						displayName: 'IP',
						name: 'ip',
						type: 'string',
						default: '',
						description: 'Primary DNS server IP address',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'properties.primaryIps',
				value: '={{ $value.ips?.map(item => item.ip) }}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForSecondaryZoneCreateOrUpdate },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The secondary zone description',
				routing: {
					send: {
						type: 'body',
						property: 'properties.description',
					},
				},
			},
		],
	},
];
