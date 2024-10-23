// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import path from 'path';
import tailwindcss from 'tailwindcss';
import tailwindcssNesting from 'tailwindcss/nesting';
import autoprefixer from 'autoprefixer';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hackerspace.sg',
  integrations: [react(), mdx(), icon(), sitemap()],
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcssNesting(),
          tailwindcss({
            config: path.resolve(import.meta.dirname, 'tailwind.config.ts'),
          }),
          autoprefixer(),
        ],
      },
    },
  },
});
