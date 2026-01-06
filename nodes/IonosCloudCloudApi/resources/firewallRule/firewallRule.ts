import type { INodeProperties } from 'n8n-workflow';

const showForFirewallRuleId = {
	operation: ['get', 'update', 'delete'],
	resource: ['firewallRule'],
};

const showForFirewallRuleCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['firewallRule'],
};

const showOnlyForFirewallRuleGetMany = {
	operation: ['getAll'],
	resource: ['firewallRule'],
};

export const firewallRuleDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['firewallRule'] } },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'Server ID',
		name: 'serverId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['firewallRule'] } },
		default: '',
		description: 'The ID of the server',
	},
	{
		displayName: 'NIC ID',
		name: 'nicId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['firewallRule'] } },
		default: '',
		description: 'The ID of the NIC',
	},
	{
		displayName: 'Firewall Rule ID',
		name: 'firewallRuleId',
		type: 'string',
		required: true,
		displayOptions: { show: showForFirewallRuleId },
		default: '',
		description: 'The ID of the firewall rule',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForFirewallRuleGetMany,
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
			show: showOnlyForFirewallRuleGetMany,
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
		displayName: 'Protocol',
		name: 'protocol',
		type: 'options',
		required: true,
		displayOptions: { show: showForFirewallRuleCreateOrUpdate },
		options: [
			{ name: 'TCP', value: 'TCP' },
			{ name: 'UDP', value: 'UDP' },
			{ name: 'ICMP', value: 'ICMP' },
			{ name: 'Any', value: 'ANY' },
		],
		default: 'TCP',
		description: 'The protocol for the firewall rule',
		routing: {
			send: {
				type: 'body',
				property: 'properties.protocol',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForFirewallRuleCreateOrUpdate },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the firewall rule',
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
				description: 'Ending port of the range',
				routing: {
					send: {
						type: 'body',
						property: 'properties.portRangeEnd',
					},
				},
			},
			{
				displayName: 'Port Range Start',
				name: 'portRangeStart',
				type: 'number',
				default: 1,
				typeOptions: { minValue: 1, maxValue: 65535 },
				description: 'Starting port of the range',
				routing: {
					send: {
						type: 'body',
						property: 'properties.portRangeStart',
					},
				},
			},
			{
				displayName: 'Source IP',
				name: 'sourceIp',
				type: 'string',
				default: '',
				description: 'Source IP address or CIDR block',
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
				description: 'Source MAC address',
				routing: {
					send: {
						type: 'body',
						property: 'properties.sourceMac',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},
];
