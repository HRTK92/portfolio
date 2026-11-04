import { motion, type Variants } from 'motion/react';
import { BentoCard, BentoGrid } from './BentoGrid';
import Magnetic from './Magnetic';

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
				{/* Monogram Mark */}
				<motion.div variants={introItem} className="relative">
					<div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-rule bg-paper-2 shadow-card shrink-0">
						<code className="font-mono text-lg sm:text-xl font-semibold text-accent">
							&gt;_
						</code>
					</div>
				</motion.div>

				{/* Headings */}
				<motion.div variants={introItem} className="space-y-3.5 max-w-2xl px-4">
					<h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.15]">
						Hi, I&rsquo;m <span className="text-accent">Takuho</span>.
					</h1>
					<p className="text-base sm:text-xl text-ink-2 font-normal leading-relaxed">
						Developer crafting modern web experiences &amp; OSS.
					</p>
					<p className="text-xs sm:text-sm text-muted">
						TypeScript / Python / Cloudflare
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
							className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-xs sm:text-sm font-semibold shadow-card transition-transform hover:scale-105 active:scale-95"
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
								aria-hidden="true"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</a>
					</Magnetic>

					<Magnetic strength={0.25}>
						<a
							href="#about"
							className="cursor-pointer inline-flex items-center justify-center rounded-full border border-rule bg-paper-2 px-6 py-3 text-xs sm:text-sm font-medium text-ink-2 shadow-xs transition-colors hover:bg-paper-3 hover:text-ink"
						>
							<span>About Me</span>
						</a>
					</Magnetic>
				</motion.div>
			</motion.section>

			{/* ABOUT SECTION (Bento Grid) */}
			<motion.section
				id="about"
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-80px' }}
				transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
				className="w-full flex flex-col gap-6 scroll-mt-24"
			>
				<div className="flex flex-col gap-1 pl-2">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
						Background &amp; Philosophy.
					</h2>
				</div>

				<BentoGrid>
					{/* Bento Tile 1: Experience */}
					<BentoCard
						name="Experience"
						className="md:col-span-1"
						description="中学生でプログラミングと出会い、WebとOSSの制作を継続"
						header={
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink tabular-nums">
								{experienceText}{' '}
								<span className="text-sm font-medium text-muted">years</span>
							</div>
						}
					/>

					{/* Bento Tile 2: Stack Focus */}
					<BentoCard
						name="Stack focus"
						className="md:col-span-1"
						description="堅牢な型設計とモダンなWeb体験の追求"
						header={
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-accent">
								TS / Python
							</div>
						}
					/>

					{/* Bento Tile 3: Infra & OSS */}
					<BentoCard
						name="Infra & OSS"
						className="md:col-span-1"
						description="プライベートネットワーク上で多様なOSSをセルフホスト運用"
						header={
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
								Self-Hosted
							</div>
						}
					/>

					{/* Bento Tile 4: Bio Wide Tile */}
					<BentoCard name="" className="md:col-span-3">
						<div className="flex flex-col md:flex-row gap-8 items-start justify-between">
							<div className="space-y-3 max-w-xl">
								<h3 className="text-base sm:text-lg font-bold tracking-tight text-ink">
									Story
								</h3>
								<p className="text-xs sm:text-sm leading-relaxed text-ink-2">
									アイデアをコードで形にすることが好きです。TypeScriptやPythonを用いたWebアプリ開発をはじめ、セルフホストやWebサービスの仕組みを根本から理解したものづくりを大切にしています。
								</p>
								<p className="text-xs sm:text-sm leading-relaxed text-ink-2">
									将来はソフトウェアエンジニアとして、使う人の役に立ち、日々の課題を軽やかに解決するプロダクトを創り出したいと考えています。
								</p>
							</div>

							<div className="w-full md:w-56 shrink-0 rounded-2xl border border-rule bg-paper p-4">
								<ul className="flex flex-col gap-2.5 text-xs">
									<li className="flex justify-between border-b border-rule pb-1.5">
										<span className="text-muted">Status</span>
										<span className="font-medium text-ink">
											University Student
										</span>
									</li>
									<li className="flex justify-between border-b border-rule pb-1.5">
										<span className="text-muted">Location</span>
										<span className="font-medium text-ink">Saitama, Japan</span>
									</li>
									<li className="flex justify-between">
										<span className="text-muted">Role</span>
										<span className="font-medium text-accent">
											Student Developer
										</span>
									</li>
								</ul>
							</div>
						</div>
					</BentoCard>
				</BentoGrid>
			</motion.section>
		</div>
	);
}
