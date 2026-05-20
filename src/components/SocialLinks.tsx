import { motion, type Variants } from 'motion/react';

export default function SocialLinks() {
	const containerVariants: Variants = {
		hidden: { opacity: 0, x: 20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.8,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, x: 20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	const links = [
		{
			name: 'GitHub',
			url: 'https://github.com/HRTK92',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
					<path d="M9 18c-4.51 2-5-2-7-2"></path>
				</svg>
			),
		},
		{
			name: 'X',
			url: 'https://x.com',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
					<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
				</svg>
			),
		},
		{
			name: 'Mail',
			url: 'mailto:me@hrtk92.dev',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect width="20" height="16" x="2" y="4" rx="2"></rect>
					<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
				</svg>
			),
		},
	];

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-50"
		>
			<div className="h-12 w-px bg-linear-to-b from-transparent to-white/60" />

			{links.map((link) => (
				<motion.a
					key={link.name}
					variants={itemVariants}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.1, x: -4 }}
					whileTap={{ scale: 0.95 }}
					className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/40 text-slate-600 shadow-[0_4px_12px_rgba(31,38,135,0.03)] backdrop-blur-md transition-colors duration-200 hover:bg-white/80 hover:text-blue-500 hover:shadow-[0_8px_24px_rgba(31,38,135,0.08)]"
					aria-label={link.name}
				>
					{link.icon}
				</motion.a>
			))}

			<div className="h-12 w-px bg-linear-to-t from-transparent to-white/60" />
		</motion.div>
	);
}
