import type { INodeProperties } from 'n8n-workflow';
import { ipBlockDescriptions } from './ipBlock';

const showOnlyForIpBlocks = {
	resource: ['ipBlock'],
};

export const ipBlockDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForIpBlocks,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an IP block',
				description: 'Reserve a new IP block',
				routing: {
					request: {
						method: 'POST',
						url: '/ipblocks',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an IP block',
				description: 'Release an IP block',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/ipblocks/{{$parameter.ipBlockId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an IP block',
				description: 'Get the properties of an IP block',
				routing: {
					request: {
						method: 'GET',
						url: '=/ipblocks/{{$parameter.ipBlockId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get IP blocks',
				description: 'Get many reserved IP blocks',
				routing: {
					request: {
						method: 'GET',
						url: '/ipblocks?depth=2',
					},
				},
			},
		],
		default: 'getAll',
	},
	...ipBlockDescriptions,
];
