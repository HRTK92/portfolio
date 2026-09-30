import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWind3,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	content: {
		filesystem: ['src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	},
	presets: [
		presetWind3({
			dark: 'class',
		}),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
		}),
		presetTypography(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	theme: {
		fontFamily: {
			sans: 'var(--font-sans)',
			mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		},
	},
	rules: [
		['shadow-xs', { 'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }],
		['rounded-xs', { 'border-radius': '0.125rem' }],
		[
			'backdrop-blur-xs',
			{
				'-webkit-backdrop-filter': 'blur(4px)',
				'backdrop-filter': 'blur(4px)',
			},
		],
	],
	shortcuts: [
		[
			/^bg-linear-to-([trbl]+)$/,
			([, dir]) => {
				const dirMap: Record<string, string> = {
					r: 'to right',
					l: 'to left',
					t: 'to top',
					b: 'to bottom',
					tr: 'to top right',
					tl: 'to top left',
					br: 'to bottom right',
					bl: 'to bottom left',
				};
				return `bg-gradient-${dirMap[dir] || dir}`;
			},
		],
	],
});
