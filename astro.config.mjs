// @ts-check

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://me.hrtk92.dev',
	integrations: [
		UnoCSS({
			injectReset: true,
		}),
		react(),
		sitemap(),
	],
	vite: {
		optimizeDeps: {
			exclude: ['motion', 'motion/react'],
		},
		ssr: {
			noExternal: ['motion'],
		},
	},
	adapter: cloudflare(),
});
