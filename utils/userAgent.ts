// Declare require for CommonJS module loading
declare const require: (id: string) => Record<string, unknown>;

// Use require() instead of import to avoid tsc copying package.json to dist/
// From dist/utils/userAgent.js, the root package.json is at ../../package.json
const { version: packageVersion } = require('../../package.json') as { version: string };

// Get n8n version from n8n-workflow package
let n8nVersion = 'unknown';
try {
	const n8nWorkflow = require('n8n-workflow/package.json') as { version?: string };
	n8nVersion = n8nWorkflow.version || 'unknown';
} catch {
	// Fallback if package.json is not accessible
	n8nVersion = 'unknown';
}

export const USER_AGENT = `n8n-ionos-cloud/${packageVersion} n8n/${n8nVersion}`;
