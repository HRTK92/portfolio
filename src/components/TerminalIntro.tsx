import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

export default function TerminalIntro() {
	const [isVisible, setIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isReady, setIsReady] = useState(false);

	const finishIntro = useCallback(() => {
		sessionStorage.setItem('visited_intro', 'true');
		setIsVisible(false);
		document.body.style.overflow = '';
	}, []);

	useEffect(() => {
		// 初回来訪時のみ再生（セッション中1回）
		const hasVisited = sessionStorage.getItem('visited_intro');
		if (hasVisited) {
			return;
		}

		setIsVisible(true);
		document.body.style.overflow = 'hidden';

		// 0% から 99% までCLIのgit clone風にカウントアップ
		let current = 0;
		const progressInterval = setInterval(() => {
			current += Math.floor(Math.random() * 6) + 3;
			if (current >= 99) {
				current = 99;
				setProgress(99);
				clearInterval(progressInterval);

				setTimeout(() => {
					setIsReady(true);
				}, 150);

				setTimeout(() => {
					finishIntro();
				}, 1000);
			} else {
				setProgress(current);
			}
		}, 40);

		return () => {
			clearInterval(progressInterval);
			document.body.style.overflow = '';
		};
	}, [finishIntro]);

	// 受信オブジェクト数をパーセンテージから算出 (全128個)
	const currentObjects = Math.min(128, Math.floor((128 * progress) / 100));
	const currentKb = Math.min(842, Math.floor((842 * progress) / 100));

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{
						opacity: 0,
						scale: 1.02,
						filter: 'blur(8px)',
						transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
					}}
					className="fixed inset-0 z-100 flex items-center justify-center bg-slate-50/70 dark:bg-slate-950/80 backdrop-blur-2xl px-4"
				>
					{/* Skip button in top right */}
					<button
						type="button"
						onClick={finishIntro}
						className="absolute top-6 right-6 cursor-pointer rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 px-3.5 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 shadow-xs backdrop-blur-md transition-all font-mono"
					>
						[Skip ESC]
					</button>

					{/* Terminal Window (White & Warm Aesthetic) */}
					<motion.div
						initial={{ opacity: 0, y: 15, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
						className="relative w-full max-w-lg rounded-3xl border border-white/80 dark:border-white/15 bg-white/90 dark:bg-slate-900/85 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl text-xs sm:text-sm overflow-hidden"
					>
						{/* Ambient soft glow on top */}
						<div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-gradient-to-r from-blue-200/40 via-purple-200/30 to-rose-200/30 blur-2xl" />

						{/* Window Header */}
						<div className="relative flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3.5 mb-4">
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-rose-400/80 border border-rose-500/20" />
								<div className="h-3 w-3 rounded-full bg-amber-400/80 border border-amber-500/20" />
								<div className="h-3 w-3 rounded-full bg-emerald-400/80 border border-emerald-500/20" />
							</div>
							<div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-400 font-medium font-mono">
								<span>takuho@portfolio: ~</span>
							</div>
							<div className="w-12" />
						</div>

						{/* Terminal Output (Real CLI Text Format) */}
						<div className="relative flex flex-col gap-2 min-h-32 font-mono text-xs sm:text-xs leading-relaxed">
							<div className="text-slate-700 dark:text-slate-200 flex items-center gap-2">
								<span className="text-blue-500 font-bold">❯</span>
								<span>git clone https://github.com/HRTK92/portfolio.git</span>
							</div>

							<div className="text-slate-500 dark:text-slate-400 pl-4 space-y-1">
								<div>Cloning into 'portfolio'...</div>
								<div>remote: Enumerating objects: 128, done.</div>
								<div>remote: Counting objects: 100% (128/128), done.</div>
								<div className="text-slate-700 dark:text-slate-300 font-medium">
									Receiving objects:{' '}
									<span className="text-blue-600 dark:text-blue-400 font-bold tabular-nums">
										{progress}%
									</span>{' '}
									({currentObjects}/128), {currentKb} KiB | 2.14 MiB/s
								</div>
							</div>

							{isReady && (
								<motion.div
									initial={{ opacity: 0, x: -3 }}
									animate={{ opacity: 1, x: 0 }}
									className="text-emerald-600 dark:text-emerald-400 pl-4 font-medium flex items-center gap-1.5 pt-0.5"
								>
									<span>✔</span>
									<span>me.hrtk92.dev is ready. Welcome!</span>
								</motion.div>
							)}

							<div className="flex items-center gap-2 mt-1">
								<span className="text-purple-400 font-bold">❯</span>
								<span className="inline-block h-3.5 w-1.5 rounded-xs bg-slate-400 dark:bg-slate-300 animate-pulse" />
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
