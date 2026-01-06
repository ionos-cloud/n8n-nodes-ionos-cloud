import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['secondaryZone'],
	},
};

export const secondaryZoneOperations: INodeProperties[] = [
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
				description: 'Create a secondary zone',
				action: 'Create a secondary zone',
				routing: {
					request: {
						method: 'POST',
						url: '/secondaryzones',
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
				description: 'Delete a secondary zone',
				action: 'Delete a secondary zone',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/secondaryzones/{{$parameter.secondaryZoneId}}',
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
				description: 'Get a secondary zone',
				action: 'Get a secondary zone',
				routing: {
					request: {
						method: 'GET',
						url: '=/secondaryzones/{{$parameter.secondaryZoneId}}',
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
				description: 'Get many secondary zones',
				action: 'Get many secondary zones',
				routing: {
					request: {
						method: 'GET',
						url: '/secondaryzones',
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
				description: 'Update a secondary zone',
				action: 'Update a secondary zone',
				routing: {
					request: {
						method: 'PUT',
						url: '=/secondaryzones/{{$parameter.secondaryZoneId}}',
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
				name: 'AXFR Get',
				value: 'axfrGet',
				description: 'Get AXFR status for a secondary zone',
				action: 'Get AXFR status',
				routing: {
					request: {
						method: 'GET',
						url: '=/secondaryzones/{{$parameter.secondaryZoneId}}/axfr',
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
				name: 'AXFR Start',
				value: 'axfrStart',
				description: 'Trigger AXFR transfer for a secondary zone',
				action: 'Start AXFR transfer',
				routing: {
					request: {
						method: 'PUT',
						url: '=/secondaryzones/{{$parameter.secondaryZoneId}}/axfr',
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
