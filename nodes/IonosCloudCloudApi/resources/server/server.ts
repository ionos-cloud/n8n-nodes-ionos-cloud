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

const showForGpuServerCreate = {
	operation: ['create'],
	resource: ['server'],
	type: ['GPU'],
};

const showForTemplateUuidCreate = {
	operation: ['create'],
	resource: ['server'],
	type: ['GPU', 'CUBE'],
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
		displayOptions: {
			show: showForServerCreateOrUpdate,
			hide: { type: ['GPU', 'CUBE'] },
		},
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'The number of processor cores. Not allowed for CUBE and GPU server types, which are determined by the template instead.',
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
		displayOptions: {
			show: showForServerCreateOrUpdate,
			hide: { type: ['GPU', 'CUBE'] },
		},
		default: 1024,
		typeOptions: { minValue: 256 },
		description: 'The amount of memory in MB. Not allowed for CUBE and GPU server types, which are determined by the template instead.',
		routing: {
			send: {
				type: 'body',
				property: 'properties.ram',
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
		displayOptions: { show: showForServerCreateOrUpdate },
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
		required: true,
		displayOptions: { show: showForTemplateUuidCreate },
		default: '',
		description: 'The UUID of the template used for creating the server. Determines the cores, RAM and (for GPU servers) GPU resources allocated. Required for CUBE and GPU server types.',
		routing: {
			send: {
				type: 'body',
				property: 'properties.templateUuid',
			},
		},
	},
	{
		displayName: 'Volume',
		name: 'gpuVolume',
		type: 'fixedCollection',
		default: {},
		description: 'The boot volume for the GPU server (required)',
		typeOptions: {
			multipleValues: false,
		},
		displayOptions: { show: showForGpuServerCreate },
		options: [
			{
				name: 'properties',
				displayName: 'Volume Properties',
				values: [
					{
						displayName: 'Availability Zone',
						name: 'availabilityZone',
						type: 'options',
						options: [
							{ name: 'Auto', value: 'AUTO' },
							{ name: 'Zone 1', value: 'ZONE_1' },
							{ name: 'Zone 2', value: 'ZONE_2' },
							{ name: 'Zone 3', value: 'ZONE_3' },
						],
						default: 'AUTO',
						description: 'The availability zone for the boot volume',
					},
					{
						displayName: 'Bus',
						name: 'bus',
						type: 'options',
						options: [
							{ name: 'VIRTIO', value: 'VIRTIO' },
							{ name: 'IDE', value: 'IDE' },
						],
						default: 'VIRTIO',
						description: 'The bus type for the boot volume',
					},
					{
						displayName: 'Expose Serial',
						name: 'exposeSerial',
						type: 'boolean',
						default: true,
						description: 'Whether to expose the serial ID of the disk attached to the server. Some operating systems or software solutions require this to work properly.',
					},
					{
						displayName: 'Image',
						name: 'image',
						type: 'string',
						default: '',
						placeholder: 'ubuntu:latest',
						description: 'The UUID, name, or alias of the IONOS Cloud Linux image to boot from (e.g. "ubuntu:latest"). Only IONOS Cloud Linux images are supported for GPU servers.',
					},
					{
						displayName: 'Image Password',
						name: 'imagePassword',
						type: 'string',
						typeOptions: { password: true },
						default: '',
						description: 'Initial root/administrator password for the image',
					},
					{
						displayName: 'Licence Type',
						name: 'licenceType',
						type: 'options',
						options: [{ name: 'Linux', value: 'LINUX' }],
						default: 'LINUX',
						description: 'OS type for the boot volume. Only Linux is supported for GPU servers.',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: 'system',
						description: 'The name of the boot volume',
					},
					{
						displayName: 'Require Legacy BIOS',
						name: 'requireLegacyBios',
						type: 'boolean',
						default: false,
						description: 'Whether the image requires the legacy BIOS for compatibility or specific needs',
					},
				],
			},
		],
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						const volume = this.getNodeParameter('gpuVolume') as {
							properties?: {
								name?: string;
								licenceType?: string;
								bus?: string;
								availabilityZone?: string;
								exposeSerial?: boolean;
								requireLegacyBios?: boolean;
								image?: string;
								imagePassword?: string;
							};
						};
						const volumeProperties = volume?.properties;
						if (volumeProperties) {
							const isUuid = volumeProperties.image
								? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(volumeProperties.image)
								: false;
							requestOptions.body = requestOptions.body ?? {};
							(requestOptions.body as Record<string, unknown>).entities = {
								volumes: {
									items: [
										{
											properties: {
												name: volumeProperties.name || undefined,
												licenceType: volumeProperties.licenceType,
												bus: volumeProperties.bus,
												availabilityZone: volumeProperties.availabilityZone,
												exposeSerial: volumeProperties.exposeSerial,
												requireLegacyBios: volumeProperties.requireLegacyBios,
												image: isUuid ? volumeProperties.image : undefined,
												imageAlias: !isUuid ? volumeProperties.image || undefined : undefined,
												imagePassword: volumeProperties.imagePassword || undefined,
											},
										},
									],
								},
							};
						}
						return requestOptions;
					},
				],
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
					{ name: 'AMD EPYC', value: 'AMD_EPYC' },
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
		],
	},
];