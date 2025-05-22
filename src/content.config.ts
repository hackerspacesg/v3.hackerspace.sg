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

export const collections = {
  IndexCarousel,
};
