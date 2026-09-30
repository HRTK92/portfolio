import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';

export default function AnimatedBackground() {
	const mouseX = useMotionValue(-1000);
	const mouseY = useMotionValue(-1000);

	const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 20 });
	const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 20 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
			{/* Spotlight follow glow */}
			<motion.div
				style={{
					x: smoothMouseX,
					y: smoothMouseY,
					translateX: '-50%',
					translateY: '-50%',
					backgroundImage:
						'radial-gradient(circle, var(--tw-gradient-stops, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.08) 40%, transparent 70%))',
				}}
				className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-3xl"
			/>

			{/* Soft ambient aurora orbs */}
			<motion.div
				animate={{
					x: [0, 80, 0],
					y: [0, -40, 0],
					scale: [1, 1.15, 1],
				}}
				transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
				className="absolute top-[5%] left-[15%] h-[40vw] w-[40vw] rounded-full bg-blue-300/30 dark:bg-blue-600/10 mix-blend-multiply dark:mix-blend-screen blur-[120px]"
			/>
			<motion.div
				animate={{
					x: [0, -80, 0],
					y: [0, 80, 0],
					scale: [1, 1.2, 1],
				}}
				transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
				className="absolute top-[35%] right-[10%] h-[35vw] w-[35vw] rounded-full bg-purple-300/25 dark:bg-purple-600/10 mix-blend-multiply dark:mix-blend-screen blur-[120px]"
			/>
			<motion.div
				animate={{
					x: [0, 50, 0],
					y: [0, 100, 0],
					scale: [1, 1.1, 1],
				}}
				transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
				className="absolute bottom-[-5%] left-[25%] h-[45vw] w-[45vw] rounded-full bg-teal-300/20 dark:bg-emerald-600/10 mix-blend-multiply dark:mix-blend-screen blur-[130px]"
			/>

			{/* Minimal micro-dot grid for depth */}
			<div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

			{/* Subtle tactile film grain overlay */}
			<div className="bg-noise absolute inset-0 pointer-events-none" />
		</div>
	);
}
