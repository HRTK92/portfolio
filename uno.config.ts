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
			display: 'var(--font-display)',
			body: 'var(--font-body)',
			mono: 'var(--font-outlier)',
		},
		colors: {
			paper: 'var(--color-paper)',
			'paper-2': 'var(--color-paper-2)',
			'paper-3': 'var(--color-paper-3)',
			ink: 'var(--color-ink)',
			'ink-2': 'var(--color-ink-2)',
			muted: 'var(--color-muted)',
			rule: 'var(--color-rule)',
			'rule-2': 'var(--color-rule-2)',
			accent: 'var(--color-accent)',
			'accent-ink': 'var(--color-accent-ink)',
			focus: 'var(--color-focus)',
			success: 'var(--color-success)',
			error: 'var(--color-error)',
		},
	},
	rules: [
		['shadow-xs', { 'box-shadow': 'var(--shadow-card)' }],
		['shadow-card', { 'box-shadow': 'var(--shadow-card)' }],
		['shadow-float', { 'box-shadow': 'var(--shadow-float)' }],
		['shadow-bento', { 'box-shadow': 'var(--shadow-bento)' }],
		['rounded-xs', { 'border-radius': '0.125rem' }],
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
