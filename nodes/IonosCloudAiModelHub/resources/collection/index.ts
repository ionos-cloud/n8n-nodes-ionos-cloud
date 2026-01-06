import type { INodeProperties } from 'n8n-workflow';
import * as collection from './collection';

export const descriptions: INodeProperties[] = [
	...collection.collectionOperations,
	...collection.collectionDescriptions,
];
