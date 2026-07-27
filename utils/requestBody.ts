import type { IHttpRequestOptions } from 'n8n-workflow';

/**
 * Returns the `properties` object of an outgoing request body so that routing
 * `preSend` hooks can assign IONOS resource properties onto it.
 *
 * n8n types `requestOptions.body` as a broad union (string | Buffer | FormData | …)
 * that is also optional, so indexing into it does not type-check. The narrowing
 * lives here rather than being repeated at every call site.
 *
 * `body` and `body.properties` are normally already populated by the routing
 * `send: { type: 'body', property: 'properties.*' }` config; they are created here
 * only as a fallback so hooks never dereference undefined.
 */
export function requestBodyProperties(
	requestOptions: IHttpRequestOptions,
): Record<string, unknown> {
	const body = (requestOptions.body ?? (requestOptions.body = {})) as {
		properties?: Record<string, unknown>;
	};
	return (body.properties ??= {});
}
