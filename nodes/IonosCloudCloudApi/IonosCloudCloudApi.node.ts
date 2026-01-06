import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { serverDescription } from './resources/server';
import { contractDescription } from './resources/contract';
import { datacenterDescription } from './resources/datacenter';
import { volumeDescription } from './resources/volume';
import { snapshotDescription } from './resources/snapshot';
import { ipBlockDescription } from './resources/ipBlock';
import { imageDescription } from './resources/image';
import { lanDescription } from './resources/lan';
import { nicDescription } from './resources/nic';
import { firewallRuleDescription } from './resources/firewallRule';
import { natGatewayDescription } from './resources/natGateway';
import { k8sDescription } from './resources/k8s';
import { locationDescription } from './resources/location';
import { securityGroupDescription } from './resources/securityGroup';
import { nodePoolDescription } from './resources/nodePool';
import { networkLoadBalancerDescription } from './resources/networkLoadBalancer';
import { applicationLoadBalancerDescription } from './resources/applicationLoadBalancer';
import { loadBalancerDescription } from './resources/loadBalancer';
import { pccDescription } from './resources/pcc';
import { targetGroupDescription } from './resources/targetGroup';

export class IonosCloudCloudApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ionos Cloud (Cloud API v6)',
		name: 'ionosCloudCloudApi',
		icon: { light: 'file:ionos.svg', dark: 'file:ionos.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Ionos Cloud via Cloud API v6',
		defaults: {
			name: 'Ionos Cloud (Cloud API v6)',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'ionosCloudApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.ionos.com/cloudapi/v6',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					// Account & Global Resources
					{
						name: 'Contract',
						value: 'contract',
					},
					{
						name: 'Location',
						value: 'location',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'IP Block',
						value: 'ipBlock',
					},
					// Core Infrastructure
					{
						name: 'Datacenter',
						value: 'datacenter',
					},
					{
						name: 'LAN',
						value: 'lan',
					},
					// Compute Resources
					{
						name: 'Server',
						value: 'server',
					},
					{
						name: 'Volume',
						value: 'volume',
					},
					{
						name: 'Snapshot',
						value: 'snapshot',
					},
					{
						name: 'NIC',
						value: 'nic',
					},
					{
						name: 'Firewall Rule',
						value: 'firewallRule',
					},
					// Kubernetes
					{
						name: 'Kubernetes Cluster',
						value: 'k8s',
					},
					{
						name: 'Node Pool',
						value: 'nodePool',
					},
					// Networking
					{
						name: 'Private Cross-Connect',
						value: 'pcc',
					},
					{
						name: 'Load Balancer',
						value: 'loadBalancer',
					},
					{
						name: 'Network Load Balancer',
						value: 'networkLoadBalancer',
					},
					{
						name: 'Application Load Balancer',
						value: 'applicationLoadBalancer',
					},
					{
						name: 'Target Group',
						value: 'targetGroup',
					},
					{
						name: 'NAT Gateway',
						value: 'natGateway',
					},
					// Security
					{
						name: 'Security Group',
						value: 'securityGroup',
					},
				],
				default: 'datacenter',
			},
			// Account & Global
			...contractDescription,
			...locationDescription,
			...imageDescription,
			...ipBlockDescription,
			// Core Infrastructure
			...datacenterDescription,
			...lanDescription,
			// Compute Resources
			...serverDescription,
			...volumeDescription,
			...snapshotDescription,
			...nicDescription,
			...firewallRuleDescription,
			// Kubernetes
			...k8sDescription,
			...nodePoolDescription,
			// Networking
			...pccDescription,
			...loadBalancerDescription,
			...networkLoadBalancerDescription,
			...applicationLoadBalancerDescription,
			...targetGroupDescription,
			...natGatewayDescription,
			// Security
			...securityGroupDescription,
		],
	};
}
