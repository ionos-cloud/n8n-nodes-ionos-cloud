import type { INodeProperties } from 'n8n-workflow';

const showForServerResource = {
	resource: ['server'],
};

const showForServerId = {
	operation: ['get', 'start', 'stop', 'reboot', 'update', 'delete'], 
	resource: ['server'],
};

const showForServerCreateOrUpdate = {
	operation: ['create', 'update'],
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
	// Fields for Create and Update
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForServerCreateOrUpdate },
		default: '',
		description: 'The name of the server',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Cores',
		name: 'cores',
		type: 'number',
		required: true,
		displayOptions: { show: showForServerCreateOrUpdate },
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'The number of processor cores',
		routing: {
			send: {
				type: 'body',
				property: 'properties.cores',
			},
		},
	},
	{
		displayName: 'RAM (MB)',
		name: 'ram',
		type: 'number',
		required: true,
		displayOptions: { show: showForServerCreateOrUpdate },
		default: 1024,
		typeOptions: { minValue: 256 },
		description: 'The amount of memory in MB',
		routing: {
			send: {
				type: 'body',
				property: 'properties.ram',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForServerCreateOrUpdate },
		options: [
			{
				displayName: 'CPU Family',
				name: 'cpuFamily',
				type: 'options',
				options: [
					{ name: 'AMD EPYC', value: 'AMD_OPTERON' },
					{ name: 'Intel Skylake', value: 'INTEL_SKYLAKE' },
					{ name: 'Intel Xeon', value: 'INTEL_XEON' },
				],
				default: 'INTEL_XEON',
				description: 'The CPU family for the server',
				routing: {
					send: {
						type: 'body',
						property: 'properties.cpuFamily',
					},
				},
			},
			{
				displayName: 'Availability Zone',
				name: 'availabilityZone',
				type: 'options',
				options: [
					{ name: 'Auto', value: 'AUTO' },
					{ name: 'Zone 1', value: 'ZONE_1' },
					{ name: 'Zone 2', value: 'ZONE_2' },
				],
				default: 'AUTO',
				description: 'The availability zone for the server',
				routing: {
					send: {
						type: 'body',
						property: 'properties.availabilityZone',
					},
				},
			},
		],
	},
];