import type { INodeProperties } from 'n8n-workflow';

const showForSecurityGroupId = {
	operation: ['get', 'update', 'delete'],
	resource: ['securityGroup'],
};

const showForSecurityGroupCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['securityGroup'],
};

const showOnlyForSecurityGroupGetMany = {
	operation: ['getAll'],
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
		displayOptions: { show: showForSecurityGroupId },
		default: '',
		description: 'The ID of the security group',
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
					},
				},
			},
		],
	},
];
