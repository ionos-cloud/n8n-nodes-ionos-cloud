import type { INodeProperties } from 'n8n-workflow';

const showForServerResource = {
	resource: ['server'],
};

const showForServerId = {
	operation: ['get', 'start', 'stop', 'reboot'], 
	resource: ['server'],
};

const showOnlyForServerGetMany = {
	operation: ['getAll'],
	resource: ['server'],
};

export const serverDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: showForServerResource },
		default: '',
		description: 'The ID of the data center this server belongs to',
	},
	{
		displayName: 'Server ID',
		name: 'serverId',
		type: 'string',
		required: true,
		displayOptions: { show: showForServerId },
		default: '',
		description: 'The ID of the server to operate on',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForServerGetMany,
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
			show: showOnlyForServerGetMany,
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
];