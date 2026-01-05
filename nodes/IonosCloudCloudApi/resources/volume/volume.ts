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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the volume',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
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
		],
	},
];
