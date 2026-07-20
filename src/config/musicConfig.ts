import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "tencent",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "9519426284",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		playlist: [
			{
				name: "使一颗心免于哀伤",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/使一颗心免于哀伤-哼唱.mp3",
				cover: "/assets/music/cover/109951169585655912.webp",
				lrc: "",
			},
			{
				name: "4day",
				artist: "",
				url: "/assets/music/4day.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "Gotta Have You",
				artist: "The Weepies",
				url: "/assets/music/gotta have you.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "Lost",
				artist: "",
				url: "/assets/music/lost.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "一直很安静",
				artist: "阿桑",
				url: "/assets/music/一直很安静-1.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "万众瞩目",
				artist: "",
				url: "/assets/music/万众瞩目.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "你听得到",
				artist: "周杰伦",
				url: "/assets/music/你听得到.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "半岛铁盒",
				artist: "周杰伦",
				url: "/assets/music/半岛铁盒.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "园游会",
				artist: "周杰伦",
				url: "/assets/music/园游会.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "开不了口",
				artist: "周杰伦",
				url: "/assets/music/开不了口.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "恶作剧",
				artist: "王蓝茵",
				url: "/assets/music/恶作剧.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "情歌",
				artist: "梁静茹",
				url: "/assets/music/情歌.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "我知道你",
				artist: "",
				url: "/assets/music/我知道你.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "手写的从前",
				artist: "周杰伦",
				url: "/assets/music/手写的从前.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "文爱",
				artist: "",
				url: "/assets/music/文爱.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "晴天",
				artist: "周杰伦",
				url: "/assets/music/晴天.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "暗号",
				artist: "周杰伦",
				url: "/assets/music/暗号.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "没有如果",
				artist: "梁静茹",
				url: "/assets/music/没有如果.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "爱你没差",
				artist: "周杰伦",
				url: "/assets/music/爱你没差.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
			{
				name: "轨迹",
				artist: "周杰伦",
				url: "/assets/music/轨迹.mp3",
				cover: "/assets/music/cover/fengmian.webp",
				lrc: "",
			},
		],
	},
};
