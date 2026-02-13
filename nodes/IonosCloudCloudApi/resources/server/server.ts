import type { INodeProperties } from 'n8n-workflow';

const showForServerResource = {
	resource: ['server'],
};

const showForServerId = {
	operation: [
		'get',
		'start',
		'stop',
		'reboot',
		'update',
		'delete',
		'attachCdrom',
		'attachVolume',
		'detachCdrom',
		'detachVolume',
		'getCdrom',
		'getCdroms',
		'getRemoteConsole',
		'getToken',
		'getVolume',
		'getVolumes',
		'resume',
		'suspend',
		'upgrade',
	],
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
		displayName: 'Volume ID',
		name: 'volumeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['attachVolume'],
				resource: ['server'],
			},
		},
		default: '',
		description: 'The ID of the volume to attach',
		routing: {
			send: {
				type: 'body',
				property: 'id',
			},
		},
	},
	{
		displayName: 'Volume ID',
		name: 'volumeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['detachVolume', 'getVolume'],
				resource: ['server'],
			},
		},
		default: '',
		description: 'The ID of the volume',
	},
	{
		displayName: 'CDROM ID',
		name: 'cdromId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['attachCdrom'],
				resource: ['server'],
			},
		},
		default: '',
		description: 'The ID of the CDROM image to attach',
		routing: {
			send: {
				type: 'body',
				property: 'id',
			},
		},
	},
	{
		displayName: 'CDROM ID',
		name: 'cdromId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['detachCdrom', 'getCdrom'],
				resource: ['server'],
			},
		},
		default: '',
		description: 'The ID of the CDROM image',
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
			{
				displayName: 'Boot CD-ROM',
				name: 'bootCdrom',
				type: 'string',
				default: '',
				description: 'UUID of the CD-ROM image to attach for booting',
				routing: {
					send: {
						type: 'body',
						property: 'properties.bootCdrom',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Boot Volume',
				name: 'bootVolume',
				type: 'string',
				default: '',
				description: 'UUID of the volume to use for booting the server',
				routing: {
					send: {
						type: 'body',
						property: 'properties.bootVolume',
						value: '={{ $value || undefined }}',
					},
				},
			},
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
				displayName: 'NIC Multi Queue',
				name: 'nicMultiQueue',
				type: 'boolean',
				default: false,
				description: 'Whether to activate Multi Queue feature on all NICs for improved network performance',
				routing: {
					send: {
						type: 'body',
						property: 'properties.nicMultiQueue',
					},
				},
			},
			{
				displayName: 'Placement Group ID',
				name: 'placementGroupId',
				type: 'string',
				default: '',
				description: 'UUID of the placement group for the server',
				routing: {
					send: {
						type: 'body',
						property: 'properties.placementGroupId',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Server Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Enterprise', value: 'ENTERPRISE' },
					{ name: 'CUBE', value: 'CUBE' },
					{ name: 'VCPU', value: 'VCPU' },
					{ name: 'GPU', value: 'GPU' },
				],
				default: 'ENTERPRISE',
				description: 'The type of server to create',
				routing: {
					send: {
						type: 'body',
						property: 'properties.type',
					},
				},
			},
			{
				displayName: 'Template UUID',
				name: 'templateUuid',
				type: 'string',
				default: '',
				description: 'UUID of the template to use for server creation',
				routing: {
					send: {
						type: 'body',
						property: 'properties.templateUuid',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},
];