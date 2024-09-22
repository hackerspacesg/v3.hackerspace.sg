// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import path from 'path';
import tailwindcss from 'tailwindcss';
import tailwindcssNesting from 'tailwindcss/nesting';
import autoprefixer from 'autoprefixer';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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
