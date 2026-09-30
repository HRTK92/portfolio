import { motion, type Variants } from 'motion/react';
import { projectsData } from '../data/projects';
import Magnetic from './Magnetic';
import SpotlightCard from './SpotlightCard';

export default function Projects() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.15 },
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 25 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	return (
		<motion.section
			id="projects"
			variants={containerVariants}
			initial="visible"
			className="flex w-full max-w-4xl flex-col gap-12 px-4 md:px-0 scroll-mt-24"
		>
			<div className="flex flex-col gap-2 pl-2">
				<span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
					Projects
				</span>
				<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
					What I've Built.
				</h2>
			</div>

			<div className="flex flex-col gap-6">
				{projectsData.map((project) => (
					<motion.div
						key={project.slug}
						variants={itemVariants}
						className="transition-transform duration-200 hover:-translate-y-1"
					>
						<SpotlightCard
							spotlightColor="rgba(59, 130, 246, 0.15)"
							style={
								{
									viewTransitionName: `card-${project.slug}`,
								} as React.CSSProperties
							}
							className="group flex flex-col justify-between p-7 sm:p-9 rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-slate-900/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl"
						>
							<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
								<div className="space-y-3 max-w-2xl">
									<a
										href={`/projects/${project.slug}`}
										className="inline-flex items-center gap-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
									>
										<h3
											style={
												{
													viewTransitionName: `title-${project.slug}`,
												} as React.CSSProperties
											}
											className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
										>
											{project.title}
										</h3>
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
											className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500"
										>
											<path d="M7 7h10v10" />
											<path d="M7 17 17 7" />
										</svg>
									</a>
									<p
										style={
											{
												viewTransitionName: `desc-${project.slug}`,
											} as React.CSSProperties
										}
										className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300"
									>
										{project.description}
									</p>
								</div>

								<div className="flex shrink-0 items-center gap-3">
									<Magnetic strength={0.25}>
										<a
											href={`/projects/${project.slug}`}
											className="inline-flex h-9 items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 text-xs font-semibold text-blue-600 dark:text-blue-400 transition-all hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white"
										>
											<span>Detail</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="13"
												height="13"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="m9 18 6-6-6-6" />
											</svg>
										</a>
									</Magnetic>

									{project.links.github && (
										<Magnetic strength={0.25}>
											<a
												href={project.links.github}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-white/10 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-900/5 transition-all hover:bg-white dark:hover:bg-white/20 hover:text-blue-600 dark:hover:text-blue-400"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="15"
													height="15"
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
												<span>Code</span>
											</a>
										</Magnetic>
									)}
								</div>
							</div>

							<div
								style={
									{
										viewTransitionName: `tags-${project.slug}`,
									} as React.CSSProperties
								}
								className="flex flex-wrap gap-2 border-t border-slate-200/50 dark:border-white/10 pt-4"
							>
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-lg border border-slate-200/60 dark:border-white/5 bg-white/60 dark:bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 backdrop-blur-xs transition-colors group-hover:bg-white/90 dark:group-hover:bg-white/10"
									>
										{tag}
									</span>
								))}
							</div>
						</SpotlightCard>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
