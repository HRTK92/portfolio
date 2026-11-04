import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

export default function TerminalIntro() {
	const [isVisible, setIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isReady, setIsReady] = useState(false);

	const finishIntro = useCallback(() => {
		setIsVisible(false);
		document.body.style.overflow = '';
	}, []);

	// Escapeキーでのスキップ機能
	useEffect(() => {
		if (!isVisible) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				finishIntro();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isVisible, finishIntro]);

	useEffect(() => {
		if (sessionStorage.getItem('visited')) {
			return;
		}

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			sessionStorage.setItem('visited', 'true');
			return;
		}

		setIsVisible(true);
		sessionStorage.setItem('visited', 'true');
		document.body.style.overflow = 'hidden';

		const timers: ReturnType<typeof setTimeout>[] = [];
		let current = 0;
		const progressInterval = setInterval(() => {
			current += Math.floor(Math.random() * 6) + 3;
			if (current >= 99) {
				current = 99;
				setProgress(99);
				clearInterval(progressInterval);

				const timerReady = setTimeout(() => {
					setIsReady(true);
				}, 150);
				timers.push(timerReady);

				const timerFinish = setTimeout(() => {
					finishIntro();
				}, 1000);
				timers.push(timerFinish);
			} else {
				setProgress(current);
			}
		}, 40);

		return () => {
			clearInterval(progressInterval);
			for (const t of timers) {
				clearTimeout(t);
			}
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
						transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
					}}
					className="fixed inset-0 z-100 flex items-center justify-center bg-paper/95 px-4"
				>
					{/* Skip button in top right */}
					<button
						type="button"
						onClick={finishIntro}
						className="absolute top-6 right-6 cursor-pointer rounded-full border border-rule bg-paper-2 px-3.5 py-1 text-xs font-medium text-muted hover:text-ink hover:bg-paper-3 shadow-xs transition-colors"
					>
						Skip (Esc)
					</button>

					{/* Terminal Window */}
					<motion.div
						initial={{ opacity: 0, y: 15, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
						className="relative w-full max-w-lg rounded-3xl border border-rule bg-paper-2 p-5 sm:p-7 shadow-float text-xs sm:text-sm overflow-hidden"
					>
						{/* Window Header */}
						<div className="relative flex items-center justify-between border-b border-rule pb-3.5 mb-4">
							<div className="flex items-center gap-1.5">
								<span className="h-2.5 w-2.5 rounded-full bg-rule-2" />
								<span className="h-2.5 w-2.5 rounded-full bg-rule-2" />
								<span className="h-2.5 w-2.5 rounded-full bg-rule-2" />
							</div>
							<code className="text-xs text-muted font-mono">
								takuho@portfolio: ~
							</code>
							<div className="w-10" />
						</div>

						{/* Terminal Output (Real CLI Text Format) */}
						<div className="relative flex flex-col gap-2 min-h-32 font-mono text-xs leading-relaxed">
							<div className="text-ink flex items-center gap-2">
								<span className="text-accent font-bold">❯</span>
								<code>git clone https://github.com/HRTK92/portfolio.git</code>
							</div>

							<div className="text-muted pl-4 space-y-1">
								<div>Cloning into &lsquo;portfolio&rsquo;…</div>
								<div>remote: Enumerating objects: 128, done.</div>
								<div>remote: Counting objects: 100% (128/128), done.</div>
								<div className="text-ink-2 font-medium">
									Receiving objects:{' '}
									<span className="text-accent font-bold tabular-nums">
										{progress}%
									</span>{' '}
									({currentObjects}/128), {currentKb} KiB | 2.14 MiB/s
								</div>
							</div>

							{isReady && (
								<motion.div
									initial={{ opacity: 0, x: -3 }}
									animate={{ opacity: 1, x: 0 }}
									className="text-success pl-4 font-medium flex items-center gap-1.5 pt-0.5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<path d="M20 6 9 17l-5-5" />
									</svg>
									<span>me.hrtk92.dev is ready. Welcome!</span>
								</motion.div>
							)}

							<div className="flex items-center gap-2 mt-1">
								<span className="text-accent font-bold">❯</span>
								<span className="inline-block h-3.5 w-1.5 rounded-xs bg-muted animate-pulse" />
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
