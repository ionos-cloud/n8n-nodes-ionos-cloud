import type { INodeProperties } from 'n8n-workflow';
import { locationDescriptions } from './location';

const showOnlyForLocations = {
	resource: ['location'],
};

export const locationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForLocations,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a location',
				description: 'Get the properties of a specific location',
				routing: {
					request: {
						method: 'GET',
						url: '=/locations/{{$parameter.regionId}}/{{$parameter.locationId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get locations',
				description: 'Get many available locations',
				routing: {
					request: {
						method: 'GET',
						url: '/locations?depth=2',
					},
				},
			},
		],
		default: 'getAll',
	},
	...locationDescriptions,
];
