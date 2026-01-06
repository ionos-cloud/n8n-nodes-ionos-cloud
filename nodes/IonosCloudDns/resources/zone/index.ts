import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['zone'],
	},
};

export const zoneOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions,
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a DNS zone',
				action: 'Create a zone',
				routing: {
					request: {
						method: 'POST',
						url: '',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a DNS zone',
				action: 'Delete a zone',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/{{$parameter.zoneId}}',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a DNS zone',
				action: 'Get a zone',
				routing: {
					request: {
						method: 'GET',
						url: '=/{{$parameter.zoneId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many DNS zones',
				action: 'Get many zones',
				routing: {
					request: {
						method: 'GET',
						url: '',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a DNS zone',
				action: 'Update a zone',
				routing: {
					request: {
						method: 'PUT',
						url: '=/{{$parameter.zoneId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];
