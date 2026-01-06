import type { INodeProperties } from 'n8n-workflow';

const showForApplicationLoadBalancerId = {
	operation: ['get', 'update', 'delete'],
	resource: ['applicationLoadBalancer'],
};

const showForApplicationLoadBalancerCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['applicationLoadBalancer'],
};

const showOnlyForApplicationLoadBalancerGetMany = {
	operation: ['getAll'],
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
		displayOptions: { show: showForApplicationLoadBalancerId },
		default: '',
		description: 'The ID of the Application Load Balancer',
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
];
