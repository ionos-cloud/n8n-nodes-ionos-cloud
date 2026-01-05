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
				name: 'Attach CDROM',
				value: 'attachCdrom',
				action: 'Attach CDROM to server',
				description: 'Attach a CDROM image to server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/cdroms',
					},
				},
			},
			{
				name: 'Attach Volume',
				value: 'attachVolume',
				action: 'Attach volume to server',
				description: 'Attach an existing volume to server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/volumes',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a server',
				description: 'Create a new server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a server',
				description: 'Delete a server',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}',
					},
				},
			},
			{
				name: 'Detach CDROM',
				value: 'detachCdrom',
				action: 'Detach CDROM from server',
				description: 'Detach a CDROM from server',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/cdroms/{{$parameter.cdromId}}',
					},
				},
			},
			{
				name: 'Detach Volume',
				value: 'detachVolume',
				action: 'Detach volume from server',
				description: 'Detach a volume from server',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/volumes/{{$parameter.volumeId}}',
					},
				},
			},
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
				name: 'Get CDROM',
				value: 'getCdrom',
				action: 'Get attached CDROM',
				description: 'Get a specific attached CDROM',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/cdroms/{{$parameter.cdromId}}',
					},
				},
			},
			{
				name: 'Get CDROMs',
				value: 'getCdroms',
				action: 'Get attached cdro ms',
				description: 'List all CDROMs attached to server',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/cdroms',
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
				name: 'Get Remote Console',
				value: 'getRemoteConsole',
				action: 'Get remote console URL',
				description: 'Get remote console access URL',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/remoteconsole',
					},
				},
			},
			{
				name: 'Get Token',
				value: 'getToken',
				action: 'Get server token',
				description: 'Get JSON Web Token for server access',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/token',
					},
				},
			},
			{
				name: 'Get Volume',
				value: 'getVolume',
				action: 'Get attached volume',
				description: 'Get a specific attached volume',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/volumes/{{$parameter.volumeId}}',
					},
				},
			},
			{
				name: 'Get Volumes',
				value: 'getVolumes',
				action: 'Get attached volumes',
				description: 'List all volumes attached to server',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/volumes',
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
				name: 'Resume',
				value: 'resume',
				action: 'Resume a server',
				description: 'Resume a suspended Cube server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/resume',
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
			{
				name: 'Suspend',
				value: 'suspend',
				action: 'Suspend a server',
				description: 'Suspend a Cube server',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/suspend',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a server',
				description: 'Update a server',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}',
					},
				},
			},
			{
				name: 'Upgrade',
				value: 'upgrade',
				action: 'Upgrade a server',
				description: 'Upgrade a server to a newer generation',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/upgrade',
					},
				},
			},
		],
		default: 'getAll',
	},
	...serverDescriptions,
];
