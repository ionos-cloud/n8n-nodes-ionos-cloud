import type { INodeProperties } from 'n8n-workflow';

const showForIpBlockId = {
	operation: ['get', 'delete'],
	resource: ['ipBlock'],
};

const showForIpBlockCreate = {
	operation: ['create'],
	resource: ['ipBlock'],
};

const showOnlyForIpBlockGetMany = {
	operation: ['getAll'],
	resource: ['ipBlock'],
};

export const ipBlockDescriptions: INodeProperties[] = [
	{
		displayName: 'IP Block ID',
		name: 'ipBlockId',
		type: 'string',
		required: true,
		displayOptions: { show: showForIpBlockId },
		default: '',
		description: 'The ID of the IP block',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForIpBlockGetMany,
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
			show: showOnlyForIpBlockGetMany,
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
	// Fields for Create
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		required: true,
		displayOptions: { show: showForIpBlockCreate },
		default: 'us/las',
		description: 'The location for the IP block (e.g., us/las, de/fra, de/txl)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.location',
			},
		},
	},
	{
		displayName: 'Size',
		name: 'size',
		type: 'number',
		required: true,
		displayOptions: { show: showForIpBlockCreate },
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'The number of IP addresses to reserve',
		routing: {
			send: {
				type: 'body',
				property: 'properties.size',
			},
		},
	},
];
