import type { INodeProperties } from 'n8n-workflow';

const showForImageId = {
	operation: ['get', 'delete', 'update'],
	resource: ['image'],
};

const showOnlyForImageGetMany = {
	operation: ['getAll'],
	resource: ['image'],
};

export const imageDescriptions: INodeProperties[] = [
	{
		displayName: 'Image ID',
		name: 'imageId',
		type: 'string',
		required: true,
		displayOptions: { show: showForImageId },
		default: '',
		description: 'The ID of the image',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForImageGetMany,
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
			show: showOnlyForImageGetMany,
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
