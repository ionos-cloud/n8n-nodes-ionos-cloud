import type { INodeProperties } from 'n8n-workflow';

const showForZoneFileOperations = {
	operation: ['get', 'update'],
	resource: ['zoneFile'],
};

const showForZoneFileUpdate = {
	operation: ['update'],
	resource: ['zoneFile'],
};

export const zoneFileDescriptions: INodeProperties[] = [
	{
		displayName: 'Zone ID',
		name: 'zoneId',
		type: 'string',
		required: true,
		displayOptions: { show: showForZoneFileOperations },
		default: '',
		description: 'The ID of the DNS zone',
	},
	{
		displayName: 'File Content',
		name: 'fileContent',
		type: 'string',
		required: true,
		displayOptions: { show: showForZoneFileUpdate },
		typeOptions: {
			rows: 10,
		},
		default: '',
		description: 'The zone file content in BIND format',
	},
];
