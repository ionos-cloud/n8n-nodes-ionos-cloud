import type { INodeProperties } from 'n8n-workflow';

export const ipsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ips'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get edge server IP information by ID',
				action: 'Get edge server IP info',
				routing: {
					request: {
						method: 'GET',
						url: '=/ips/{{$parameter.ipId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many edge server IPs',
				action: 'Get many edge server i ps',
				routing: {
					request: {
						method: 'GET',
						url: '/ips',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'items',
								},
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const ipsFields: INodeProperties[] = [
	// ipId for get
	{
		displayName: 'IP ID',
		name: 'ipId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ips'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID (UUID) of the edge server IP information',
	},

	// Pagination for getAll
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['ips'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['ips'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
];
