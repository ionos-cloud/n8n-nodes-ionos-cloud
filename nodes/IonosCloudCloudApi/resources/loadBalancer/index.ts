import type { INodeProperties } from 'n8n-workflow';
import { loadBalancerDescriptions } from './loadBalancer';

export const loadBalancerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['loadBalancer'],
			},
		},
		options: [
			{
				name: 'Attach NIC',
				value: 'attachNic',
				description: 'Attach a NIC to load balancer',
				action: 'Attach NIC to load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers/{{$parameter["loadBalancerId"]}}/balancednics',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a Load Balancer',
				action: 'Create a load balancer',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a Load Balancer',
				action: 'Delete a load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers/{{$parameter["loadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Detach NIC',
				value: 'detachNic',
				description: 'Detach a NIC from load balancer',
				action: 'Detach NIC from load balancer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers/{{$parameter["loadBalancerId"]}}/balancednics/{{$parameter["nicId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a Load Balancer',
				action: 'Get a load balancer',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers/{{$parameter["loadBalancerId"]}}',
					},
				},
			},
			{
				name: 'Get Balanced NIC',
				value: 'getBalancedNic',
				description: 'Get a balanced NIC',
				action: 'Get a balanced NIC',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers/{{$parameter["loadBalancerId"]}}/balancednics/{{$parameter["nicId"]}}',
					},
				},
			},
			{
				name: 'Get Balanced NICs',
				value: 'getBalancedNics',
				description: 'List balanced NICs',
				action: 'Get balanced nics',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers/{{$parameter["loadBalancerId"]}}/balancednics',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many Load Balancers',
				action: 'Get many load balancers',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a Load Balancer',
				action: 'Update a load balancer',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter["datacenterId"]}}/loadbalancers/{{$parameter["loadBalancerId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...loadBalancerDescriptions,
];
