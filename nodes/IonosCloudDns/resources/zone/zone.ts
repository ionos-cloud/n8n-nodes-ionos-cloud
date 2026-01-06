import type { INodeProperties } from 'n8n-workflow';

const showForZoneId = {
	operation: ['get', 'update', 'delete'],
	resource: ['zone'],
};

const showForZoneCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['zone'],
};

const showOnlyForZoneGetMany = {
	operation: ['getAll'],
	resource: ['zone'],
};

export const zoneDescriptions: INodeProperties[] = [
	{
		displayName: 'Zone ID',
		name: 'zoneId',
		type: 'string',
		required: true,
		displayOptions: { show: showForZoneId },
		default: '',
		description: 'The ID of the DNS zone',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForZoneGetMany,
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
			show: showOnlyForZoneGetMany,
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
		displayOptions: { show: showOnlyForZoneGetMany },
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
		displayOptions: { show: showForZoneCreateOrUpdate },
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForZoneCreateOrUpdate },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the DNS zone',
				routing: {
					send: {
						type: 'body',
						property: 'properties.description',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the zone is enabled',
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
