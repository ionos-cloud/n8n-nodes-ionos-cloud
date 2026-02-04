import type { INodeProperties } from 'n8n-workflow';

const showForSecurityGroupCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['securityGroup'],
};

const showOnlyForSecurityGroupGetMany = {
	operation: ['getAll'],
	resource: ['securityGroup'],
};

const showForRuleId = {
	operation: ['getRule', 'updateRule', 'deleteRule'],
	resource: ['securityGroup'],
};

const showForRuleCreateOrUpdate = {
	operation: ['createRule', 'updateRule'],
	resource: ['securityGroup'],
};

export const securityGroupDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['securityGroup'] } },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'Security Group ID',
		name: 'securityGroupId',
		type: 'string',
		required: true,
		displayOptions: { 
			show: { 
				resource: ['securityGroup'],
				operation: ['get', 'update', 'delete', 'createRule', 'updateRule', 'deleteRule', 'getRule', 'getRules']
			} 
		},
		default: '',
		description: 'The ID of the security group',
	},
	{
		displayName: 'Rule ID',
		name: 'ruleId',
		type: 'string',
		required: true,
		displayOptions: { show: showForRuleId },
		default: '',
		description: 'The ID of the security group rule',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSecurityGroupGetMany,
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
			show: showOnlyForSecurityGroupGetMany,
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
		displayOptions: { show: showForSecurityGroupCreateOrUpdate },
		default: '',
		description: 'The name of the security group',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForSecurityGroupCreateOrUpdate },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description for the security group',
				routing: {
					send: {
						type: 'body',
						property: 'properties.description',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},
	// Rule property fields for Create and Update Rule operations
	{
		displayName: 'Protocol',
		name: 'protocol',
		type: 'options',
		required: true,
		displayOptions: { show: showForRuleCreateOrUpdate },
		options: [
			{ name: 'AH', value: 'AH' },
			{ name: 'ANY', value: 'ANY' },
			{ name: 'ESP', value: 'ESP' },
			{ name: 'GRE', value: 'GRE' },
			{ name: 'ICMP', value: 'ICMP' },
			{ name: 'ICMPv6', value: 'ICMPv6' },
			{ name: 'TCP', value: 'TCP' },
			{ name: 'UDP', value: 'UDP' },
			{ name: 'VRRP', value: 'VRRP' },
		],
		default: 'TCP',
		description: 'The protocol for the security group rule (immutable - only used during creation)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.protocol',
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: { show: showForRuleCreateOrUpdate },
		options: [
			{ name: 'Ingress', value: 'INGRESS' },
			{ name: 'Egress', value: 'EGRESS' },
		],
		default: 'INGRESS',
		description: 'The type of the rule (direction of traffic)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.type',
			},
		},
	},
	{
		displayName: 'Rule Properties',
		name: 'ruleProperties',
		type: 'collection',
		placeholder: 'Add Property',
		default: {},
		displayOptions: { show: showForRuleCreateOrUpdate },
		options: [
			{
				displayName: 'ICMP Code',
				name: 'icmpCode',
				type: 'number',
				default: 0,
				typeOptions: { minValue: 0, maxValue: 254 },
				description: 'ICMP code (0-254). Value null allows all codes.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.icmpCode',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'ICMP Type',
				name: 'icmpType',
				type: 'number',
				default: 0,
				typeOptions: { minValue: 0, maxValue: 254 },
				description: 'ICMP type (0-254). Required for ICMP and ICMPv6 protocols.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.icmpType',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'IP Version',
				name: 'ipVersion',
				type: 'options',
				options: [
					{ name: 'IPv4', value: 'IPv4' },
					{ name: 'IPv6', value: 'IPv6' },
				],
				default: 'IPv4',
				description: 'The IP version for this rule',
				routing: {
					send: {
						type: 'body',
						property: 'properties.ipVersion',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the security group rule',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Port Range End',
				name: 'portRangeEnd',
				type: 'number',
				default: 65535,
				typeOptions: { minValue: 1, maxValue: 65535 },
				description: 'Ending port of the range (1-65535). Leave null to allow all ports.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.portRangeEnd',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Port Range Start',
				name: 'portRangeStart',
				type: 'number',
				default: 1,
				typeOptions: { minValue: 1, maxValue: 65535 },
				description: 'Starting port of the range (1-65535). Leave null to allow all ports.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.portRangeStart',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Source IP',
				name: 'sourceIp',
				type: 'string',
				default: '',
				description: 'Source IP address or CIDR block. Value null allows traffic from any IP address.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.sourceIp',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Source MAC',
				name: 'sourceMac',
				type: 'string',
				default: '',
				description: 'Source MAC address. Valid format: aa:bb:cc:dd:ee:ff. Value null allows traffic from any MAC address.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.sourceMac',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Target IP',
				name: 'targetIp',
				type: 'string',
				default: '',
				description: 'Target IP address or CIDR block. Value null allows traffic to any target IP address.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.targetIp',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},
];
