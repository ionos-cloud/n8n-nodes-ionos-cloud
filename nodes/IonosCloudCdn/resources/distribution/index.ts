import type { INodeProperties } from 'n8n-workflow';
import * as distribution from './distribution';

export const descriptions: INodeProperties[] = [
	...distribution.distributionOperations,
	...distribution.distributionFields,
];
