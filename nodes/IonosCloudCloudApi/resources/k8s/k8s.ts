import type { INodeProperties } from 'n8n-workflow';

const showForK8sClusterId = {
	operation: ['get', 'update', 'delete', 'getKubeconfig'],
	resource: ['k8s'],
};

const showForK8sCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['k8s'],
};

const showOnlyForK8sGetMany = {
	operation: ['getAll'],
	resource: ['k8s'],
};

export const k8sDescriptions: INodeProperties[] = [
	{
		displayName: 'Cluster ID',
		name: 'k8sClusterId',
		type: 'string',
		required: true,
		displayOptions: { show: showForK8sClusterId },
		default: '',
		description: 'The ID of the Kubernetes cluster',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForK8sGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForK8sGetMany,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
			},
			operations: {
				pagination: {
					type: 'offset',
					properties: {
						limitParameter: 'limit',
						offsetParameter: 'offset',
						pageSize: 100,
						type: 'query',
					},
				},
			},
		},
	},
	// Fields for Create and Update
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForK8sCreateOrUpdate },
		default: '',
		description: 'The name of the Kubernetes cluster',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForK8sCreateOrUpdate },
		options: [
			{
				displayName: 'API Subnet Allow List',
				name: 'apiSubnetAllowList',
				type: 'string',
				default: '',
				placeholder: '192.168.1.0/24, 10.0.0.0/16',
				description: 'Comma-separated list of IP addresses or CIDR blocks allowed to access the API server',
				routing: {
					send: {
						type: 'body',
						property: 'properties.apiSubnetAllowList',
						value: '={{ $value.split(",").map(v => v.trim()).filter(v => v) }}',
					},
				},
			},
			{
				displayName: 'Gateway IP',
				name: 'gatewayIp',
				type: 'string',
				default: '',
				description: 'The IP address of the gateway for the cluster',
				routing: {
					send: {
						type: 'body',
						property: 'properties.gatewayIp',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'K8s Version',
				name: 'k8sVersion',
				type: 'string',
				default: '',
				description: 'The Kubernetes version for the cluster (e.g., 1.27.3)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.k8sVersion',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Maintenance Window Day',
				name: 'maintenanceWindowDayOfTheWeek',
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
				displayName: 'Public',
				name: 'public',
				type: 'boolean',
				default: true,
				description: 'Whether the cluster is exposed to the public internet',
				routing: {
					send: {
						type: 'body',
						property: 'properties.public',
					},
				},
			},
			{
				displayName: 'S3 Buckets',
				name: 's3Buckets',
				type: 'string',
				default: '',
				placeholder: 'bucket1, bucket2',
				description: 'Comma-separated list of S3 bucket names for cluster backups',
				routing: {
					send: {
						type: 'body',
						property: 'properties.s3Buckets',
						value: '={{ $value.split(",").map(v => v.trim()).filter(v => v) }}',
					},
				},
			},
		],
	},
];
