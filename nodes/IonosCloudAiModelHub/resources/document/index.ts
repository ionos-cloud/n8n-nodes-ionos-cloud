import type { INodeProperties } from 'n8n-workflow';
import * as document from './document';

export const descriptions: INodeProperties[] = [
	...document.documentOperations,
	...document.documentDescriptions,
];
