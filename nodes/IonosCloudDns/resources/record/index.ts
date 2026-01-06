import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['record'],
	},
};

export const recordOperations: INodeProperties[] = [
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
				description: 'Create a DNS record',
				action: 'Create a record',
				routing: {
					request: {
						method: 'POST',
						url: '=/{{$parameter.zoneId}}/records',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a DNS record',
				action: 'Delete a record',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/{{$parameter.zoneId}}/records/{{$parameter.recordId}}',
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
				description: 'Get a DNS record',
				action: 'Get a record',
				routing: {
					request: {
						method: 'GET',
						url: '=/{{$parameter.zoneId}}/records/{{$parameter.recordId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many DNS records',
				action: 'Get many records',
				routing: {
					request: {
						method: 'GET',
						url: '={{ $parameter.zoneId ? "/" + $parameter.zoneId + "/records" : "/records" }}',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								// Adjust baseURL for global records endpoint
								const zoneId = this.getNodeParameter('zoneId', '') as string;
								if (!zoneId) {
									requestOptions.baseURL = 'https://dns.de-fra.ionos.com';
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a DNS record',
				action: 'Update a record',
				routing: {
					request: {
						method: 'PUT',
						url: '=/{{$parameter.zoneId}}/records/{{$parameter.recordId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];
