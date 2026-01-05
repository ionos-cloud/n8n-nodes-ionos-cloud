import type { INodeProperties } from 'n8n-workflow';
import { datacenterDescriptions } from './datacenter';

const showOnlyForDatacenters = {
	resource: ['datacenter'],
};

export const datacenterDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDatacenters,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a datacenter',
				description: 'Create a new datacenter',
				routing: {
					request: {
						method: 'POST',
						url: '/datacenters',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a datacenter',
				description: 'Delete a datacenter',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a datacenter',
				description: 'Get the data of a single datacenter',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get datacenters',
				description: 'Get many datacenters',
				routing: {
					request: {
						method: 'GET',
						url: '/datacenters?depth=2',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a datacenter',
				description: 'Update the properties of a datacenter',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...datacenterDescriptions,
];
