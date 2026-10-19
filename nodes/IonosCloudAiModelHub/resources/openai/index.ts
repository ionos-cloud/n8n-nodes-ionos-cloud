import type { INodeProperties } from 'n8n-workflow';
import * as openai from './openai';
import { createResponseDescriptions } from './createResponse';
import { editImageDescriptions } from './editImage';
import { rerankDescriptions } from './rerank';

export const descriptions: INodeProperties[] = [
	...openai.openaiOperations,
	...openai.openaiDescriptions,
	...createResponseDescriptions,
	...editImageDescriptions,
	...rerankDescriptions,
];
