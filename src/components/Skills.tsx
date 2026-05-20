import { motion, type Variants } from 'motion/react';

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
				{ name: 'Python', iconName: 'python' },
				{ name: 'Docker', iconName: 'docker' },
				{ name: 'Cloudflare', iconName: 'cloudflare' },
				{ name: 'Node.js', iconName: 'nodejs' },
			],
		},
	];

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	return (
		<motion.section
			id="skills"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			className="flex w-full max-w-4xl flex-col gap-12 px-4 md:px-0"
		>
			<div className="flex flex-col gap-2 pl-4">
				<motion.span
					variants={itemVariants}
					className="text-sm font-bold uppercase tracking-widest text-purple-500"
				>
					Skills
				</motion.span>
				<motion.h2
					variants={itemVariants}
					className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl"
				>
					My Tech Stack.
				</motion.h2>
			</div>

			<div className="flex flex-col gap-12">
				{skillCategories.map((category) => (
					<div key={category.title} className="space-y-6">
						<motion.h3
							variants={itemVariants}
							className="text-lg font-semibold text-slate-400 pl-4"
						>
							{category.title}
						</motion.h3>

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
							{category.items.map((skill) => (
								<motion.div
									key={skill.name}
									variants={itemVariants}
									whileHover={{
										scale: 1.05,
										y: -4,
										backgroundColor: 'rgba(255, 255, 255, 0.65)',
										boxShadow: '0 12px 24px -10px rgba(31,38,135,0.05)',
									}}
									whileTap={{ scale: 0.98 }}
									className="flex items-center gap-4 rounded-2xl border border-white/95 bg-white/40 p-4 shadow-[0_4px_16px_rgba(31,38,135,0.02)] backdrop-blur-xl transition-all duration-300"
								>
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 p-2 shadow-inner">
										<img
											src={`${ICON_BASE_URL}/${skill.iconName}.svg`}
											alt={skill.name}
											className="h-full w-full object-contain"
											loading="lazy"
											onError={(e) => {
												e.currentTarget.style.display = 'none';
												const fallback = e.currentTarget
													.nextElementSibling as HTMLElement;
												if (fallback) fallback.style.display = 'flex';
											}}
										/>
										<span className="hidden text-xs font-bold text-slate-400 select-none">
											{skill.name.charAt(0)}
										</span>
									</div>

									<span className="font-medium text-slate-700 text-sm md:text-base">
										{skill.name}
									</span>
								</motion.div>
							))}
						</div>
					</div>
				))}
			</div>
		</motion.section>
	);
}
