import { version as packageVersion } from '../package.json';

// Declare require for CommonJS module loading
declare const require: (id: string) => { version?: string };

// Get n8n version from n8n-workflow package
let n8nVersion = 'unknown';
try {
	const n8nWorkflow = require('n8n-workflow/package.json');
	n8nVersion = n8nWorkflow.version || 'unknown';
} catch {
	// Fallback if package.json is not accessible
	n8nVersion = 'unknown';
}

export const USER_AGENT = `n8n-ionos-cloud/${packageVersion} n8n/${n8nVersion}`;
