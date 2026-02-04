import type { INodeProperties } from 'n8n-workflow';

const showForNatGatewayCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['natGateway'],
};

const showOnlyForNatGatewayGetMany = {
	operation: ['getAll'],
	resource: ['natGateway'],
};

const showForFlowLogId = {
	operation: ['getFlowLog', 'updateFlowLog', 'deleteFlowLog'],
	resource: ['natGateway'],
};

const showForFlowLogCreateOrUpdate = {
	operation: ['createFlowLog', 'updateFlowLog'],
	resource: ['natGateway'],
};

const showForRuleId = {
	operation: ['getRule', 'updateRule', 'deleteRule'],
	resource: ['natGateway'],
};

const showForRuleCreateOrUpdate = {
	operation: ['createRule', 'updateRule'],
	resource: ['natGateway'],
};

export const natGatewayDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['natGateway'] } },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'NAT Gateway ID',
		name: 'natGatewayId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['natGateway'],
				operation: [
					'get',
					'update',
					'delete',
					'createFlowLog',
					'getFlowLogs',
					'getFlowLog',
					'updateFlowLog',
					'deleteFlowLog',
					'createRule',
					'getRules',
					'getRule',
					'updateRule',
					'deleteRule',
				],
			},
		},
		default: '',
		description: 'The ID of the NAT Gateway',
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
		displayName: 'Rule ID',
		name: 'ruleId',
		type: 'string',
		required: true,
		displayOptions: { show: showForRuleId },
		default: '',
		description: 'The ID of the NAT Gateway rule',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForNatGatewayGetMany,
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
			show: showOnlyForNatGatewayGetMany,
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
		displayOptions: { show: showForNatGatewayCreateOrUpdate },
		default: '',
		description: 'The name of the NAT Gateway',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Public IPs',
		name: 'publicIps',
		type: 'string',
		required: true,
		displayOptions: { show: showForNatGatewayCreateOrUpdate },
		default: '',
		description: 'Comma-separated list of public IP addresses for the NAT Gateway',
		routing: {
			send: {
				type: 'body',
				property: 'properties.publicIps',
				preSend: [
				async function (this, requestOptions) {
						const ips = this.getNodeParameter('publicIps') as string;
						if (ips) {
							requestOptions.body.properties.publicIps = ips.split(',').map((ip: string) => ip.trim());
						}
						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'LANs',
		name: 'lans',
		type: 'string',
		displayOptions: { show: showForNatGatewayCreateOrUpdate },
		default: '',
		description: 'Comma-separated list of LAN IDs to attach to the NAT Gateway',
		routing: {
			send: {
				type: 'body',
				property: 'properties.lans',
				preSend: [
				async function (this, requestOptions) {
						const lans = this.getNodeParameter('lans') as string;
						if (lans) {
							requestOptions.body.properties.lans = lans.split(',').map((id: string) => ({ id: parseInt(id.trim(), 10) }));
						}
						return requestOptions;
					},
				],
			},
		},
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
	// NAT Rule Properties
	{
		displayName: 'Rule Properties',
		name: 'ruleProperties',
		type: 'collection',
		placeholder: 'Add Property',
		default: {},
		displayOptions: { show: showForRuleCreateOrUpdate },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the NAT Gateway rule',
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
						name: 'ICMP',
						value: 'ICMP',
					},
					{
						name: 'ANY',
						value: 'ANY',
					},
				],
				default: 'TCP',
				description: 'The protocol for the NAT rule (immutable - only used during creation)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.protocol',
					},
				},
			},
			{
				displayName: 'Public IP',
				name: 'publicIp',
				type: 'string',
				default: '',
				description: 'The public IP address from the NAT Gateway to use for source IP masking',
				routing: {
					send: {
						type: 'body',
						property: 'properties.publicIp',
					},
				},
			},
			{
				displayName: 'Source Subnet',
				name: 'sourceSubnet',
				type: 'string',
				default: '',
				description: 'The source subnet in CIDR notation (e.g., 10.10.10.0/24)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.sourceSubnet',
					},
				},
			},
			{
				displayName: 'Target Port Range',
				name: 'targetPortRange',
				type: 'fixedCollection',
				default: {},
				description: 'Optional port range for TCP/UDP protocols',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'range',
						displayName: 'Port Range',
						values: [
							{
								displayName: 'Start Port',
								name: 'start',
								type: 'number',
								default: 1,
								typeOptions: {
									minValue: 1,
									maxValue: 65535,
								},
								description: 'The start of the port range',
							},
							{
								displayName: 'End Port',
								name: 'end',
								type: 'number',
								default: 65535,
								typeOptions: {
									minValue: 1,
									maxValue: 65535,
								},
								description: 'The end of the port range',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.targetPortRange',
						preSend: [
							async function (this, requestOptions) {
								const targetPortRange = this.getNodeParameter('ruleProperties.targetPortRange') as Record<string, unknown>;
								if (targetPortRange?.range) {
									requestOptions.body.properties.targetPortRange = {
										start: (targetPortRange.range as Record<string, unknown>).start,
										end: (targetPortRange.range as Record<string, unknown>).end,
									};
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Target Subnet',
				name: 'targetSubnet',
				type: 'string',
				default: '',
				description: 'Optional target subnet in CIDR notation to restrict Internet access',
				routing: {
					send: {
						type: 'body',
						property: 'properties.targetSubnet',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'SNAT',
						value: 'SNAT',
					},
				],
				default: 'SNAT',
				description: 'The type of NAT rule (only SNAT is supported)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.type',
					},
				},
			},
		],
	},
];
