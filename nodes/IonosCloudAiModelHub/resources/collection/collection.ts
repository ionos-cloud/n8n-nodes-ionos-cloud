import type { INodeProperties } from 'n8n-workflow';

export const collectionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['collection'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new document collection',
				action: 'Create a collection',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a collection and all its documents',
				action: 'Delete a collection',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/collections/{{$parameter.collectionId}}',
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
				description: 'Get a collection by ID',
				action: 'Get a collection',
				routing: {
					request: {
						method: 'GET',
						url: '=/collections/{{$parameter.collectionId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many stored document collections',
				action: 'Get many collections',
				routing: {
					request: {
						method: 'GET',
						url: '/collections',
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
				name: 'Query',
				value: 'query',
				description: 'Search a collection for related content',
				action: 'Query a collection',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update collection details and metadata',
				action: 'Update a collection',
			},
		],
		default: 'getAll',
	},
];

const showForCreate = {
	resource: ['collection'],
	operation: ['create'],
};

const showForUpdate = {
	resource: ['collection'],
	operation: ['update'],
};

const showForQuery = {
	resource: ['collection'],
	operation: ['query'],
};

export const collectionDescriptions: INodeProperties[] = [
	// Collection ID for get, update, delete, query
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['collection'],
				operation: ['get', 'update', 'delete', 'query'],
			},
		},
		default: '',
		description: 'The ID of the collection',
	},

	// Create operation
	{
		displayName: 'Type',
		name: 'type',
		type: 'hidden',
		displayOptions: { show: showForCreate },
		default: 'collection',
		routing: {
			request: {
				method: 'POST',
				url: '/collections',
			},
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: showForCreate },
		default: '',
		description: 'The name of the collection (3-256 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'properties.name',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForCreate },
		options: [
			{
				displayName: 'Chunk Overlap',
				name: 'chunkOverlap',
				type: 'number',
				displayOptions: {
					show: {
						'/additionalFields.chunkingEnabled': [true],
					},
				},
				default: 50,
				description: 'Overlap between consecutive chunks (minimum 50)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.chunking.strategy.config.chunk_overlap',
					},
				},
			},
			{
				displayName: 'Chunk Size',
				name: 'chunkSize',
				type: 'number',
				displayOptions: {
					show: {
						'/additionalFields.chunkingEnabled': [true],
					},
				},
				default: 128,
				description: 'Size of each chunk (minimum 128)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.chunking.strategy.config.chunk_size',
					},
				},
			},
			{
				displayName: 'Chunking Enabled',
				name: 'chunkingEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether to enable chunking strategy for documents',
				routing: {
					send: {
						type: 'body',
						property: 'properties.chunking.enabled',
					},
				},
			},
			{
				displayName: 'Chunking Strategy',
				name: 'chunkingStrategy',
				type: 'options',
				displayOptions: {
					show: {
						'/additionalFields.chunkingEnabled': [true],
					},
				},
				options: [
					{
						name: 'Fixed Size',
						value: 'fixed_size',
					},
				],
				default: 'fixed_size',
				description: 'The chunking strategy to use',
				routing: {
					send: {
						type: 'body',
						property: 'properties.chunking.strategy.name',
					},
				},
			},
			{
				displayName: 'Database Type',
				name: 'dbType',
				type: 'options',
				options: [
					{
						name: 'ChromaDB',
						value: 'chromadb',
					},
					{
						name: 'PGVector',
						value: 'pgvector',
					},
				],
				default: 'chromadb',
				description: 'The type of database to use',
				routing: {
					send: {
						type: 'body',
						property: 'properties.engine.db_type',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the collection (max 1024 characters)',
				routing: {
					send: {
						type: 'body',
						property: 'properties.description',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Embedding Model',
				name: 'embeddingModel',
				type: 'string',
				default: 'BAAI/bge-large-en-v1.5',
				description: 'The embedding model to use',
				routing: {
					send: {
						type: 'body',
						property: 'properties.embedding.model',
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'fixedCollection',
				placeholder: 'Add Label',
				default: {},
				description: 'Labels for the collection',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'label',
						displayName: 'Label',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Label key',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Label value (max 256 characters)',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.labels',
						value: '={{ $value.label?.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {}) }}',
					},
				},
			},
		],
	},

	// Update operation
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForUpdate },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the collection (max 1024 characters)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/collections/{{$parameter.collectionId}}',
					},
					send: {
						type: 'body',
						property: 'properties.description',
						value: '={{ $value || undefined }}',
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'fixedCollection',
				placeholder: 'Add Label',
				default: {},
				description: 'Labels for the collection',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'label',
						displayName: 'Label',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Label key',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Label value (max 256 characters)',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'properties.labels',
						value: '={{ $value.label?.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {}) }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the collection (3-256 characters)',
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

	// Query operation
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: { show: showForQuery },
		default: '',
		typeOptions: {
			rows: 3,
		},
		description: 'The string used to query the vector database',
		routing: {
			request: {
				method: 'POST',
				url: '=/collections/{{$parameter.collectionId}}/query',
			},
			send: {
				type: 'body',
				property: 'query',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showForQuery },
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
						type: 'body',
						property: 'limit',
					},
				},
			},
		],
	},

	// Options for getAll
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['collection'],
				operation: ['getAll'],
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
