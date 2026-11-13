import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				concept: z.object({
					category: z.enum(['definitions', 'execution', 'data', 'infrastructure']),
					order: z.number().int().positive(),
				}).optional(),
			}),
		}),
	}),
};
