import { motion, type Variants } from 'motion/react';
import { projectsData } from '../data/projects';
import { BentoCard, BentoGrid } from './BentoGrid';
import Magnetic from './Magnetic';

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
				<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink md:text-5xl">
					What I&rsquo;ve Built.
				</h2>
			</div>

			<BentoGrid className="md:grid-cols-2">
				{projectsData.map((project) => {
					const primaryLink = project.links.demo ?? project.links.github;

					return (
						<motion.div
							key={project.slug}
							variants={itemVariants}
							className="col-span-3 md:col-span-1 flex"
						>
							<BentoCard
								name=""
								className="w-full"
								background={
									<div className="bg-grid-dots absolute inset-0 opacity-40" />
								}
								header={
									<div className="flex items-start justify-between gap-4">
										{primaryLink ? (
											<a
												href={primaryLink}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 group-hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
											>
												<h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
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
													aria-hidden="true"
													className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-transform text-accent"
												>
													<path d="M7 7h10v10" />
													<path d="M7 17 17 7" />
												</svg>
											</a>
										) : (
											<h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
												{project.title}
											</h3>
										)}
									</div>
								}
								description={project.description}
								footer={
									<div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
										<div className="flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-lg border border-rule bg-paper px-2.5 py-1 text-xs font-medium text-ink-2 transition-colors group-hover:bg-paper-3"
												>
													{tag}
												</span>
											))}
										</div>

										<div className="pointer-events-auto flex shrink-0 items-center gap-2">
											{project.links.demo && (
												<Magnetic strength={0.25}>
													<a
														href={project.links.demo}
														target="_blank"
														rel="noopener noreferrer"
														aria-label={`${project.title} のサイトを開く`}
														className="inline-flex h-9 items-center gap-1.5 rounded-full border border-rule-2 bg-paper-3 px-4 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
													>
														<span>Visit</span>
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
															aria-hidden="true"
														>
															<path d="M7 7h10v10" />
															<path d="M7 17 17 7" />
														</svg>
													</a>
												</Magnetic>
											)}

											{project.links.github && (
												<Magnetic strength={0.25}>
													<a
														href={project.links.github}
														target="_blank"
														rel="noopener noreferrer"
														aria-label={`${project.title} の GitHub ソースコード`}
														className="inline-flex h-9 items-center gap-2 rounded-full border border-rule bg-paper px-4 text-xs font-semibold text-ink-2 transition-colors hover:bg-paper-3 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
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
															aria-hidden="true"
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
								}
							/>
						</motion.div>
					);
				})}
			</BentoGrid>
		</motion.section>
	);
}
