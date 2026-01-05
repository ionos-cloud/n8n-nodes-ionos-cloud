import type { INodeProperties } from 'n8n-workflow';

const showForLoadBalancerId = {
	operation: ['get', 'update', 'delete'],
	resource: ['loadBalancer'],
};

const showForLoadBalancerCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['loadBalancer'],
};

const showOnlyForLoadBalancerGetMany = {
	operation: ['getAll'],
	resource: ['loadBalancer'],
};

export const loadBalancerDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['loadBalancer'] } },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'Load Balancer ID',
		name: 'loadBalancerId',
		type: 'string',
		required: true,
		displayOptions: { show: showForLoadBalancerId },
		default: '',
		description: 'The ID of the Load Balancer',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForLoadBalancerGetMany,
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
			show: showOnlyForLoadBalancerGetMany,
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
		displayOptions: { show: showForLoadBalancerCreateOrUpdate },
		default: '',
		description: 'The name of the Load Balancer',
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
		displayOptions: { show: showForLoadBalancerCreateOrUpdate },
		options: [
			{
				displayName: 'DHCP',
				name: 'dhcp',
				type: 'boolean',
				default: true,
				description: 'Whether the load balancer will reserve an IP using DHCP',
				routing: {
					send: {
						type: 'body',
						property: 'properties.dhcp',
					},
				},
			},
			{
				displayName: 'IP',
				name: 'ip',
				type: 'string',
				default: '',
				description: 'IPv4 address of the load balancer. All attached NICs will inherit this IP.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.ip',
					},
				},
			},
		],
	},
];
