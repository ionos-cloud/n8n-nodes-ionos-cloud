import type { INodeProperties } from 'n8n-workflow';

// Buffer is available at runtime in Node.js
declare const Buffer: {
	from(data: string): { toString(encoding: string): string };
};

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				description: 'Add documents to a collection',
				action: 'Add documents to collection',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a document from a collection',
				action: 'Delete a document',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/collections/{{$parameter.collectionId}}/documents/{{$parameter.documentId}}',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Delete All',
				value: 'deleteAll',
				description: 'Delete all documents from a collection',
				action: 'Delete all documents',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/collections/{{$parameter.collectionId}}/documents',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get document details',
				action: 'Get a document',
				routing: {
					request: {
						method: 'GET',
						url: '=/collections/{{$parameter.collectionId}}/documents/{{$parameter.documentId}}',
					},
				},
			},
			{
				name: 'Get Chunks',
				value: 'getChunks',
				description: 'Get document chunks details',
				action: 'Get document chunks',
				routing: {
					request: {
						method: 'GET',
						url: '=/collections/{{$parameter.collectionId}}/documents/{{$parameter.documentId}}/chunks',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'items',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get the list of documents stored in a collection',
				action: 'Get many documents',
				routing: {
					request: {
						method: 'GET',
						url: '=/collections/{{$parameter.collectionId}}/documents',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'items',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a document',
				action: 'Update a document',
			},
		],
		default: 'getAll',
	},
];

const showForAdd = {
	resource: ['document'],
	operation: ['add'],
};

const showForUpdate = {
	resource: ['document'],
	operation: ['update'],
};

export const documentDescriptions: INodeProperties[] = [
	// Collection ID for all document operations
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		default: '',
		description: 'The ID of the collection',
	},

	// Document ID for get, update, delete, getChunks
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get', 'update', 'delete', 'getChunks'],
			},
		},
		default: '',
		description: 'The ID of the document',
	},

	// Add operation
	{
		displayName: 'Type',
		name: 'type',
		type: 'hidden',
		displayOptions: { show: showForAdd },
		default: 'collection',
		routing: {
			request: {
				method: 'PUT',
				url: '=/collections/{{$parameter.collectionId}}/documents',
			},
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Documents',
		name: 'documents',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Document',
		default: {},
		displayOptions: { show: showForAdd },
		description: 'The documents to add to the collection',
		options: [
			{
				name: 'document',
				displayName: 'Document',
				values: [
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						default: '',
						description: 'The content of the document (will be base64 encoded automatically)',
					},
					{
						displayName: 'Content Type',
						name: 'contentType',
						type: 'options',
						options: [
							{
								name: 'Text/Plain',
								value: 'text/plain',
							},
						],
						default: 'text/plain',
						description: 'The type of document content',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'The description of the document (max 1024 characters)',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the document (3-256 characters)',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'hidden',
						default: 'document',
					},
			],
			},
		],
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						const documents = this.getNodeParameter('documents') as {
							document?: Array<{
								type: string;
								name: string;
								content: string;
								contentType: string;
								description?: string;
							}>;
						};

						if (documents.document && Array.isArray(documents.document)) {
							const items = documents.document.map((doc) => ({
								type: 'document',
								properties: {
									name: doc.name,
									contentType: doc.contentType,
									content: Buffer.from(doc.content).toString('base64'),
									...(doc.description ? { description: doc.description } : {}),
								},
							}));

							requestOptions.body = {
								...requestOptions.body,
								items,
							};
						}

						return requestOptions;
					},
				],
			},
		},
	},

	// Update operation
	{
		displayName: 'Type',
		name: 'type',
		type: 'hidden',
		displayOptions: { show: showForUpdate },
		default: 'document',
		routing: {
			request: {
				method: 'PUT',
				url: '=/collections/{{$parameter.collectionId}}/documents/{{$parameter.documentId}}',
			},
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForUpdate },
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The content of the document (will be base64 encoded)',
				routing: {
					send: {
						preSend: [
							async function (this, requestOptions) {
								const content = this.getNodeParameter('updateFields.content') as string;
								if (content) {
									if (!requestOptions.body) requestOptions.body = {};
									if (typeof requestOptions.body === 'object' && !Array.isArray(requestOptions.body)) {
										if (!requestOptions.body.properties) {
											requestOptions.body.properties = {};
										}
										if (typeof requestOptions.body.properties === 'object') {
											requestOptions.body.properties.content = Buffer.from(content).toString('base64');
										}
									}
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Content Type',
				name: 'contentType',
				type: 'options',
				options: [
					{
						name: 'Text/Plain',
						value: 'text/plain',
					},
				],
				default: 'text/plain',
				description: 'The type of document content',
				routing: {
					send: {
						type: 'body',
						property: 'properties.contentType',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the document (max 1024 characters)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.description',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the document (3-256 characters)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.name',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},

	// Options for getAll, getChunks
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['getAll', 'getChunks'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Offset to start from',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
		],
	},
];
