import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['zoneFile'],
	},
};

export const zoneFileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions,
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Export a zone file in BIND format',
				action: 'Get a zone file',
				routing: {
					request: {
						method: 'GET',
						url: '=/{{$parameter.zoneId}}/zonefile',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Import a zone file in BIND format',
				action: 'Update a zone file',
				routing: {
					request: {
						method: 'PUT',
						url: '=/{{$parameter.zoneId}}/zonefile',
						headers: {
							'Content-Type': 'text/plain',
						},
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								const fileContent = this.getNodeParameter('fileContent', '') as string;
								requestOptions.body = fileContent;
								return requestOptions;
							},
						],
					},
				},
			},
		],
		default: 'get',
	},
];
