import type { INodeProperties } from 'n8n-workflow';
import { natGatewayDescriptions } from './natGateway';

const showOnlyForNatGateways = {
	resource: ['natGateway'],
};

export const natGatewayDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForNatGateways,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a NAT gateway',
				description: 'Create a new NAT Gateway',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways',
					},
				},
			},
			{
				name: 'Create Flow Log',
				value: 'createFlowLog',
				action: 'Create a flow log for a NAT gateway',
				description: 'Create a NAT Gateway flow log',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/flowlogs',
					},
				},
			},
			{
				name: 'Create Rule',
				value: 'createRule',
				action: 'Create a rule for a NAT gateway',
				description: 'Create a NAT Gateway rule',
				routing: {
					request: {
						method: 'POST',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/rules',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a NAT gateway',
				description: 'Delete a NAT Gateway',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}',
					},
				},
			},
			{
				name: 'Delete Flow Log',
				value: 'deleteFlowLog',
				action: 'Delete a flow log from a NAT gateway',
				description: 'Delete a NAT Gateway flow log',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/flowlogs/{{$parameter.flowLogId}}',
					},
				},
			},
			{
				name: 'Delete Rule',
				value: 'deleteRule',
				action: 'Delete a rule from a NAT gateway',
				description: 'Delete a NAT Gateway rule',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/rules/{{$parameter.ruleId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a NAT gateway',
				description: 'Get the properties of a NAT Gateway',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}?depth=2',
					},
				},
			},
			{
				name: 'Get Flow Log',
				value: 'getFlowLog',
				action: 'Get a flow log of a NAT gateway',
				description: 'Get a specific NAT Gateway flow log',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/flowlogs/{{$parameter.flowLogId}}',
					},
				},
			},
			{
				name: 'Get Flow Logs',
				value: 'getFlowLogs',
				action: 'Get flow logs of a NAT gateway',
				description: 'Get all NAT Gateway flow logs',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/flowlogs',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many NAT gateways',
				description: 'Get many NAT Gateways within a datacenter',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways?depth=2',
					},
				},
			},
			{
				name: 'Get Rule',
				value: 'getRule',
				action: 'Get a rule of a NAT gateway',
				description: 'Get a specific NAT Gateway rule',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/rules/{{$parameter.ruleId}}',
					},
				},
			},
			{
				name: 'Get Rules',
				value: 'getRules',
				action: 'Get rules of a NAT gateway',
				description: 'Get all NAT Gateway rules',
				routing: {
					request: {
						method: 'GET',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/rules',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a NAT gateway',
				description: 'Update NAT Gateway properties',
				routing: {
					request: {
						method: 'PUT',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}',
					},
				},
			},
			{
				name: 'Update Flow Log',
				value: 'updateFlowLog',
				action: 'Update a flow log of a NAT gateway',
				description: 'Update a NAT Gateway flow log',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/flowlogs/{{$parameter.flowLogId}}',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								if (requestOptions.body && typeof requestOptions.body === 'object') {
							const body = requestOptions.body as Record<string, unknown>;
									if (body.properties && typeof body.properties === 'object') {
										requestOptions.body = body.properties;
									}
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'Update Rule',
				value: 'updateRule',
				action: 'Update a rule of a NAT gateway',
				description: 'Update a NAT Gateway rule',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/datacenters/{{$parameter.datacenterId}}/natgateways/{{$parameter.natGatewayId}}/rules/{{$parameter.ruleId}}',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								if (requestOptions.body && typeof requestOptions.body === 'object') {
								const body = requestOptions.body as Record<string, unknown>;
									if (body.properties && typeof body.properties === 'object') {
										requestOptions.body = body.properties;
									}
								}
								return requestOptions;
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
	...natGatewayDescriptions,
];
