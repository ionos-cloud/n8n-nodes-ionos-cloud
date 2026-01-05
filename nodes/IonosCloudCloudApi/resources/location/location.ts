import type { INodeProperties } from 'n8n-workflow';

const showForLocationId = {
	operation: ['get'],
	resource: ['location'],
};

export const locationDescriptions: INodeProperties[] = [
	{
		displayName: 'Region ID',
		name: 'regionId',
		type: 'string',
		required: true,
		displayOptions: { show: showForLocationId },
		default: '',
		description: 'The ID of the region',
	},
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: { show: showForLocationId },
		default: '',
		description: 'The ID of the location',
	},
];
