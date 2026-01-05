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
		icon: { light: 'file:ionos.dark.svg', dark: 'file:ionos.svg' },
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
		credentials: [{ name: "ionosCloudCloudApi", required: true }],
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
				options: [
					{
						name: 'Application Load Balancer',
						value: 'applicationLoadBalancer',
					},
					{
						name: 'Contract',
						value: 'contract',
					},
					{
						name: 'Datacenter',
						value: 'datacenter',
					},
					{
						name: 'Firewall Rule',
						value: 'firewallRule',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'IP Block',
						value: 'ipBlock',
					},
					{
						name: 'Kubernetes Cluster',
						value: 'k8s',
					},
					{
						name: 'LAN',
						value: 'lan',
					},
					{
						name: 'Load Balancer',
						value: 'loadBalancer',
					},
					{
						name: 'Location',
						value: 'location',
					},
					{
						name: 'NAT Gateway',
						value: 'natGateway',
					},
					{
						name: 'Network Load Balancer',
						value: 'networkLoadBalancer',
					},
					{
						name: 'NIC',
						value: 'nic',
					},
					{
						name: 'Node Pool',
						value: 'nodePool',
					},
					{
						name: 'Private Cross-Connect',
						value: 'pcc',
					},
					{
						name: 'Security Group',
						value: 'securityGroup',
					},
					{
						name: 'Server',
						value: 'server',
					},
					{
						name: 'Snapshot',
						value: 'snapshot',
					},
					{
						name: 'Target Group',
						value: 'targetGroup',
					},
					{
						name: 'Volume',
						value: 'volume',
					},
				],
				default: 'datacenter',
			},
			...applicationLoadBalancerDescription,
			...contractDescription,
			...datacenterDescription,
			...firewallRuleDescription,
			...imageDescription,
			...ipBlockDescription,
			...k8sDescription,
			...lanDescription,
			...loadBalancerDescription,
			...locationDescription,
			...natGatewayDescription,
			...networkLoadBalancerDescription,
			...nicDescription,
			...pccDescription,
			...nodePoolDescription,
			...securityGroupDescription,
			...serverDescription,
			...snapshotDescription,
			...targetGroupDescription,
			...volumeDescription,
		],
	};
}
