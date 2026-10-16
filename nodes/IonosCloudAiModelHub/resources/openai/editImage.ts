import type { INodeProperties } from 'n8n-workflow';
import { modelsLoadOptions } from './openai';

// Sent as multipart/form-data: see the preSend hook on the Edit Image operation
const showForEditImage = {
	resource: ['openai'],
	operation: ['editImage'],
};

export const editImageDescriptions: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: showForEditImage,
		},
		typeOptions: modelsLoadOptions,
		default: '',
		description:
			'ID of the image model to use, e.g. black-forest-labs/FLUX.2-klein-4B. The list is fetched live from the IONOS API.',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Image URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: showForEditImage,
		},
		default: '',
		placeholder: 'https://example.com/image.png',
		description:
			'The image to edit, as a public HTTP(S) URL or a base64 data URL (data:image/png;base64,...). It must be at least 64 pixels on each side.',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: showForEditImage,
		},
		default: '',
		description: 'Text description of the desired edit, up to 1000 characters',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'prompt',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showForEditImage,
		},
		options: [
			{
				displayName: 'Number of Images',
				name: 'n',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 10,
				},
				default: 1,
				description: 'Number of images to generate',
				routing: {
					send: {
						type: 'body',
						property: 'n',
					},
				},
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'string',
				default: '1024x1024',
				placeholder: '1024x1024',
				description:
					"Size of the generated image as WIDTHxHEIGHT, each side 64 to 2048 pixels and rounded down to a multiple of 16. Omit to keep the input image's size and aspect ratio.",
				routing: {
					send: {
						type: 'body',
						property: 'size',
					},
				},
			},
		],
	},
];
