import type { Config } from 'tailwindcss';

const tailwindConfig = {
  darkMode: ['class'],
  content: {
    files: [
      './src/**/*!(*.stories|*.spec|*.test).{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],
  },
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default tailwindConfig;
