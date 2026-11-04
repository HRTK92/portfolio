import { motion } from 'motion/react';
import Magnetic from './Magnetic';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
	const navLinks = [
		{ name: 'About', href: '/#about' },
		{ name: 'Skills', href: '/#skills' },
		{ name: 'Projects', href: '/#projects' },
	];

	return (
		<div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
			<motion.header
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className="pointer-events-auto flex items-center gap-3 rounded-full border border-rule bg-paper-2 px-4 py-2 shadow-float"
			>
				<nav className="flex items-center gap-1 sm:gap-2">
					{navLinks.map((link) => (
						<Magnetic key={link.name} strength={0.2}>
							<a
								href={link.href}
								className="rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium text-ink-2 transition-colors hover:text-ink hover:bg-paper-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
							>
								{link.name}
							</a>
						</Magnetic>
					))}
				</nav>

				<div className="h-4 w-px bg-rule" />

				<Magnetic strength={0.3}>
					<ThemeToggle />
				</Magnetic>
			</motion.header>
		</div>
	);
}
