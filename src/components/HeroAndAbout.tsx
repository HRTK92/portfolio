import { motion, type Variants } from 'motion/react';
import Magnetic from './Magnetic';
import SpotlightCard from './SpotlightCard';

export default function HeroAndAbout() {
	// 2020年4月から現在までの経過年数を動的計算
	const startDate = new Date(2020, 3, 1); // 2020年4月1日
	const now = new Date();
	const diffYears = Math.floor(
		(now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
	);
	const experienceText = `${diffYears}+`;

	const introContainer: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const introItem: Variants = {
		hidden: { opacity: 0, y: 15 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
		},
	};

	return (
		<div className="flex w-full max-w-4xl flex-col gap-12 sm:gap-16 pt-4 sm:pt-8">
			{/* HERO SECTION */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={introContainer}
				className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 py-6 sm:py-10"
			>
				{/* Avatar with subtle multi-layer ring */}
				<motion.div variants={introItem} className="relative group">
					<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
					<div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-white/80 dark:border-white/20 bg-white/70 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl shrink-0 p-1.5">
						<img
							src="https://api.dicebear.com/7.x/notionists/svg?seed=portfolio"
							alt="Avatar"
							className="h-full w-full rounded-full object-cover"
						/>
					</div>
				</motion.div>

				{/* Headings */}
				<motion.div variants={introItem} className="space-y-3.5 max-w-2xl px-4">
					<h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
						Hi, I'm{' '}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
							Takuho
						</span>
						.
					</h1>
					<p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
						Developer crafting modern web experiences & OSS.
					</p>
					<p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 font-mono tracking-wide">
						TypeScript · Python · Cloudflare
					</p>
				</motion.div>

				{/* Call to Actions */}
				<motion.div
					variants={introItem}
					className="flex items-center gap-3 sm:gap-4 pt-2"
				>
					<Magnetic strength={0.25}>
						<a
							href="#projects"
							className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
						>
							<span>Explore Projects</span>
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
								<path d="m6 9 6 6 6-6" />
							</svg>
						</a>
					</Magnetic>

					<Magnetic strength={0.25}>
						<a
							href="#about"
							className="cursor-pointer inline-flex items-center justify-center rounded-full border border-slate-200/80 dark:border-white/15 bg-white/70 dark:bg-white/5 px-6 py-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 shadow-xs backdrop-blur-md transition-all hover:bg-white dark:hover:bg-white/10 hover:scale-105 active:scale-95"
						>
							<span>About Me</span>
						</a>
					</Magnetic>
				</motion.div>
			</motion.section>

			{/* ABOUT SECTION */}
			<motion.section
				id="about"
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-80px' }}
				transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
				className="w-full flex flex-col gap-6 scroll-mt-24"
			>
				<div className="flex flex-col gap-1 pl-2">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
						About Me
					</span>
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
						Background & Philosophy.
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Stat Tile 1 */}
					<SpotlightCard
						spotlightColor="rgba(59, 130, 246, 0.12)"
						className="p-6 rounded-3xl flex flex-col justify-between gap-4"
					>
						<div className="text-slate-400 text-xs font-mono tracking-wider uppercase">
							EXPERIENCE
						</div>
						<div>
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
								{experienceText}{' '}
								<span className="text-sm font-medium text-slate-500">
									years
								</span>
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								中学生でプログラミングと出会い、WebとOSSの制作を継続
							</p>
						</div>
					</SpotlightCard>

					{/* Stat Tile 2 */}
					<SpotlightCard
						spotlightColor="rgba(168, 85, 247, 0.12)"
						className="p-6 rounded-3xl flex flex-col justify-between gap-4"
					>
						<div className="text-slate-400 text-xs font-mono tracking-wider uppercase">
							STACK FOCUS
						</div>
						<div>
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-600 dark:text-purple-400">
								TS · Python
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								堅牢な型設計とモダンなWeb体験の追求
							</p>
						</div>
					</SpotlightCard>

					{/* Stat Tile 3 */}
					<SpotlightCard
						spotlightColor="rgba(14, 165, 233, 0.12)"
						className="p-6 rounded-3xl flex flex-col justify-between gap-4"
					>
						<div className="text-slate-400 text-xs font-mono tracking-wider uppercase">
							INFRA & OSS
						</div>
						<div>
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400">
								Self-Hosted
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								プライベートネットワーク上で多様なOSSをセルフホスト運用
							</p>
						</div>
					</SpotlightCard>

					{/* Bio Wide Tile */}
					<SpotlightCard
						spotlightColor="rgba(99, 102, 241, 0.1)"
						className="p-7 sm:p-9 rounded-[2rem] md:col-span-3 flex flex-col md:flex-row gap-8 items-start justify-between"
					>
						<div className="space-y-3 max-w-xl">
							<span className="text-xs font-bold uppercase tracking-wider text-slate-400">
								Story
							</span>
							<p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
								アイデアをコードで形にすることが好きです。TypeScriptやPythonを用いたWebアプリ開発をはじめ、セルフホストやWebサービスの仕組みを根本から理解したものづくりを大切にしています。
							</p>
							<p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
								将来はソフトウェアエンジニアとして、使う人の役に立ち、日々の課題を軽やかに解決するプロダクトを創り出したいと考えています。
							</p>
						</div>

						<div className="w-full md:w-56 shrink-0 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 backdrop-blur-xs">
							<ul className="flex flex-col gap-2.5 text-xs">
								<li className="flex justify-between border-b border-slate-200/50 dark:border-white/10 pb-1.5">
									<span className="text-slate-400">Status</span>
									<span className="font-medium text-slate-800 dark:text-white">
										University Student
									</span>
								</li>
								<li className="flex justify-between border-b border-slate-200/50 dark:border-white/10 pb-1.5">
									<span className="text-slate-400">Location</span>
									<span className="font-medium text-slate-800 dark:text-white">
										Saitama, Japan
									</span>
								</li>
								<li className="flex justify-between">
									<span className="text-slate-400">Role</span>
									<span className="font-medium text-blue-500">
										Student Developer
									</span>
								</li>
							</ul>
						</div>
					</SpotlightCard>
				</div>
			</motion.section>
		</div>
	);
}
