import type { INodeProperties } from 'n8n-workflow';
import { lanDescriptions } from './lan';

const showOnlyForLans = {
	resource: ['lan'],
};

export const lanDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForLans,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a LAN',
				description: 'Create a new LAN',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/lans',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a LAN',
				description: 'Delete a LAN',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/lans/{{$parameter.lanId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a LAN',
				description: 'Get the properties of a LAN',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/lans/{{$parameter.lanId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many lans',
				description: 'Get many LANs within a datacenter',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/lans?depth=2',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a LAN',
				description: 'Update LAN properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}/lans/{{$parameter.lanId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...lanDescriptions,
];
