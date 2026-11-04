export interface ProjectItem {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	links: {
		github?: string;
		demo?: string;
	};
}

export const projectsData: ProjectItem[] = [
	{
		slug: 'kyudo',
		title: 'kyudo',
		description:
			'部活動の練習データや的中率をリアルタイムに集計・可視化する管理プラットフォーム。エッジ構成への移行により高速性と運用コストゼロ化を実現。',
		tags: [
			'Next.js',
			'TypeScript',
			'Drizzle ORM',
			'Better Auth',
			'Cloudflare D1 / Workers',
			'Tailwind CSS',
		],
		links: {
			github: 'https://github.com/HRTK92/kyudo-app',
			demo: 'https://kyudo.works.hrtk92.dev',
		},
	},
	{
		slug: 'py-mcws',
		title: 'py-mcws',
		description:
			'MinecraftサーバーのWebSocket ServerをPythonで実装するライブラリ。非同期通信によるリアルタイム連携と直感的なイベント駆動設計を提供。',
		tags: ['Python', 'Minecraft', 'WebSocket'],
		links: {
			github: 'https://github.com/HRTK92/py-mcws',
		},
	},
];
