import type { INodeProperties } from 'n8n-workflow';

const showForNodePoolId = {
	operation: ['get', 'update', 'delete'],
	resource: ['nodePool'],
};

const showForNodePoolCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['nodePool'],
};

export const nodePoolDescriptions: INodeProperties[] = [
	{
		displayName: 'K8s Cluster ID',
		name: 'k8sClusterId',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['nodePool'] } },
		default: '',
		description: 'The ID of the Kubernetes cluster',
	},
	{
		displayName: 'Node Pool ID',
		name: 'nodePoolId',
		type: 'string',
		required: true,
		displayOptions: { show: showForNodePoolId },
		default: '',
		description: 'The ID of the node pool',
	},
	// Fields for Create and Update
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForNodePoolCreateOrUpdate },
		default: '',
		description: 'The name of the node pool',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Datacenter ID',
		name: 'datacenterId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['nodePool'],
			},
		},
		default: '',
		description: 'The datacenter ID where the node pool will be created',
		routing: {
			send: {
				type: 'body',
				property: 'properties.datacenterId',
			},
		},
	},
	{
		displayName: 'Node Count',
		name: 'nodeCount',
		type: 'number',
		required: true,
		displayOptions: { show: showForNodePoolCreateOrUpdate },
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'The number of nodes in the node pool',
		routing: {
			send: {
				type: 'body',
				property: 'properties.nodeCount',
			},
		},
	},
	{
		displayName: 'CPU Family',
		name: 'cpuFamily',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['nodePool'],
			},
		},
		options: [
			{ name: 'AMD EPYC', value: 'AMD_OPTERON' },
			{ name: 'Intel Icelake', value: 'INTEL_ICELAKE' },
			{ name: 'Intel Skylake', value: 'INTEL_SKYLAKE' },
			{ name: 'Intel Xeon', value: 'INTEL_XEON' },
		],
		default: 'INTEL_XEON',
		description: 'The CPU family for the nodes',
		routing: {
			send: {
				type: 'body',
				property: 'properties.cpuFamily',
			},
		},
	},
	{
		displayName: 'Cores Count',
		name: 'coresCount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['nodePool'],
			},
		},
		default: 2,
		typeOptions: { minValue: 1 },
		description: 'The number of CPU cores per node',
		routing: {
			send: {
				type: 'body',
				property: 'properties.coresCount',
			},
		},
	},
	{
		displayName: 'RAM Size (MB)',
		name: 'ramSize',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['nodePool'],
			},
		},
		default: 2048,
		typeOptions: { minValue: 1024 },
		description: 'The amount of RAM in MB per node',
		routing: {
			send: {
				type: 'body',
				property: 'properties.ramSize',
			},
		},
	},
	{
		displayName: 'Storage Type',
		name: 'storageType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['nodePool'],
			},
		},
		options: [
			{ name: 'HDD', value: 'HDD' },
			{ name: 'SSD', value: 'SSD' },
		],
		default: 'SSD',
		description: 'The storage type for the nodes',
		routing: {
			send: {
				type: 'body',
				property: 'properties.storageType',
			},
		},
	},
	{
		displayName: 'Storage Size (GB)',
		name: 'storageSize',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['nodePool'],
			},
		},
		default: 100,
		typeOptions: { minValue: 10 },
		description: 'The storage size in GB per node',
		routing: {
			send: {
				type: 'body',
				property: 'properties.storageSize',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForNodePoolCreateOrUpdate },
		options: [
			{
				displayName: 'Annotations',
				name: 'annotations',
				type: 'string',
				default: '',
				placeholder: 'key1=value1, key2=value2',
				description: 'Comma-separated key=value pairs of annotations',
				routing: {
					send: {
						type: 'body',
						property: 'properties.annotations',
						preSend: [
						async function (this, requestOptions) {
								const annotations = this.getNodeParameter('additionalFields.annotations') as string;
								if (annotations) {
									const annotationsObj: Record<string, string> = {};
									annotations.split(',').forEach((pair: string) => {
										const [key, value] = pair.split('=').map((s: string) => s.trim());
										if (key && value) {
											annotationsObj[key] = value;
										}
									});
									requestOptions.body.properties.annotations = annotationsObj;
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Auto Scaling Max',
				name: 'autoScalingMax',
				type: 'number',
				default: 1,
				typeOptions: { minValue: 1 },
				description: 'Maximum number of nodes for auto-scaling',
				routing: {
					send: {
						type: 'body',
						property: 'properties.autoScaling.maxNodeCount',
					},
				},
			},
			{
				displayName: 'Auto Scaling Min',
				name: 'autoScalingMin',
				type: 'number',
				default: 1,
				typeOptions: { minValue: 1 },
				description: 'Minimum number of nodes for auto-scaling',
				routing: {
					send: {
						type: 'body',
						property: 'properties.autoScaling.minNodeCount',
					},
				},
			},
			{
				displayName: 'Availability Zone',
				name: 'availabilityZone',
				type: 'options',
				options: [
					{ name: 'Auto', value: 'AUTO' },
					{ name: 'Zone 1', value: 'ZONE_1' },
					{ name: 'Zone 2', value: 'ZONE_2' },
				],
				default: 'AUTO',
				description: 'The availability zone for the nodes',
				routing: {
					send: {
						type: 'body',
						property: 'properties.availabilityZone',
					},
				},
			},
			{
				displayName: 'K8s Version',
				name: 'k8sVersion',
				type: 'string',
				default: '',
				description: 'The Kubernetes version for the node pool (e.g., 1.27.3)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.k8sVersion',
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'string',
				default: '',
				placeholder: 'key1=value1, key2=value2',
				description: 'Comma-separated key=value pairs of labels',
				routing: {
					send: {
						type: 'body',
						property: 'properties.labels',
						preSend: [
						async function (this, requestOptions) {
								const labels = this.getNodeParameter('additionalFields.labels') as string;
								if (labels) {
									const labelsObj: Record<string, string> = {};
									labels.split(',').forEach((pair: string) => {
										const [key, value] = pair.split('=').map((s: string) => s.trim());
										if (key && value) {
											labelsObj[key] = value;
										}
									});
									requestOptions.body.properties.labels = labelsObj;
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'LANs',
				name: 'lans',
				type: 'string',
				default: '',
				placeholder: '1, 2, 3',
				description: 'Comma-separated list of LAN IDs to attach',
				routing: {
					send: {
						type: 'body',
						property: 'properties.lans',
						preSend: [
						async function (this, requestOptions) {
								const lans = this.getNodeParameter('additionalFields.lans') as string;
								if (lans) {
									requestOptions.body.properties.lans = lans
										.split(',')
										.map((id: string) => ({ id: parseInt(id.trim(), 10) }));
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Maintenance Window Day',
				name: 'maintenanceWindowDay',
				type: 'options',
				options: [
					{ name: 'Friday', value: 'Friday' },
					{ name: 'Monday', value: 'Monday' },
					{ name: 'Saturday', value: 'Saturday' },
					{ name: 'Sunday', value: 'Sunday' },
					{ name: 'Thursday', value: 'Thursday' },
					{ name: 'Tuesday', value: 'Tuesday' },
					{ name: 'Wednesday', value: 'Wednesday' },
				],
				default: 'Sunday',
				description: 'Day of the week for maintenance window',
				routing: {
					send: {
						type: 'body',
						property: 'properties.maintenanceWindow.dayOfTheWeek',
					},
				},
			},
			{
				displayName: 'Maintenance Window Time',
				name: 'maintenanceWindowTime',
				type: 'string',
				default: '02:00:00',
				placeholder: '02:00:00',
				description: 'Time of day for maintenance window (HH:MM:SS format)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.maintenanceWindow.time',
					},
				},
			},
			{
				displayName: 'Public IPs',
				name: 'publicIps',
				type: 'string',
				default: '',
				placeholder: '192.0.2.1, 192.0.2.2',
				description: 'Comma-separated list of public IP addresses',
				routing: {
					send: {
						type: 'body',
						property: 'properties.publicIps',
						value: '={{ $value.split(",").map(v => v.trim()).filter(v => v) }}',
					},
				},
			},
		],
	},
];
