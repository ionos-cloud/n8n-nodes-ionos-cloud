import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['autoCertificate'],
	},
};

export const autoCertificateOperations: INodeProperties[] = [
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
				description: 'Create an auto certificate',
				action: 'Create an auto certificate',
				routing: {
					request: {
						method: 'POST',
						url: '/auto-certificates',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an auto certificate',
				action: 'Delete an auto certificate',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/auto-certificates/{{$parameter.autoCertificateId}}',
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
				description: 'Get an auto certificate',
				action: 'Get an auto certificate',
				routing: {
					request: {
						method: 'GET',
						url: '=/auto-certificates/{{$parameter.autoCertificateId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many auto certificates',
				action: 'Get many auto certificates',
				routing: {
					request: {
						method: 'GET',
						url: '/auto-certificates',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an auto certificate',
				action: 'Update an auto certificate',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/auto-certificates/{{$parameter.autoCertificateId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];
