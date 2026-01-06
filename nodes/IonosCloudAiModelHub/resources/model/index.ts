import type { INodeProperties } from 'n8n-workflow';
import * as model from './model';

export const descriptions: INodeProperties[] = [
	...model.modelOperations,
	...model.modelDescriptions,
];
