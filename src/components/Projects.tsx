import { motion, type Variants } from 'motion/react';

interface ProjectItem {
	title: string;
	description: string;
	tags: string[];
	links: {
		github?: string;
		demo?: string;
	};
}

export default function Projects() {
	const projects: ProjectItem[] = [
		{
			title: 'Kyudo Dashboard',
			description:
				'弓道部のためのデータ分析・スケジュール管理プラットフォーム。的中率の四半期分析や天気連携、ハプティクスフィードバックを実装。インフラをエッジ環境へ移行し、徹底的な高速化とコスト最適化を両立しました。',
			tags: [
				'Next.js',
				'TypeScript',
				'Drizzle ORM',
				'Cloudflare D1 / Workers',
				'Tailwind CSS',
			],
			links: {
				github: 'https://github.com/HRTK92/kyudo-app',
			},
		},
		{
			title: 'py-mcws',
			description:
				'MinecraftサーバーのWebSocket ServerをPythonで実装するライブラリ。',
			tags: ['Python', 'Minecraft'],
			links: {
				github: 'https://github.com/HRTK92/py-mcws',
			},
		},
	];

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2 },
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut' },
		},
	};

	return (
		<motion.section
			id="projects"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			className="flex w-full max-w-4xl flex-col gap-16 px-4 md:px-0"
		>
			<div className="flex flex-col gap-2 pl-4">
				<motion.span
					variants={itemVariants}
					className="text-sm font-bold uppercase tracking-widest text-blue-500"
				>
					Projects
				</motion.span>
				<motion.h2
					variants={itemVariants}
					className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl"
				>
					What I've Built.
				</motion.h2>
			</div>

			<div className="flex flex-col gap-8">
				{projects.map((project) => (
					<motion.div
						key={project.title}
						variants={itemVariants}
						whileHover={{
							scale: 1.01,
							y: -4,
							backgroundColor: 'rgba(255, 255, 255, 0.55)',
							boxShadow: '0 20px 40px -15px rgba(31,38,135,0.08)',
						}}
						className="group flex flex-col justify-between rounded-4xl border border-white/70 bg-white/30 p-8 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.03)] backdrop-blur-xl transition-all duration-300"
					>
						<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
							<div className="space-y-3 max-w-2xl">
								<h3 className="text-2xl font-bold text-slate-800 tracking-tight transition-colors group-hover:text-blue-600">
									{project.title}
								</h3>
								<p className="text-sm leading-relaxed text-slate-600">
									{project.description}
								</p>
							</div>

							<div className="flex shrink-0 items-center gap-4 md:pt-1">
								{project.links.github && (
									<a
										href={project.links.github}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/50 px-4 text-xs font-semibold text-slate-600 ring-1 ring-slate-900/5 transition-all hover:bg-white hover:text-blue-500"
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
											<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
											<path d="M9 18c-4.51 2-5-2-7-2"></path>
										</svg>
										Code
									</a>
								)}
								{project.links.demo && (
									<a
										href={project.links.demo}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/50 px-4 text-xs font-semibold text-slate-600 ring-1 ring-slate-900/5 transition-all hover:bg-white hover:text-purple-500"
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
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
											<polyline points="15 3 21 3 21 9"></polyline>
											<line x1="10" y1="14" x2="21" y2="3"></line>
										</svg>
										Live Demo
									</a>
								)}
							</div>
						</div>

						<div className="flex flex-wrap gap-1.5 border-t border-slate-200/30 pt-5">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-lg bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-900/5 backdrop-blur-xs transition-colors group-hover:bg-white/80"
								>
									{tag}
								</span>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
