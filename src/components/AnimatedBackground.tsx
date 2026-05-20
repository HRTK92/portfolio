import { motion } from 'motion/react';

export default function AnimatedBackground() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">
			<motion.div
				animate={{
					x: [0, 100, 0],
					y: [0, -50, 0],
					scale: [1, 1.2, 1],
				}}
				transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
				className="absolute top-[10%] left-[20%] h-[40vw] w-[40vw] rounded-full bg-blue-200/40 mix-blend-multiply blur-[100px]"
			/>
			<motion.div
				animate={{
					x: [0, -100, 0],
					y: [0, 100, 0],
					scale: [1, 1.5, 1],
				}}
				transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
				className="absolute top-[40%] right-[10%] h-[35vw] w-[35vw] rounded-full bg-purple-200/40 mix-blend-multiply blur-[100px]"
			/>
			<motion.div
				animate={{
					x: [0, 50, 0],
					y: [0, 120, 0],
					scale: [1, 1.1, 1],
				}}
				transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
				className="absolute bottom-[-10%] left-[30%] h-[45vw] w-[45vw] rounded-full bg-teal-200/40 mix-blend-multiply blur-[100px]"
			/>
		</div>
	);
}
