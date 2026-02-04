import { requestDescriptions } from './request';
import type { INodeProperties } from 'n8n-workflow';

export const requestDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['request'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a specific request',
				action: 'Get a request',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'List many API requests',
				action: 'Get many requests',
				routing: {
					request: {
						method: 'GET',
						url: '/requests',
					},
				},
			},
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Retrieve the status of a request',
				action: 'Get request status',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
		],
		default: 'getAll',
	},
	...requestDescriptions,
];

export { requestDescriptions };
