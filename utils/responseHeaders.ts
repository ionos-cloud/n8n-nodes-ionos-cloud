import type {
	IDataObject,
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeProperties,
	IN8nHttpFullResponse,
} from 'n8n-workflow';

/**
 * Shared property definition for the "Include Response Headers" toggle.
 * Add this to the `properties` array of any node to let users opt in
 * to receiving HTTP response headers and status code alongside the body.
 */
export const includeResponseHeadersProperty: INodeProperties = {
	displayName: 'Include Response Headers',
	name: 'includeResponseHeaders',
	type: 'boolean',
	default: false,
	description:
		'Whether to include HTTP response headers and status code in the output. When enabled, the response body is nested under a "body" key, with "headers" and "statusCode" alongside it.',
	routing: {
		output: {
			postReceive: [
				async function (
					this: IExecuteSingleFunctions,
					items: INodeExecutionData[],
					response: IN8nHttpFullResponse,
				): Promise<INodeExecutionData[]> {
					const includeHeaders = this.getNodeParameter('includeResponseHeaders', false) as boolean;
					if (!includeHeaders) {
						return items;
					}

					return items.map((item) => {
						// When requestTracking is also enabled, its postReceive runs first
						// and adds requestId/requestStatusUrl to item.json. Promote those
						// to the top level so they stay accessible alongside the wrapped body.
						const { requestId, requestStatusUrl, ...body } = item.json;
						const result: IDataObject = {
							statusCode: response.statusCode,
							headers: response.headers as IDataObject,
							body,
						};
						if (requestId) {
							result.requestId = requestId;
						}
						if (requestStatusUrl) {
							result.requestStatusUrl = requestStatusUrl;
						}
						return { json: result, pairedItem: item.pairedItem };
					});
				},
			],
		},
	},
};
