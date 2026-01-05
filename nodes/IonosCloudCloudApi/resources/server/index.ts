import type { INodeProperties } from 'n8n-workflow';
import { serverDescriptions } from './server';

const showOnlyForServers = {
	resource: ['server'],
};

export const serverDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForServers,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a server',
				description: 'Get the data of a single server',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get servers',
				description: 'Get many servers within a specific data center',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers?depth=2',
					},
				},
			},
			{
				name: 'Reboot',
				value: 'reboot',
				action: 'Reboot a  server',
				description: 'Reboot a server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/reboot',
					},
				},
			},
			{
				name: 'Start',
				value: 'start',
				action: 'Start a  server',
				description: 'Start a server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/start',
					},
				},
			},
			{
				name: 'Stop',
				value: 'stop',
				action: 'Stop a  server',
				description: 'Stop a server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/stop',
					},
				},
			},
		],
		default: 'getAll',
	},
	...serverDescriptions,
];
