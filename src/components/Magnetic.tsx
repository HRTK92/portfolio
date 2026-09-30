import { motion } from 'motion/react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface MagneticProps {
	children: React.ReactNode;
	className?: string;
	strength?: number; // 弾性の強さ
}

export default function Magnetic({
	children,
	className = '',
	strength = 0.35,
}: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isTouchDevice || !ref.current) return;
		const { clientX, clientY } = e;
		const { left, top, width, height } = ref.current.getBoundingClientRect();
		const middleX = clientX - (left + width / 2);
		const middleY = clientY - (top + height / 2);
		setPosition({ x: middleX * strength, y: middleY * strength });
	};

	const handleMouseLeave = () => {
		if (isTouchDevice) return;
		setPosition({ x: 0, y: 0 });
	};

	if (isTouchDevice) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			animate={{ x: position.x, y: position.y }}
			transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
