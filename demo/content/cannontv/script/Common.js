var game = g.game;

//サウンド管理
var sound_flg = false;

//BGM再生管理
var bgm_flg = false;

//IE判別フラグ
var ie_flg = false;

//カメラ座標
var camera_posx = 0;
var camera_posy = 0;

//プレイヤー情報
var ply_tagno = -1;


//------------------
//定数
//------------------
module.exports = {
	////定数関係////
	// 実背景サイズ
	BG_WIDTH			: 970*9,
	BG_HEIGHT			: 1500+250*11,
	// 表示画面サイズ
	SCREEN_WIDTH		: 970,
	SCREEN_HEIGHT		: 250,


	//
	//画像番号
	//
	IMG_MAP				: "bg_stage_all",
	IMG_UI				: "ui_sheet",
	IMG_BALLOON			: "balloon",
	IMG_BG_STAGESTAR	: "bg_stage_star",
	IMG_ANIM_CLEAR_L	: "clear_anime_l",
	IMG_ANIM_CLEAR_R	: "clear_anime_r",
	IMG_ANIM_MISS		: "miss",
	IMG_BG_ANIM			: "bg_anime",
	IMG_ANIM_LOGO		: "clear_anime_logo",

	//
	//サウンド番号
	//
	SND_BGM_1			: "bgm_01",
	SND_JIN_1			: "jin_01",
	SND_JIN_2			: "jin_02",
	SND_SE_1			: "se_01",
	SND_SE_2			: "se_02",
	SND_SE_3			: "se_03",
	SND_SE_4			: "se_04",
	SND_SE_5			: "se_05",
	SND_SE_6			: "se_06",
	SND_SE_7			: "se_07",


	//
	//スプライトテーブル番号
	//
	TBL_UI				: 0,
	TBL_OBJ				: 1,
	TBL_EFF				: 2,
	TBL_TUTO			: 3,
	TBL_RSLT			: 4,
	TBL_CLR				: 5,
	TBL_MISS			: 6,


	//
	//スプライト定数関係
	//
	//UI関係
	UI_CANNONTV			: 0,
	UI_CANNON			: 1,
	UI_CANNONBASE		: 2,
	UI_CHARA_TV			: 3,

	UI_LINE_W			: 4,
	UI_LINE_H			: 5,

	UI_BARIKI_BASE		: 6,
	UI_POWER_BASE		: 7,
	UI_GAGE_BASE		: 8,
	UI_GAGE_FRAME		: 9,
	UI_BTN_BARIKI_ON	: 10,
	UI_BTN_BARIKI_OFF	: 11,
	UI_NUM_BARIKI		: 12,

	UI_UIBASE_TELOP		: 13,
	UI_UIBASE_POS		: 14,
	UI_CURSOR_POS		: 15,
	UI_TITLE			: 16,
	UI_BTN_START		: 17,
	UI_GAMEOVER			: 18,
	UI_BTN_RESTART		: 19,
	UI_BANNER			: 20,
	UI_DEMO_ICON		: 21,
	UI_DEMO_TEXT		: 22,

	UI_BTN_SOUND_ON		: 23,
	UI_BTN_SOUND_OFF	: 24,
	UI_BTN_HELP			: 25,

	UI_COUNTDOWN_0		: 26,
	UI_COUNTDOWN_1		: 27,
	UI_COUNTDOWN_2		: 28,
	UI_COUNTDOWN_3		: 29,

	UI_TELOP_1			: 30,
	UI_TELOP_2			: 31,
	UI_TELOP_3			: 32,
	UI_TELOP_4			: 33,
	UI_TELOP_5			: 34,
	UI_TELOP_6			: 35,
	UI_TELOP_TAG1_1		: 36,
	UI_TELOP_TAG1_2		: 37,
	UI_TELOP_TAG2_1		: 38,
	UI_TELOP_TAG2_2		: 39,
	UI_TELOP_TAG3		: 40,
	UI_TELOP_TAG4		: 41,

	UI_UIBASE_TELOP_2	: 42,

	UI_TAGICON_6		: 43,
	UI_TAGICON_1		: 44,
	UI_TAGICON_2		: 45,
	UI_TAGICON_3		: 46,

	UI_LOGO_IX			: 47,


	//オブジェクト関係
	OBJ_CLOUD_B			: 0,
	OBJ_CLOUD_S			: 1,

	OBJ_COMENT_1		: 2,
	OBJ_COMENT_2		: 3,
	OBJ_COMENT_3		: 4,
	OBJ_COMENT_4		: 5,
	OBJ_COMENT_5		: 6,
	OBJ_COMENT_6		: 7,
	OBJ_COMENT_7		: 8,
	OBJ_COMENT_8		: 9,
	OBJ_COMENT_9		: 10,
	OBJ_COMENT_10		: 11,

	OBJ_TAG_1			: 12,
	OBJ_TAG_2			: 13,
	OBJ_TAG_3			: 14,
	OBJ_TAG_4			: 15,


	//エフェクト関係
	EFF_FIRE_S			: 0,
	EFF_FIRE_B			: 1,
	EFF_BARIKI_S		: 2,
	EFF_BARIKI_B		: 3,
	EFF_HIT				: 4,
	EFF_CDUST_S			: 5,
	EFF_CDUST_B			: 6,
	EFF_WATER_1			: 7,
	EFF_WATER_2			: 8,
	EFF_WATER_3			: 9,
	EFF_WATER_4			: 10,
	EFF_WATER_5			: 11,
	EFF_SPARK_1			: 12,
	EFF_SPARK_2			: 13,


	//チュートリアル関係
	TUTO_ARW_P			: 0,
	TUTO_ARW_A			: 1,
	TUTO_ARW			: 2,
	TUTO_HELP_P1		: 3,
	TUTO_HELP_P2		: 4,
	TUTO_BTN_CLOSE		: 5,
	TUTO_BTN_NEXT		: 6,
	TUTO_BTN_PREV		: 7,
	TUTO_BTN_GAMESTART	: 8,
	TUTO_TV_1_1			: 9,
	TUTO_TV_1_2			: 10,
	TUTO_TV_2_1			: 11,
	TUTO_TV_2_2			: 12,
	TUTO_TV_3_1			: 13,
	TUTO_TV_3_2			: 14,


	//リザルト関係
	RESULT_BASE			: 0,
	RESULT_BANNER_TEXT	: 1,
	RESULT_BTN_BOOTH	: 2,
	RESULT_BTN_RETRY	: 3,
	RESULT_BTN_REDO		: 4,
	RESULT_BTN_MOVE		: 5,
	RESULT_BTN_BACK		: 6,
	RESULT_WIN_ACHIEV	: 7,
	RESULT_WIN_RESULT	: 8,
	RESULT_MARK_BASE	: 9,
	RESULT_MARK_1		: 10,
	RESULT_MARK_2		: 11,
	RESULT_MARK_3		: 12,
	RESULT_RANK_BASE	: 13,
	RESULT_RANK_SS		: 14,
	RESULT_RANK_S		: 15,
	RESULT_RANK_A		: 16,
	RESULT_RANK_B		: 17,
	RESULT_RANK_C		: 18,
	RESULT_RANK_D		: 19,
	RESULT_RANK_E		: 20,
	RESULT_RANK_F		: 21,

	//当たり演出関係
	CLEAR_LOGO_0		: 0,
	CLEAR_LOGO_1		: 1,

	//ハズレ演出関係
	MISS_STAR_BG		: 0,	// 星になるBG
	MISS_STAR_TEXT1		: 1,	// テレビちゃんよ
	MISS_STAR_TEXT2		: 2,	// 永遠に
	MISS_STAR_EFF		: 3,	// キラキラ
	MISS_STAR_TV		: 4,	// 星座テレビちゃん
	MISS_YOKOKU_WINDOW	: 5,	// シネスコ枠
	MISS_YOKOKU_TEXT1	: 6,	// どうなるテレビちゃん!?
	MISS_YOKOKU_TEXT2	: 7,	// 次回
	MISS_SHIP			: 8,	// ニコ生クルーズ
	MISS_HOLE			: 9,	// 土管
	MISS_CLOUD			: 10,	// 孔明の罠
	MISS_SHIP_ANIM		: 11,	// ニコ生クルーズ-演出用
	MISS_SHIP_EFF_1		: 12,	// 水しぶき1
	MISS_SHIP_EFF_2		: 13,	// 水しぶき2
	MISS_SHIP_BG		: 14,	// ニコ生クルーズ用背景
	MISS_HOLE_BG		: 15,	// 土管用背景


	//マップ配置オブジェクト識別ID
	MAP_CLOUD			: 100,		// 雲
	MAP_COMMENT			: 1000,		// コメント弾幕
	MAP_TAGU			: 2000,		// タグ
	MAP_MISS_SHIP		: 3000,		// ニコ生クルーズ
	MAP_MISS_KOUMEI		: 4000,		// 孔明の罠
	MAP_MISS_HOLE		: 5000,		// 土管
	MAP_BG_ANIM			: 6000,		// BGアニメーション

	MAP_OBJ_MAX			: 7000,		// オブジェ最大値


	//タグID
	TAG_ID_1			: 0,		// うなぎのぼり
	TAG_ID_2			: 1,		// ゆっくり
	TAG_ID_3			: 2,		// 下降
	TAG_ID_4			: 3,		// 無敵

};

//画像/サウンドリソース一覧
const assetFileName = [
	"bg_stage_all",
	"ui_sheet",
	"balloon",
	"bg_stage_star",
	"clear_anime_l",
	"clear_anime_r",
	"miss",
	"bg_anime",
	"clear_anime_logo",

	"bgm_01",
	"jin_01",
	"jin_02",
	"se_01",
	"se_02",
	"se_03",
	"se_04",
	"se_05",
	"se_06",
	"se_07",
];

//遷移URL
const jumpURLList = [
	"http://chokaigi.jp/2018/booth/cho_ongakusai.html?from=playad",			// - 0:(超音楽祭)
	"http://chokaigi.jp/2018/booth/cho_kabuki.html?from=playad",			// - 1:(超歌舞伎)
	"http://chokaigi.jp/2018/booth/cho_gamearea.html?from=playad",			// - 2:(超ゲームエリア)
	"http://chokaigi.jp/2018/booth/cho_igo_shogi.html?from=playad",			// - 3:(超囲碁・将棋)
	"http://chokaigi.jp/2018/booth/cho_ryori.html?from=playad",				// - 4: (超料理)
	"http://chokaigi.jp/2018/booth/cho_vocaloid.html?from=playad",			// - 5:(超ボーカロイドエリア)
	"http://chokaigi.jp/2018/booth/cho_odottemita.html?from=playad",		// - 6:(超踊ってみた)
	"http://chokaigi.jp/2018/booth/cho_marunagehiroba2018.html?from=playad",// - 7:(超まるなげひろば)
	"http://chokaigi.jp/2018/booth/cho_cosplayarea.html?from=playad",		// - 8:(超コスプレ)
	"http://chokaigi.jp/2018/booth/cho_anime.html?from=playad",				// - 9:(超アニメエリア)
	"http://chokaigi.jp/?from=playad"										// - 10:公式サイトTOP
];


//UIテーブル
const uiSpriteData = [

	[   0,   0,  256,  256 ],	//00:大砲/テレビちゃん (X=0,Y=0)-(X=256,Y=256)
	[ 257,   0,  513,  256 ],	//01:大砲 (X=257,Y=0)-(X=513,Y=256)
	[ 514,   0,  770,  256 ],	//02:台座 (X=514,Y=0)-(X=770,Y=256)
	[ 771, 132,  819,  180 ],	//03:テレビちゃん (X=771,Y=132)-(X=819,Y=180)

	[   0, 257,  970,  260 ],	//04:UI枠線_横ライン (X=0,Y=257)-(X=970,Y=260)
	[ 986,   0,  989,  250 ],	//05:UI枠線_縦ライン (X=986,Y=0)-(X=989,Y=250)

	[   0, 261,  114,  461 ],	//06:馬力ゲージ_ベース (X=0,Y=261)-(X=114,Y=461)
	[ 115, 261,  229,  461 ],	//07:パワーゲージ_ベース (X=115,Y=261)-(X=229,Y=461)

	[ 230, 261,  278,  399 ],	//08:ゲージ_共通 (X=230,Y=261)-(X=278,Y=399)
	[ 279, 261,  327,  399 ],	//09:枠_共通 (X=279,Y=261)-(X=327,Y=399)

	[ 283, 400,  335,  452 ],	//10:馬力ボタン_on (X=283,Y=400)-(X=335,Y=452)
	[ 230, 400,  282,  452 ],	//11:馬力ボタン_off (X=230,Y=453)-(X=282,Y=475)
	[ 230, 453,  246,  475 ],	//12:馬力回数 (X=230,Y=453)-(X=326,Y=475)

	[ 602, 455,  932,  495 ],	//13:テロップ (X=602,Y=455)-(X=932,Y=495)
	[ 602, 496, 1002,  566 ],	//14:現在地メーター (X=602,Y=496)-(X=1002,Y=566)
	[ 820, 132,  854,  168 ],	//15:現在地マーカー (X=820,Y=132)-(X=854,Y=168)

	[ 341, 261,  661,  431 ],	//16:ロゴ (X=341,Y=261)-(X=661,Y=431)
	[   0, 476,  300,  566 ],	//17:スタートボタン (X=0,Y=476)-(X=300,Y=566)
	[ 662, 261,  982,  431 ],	//18:ゲームオーバー (X=662,Y=261)-(X=982,Y=431)
	[ 301, 476,  601,  566 ],	//19:やりなおすボタン (X=301,Y=476)-(X=601,Y=566)

	[1202,  85, 1442,  135 ],	//20:超会議バナー (X=1202,Y=85)-(X=1442,Y=135)

	[ 771, 202,  985,  256 ],	//21:デモプレイ中… (X=771,Y=202)-(X=985,Y=256)
	[1172,   0, 1622,   50 ],	//22:クリックしてゲームスタート (X=1172,Y=0)-(X=1622,Y=50)

	[1051, 383, 1111,  443 ],	//23:サウンド_ON (X=1051,Y=383)-(X=1111,Y=443)
	[1112, 383, 1172,  443 ],	//24:サウンド_OFF (X=1112,Y=383)-(X=1172,Y=443)
	[ 990, 383, 1050,  443 ],	//25:ヘルプボタン (X=990,Y=383)-(X=1050,Y=443)

	[1003, 874, 1123,  994 ],	//26:カウントダウン0 (X=1003,Y=874)-(X=1123,Y=994)
	[1124, 874, 1244,  994 ],	//27:カウントダウン1 (X=1124,Y=874)-(X=1244,Y=994)
	[1245, 874, 1365,  994 ],	//28:カウントダウン2 (X=1245,Y=874)-(X=1365,Y=994)
	[1366, 874, 1486,  994 ],	//29:カウントダウン3 (X=1366,Y=874)-(X=1486,Y=994)

	[   0, 761,  485,  781 ],	//30:テロップ1 (X=0,Y=761)-(X=810,Y=781)
	[   0, 782,  530,  802 ],	//31:テロップ2 (X=0,Y=782)-(X=810,Y=802)
	[   0, 803,  450,  823 ],	//32:テロップ3 (X=0,Y=803)-(X=810,Y=823)
	[   0, 824,  515,  844 ],	//33:テロップ4 (X=0,Y=824)-(X=810,Y=844)
	[   0, 845,  405,  865 ],	//34:テロップ5 (X=0,Y=845)-(X=810,Y=865)
	[   0, 866,  405,  886 ],	//35:テロップ6 (X=0,Y=866)-(X=810,Y=886)

	[1003, 598, 1383,  618 ],	//36:テロップ_タグ1_1 (X=1003,Y=598)-(X=1813,Y=618)
	[1003, 619, 1383,  639 ],	//37:テロップ_タグ1_2 (X=1003,Y=619)-(X=1813,Y=639)
	[1003, 640, 1423,  660 ],	//38:テロップ_タグ2_1 (X=1003,Y=640)-(X=1813,Y=660)
	[1003, 661, 1423,  681 ],	//39:テロップ_タグ2_2 (X=1003,Y=661)-(X=1813,Y=681)
	[1003, 682, 1403,  702 ],	//40:テロップ_タグ3 (X=1003,Y=682)-(X=1813,Y=702)
	[1003, 703, 1583,  723 ],	//41:テロップ_タグ4 (X=1003,Y=703)-(X=1813,Y=723)

	[1622, 187, 1952,  227 ],	//42:テロップ_通知 (X=1622,Y=187)-(X=1952,Y=227)

	[1003, 724, 1143,  864 ],	//43:無敵テレビちゃん (X=1003,Y=724)-(X=1143,Y=864)
	[1144, 724, 1184,  764 ],	//44:タグアイコン：うなぎのぼり (X=1144,Y=724)-(X=1184,Y=764)
	[1185, 724, 1225,  764 ],	//45:タグアイコン：ゆっくり (X=1185,Y=724)-(X=1225,Y=764)
	[1226, 724, 1266,  764 ],	//46:タグアイコン：下降 (X=1226,Y=724)-(X=1266,Y=764)

	[ 662, 261,  762,  333 ],	//47:ロゴ(IX) (X=662,Y=261)-(X=762,Y=333)
];

//オブジェクトデータ
const objSpriteData = [

	[ 771,   0,  911,   80 ],	//00:お邪魔雲_大 (X=771,Y=0)-(X=911,Y=80)
	[ 771,  81,  861,  131 ],	//01:お邪魔雲_小 (X=771,Y=81)-(X=861,Y=131)

	[   0, 567,  250,  607 ],	//02:コメント_1 (X=0,Y=567)-(X=290,Y=607)
	[ 291, 567,  421,  607 ],	//03:コメント_2 (X=291,Y=567)-(X=421,Y=607)
	[ 582, 567,  872,  607 ],	//04:コメント_3 (X=582,Y=567)-(X=872,Y=607)
	[   0, 608,  290,  648 ],	//05:コメント_4 (X=0,Y=608)-(X=290,Y=648)

	[ 291, 608,  581,  648 ],	//06:コメント_5 (X=291,Y=608)-(X=581,Y=648)
	[ 582, 608,  806,  648 ],	//07:コメント_6 (X=582,Y=608)-(X=806,Y=648)
	[ 807, 608,  897,  648 ],	//08:コメント_7 (X=807,Y=608)-(X=897,Y=648)
	[   0, 649,  148,  689 ],	//09:コメント_8 (X=0,Y=649)-(X=148,Y=689)
	[ 149, 649,  559,  689 ],	//10:コメント_9 (X=149,Y=649)-(X=559,Y=689)
	[ 560, 649,  626,  689 ],	//11:コメント_10 (X=560,Y=649)-(X=626,Y=689)

	[1003, 496, 1193,  546 ],	//12:タグ1-うなぎのぼり (X=1003,Y=496)-(X=1193,Y=546)
	[1194, 496, 1384,  546 ],	//13:タグ2-ゆっくり (X=1194,Y=496)-(X=1384,Y=546)
	[1385, 496, 1575,  546 ],	//14:タグ3-下降 (X=1385,Y=496)-(X=1575,Y=546)
	[1003, 547, 1193,  597 ],	//15:タグ4-無敵 (X=1003,Y=547)-(X=1193,Y=597)
];

//エフェクトテーブル
const effSpriteData = [
	[ 990,   0, 1080,   90 ],	//00:発射(煙-小) (X=990,Y=0)-(X=1080,Y=90)
	[1080,   0, 1171,   90 ],	//01:発射(煙-大) (X=1081,Y=0)-(X=1171,Y=90)
	[ 990, 182, 1080,  272 ],	//02:馬力(煙-小) (X=990,Y=182)-(X=1080,Y=272)
	[1080, 182, 1170,  272 ],	//03:馬力(煙-大) (X=1081,Y=182)-(X=1171,Y=272)
	[ 990, 273, 1080,  363 ],	//04:ヒット (X=990,Y=273)-(X=1080,Y=363)

	[ 990,  91, 1080,  181 ],	//05:土煙1(煙-小) (X=990,Y=91)-(X=1080,Y=181)
	[1081,  91, 1171,  181 ],	//06:土煙2(煙-大) (X=1081,Y=91)-(X=1171,Y=181)

	[1205, 136, 1375,  206 ],	//07:水しぶき1 (X=1205,Y=136)-(X=1375,Y=206)
	[1205, 207, 1375,  277 ],	//08:水しぶき2 (X=1205,Y=207)-(X=1375,Y=277)
	[1205, 278, 1375,  348 ],	//09:水しぶき3 (X=1205,Y=278)-(X=1375,Y=348)
	[1205, 349, 1375,  419 ],	//10:水しぶき4 (X=1205,Y=349)-(X=1375,Y=419)
	[1205, 420, 1375,  490 ],	//11:水しぶき5 (X=1205,Y=420)-(X=1375,Y=490)

	[ 930,   0,  970,   40 ],	//12:火花1 (X=930,Y=0)-(X=970,Y=40)
	[ 930,  41,  970,   81 ],	//13:火花2 (X=930,Y=41)-(X=970,Y=81)
];

//チュートリアルテーブル
const tutoSpriteData = [
	[1623,   0, 1943,  140 ],	//00:矢印(パワー) (X=1623,Y=0)-(X=1943,Y=140)
	[1824,   0, 2004,  200 ],	//01:矢印(角度)
	[1623, 131, 1803,  211 ],	//02:矢印(ひっぱり)

	[   0,1032,  970, 1282 ],	//03:あそびかた_1ページ目 (X=0,Y=1032)-(X=970,Y=1282)
	[ 971,1032, 1941, 1282 ],	//04:あそびかた_2ページ目 (X=971,Y=1032)-(X=1941,Y=1282)
	[ 302,1283,  372, 1353 ],	//05:閉じるボタン (X=302,Y=1283)-(X=372,Y=1353)
	[   0,1283,  150, 1363 ],	//06:次へボタン (X=0,Y=1283)-(X=150,Y=1363)
	[ 151,1283,  301, 1363 ],	//07:前へボタン (X=151,Y=1283)-(X=301,Y=1363)
	[ 373,1283,  603, 1363 ],	//08:ゲーム開始 (X=373,Y=1283)-(X=603,Y=1363)

	[ 604,1283,  816, 1419 ],	//09:説明テレビちゃん1-1 (X=604,Y=1283)-(X=816,Y=1419)
	[ 817,1283, 1029, 1419 ],	//10:説明テレビちゃん1-2 (X=817,Y=1283)-(X=1029,Y=1419)
	[1030,1283, 1136, 1363 ],	//11:説明テレビちゃん2-1 (X=1030,Y=1283)-(X=1136,Y=1363)
	[1137,1283, 1243, 1363 ],	//12:説明テレビちゃん2-2 (X=1137,Y=1283)-(X=1243,Y=1363)
	[1244,1283, 1350, 1363 ],	//13:説明テレビちゃん3-1 (X=1244,Y=1283)-(X=1350,Y=1363)
	[1351,1283, 1457, 1363 ],	//14:説明テレビちゃん3-2 (X=1351,Y=1283)-(X=1457,Y=1363)
];

//リザルトテーブル(+ポップアップ)
const resultSpriteData = [
	[   0,1534,  970, 1784 ],	//00:ベース (X=0,Y=1534)-(X=970,Y=1784)
	[   0,1433,  650, 1533 ],	//01:遷移時メッセージ (X=0,Y=1433)-(X=650,Y=1533)
	[   0,1785,  230, 1865 ],	//02:ブース内容を見る (X=0,Y=1785)-(X=230,Y=1865)
	[ 231,1785,  461, 1865 ],	//03:もう一回あそぶ (X=231,Y=1785)-(X=461,Y=1865)
	[ 462,1785,  692, 1865 ],	//04:やりなおす (X=462,Y=1785)-(X=692,Y=1865)
	[   0,1866,  300, 1956 ],	//05:移動する (X=0,Y=1866)-(X=300,Y=1956)
	[ 301,1866,  601, 1956 ],	//06:ゲームにもどる (X=301,Y=1866)-(X=601,Y=1956)
	[   0,1957,  380, 2027 ],	//07:称号枠 (X=0,Y=1957)-(X=380,Y=2027)
	[ 693,1785,  993, 1875 ],	//08:結果発表 (X=693,Y=1785)-(X=993,Y=1875)

	[ 693,1876,  993, 2006 ],	//09:マーク_ベース (X=693,Y=1876)-(X=993,Y=2006)
	[1838,1745, 1898, 1805 ],	//10:マーク1 (X=1838,Y=1745)-(X=1898,Y=1805)
	[1838,1806, 1898, 1866 ],	//11:マーク2 (X=1838,Y=1806)-(X=1898,Y=1866)
	[1838,1867, 1898, 1927 ],	//12:マーク3 (X=1838,Y=1867)-(X=1898,Y=1927)

	[ 994,1534, 1204, 1744 ],	//13:ランク_ベース (X=994,Y=1534)-(X=1204,Y=1744)
	[1205,1534, 1415, 1744 ],	//14:超 (X=1205,Y=1534)-(X=1415,Y=1744)
	[1416,1534, 1626, 1744 ],	//15:S (X=1416,Y=1534)-(X=1626,Y=1744)
	[1627,1534, 1837, 1744 ],	//16:A (X=1627,Y=1534)-(X=1837,Y=1744)
	[1838,1534, 2048, 1744 ],	//17:B (X=1838,Y=1534)-(X=2048,Y=1744
	[ 994,1745, 1204, 1955 ],	//18:C (X=994,Y=1745)-(X=1204,Y=1955)
	[1205,1745, 1415, 1955 ],	//19:D (X=1205,Y=1745)-(X=1415,Y=1955)
	[1416,1745, 1626, 1955 ],	//20:E (X=1416,Y=1745)-(X=1626,Y=1955)
	[1627,1745, 1837, 1955 ],	//21:F (X=1627,Y=1745)-(X=1837,Y=1955)
];

//当たり演出ロゴテーブル
const clearSpriteData = [
	[   0,   0,  700,  250 ],	//ロゴ - 0: テレビちゃん劇場
	[   0, 250,  700,  500 ],	//ロゴ - 1: 超音楽祭
	[   0, 500,  700,  750 ],	//ロゴ - 2: 超歌舞伎
	[   0, 750,  700, 1000 ],	//ロゴ - 3: 超ゲームエリア
	[   0,1000,  700, 1250 ],	//ロゴ - 4: 超囲碁・将棋
	[   0,1250,  700, 1500 ],	//ロゴ - 5: 超料理
	[   0,1500,  700, 1750 ],	//ロゴ - 6: 超ボーカロイドエリア
	[   0,1750,  700, 2000 ],	//ロゴ - 7: 超踊ってみた
	[   0,2000,  700, 2250 ],	//ロゴ - 8: 超まるなげひろば
	[   0,2250,  700, 2500 ],	//ロゴ - 9: 超コスプレ
	[   0,2500,  700, 2750 ],	//ロゴ - 10: 超アニメエリア
];

//ハズレ演出テーブル
const missSpriteData = [
	[   0,   0,  970,  250 ],	//00:星になるBG (X=0,Y=0)-(X=970,Y=250)
	[   0, 251,  440,  341 ],	//01:テレビちゃんよ (X=0,Y=251)-(X=440,Y=341)
	[ 441, 251,  641,  341 ],	//02:永遠に (X=441,Y=251)-(X=641,Y=341)
	[ 661, 251,  721,  311 ],	//03:キラキラ (X=661,Y=251)-(X=721,Y=311)
	[ 740, 251,  970,  481 ],	//04:星座テレビちゃん (X=740,Y=251)-(X=970,Y=481)

	[   0, 613,  970,  643 ],	//05:シネスコ枠 (X=0,Y=613)-(X=970,Y=643)
	[   0, 644,  810,  794 ],	//06:どうなるテレビちゃん!? (X=0,Y=644)-(X=810,Y=794)
	[   0, 442,  220,  612 ],	//07:次回 (X=0,Y=442)-(X=220,Y=612)

	[ 221, 442,  461,  572 ],	//08:ニコ生クルーズ (X=221,Y=442)-(X=461,Y=572)
	[ 830, 644,  970,  744 ],	//09:土管 (X=830,Y=644)-(X=970,Y=744)
	[ 830, 512,  970,  612 ],	//10:孔明の罠 (X=830,Y=512)-(X=970,Y=612)

	[ 462, 442,  702,  572 ],	//11:ニコ生クルーズ-演出 (X=462,Y=442)-(X=702,Y=572)
	[   0, 342,  100,  412 ],	//12:水しぶき1 (X=0,Y=342)-(X=100,Y=412)
	[ 101, 342,  201,  412 ],	//13:水しぶき2 (X=101,Y=342)-(X=201,Y=412)

	[ 970,1250, 1948, 1500 ],	//14:ニコ生クルーズ用背景
	[   0,1000,  978, 1250 ],	//15:土管用背景
];

//テロップロール速度
var telopRollSpeedData = [
	1.5,	//26:テロップ1
	1.5,	//27:テロップ2
	1.5,	//28:テロップ3
	1.5,	//29:テロップ4
	1.5,	//30:テロップ5
	1.5,	//31:テロップ6

	1.5,	//32:テロップ_タグ1_1
	1.5,	//33:テロップ_タグ1_2
	1.5,	//34:テロップ_タグ2_1
	1.5,	//35:テロップ_タグ2_2
	1.5,	//36:テロップ_タグ3
	1.5,	//37:テロップ_タグ4
];

//UI表示座標テーブル
const uiDrawData = {
	0:{ x:   -6, y:   24, width:    0, height:    0 },	//00:大砲/テレビちゃん
	1:{ x:   -6, y:   24, width:    0, height:    0 },	//01:大砲
	2:{ x:   -6, y:   24, width:    0, height:    0 },	//02:台座
	3:{ x:   -6, y:   24, width:    0, height:    0 },	//03:テレビちゃん

	4:{ x:    0, y:    0, width:    0, height:    0 },	//04:UI枠線_横ライン
	5:{ x:    0, y:    0, width:    0, height:    0 },	//05:UI枠線_縦ライン

	6:{ x:  -14, y:   47, width:    0, height:    0 },	//06:馬力ゲージ_ベース
	7:{ x:  -14, y:   47, width:    0, height:    0 },	//07:パワーゲージ_ベース

	8:{ x:   33, y:    1, width:    0, height:    0 },	//08:ゲージ_共通(ベース(06,07)+)
	9:{ x:   33, y:    1, width:    0, height:    0 },	//09:枠_共通(ベース(06,07)+)

	10:{ x:   32, y:  131, width:    0, height:    0 },	//10:馬力ボタン_on(馬力ベース(06)+)
	11:{ x:   32, y:  131, width:    0, height:    0 },	//11:馬力ボタン_off(馬力ベース(06)+)
	12:{ x:   87, y:  157, width:   16, height:    0 },	//12:馬力回数(馬力ベース(06)+)

	13:{ x:    0, y:    0, width:    0, height:    0 },	//13:テロップ
	14:{ x:  297, y:  180, width:    0, height:    0 },	//14:現在地メーター
	15:{ x:  288, y:  195, width:    0, height:    0 },	//15:現在地マーカー

	16:{ x:  325, y:    1, width:    0, height:    0 },	//16:ロゴ
	17:{ x:  338, y:  160, width:    0, height:    0 },	//17:スタートボタン
	18:{ x:  325, y:    0, width:    0, height:    0 },	//18:ゲームオーバー
	19:{ x:  338, y:  160, width:    0, height:    0 },	//19:やりなおすボタン

	20:{ x:  730, y:  200, width:  240, height:   50 },	//20:超会議バナー

	21:{ x:  736, y:   17, width:    0, height:    0 },	//21:デモプレイ中…
	22:{ x:  260, y:  155, width:    0, height:    0 },	//22:クリックしてゲームスタート

	23:{ x:  911, y:    0, width:   60, height:   60 },	//23:ボタン-サウンドON
	24:{ x:  911, y:    0, width:   60, height:   60 },	//24:ボタン-サウンドOFF
	25:{ x:  851, y:    0, width:   60, height:   60 },	//25:ボタン-ヘルプ

	26:{ x:  424, y:   65, width:  120, height:  120 },	//26:カウントダウン0
	27:{ x:  424, y:   65, width:  120, height:  120 },	//27:カウントダウン1
	28:{ x:  424, y:   65, width:  120, height:  120 },	//28:カウントダウン2
	29:{ x:  424, y:   65, width:  120, height:  120 },	//29:カウントダウン3

	30:{ x:    0, y:    0, width:    0, height:    0 },	//30:テロップ_1
};

//あそびかた表示座標テーブル
const tutoDrawData = {
	0:{ x:    0, y:    0, width:    0, height:    0 },	//00:矢印(パワー)
	1:{ x:    0, y:    0, width:    0, height:    0 },	//01:矢印(角度)
	2:{ x:    0, y:    0, width:    0, height:    0 },	//02:矢印(ひっぱり)

	3:{ x:    0, y:    0, width:    0, height:    0 },	//03:あそびかた_1ページ目
	4:{ x:    0, y:    0, width:    0, height:    0 },	//04:あそびかた_2ページ目
	5:{ x:  892, y:   -3, width:   70, height:   70 },	//05:閉じるボタン
	6:{ x:  843, y:  181, width:  150, height:   80 },	//06:次へボタン
	7:{ x:  -27, y:  181, width:  150, height:   80 },	//07:前へボタン
	8:{ x:  710, y:  146, width:  680, height:   80 },	//08:ゲーム開始
};

//リザルト表示座標テーブル
const rsltDrawData = {
	0:{ x:    0, y:    0, width:    0, height:    0 },	//00:ベース
	1:{ x:  160, y:   40, width:    0, height:    0 },	//01:遷移時メッセージ
	2:{ x:  532, y:   66, width:  230, height:   80 },	//02:ブース内容を見る
	3:{ x:  532, y:  141, width:  230, height:   80 },	//03:もう一回あそぶ
	4:{ x:  532, y:   96, width:  230, height:   80 },	//04:やりなおす
	5:{ x:  190, y:  136, width:  300, height:   80 },	//05:移動する
	6:{ x:  480, y:  136, width:  300, height:   90 },	//06:ゲームにもどる
	7:{ x:  182, y:  170, width:    0, height:    0 },	//07:称号枠
	8:{ x:  464, y:    0, width:    0, height:    0 },	//08:結果発表

	9:{ x:  209, y:   51, width:    0, height:    0 },	//09:マーク_ベース
	10:{ x:  241, y:   39, width:    0, height:    0 },	//10:マーク1(ベース+) 花
	11:{ x:   23, y:   75, width:    0, height:    0 },	//11:マーク2(ベース+) 登山家
	12:{ x:   -5, y:   -7, width:    0, height:    0 },	//12:マーク3(ベース+) UFO

	13:{ x:  258, y:   -8, width:    0, height:    0 },	//13:ランク_ベース
	14:{ x:  258, y:   -8, width:    0, height:    0 },	//14:超
	15:{ x:  258, y:   -8, width:    0, height:    0 },	//15:S
	16:{ x:  258, y:   -8, width:    0, height:    0 },	//16:A
	17:{ x:  258, y:   -8, width:    0, height:    0 },	//17:B
	18:{ x:  258, y:   -8, width:    0, height:    0 },	//18:C
	19:{ x:  258, y:   -8, width:    0, height:    0 },	//19:D
	20:{ x:  258, y:   -8, width:    0, height:    0 },	//20:E
	21:{ x:  258, y:   -8, width:    0, height:    0 },	//21:F
};


//称号テーブル
const ahievData = [
	//A : 進んだ距離
	[
	"安定の",
	"いつもの",
	"野生の",
	"バーチャル",
	"インドの",
	],

	//B : 雲被弾数
	[
	"ニコ厨",
	"名無し",
	"生主",
	"実況主",
	"絶対神",
	],

	//C : コメント弾幕被弾数
	[
	"うおっまぶしっ",
	"幕張に消ゆ",
	"全米が泣いた",
	"前人未踏",
	"マジパネェ",
	],

	//D : アドバルーン
	[
	"フェス限",
	"千両役者",
	"TASさんこと",
	"盤上の",
	"オイリー",
	"ネギまみれの",
	"キレッキレ",
	"技術部所属の",
	"魔法少女",
	"たーのしー",
	],
];

//雲、コメント配置パターンテーブル
//全域を970ｘ250で区切ったエリアに分けた際の配置
//注1:宇宙空間より下部分への配置
//1桁目・・・雲の数
//2桁目・・・配置するコメントのID（0.配置しない)
var CloudAreaPattern = [
	[  0,  3, 23, 12, 100, 40,103,  0, ],	//宇宙空間 上位
	[ 63, 13,103, 72,  13, 20, 90,100, ],	//宇宙空間 入口
	[ 12, 23,  3,  3,  53, 83,103, 30, ],	//空 上位
	[ 12,  3,  2, 42, 102, 62, 13, 70, ],	//空 中位
	[  1,  4, 32, 73,  83, 12, 93, 40, ],	//空 下位
	[  0,  1,  3, 92,   3, 53, 23,  0, ],	//
	[  0,  1, 62,  1,  33,  1, 12,  0, ],	//海面
];
//タグ配置パターンテーブル
//1桁目・・・配置するタグの数(0.配置しない)
//2桁目・・・配置するタグのID（0-うなぎのぼり 1-ゆっくり 2-下降 3-無敵 7,8,9- ゆっくりタグ広範囲配置（数字が大きくなるほど広範囲。9で最大縦横4エリア）)
var taguAreaPattern = [
	[  0,  0,  0,  0,   0,  0,  0,  0, ],	//宇宙空間 上位
	[  0, 82,  0, 31,  11,  0,  0,  0, ],	//宇宙空間 入口
	[  0,  0,  0,  0,   0,  0,  0,  0, ],	//空 上位
	[  0,  0,  0,  0,  82,  0,  0,  0, ],	//空 中位
	[  0,  0,  0,  0,  21,  0,  0,  0, ],	//空 下位
	[  0,  0,  1,  0,   1,  0,  0,  0, ],	//
	[  0,  0, 11,  0,   0, 11,  0,  0, ],	//海面
];
//孔明の罠等のトラップパターンテーブル
//1桁目・・・トラップのID（0.配置しない)
var TrapAreaPattern = [
	[  0,  0,  0,  0,  0,  2,  0,  0, ],	//宇宙空間 上位
	[  0,  0,  0,  0,  2,  0,  0,  0, ],	//宇宙空間 入口
	[  0,  0,  2,  3,  0,  3,  2,  0, ],	//空 上位
	[  0,  0,  0,  0,  0,  0,  2,  0, ],	//空 中位
	[  0,  0,  0,  2,  0,  0,  0,  0, ],	//空 下位
	[  0,  0,  1,  0,  0,  0,  0,  0, ],	//
	[  0,  0,  0,  0,  0,  0,  0,  0, ],	//海面
];


//アタリ演出アニメーション情報
var clearAnimParam = [
	[ 487,  127, 15, "#000000", ],	//1
	[ 487,  127, 29, "#000000", ],	//2
	[ 487,  127, 26, "#FFFFFF", ],	//3
	[ 487,  127, 30, "#FFFFFF", ],	//4
	[ 487,  127, 28, "#FFFFFF", ],	//5
	[ 487,  127, 25, "#000000", ],	//6
	[ 487,  127, 25, "#000000", ],	//7
	[ 487,  127, 21, "#000000", ],	//8
	[ 487,  127, 30, "#000000", ],	//9
	[ 487,  127, 26, "#000000", ],	//10
];

// アタリ演出アニメーション再生時間テーブル
var clearAnimTimeTbl = [
//1-超音楽祭
[0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,	0.4,],
//2-超歌舞伎
//[0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,],
[0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.206,	0.5,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.5,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.5,],
//3-超ゲーム
[0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,],
//4-超囲碁・将棋
//[0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,],
[0.1,	0.3,	0.1,	0.1,	0.1,	0.1,	0.1,	0.1,	0.5,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	2.0,],
//5-超料理
[0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,	0.214,],
//6-超ボーカロイド
[0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,],
//7-超踊ってみた
[0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,	0.24,],
//8-超まるなげひろば
[0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,	0.285,],
//9-超コスプレ
[0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,	0.2,],
//10-超アニメ
[0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,	0.23,],
];


//------------------
//関数
//------------------
//スプライト生成
//【tblNo】0:UI, 1:obj, 2:eff, 3:tuto, 4:result, 5:clear , 6:miss
function createSprite( scene, tblNo, spriteID, posx, posy ){

	var sprite = null;
	var src = null;
	var srcX = 0;
	var srcY = 0;
	var spW = 0;
	var spH = 0;

	if(tblNo == this.TBL_UI){
		srcX = uiSpriteData[ spriteID ][0];
		srcY = uiSpriteData[ spriteID ][1];
		spW = uiSpriteData[ spriteID ][2] - srcX;
		spH = uiSpriteData[ spriteID ][3] - srcY;
		src = scene.assets[this.IMG_UI];
	}else if(tblNo == this.TBL_OBJ){
		srcX = objSpriteData[ spriteID ][0];
		srcY = objSpriteData[ spriteID ][1];
		spW = objSpriteData[ spriteID ][2] - srcX;
		spH = objSpriteData[ spriteID ][3] - srcY;
		src = scene.assets[this.IMG_UI];
	}else if(tblNo == this.TBL_EFF){
		srcX = effSpriteData[ spriteID ][0];
		srcY = effSpriteData[ spriteID ][1];
		spW = effSpriteData[ spriteID ][2] - srcX;
		spH = effSpriteData[ spriteID ][3] - srcY;
		src = scene.assets[this.IMG_UI];
	}else if(tblNo == this.TBL_TUTO){
		srcX = tutoSpriteData[ spriteID ][0];
		srcY = tutoSpriteData[ spriteID ][1];
		spW = tutoSpriteData[ spriteID ][2] - srcX;
		spH = tutoSpriteData[ spriteID ][3] - srcY;
		src = scene.assets[this.IMG_UI];
	}else if(tblNo == this.TBL_RSLT){
		srcX = resultSpriteData[ spriteID ][0];
		srcY = resultSpriteData[ spriteID ][1];
		spW = resultSpriteData[ spriteID ][2] - srcX;
		spH = resultSpriteData[ spriteID ][3] - srcY;
		src = scene.assets[this.IMG_UI];
	}else if(tblNo == this.TBL_CLR){
		srcX = clearSpriteData[ spriteID ][0];
		srcY = clearSpriteData[ spriteID ][1];
		spW = clearSpriteData[ spriteID ][2] - srcX;
		spH = clearSpriteData[ spriteID ][3] - srcY;
		src = scene.assets[this.IMG_ANIM_LOGO];
	}else if(tblNo == this.TBL_MISS){
		srcX = missSpriteData[ spriteID ][0];
		srcY = missSpriteData[ spriteID ][1];
		spW = missSpriteData[ spriteID ][2] - srcX;
		spH = missSpriteData[ spriteID ][3] - srcY;
		if(this.MISS_SHIP_BG <= spriteID){
			src = scene.assets[this.IMG_MAP];
		}else{
			src = scene.assets[this.IMG_ANIM_MISS];
		}
	}

	sprite = new g.Sprite({
		scene: scene,
		src: src,
		width: spW,
		height: spH,
		srcX: srcX,
		srcY: srcY,
		srcWidth: spW,
		srcHeight: spH,
		x: posx,
		y: posy,
		anchorX: null,
		anchorY: null
	});

	return sprite;
}

//スプライトデータ取得
//【tblNo】0:UI, 1:obj, 2:eff, 3:tuto, 4:result, 5:clear , 6:miss
//【dataNo】0:sX , 1:sY, 2:eX, 3:eY
function getSpriteData( tblNo, spriteID, dataNo ){

	var data = -1;
	if(tblNo == this.TBL_UI){
		data = uiSpriteData[ spriteID ][dataNo];
	}else if(tblNo == this.TBL_OBJ){
		data = objSpriteData[ spriteID ][dataNo];
	}else if(tblNo == this.TBL_EFF){
		data = effSpriteData[ spriteID ][dataNo];
	}else if(tblNo == this.TBL_TUTO){
		data = tutoSpriteData[ spriteID ][dataNo];
	}else if(tblNo == this.TBL_RSLT){
		data = resultSpriteData[ spriteID ][dataNo];
	}else if(tblNo == this.TBL_CLR){
		data = clearSpriteData[ spriteID ][dataNo];
	}else if(tblNo == this.TBL_MISS){
		data = missSpriteData[ spriteID ][dataNo];
	}

	return data;
}

//表示座標取得
function getUIPos( spriteID ){
	return uiDrawData[ spriteID ];
}

//座標取得
function getTutoPos( spriteID ){
	return tutoDrawData[ spriteID ];
}

//座標取得
function getRsltPos( spriteID ){
	return rsltDrawData[ spriteID ];
}


//称号名取得
function getAchievName( typeId, rankId ){
	var name = ahievData[ typeId ][rankId];
	return name;
}


//当たり判定
//点と矩形の当たり 点が矩形内ならtrueを返す
function checkPosRect( px, py, cx, cy, width, height) {
	var cw = cx+width;
	var ch = cy+height;

	if( px>=cx && px<=cw && py>=cy && py<=ch ) return true;
	return false;
}

//ディグリー→ラジアン変換
function getRadian(degrees) {
	return degrees * Math.PI / 180;
}

//ラジアン→ディグリー変換
function getDegrees(radian) {
	return radian * 180 / Math.PI;
}

//ランダム値取得
function getRandom( num ) {
	return game.random.get(0, num);
}

//サイトジャンプ
/*
	// 指定ID
	- 0: 超音楽祭
	- 1: 超歌舞伎
	- 2: 超ゲームエリア
	- 3: 超囲碁・将棋
	- 4: 超料理
	- 5: 超ボーカロイドエリア
	- 6: 超踊ってみた
	- 7: 超まるなげひろば
	- 8: 超コスプレ
	- 9: 超アニメエリア
	- 10:超会議公式サイト
*/
function jumpURL( tag_no ) {
	var set_no = tag_no;

	if(tag_no == -1){
		window.open(jumpURLList[10], "_blank");
	}
	else{
		window.open(jumpURLList[set_no], "_blank");
	}
}

//サウンドフラグ取得
function getSndF() {
	return sound_flg;
}

//サウンドフラグ設定
function setSndF( flg ) {
	sound_flg = flg;
}


//サウンド関連
var currentBGMname = null;
//曲再生
//IN:曲名ID nullまたは""の場合stopBGMを呼び出す
function playBGM ( bgmName ) {

	//再生可否チェック
	if( bgmName == "" || bgmName == null ){ stopBGM(); return; }
	if( !getSndF() )return;
	if( bgm_flg ) return; // 再生済み

	if(currentBGMname != null) stopBGM();

	currentBGMname = bgmName;

	var nowScene = game.scene();
	nowScene.assets[ currentBGMname ].play();
	bgm_flg = true;

}

//停止曲の再再生
function rePlayBGM ( ) {
	playBGM( currentBGMname );
}

//再生中曲停止
function stopBGM () {

	if( currentBGMname == null )return;

	var nowScene = game.scene();
	nowScene.assets[ currentBGMname ].stop();
//	currentBGMname = null;
	bgm_flg = false;
}

//SE/ジングル再生
//IN:SE/ジングル名ID
function playSE ( seName ) {
	if( !getSndF() )return;

	var nowScene = game.scene();
	nowScene.assets[ seName ].play();
}



//ブラウザ識別
function checkBrowser () {
	var userAgent = window.navigator.userAgent.toLowerCase();

	if(userAgent.indexOf("msie") != -1 || userAgent.indexOf("trident") != -1){ // 使用ブラウザIE
		ie_flg = true; // IEフラグON
	}else{
		ie_flg = false;
	}
}

//IEフラグ取得
function getIE () {
	return ie_flg;
}

//カメラ座標取得
function getCameraPos () {
	var pos = {x:0, y:0};
	pos.x = camera_posx;
	pos.y = camera_posy;
	return pos;
}

//カメラ座標設定
function setCameraPos (x,y) {
	camera_posx = x;
	camera_posy = y;
}


//プレイヤータグ番号取得
function getPlyTagNo () {
	return ply_tagno;
}

//プレイヤータグ番号設定
function setPlyTagNo (tagno) {
	ply_tagno = tagno;
}



//データテーブル
module.exports.assetFileName = assetFileName;
module.exports.uiSpriteData = uiSpriteData;
module.exports.telopRollSpeedData = telopRollSpeedData;

module.exports.CloudAreaPattern = CloudAreaPattern;
module.exports.taguAreaPattern = taguAreaPattern;
module.exports.TrapAreaPattern = TrapAreaPattern;

module.exports.clearAnimParam = clearAnimParam;
module.exports.clearAnimTimeTbl = clearAnimTimeTbl;

//関数
module.exports.createSprite = createSprite;

module.exports.getSpriteData = getSpriteData;
module.exports.getUIPos = getUIPos;
module.exports.getTutoPos = getTutoPos;
module.exports.getRsltPos = getRsltPos;

module.exports.getAchievName = getAchievName;

module.exports.checkPosRect = checkPosRect;

module.exports.getRadian = getRadian;
module.exports.getDegrees = getDegrees;
module.exports.getRandom = getRandom;

module.exports.jumpURL = jumpURL;

module.exports.getSndF = getSndF;
module.exports.setSndF = setSndF;

module.exports.playBGM = playBGM;
module.exports.stopBGM = stopBGM;
module.exports.playSE = playSE;
module.exports.rePlayBGM = rePlayBGM;

module.exports.checkBrowser = checkBrowser;
module.exports.getIE = getIE;

module.exports.getCameraPos= getCameraPos;
module.exports.setCameraPos = setCameraPos;

module.exports.getPlyTagNo = getPlyTagNo;
module.exports.setPlyTagNo = setPlyTagNo;
