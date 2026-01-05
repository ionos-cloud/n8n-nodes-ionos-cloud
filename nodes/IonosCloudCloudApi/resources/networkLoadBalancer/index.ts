import type { INodeProperties } from 'n8n-workflow';
import { networkLoadBalancerDescriptions } from './networkLoadBalancer';

export const networkLoadBalancerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['networkLoadBalancer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a Network Load Balancer',
				action: 'Create a network load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers',
					},
				},
			},
			{
				name: 'Create Flow Log',
				value: 'createFlowLog',
				description: 'Create a flow log for a Network Load Balancer',
				action: 'Create a flow log for a network load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/flowlogs',
					},
				},
			},
			{
				name: 'Create Forwarding Rule',
				value: 'createForwardingRule',
				description: 'Create a forwarding rule for a Network Load Balancer',
				action: 'Create a forwarding rule for a network load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/forwardingrules',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a Network Load Balancer',
				action: 'Delete a network load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Delete Flow Log',
				value: 'deleteFlowLog',
				description: 'Delete a flow log from a Network Load Balancer',
				action: 'Delete a flow log from a network load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/flowlogs/{{$parameter["flowLogId"]}}',
					},
				},
			},
			{
				name: 'Delete Forwarding Rule',
				value: 'deleteForwardingRule',
				description: 'Delete a forwarding rule from a Network Load Balancer',
				action: 'Delete a forwarding rule from a network load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/forwardingrules/{{$parameter["forwardingRuleId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a Network Load Balancer',
				action: 'Get a network load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Get Flow Log',
				value: 'getFlowLog',
				description: 'Get a specific flow log of a Network Load Balancer',
				action: 'Get a flow log of a network load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/flowlogs/{{$parameter["flowLogId"]}}',
					},
				},
			},
			{
				name: 'Get Flow Logs',
				value: 'getFlowLogs',
				description: 'Get all flow logs of a Network Load Balancer',
				action: 'Get flow logs of a network load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/flowlogs',
					},
				},
			},
			{
				name: 'Get Forwarding Rule',
				value: 'getForwardingRule',
				description: 'Get a specific forwarding rule of a Network Load Balancer',
				action: 'Get a forwarding rule of a network load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/forwardingrules/{{$parameter["forwardingRuleId"]}}',
					},
				},
			},
			{
				name: 'Get Forwarding Rules',
				value: 'getForwardingRules',
				description: 'Get all forwarding rules of a Network Load Balancer',
				action: 'Get forwarding rules of a network load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/forwardingrules',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many Network Load Balancers',
				action: 'Get many network load balancers',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a Network Load Balancer',
				action: 'Update a network load balancer',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Update Flow Log',
				value: 'updateFlowLog',
				description: 'Update a flow log of a Network Load Balancer',
				action: 'Update a flow log of a network load balancer',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/flowlogs/{{$parameter["flowLogId"]}}',
					},
				},
			},
			{
				name: 'Update Forwarding Rule',
				value: 'updateForwardingRule',
				description: 'Update a forwarding rule of a Network Load Balancer',
				action: 'Update a forwarding rule of a network load balancer',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/networkloadbalancers/{{$parameter["networkLoadBalancerId"]}}/forwardingrules/{{$parameter["forwardingRuleId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...networkLoadBalancerDescriptions,
];
