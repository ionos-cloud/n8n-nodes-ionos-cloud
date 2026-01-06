import type { INodeProperties } from 'n8n-workflow';

const showForReverseRecordId = {
	operation: ['get', 'update', 'delete'],
	resource: ['reverseRecord'],
};

const showForReverseRecordCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['reverseRecord'],
};

const showOnlyForReverseRecordGetMany = {
	operation: ['getAll'],
	resource: ['reverseRecord'],
};

export const reverseRecordDescriptions: INodeProperties[] = [
	{
		displayName: 'Reverse Record ID',
		name: 'reverserecordId',
		type: 'string',
		required: true,
		displayOptions: { show: showForReverseRecordId },
		default: '',
		description: 'The ID of the reverse DNS record',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForReverseRecordGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
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
			show: showOnlyForReverseRecordGetMany,
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
	// Additional Filters for Get Many
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForReverseRecordGetMany },
		options: [
			{
				displayName: 'Record IPs',
				name: 'recordIp',
				type: 'string',
				default: '',
				description: 'Filter by IP address (comma-separated for multiple)',
				routing: {
					send: {
						type: 'query',
						property: 'filter.recordIp',
					},
				},
			},
		],
	},
	// Fields for Create and Update
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForReverseRecordCreateOrUpdate },
		default: '',
		description: 'The reverse DNS name',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'IP',
		name: 'ip',
		type: 'string',
		required: true,
		displayOptions: { show: showForReverseRecordCreateOrUpdate },
		default: '',
		description: 'The IP address for reverse DNS',
		routing: {
			send: {
				type: 'body',
				property: 'properties.ip',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForReverseRecordCreateOrUpdate },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The reverse record description',
				routing: {
					send: {
						type: 'body',
						property: 'properties.description',
					},
				},
			},
		],
	},
];
