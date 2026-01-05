import type { INodeProperties } from 'n8n-workflow';

const showForLanId = {
	operation: ['get', 'update', 'delete'],
	resource: ['lan'],
};

const showForLanCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['lan'],
};

const showOnlyForLanGetMany = {
	operation: ['getAll'],
	resource: ['lan'],
};

export const lanDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['lan'] } },
		default: '',
		description: 'The ID of the datacenter this LAN belongs to',
	},
	{
		displayName: 'LAN ID',
		name: 'lanId',
		type: 'string',
		required: true,
		displayOptions: { show: showForLanId },
		default: '',
		description: 'The ID of the LAN',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForLanGetMany,
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
			show: showOnlyForLanGetMany,
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForLanCreateOrUpdate },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the LAN',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
					},
				},
			},
			{
				displayName: 'Public',
				name: 'public',
				type: 'boolean',
				default: false,
				description: 'Whether the LAN faces the public Internet or not',
				routing: {
					send: {
						type: 'body',
						property: 'properties.public',
					},
				},
			},
		],
	},
];
