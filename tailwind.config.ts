import type { Config } from 'tailwindcss';

const tailwindConfig = {
  darkMode: 'class',
  content: {
    files: [
      './src/**/*!(*.stories|*.spec|*.test).{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default tailwindConfig;
