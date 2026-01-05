import type { INodeProperties } from 'n8n-workflow';

const showForPccId = {
	operation: ['get', 'update', 'delete'],
	resource: ['pcc'],
};

const showForPccCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['pcc'],
};

const showOnlyForPccGetMany = {
	operation: ['getAll'],
	resource: ['pcc'],
};

export const pccDescriptions: INodeProperties[] = [
	{
		displayName: 'PCC ID',
		name: 'pccId',
		type: 'string',
		required: true,
		displayOptions: { show: showForPccId },
		default: '',
		description: 'The ID of the Private Cross-Connect',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForPccGetMany,
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
			show: showOnlyForPccGetMany,
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
		displayOptions: { show: showForPccCreateOrUpdate },
		default: '',
		description: 'The name of the Private Cross-Connect',
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
		displayOptions: { show: showForPccCreateOrUpdate },
		default: '',
		description: 'A description for the Private Cross-Connect',
		routing: {
			send: {
				type: 'body',
				property: 'properties.description',
			},
		},
	},
];
