import type { INodeProperties } from 'n8n-workflow';
import { pccDescriptions } from './pcc';

const showOnlyForPccs = {
	resource: ['pcc'],
};

export const pccDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPccs,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a private cross connect',
				description: 'Create a new Private Cross-Connect',
				routing: {
					request: {
						method: 'POST',
						url: '/pccs',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a private cross connect',
				description: 'Delete a Private Cross-Connect',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/pccs/{{$parameter.pccId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a private cross connect',
				description: 'Get the properties of a Private Cross-Connect',
				routing: {
					request: {
						method: 'GET',
						url: '=/pccs/{{$parameter.pccId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many private cross connects',
				description: 'Get many Private Cross-Connects',
				routing: {
					request: {
						method: 'GET',
						url: '/pccs?depth=2',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a private cross connect',
				description: 'Update Private Cross-Connect properties',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/pccs/{{$parameter.pccId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...pccDescriptions,
];
