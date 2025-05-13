import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const IndexCarousel = defineCollection({
  loader: glob({
    pattern: '*.yaml',
    base: './src/content/IndexCarousel',
  }),
  schema: ({ image }) =>
    z.array(
      z.object({
        src: image(),
        title: z.string(),
      }),
    ),
});

const mentionsSchema = z.object({
  title: z.string(),
  author: z.string(),
  date: z.date(),
  publication: z.string(),
  slug: z.string(),
  language: z.string().optional(),
});

const mentions = defineCollection({
  loader: glob({
    pattern: '!(*-ex).md',
    base: './src/content/mentions',
  }),
  schema: mentionsSchema,
});

const mentionExcerpts = defineCollection({
  loader: glob({ pattern: '*ex.md', base: './src/content/mentions' }),
  schema: mentionsSchema,
});

export const collections = {
  IndexCarousel,
  mentions,
  mentionExcerpts,
};

