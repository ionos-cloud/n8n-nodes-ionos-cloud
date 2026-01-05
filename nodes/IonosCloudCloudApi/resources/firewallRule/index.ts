import type { INodeProperties } from 'n8n-workflow';
import { firewallRuleDescriptions } from './firewallRule';

const showOnlyForFirewallRules = {
	resource: ['firewallRule'],
};

export const firewallRuleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForFirewallRules,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a firewall rule',
				description: 'Create a new firewall rule',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}/firewallrules',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a firewall rule',
				description: 'Delete a firewall rule',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}/firewallrules/{{$parameter.firewallRuleId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a firewall rule',
				description: 'Get the properties of a firewall rule',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}/firewallrules/{{$parameter.firewallRuleId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get firewall rules',
				description: 'Get many firewall rules for a NIC',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}/firewallrules?depth=2',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a firewall rule',
				description: 'Update firewall rule properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}/servers/{{$parameter.serverId}}/nics/{{$parameter.nicId}}/firewallrules/{{$parameter.firewallRuleId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...firewallRuleDescriptions,
];
