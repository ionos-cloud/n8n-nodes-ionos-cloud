import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['provider'],
	},
};

export const providerOperations: INodeProperties[] = [
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
				description: 'Create a provider',
				action: 'Create a provider',
				routing: {
					request: {
						method: 'POST',
						url: '/providers',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a provider',
				action: 'Delete a provider',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/providers/{{$parameter.providerId}}',
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
				description: 'Get a provider',
				action: 'Get a provider',
				routing: {
					request: {
						method: 'GET',
						url: '=/providers/{{$parameter.providerId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many providers',
				action: 'Get many providers',
				routing: {
					request: {
						method: 'GET',
						url: '/providers',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a provider',
				action: 'Update a provider',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/providers/{{$parameter.providerId}}',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								if (requestOptions.body && typeof requestOptions.body === 'object') {
							const body = requestOptions.body as Record<string, unknown>;
									if (body.properties && typeof body.properties === 'object') {
										requestOptions.body = body.properties;
									}
								}
								return requestOptions;
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
];
