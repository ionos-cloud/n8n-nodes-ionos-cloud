import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['dnssec'],
	},
};

export const dnssecOperations: INodeProperties[] = [
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
				description: 'Create DNSSEC keys for a zone',
				action: 'Create DNSSEC keys',
				routing: {
					request: {
						method: 'POST',
						url: '=/{{$parameter.zoneId}}/keys',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete DNSSEC keys for a zone',
				action: 'Delete DNSSEC keys',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/{{$parameter.zoneId}}/keys',
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
				description: 'Get DNSSEC keys for a zone',
				action: 'Get DNSSEC keys',
				routing: {
					request: {
						method: 'GET',
						url: '=/{{$parameter.zoneId}}/keys',
					},
				},
			},
		],
		default: 'get',
	},
];
