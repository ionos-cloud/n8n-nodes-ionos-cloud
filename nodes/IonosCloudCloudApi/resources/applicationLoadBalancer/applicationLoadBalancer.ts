import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showForApplicationLoadBalancerCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['applicationLoadBalancer'],
};

const showOnlyForApplicationLoadBalancerGetMany = {
	operation: ['getAll'],
	resource: ['applicationLoadBalancer'],
};

const showForFlowLogId = {
	operation: ['getFlowLog', 'updateFlowLog', 'deleteFlowLog'],
	resource: ['applicationLoadBalancer'],
};

const showForForwardingRuleId = {
	operation: ['getForwardingRule', 'updateForwardingRule', 'deleteForwardingRule'],
	resource: ['applicationLoadBalancer'],
};

export const applicationLoadBalancerDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['applicationLoadBalancer'] } },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'Application Load Balancer ID',
		name: 'applicationLoadBalancerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['applicationLoadBalancer'],
				operation: [
					'get',
					'update',
					'delete',
					'createFlowLog',
					'getFlowLogs',
					'getFlowLog',
					'updateFlowLog',
					'deleteFlowLog',
					'createForwardingRule',
					'getForwardingRules',
					'getForwardingRule',
					'updateForwardingRule',
					'deleteForwardingRule',
				],
			},
		},
		default: '',
		description: 'The ID of the Application Load Balancer',
	},
	{
		displayName: 'Flow Log ID',
		name: 'flowLogId',
		type: 'string',
		required: true,
		displayOptions: { show: showForFlowLogId },
		default: '',
		description: 'The ID of the flow log',
	},
	{
		displayName: 'Forwarding Rule ID',
		name: 'forwardingRuleId',
		type: 'string',
		required: true,
		displayOptions: { show: showForForwardingRuleId },
		default: '',
		description: 'The ID of the forwarding rule',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForApplicationLoadBalancerGetMany,
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
			show: showOnlyForApplicationLoadBalancerGetMany,
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
		displayOptions: { show: showForApplicationLoadBalancerCreateOrUpdate },
		default: '',
		description: 'The name of the Application Load Balancer',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Listener LAN',
		name: 'listenerLan',
		type: 'number',
		required: true,
		displayOptions: { show: showForApplicationLoadBalancerCreateOrUpdate },
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'ID of the listening (inbound) LAN',
		routing: {
			send: {
				type: 'body',
				property: 'properties.listenerLan',
			},
		},
	},
	{
		displayName: 'Target LAN',
		name: 'targetLan',
		type: 'number',
		required: true,
		displayOptions: { show: showForApplicationLoadBalancerCreateOrUpdate },
		default: 2,
		typeOptions: { minValue: 1 },
		description: 'ID of the balanced private target LAN (outbound)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.targetLan',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForApplicationLoadBalancerCreateOrUpdate },
		options: [
			{
				displayName: 'Central Logging',
				name: 'centralLogging',
				type: 'boolean',
				default: false,
				description: 'Whether to enable central logging',
				routing: {
					send: {
						type: 'body',
						property: 'properties.centralLogging',
					},
				},
			},
			{
				displayName: 'IPs',
				name: 'ips',
				type: 'string',
				default: '',
				placeholder: '192.0.2.1, 192.0.2.2',
				description: 'Comma-separated list of IPs for the load balancer (inbound and outbound)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.ips',
						value: '={{ $value.split(",").map(v => v.trim()).filter(v => v) }}',
					},
				},
			},
			{
				displayName: 'LB Private IPs',
				name: 'lbPrivateIps',
				type: 'string',
				default: '',
				placeholder: '10.0.0.1/24, 10.0.0.2/24',
				description: 'Comma-separated list of private IPs with subnet mask',
				routing: {
					send: {
						type: 'body',
						property: 'properties.lbPrivateIps',
						value: '={{ $value.split(",").map(v => v.trim()).filter(v => v) }}',
					},
				},
			},
			{
				displayName: 'Logging Format',
				name: 'loggingFormat',
				type: 'string',
				default: '',
				description: 'Specifies the format of the logs',
				routing: {
					send: {
						type: 'body',
						property: 'properties.loggingFormat',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},
	// Flow Log Properties
	{
		displayName: 'Flow Log Properties',
		name: 'flowLogProperties',
		type: 'collection',
		placeholder: 'Add Flow Log Property',
		default: {},
		displayOptions: {
			show: {
				resource: ['applicationLoadBalancer'],
				operation: ['createFlowLog', 'updateFlowLog'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The resource name',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
					},
				},
			},
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				default: 'ALL',
				options: [
					{
						name: 'ACCEPTED',
						value: 'ACCEPTED',
					},
					{
						name: 'REJECTED',
						value: 'REJECTED',
					},
					{
						name: 'ALL',
						value: 'ALL',
					},
				],
				description: 'Specifies the traffic action pattern',
				routing: {
					send: {
						type: 'body',
						property: 'properties.action',
					},
				},
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'options',
				default: 'BIDIRECTIONAL',
				options: [
					{
						name: 'INGRESS',
						value: 'INGRESS',
					},
					{
						name: 'EGRESS',
						value: 'EGRESS',
					},
					{
						name: 'BIDIRECTIONAL',
						value: 'BIDIRECTIONAL',
					},
				],
				description: 'Specifies the traffic direction pattern',
				routing: {
					send: {
						type: 'body',
						property: 'properties.direction',
					},
				},
			},
			{
				displayName: 'Bucket',
				name: 'bucket',
				type: 'string',
				default: '',
				description: 'The bucket name of an existing IONOS Cloud Object storage bucket',
				routing: {
					send: {
						type: 'body',
						property: 'properties.bucket',
					},
				},
			},
		],
	},
	// Forwarding Rule Properties
	{
		displayName: 'Forwarding Rule Properties',
		name: 'forwardingRuleProperties',
		type: 'collection',
		placeholder: 'Add Forwarding Rule Property',
		default: {},
		displayOptions: {
			show: {
				resource: ['applicationLoadBalancer'],
				operation: ['createForwardingRule', 'updateForwardingRule'],
			},
		},
		options: [
			{
				displayName: 'Client Timeout',
				name: 'clientTimeout',
				type: 'number',
				default: 50000,
				description: 'The maximum time in milliseconds to wait for the client to acknowledge or send data. Default is 50,000 (50 seconds).',
				routing: {
					send: {
						type: 'body',
						property: 'properties.clientTimeout',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'HTTP Rules',
				name: 'httpRules',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add HTTP Rule',
				description: 'HTTP routing rules for the forwarding rule. Rules are processed in order except FORWARD type rules which are processed last.',
				options: [
					{
						name: 'rules',
						displayName: 'Rules',
						values: [
							{
						displayName: 'Content Type',
						name: 'contentType',
						type: 'string',
						default: 'text/html',
						description: 'The content type for STATIC type rules',
							},
							{
						displayName: 'Drop Query',
						name: 'dropQuery',
						type: 'boolean',
						default: false,
						description: 'Whether to drop query string during redirect',
							},
							{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						description: 'The location URL for REDIRECT type rules',
							},
							{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the HTTP rule',
							},
							{
						displayName: 'Response Message',
						name: 'responseMessage',
						type: 'string',
						default: '',
						description: 'The response message body for STATIC type rules',
							},
							{
						displayName: 'Status Code',
						name: 'statusCode',
						type: 'number',
						default: 200,
						description: 'HTTP status code for STATIC type rules',
							},
							{
						displayName: 'Target Group',
						name: 'targetGroup',
						type: 'string',
						default: '',
						description: 'The UUID of the target group for FORWARD type rules',
							},
							{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'FORWARD',
						options: [
									{
										name: 'FORWARD',
										value: 'FORWARD',
									},
									{
										name: 'STATIC',
										value: 'STATIC',
									},
									{
										name: 'REDIRECT',
										value: 'REDIRECT',
									},
								],
						description: 'The type of HTTP rule action',
							},
					],
					},
				],
				routing: {
					send: {
						preSend: [
							async function (this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions) {
								const httpRules = this.getNodeParameter('forwardingRuleProperties.httpRules') as IDataObject;
								if (httpRules?.rules && Array.isArray(httpRules.rules) && httpRules.rules.length > 0) {
									const body = requestOptions.body as IDataObject;
									if (!body.properties) {
										body.properties = {};
									}
									(body.properties as IDataObject).httpRules = httpRules.rules;
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Listener IP',
				name: 'listenerIp',
				type: 'string',
				default: '',
				description: 'The listening (inbound) IP',
				routing: {
					send: {
						type: 'body',
						property: 'properties.listenerIp',
					},
				},
			},
			{
				displayName: 'Listener Port',
				name: 'listenerPort',
				type: 'number',
				default: 8080,
				typeOptions: {
					minValue: 1,
					maxValue: 65535,
				},
				description: 'The listening (inbound) port number; valid range is 1 to 65535',
				routing: {
					send: {
						type: 'body',
						property: 'properties.listenerPort',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the Application Load Balancer forwarding rule',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
					},
				},
			},
			{
				displayName: 'Protocol',
				name: 'protocol',
				type: 'options',
				default: 'HTTP',
				options: [
					{
						name: 'HTTP',
						value: 'HTTP',
					},
				],
				description: 'The balancing protocol. Only HTTP is supported for Application Load Balancers (immutable - only used during creation).',
				routing: {
					send: {
						type: 'body',
						property: 'properties.protocol',
					},
				},
			},
			{
				displayName: 'Server Certificates',
				name: 'serverCertificates',
				type: 'string',
				default: '',
				placeholder: 'certificate-uuid-1, certificate-uuid-2',
				description: 'Comma-separated list of server certificate UUIDs for HTTPS support',
				routing: {
					send: {
						type: 'body',
						property: 'properties.serverCertificates',
						value: '={{ $value ? $value.split(",").map(v => v.trim()).filter(v => v) : undefined }}',
					},
				},
			},
		],
	},
];
