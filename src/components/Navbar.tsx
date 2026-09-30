import { motion } from 'motion/react';
import Magnetic from './Magnetic';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
	const navLinks = [
		{ name: 'About', href: '#about' },
		{ name: 'Skills', href: '#skills' },
		{ name: 'Projects', href: '#projects' },
	];

	return (
		<div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
			<motion.header
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className="pointer-events-auto flex items-center gap-3 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 px-4 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl"
			>
				<nav className="flex items-center gap-1 sm:gap-2">
					{navLinks.map((link) => (
						<Magnetic key={link.name} strength={0.2}>
							<a
								href={link.href}
								className="rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/10"
							>
								{link.name}
							</a>
						</Magnetic>
					))}
				</nav>

				<div className="h-4 w-px bg-slate-300/60 dark:bg-white/20" />

				<Magnetic strength={0.3}>
					<ThemeToggle />
				</Magnetic>
			</motion.header>
		</div>
	);
}
