import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

/**
 * preSend hook for declarative operations whose endpoint takes
 * multipart/form-data instead of JSON, such as POST /v1/images/edits.
 *
 * Declarative routing always builds a JSON object body, so each of its fields
 * is moved into a form part: objects and arrays as JSON text, empty values
 * left out.
 *
 * The node's requestDefaults send `Content-Type: application/json`, and axios
 * serializes a FormData body back into JSON while that header is set. Dropping
 * it lets axios write the `multipart/form-data; boundary=...` header that
 * matches the body it sends.
 */
export async function sendBodyAsMultipartFormData(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const formData = new FormData();
	for (const [name, value] of Object.entries((requestOptions.body ?? {}) as IDataObject)) {
		if (value === undefined || value === null || value === '') {
			continue;
		}
		formData.append(name, typeof value === 'object' ? JSON.stringify(value) : String(value));
	}

	const headers: IDataObject = {};
	for (const [name, value] of Object.entries(requestOptions.headers ?? {})) {
		if (name.toLowerCase() !== 'content-type') {
			headers[name] = value;
		}
	}

	return { ...requestOptions, headers, body: formData };
}
