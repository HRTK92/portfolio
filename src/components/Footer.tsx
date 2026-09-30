import { motion } from 'motion/react';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/HRTK92' },
		{ name: 'X', url: 'https://x.com' },
		{ name: 'Mail', url: 'mailto:me@hrtk92.dev' },
	];

	return (
		<motion.footer
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			className="w-full max-w-4xl border-t border-slate-200/60 dark:border-white/10 px-4 pt-8 pb-16 md:px-0"
		>
			<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
				<div>
					<p>© {currentYear} Takuho. All rights reserved.</p>
				</div>

				{/* Social links on mobile (accessible without right bar) */}
				<div className="flex md:hidden items-center gap-4">
					{socialLinks.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors"
						>
							{link.name}
						</a>
					))}
				</div>

				<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
					<span className="text-slate-400 dark:text-slate-500 select-none">
						Built with{' '}
						<span className="text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors">
							Astro
						</span>{' '}
						&{' '}
						<span className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors">
							UnoCSS
						</span>
					</span>

					<div className="flex items-center gap-4 border-l border-slate-200/60 dark:border-white/10 pl-6">
						<a
							href="https://github.com/HRTK92/portfolio"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
							<span>GitHub</span>
						</a>
					</div>
				</div>
			</div>
		</motion.footer>
	);
}
