import type { INodeProperties } from 'n8n-workflow';
import * as openai from './openai';

export const descriptions: INodeProperties[] = [
	...openai.openaiOperations,
	...openai.openaiDescriptions,
];
