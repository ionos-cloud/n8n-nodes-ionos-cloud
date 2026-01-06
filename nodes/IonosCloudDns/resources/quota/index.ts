import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['quota'],
	},
};

export const quotaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions,
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get quota information',
				action: 'Get quota',
				routing: {
					request: {
						method: 'GET',
						url: '/quota',
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
		default: 'get',
	},
];
