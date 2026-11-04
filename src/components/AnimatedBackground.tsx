import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from 'motion/react';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
	const shouldReduceMotion = useReducedMotion();
	const [hasFinePointer, setHasFinePointer] = useState(false);

	const mouseX = useMotionValue(-1000);
	const mouseY = useMotionValue(-1000);

	const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 20 });
	const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 20 });

	useEffect(() => {
		const mediaQuery = window.matchMedia('(pointer: fine)');
		setHasFinePointer(mediaQuery.matches);

		if (!mediaQuery.matches) return;

		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-paper transition-colors duration-500">
			{/* Subtle single-hue ambient field */}
			<div className="bg-ambient-field pointer-events-none absolute inset-0" />

			{/* Spotlight follow glow (only for fine-pointer devices like desktop mice) */}
			{hasFinePointer && !shouldReduceMotion && (
				<motion.div
					style={{
						x: smoothMouseX,
						y: smoothMouseY,
						translateX: '-50%',
						translateY: '-50%',
						backgroundImage:
							'radial-gradient(circle, color-mix(in oklab, var(--color-accent) 12%, transparent) 0%, transparent 68%)',
					}}
					className="pointer-events-none absolute h-[560px] w-[560px] rounded-full"
				/>
			)}

			{/* Minimal micro-dot grid for depth */}
			<div className="bg-grid-dots pointer-events-none absolute inset-0" />

			{/* Subtle tactile film grain overlay */}
			<div className="bg-noise pointer-events-none absolute inset-0" />
		</div>
	);
}
