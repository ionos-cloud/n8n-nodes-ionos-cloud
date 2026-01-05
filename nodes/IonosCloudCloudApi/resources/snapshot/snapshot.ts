import type { INodeProperties } from 'n8n-workflow';

const showForSnapshotId = {
	operation: ['get', 'update', 'delete'],
	resource: ['snapshot'],
};

const showForSnapshotUpdate = {
	operation: ['update'],
	resource: ['snapshot'],
};

const showOnlyForSnapshotGetMany = {
	operation: ['getAll'],
	resource: ['snapshot'],
};

export const snapshotDescriptions: INodeProperties[] = [
	{
		displayName: 'Snapshot ID',
		name: 'snapshotId',
		type: 'string',
		required: true,
		displayOptions: { show: showForSnapshotId },
		default: '',
		description: 'The ID of the snapshot',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSnapshotGetMany,
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
			show: showOnlyForSnapshotGetMany,
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
	// Fields for Update
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForSnapshotUpdate },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the snapshot',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Human-readable description',
				routing: {
					send: {
						type: 'body',
						property: 'properties.description',
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
				description: 'OS type for this snapshot',
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
