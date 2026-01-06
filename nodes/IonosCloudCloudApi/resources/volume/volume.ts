import type { INodeProperties } from 'n8n-workflow';

const showForVolumeId = {
	operation: ['get', 'update', 'delete', 'createSnapshot'],
	resource: ['volume'],
};

const showForVolumeCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['volume'],
};

const showOnlyForVolumeGetMany = {
	operation: ['getAll'],
	resource: ['volume'],
};

export const volumeDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['volume'] } },
		default: '',
		description: 'The ID of the datacenter this volume belongs to',
	},
	{
		displayName: 'Volume ID',
		name: 'volumeId',
		type: 'string',
		required: true,
		displayOptions: { show: showForVolumeId },
		default: '',
		description: 'The ID of the volume',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForVolumeGetMany,
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
			show: showOnlyForVolumeGetMany,
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
		displayName: 'Size (GB)',
		name: 'size',
		type: 'number',
		required: true,
		displayOptions: { show: showForVolumeCreateOrUpdate },
		default: 10,
		typeOptions: { minValue: 1 },
		description: 'The size of the volume in GB',
		routing: {
			send: {
				type: 'body',
				property: 'properties.size',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForVolumeCreateOrUpdate },
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
				description: 'The availability zone for the volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.availabilityZone',
					},
				},
			},
			{
				displayName: 'Backup Unit ID',
				name: 'backupunitId',
				type: 'string',
				default: '',
				description: 'UUID of the backup unit to associate with this volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.backupunitId',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Boot Order',
				name: 'bootOrder',
				type: 'options',
				options: [
					{ name: 'Auto', value: 'AUTO' },
					{ name: 'Primary', value: 'PRIMARY' },
					{ name: 'None', value: 'NONE' },
				],
				default: 'AUTO',
				description: 'Boot order configuration for the volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.bootOrder',
					},
				},
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
				description: 'The bus type for the volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.bus',
					},
				},
			},
			{
				displayName: 'CPU Hot Plug',
				name: 'cpuHotPlug',
				type: 'boolean',
				default: true,
				description: 'Whether the volume supports CPU hot-plug',
				routing: {
					send: {
						type: 'body',
						property: 'properties.cpuHotPlug',
					},
				},
			},
			{
				displayName: 'Disc VirtIO Hot Plug',
				name: 'discVirtioHotPlug',
				type: 'boolean',
				default: true,
				description: 'Whether the volume supports VirtIO drive hot-plug',
				routing: {
					send: {
						type: 'body',
						property: 'properties.discVirtioHotPlug',
					},
				},
			},
			{
				displayName: 'Disc VirtIO Hot Unplug',
				name: 'discVirtioHotUnplug',
				type: 'boolean',
				default: true,
				description: 'Whether the volume supports VirtIO drive hot-unplug',
				routing: {
					send: {
						type: 'body',
						property: 'properties.discVirtioHotUnplug',
					},
				},
			},
			{
				displayName: 'Image',
				name: 'image',
				type: 'string',
				default: '',
				description: 'UUID of the image to use for the volume (e.g., OS image)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.image',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Image Password',
				name: 'imagePassword',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Initial password for the OS image (if applicable)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.imagePassword',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Licence Type',
				name: 'licenceType',
				type: 'options',
				options: [
					{ name: 'Linux', value: 'LINUX' },
					{ name: 'Windows', value: 'WINDOWS' },
					{ name: 'Windows 2016', value: 'WINDOWS2016' },
					{ name: 'Other', value: 'OTHER' },
				],
				default: 'LINUX',
				description: 'OS type for this volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.licenceType',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'NIC Hot Plug',
				name: 'nicHotPlug',
				type: 'boolean',
				default: true,
				description: 'Whether the volume supports NIC hot-plug',
				routing: {
					send: {
						type: 'body',
						property: 'properties.nicHotPlug',
					},
				},
			},
			{
				displayName: 'NIC Hot Unplug',
				name: 'nicHotUnplug',
				type: 'boolean',
				default: true,
				description: 'Whether the volume supports NIC hot-unplug',
				routing: {
					send: {
						type: 'body',
						property: 'properties.nicHotUnplug',
					},
				},
			},
			{
				displayName: 'RAM Hot Plug',
				name: 'ramHotPlug',
				type: 'boolean',
				default: true,
				description: 'Whether the volume supports RAM hot-plug',
				routing: {
					send: {
						type: 'body',
						property: 'properties.ramHotPlug',
					},
				},
			},
			{
				displayName: 'SSH Keys',
				name: 'sshKeys',
				type: 'string',
				default: '',
				placeholder: 'ssh-rsa AAAA..., ssh-rsa BBBB...',
				description: 'Comma-separated list of SSH public keys to inject into the image',
				routing: {
					send: {
						type: 'body',
						property: 'properties.sshKeys',
						value: '={{ $value.split(",").map(v => v.trim()).filter(v => v) }}',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'HDD', value: 'HDD' },
					{ name: 'SSD', value: 'SSD' },
					{ name: 'SSD Standard', value: 'SSD Standard' },
					{ name: 'SSD Premium', value: 'SSD Premium' },
				],
				default: 'HDD',
				description: 'Hardware type of the volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.type',
					},
				},
			},
			{
				displayName: 'User Data',
				name: 'userData',
				type: 'string',
				default: '',
				placeholder: 'Base64 encoded cloud-init configuration',
				description: 'Cloud-init configuration for the volume (base64 encoded, immutable after creation)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.userData',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},
];
