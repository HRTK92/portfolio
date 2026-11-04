import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export type TransitionVariant =
	| 'circle'
	| 'square'
	| 'triangle'
	| 'diamond'
	| 'hexagon'
	| 'rectangle'
	| 'star';

export interface AnimatedThemeTogglerProps {
	className?: string;
	duration?: number;
	variant?: TransitionVariant;
	/** When true, the transition expands from the viewport center instead of the button center. */
	fromCenter?: boolean;
	/**
	 * Controlled theme value. When provided, the parent owns persistence
	 * and this component will not write to localStorage.
	 */
	theme?: 'light' | 'dark';
	/** Called on toggle. Pair with `theme` for controlled usage. */
	onThemeChange?: (theme: 'light' | 'dark') => void;
}

function polygonCollapsed(point: string, vertexCount: number): string {
	const pairs = Array.from({ length: vertexCount }, () => point).join(', ');
	return `polygon(${pairs})`;
}

// All coordinates are percentages of the snapshot reference box: Chrome 150
// renders absolute px clip-path coordinates on ::view-transition-new(root)
// unscaled on fractional display scales (e.g. Windows 150%) for the first
// transition after load, so px values land at the wrong position (#989).
function getThemeTransitionClipPaths(
	variant: TransitionVariant,
	cx: number,
	cy: number,
	maxRadius: number,
	viewportWidth: number,
	viewportHeight: number,
): [string, string] {
	const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
	const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
	const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
	// circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
	const toRadius = (r: number) =>
		`${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

	switch (variant) {
		case 'circle':
			return [
				`circle(0% at ${point(cx, cy)})`,
				`circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
			];
		case 'square': {
			const halfW = Math.max(cx, viewportWidth - cx);
			const halfH = Math.max(cy, viewportHeight - cy);
			const halfSide = Math.max(halfW, halfH) * 1.05;
			const end = [
				point(cx - halfSide, cy - halfSide),
				point(cx + halfSide, cy - halfSide),
				point(cx + halfSide, cy + halfSide),
				point(cx - halfSide, cy + halfSide),
			].join(', ');
			return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
		}
		case 'triangle': {
			const scale = maxRadius * 2.2;
			const dx = (Math.sqrt(3) / 2) * scale;
			const verts = [
				point(cx, cy - scale),
				point(cx + dx, cy + 0.5 * scale),
				point(cx - dx, cy + 0.5 * scale),
			].join(', ');
			return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`];
		}
		case 'diamond': {
			const R = maxRadius * Math.SQRT2;
			const end = [
				point(cx, cy - R),
				point(cx + R, cy),
				point(cx, cy + R),
				point(cx - R, cy),
			].join(', ');
			return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
		}
		case 'hexagon': {
			const R = maxRadius * Math.SQRT2;
			const verts: string[] = [];
			for (let i = 0; i < 6; i++) {
				const a = -Math.PI / 2 + (i * Math.PI) / 3;
				verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)));
			}
			return [
				polygonCollapsed(point(cx, cy), 6),
				`polygon(${verts.join(', ')})`,
			];
		}
		case 'rectangle': {
			const halfW = Math.max(cx, viewportWidth - cx);
			const halfH = Math.max(cy, viewportHeight - cy);
			const end = [
				point(cx - halfW, cy - halfH),
				point(cx + halfW, cy - halfH),
				point(cx + halfW, cy + halfH),
				point(cx - halfW, cy + halfH),
			].join(', ');
			return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
		}
		case 'star': {
			const R = maxRadius * Math.SQRT2 * 1.03;
			const innerRatio = 0.42;
			const starPolygon = (radius: number) => {
				const verts: string[] = [];
				for (let i = 0; i < 5; i++) {
					const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
					verts.push(
						point(
							cx + radius * Math.cos(outerA),
							cy + radius * Math.sin(outerA),
						),
					);
					const innerA = outerA + Math.PI / 5;
					verts.push(
						point(
							cx + radius * innerRatio * Math.cos(innerA),
							cy + radius * innerRatio * Math.sin(innerA),
						),
					);
				}
				return `polygon(${verts.join(', ')})`;
			};
			const startR = Math.max(2, R * 0.025);
			return [starPolygon(startR), starPolygon(R)];
		}
		default:
			return [
				`circle(0% at ${point(cx, cy)})`,
				`circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
			];
	}
}

export default function ThemeToggle({
	className = '',
	duration = 400,
	variant,
	fromCenter = false,
	theme,
	onThemeChange,
}: AnimatedThemeTogglerProps) {
	const shape = variant ?? 'circle';
	const isControlled = theme !== undefined;
	const [mounted, setMounted] = useState(false);
	const [internalIsDark, setInternalIsDark] = useState(false);
	const isDark = isControlled ? theme === 'dark' : internalIsDark;
	const buttonRef = useRef<HTMLButtonElement>(null);
	const isTransitioningRef = useRef(false);
	const activeAnimRef = useRef<Animation | null>(null);

	const cancelAnim = useCallback(() => {
		activeAnimRef.current?.cancel();
		activeAnimRef.current = null;
	}, []);

	useEffect(() => {
		setMounted(true);
		return () => {
			cancelAnim();
			const root = document.documentElement;
			if (root.dataset.magicuiThemeVt !== 'active') return;
			delete root.dataset.magicuiThemeVt;
			root.style.removeProperty('--magicui-theme-toggle-vt-duration');
			root.style.removeProperty('--magicui-theme-vt-clip-from');
		};
	}, [cancelAnim]);

	useEffect(() => {
		if (isControlled) return;

		const updateTheme = () => {
			setInternalIsDark(document.documentElement.classList.contains('dark'));
		};

		updateTheme();

		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, [isControlled]);

	const toggleTheme = useCallback(() => {
		const button = buttonRef.current;
		if (
			!button ||
			isTransitioningRef.current ||
			document.documentElement.dataset.magicuiThemeVt === 'active'
		)
			return;

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		let x: number;
		let y: number;
		if (fromCenter) {
			x = viewportWidth / 2;
			y = viewportHeight / 2;
		} else {
			const { top, left, width, height } = button.getBoundingClientRect();
			x = left + width / 2;
			y = top + height / 2;
		}

		const maxRadius = Math.hypot(
			Math.max(x, viewportWidth - x),
			Math.max(y, viewportHeight - y),
		);

		const applyTheme = () => {
			const newTheme = !isDark;
			document.documentElement.classList.toggle('dark');
			if (isControlled) {
				onThemeChange?.(newTheme ? 'dark' : 'light');
			} else {
				setInternalIsDark(newTheme);
				localStorage.setItem('theme', newTheme ? 'dark' : 'light');
			}
		};

		if (
			typeof document.startViewTransition !== 'function' ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			applyTheme();
			return;
		}

		const clipPath = getThemeTransitionClipPaths(
			shape,
			x,
			y,
			maxRadius,
			viewportWidth,
			viewportHeight,
		);

		const root = document.documentElement;
		root.dataset.magicuiThemeVt = 'active';
		root.style.setProperty(
			'--magicui-theme-toggle-vt-duration',
			`${duration}ms`,
		);
		root.style.setProperty('--magicui-theme-vt-clip-from', clipPath[0]);
		const cleanup = () => {
			isTransitioningRef.current = false;
			delete root.dataset.magicuiThemeVt;
			root.style.removeProperty('--magicui-theme-toggle-vt-duration');
			root.style.removeProperty('--magicui-theme-vt-clip-from');
			cancelAnim();
		};

		isTransitioningRef.current = true;
		const transition = document.startViewTransition(() => {
			flushSync(applyTheme);
		});
		if (typeof transition?.finished?.finally === 'function') {
			transition.finished.finally(cleanup).catch(() => {});
		} else {
			cleanup();
		}

		const ready = transition?.ready;
		if (ready && typeof ready.then === 'function') {
			ready
				.then(() => {
					const anim = document.documentElement.animate(
						{
							clipPath,
						},
						{
							duration,
							easing: shape === 'star' ? 'linear' : 'ease-in-out',
							fill: 'forwards',
							pseudoElement: '::view-transition-new(root)',
						},
					);
					activeAnimRef.current = anim;
				})
				.catch(() => {});
		}
	}, [
		shape,
		fromCenter,
		duration,
		isDark,
		isControlled,
		onThemeChange,
		cancelAnim,
	]);

	if (!mounted) {
		return <div className="h-9 w-9 rounded-full" />;
	}

	return (
		<motion.button
			ref={buttonRef}
			type="button"
			onClick={toggleTheme}
			whileHover={{ scale: 1.08 }}
			whileTap={{ scale: 0.92 }}
			className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-rule bg-paper-3 text-ink-2 transition-colors hover:bg-paper hover:text-ink ${className}`}
			aria-label="Toggle theme"
		>
			{isDark ? (
				<motion.svg
					key="moon"
					initial={{ rotate: -90, opacity: 0 }}
					animate={{ rotate: 0, opacity: 1 }}
					exit={{ rotate: 90, opacity: 0 }}
					transition={{ duration: 0.2 }}
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
					className="text-accent"
				>
					<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
				</motion.svg>
			) : (
				<motion.svg
					key="sun"
					initial={{ rotate: 90, opacity: 0 }}
					animate={{ rotate: 0, opacity: 1 }}
					exit={{ rotate: -90, opacity: 0 }}
					transition={{ duration: 0.2 }}
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
					className="text-accent"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="m4.93 4.93 1.41 1.41" />
					<path d="m17.66 17.66 1.41 1.41" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="m6.34 17.66-1.41 1.41" />
					<path d="m19.07 4.93-1.41 1.41" />
				</motion.svg>
			)}
			<span className="sr-only">Toggle theme</span>
		</motion.button>
	);
}
