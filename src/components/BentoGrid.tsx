import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import SpotlightCard from './SpotlightCard';

export interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
	children: ReactNode;
	className?: string;
}

export interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
	name: string;
	className?: string;
	background?: ReactNode;
	Icon?: ElementType;
	header?: ReactNode;
	description?: string;
	href?: string;
	cta?: string;
	footer?: ReactNode;
	children?: ReactNode;
}

export const BentoGrid = ({
	children,
	className = '',
	...props
}: BentoGridProps) => {
	return (
		<div
			className={`grid w-full grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const BentoCard = ({
	name,
	className = '',
	background,
	Icon,
	header,
	description,
	href,
	cta,
	footer,
	children,
	...props
}: BentoCardProps) => {
	const hasReveal = Boolean(cta && href) || Boolean(footer);

	return (
		<SpotlightCard
			className={`group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl border border-rule bg-paper-2 shadow-bento transform-gpu ${className}`}
			{...props}
		>
			{background && (
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					{background}
				</div>
			)}

			<div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
				<div
					className={`flex transform-gpu flex-col gap-2 transition-transform duration-300 ${
						hasReveal ? 'lg:group-hover:-translate-y-6' : ''
					}`}
				>
					{Icon && (
						<Icon className="h-8 w-8 origin-left transform-gpu text-accent transition-transform duration-300 ease-in-out group-hover:scale-90" />
					)}
					{header}
					{name && (
						<h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink">
							{name}
						</h3>
					)}
					{description && (
						<p className="max-w-lg text-xs sm:text-sm leading-relaxed text-ink-2">
							{description}
						</p>
					)}
					{children}
				</div>

				{hasReveal && (
					<div className="mt-4 flex w-full transform-gpu flex-row items-center justify-between gap-3 pt-2 transition-opacity duration-300 lg:translate-y-2 lg:opacity-85 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
						{footer}
						{cta && href && (
							<a
								href={href}
								target={href.startsWith('http') ? '_blank' : undefined}
								rel={
									href.startsWith('http') ? 'noopener noreferrer' : undefined
								}
								className="pointer-events-auto inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-ink transition-colors"
							>
								<span>{cta}</span>
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
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</a>
						)}
					</div>
				)}
			</div>

			<div className="pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300 group-hover:bg-paper-3/30" />
		</SpotlightCard>
	);
};
