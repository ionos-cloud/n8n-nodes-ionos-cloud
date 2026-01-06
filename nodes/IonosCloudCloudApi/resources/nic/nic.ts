import type { INodeProperties } from 'n8n-workflow';

const showForNicId = {
	operation: ['get', 'update', 'delete'],
	resource: ['nic'],
};

const showForNicCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['nic'],
};

const showOnlyForNicGetMany = {
	operation: ['getAll'],
	resource: ['nic'],
};

export const nicDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['nic'] } },
		default: '',
		description: 'The ID of the datacenter',
	},
	{
		displayName: 'Server ID',
		name: 'serverId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['nic'] } },
		default: '',
		description: 'The ID of the server',
	},
	{
		displayName: 'NIC ID',
		name: 'nicId',
		type: 'string',
		required: true,
		displayOptions: { show: showForNicId },
		default: '',
		description: 'The ID of the NIC',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForNicGetMany,
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
			show: showOnlyForNicGetMany,
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
		displayName: 'LAN',
		name: 'lan',
		type: 'number',
		required: true,
		displayOptions: { show: showForNicCreateOrUpdate },
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'The LAN ID the NIC is connected to',
		routing: {
			send: {
				type: 'body',
				property: 'properties.lan',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForNicCreateOrUpdate },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the NIC',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'DHCP',
				name: 'dhcp',
				type: 'boolean',
				default: true,
				description: 'Whether to enable DHCP',
				routing: {
					send: {
						type: 'body',
						property: 'properties.dhcp',
					},
				},
			},
			{
				displayName: 'IPs',
				name: 'ips',
				type: 'string',
				default: '',
				description: 'Comma-separated list of IP addresses to assign to the NIC',
				routing: {
					send: {
						type: 'body',
						property: 'properties.ips',
						preSend: [
						async function (this, requestOptions) {
								const ips = this.getNodeParameter('additionalFields.ips') as string;
								if (ips) {
									requestOptions.body.properties.ips = ips.split(',').map((ip: string) => ip.trim());
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
