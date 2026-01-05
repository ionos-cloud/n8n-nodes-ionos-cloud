import type { INodeProperties } from 'n8n-workflow';
import { contractGetManyDescription } from './getAll';

const showOnlyForContracts = {
	resource: ['contract'],
};

export const contractDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForContracts,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get contracts',
				description: 'Get contract information',
				routing: {
					request: {
						method: 'GET',
						url: '/contracts',
					},
				},
			},
		],
		default: 'getAll',
	},
	...contractGetManyDescription,
];
