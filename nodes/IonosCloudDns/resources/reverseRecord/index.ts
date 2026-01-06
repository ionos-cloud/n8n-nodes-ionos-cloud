import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['reverseRecord'],
	},
};

export const reverseRecordOperations: INodeProperties[] = [
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
				description: 'Create a reverse DNS record',
				action: 'Create a reverse record',
				routing: {
					request: {
						method: 'POST',
						url: '/reverserecords',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								requestOptions.baseURL = 'https://dns.de-fra.ionos.com';
								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a reverse DNS record',
				action: 'Delete a reverse record',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/reverserecords/{{$parameter.reverserecordId}}',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								requestOptions.baseURL = 'https://dns.de-fra.ionos.com';
								return requestOptions;
							},
						],
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
				description: 'Get a reverse DNS record',
				action: 'Get a reverse record',
				routing: {
					request: {
						method: 'GET',
						url: '=/reverserecords/{{$parameter.reverserecordId}}',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								requestOptions.baseURL = 'https://dns.de-fra.ionos.com';
								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many reverse DNS records',
				action: 'Get many reverse records',
				routing: {
					request: {
						method: 'GET',
						url: '/reverserecords',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								requestOptions.baseURL = 'https://dns.de-fra.ionos.com';
								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a reverse DNS record',
				action: 'Update a reverse record',
				routing: {
					request: {
						method: 'PUT',
						url: '=/reverserecords/{{$parameter.reverserecordId}}',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								requestOptions.baseURL = 'https://dns.de-fra.ionos.com';
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
