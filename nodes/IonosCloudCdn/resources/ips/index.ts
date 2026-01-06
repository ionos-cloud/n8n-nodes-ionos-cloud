import type { INodeProperties } from 'n8n-workflow';
import * as ips from './ips';

export const descriptions: INodeProperties[] = [
	...ips.ipsOperations,
	...ips.ipsFields,
];
