import type { INodeProperties } from 'n8n-workflow';
import { applicationLoadBalancerDescriptions } from './applicationLoadBalancer';

export const applicationLoadBalancerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['applicationLoadBalancer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an Application Load Balancer',
				action: 'Create an application load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers',
					},
				},
			},
			{
				name: 'Create Flow Log',
				value: 'createFlowLog',
				description: 'Create a flow log for an Application Load Balancer',
				action: 'Create a flow log for an application load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/flowlogs',
					},
				},
			},
			{
				name: 'Create Forwarding Rule',
				value: 'createForwardingRule',
				description: 'Create a forwarding rule for an Application Load Balancer',
				action: 'Create a forwarding rule for an application load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/forwardingrules',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an Application Load Balancer',
				action: 'Delete an application load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Delete Flow Log',
				value: 'deleteFlowLog',
				description: 'Delete a flow log from an Application Load Balancer',
				action: 'Delete a flow log from an application load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/flowlogs/{{$parameter["flowLogId"]}}',
					},
				},
			},
			{
				name: 'Delete Forwarding Rule',
				value: 'deleteForwardingRule',
				description: 'Delete a forwarding rule from an Application Load Balancer',
				action: 'Delete a forwarding rule from an application load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/forwardingrules/{{$parameter["forwardingRuleId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an Application Load Balancer',
				action: 'Get an application load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Get Flow Log',
				value: 'getFlowLog',
				description: 'Get a specific flow log of an Application Load Balancer',
				action: 'Get a flow log of an application load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/flowlogs/{{$parameter["flowLogId"]}}',
					},
				},
			},
			{
				name: 'Get Flow Logs',
				value: 'getFlowLogs',
				description: 'Get all flow logs of an Application Load Balancer',
				action: 'Get flow logs of an application load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/flowlogs',
					},
				},
			},
			{
				name: 'Get Forwarding Rule',
				value: 'getForwardingRule',
				description: 'Get a specific forwarding rule of an Application Load Balancer',
				action: 'Get a forwarding rule of an application load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/forwardingrules/{{$parameter["forwardingRuleId"]}}',
					},
				},
			},
			{
				name: 'Get Forwarding Rules',
				value: 'getForwardingRules',
				description: 'Get all forwarding rules of an Application Load Balancer',
				action: 'Get forwarding rules of an application load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/forwardingrules',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many Application Load Balancers',
				action: 'Get many application load balancers',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an Application Load Balancer',
				action: 'Update an application load balancer',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Update Flow Log',
				value: 'updateFlowLog',
				description: 'Update a flow log of an Application Load Balancer',
				action: 'Update a flow log of an application load balancer',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/flowlogs/{{$parameter["flowLogId"]}}',
					},
				},
			},
			{
				name: 'Update Forwarding Rule',
				value: 'updateForwardingRule',
				description: 'Update a forwarding rule of an Application Load Balancer',
				action: 'Update a forwarding rule of an application load balancer',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/applicationloadbalancers/{{$parameter["applicationLoadBalancerId"]}}/forwardingrules/{{$parameter["forwardingRuleId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...applicationLoadBalancerDescriptions,
];
