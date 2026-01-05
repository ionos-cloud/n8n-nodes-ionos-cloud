import type { INodeProperties } from 'n8n-workflow';
import { volumeDescriptions } from './volume';

const showOnlyForVolumes = {
	resource: ['volume'],
};

export const volumeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForVolumes,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a volume',
				description: 'Create a new volume',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/volumes',
					},
				},
			},
			{
				name: 'Create Snapshot',
				value: 'createSnapshot',
				action: 'Create a volume snapshot',
				description: 'Create a snapshot of a volume',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/volumes/{{$parameter.volumeId}}/create-snapshot',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a volume',
				description: 'Delete a volume',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/volumes/{{$parameter.volumeId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a volume',
				description: 'Get the data of a single volume',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/volumes/{{$parameter.volumeId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get volumes',
				description: 'Get many volumes within a datacenter',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/volumes?depth=2',
					},
				},
			},
			{
				name: 'Restore Snapshot',
				value: 'restoreSnapshot',
				action: 'Restore volume from snapshot',
				description: 'Restore a volume from a snapshot',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/volumes/{{$parameter.volumeId}}/restore-snapshot',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a volume',
				description: 'Update volume properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}/volumes/{{$parameter.volumeId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...volumeDescriptions,
];
