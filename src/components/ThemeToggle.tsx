import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const isDark = document.documentElement.classList.contains('dark');
		setTheme(isDark ? 'dark' : 'light');
	}, []);

	const toggleTheme = () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(nextTheme);

		if (nextTheme === 'dark') {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	if (!mounted) {
		return <div className="h-9 w-9 rounded-full" />;
	}

	return (
		<motion.button
			onClick={toggleTheme}
			whileHover={{ scale: 1.08 }}
			whileTap={{ scale: 0.92 }}
			className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:hover:bg-slate-700"
			aria-label="Toggle theme"
		>
			{theme === 'dark' ? (
				<motion.svg
					key="moon"
					initial={{ rotate: -90, opacity: 0 }}
					animate={{ rotate: 0, opacity: 1 }}
					exit={{ rotate: 90, opacity: 0 }}
					transition={{ duration: 0.2 }}
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-amber-400"
				>
					<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
				</motion.svg>
			) : (
				<motion.svg
					key="sun"
					initial={{ rotate: 90, opacity: 0 }}
					animate={{ rotate: 0, opacity: 1 }}
					exit={{ rotate: -90, opacity: 0 }}
					transition={{ duration: 0.2 }}
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-amber-500"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="m4.93 4.93 1.41 1.41" />
					<path d="m17.66 17.66 1.41 1.41" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="m6.34 17.66-1.41 1.41" />
					<path d="m19.07 4.93-1.41 1.41" />
				</motion.svg>
			)}
		</motion.button>
	);
}
