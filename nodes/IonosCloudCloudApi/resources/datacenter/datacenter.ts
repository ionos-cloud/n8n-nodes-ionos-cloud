import type { INodeProperties } from 'n8n-workflow';

const showForDatacenterId = {
	operation: ['get', 'update', 'delete'],
	resource: ['datacenter'],
};

const showForDatacenterCreate = {
	operation: ['create'],
	resource: ['datacenter'],
};

const showForDatacenterCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['datacenter'],
};

const showOnlyForDatacenterGetMany = {
	operation: ['getAll'],
	resource: ['datacenter'],
};

export const datacenterDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: showForDatacenterId },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForDatacenterGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
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
			show: showOnlyForDatacenterGetMany,
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
	// Fields for Create and Update operations
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForDatacenterCreateOrUpdate },
		default: '',
		description: 'The name of the datacenter',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		required: true,
		displayOptions: { show: showForDatacenterCreate },
		default: 'us/las',
		description: 'The physical location where the datacenter will be created (e.g., us/las, de/fra, de/txl). Property cannot be modified after creation.',
		routing: {
			send: {
				type: 'body',
				property: 'properties.location',
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: { show: showForDatacenterCreateOrUpdate },
		default: '',
		description: 'A description for the datacenter',
		routing: {
			send: {
				type: 'body',
				property: 'properties.description',
				value: '={{ $value || undefined }}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForDatacenterCreateOrUpdate },
		options: [
			{
				displayName: 'SEC Auth Protection',
				name: 'secAuthProtection',
				type: 'boolean',
				default: false,
				description: 'Whether the datacenter requires extra protection (two-step verification)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.secAuthProtection',
					},
				},
			},
		],
	},
];
