import type { INodeProperties } from 'n8n-workflow';

const showForDnssecOperations = {
	operation: ['get', 'create', 'delete'],
	resource: ['dnssec'],
};

const showForDnssecCreate = {
	operation: ['create'],
	resource: ['dnssec'],
};

export const dnssecDescriptions: INodeProperties[] = [
	{
		displayName: 'Zone ID',
		name: 'zoneId',
		type: 'string',
		required: true,
		displayOptions: { show: showForDnssecOperations },
		default: '',
		description: 'The ID of the DNS zone',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForDnssecCreate },
		options: [
			{
				displayName: 'Validity',
				name: 'validity',
				type: 'number',
				default: 90,
				description: 'Validity period in days',
				routing: {
					send: {
						type: 'body',
						property: 'validity',
					},
				},
			},
			{
				displayName: 'Key Parameters',
				name: 'keyParameters',
				type: 'json',
				default: '{}',
				description: 'DNSSEC key parameters as JSON',
				routing: {
					send: {
						type: 'body',
						property: 'keyParameters',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'NSEC Parameters',
				name: 'nsecParameters',
				type: 'json',
				default: '{}',
				description: 'NSEC parameters as JSON',
				routing: {
					send: {
						type: 'body',
						property: 'nsecParameters',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
	},
];
