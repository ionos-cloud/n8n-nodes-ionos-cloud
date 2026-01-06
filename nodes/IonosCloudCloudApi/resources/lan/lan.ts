import type { INodeProperties } from 'n8n-workflow';

const showForLanId = {
	operation: ['get', 'update', 'delete'],
	resource: ['lan'],
};

const showForLanCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['lan'],
};

const showOnlyForLanGetMany = {
	operation: ['getAll'],
	resource: ['lan'],
};

export const lanDescriptions: INodeProperties[] = [
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['lan'] } },
		default: '',
		description: 'The ID of the datacenter this LAN belongs to',
	},
	{
		displayName: 'LAN ID',
		name: 'lanId',
		type: 'string',
		required: true,
		displayOptions: { show: showForLanId },
		default: '',
		description: 'The ID of the LAN',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForLanGetMany,
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
			show: showOnlyForLanGetMany,
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForLanCreateOrUpdate },
		options: [
			{
				displayName: 'IP Failover',
				name: 'ipFailover',
				type: 'json',
				default: '',
				placeholder: '[{"ip": "192.0.2.1", "nicUuid": "uuid"}]',
				description: 'IP failover configuration as JSON array of objects with ip and nicUuid',
				routing: {
					send: {
						preSend: [
							async function (this, requestOptions) {
								const ipFailover = this.getNodeParameter('additionalFields.ipFailover', 0) as string;
								if (ipFailover) {
									try {
										const body = requestOptions.body as Record<string, unknown>;
										if (!body.properties) body.properties = {};
										(body.properties as Record<string, unknown>).ipFailover = JSON.parse(ipFailover);
									} catch {
										// If parsing fails, skip ipFailover
									}
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'IPv6 CIDR Block',
				name: 'ipv6CidrBlock',
				type: 'string',
				default: '',
				placeholder: 'AUTO or custom /64 block',
				description: 'IPv6 CIDR block for the LAN. Use "AUTO" to auto-assign, or provide a /64 block.',
				routing: {
					send: {
						type: 'body',
						property: 'properties.ipv6CidrBlock',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the LAN',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'PCC ID',
				name: 'pcc',
				type: 'string',
				default: '',
				description: 'UUID of the Private Cross-Connect (PCC) the LAN is connected to',
				routing: {
					send: {
						type: 'body',
						property: 'properties.pcc',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Public',
				name: 'public',
				type: 'boolean',
				default: false,
				description: 'Whether the LAN faces the public Internet or not',
				routing: {
					send: {
						type: 'body',
						property: 'properties.public',
					},
				},
			},
		],
	},
];
