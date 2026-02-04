import type { INodeProperties } from 'n8n-workflow';

const showForNetworkLoadBalancerCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['networkLoadBalancer'],
};

const showOnlyForNetworkLoadBalancerGetMany = {
	operation: ['getAll'],
	resource: ['networkLoadBalancer'],
};

const showForFlowLogId = {
	operation: ['getFlowLog', 'updateFlowLog', 'deleteFlowLog'],
	resource: ['networkLoadBalancer'],
};

const showForFlowLogCreateOrUpdate = {
	operation: ['createFlowLog', 'updateFlowLog'],
	resource: ['networkLoadBalancer'],
};

const showForForwardingRuleId = {
	operation: ['getForwardingRule', 'updateForwardingRule', 'deleteForwardingRule'],
	resource: ['networkLoadBalancer'],
};

const showForForwardingRuleCreateOrUpdate = {
	operation: ['createForwardingRule', 'updateForwardingRule'],
	resource: ['networkLoadBalancer'],
};

export const networkLoadBalancerDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['networkLoadBalancer'] } },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'Network Load Balancer ID',
		name: 'networkLoadBalancerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['networkLoadBalancer'],
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
		description: 'The ID of the Network Load Balancer',
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
				...showOnlyForNetworkLoadBalancerGetMany,
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
			show: showOnlyForNetworkLoadBalancerGetMany,
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
		displayOptions: { show: showForNetworkLoadBalancerCreateOrUpdate },
		default: '',
		description: 'The name of the Network Load Balancer',
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
		displayOptions: { show: showForNetworkLoadBalancerCreateOrUpdate },
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
		displayOptions: { show: showForNetworkLoadBalancerCreateOrUpdate },
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
		displayOptions: { show: showForNetworkLoadBalancerCreateOrUpdate },
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
		placeholder: 'Add Property',
		default: {},
		displayOptions: { show: showForFlowLogCreateOrUpdate },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the flow log',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
					},
				},
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'options',
				options: [
					{
						name: 'Ingress',
						value: 'INGRESS',
					},
					{
						name: 'Egress',
						value: 'EGRESS',
					},
					{
						name: 'Bidirectional',
						value: 'BIDIRECTIONAL',
					},
				],
				default: 'BIDIRECTIONAL',
				description: 'The direction of traffic to log',
				routing: {
					send: {
						type: 'body',
						property: 'properties.direction',
					},
				},
			},
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				options: [
					{
						name: 'Accepted',
						value: 'ACCEPTED',
					},
					{
						name: 'Rejected',
						value: 'REJECTED',
					},
					{
						name: 'All',
						value: 'ALL',
					},
				],
				default: 'ALL',
				description: 'The action to log (accepted, rejected, or all traffic)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.action',
					},
				},
			},
			{
				displayName: 'Bucket',
				name: 'bucket',
				type: 'string',
				default: '',
				description: 'The name of the IONOS Object Storage bucket where flow logs will be stored',
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
		placeholder: 'Add Property',
		default: {},
		displayOptions: { show: showForForwardingRuleCreateOrUpdate },
		options: [
			{
				displayName: 'Algorithm',
				name: 'algorithm',
				type: 'options',
				options: [
					{
						name: 'Round Robin',
						value: 'ROUND_ROBIN',
					},
					{
						name: 'Least Connection',
						value: 'LEAST_CONNECTION',
					},
					{
						name: 'Random',
						value: 'RANDOM',
					},
					{
						name: 'Source IP',
						value: 'SOURCE_IP',
					},
				],
				default: 'ROUND_ROBIN',
				description: 'The load balancing algorithm',
				routing: {
					send: {
						type: 'body',
						property: 'properties.algorithm',
					},
				},
			},
			{
				displayName: 'Health Check',
				name: 'healthCheck',
				type: 'fixedCollection',
				default: {},
				description: 'Health check configuration for targets',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'config',
						displayName: 'Health Check Configuration',
						values: [
							{
								displayName: 'Client Timeout',
								name: 'clientTimeout',
								type: 'number',
								default: 50000,
								description: 'The maximum time in milliseconds to wait for the client to acknowledge or send data (default: 50000)',
							},
							{
								displayName: 'Connect Timeout',
								name: 'connectTimeout',
								type: 'number',
								default: 5000,
								description: 'The maximum time in milliseconds to wait for a connection attempt to a target to succeed (default: 5000)',
							},
							{
								displayName: 'Target Timeout',
								name: 'targetTimeout',
								type: 'number',
								default: 50000,
								description: 'The maximum time in milliseconds that the target can take to respond (default: 50000)',
							},
							{
								displayName: 'Retries',
								name: 'retries',
								type: 'number',
								default: 3,
								description: 'The number of retries to perform if a health check fails (default: 3)',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.healthCheck',
						preSend: [
							async function (this, requestOptions) {
								const healthCheck = this.getNodeParameter('forwardingRuleProperties.healthCheck') as Record<string, unknown>;
								if (healthCheck?.config) {
									requestOptions.body.properties.healthCheck = healthCheck.config;
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
				description: 'The listening IP address of the Network Load Balancer',
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
				default: 80,
				typeOptions: {
					minValue: 1,
					maxValue: 65535,
				},
				description: 'The listening port of the Network Load Balancer',
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
				description: 'The name of the forwarding rule',
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
				options: [
					{
						name: 'TCP',
						value: 'TCP',
					},
					{
						name: 'UDP',
						value: 'UDP',
					},
					{
						name: 'HTTP',
						value: 'HTTP',
					},
				],
				default: 'TCP',
				description: 'The protocol of the forwarding rule (immutable - only used during creation)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.protocol',
					},
				},
			},
			{
				displayName: 'Targets',
				name: 'targets',
				type: 'fixedCollection',
				default: {},
				description: 'Health check configuration for targets',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'config',
						displayName: 'Health Check Configuration',
						values: [
							{
								displayName: 'Client Timeout',
								name: 'clientTimeout',
								type: 'number',
								default: 50000,
								description: 'The maximum time in milliseconds to wait for the client to acknowledge or send data (default: 50000)',
							},
							{
								displayName: 'Connect Timeout',
								name: 'connectTimeout',
								type: 'number',
								default: 5000,
								description: 'The maximum time in milliseconds to wait for a connection attempt to a target to succeed (default: 5000)',
							},
							{
								displayName: 'Target Timeout',
								name: 'targetTimeout',
								type: 'number',
								default: 50000,
								description: 'The maximum time in milliseconds that the target can take to respond (default: 50000)',
							},
							{
								displayName: 'Retries',
								name: 'retries',
								type: 'number',
								default: 3,
								description: 'The number of retries to perform if a health check fails (default: 3)',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.healthCheck',
						preSend: [
							async function (this, requestOptions) {
								const healthCheck = this.getNodeParameter('forwardingRuleProperties.healthCheck') as Record<string, unknown>;
								if (healthCheck?.config) {
									requestOptions.body.properties.healthCheck = healthCheck.config;
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Targets',
				name: 'targets',
				type: 'fixedCollection',
				default: {},
				description: 'Target servers for the forwarding rule',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'target',
						displayName: 'Target',
						values: [
							{
						displayName: 'Health Check Enabled',
						name: 'healthCheckEnabled',
						type: 'boolean',
						default: true,
						description: 'Whether health check is enabled for this target',
							},
							{
						displayName: 'IP',
						name: 'ip',
						type: 'string',
						default: '',
						description: 'The IP address of the target',
							},
							{
						displayName: 'Maintenance Mode',
						name: 'maintenanceMode',
						type: 'boolean',
						default: false,
						description: 'Whether the target is in maintenance mode',
							},
							{
						displayName: 'Port',
						name: 'port',
						type: 'number',
						default: 80,
						description: 'The port of the target',
							},
							{
						displayName: 'Weight',
						name: 'weight',
						type: 'number',
						default: 1,
						description: 'The weight of the target (for weighted load balancing)',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.targets',
						preSend: [
							async function (this, requestOptions) {
								const targets = this.getNodeParameter('forwardingRuleProperties.targets') as Record<string, unknown>;
								if (targets?.target) {
									requestOptions.body.properties.targets = targets.target;
								}
								return requestOptions;
							},
						],
					},
				},
			},
		],
	},
];
