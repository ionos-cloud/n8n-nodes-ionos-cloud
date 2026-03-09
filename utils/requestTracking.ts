import type {
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeProperties,
	IN8nHttpFullResponse,
} from 'n8n-workflow';

/**
 * Regex to extract the request UUID from the IONOS Cloud API Location header.
 * Uses the standard UUID format: 8-4-4-4-12 hex digits.
 * Example: https://api.ionos.com/cloudapi/v6/requests/99b077f7-45fc-4634-9e2a-dd0d96f28b5d/status
 */
const REQUEST_ID_REGEX = /\/requests\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/status/i;

/**
 * Property that automatically extracts the request tracking info from
 * the Location header returned by non-GET IONOS Cloud API operations.
 *
 * When a Location header is present, it adds `requestId` and
 * `requestStatusUrl` to the response so users can easily poll for
 * operation completion using the Request resource.
 */
export const requestTrackingProperty: INodeProperties = {
	displayName: 'Include Request Status',
	name: 'includeRequestStatus',
	type: 'boolean',
	default: false,
	description:
		'Whether to include the request tracking ID and status URL from async operations. The IONOS Cloud API returns a Location header for non-GET operations that can be used to track request progress.',
	routing: {
		output: {
			postReceive: [
				async function (
					this: IExecuteSingleFunctions,
					items: INodeExecutionData[],
					response: IN8nHttpFullResponse,
				): Promise<INodeExecutionData[]> {
					const includeStatus = this.getNodeParameter('includeRequestStatus', false) as boolean;
					if (!includeStatus) {
						return items;
					}

					const locationHeader = response.headers?.location as string | undefined;
					if (!locationHeader) {
						return items;
					}

					const match = REQUEST_ID_REGEX.exec(locationHeader);
					if (!match) {
						return items;
					}

					const requestId = match[1];

					return items.map((item) => ({
						json: {
							...item.json,
							requestId,
							requestStatusUrl: locationHeader,
						},
						pairedItem: item.pairedItem,
					}));
				},
			],
		},
	},
};
