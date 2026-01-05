import type { INodeProperties } from 'n8n-workflow';
import { k8sDescriptions } from './k8s';

const showOnlyForK8s = {
	resource: ['k8s'],
};

export const k8sDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForK8s,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a kubernetes cluster',
				description: 'Create a new Kubernetes cluster',
				routing: {
					request: {
						method: 'POST',
						url: '/k8s',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a kubernetes cluster',
				description: 'Delete a Kubernetes cluster',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/k8s/{{$parameter.k8sClusterId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a kubernetes cluster',
				description: 'Get the properties of a Kubernetes cluster',
				routing: {
					request: {
						method: 'GET',
						url: '=/k8s/{{$parameter.k8sClusterId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Kubeconfig',
				value: 'getKubeconfig',
				action: 'Get kubernetes configuration',
				description: 'Get the kubeconfig file for a cluster',
				routing: {
					request: {
						method: 'GET',
						url: '=/k8s/{{$parameter.k8sClusterId}}/kubeconfig',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many kubernetes clusters',
				description: 'Get many Kubernetes clusters',
				routing: {
					request: {
						method: 'GET',
						url: '/k8s?depth=2',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a kubernetes cluster',
				description: 'Update Kubernetes cluster properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/k8s/{{$parameter.k8sClusterId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...k8sDescriptions,
];
