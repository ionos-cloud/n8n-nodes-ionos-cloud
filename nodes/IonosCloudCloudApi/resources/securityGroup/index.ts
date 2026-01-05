import type { INodeProperties } from 'n8n-workflow';
import { securityGroupDescriptions } from './securityGroup';

const showOnlyForSecurityGroups = {
	resource: ['securityGroup'],
};

export const securityGroupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSecurityGroups,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a security group',
				description: 'Create a new security group',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups',
					},
				},
			},
			{
				name: 'Create Rule',
				value: 'createRule',
				action: 'Create a security group rule',
				description: 'Create a new rule in a security group',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}/rules',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a security group',
				description: 'Delete a security group',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}',
					},
				},
			},
			{
				name: 'Delete Rule',
				value: 'deleteRule',
				action: 'Delete a security group rule',
				description: 'Delete a rule from a security group',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}/rules/{{$parameter.ruleId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a security group',
				description: 'Get the properties of a security group',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get security groups',
				description: 'Get many security groups within a datacenter',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups?depth=2',
					},
				},
			},
			{
				name: 'Get Rule',
				value: 'getRule',
				action: 'Get a security group rule',
				description: 'Get properties of a specific rule',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}/rules/{{$parameter.ruleId}}',
					},
				},
			},
			{
				name: 'Get Rules',
				value: 'getRules',
				action: 'Get security group rules',
				description: 'List all rules in a security group',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}/rules',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a security group',
				description: 'Update security group properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}',
					},
				},
			},
			{
				name: 'Update Rule',
				value: 'updateRule',
				action: 'Update a security group rule',
				description: 'Update a rule in a security group',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/datacenters/{{$parameter.datacenterId}}/securitygroups/{{$parameter.securityGroupId}}/rules/{{$parameter.ruleId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...securityGroupDescriptions,
];
