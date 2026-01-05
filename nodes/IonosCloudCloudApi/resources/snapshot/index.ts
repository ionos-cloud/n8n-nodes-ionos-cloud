import type { INodeProperties } from 'n8n-workflow';
import { snapshotDescriptions } from './snapshot';

const showOnlyForSnapshots = {
	resource: ['snapshot'],
};

export const snapshotDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSnapshots,
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a snapshot',
				description: 'Delete a snapshot',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/snapshots/{{$parameter.snapshotId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a snapshot',
				description: 'Get the data of a single snapshot',
				routing: {
					request: {
						method: 'GET',
						url: '=/snapshots/{{$parameter.snapshotId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get snapshots',
				description: 'Get many available snapshots',
				routing: {
					request: {
						method: 'GET',
						url: '/snapshots?depth=2',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a snapshot',
				description: 'Update snapshot properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/snapshots/{{$parameter.snapshotId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...snapshotDescriptions,
];
