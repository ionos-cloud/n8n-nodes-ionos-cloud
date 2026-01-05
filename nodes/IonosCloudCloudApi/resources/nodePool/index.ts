import type { INodeProperties } from 'n8n-workflow';
import { nodePoolDescriptions } from './nodePool';

export const nodePoolDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['nodePool'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a node pool',
				action: 'Create a node pool',
				routing: {
					request: {
						method: 'POST',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a node pool',
				action: 'Delete a node pool',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools/{{$parameter["nodePoolId"]}}',
					},
				},
			},
			{
				name: 'Delete Node',
				value: 'deleteNode',
				description: 'Delete a node from a node pool',
				action: 'Delete a node from a node pool',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools/{{$parameter["nodePoolId"]}}/nodes/{{$parameter["nodeId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a node pool',
				action: 'Get a node pool',
				routing: {
					request: {
						method: 'GET',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools/{{$parameter["nodePoolId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many node pools',
				action: 'Get many node pools',
				routing: {
					request: {
						method: 'GET',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools',
					},
				},
			},
			{
				name: 'Get Node',
				value: 'getNode',
				description: 'Get a specific node in a node pool',
				action: 'Get a node in a node pool',
				routing: {
					request: {
						method: 'GET',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools/{{$parameter["nodePoolId"]}}/nodes/{{$parameter["nodeId"]}}',
					},
				},
			},
			{
				name: 'Get Nodes',
				value: 'getNodes',
				description: 'Get all nodes in a node pool',
				action: 'Get nodes in a node pool',
				routing: {
					request: {
						method: 'GET',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools/{{$parameter["nodePoolId"]}}/nodes',
					},
				},
			},
			{
				name: 'Replace Node',
				value: 'replaceNode',
				description: 'Recreate a node in a node pool',
				action: 'Replace a node in a node pool',
				routing: {
					request: {
						method: 'POST',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools/{{$parameter["nodePoolId"]}}/nodes/{{$parameter["nodeId"]}}/replace',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a node pool',
				action: 'Update a node pool',
				routing: {
					request: {
						method: 'PUT',
						url: '=/k8s/{{$parameter["k8sClusterId"]}}/nodepools/{{$parameter["nodePoolId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...nodePoolDescriptions,
];
