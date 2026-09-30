export interface ProjectItem {
	slug: string;
	title: string;
	description: string;
	longDescription?: string;
	tags: string[];
	features?: string[];
	architecture?: string[];
	links: {
		github?: string;
		demo?: string;
	};
}

export const projectsData: ProjectItem[] = [
	{
		slug: 'kyudo-dashboard',
		title: 'Kyudo Dashboard',
		description:
			'部活動の練習データや的中率をリアルタイムに集計・可視化する管理プラットフォーム。エッジ構成への移行により高速性と運用コストゼロ化を実現。',
		longDescription:
			'弓道部の日々の練習データ（立ごとの的中率、矢の本数、出欠）をリアルタイムに集計・可視化するWebプラットフォームです。部員ごとの期間推移や成長曲線を直感的に把握できるダッシュボードに加え、練習現場のスマートフォンから素早く入力できる快適なUIを提供。インフラはCloudflare D1 / Workersを中心としたエッジ分散構成へフルマイグレーションし、ミリ秒単位の応答性能と高可用性、運用コストゼロ化を両立しています。',
		tags: [
			'Next.js',
			'TypeScript',
			'Drizzle ORM',
			'Better Auth',
			'Cloudflare D1 / Workers',
			'Tailwind CSS',
		],
		features: [
			'部員ごとのマイページ提供（個人の的中推移・練習記録・成長データの可視化）',
			'カレンダー形式での練習日程・試合スケジュールの閲覧・管理',
			'立・期間ごとの的中率リアルタイム自動集計 & インタラクティブ推移グラフ',
			'練習記録・成績データのPDFレポート自動生成・出力機能',
			'スマートフォン操作に特化したモバイル最適化インプットUI',
			'管理者専用管理ポータル（部員管理、練習日程管理）',
		],
		architecture: [
			'Frontend: Next.js (App Router), Tailwind CSS',
			'Auth: Better Auth (セキュアなセッション管理)',
			'ORM / Database: Drizzle ORM, Cloudflare D1 (SQLite at the edge)',
			'Runtime: Cloudflare Workers',
			'Deployment: Cloudflare Workers / Workers CI/CD',
		],
		links: {
			github: 'https://github.com/HRTK92/kyudo-app',
		},
	},
	{
		slug: 'py-mcws',
		title: 'py-mcws',
		description:
			'MinecraftサーバーのWebSocket ServerをPythonで実装するライブラリ。非同期通信によるリアルタイム連携と直感的なイベント駆動設計を提供。',
		longDescription:
			'Minecraft Bedrock Edition（統合版）や各種サーバーの WebSocket コマンドAPIと直接対話するための Python 非同期クライアント・サーバーライブラリです。ゲーム内イベント（ブロック破壊、プレイヤー移動、チャット、天候変化）をイベント駆動型で購読し、Pythonスクリプトから即座にゲーム世界へコマンドをインジェクションできます。教育用途や自動化ツール開発において高い開発生産性を発揮します。',
		tags: ['Python', 'Minecraft', 'WebSocket'],
		features: [
			'Python asyncio をフル活用した高パフォーマンス・ノンブロッキング通信',
			'直感的なデコレータベースのイベントリスナー（@client.on_event）',
			'Minecraft コマンドの型安全なビルダーとレスポンスパーサー',
			'Poetry による依存関係管理と完全な型ヒントサポート',
		],
		architecture: [
			'Language: Python 3.10+',
			'Async Engine: asyncio, websockets',
			'Package Manager: Poetry',
			'Distribution: PyPI',
		],
		links: {
			github: 'https://github.com/HRTK92/py-mcws',
		},
	},
];
