import type { INodeProperties } from 'n8n-workflow';
import { targetGroupDescriptions } from './targetGroup';

export const targetGroupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['targetGroup'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a target group',
				action: 'Create a target group',
				routing: {
					request: {
						method: 'POST',
						url: '=/targetgroups',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a target group',
				action: 'Delete a target group',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/targetgroups/{{$parameter.targetGroupId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a target group',
				action: 'Get a target group',
				routing: {
					request: {
						method: 'GET',
						url: '=/targetgroups/{{$parameter.targetGroupId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many target groups',
				action: 'Get many target groups',
				routing: {
					request: {
						method: 'GET',
						url: '=/targetgroups',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a target group',
				action: 'Update a target group',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/targetgroups/{{$parameter.targetGroupId}}',
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
		default: 'getMany',
	},
	...targetGroupDescriptions,
];
