import type { INodeProperties } from 'n8n-workflow';
import { nicDescriptions } from './nic';

const showOnlyForNics = {
	resource: ['nic'],
};

export const nicDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForNics,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a NIC',
				description: 'Create a new network interface',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a NIC',
				description: 'Delete a network interface',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a NIC',
				description: 'Get the properties of a network interface',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many nics',
				description: 'Get many network interfaces of a server',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics?depth=2',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a NIC',
				description: 'Update network interface properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...nicDescriptions,
];
