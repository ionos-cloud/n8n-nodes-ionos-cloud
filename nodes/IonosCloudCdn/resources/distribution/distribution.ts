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
				value: '={{ $value || undefined }}',
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
						displayName: 'Enable Caching',
						name: 'upstreamCaching',
						type: 'boolean',
						default: true,
						description: 'Whether to enable caching. If enabled, the CDN will cache responses from the upstream host.',
					},
					{
						displayName: 'Enable WAF',
						name: 'upstreamWaf',
						type: 'boolean',
						default: true,
						description: 'Whether to enable Web Application Firewall to protect the upstream host',
					},
					{
						displayName: 'Geo Restriction',
						name: 'upstreamGeoRestriction',
						type: 'json',
						default: '',
						placeholder: '{"allowList": ["US", "DE"]} or {"blockList": ["CN", "RU"]}',
						description: 'Geo-restriction configuration with ISO 3166-1 alpha-2 country codes',
					},
					{
						displayName: 'Prefix',
						name: 'prefix',
						type: 'string',
						default: '/',
						description: 'URL path prefix to match',
					},
					{
						displayName: 'Rate Limit Class',
						name: 'upstreamRateLimitClass',
						type: 'options',
						options: [
							{
								name: 'R1	-	1 Request/sec per IP',
								value: 'R1',
							},
							{
								name: 'R10	-	10 Requests/sec per IP',
								value: 'R10',
							},
							{
								name: 'R100	-	100 Requests/sec per IP',
								value: 'R100',
							},
							{
								name: 'R25	-	25 Requests/sec per IP',
								value: 'R25',
							},
							{
								name: 'R250	-	250 Requests/sec per IP',
								value: 'R250',
							},
							{
								name: 'R5	-	5 Requests/sec per IP',
								value: 'R5',
							},
							{
								name: 'R50	-	50 Requests/sec per IP',
								value: 'R50',
							},
							{
								name: 'R500	-	500 Requests/sec per IP',
								value: 'R500',
							},
					],
						default: 'R100',
						description: 'Rate limit class to limit the number of incoming requests per IP',
					},
					{
						displayName: 'Scheme',
						name: 'scheme',
						type: 'options',
						options: [
							{
								name: 'HTTP',
								value: 'http',
							},
							{
								name: 'HTTPS',
								value: 'https',
							},
							{
								name: 'HTTP/HTTPS',
								value: 'http/https',
							},
					],
						default: 'http/https',
						description: 'The protocol scheme',
					},
					{
						displayName: 'SNI Mode',
						name: 'upstreamSniMode',
						type: 'options',
						options: [
							{
								name: 'Distribution	-	Match CDN Domain',
								value: 'distribution',
							},
							{
								name: 'Origin	-	Match Upstream Hostname',
								value: 'origin',
							},
					],
						default: 'distribution',
						description: 'SNI (Server Name Indication) mode for SSL/TLS connections to upstream',
					},
					{
						displayName: 'Upstream Host',
						name: 'upstreamHost',
						type: 'string',
							required:	true,
						default: '',
						placeholder: 'origin.example.com',
						description: 'The upstream origin server hostname',
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
								const upstream: Record<string, unknown> = {
									host: rule.upstreamHost,
									caching: rule.upstreamCaching !== undefined ? rule.upstreamCaching : true,
									waf: rule.upstreamWaf !== undefined ? rule.upstreamWaf : true,
									rateLimitClass: rule.upstreamRateLimitClass || 'R100',
									sniMode: rule.upstreamSniMode || 'distribution',
								};
								
								if (rule.upstreamGeoRestriction) {
									try {
										upstream.geoRestrictions = JSON.parse(rule.upstreamGeoRestriction as string);
									} catch {
										// If parsing fails, skip geo restriction
									}
								}
								
								const routingRule: Record<string, unknown> = {
									scheme: rule.scheme,
									prefix: rule.prefix,
									upstream,
								};
								
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
