import type { INodeProperties } from 'n8n-workflow';

const showForRequestGetMany = {
	operation: ['getAll'],
	resource: ['request'],
};

export const requestDescriptions: INodeProperties[] = [
	// Request ID (required for get and getStatus operations)
	{
		displayName: 'Request ID',
		name: 'requestId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['get', 'getStatus'],
				resource: ['request'],
			},
		},
		default: '',
		routing: {
			request: {
				url: '=/requests/{{$value}}{{ $parameter.operation === "getStatus" ? "/status" : "" }}',
			},
		},
		description: 'The unique ID of the request',
	},

	// Additional Fields for getAll
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showForRequestGetMany,
		},
		options: [
			{
				displayName: 'Created After',
				name: 'filter.createdAfter',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filter.createdAfter',
						preSend: [
							// Convert to yyyy-MM-dd HH:mm:ss format
							async function (this, requestOptions) {
								if (requestOptions.qs && requestOptions.qs['filter.createdAfter']) {
									const date = new Date(requestOptions.qs['filter.createdAfter'] as string);
									const year = date.getFullYear();
									const month = String(date.getMonth() + 1).padStart(2, '0');
									const day = String(date.getDate()).padStart(2, '0');
									const hours = String(date.getHours()).padStart(2, '0');
									const minutes = String(date.getMinutes()).padStart(2, '0');
									const seconds = String(date.getSeconds()).padStart(2, '0');
									requestOptions.qs['filter.createdAfter'] = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
								}
								return requestOptions;
							},
						],
					},
				},
				description: 'Filter requests created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'filter.createdBefore',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filter.createdBefore',
						preSend: [
							async function (this, requestOptions) {
								if (requestOptions.qs && requestOptions.qs['filter.createdBefore']) {
									const date = new Date(requestOptions.qs['filter.createdBefore'] as string);
									const year = date.getFullYear();
									const month = String(date.getMonth() + 1).padStart(2, '0');
									const day = String(date.getDate()).padStart(2, '0');
									const hours = String(date.getHours()).padStart(2, '0');
									const minutes = String(date.getMinutes()).padStart(2, '0');
									const seconds = String(date.getSeconds()).padStart(2, '0');
									requestOptions.qs['filter.createdBefore'] = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
								}
								return requestOptions;
							},
						],
					},
				},
				description: 'Filter requests created before this date',
			},
			{
				displayName: 'Created Date',
				name: 'filter.createdDate',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filter.createdDate',
					},
				},
				description: 'Filter by created date (yyyy-MM-dd HH:mm:ss format)',
			},
			{
				displayName: 'Etag',
				name: 'filter.etag',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filter.etag',
					},
				},
				description: 'Filter by etag',
			},
			{
				displayName: 'Method',
				name: 'filter.method',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filter.method',
					},
				},
				description: 'Filter by HTTP method (e.g., GET, POST, PUT, DELETE)',
			},
			{
				displayName: 'Status Filter',
				name: 'filter.status',
				type: 'options',
				options: [
					{ name: 'Queued', value: 'QUEUED' },
					{ name: 'Running', value: 'RUNNING' },
					{ name: 'Done', value: 'DONE' },
					{ name: 'Failed', value: 'FAILED' },
				],
				default: 'QUEUED',
				routing: {
					send: {
						type: 'query',
						property: 'filter.status',
					},
				},
				description: 'Filter by request status',
			},
			{
				displayName: 'URL',
				name: 'filter.url',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filter.url',
					},
				},
				description: 'Filter by URL',
			},
		],
	},

	// Limit for getAll
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showForRequestGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 10000,
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

	// Return All for getAll
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showForRequestGetMany,
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
						pageSize: 1000,
						type: 'query',
					},
				},
			},
		},
	},
];
