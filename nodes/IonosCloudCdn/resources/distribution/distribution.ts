import type { INodeProperties } from 'n8n-workflow';

export const distributionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['distribution'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new distribution',
				action: 'Create distribution',
				routing: {
					request: {
						method: 'POST',
						url: '/distributions',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a distribution',
				action: 'Delete distribution',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/distributions/{{$parameter.distributionId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a distribution by ID',
				action: 'Get distribution',
				routing: {
					request: {
						method: 'GET',
						url: '=/distributions/{{$parameter.distributionId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many distributions',
				action: 'Get many distributions',
				routing: {
					request: {
						method: 'GET',
						url: '/distributions',
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
			{
				name: 'Update',
				value: 'update',
				description: 'Update a distribution',
				action: 'Update distribution',
				routing: {
					request: {
						method: 'PUT',
						url: '=/distributions/{{$parameter.distributionId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const distributionFields: INodeProperties[] = [
	// distributionId for get, update, delete
	{
		displayName: 'Distribution ID',
		name: 'distributionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['distribution'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID (UUID) of the distribution',
	},

	// Fields for create and update
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['distribution'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'The domain name for the distribution',
		routing: {
			send: {
				type: 'body',
				property: 'properties.domain',
			},
		},
	},
	{
		displayName: 'Certificate ID',
		name: 'certificateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['distribution'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The ID of the SSL/TLS certificate to use (from Certificate Manager)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.certificateId',
			},
		},
	},
	{
		displayName: 'Routing Rules',
		name: 'routingRules',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['distribution'],
				operation: ['create', 'update'],
			},
		},
		default: {},
		description: 'Routing rules for the distribution',
		options: [
			{
				name: 'rule',
				displayName: 'Routing Rule',
				values: [
					{
						displayName: 'Scheme',
						name: 'scheme',
						type: 'options',
						options: [
							{ name: 'HTTP', value: 'http' },
							{ name: 'HTTPS', value: 'https' },
							{ name: 'HTTP/HTTPS', value: 'http/https' },
						],
						default: 'http/https',
						description: 'The protocol scheme',
					},
					{
						displayName: 'Prefix',
						name: 'prefix',
						type: 'string',
						default: '/',
						description: 'URL path prefix to match',
					},
					{
						displayName: 'Upstream Host',
						name: 'upstreamHost',
						type: 'string',
						default: '',
						placeholder: 'origin.example.com',
						description: 'The upstream origin server hostname',
					},
					{
						displayName: 'Upstream GeoRestriction',
						name: 'upstreamGeoRestriction',
						type: 'json',
						default: '',
						description: 'Geo-restriction configuration as JSON',
					},
				],
			},
		],
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						const rules = this.getNodeParameter('routingRules.rule', 0) as Array<Record<string, unknown>>;
						if (rules && rules.length > 0) {
							requestOptions.body = requestOptions.body || {};
							const body = requestOptions.body as Record<string, unknown>;
							body.properties = body.properties || {};
							(body.properties as Record<string, unknown>).routingRules = rules.map(rule => {
								const routingRule: Record<string, unknown> = {
									scheme: rule.scheme,
									prefix: rule.prefix,
									upstream: {
										host: rule.upstreamHost,
									},
								};
								if (rule.upstreamGeoRestriction) {
									try {
										(routingRule.upstream as Record<string, unknown>).geoRestriction = 
											JSON.parse(rule.upstreamGeoRestriction as string);
								} catch {
										// If parsing fails, skip geo restriction
									}
								}
								return routingRule;
							});
						}
						return requestOptions;
					},
				],
			},
		},
	},

	// Pagination and filters for getAll
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['distribution'],
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
				resource: ['distribution'],
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
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['distribution'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter by Domain',
				name: 'filterDomain',
				type: 'string',
				default: '',
				placeholder: 'example.com',
				description: 'Filter distributions by domain',
				routing: {
					send: {
						type: 'query',
						property: 'filter.domain',
					},
				},
			},
			{
				displayName: 'Filter by State',
				name: 'filterState',
				type: 'options',
				options: [
					{ name: 'Available', value: 'AVAILABLE' },
					{ name: 'Busy', value: 'BUSY' },
					{ name: 'Failed', value: 'FAILED' },
					{ name: 'Unknown', value: 'UNKNOWN' },
				],
				default: 'AVAILABLE',
				description: 'Filter distributions by state',
				routing: {
					send: {
						type: 'query',
						property: 'filter.state',
					},
				},
			},
		],
	},
];
