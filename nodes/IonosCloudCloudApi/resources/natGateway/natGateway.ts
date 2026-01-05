import type { INodeProperties } from 'n8n-workflow';

const showForNatGatewayId = {
	operation: ['get', 'update', 'delete'],
	resource: ['natGateway'],
};

const showForNatGatewayCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['natGateway'],
};

const showOnlyForNatGatewayGetMany = {
	operation: ['getAll'],
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
		displayOptions: { show: showForNatGatewayId },
		default: '',
		description: 'The ID of the NAT Gateway',
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
];
