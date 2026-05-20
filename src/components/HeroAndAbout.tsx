import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	type Variants,
} from 'motion/react';
import { useRef } from 'react';

export default function HeroAndAbout() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 65,
		damping: 22,
		restDelta: 0.001,
	});

	const heroOpacity = useTransform(smoothProgress, [0, 0.3, 0.45], [1, 1, 0]);
	const aboutOpacity = useTransform(smoothProgress, [0.35, 0.5, 1], [0, 1, 1]);

	const aboutYOffset = useTransform(smoothProgress, [0.35, 0.5], [25, 0]);

	const heroPointerEvents = useTransform(smoothProgress, (v) =>
		v > 0.4 ? 'none' : 'auto',
	);
	const aboutPointerEvents = useTransform(smoothProgress, (v) =>
		v < 0.4 ? 'none' : 'auto',
	);

	const introContainer: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.12,
				delayChildren: 0.1,
			},
		},
	};

	const introItem: Variants = {
		hidden: { opacity: 0, y: 25 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
		},
	};

	const scrollToAbout = () => {
		if (containerRef.current) {
			const totalHeight = containerRef.current.clientHeight;
			window.scrollTo({
				top: containerRef.current.offsetTop + totalHeight * 0.4,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div ref={containerRef} className="relative h-[220vh] w-full">
			<div className="sticky top-0 flex h-screen w-full items-center justify-center px-4 sm:px-6">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					className="relative w-full max-w-4xl h-145 sm:h-130 md:h-112.5 rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] backdrop-blur-2xl overflow-hidden"
				>
					<motion.div
						style={{ opacity: heroOpacity, pointerEvents: heroPointerEvents }}
						initial="hidden"
						animate="visible"
						variants={introContainer}
						className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-6 md:space-y-8"
					>
						<motion.div
							variants={introItem}
							className="h-24 w-24 md:h-28 md:w-28 rounded-full border-4 border-white/80 bg-linear-to-tr from-blue-50 to-purple-50 shadow-xl shrink-0"
						>
							<img
								src="https://api.dicebear.com/7.x/notionists/svg?seed=portfolio"
								alt="Avatar"
								className="h-full w-full rounded-full object-cover p-2"
							/>
						</motion.div>

						<motion.div variants={introItem} className="space-y-4">
							<h1 className="text-3xl font-bold tracking-tight text-slate-800 md:text-5xl">
								Hi, I'm a{' '}
								<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
									Creator
								</span>
							</h1>
							<p className="mx-auto max-w-md text-sm md:text-base leading-relaxed text-slate-600">
								OSS lover. Learner. Builder.
							</p>
						</motion.div>

						<motion.button
							variants={introItem}
							onClick={scrollToAbout}
							className="cursor-pointer inline-flex items-center justify-center rounded-full bg-white/80 px-6 py-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-white hover:scale-105 active:scale-95"
						>
							View My Work
						</motion.button>
					</motion.div>

					<motion.div
						style={{
							opacity: aboutOpacity,
							y: aboutYOffset,
							pointerEvents: aboutPointerEvents,
						}}
						className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 gap-6 md:gap-8"
					>
						<div className="flex flex-col gap-1">
							<span className="text-xs font-bold uppercase tracking-wildest text-blue-500">
								About
							</span>
							<h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-4xl">
								A bit about me.
							</h2>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-10 items-center">
							<div className="md:col-span-2">
								<ul className="flex flex-col gap-3 text-slate-700 text-xs md:text-sm">
									<li className="flex flex-col border-b border-slate-200/40 pb-2">
										<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
											Name
										</span>
										<span className="mt-0.5 font-medium">Takuho</span>
									</li>
									<li className="flex flex-col border-b border-slate-200/40 pb-2">
										<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
											Status
										</span>
										<span className="mt-0.5 font-medium">
											University Student
										</span>
									</li>
									<li className="flex flex-col border-b border-slate-200/40 pb-2">
										<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
											Location
										</span>
										<span className="mt-0.5 font-medium">Saitama, Japan</span>
									</li>
								</ul>
							</div>

							<div className="md:col-span-3 flex flex-col gap-3 text-xs md:text-sm leading-relaxed text-slate-600">
								<p>
									中学生でプログラミングに出会い、Webアプリやツール開発にはまっています。コードを書くことで、アイデアを形にできる楽しさを感じています。
								</p>
								<p>
									TypeScript や Python
									を中心に学んでいます。セルフホストや、Webサービスの仕組みを理解するのが好きです。
								</p>
								<p>
									将来はソフトウェアエンジニアとして、使う人の役に立つプロダクトを作りたいと考えています。
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
