import type { INodeProperties } from 'n8n-workflow';
import { imageDescriptions } from './image';

const showOnlyForImages = {
	resource: ['image'],
};

export const imageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForImages,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get an image',
				description: 'Get the properties of an image',
				routing: {
					request: {
						method: 'GET',
						url: '=/images/{{$parameter.imageId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get images',
				description: 'Get many available images',
				routing: {
					request: {
						method: 'GET',
						url: '/images?depth=2',
					},
				},
			},
		],
		default: 'getAll',
	},
	...imageDescriptions,
];
