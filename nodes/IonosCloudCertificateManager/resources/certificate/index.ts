import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['certificate'],
	},
};

export const certificateOperations: INodeProperties[] = [
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
				description: 'Create a certificate',
				action: 'Create a certificate',
				routing: {
					request: {
						method: 'POST',
						url: '/certificates',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a certificate',
				action: 'Delete a certificate',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/certificates/{{$parameter.certificateId}}',
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
				description: 'Get a certificate',
				action: 'Get a certificate',
				routing: {
					request: {
						method: 'GET',
						url: '=/certificates/{{$parameter.certificateId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many certificates',
				action: 'Get many certificates',
				routing: {
					request: {
						method: 'GET',
						url: '/certificates',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a certificate',
				action: 'Update a certificate',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/certificates/{{$parameter.certificateId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];
