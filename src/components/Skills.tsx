import { motion, type Variants } from 'motion/react';
import SpotlightCard from './SpotlightCard';

const ICON_BASE_URL =
	'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg';

interface SkillItem {
	name: string;
	iconName: string;
}

interface SkillCategory {
	title: string;
	items: SkillItem[];
}

export default function Skills() {
	const skillCategories: SkillCategory[] = [
		{
			title: 'Frontend',
			items: [
				{ name: 'TypeScript', iconName: 'typescript' },
				{ name: 'React', iconName: 'reactjs' },
				{ name: 'Next.js', iconName: 'nextjs' },
				{ name: 'Tailwind CSS', iconName: 'tailwind' },
				{ name: 'Astro', iconName: 'astro' },
			],
		},
		{
			title: 'Backend & DevInfra',
			items: [
				{ name: 'Hono', iconName: '/hono.svg' },
				{ name: 'Python', iconName: 'python' },
				{ name: 'Django', iconName: 'django' },
				{ name: 'Node.js', iconName: 'nodejs' },
				{ name: 'Supabase', iconName: 'supabase' },
				{ name: 'Cloudflare', iconName: 'cloudflare' },
				{ name: 'Vercel', iconName: 'vercel' },
				{ name: 'Docker', iconName: 'docker' },
			],
		},
	];

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.08 },
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	return (
		<motion.section
			id="skills"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			className="flex w-full max-w-4xl flex-col gap-12 px-4 md:px-0 scroll-mt-24"
		>
			<div className="flex flex-col gap-2 pl-2">
				<motion.h2
					variants={itemVariants}
					className="text-3xl sm:text-4xl font-bold tracking-tight text-ink md:text-5xl"
				>
					My Tech Stack.
				</motion.h2>
			</div>

			<div className="flex flex-col gap-10">
				{skillCategories.map((category, categoryIdx) => (
					<div key={category.title} className="space-y-4">
						<motion.h3
							variants={itemVariants}
							className="text-sm font-semibold text-muted pl-2"
						>
							{category.title}
						</motion.h3>

						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
							{category.items.map((skill, skillIdx) => {
								const isFirstIcon = categoryIdx === 0 && skillIdx === 0;
								return (
									<motion.div
										key={skill.name}
										variants={itemVariants}
										whileHover={{ y: -3 }}
										whileTap={{ scale: 0.98 }}
									>
										<SpotlightCard className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl group transition-colors shadow-xs">
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rule bg-paper p-2 group-hover:scale-105 transition-transform">
												<img
													src={
														skill.iconName.startsWith('/')
															? skill.iconName
															: `${ICON_BASE_URL}/${skill.iconName}.svg`
													}
													alt=""
													width="24"
													height="24"
													decoding="async"
													className={`h-full w-full object-contain ${
														skill.iconName === 'vercel' ? 'dark:invert' : ''
													}`}
													loading={isFirstIcon ? undefined : 'lazy'}
													onError={(e) => {
														e.currentTarget.style.display = 'none';
														const fallback = e.currentTarget
															.nextElementSibling as HTMLElement;
														if (fallback) fallback.style.display = 'flex';
													}}
												/>
												<span className="hidden text-xs font-bold text-muted select-none">
													{skill.name.charAt(0)}
												</span>
											</div>

											<span className="font-medium text-ink text-xs sm:text-sm">
												{skill.name}
											</span>
										</SpotlightCard>
									</motion.div>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</motion.section>
	);
}
