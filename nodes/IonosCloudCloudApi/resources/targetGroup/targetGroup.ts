import type { INodeProperties } from 'n8n-workflow';

const showForTargetGroupId = {
	operation: ['get', 'update', 'delete'],
	resource: ['targetGroup'],
};

const showForTargetGroupCreateOrUpdate = {
	operation: ['create', 'update'],
	resource: ['targetGroup'],
};

export const targetGroupDescriptions: INodeProperties[] = [
	{
		displayName: 'Target Group ID',
		name: 'targetGroupId',
		type: 'string',
		required: true,
		displayOptions: { show: showForTargetGroupId },
		default: '',
		description: 'The ID of the target group',
	},
	// Create and Update fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForTargetGroupCreateOrUpdate },
		default: '',
		description: 'The name of the target group',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Algorithm',
		name: 'algorithm',
		type: 'options',
		required: true,
		displayOptions: { show: showForTargetGroupCreateOrUpdate },
		options: [
			{ name: 'Round Robin', value: 'ROUND_ROBIN' },
			{ name: 'Least Connection', value: 'LEAST_CONNECTION' },
			{ name: 'Random', value: 'RANDOM' },
			{ name: 'Source IP', value: 'SOURCE_IP' },
		],
		default: 'ROUND_ROBIN',
		description: 'The balancing algorithm',
		routing: {
			send: {
				type: 'body',
				property: 'properties.algorithm',
			},
		},
	},
	{
		displayName: 'Protocol',
		name: 'protocol',
		type: 'options',
		required: true,
		displayOptions: { show: showForTargetGroupCreateOrUpdate },
		options: [
			{ name: 'HTTP', value: 'HTTP' },
		],
		default: 'HTTP',
		description: 'The forwarding protocol',
		routing: {
			send: {
				type: 'body',
				property: 'properties.protocol',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForTargetGroupCreateOrUpdate },
		options: [
			{
				displayName: 'Health Check',
				name: 'healthCheck',
				type: 'fixedCollection',
				default: {},
				description: 'Health check configuration for the target group',
				options: [
					{
						displayName: 'Settings',
						name: 'settings',
						values: [
							{
								displayName: 'Check Timeout',
								name: 'checkTimeout',
								type: 'number',
								default: 2000,
								description: 'The timeout in milliseconds for a health check',
							},
							{
								displayName: 'Check Interval',
								name: 'checkInterval',
								type: 'number',
								default: 2000,
								description: 'The interval in milliseconds between health checks',
							},
							{
								displayName: 'Retries',
								name: 'retries',
								type: 'number',
								default: 3,
								description: 'The number of retries before marking target as unhealthy',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.healthCheck',
						value: '={{$value.settings}}',
					},
				},
			},
			{
				displayName: 'HTTP Health Check',
				name: 'httpHealthCheck',
				type: 'fixedCollection',
				default: {},
				description: 'HTTP health check configuration',
				options: [
					{
						displayName: 'Settings',
						name: 'settings',
						values: [
							{
						displayName: 'Match Type',
						name: 'matchType',
						type: 'options',
						options: [
									{
										name: 'Status Code',
										value: 'STATUS_CODE',
									},
									{
										name: 'Response Body',
										value: 'RESPONSE_BODY',
									},
								],
						default: 'STATUS_CODE',
						description: 'The type of match for health check',
							},
							{
						displayName: 'Method',
						name: 'method',
						type: 'options',
						options: [
									{
										name: 'GET',
										value: 'GET',
									},
									{
										name: 'HEAD',
										value: 'HEAD',
									},
									{
										name: 'POST',
										value: 'POST',
									},
					],
						default: 'GET',
						description: 'The HTTP method for health check',
							},
							{
						displayName: 'Negate',
						name: 'negate',
						type: 'boolean',
						default: false,
						description: 'Whether to invert the match',
							},
							{
						displayName: 'Path',
						name: 'path',
						type: 'string',
						default: '/',
						description: 'The path for HTTP health check',
							},
							{
						displayName: 'Regex',
						name: 'regex',
						type: 'boolean',
						default: false,
						description: 'Whether the response is a regex pattern',
							},
							{
						displayName: 'Response',
						name: 'response',
						type: 'string',
						default: '200',
						description: 'Expected response (status code or body content)',
							},
					],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.httpHealthCheck',
						value: '={{$value.settings}}',
					},
				},
			},
			{
				displayName: 'Targets',
				name: 'targets',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Target configurations',
				options: [
					{
						displayName: 'Target',
						name: 'target',
						values: [
							{
						displayName: 'Health Check Enabled',
						name: 'healthCheckEnabled',
						type: 'boolean',
						default: true,
						description: 'Whether health check is enabled for this target',
							},
							{
						displayName: 'IP',
						name: 'ip',
						type: 'string',
						default: '',
						description: 'The IP address of the target',
							},
							{
						displayName: 'Maintenance Mode',
						name: 'maintenanceEnabled',
						type: 'boolean',
						default: false,
						description: 'Whether maintenance mode is enabled',
							},
							{
						displayName: 'Port',
						name: 'port',
						type: 'number',
						default: 80,
						description: 'The port of the target',
							},
							{
						displayName: 'Weight',
						name: 'weight',
						type: 'number',
						default: 1,
						description: 'The weight of the target',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.targets',
						value: '={{$value.target}}',
					},
				},
			},
		],
	},
];
