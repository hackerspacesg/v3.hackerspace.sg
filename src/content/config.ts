import { z, defineCollection } from 'astro:content';

const IndexCarousel = defineCollection({
  type: 'data',
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
