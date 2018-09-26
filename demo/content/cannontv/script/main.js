var game = g.game;
var cmn = require("./Common");
var sub = require("./sub");

var gameCore;
var globalCntr = 0;
var global_lastTouch = 0;

const CHANGE_TIME = 60*120.0; // 操作放置最大時間(120秒)
const CLEAR_HIT_TIME = 60*1.0; // ヒットストップ時間
const CLEAR_FADE_TIME = 60*2.0; // クリアフェード時間
const CLEAR_RESULT_TIME = 60*2.0; // リザルト遷移猶予時間(2秒)
const DEMO_END_TIME = 60*2.0; // デモ終了時待機時間(2秒)

const TITLE_SCROLL_SPD = 3; // タイトル背景移動値

// 重力関係
const GRAVITY = 9.80665 /10;
var fps = game.fps;
var frameTime = 1000 / fps;
var gf = GRAVITY / frameTime;


//世界座標系
var group_bg;
var world_posx = 0;
var world_posy = 0;

const HIT_OBJ1_VALUE = 0.78; // 雲接触時係数
const HIT_BG_VALUE = 0.60; // 地面触時係数

const BG_GROUND_START_X = 560; // 大砲付近(スタート地点)
const BG_GROUND_GOAL_X = 3060; // アドバルーン付近(ゴール地点)

const BG_SCROLL_WIDTH = cmn.BG_WIDTH-game.width; // タイトルスクロール用背景幅
const BG_CURSOR_WIDTH = cmn.BG_WIDTH-game.width; // カーソル用背景幅


//カメラ座標系
var camera_posx = 0;
var camera_posy = 0;


//タイトル演出
var title_move_x = 0;
var title_move_mode = 0; // 0:加算, 1:減算
const TITLE_MOVESTART_MAX = 60*1; // 移動猶予
var title_move_start = 0; // 移動猶予


//プレイヤー関係
var imgPly;
const PLY_WIDTH = 48; // 幅
const PLY_HEIGHT = 48; // 高さ
const PLAYER_ANGLE = 10; // 角度

const PLAYER_1BARIKI = 20; // 1馬力値
const PLAYER_1BARIKI_S = 5; // 1馬力値(小)
const PLAYER_INVALIDTIME_BARIKI = 60*0.5; // 馬力入力無効時間
const PLAYER_TIME_BARIKI_R = 60*0.25; // 馬力入力無効時間(リピート)
const BARIKI_TYPE_TIME = 2; // 馬力入力判断間隔(fps/BARIKI_TYPE_TIME)

const TAG_MUTEKI = 50; // オブジェ格納補正値


//大砲関係
var imgCannon;
var imgCannonTv;
var imgCannonBase;
const CANNON_ANGLE = -45; // 初期角度


//UI関係
//UIイメージ群
var imgUI_title = null;

var imgUI_base = null;
var imgUI_gage = null;
var imgUI_bariki = null;
var imgUI_power = null;
var imgUI_cursor = null;
var imgUI_tuto = null;
var imgUI_adv = null;
var imgUI_help = null;

var imgUI_clear = null;
var imgUI_gameover = null;
var imgUI_rslt = null;

var imgUI_rectF;
var imgUI_popWin;

const BARIKI_MAX = 100.0;	// 馬力最大値
const POWER_MAX = 20.0;	// パワー最大値

var cursor_startx = 0; // 発射位置保存用
const CORSOR_MAX = 380; // 位置ゲージ最大値

const TELOP_POINT = [0,970,3880,6305,-1]; // テロップ更新X座標


//エフェクトグループ定数
const EG_FIRE = 100;	// 発射時エフェクト


//シーン番号
const STEP_INIT				= 0;	// 初期化
const STEP_TITLE			= 10;	// タイトル

const STEP_TUTORIAL			= 20;	// あそびかた(ゲーム開始時)
const STEP_TUTORIAL_		= 21;

const STEP_HELP				= 25;	// あそびかた(ヘルプボタン)
const STEP_HELP_			= 26;

const STEP_GAME_STANDBY		= 30;	// ゲーム(準備)
const STEP_GAME_STANDBY_	= 31;
const STEP_GAME				= 35;	// ゲーム(発射前)
const STEP_GAME_			= 36;
const STEP_GAME_FIREANIM	= 37;
const STEP_GAME_FIREANIM_	= 38;
const STEP_GAME_FLY			= 39;	// ゲーム(飛行中)

const STEP_GAME_HITBLN		= 40;	// ゲーム_アドバルーン当たり
const STEP_GAME_HITBLN_		= 41;

const STEP_GAME_MISS		= 50;	// ゲーム_はずれ演出
const STEP_GAME_MISS_		= 51;
const STEP_GAME_MISS_END	= 52;

const STEP_GAMEOVER			= 60;	// ゲームオーバー
const STEP_GAMEOVER_		= 61;
const STEP_GAMEOVER_RESULT	= 62;

const STEP_DEMO_RESTART		= 70;	// デモ再スタート
const STEP_DEMO_RESTART_CLR	= 71;
const STEP_DEMO_RESTART_	= 72;

const STEP_RESET			= 80;	// リセット

const STEP_CLEAR			= 90;	// ゲームクリア

const STEP_CLEAR_FADEOUT	= 100;	// クリア後フェード
const STEP_CLEAR_FADEOUT_	= 101;

const STEP_CLEAR_FADEIN		= 105;
const STEP_CLEAR_FADEIN_	= 106;

const STEP_CLEAR_ANIM		= 110;	// アタリ演出
const STEP_CLEAR_ANIM_		= 111;

const STEP_CLEAR_RESULT		= 120;	// リザルト
const STEP_CLEAR_RESULT_	= 121;

const STEP_PAUSE			= 140;	// ポーズ(ポップアップ表示)
const STEP_PAUSE_			= 141;
const STEP_PAUSE_STAY		= 142;

const STEP_PAUSE_COUNT		= 150;
const STEP_PAUSE_COUNT_1	= 151;
const STEP_PAUSE_COUNT_2	= 152;
const STEP_PAUSE_COUNT_3	= 153;
const STEP_PAUSE_COUNT_END	= 154;


//デモ用
const DEMO_START			= 0;
const DEMO_FIRE				= 10;
const DEMO_FLY				= 20;
const DEMO_FLY_B			= 25;
const DEMO_END				= 30;


//------------------
//UIウィンドウ生成
//------------------
function createUIWindow( scene ){
	var root = new g.E({scene: scene, x:0, y:0, width: game.width, height: game.height});
	
	//ウィンドウ
	var e_window = new g.E({scene: scene, x:0, y:0, width: game.width, height: game.height});
	var line_top = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_LINE_W, 0, 0);
	var line_btm = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_LINE_W, 0, game.height-3);
	var line_left = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_LINE_H, 0, 0);
	var line_right = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_LINE_H, game.width-3, 0);
	
	var line_right2 = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_LINE_H, +2, 0); //不具合対策
	line_right.append(line_right2);
	
	e_window.append(line_top);
	e_window.append(line_btm);
	e_window.append(line_left);
	e_window.append(line_right);
	
	
	//バナー
	var banner_logo = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BANNER, cmn.getUIPos(cmn.UI_BANNER).x, cmn.getUIPos(cmn.UI_BANNER).y);
	e_window.append(banner_logo);
	
	//ヘルプボタン
	var btn_help = null;
	if(!cmn.getIE()){
		btn_help = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BTN_HELP, cmn.getUIPos(cmn.UI_BTN_HELP).x, cmn.getUIPos(cmn.UI_BTN_HELP).y);
		e_window.append(btn_help);
	}else{
		//IEの場合、ヘルプボタンのみ
		btn_help = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BTN_HELP, cmn.getUIPos(cmn.UI_BTN_SOUND_ON).x, cmn.getUIPos(cmn.UI_BTN_SOUND_ON).y);
		e_window.append(btn_help);
	}
	
	//サウンドボタン
	var btn_snd_on = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BTN_SOUND_ON, cmn.getUIPos(cmn.UI_BTN_SOUND_ON).x, cmn.getUIPos(cmn.UI_BTN_SOUND_ON).y);
	btn_snd_on.hide();
	e_window.append(btn_snd_on);
	var btn_snd_off = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BTN_SOUND_OFF, cmn.getUIPos(cmn.UI_BTN_SOUND_OFF).x, cmn.getUIPos(cmn.UI_BTN_SOUND_OFF).y);
	btn_snd_off.hide();
	e_window.append(btn_snd_off);
	if(!cmn.getIE()){
		if(cmn.getSndF()){
			btn_snd_on.show();
		}else{
			btn_snd_off.show();
		}
	}
	
	root.append(e_window);
	
	//UIテロップ・現在地
	imgUI_gage = createUIGage(scene);
	imgUI_gage.hide();
	root.append(imgUI_gage);
	
	//現在地カーソル
	imgUI_cursor = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_CURSOR_POS, cmn.getUIPos(cmn.UI_CURSOR_POS).x, cmn.getUIPos(cmn.UI_CURSOR_POS).y);
	imgUI_gage.append(imgUI_cursor);
	
	//馬力ゲージ
	var sprBariki = createUIBariki(scene);
	imgUI_bariki = new g.E({scene: scene, x: cmn.getUIPos(cmn.UI_BARIKI_BASE).x, y: cmn.getUIPos(cmn.UI_BARIKI_BASE).y, width: 100, height: 200});
	imgUI_bariki.append(sprBariki);
	imgUI_bariki.hide();
	root.append(imgUI_bariki);
	setUIBariki(0);
	
	//パワーゲージ
	var sprPower = createUIPower(scene);
	imgUI_power = new g.E({scene: scene, x: cmn.getUIPos(cmn.UI_POWER_BASE).x, y: cmn.getUIPos(cmn.UI_POWER_BASE).y, width: 100, height: 200});
	imgUI_power.append(sprPower);
	imgUI_power.hide();
	root.append(imgUI_power);
	setUIPower(0);
	
	//チュートリアル矢印
	imgUI_tuto = new g.E({scene: scene, width: game.width, height: game.height});
	var sprTutoPower = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_ARW_P, 0, 0);
	sprTutoPower.hide();
	imgUI_tuto.append(sprTutoPower);
	imgUI_tuto.hide();
	root.append(imgUI_tuto);
	
	//アドバタイズデモ
	imgUI_adv = new g.E({scene: scene, width: game.width, height: game.height});
	var sprAdv_mes = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_DEMO_TEXT, cmn.getUIPos(cmn.UI_DEMO_TEXT).x, cmn.getUIPos(cmn.UI_DEMO_TEXT).y);
	imgUI_adv.append(sprAdv_mes);
	var sprAdv_icon = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_DEMO_ICON, cmn.getUIPos(cmn.UI_DEMO_ICON).x, cmn.getUIPos(cmn.UI_DEMO_ICON).y);
	imgUI_adv.append(sprAdv_icon);
	imgUI_adv.hide();
	root.append(imgUI_adv);
	
	return root;
}


//------------------
//バナー管理
//------------------
//バナー表示
function onBanner(){
	imgUI_base.children[0].children[4].show();
}
//バナー非表示
function offBanner(){
	imgUI_base.children[0].children[4].hide();
}

//------------------
//サウンドボタン管理
//------------------
//サウンドボタン表示
function onBtnSnd(){
	if(!cmn.getIE()){
		if(cmn.getSndF()){
			imgUI_base.children[0].children[6].show();
		}else{
			imgUI_base.children[0].children[7].show();
		}
	}
}
//サウンドボタン非表示
function offBtnSnd(){
	if(!cmn.getIE()){
		if(cmn.getSndF()){
			imgUI_base.children[0].children[6].hide();
		}else{
			imgUI_base.children[0].children[7].hide();
		}
	}
}


//------------------
//馬力ゲージ生成
//------------------
function createUIBariki( scene ){
	var root = new g.E({scene: scene, x: 0, y: 0});
	
	//馬力ゲージ-ベース
	var imgBase = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BARIKI_BASE, 0, 0);
	root.append(imgBase);
	
	//ゲージ-ベース
	var imgBar_base = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_GAGE_BASE, cmn.getUIPos(cmn.UI_GAGE_BASE).x, cmn.getUIPos(cmn.UI_GAGE_BASE).y);
	root.append(imgBar_base);
	
	//ゲージ-フレーム
	var imgBar_frame = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_GAGE_FRAME, cmn.getUIPos(cmn.UI_GAGE_FRAME).x, cmn.getUIPos(cmn.UI_GAGE_FRAME).y);
	root.append(imgBar_frame);
	
	//馬力ボタン-ON
	var imgBtn_on = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BTN_BARIKI_ON, cmn.getUIPos(cmn.UI_BTN_BARIKI_ON).x, cmn.getUIPos(cmn.UI_BTN_BARIKI_ON).y);
	imgBtn_on.hide();
	root.append(imgBtn_on);
	
	//馬力ボタン-OFF
	var imgBtn_off = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BTN_BARIKI_OFF, cmn.getUIPos(cmn.UI_BTN_BARIKI_OFF).x, cmn.getUIPos(cmn.UI_BTN_BARIKI_OFF).y);
	root.append(imgBtn_off);
	
	//回数
	var imgNum = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_NUM_BARIKI, cmn.getUIPos(cmn.UI_NUM_BARIKI).x, cmn.getUIPos(cmn.UI_NUM_BARIKI).y);
	root.append(imgNum);
	
	imgNum.w = 17;
	
	return root;
}

//馬力ゲージ増減 (0～100を指定)
function setUIBariki( bariki ){
	var bariki_bar = imgUI_bariki.children[0].children[1];
	
	var no = cmn.UI_GAGE_BASE;
	var uiSrcX = cmn.getSpriteData(cmn.TBL_UI,no,0);
	var uiSrcY = cmn.getSpriteData(cmn.TBL_UI,no,1);
	var spH = cmn.getSpriteData(cmn.TBL_UI,no,3) - uiSrcY;
	
	var barh = 108; // 実ゲージサイズ
	var side_btm = 15;
	
	var draw_h = side_btm + (barh / BARIKI_MAX * bariki);
	bariki_bar.srcHeight = draw_h;
	bariki_bar.srcY = uiSrcY + (spH - draw_h);
	bariki_bar.y = cmn.getUIPos(cmn.UI_GAGE_BASE).y + spH - draw_h;
	bariki_bar.modified();
	
	//数値変更
	var bariki_num = imgUI_bariki.children[0].children[5];
	
	no = cmn.UI_NUM_BARIKI;
	uiSrcX = cmn.getSpriteData(cmn.TBL_UI,no,0);
	uiSrcY = cmn.getSpriteData(cmn.TBL_UI,no,1);
	spH = cmn.getSpriteData(cmn.TBL_UI,no,3) - uiSrcY;
	
	var draw_no = Math.floor(bariki / PLAYER_1BARIKI);
	bariki_num.srcX = uiSrcX + draw_no * cmn.getUIPos(cmn.UI_NUM_BARIKI).width;
	bariki_num.modified();
	
	imgUI_bariki.modified();
}

//馬力ボタン表示切り替え
function setBtnBariki( flg ){
	
	//Btn-ON
	var bariki_btnOn = imgUI_bariki.children[0].children[3];
	//Btn-OFF
	var bariki_btnOff = imgUI_bariki.children[0].children[4];
	
	if(gameCore.pc.bariki > 0){
		if( flg ){
			bariki_btnOn.show();
			bariki_btnOff.hide();
		}else{
			bariki_btnOn.hide();
			bariki_btnOff.show();
		}
	}else{
		bariki_btnOn.hide();
		bariki_btnOff.show();
	}
	
	imgUI_bariki.modified();
}

//馬力使用演出
function updateBariki(){
	var tmp_sub = globalCntr - gameCore.pc.bariki_animtime;
	
	var tmp_tbl = [-10,10];
	var type = gameCore.pc.bariki_type;
	var tmp_num = 0;
	if(type == 0){ //単発使用
		tmp_num = Math.floor(tmp_sub /4 %2);
		imgUI_bariki.x = cmn.getUIPos(cmn.UI_BARIKI_BASE).x + tmp_tbl[tmp_num];
		if(tmp_sub >= 15){
			imgUI_bariki.x = cmn.getUIPos(cmn.UI_BARIKI_BASE).x;
			gameCore.pc.bariki_animtime = 0;
			gameCore.pc.bariki_type = -1;
		}
	}else if(type == 1){ // 長押し
		tmp_num = Math.floor(tmp_sub /4 %2);
		imgUI_bariki.x = cmn.getUIPos(cmn.UI_BARIKI_BASE).x + tmp_tbl[tmp_num]/2;
	}
	imgUI_bariki.modified();
}


//------------------
//パワーゲージ生成
//------------------
function createUIPower( scene ){
	var root = new g.E({scene: scene, x: 0, y: 0});

	//パワーゲージ-ベース
	var imgBase = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_POWER_BASE, 0, 0);
	root.append(imgBase);
	
	//ゲージ-ベース
	var imgBar_base = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_GAGE_BASE, cmn.getUIPos(cmn.UI_GAGE_BASE).x, cmn.getUIPos(cmn.UI_GAGE_BASE).y);
	imgBar_base.update.add(function () {
			if(!gameCore.demo_mode){
				if(input_power>=POWER_MAX){
					imgBar_base.opacity = 1.0 - Math.floor(globalCntr /5 % 10)*0.05;
					imgBar_base.modified();
				}else{
					imgBar_base.opacity = 1.0;
					imgBar_base.modified();
				}
			}else{
				if(demo_power>=POWER_MAX){
					imgBar_base.opacity = 1.0 - Math.floor(globalCntr /5 % 10)*0.05;
					imgBar_base.modified();
				}else{
					imgBar_base.opacity = 1.0;
					imgBar_base.modified();
				}
			}
			
	});
	root.append(imgBar_base);
	
	//ゲージ-フレーム
	var imgBar_frame = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_GAGE_FRAME, cmn.getUIPos(cmn.UI_GAGE_FRAME).x, cmn.getUIPos(cmn.UI_GAGE_FRAME).y);
	root.append(imgBar_frame);
	
	return root;

}

//パワーゲージ増減 (0～100を指定)
function setUIPower( power ){
	var power_bar = imgUI_power.children[0].children[1];
	
	var no = cmn.UI_GAGE_BASE;
	var uiSrcY = cmn.getSpriteData(cmn.TBL_UI,no,1);
	var spH = cmn.getSpriteData(cmn.TBL_UI,no,3) - uiSrcY;
	
	var barh = 108; // 実ゲージサイズ
	var side_btm = 15;
	
	var draw_h = side_btm + (barh / POWER_MAX * power);
	power_bar.srcHeight = draw_h;
	power_bar.srcY = uiSrcY + (spH - draw_h);
	power_bar.y = cmn.getUIPos(cmn.UI_GAGE_BASE).y + spH - draw_h;
	power_bar.modified();
	
	imgUI_power.modified();
}

//ゲージ切り替えアニメーション
function animChangeGage(){
	var sub_t = globalCntr - global_lastTouch;
	var tmp_num = 0;
	if(sub_t < 10){
		tmp_num = Math.floor(sub_t/2%5);
		imgUI_power.scaleX = 1.0-tmp_num*0.2;
		if(sub_t == 9){
			imgUI_bariki.scaleX = 0.1;
			imgUI_bariki.modified();
			imgUI_bariki.show();
			
			imgUI_power.scaleX = 0.1;
			imgUI_power.modified();
			imgUI_power.hide();
		}
		imgUI_power.modified();
	}else if(sub_t < 20){
		tmp_num = Math.floor(sub_t/2%5);
		imgUI_bariki.scaleX = tmp_num*0.1;
		if(sub_t == 19){
			imgUI_bariki.scaleX = 1.0;
			imgUI_bariki.modified();
		}
	}
}


//------------------
//テロップ・現座地ゲージ生成
//------------------
function createUIGage( scene ){
	var root = new g.E({scene: scene, x: 0, y: 0});

	//テロップ
	var imgTelop_base = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_UIBASE_TELOP, cmn.getUIPos(cmn.UI_UIBASE_TELOP).x, cmn.getUIPos(cmn.UI_UIBASE_TELOP).y);
	root.append(imgTelop_base);
	
	//現在地ゲージ
	var imgPos_base = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_UIBASE_POS, cmn.getUIPos(cmn.UI_UIBASE_POS).x, cmn.getUIPos(cmn.UI_UIBASE_POS).y);
	root.append(imgPos_base);
	
	return root;
}


//------------------
//大砲管理
//------------------
//大砲角度設定
function setCannonAngle( angle ){
	imgCannonTv.angle = angle;
	imgCannonTv.modified();
	
	imgCannon.angle = angle;
	imgCannon.modified();
}

//現在地カーソル位置設定(yは、固定)
function setCursorPos( posx ){
	imgUI_cursor.x = cmn.getUIPos(cmn.UI_CURSOR_POS).x + posx;
	imgUI_cursor.modified();
}


//------------------
//プレイヤークラス
//------------------
function Player(){
	this.flyF = false; // 発射フラグ
	this.old_posX = 0;
	this.old_posY = 0;
	this.posX = 0;
	this.posY = 0;
	this.ply_time = 0;
	this.ply_v = 0; // 初速
	this.ply_r = 0; // 角度
	
	this.hit_no = [0]; // ヒットID配列(固有ID格納)
	this.hit_type = [0]; // ヒットtype配列(タイプ番号格納)
	this.hit_bln = -1;
	this.anglepower = 1.0;
	
	this.bariki = BARIKI_MAX;
	this.bariki_time = 0;
	this.bariki_type = -1;
	this.bariki_animtime = 0;
	
	this.touch_starttime = 0;
	
	this.ply_value_x = 0; // X座標用補正値(馬力用)
	
	this.tag_no = -1;	// タグ管理用
	this.tag_time = 0;
	cmn.setPlyTagNo(this.tag_no);
	
	this.eff_wtr = false; // 水しぶきエフェクト管理
	this.bg_insea = false; // 背景判定用(海進入)
	
	this.angle = 0; // 表示用角度
}

// プレイヤー状態更新
Player.prototype.update = function(clicked) {

	//タグ効果
	if(this.tag_no >= cmn.TAG_ID_1){
		if(this.tag_time%30 == 0){
			cmn.playSE(cmn.SND_SE_4);
		}
		this.tag_time --;
		if(this.tag_time <= 0){
			this.tag_time = 0;
			this.tag_no = -1;
			setImgPlyTag(this.tag_no);
			cmn.setPlyTagNo(this.tag_no);
		}
	}
	
	//馬力処理
	if(clicked && (globalCntr - this.touch_starttime > fps/BARIKI_TYPE_TIME)){
		this.onBariki(1);
	}
	
	this.ply_time ++;
	//タグ効果(うなぎのぼり)
	if(this.tag_no == cmn.TAG_ID_1){
		this.ply_time = 0;
	}
	//移動処理
	if(this.ply_value_x == 0){
		this.old_posX = this.ply_v * Math.cos(cmn.getRadian(this.ply_r)) / 2;
	}else{
		this.old_posX = this.ply_value_x * Math.cos(cmn.getRadian(this.ply_r)) / 2;
	}
	this.old_posY = this.ply_v * Math.sin(cmn.getRadian(this.ply_r)) - this.ply_time * gf;
	
	this.posX = this.posX - this.old_posX;
	this.posY = this.posY - this.old_posY;
	
	if(this.bariki_time > 0){
		this.bariki_time --;
		if(this.bariki_time <= 0){
			this.bariki_time = 0;
		}
	}
	updateBariki();
};

//馬力処理 0:クリック 1:長押し
Player.prototype.onBariki = function(type) {
	if(this.posX <= cmn.BG_WIDTH-game.width){ // 画面終端は、操作不可
		if(type == 0){
			if(this.bariki_time == 0 && this.bariki >= PLAYER_1BARIKI){
				this.bariki -= PLAYER_1BARIKI;
				this.bariki_time = PLAYER_INVALIDTIME_BARIKI;
				setUIBariki(this.bariki);
				
				//タグ解除
				switch(this.tag_no){
				case cmn.TAG_ID_1: // うなぎのぼり
					this.tag_no = -1;
					this.tag_time = 0;
					setImgPlyTag(this.tag_no);
					break;
				case cmn.TAG_ID_3: // 下降(急降下)
					this.tag_no = -1;
					this.tag_time = 0;
					setImgPlyTag(this.tag_no);
					break;
				}
				cmn.setPlyTagNo(this.tag_no);
				
				this.ply_time = 0;
				
				this.bariki_type = type;
				this.bariki_animtime = globalCntr;
				
				this.ply_r = 45+90;
				if(this.ply_value_x == 0){ // x座標移動値確保
					this.ply_value_x = this.ply_v;
				}
				this.ply_v = POWER_MAX/3;
				if(this.ply_value_x <= this.ply_v){ //x移動値が確保したものより、高ければ確保
					this.ply_value_x = this.ply_v;
				}
				onEffect(cmn.EFF_BARIKI_B, this.posX-90/2-25, this.posY+PLY_HEIGHT-90/2, -45, group_bg);
				
				cmn.playSE(cmn.SND_SE_1);
			}
		}else if(type == 1){
			if(this.bariki_time == 0 && this.bariki >= 1){	
				
				this.bariki -= PLAYER_1BARIKI_S;
				this.bariki_time = PLAYER_TIME_BARIKI_R;
				setUIBariki(this.bariki);

				var repeat_count = Math.floor((globalCntr - (this.touch_starttime+fps/BARIKI_TYPE_TIME)) / PLAYER_TIME_BARIKI_R +1);
				this.ply_time = 0;
				
				if(this.bariki_animtime == 0){
					this.bariki_type = type;
					this.bariki_animtime = globalCntr;
				}
				this.ply_r = 45+90;
				if(this.ply_value_x == 0){
					this.ply_value_x = this.ply_v;
				}
				if(repeat_count == 1){
					this.ply_v = POWER_MAX/12;
				}else{
					this.ply_v += POWER_MAX/12;
				}
				if(this.ply_v >= POWER_MAX/2) this.ply_v = POWER_MAX/2;
				if(this.ply_value_x <= this.ply_v){ //x移動値が確保したものより、高ければ確保
					this.ply_value_x = this.ply_v;
				}
				onEffect(cmn.EFF_BARIKI_S, this.posX-90/2-25, this.posY+PLY_HEIGHT-90/2, -45, group_bg);
				
				cmn.playSE(cmn.SND_SE_1);
			}else{
				if(this.bariki <= 0){
					//馬力値無し
					this.bariki_type = -1;
					this.bariki_animtime = 0;
					setBtnBariki(false);
				}
			}
		}
	}
};

//発射時のスタート位置算出
Player.prototype.setStartPosAngle = function(angle) {
	var posx = 90 * Math.cos(cmn.getRadian(angle)) + 128 -PLY_WIDTH/2 + cmn.getUIPos(cmn.UI_CANNONTV).x;
	var posy = 90 * Math.sin(cmn.getRadian(angle)) + 128 -PLY_HEIGHT/2 + (cmn.getUIPos(cmn.UI_CANNONTV).y + (cmn.BG_HEIGHT-game.height));
	
	this.posX = posx;
	this.posY = posy;
};


//------------------
//プレイヤー画像管理
//------------------
function createImgPly(scene){
	var root = new g.E({scene: scene, width: PLY_WIDTH, height: PLY_HEIGHT, x:cmn.getUIPos(cmn.UI_CHARA_TV).x, y:cmn.getUIPos(cmn.UI_CHARA_TV).y+(cmn.BG_HEIGHT-game.height)});
	root.tag = -1;
	
	//タグエフェクト
	var tag_eff = new g.E({scene: scene, width: PLY_WIDTH, height: PLY_HEIGHT, x:0, y:0});
	var spr_eff_1 = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_TAGICON_1, 40, -23);
	spr_eff_1.hide();
	tag_eff.append(spr_eff_1);
	var spr_eff_2 = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_TAGICON_2, 40, -23);
	spr_eff_2.hide();
	tag_eff.append(spr_eff_2);
	var spr_eff_3 = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_TAGICON_3, 40, -23);
	spr_eff_3.hide();
	tag_eff.append(spr_eff_3);
	var spr_eff_4 = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_TAGICON_6, -46, -46);
	spr_eff_4.hide();
	tag_eff.append(spr_eff_4);
	root.append(tag_eff);
	
	//テレビちゃん
	var spr_ply = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_CHARA_TV, 0, 0);
	root.append(spr_ply);
	return root;
}

//プレイヤー画像座標設定
function setImgPlyPos(posx, posy) {
	imgPly.x = posx;
	imgPly.y = posy;
	imgPly.modified();
}

//プレイヤー画像角度設定
function setImgPlyAngle(angle) {
	if(gameCore.pc.tag_no == cmn.TAG_ID_4){ // 無敵以外回転無し
		imgPly.children[0].angle = angle;
		imgPly.children[0].modified();
	}else{
		imgPly.children[0].angle = 0;
		imgPly.children[0].modified();
	}
	imgPly.children[1].angle = angle;
	imgPly.children[1].modified();
	imgPly.modified();
}

//プレイヤー画像タグアイコン設定
function setImgPlyTag(tag_no) {
	for(var i = 0; i < imgPly.children[0].children.length; i++){
		imgPly.children[0].children[i].hide();
	}
	if(tag_no == cmn.TAG_ID_1){ // うなぎのぼり
		imgPly.children[0].children[0].show();
	}else if(tag_no == cmn.TAG_ID_2){ // ゆっくり
		imgPly.children[0].children[1].show();
	}else if(tag_no == cmn.TAG_ID_3){ // 下降
		imgPly.children[0].children[2].show();
	}else if(tag_no == cmn.TAG_ID_4){ // 無敵
		imgPly.children[0].children[3].show();
	}
	imgPly.children[0].modified();
	imgPly.modified();
}


//------------------
//ゲームコアクラス
//------------------
function GameCore(scene){
	this.scene = scene;
	this.reset();
}

//ゲーム情報初期化
GameCore.prototype.reset = function(){
	this.state = STEP_TITLE;
	this.prev_state = this.state;
	this.touched = false;
	this.pc = null;
	this.entities = [];
	this.demo_mode = false;
	this.demo_step = DEMO_START;
	this.demo_time = 0;
	this.telop = 0;
	this.prev_telop = this.telop;
	this.miss_end = false;
};

//ゲーム開始
GameCore.prototype.start = function(){
	initBg();
	this.setState(STEP_GAME_STANDBY);
	this.touched = false;
	this.miss_end = false;
	this.pc = new Player();
	imgUI_power.scaleX = 1.0;
	imgUI_power.show();
	imgUI_gage.show();
	imgUI_tuto.show();
};

//ステータス設定
GameCore.prototype.setState = function(state){
	if(STEP_PAUSE > this.state){
		this.prev_state = this.state;
	}
	this.state = state;
};

//ステータス取得
GameCore.prototype.getState = function(){
	return this.state;
};

//1つ前のステータス取得
GameCore.prototype.getPrevState = function(){
	return this.prev_state;
};

//テロップ設定
GameCore.prototype.setTelop = function(telopno){
	if(this.pc.tag_no == -1){ // 通常テロップ
		this.prev_telop = this.telop;
		this.telop = telopno;
		sub.setTelop(gameCore.scene,imgUI_gage,this.telop);
	}else if(this.pc.tag_no >= cmn.TAG_ID_1){ // タグテロップ
		this.prev_telop = this.telop;
		if(this.pc.tag_no == cmn.TAG_ID_1){ // うなぎのぼり(急上昇)
			this.telop = cmn.UI_TELOP_TAG1_1;
		}else if(this.pc.tag_no == cmn.TAG_ID_2){ // ゆっくり
			this.telop = cmn.UI_TELOP_TAG2_1;
		}else if(this.pc.tag_no == cmn.TAG_ID_3){ // 急降下
			this.telop = cmn.UI_TELOP_TAG3;
		}else if(this.pc.tag_no == cmn.TAG_ID_4){ // 無敵
			this.telop = cmn.UI_TELOP_TAG4;
		}
		
		sub.setTelop(gameCore.scene,imgUI_gage,this.telop);
	}
};

//テロップ取得
GameCore.prototype.getTelop = function(){
	return this.telop;
};

//1つ前のテロップ取得
GameCore.prototype.getPrevTelop = function(){
	return this.prev_telop;
};

//デモスタート
GameCore.prototype.StartDemo = function(){
	this.demo_mode = true;
	this.demo_step = DEMO_START;
	this.demo_time = 0;
	
	imgUI_adv.show();
	
	gameCore.start();
	imgUI_title.touchable = false;
	imgUI_title.hide();
	
	//ボタン非表示
	var ui_base = imgUI_base.children[0];
	ui_base.children[5].hide();
	offBtnSnd();
	
	//デモ用画像初期化
	imgUI_adv.children[0].opacity = 1.0;
	imgUI_adv.children[0].modified();
	imgUI_adv.children[1].angle = 0;
	imgUI_adv.children[1].modified();
};

//デモ終了
GameCore.prototype.EndDemo = function(){
	imgUI_adv.hide();
	imgUI_rectF.hide();
	
	imgUI_tuto.children[0].hide();
	imgUI_tuto.hide();
	imgUI_power.hide();
	
	this.setTelop(-1);
	sub.resetTelop();
	imgUI_gage.hide();
	
	//ボタン表示
	var ui_base = imgUI_base.children[0];
	ui_base.children[5].show();
	onBtnSnd();
	
	landGame();
	
	this.demo_mode = false;
	this.demo_step = DEMO_START;
	this.demo_time = 0;
	
	restartTitle();
};

//デモ定期処理
var demo_angle = 0;
var demo_power = 0;
var demo_startx = 0; // 初期位置
var demo_starty = 0;
var demo_nowx = 0; // 現在位置
var demo_nowy = 0;
var demo_movex = 0;
var demo_movey = 0;
GameCore.prototype.updateDemo = function(){
	if(this.demo_mode){
		switch(this.demo_step){
		case DEMO_START:
			this.demo_time ++;
			if(this.demo_time >= 60){
				this.demo_step = DEMO_FIRE;
				this.demo_time = 0;
			}
			break;
		case DEMO_FIRE:
			var cld_no = 0;
			this.demo_time ++;
			if(this.demo_time == 1){
				demo_nowx = demo_startx = game.width/2;
				demo_nowy = demo_starty = game.height/2;
				
				demo_angle = CANNON_ANGLE;
				demo_power = 0;
				setUIPower(demo_power);
				
				cld_no = 0;
				var tmp_w = imgUI_tuto.children[cld_no].width;
				var tmp_h = imgUI_tuto.children[cld_no].height;
				imgUI_tuto.children[cld_no].x = demo_startx-tmp_w/2;
				imgUI_tuto.children[cld_no].y = demo_starty-tmp_h/2;
				imgUI_tuto.children[cld_no].angle = 315;
				imgUI_tuto.children[cld_no].scaleX = 0.25;
				imgUI_tuto.children[cld_no].modified();
				imgUI_tuto.children[cld_no].show();
				imgUI_tuto.show();
				
				cmn.playSE(cmn.SND_SE_1);
				
				//目標移動値を設定
				demo_movex = -cmn.getRandom(80) + 10 - 1;
				demo_movey = cmn.getRandom(80) + 10 - 1;
			}else if(2 <= this.demo_time && this.demo_time < 62){
				demo_nowx += (demo_movex*1.0/60.0);
				demo_nowy += (demo_movey*1.0/60.0);
				if(demo_startx + demo_movex >= demo_nowx){
					demo_nowx = demo_startx + demo_movex;
				}
				if(demo_starty + demo_movey <= demo_nowy){
					demo_nowy = demo_starty + demo_movey;
				}
				
				var dis = Math.sqrt((demo_nowx - demo_startx) * (demo_nowx - demo_startx) + (demo_nowy - demo_starty) * (demo_nowy - demo_starty));
				var rad = Math.atan2(demo_nowy - demo_starty,demo_nowx - demo_startx);
				var deg = cmn.getDegrees(rad);
				
				//角度調整
				demo_angle = deg + 180;
				if( 0 <= demo_angle && demo_angle <= 180) demo_angle = 360;
				if( 180 < demo_angle && demo_angle <= 270) demo_angle = 270;
				setCannonAngle(demo_angle);
				this.pc.setStartPosAngle(demo_angle);
				setImgPlyPos(this.pc.posX,this.pc.posY);
				
				//パワー調整
				var control_value = 80;
				var power_sub = 10;
				var sub_p = (dis-power_sub) / control_value;
				if(sub_p <= 0) sub_p = 0;
				if(sub_p >= 1.0) sub_p = 1.0;
				
				demo_power = POWER_MAX * sub_p;
				setUIPower(demo_power);
				
				cld_no = 0;
				imgUI_tuto.children[cld_no].angle = demo_angle;
				imgUI_tuto.children[cld_no].scaleX = 0.25 + (0.75*sub_p);
				imgUI_tuto.children[cld_no].modified();
				
				if(this.demo_time%10 == 0){
					cmn.playSE(cmn.SND_SE_1);
				}
				
			}else if(this.demo_time == 120){
				//発射準備
				imgUI_tuto.hide();
				//ヘルプボタン非表示
				imgUI_base.children[0].children[5].hide();
				//火花エフェクト生成
				onEffect(cmn.EFF_SPARK_2, 72, 60, 0, imgCannonTv);
				cmn.playSE(cmn.SND_SE_1);
				this.setState(STEP_GAME_);
			}
			break;
		case DEMO_FLY:
			this.demo_time ++;
			if(this.getState() >= STEP_GAME_FLY){
				if(this.getState() === STEP_GAME_FLY){
					if(this.demo_time >= fps){
						if(cmn.getRandom(50) == 25){
							this.demo_step = DEMO_FLY_B;
							this.demo_time = 0;
						}
					}
				}
				else{
					this.demo_step = DEMO_END;
					this.demo_time = 0;
				}
			}
			break;
		case DEMO_FLY_B:
			this.demo_time ++;
			if(this.demo_time >= fps/4){
				this.pc.onBariki(0);
				setBtnBariki(false);
				this.demo_step = DEMO_FLY;
				this.demo_time = 0;
			}
			break;
		case DEMO_END:
			break;
		}
		
		//アニメーション処理
		//テキスト
		var tmp_sprText = imgUI_adv.children[0];
		tmp_sprText.opacity = 1.0 - Math.floor(globalCntr /5 % 10)*0.05;
		tmp_sprText.modified();
		//アイコン
		var tmp_num = (globalCntr % 300);
		if( 0 <= tmp_num && tmp_num <= 40){
			var tmp_tbl = [-5,5];
			var tmp_no = Math.floor(tmp_num /6 %2);
			var tmp_sprIcon = imgUI_adv.children[1];
			tmp_sprIcon.angle = 0 + tmp_tbl[tmp_no];
			if(tmp_num == 40) tmp_sprIcon.angle = 0;
			tmp_sprIcon.modified();
		}
	}
};

//デモ発射処理
GameCore.prototype.demoStartFire = function(){
	//発射
	this.pc.ply_time = 0;
	this.pc.setStartPosAngle(demo_angle);
	this.pc.old_posX = this.pc.posX;
	this.pc.old_posY = this.pc.posY;
	setImgPlyPos(this.pc.posX,this.pc.posY);
	
	cursor_startx = this.pc.posX;
	this.pc.ply_v = demo_power;
	this.pc.ply_r = 180 + demo_angle;
	this.pc.flyF = true;
	
	imgPly.show();
	imgCannonTv.hide();
	imgCannon.show();
	imgUI_tuto.children[0].hide();
	
	//発射エフェクト生成
	this.createEffFire();
	cmn.playSE(cmn.SND_SE_6);
	
	setBtnBariki(false);
	setUIBariki(this.pc.bariki);
	
	//テロップ生成
	this.setTelop(cmn.UI_TELOP_1);
};

//当たり判定
GameCore.prototype.checkCollision = function(){
	
	var pc = this.pc;
	var bg = group_bg;
	var tmp_w = 0;
	var tmp_h = 0;
	
	//当たり判定
	if(pc.flyF){
		for(var i = 2; i < bg.children.length; i++){
			var check_flg = true;
			//当たり重複チェック
			for(var j = 0 ; j < pc.hit_no.length; j++){
				if(this.pc.hit_no[j] == bg.children[i].id){
					check_flg = false;
				}
			}
			
			if(check_flg){
				var obj_x = bg.children[i].x;
				var obj_y = bg.children[i].y;
				var obj_w = bg.children[i].width;
				var obj_h = bg.children[i].height;
				var obj_tag = bg.children[i].tag; // 種別ID
				var obj_id = bg.children[i].id; // 固有ID
				if( 0 <= obj_tag && obj_tag < cmn.MAP_OBJ_MAX){ // タグにて当たり判定するオブジェクトを判断
					// オブジェクトのレンジ調整
					var size = getHitRectSize(obj_tag);
					if(0 <= obj_tag && obj_tag <= 9){ // アドバルーン
						if(cmn.checkPosRect(pc.posX+PLY_WIDTH/2,pc.posY+PLY_HEIGHT/2,obj_x+obj_w/2-size/2,obj_y+obj_h/2-size/2,size,size)){
							
							var obj_cx = obj_x + obj_w/2;
							var obj_cy = obj_y + obj_h/2;
							var ply_cx = pc.posX+PLY_WIDTH/2;
							var ply_cy = pc.posY+PLY_HEIGHT/2;
							var dis = Math.sqrt((ply_cx - obj_cx) * (ply_cx - obj_cx) + (ply_cy - obj_cy) * (ply_cy - obj_cy));
							var rad = Math.atan2(ply_cy - obj_cy,ply_cx - obj_cx);
							
							var sub_y = Math.sin(rad) * (dis*0.8);
							var sub_x = Math.cos(rad) * (dis*0.8);
							onEffect(cmn.EFF_HIT, obj_w/2-90/2 + sub_x, obj_h/2-90/2 + sub_y, 0, bg.children[i]);
							
							pc.hit_no.push(obj_id);
							pc.hit_type.push(obj_tag);
							return obj_tag;
						}
					}else if(obj_tag == cmn.MAP_MISS_SHIP){ //クルーザー
						//当たり判定を小さめに。
						tmp_w = 162;
						tmp_h = 72;
						obj_x = obj_x+obj_w/2 - tmp_w/2;
						obj_y = obj_y+obj_h/2 - tmp_h/2;
						if(cmn.checkPosRect(pc.posX+PLY_WIDTH/2,pc.posY+PLY_HEIGHT/2,obj_x,obj_y,tmp_w,tmp_h)){
							pc.hit_type.push(obj_tag);
							pc.hit_no.push(obj_id);
							bg.children[i].setAction();
							return obj_tag;
						}
					}else if(obj_tag == cmn.MAP_MISS_KOUMEI){ //孔明の罠
						//当たりを大きく取る必要がある
						tmp_w = obj_w * 1.5;
						tmp_h = obj_h * 1.5;
						obj_x = obj_x+obj_w/2 - tmp_w/2;
						obj_y = obj_y+obj_h/2 - tmp_h/2;
						if(cmn.checkPosRect(pc.posX+PLY_WIDTH/2,pc.posY+PLY_HEIGHT/2,obj_x,obj_y,tmp_w,tmp_h)){
							pc.hit_type.push(obj_tag);
							pc.hit_no.push(obj_id);
							bg.children[i].setAction();
							return obj_tag;
						}
					}else if(obj_tag == cmn.MAP_MISS_HOLE){ //土管
						//当たり判定を小さめに。
						tmp_w = 70;
						tmp_h = 100;
						obj_x = obj_x+obj_w/2 - tmp_w/2 -10;
						obj_y = obj_y+obj_h/2 - tmp_h/2 -5;
						if(cmn.checkPosRect(pc.posX+PLY_WIDTH/2,pc.posY+PLY_HEIGHT/2,obj_x,obj_y,tmp_w,tmp_h)){
							pc.hit_type.push(obj_tag);
							pc.hit_no.push(obj_id);
							bg.children[i].setAction();
							return obj_tag;
						}
					}else if(obj_tag == cmn.MAP_CLOUD){ //雲-大
						//当たり判定を小さめに。
						tmp_w = obj_w*0.7;
						tmp_h = obj_h*0.6;
						obj_x = obj_x+obj_w/2 - tmp_w/2-6;
						obj_y = obj_y+obj_h/2 - tmp_h/2+8;
						if(cmn.checkPosRect(pc.posX+PLY_WIDTH/2,pc.posY+PLY_HEIGHT/2,obj_x,obj_y,tmp_w,tmp_h)){
							if(pc.tag_no == cmn.TAG_ID_4){ // タグ【無敵】時は、別値として格納
								pc.hit_type.push(obj_tag + TAG_MUTEKI);
							}else{
								pc.hit_type.push(obj_tag);
							}
							pc.hit_no.push(obj_id);
							bg.children[i].setAction();
							return obj_tag;
						}
					}else if(obj_tag == cmn.MAP_CLOUD+1){ //雲-小
						//当たり判定を小さめに。
						tmp_w = obj_w*0.8;
						tmp_h = obj_h*0.6;
						obj_x = obj_x+obj_w/2 - tmp_w/2;
						obj_y = obj_y+obj_h/2 - tmp_h/2;
						if(cmn.checkPosRect(pc.posX+PLY_WIDTH/2,pc.posY+PLY_HEIGHT/2,obj_x,obj_y,tmp_w,tmp_h)){
							if(pc.tag_no == cmn.TAG_ID_4){ // タグ【無敵】時は、別値として格納
								pc.hit_type.push(obj_tag + TAG_MUTEKI);
							}else{
								pc.hit_type.push(obj_tag);
							}
							pc.hit_no.push(obj_id);
							bg.children[i].setAction();
							return obj_tag;
						}
					}else{ // その他
						if(cmn.checkPosRect(pc.posX+PLY_WIDTH/2,pc.posY+PLY_HEIGHT/2,obj_x,obj_y,obj_w,obj_h)){
							if(cmn.MAP_COMMENT <= obj_tag && obj_tag < cmn.MAP_TAGU){ //コメント
								if(pc.tag_no == cmn.TAG_ID_4){ // タグ【無敵】時は、別値として格納
									pc.hit_type.push(obj_tag + TAG_MUTEKI);
								}else{
									pc.hit_type.push(obj_tag);
								}
							}else{
								pc.hit_type.push(obj_tag);
							}
							pc.hit_no.push(obj_id);
							
							bg.children[i].setAction();
							return obj_tag;
						}
					}
				}
			}
		}
	}
	return -1;
};

//矩形当たり判定用サイズ取得
function getHitRectSize(tag_no) {
	var size = 0;
	if(0 <= tag_no && tag_no <= 9){ // アドバルーン
		size = 124/2;
	}else{
		//サイズ設定
		size = 128/2;
	}
	return size;
}

//ゲーム状態更新
GameCore.prototype.update = function(clicked){
	if (this.pc) {
		if(this.getState() === STEP_GAME_FLY && gameCore.pc.flyF){
			this.pc.update(clicked);
			var hit_tag = this.checkCollision();
			if(hit_tag >= 0){
				if(hit_tag == cmn.MAP_CLOUD || hit_tag == cmn.MAP_CLOUD+1){ // 雲
					//デバフタグ解除
					switch(this.pc.tag_no){
					case cmn.TAG_ID_3: // 下降(急降下)
						this.pc.tag_no = -1;
						this.pc.tag_time = 0;
						setImgPlyTag(this.pc.tag_no);
						cmn.setPlyTagNo(this.pc.tag_no);
						break;
					}
					
					//バウンド
					this.pc.ply_time = 0;
					if(this.pc.ply_r < 0){ // コメント弾幕で、落下中
						this.pc.ply_r *= -1;
					}
					if(this.pc.tag_no != cmn.TAG_ID_4){ // 無敵中は、バウンドのみ(減衰なし)
						this.pc.ply_v *= HIT_OBJ1_VALUE;
						this.pc.anglepower *= HIT_OBJ1_VALUE;
					}
					cmn.playSE(cmn.SND_SE_5);
					this.pc.angle += (PLAYER_ANGLE*this.pc.anglepower);
					setImgPlyAngle(this.pc.angle);
				}else if(cmn.MAP_COMMENT <= hit_tag && hit_tag < cmn.MAP_TAGU){ // コメント弾幕
					if(this.pc.tag_no != cmn.TAG_ID_4){ // 無敵中は、無視
						
						if(this.pc.tag_no == cmn.TAG_ID_1){ // 上昇効果中の場合、効果解除
							this.pc.tag_time = 0;
							this.pc.tag_no = -1;
							setImgPlyTag(this.pc.tag_no);
						}
						
						this.pc.ply_time = 0;
						if(this.pc.ply_r >= 0){ // 既に落下中でなければ
							this.pc.ply_r *= -1;
						}
						this.pc.ply_v *= HIT_OBJ1_VALUE;
						this.pc.anglepower *= HIT_OBJ1_VALUE;
						this.pc.angle += (PLAYER_ANGLE*this.pc.anglepower);
						setImgPlyAngle(this.pc.angle);
						
						cmn.playSE(cmn.SND_SE_5);
					}else{
						cmn.playSE(cmn.SND_SE_6);
					}
				}else if(cmn.MAP_TAGU <= hit_tag && hit_tag < cmn.MAP_MISS_SHIP){ // タグ
					var tag_no = hit_tag - 2000;
					switch(tag_no){
					case cmn.TAG_ID_1: // うなぎのぼり(急上昇)
						this.pc.tag_no = tag_no;
						this.pc.tag_time = 60*3;
						
						this.pc.ply_time = 0;
						if(this.pc.ply_r <= 60+90){
							this.pc.ply_r = 60+90;
						}
						this.pc.ply_v = POWER_MAX*0.5;
						this.pc.anglepower = 1.0;
						cmn.playSE(cmn.SND_SE_4);
						setImgPlyTag(this.pc.tag_no);
						break;
					case cmn.TAG_ID_2: // ゆっくり(スクロールゆっくり)
						this.pc.tag_no = tag_no;
						this.pc.tag_time = 60*5;
						cmn.playSE(cmn.SND_SE_4);
						setImgPlyTag(this.pc.tag_no);
						break;
					case cmn.TAG_ID_3: // 下降(急降下)
						this.pc.tag_no = tag_no;
						this.pc.tag_time = 60*3;
						
						//雲や、コメント弾幕と違い、角度のみ変更
						this.pc.ply_time = 0;
						if(this.pc.ply_r >= 0){ // 既に落下中でなければ
							//this.pc.ply_r = 60+90;
							this.pc.ply_r *= -1;
						}
						this.pc.ply_v = POWER_MAX*1.0;
						cmn.playSE(cmn.SND_SE_4);
						setImgPlyTag(this.pc.tag_no);
						break;
					case cmn.TAG_ID_4: // 無敵モード
						this.pc.tag_no = tag_no;
						this.pc.tag_time = 60*6;
						cmn.playSE(cmn.SND_SE_4);
						setImgPlyTag(this.pc.tag_no);
						break;
					}
					cmn.setPlyTagNo(this.pc.tag_no);
				}else if(cmn.MAP_MISS_SHIP == hit_tag){ // ニコ生クルーズ
					cmn.playSE(cmn.SND_SE_2);
					createMissAnim(1);
				}else if(cmn.MAP_MISS_KOUMEI == hit_tag){ // 孔明の罠
					//待機
				}else if(cmn.MAP_MISS_HOLE == hit_tag){ // 土管
					if(this.pc.tag_no != cmn.TAG_ID_4){ //通常時は、ゲームオーバー
						cmn.playSE(cmn.SND_SE_2);
						createMissAnim(3);
					}else{ // 無敵中は、バウンド
						//バウンド
						this.pc.ply_time = 0;
						if(this.pc.ply_r < 0){ // コメント弾幕で、落下中
							this.pc.ply_r *= -1;
						}
						cmn.playSE(cmn.SND_SE_5);
						this.pc.angle += (PLAYER_ANGLE*this.pc.anglepower);
						setImgPlyAngle(this.pc.angle);
					}
				}else if(cmn.MAP_BG_ANIM <= hit_tag && hit_tag < cmn.MAP_OBJ_MAX){ // 背景演出
					//待機
				}else if(0 <= hit_tag && hit_tag <= 9){ // アドバルーン
					//ゲームクリア
					this.pc.flyF = false;
					this.setState(STEP_GAME_HITBLN);
					this.pc.hit_bln = hit_tag;
					imgUI_bariki.hide();
					cmn.playSE(cmn.SND_SE_2);
				}
				
			}
			
			//背景との当たり判定
			var ground_h = 47;
			var miss_num = 0;
			if((this.pc.posX <= BG_GROUND_START_X || // 開始地点付近(砂浜)
				this.pc.posX >= BG_GROUND_GOAL_X) && // ゴール付近(地面)
				this.pc.posY < cmn.BG_HEIGHT){

				if (this.pc.posY >= cmn.BG_HEIGHT-game.height && this.pc.posY+PLY_HEIGHT > cmn.BG_HEIGHT-ground_h){ // 地面当たり判定
					//バウンド処理
					this.pc.posY = cmn.BG_HEIGHT-(ground_h+1)-PLY_HEIGHT;
					this.createEffCDust();
					//地面接触タグ解除
					switch(this.pc.tag_no){
					case cmn.TAG_ID_3: // 下降(急降下)
						this.pc.tag_no = -1;
						this.pc.tag_time = 0;
						setImgPlyTag(this.pc.tag_no);
						cmn.setPlyTagNo(this.pc.tag_no);
						break;
					}
					this.pc.ply_time = 0;
					this.pc.anglepower *= HIT_BG_VALUE;
					this.pc.ply_v *= HIT_BG_VALUE;
					if(this.pc.ply_r < 0) this.pc.ply_r *= -1;
					//バウンド終了判定
					if(this.pc.ply_v < 1.5){
						landGame();
					}else{
						cmn.playSE(cmn.SND_SE_4);
					}
				}else if(this.pc.posX >= cmn.BG_WIDTH-game.width/2+PLY_WIDTH){ // 画面終端判定
					//カメラ追従停止の場合、画面から消えたら、ゲームオーバー
					if(this.pc.posY < cmn.BG_HEIGHT-1000){ // 青空以外でゲームオーバーの場合
						if(!gameCore.demo_mode){ // 通常プレイ時のみ(デモでは、出現しない)
							miss_num = cmn.getRandom(100);
							if(miss_num < 20){ // 確率 1/5
								createMissAnim(5);
							}else{
								landGame();
							}
						}else{
							landGame();
						}
					}else{
						landGame();
					}
				}else if(this.pc.posY+PLY_HEIGHT*2 <= 0){ // 画面上限判定
					if(!gameCore.demo_mode){ // 通常プレイ時のみ(デモでは、出現しない)
						miss_num = cmn.getRandom(100);
						if(miss_num < 20){ // 確率 1/5
							createMissAnim(5);
						}else{
							landGame();
						}
					}else{
						landGame();
					}
				}
			}else{
				if(cmn.BG_HEIGHT - ground_h <= this.pc.posY+PLY_HEIGHT/2 && this.pc.posY+PLY_HEIGHT/2 < cmn.BG_HEIGHT - PLY_HEIGHT/2){ // 水しぶき判定
					if(!this.pc.eff_wtr){
						//水しぶき
						var eff_x = cmn.getSpriteData(cmn.TBL_EFF, cmn.EFF_WATER_1,0);
						var eff_y = cmn.getSpriteData(cmn.TBL_EFF, cmn.EFF_WATER_1,1);
						var eff_w = cmn.getSpriteData(cmn.TBL_EFF, cmn.EFF_WATER_1,2) - eff_x;
						var eff_h = cmn.getSpriteData(cmn.TBL_EFF, cmn.EFF_WATER_1,3) - eff_y;
						onEffect(cmn.EFF_WATER_1, this.pc.posX+PLY_WIDTH/2-eff_w/2+18,cmn.BG_HEIGHT-ground_h/2-eff_h, 0, group_bg);
						this.pc.eff_wtr = true;
						cmn.playSE(cmn.SND_SE_3);
					}
					this.pc.bg_insea = true;
				}else if (this.pc.posY > cmn.BG_HEIGHT+PLY_HEIGHT){ // 海
					//海落下の場合、バウンド無し
					landGame();
				}else if(this.pc.posX >= cmn.BG_WIDTH-game.width/2+PLY_WIDTH){ // x座標画面外
					landGame();
				}
				else if(this.pc.posY+PLY_HEIGHT*2 <= 0){ // 画面上限判定
					if(!gameCore.demo_mode){ // 通常プレイ時のみ(デモでは、出現しない)
						miss_num = cmn.getRandom(100);
						if(miss_num < 20){ // 確率 1/5
							createMissAnim(5);
						}
					}else{
						landGame();
					}
				}else if(this.pc.eff_wtr){ // 水しぶき判定
					if(cmn.BG_HEIGHT - ground_h > this.pc.posY+PLY_HEIGHT/2 || this.pc.posY+PLY_HEIGHT/2 > cmn.BG_HEIGHT - PLY_HEIGHT/2){
						this.pc.eff_wtr = false;
					}
				}else if(this.pc.bg_insea){ // 入水チェック
					if(cmn.BG_HEIGHT - ground_h > this.pc.posY+PLY_HEIGHT/2){
						this.pc.bg_insea = false; // 空中
					}else{ // 水中の場合、ハズレ演出判定
						if(!gameCore.demo_mode){ // 通常プレイ時のみ(デモでは、出現しない)
							if(globalCntr%20 == 0){
								miss_num = cmn.getRandom(100);
								if(miss_num < 5){ // 確率 1/20
									createMissAnim(4);
								}
							}
						}
					}
				}
			}
		}
	}
	
	//子更新
	this.updateEntities();
	this.touched = false;
};

//子の更新処理(エフェクト)
GameCore.prototype.updateEntities = function() {
	var len = this.entities.length;
	for(var i = 0; i < len; i++) {
		var e = this.entities[i];
		if (! e) {
			continue;
		}
		if (typeof e.length === "undefined") { // 単体エフェクト
			if (! e.update()) {
				e.destroy();
				this.entities[i] = null;
			}
		}else{ // 複数エフェクト
			var tmp_cnt = 0;
			for (var j = 0; j < e.length; j++) {
				var e_sub = e[j];
				if (! e_sub) {
					continue;
				}
				if (! e_sub.update()) {
					e_sub.destroy();
					e[j] = null;
					tmp_cnt ++;
				}
			}
			if(tmp_cnt == e.length){
				this.entities[i] = null;
			}
		}
	}
};

//発射エフェクト生成
GameCore.prototype.createEffFire = function() {
	var tmp_entities = [];
	var eff_1 = new Effect(gameCore.scene, cmn.EFF_FIRE_B, 83+100, 53, 0, imgCannon, EG_FIRE, 0);
	var eff_2 = new Effect(gameCore.scene, cmn.EFF_FIRE_B, 83+110,103, 0, imgCannon, EG_FIRE, 1);
	var eff_3 = new Effect(gameCore.scene, cmn.EFF_FIRE_S, 83+100, 83, 0, imgCannon, EG_FIRE, 2);
	var eff_4 = new Effect(gameCore.scene, cmn.EFF_FIRE_S, 83+80, 103, 0, imgCannon, EG_FIRE, 3);
	var eff_5 = new Effect(gameCore.scene, cmn.EFF_FIRE_S, 83+70, 53, 0, imgCannon, EG_FIRE, 4);
	var eff_6 = new Effect(gameCore.scene, cmn.EFF_FIRE_S, 83+90, 63, 0, imgCannon, EG_FIRE, 5);
	eff_1.setParam(0.5,0.5,0.5);
	eff_2.setParam(0.5,0.5,0.5);
	eff_3.setParam(1.0,1.0,0.5);
	eff_4.setParam(0.75,0.75,0.5);
	eff_5.setParam(0.75,0.75,0.5);
	eff_6.setParam(0.6,0.6,0.5);
	tmp_entities.push(eff_1);
	tmp_entities.push(eff_2);
	tmp_entities.push(eff_3);
	tmp_entities.push(eff_4);
	tmp_entities.push(eff_5);
	tmp_entities.push(eff_6);
	this.entities.push(tmp_entities);
};

//土煙エフェクト生成
GameCore.prototype.createEffCDust = function() {
	var eff_no = 0;
	var eff_x = 0;
	var eff_y = 0;
	var eff_w = 0;
	var eff_h = 0;
	var eff_scalex = 1.0;
	var eff_scaley = 1.0;
	if(this.pc.ply_v <= POWER_MAX/4){
		eff_no = cmn.EFF_CDUST_S;
		eff_x = cmn.getSpriteData(cmn.TBL_EFF,eff_no,0);
		eff_y = cmn.getSpriteData(cmn.TBL_EFF,eff_no,1);
		eff_w = cmn.getSpriteData(cmn.TBL_EFF,eff_no,2) - eff_x;
		eff_h = cmn.getSpriteData(cmn.TBL_EFF,eff_no,3) - eff_y;
		
		eff_scalex = 0.5;
		eff_scaley = 0.5;
	}else if(this.pc.ply_v <= POWER_MAX/2){
		eff_no = cmn.EFF_CDUST_S;
		eff_x = cmn.getSpriteData(cmn.TBL_EFF,eff_no,0);
		eff_y = cmn.getSpriteData(cmn.TBL_EFF,eff_no,1);
		eff_w = cmn.getSpriteData(cmn.TBL_EFF,eff_no,2) - eff_x;
		eff_h = cmn.getSpriteData(cmn.TBL_EFF,eff_no,3) - eff_y;
		
		eff_scalex = 1.0;
		eff_scaley = 1.0;
	}else if(this.pc.ply_v > POWER_MAX/2){
		eff_no = cmn.EFF_CDUST_B;
		eff_x = cmn.getSpriteData(cmn.TBL_EFF,eff_no,0);
		eff_y = cmn.getSpriteData(cmn.TBL_EFF,eff_no,1);
		eff_w = cmn.getSpriteData(cmn.TBL_EFF,eff_no,2) - eff_x;
		eff_h = cmn.getSpriteData(cmn.TBL_EFF,eff_no,3) - eff_y;
		
		eff_scalex = 1.0;
		eff_scaley = 1.0;
	}
	var eff = new Effect(gameCore.scene, eff_no, this.pc.posX-eff_w/2, this.pc.posY+PLY_HEIGHT-eff_h/3*2, 0, group_bg);
	eff.setParam(eff_scalex,eff_scaley,1.0);
	this.entities.push(eff);
};

//プレイヤーデータ初期化
GameCore.prototype.resetPly = function(){
	if(this.pc != null){
		this.pc.flyF = false;
		this.pc.ply_time = 0;
		
		this.pc.setStartPosAngle(CANNON_ANGLE);
		this.pc.old_posX = this.pc.posX;
		this.pc.old_posY = this.pc.posY;
		
		this.pc.ply_v = 0;
		this.pc.ply_r = 0;
		
		this.pc.hit_bln = -1;
		this.pc.bariki = 100;
		this.pc.ply_value_x = 0;
		
		this.pc.tag_no = -1;
		this.pc.tag_time = 0;
		cmn.setPlyTagNo(this.pc.tag_no);
		
		this.pc.angle = 0;
		
		//プレイヤー画像側
		setImgPlyPos(this.pc.posX,this.pc.posY);
		setImgPlyAngle(this.pc.angle);
		setImgPlyTag(this.pc.tag_no);
		imgPly.hide();
		
		//UI
		setUIPower(0);
		setUIBariki(this.pc.bariki);
	}
};


//ゲーム初期化
function restartGame() {
	if(gameCore.miss_end){
		onBtnSnd();
		onBanner();
		imgUI_gameover.remove(imgUI_gameover.children[0]);
	}
	
	gameCore.resetPly();
	setCannonAngle(CANNON_ANGLE);
	
	camera_posx = 0;
	camera_posy = 0;
	cmn.setCameraPos(camera_posx,camera_posy);
	
	initBg();
	
	cursor_startx = 0;
	setCursorPos(cursor_startx);
	
	gameCore.touched = true;
	gameCore.setState(STEP_RESET);
	
	if(!gameCore.demo_mode){
		//ヘルプボタン表示
		imgUI_base.children[0].children[5].show();
	}
	
	gameCore.start();
}

//タイトルへ
function restartTitle() {
	if(gameCore.miss_end){
		onBtnSnd();
		onBanner();
		imgUI_gameover.remove(imgUI_gameover.children[0]);
	}
	
	gameCore.resetPly();
	setCannonAngle(CANNON_ANGLE);
	
	camera_posx = 0;
	camera_posy = 0;
	cmn.setCameraPos(camera_posx,camera_posy);
	
	initBg();
	
	cursor_startx = 0;
	setCursorPos(cursor_startx);
	
	//ヘルプボタン表示
	imgUI_base.children[0].children[5].show();
	
	imgUI_title.touchable = true;
	imgUI_title.children[0].angle = 0;
	imgUI_title.children[0].modified();
	imgUI_title.show();
	offResult();
	
	gameCore.setState(STEP_TITLE);
}

//着地(=ゲームオーバー)
function landGame() {
	gameCore.pc.flyF = false;
	imgUI_bariki.hide();
	
	if(!gameCore.demo_mode){
		gameCore.setState(STEP_GAMEOVER);
		cmn.stopBGM();
		cmn.playSE(cmn.SND_JIN_2);
	}else{
		gameCore.setState(STEP_DEMO_RESTART);
	}
}

//発射処理
function StartFire(){
	//発射
	gameCore.pc.ply_time = 0;
	gameCore.pc.setStartPosAngle(input_angle);
	gameCore.pc.old_posX = gameCore.pc.posX;
	gameCore.pc.old_posY = gameCore.pc.posY;
	setImgPlyPos(gameCore.pc.posX,gameCore.pc.posY);
	
	cursor_startx = gameCore.pc.posX;
	gameCore.pc.ply_v = input_power;
	gameCore.pc.ply_r = 180 + input_angle;
	gameCore.pc.flyF = true;
	
	setUIPower(input_power);
	imgUI_tuto.children[0].hide();
	
	imgPly.show();
	imgCannonTv.hide();
	imgCannon.show();
	
	//発射エフェクト生成
	gameCore.createEffFire();
	cmn.playSE(cmn.SND_SE_6);
	
	setBtnBariki(false);
	setUIBariki(gameCore.pc.bariki);
	
	//テロップ生成
	gameCore.setTelop(cmn.UI_TELOP_1);
}


//------------------
//ハズレ演出生成
//------------------
function createMissAnim(animId) {
	if(!gameCore.demo_mode){ // 通常プレイ
		gameCore.miss_end = true;
		imgUI_gage.hide();
		imgUI_bariki.hide();
		offBtnSnd();
		offBanner();
		var spr_miss = sub.createMissEffect(animId,0,0,function () {gameCore.setState(STEP_GAME_MISS_);});
		imgUI_gameover.append(spr_miss);
		imgUI_gameover.show();
		gameCore.setState(STEP_GAME_MISS);
	}else{ // デモ
		gameCore.pc.flyF = false;
		imgUI_bariki.hide();
		gameCore.setState(STEP_DEMO_RESTART);
	}
}


//------------------
//タイトル画面UI生成
//------------------
function createTitleUI(scene) {
	var root = new g.E({scene: scene});

	var title = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_TITLE, cmn.getUIPos(cmn.UI_TITLE).x, cmn.getUIPos(cmn.UI_TITLE).y);
	title.update.add(function () {
			var tmp_num = (globalCntr % 250);
			if( 0 <= tmp_num && tmp_num <= 40){
				var tmp_tbl = [3,-3];
				var tmp_no = Math.floor(tmp_num /6 %2);
				title.angle = 0 + tmp_tbl[tmp_no];
				if(tmp_num == 40) title.angle = 0;
				title.modified();
			}
	});
	root.append(title);

	var startBtn = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_BTN_START, cmn.getUIPos(cmn.UI_BTN_START).x, cmn.getUIPos(cmn.UI_BTN_START).y);
	startBtn.touchable = true;
	startBtn.pointDown.handle(function() {
		startBtn.y += 4;
		startBtn.modified();
	});
	startBtn.pointUp.handle(function() {
		startBtn.y -= 4;
		root.touchable = false;
		startBtn.modified();
		title_move_mode = 0;
		title_move_start = 0;
		cmn.playSE(cmn.SND_SE_1);
		gameCore.setState(STEP_TUTORIAL);
		root.hide();
	});
	root.append(startBtn);
	
	var logo_ix = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_LOGO_IX, 12, 166);
	root.append(logo_ix);
	
	return root;
}


//------------------
//ポップアップウィンドウ生成(右下リンク用)
//------------------
function createPopupBanner(scene) {
	var root = new g.E({scene: scene, x:0, y:0, width: game.width, height: game.height});
	
	//下地
	var back_pop = new g.FilledRect({
		scene: scene,
		cssColor: "#000000",
		width: game.width,
		height: game.height,
		opacity:0.5
	});
	root.append(back_pop);
	
	//ベースウィンドウ
	var spr_base = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BASE, cmn.getRsltPos(cmn.RESULT_BASE).x, cmn.getRsltPos(cmn.RESULT_BASE).y);
	root.append(spr_base);
	
	//テキスト
	var spr_text = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BANNER_TEXT, cmn.getRsltPos(cmn.RESULT_BANNER_TEXT).x, cmn.getRsltPos(cmn.RESULT_BANNER_TEXT).y);
	spr_base.append(spr_text);
	
	//【移動】ボタン
	var btn_move = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BTN_MOVE, cmn.getRsltPos(cmn.RESULT_BTN_MOVE).x, cmn.getRsltPos(cmn.RESULT_BTN_MOVE).y);
	btn_move.touchable = true;
	/****** RawPointUpPlugin 利用時特有の処理ここから *********/
	// RawPointUpPlugin からの通知を受ける Trigger を設定
	btn_move.rawPointUp = new g.Trigger();
	btn_move.rawPointUp.add(function () {
		cmn.playSE(cmn.SND_SE_1);
		cmn.jumpURL(-1);
	});
	/****** RawPointUpPlugin 利用時特有の処理ここまで *********/
	// 見た目上のボタンらしい振る舞いは通常どおり pointDown, pointUp で指定
	btn_move.pointDown.add(function () {
		btn_move.y += 2;
		btn_move.modified();
	});
	btn_move.pointUp.add(function () {
		btn_move.y -= 2;
		btn_move.modified();
	});
	spr_base.append(btn_move);
	
	//【ゲームに戻る】ボタン
	var btn_back = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BTN_BACK, cmn.getRsltPos(cmn.RESULT_BTN_BACK).x, cmn.getRsltPos(cmn.RESULT_BTN_BACK).y);
	btn_back.touchable = true;
	btn_back.pointDown.add(function () {
		btn_back.y += 2;
		btn_back.modified();
	});
	btn_back.pointUp.add(function () {
		btn_back.y -= 2;
		btn_back.modified();
		offPopupB();
		cmn.playSE(cmn.SND_SE_1);
	});
	spr_base.append(btn_back);
	
	//カウントダウン
	var cd_base = new g.E({scene: scene, x:cmn.getUIPos(cmn.UI_COUNTDOWN_0).x, y:cmn.getUIPos(cmn.UI_COUNTDOWN_0).y, width:cmn.getUIPos(cmn.UI_COUNTDOWN_0).width, height:cmn.getUIPos(cmn.UI_COUNTDOWN_0).height});
	for(var i = 0; i < 4; i++){
		var spr_cd = cmn.createSprite(scene, cmn.TBL_UI, cmn.UI_COUNTDOWN_0+i, 0, 0);
		spr_cd.hide();
		cd_base.append(spr_cd);
	}
	cd_base.hide();
	root.append(cd_base);
	
	return root;
}

//ポップアップ表示
function onPopupB() {
	gameCore.setState(STEP_PAUSE);
	//ゲーム開始ボタン操作不可
	imgUI_title.children[1].touchable = false;
	imgUI_popWin.show();
}

//ポップアップ非表示
function offPopupB() {
	//ゲーム開始ボタン操作可
	imgUI_title.children[1].touchable = true;
	gameCore.setState(STEP_PAUSE_);
}

//ポップアップ-カウントダウン表示
function onPopupCount() {
	
	imgUI_popWin.children[1].hide();
	
	var spr_count = imgUI_popWin.children[2];
	spr_count.children[3].show();
	spr_count.show();
}

//ポップアップ-カウントダウン更新
function updatePopupCount(num) {
	var spr_count = imgUI_popWin.children[2];
	spr_count.children[num].show();
	for(var i = 0; i < 4; i++){
		if(num != i){
			spr_count.children[i].hide();
		}
	}
	spr_count.show();
}

//ポップアップ-カウントダウン非表示
function offPopupCount() {
	
	imgUI_popWin.hide();
	imgUI_popWin.children[1].show();
	var spr_count = imgUI_popWin.children[2];
	for(var i = 0; i < 4; i++){
		spr_count.children[i].hide();
	}
	spr_count.hide();
}


//------------------
//あそびかた画面生成
//------------------
function createHelpUI(scene) {
	var root = new g.E({scene: scene});
	
	var back_rect = new g.FilledRect({
		scene: scene,
		cssColor: "#000000",
		width: game.width,
		height: game.height,
		opacity:0.5
	});
	root.append(back_rect);
	
	//1ページ目
	var spr_p1 = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_HELP_P1, cmn.getTutoPos(cmn.TUTO_HELP_P1).x, cmn.getTutoPos(cmn.TUTO_HELP_P1).y);
	root.append(spr_p1);
	
	//ボタン類
	var btn_next = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_BTN_NEXT, cmn.getTutoPos(cmn.TUTO_BTN_NEXT).x, cmn.getTutoPos(cmn.TUTO_BTN_NEXT).y);
	btn_next.touchable = true;
	btn_next.pointDown.handle(function() {
		btn_next.x += 4;
		btn_next.modified();
	});
	btn_next.pointUp.handle(function() {
		btn_next.x -= 4;
		btn_next.modified();
		btn_next.touchable = false;
		chngHelpPage(1);
		cmn.playSE(cmn.SND_SE_1);
	});
	spr_p1.append(btn_next);
	
	var btn_close = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_BTN_CLOSE, cmn.getTutoPos(cmn.TUTO_BTN_CLOSE).x, cmn.getTutoPos(cmn.TUTO_BTN_CLOSE).y);
	btn_close.touchable = true;
	btn_close.pointDown.handle(function() {
		btn_close.y += 4;
		btn_close.modified();
	});
	btn_close.pointUp.handle(function() {
		btn_close.y -= 4;
		btn_close.modified();
		btn_close.touchable = false;
		closeHelp();
		if(gameCore.getState() == STEP_TUTORIAL_){
			gameCore.start();
		}else{
			if(gameCore.getPrevState() == STEP_GAME){
				gameCore.start();
			}else{
				gameCore.setState(gameCore.getPrevState());
			}
		}
		cmn.playSE(cmn.SND_SE_1);
	});
	spr_p1.append(btn_close);
	
	//テレビちゃん
	//P1-1
	var spr_tv_11 = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_TV_1_1, 83, 77);
	spr_tv_11.update.add(function () {
			
			var animIndex = cmn.TUTO_TV_1_1 + Math.floor(globalCntr /40 %2);
			spr_tv_11.srcX = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,0);
			spr_tv_11.srcY = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,1);
			spr_tv_11.srcWidth = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,2) - spr_tv_11.srcX;
			spr_tv_11.srcHeight = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,3) - spr_tv_11.srcY;
			spr_tv_11.invalidate();
	});
	spr_p1.append(spr_tv_11);
	
	//P1-2
	var spr_tv_12 = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_TV_2_1, 553, 31);
	spr_tv_12.update.add(function () {
			
			var animIndex = cmn.TUTO_TV_2_1 + Math.floor(globalCntr /40 %2);
			spr_tv_12.srcX = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,0);
			spr_tv_12.srcY = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,1);
			spr_tv_12.srcWidth = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,2) - spr_tv_12.srcX;
			spr_tv_12.srcHeight = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,3) - spr_tv_12.srcY;
			spr_tv_12.invalidate();
	});
	spr_p1.append(spr_tv_12);
	
	//P1-3
	var spr_tv_13 = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_TV_3_1, 729, 61);
	spr_tv_13.update.add(function () {
			
			var animIndex = cmn.TUTO_TV_3_1 + Math.floor(globalCntr /40 %2);
			spr_tv_13.srcX = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,0);
			spr_tv_13.srcY = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,1);
			spr_tv_13.srcWidth = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,2) - spr_tv_13.srcX;
			spr_tv_13.srcHeight = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,3) - spr_tv_13.srcY;
			spr_tv_13.invalidate();
	});
	spr_p1.append(spr_tv_13);
	
	
	//2ページ目
	var spr_p2 = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_HELP_P2, cmn.getTutoPos(cmn.TUTO_HELP_P2).x, cmn.getTutoPos(cmn.TUTO_HELP_P2).y);
	spr_p2.hide();
	root.append(spr_p2);
	
	//ボタン類
	var btn_prev = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_BTN_PREV, cmn.getTutoPos(cmn.TUTO_BTN_PREV).x, cmn.getTutoPos(cmn.TUTO_BTN_PREV).y);
	btn_prev.touchable = true;
	btn_prev.pointDown.handle(function() {
		btn_prev.x -= 4;
		btn_prev.modified();
	});
	btn_prev.pointUp.handle(function() {
		btn_prev.x += 4;
		btn_prev.modified();
		btn_prev.touchable = false;
		chngHelpPage(0);
		cmn.playSE(cmn.SND_SE_1);
	});
	spr_p2.append(btn_prev);
	
	var btn_start = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_BTN_GAMESTART, cmn.getTutoPos(cmn.TUTO_BTN_GAMESTART).x, cmn.getTutoPos(cmn.TUTO_BTN_GAMESTART).y);
	btn_start.touchable = true;
	btn_start.pointDown.handle(function() {
		btn_start.y += 4;
		btn_start.modified();
	});
	btn_start.pointUp.handle(function() {
		btn_start.y -= 4;
		btn_start.modified();
		btn_start.touchable = false;
		closeHelp();
		if(gameCore.getState() == STEP_TUTORIAL_){
			gameCore.start();
		}else{
			imgUI_title.touchable = false;
			imgUI_title.hide();
			
			title_move_mode = 0;
			title_move_start = 0;
			
			gameCore.start();
		}
		cmn.playSE(cmn.SND_SE_1);
	});
	spr_p2.append(btn_start);
	
	//テレビちゃん
	//P2-1
	var spr_tv_21 = cmn.createSprite(scene, cmn.TBL_TUTO, cmn.TUTO_TV_2_1, 81, 126);
	spr_tv_21.update.add(function () {
			
			var animIndex = cmn.TUTO_TV_2_1 + Math.floor(globalCntr /40 %2);
			spr_tv_21.srcX = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,0);
			spr_tv_21.srcY = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,1);
			spr_tv_21.srcWidth = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,2) - spr_tv_21.srcX;
			spr_tv_21.srcHeight = cmn.getSpriteData(cmn.TBL_TUTO, animIndex,3) - spr_tv_21.srcY;
			spr_tv_21.invalidate();
	});
	spr_p2.append(spr_tv_21);
	
	root.hide();
	return root;
}

//あそびかた表示
function openHelp() {
	var spr_p1 = imgUI_help.children[1];
	var spr_p2 = imgUI_help.children[2];
	
	spr_p1.show();
	spr_p2.hide();
	
	spr_p1.children[0].touchable = true;
	spr_p1.children[1].touchable = true;
	
	spr_p2.children[0].touchable = false;
	spr_p2.children[1].touchable = false;
	
	if(gameCore.getState() == STEP_TITLE){
		imgUI_title.children[1].touchable = false;
	}
	
	imgUI_help.show();
}

//あそびかたページ切り替え
function chngHelpPage( no ) {
	
	if( no == 0 ){
		openHelp();
	}else if( no == 1 ){
		var spr_p1 = imgUI_help.children[1];
		var spr_p2 = imgUI_help.children[2];
		
		spr_p2.show();
		spr_p1.hide();
		
		spr_p1.children[0].touchable = false;
		spr_p1.children[1].touchable = false;
		
		spr_p2.children[0].touchable = true;
		spr_p2.children[1].touchable = true;
	}
}

//あそびかた非表示
function closeHelp( ) {
	var spr_p1 = imgUI_help.children[1];
	var spr_p2 = imgUI_help.children[2];
	
	spr_p1.hide();
	spr_p2.hide();
	
	spr_p1.children[0].touchable = false;
	spr_p1.children[1].touchable = false;
	
	spr_p2.children[0].touchable = false;
	spr_p2.children[1].touchable = false;
	
	if(gameCore.getPrevState() == STEP_TITLE){
		imgUI_title.children[1].touchable = true;
	}
	
	imgUI_help.hide();
}


//------------------
//リザルト画面生成
//------------------
function createResultUI(scene) {
	var root = new g.E({scene: scene, x:0, y:0, width: game.width, height: game.height});
	
	//下地
	var back_pop = new g.FilledRect({
		scene: scene,
		cssColor: "#000000",
		width: game.width,
		height: game.height,
		opacity:0.5
	});
	root.append(back_pop);
	
	//ベースウィンドウ
	var spr_base = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BASE, cmn.getRsltPos(cmn.RESULT_BASE).x, cmn.getRsltPos(cmn.RESULT_BASE).y);
	root.append(spr_base);
	
	//結果発表
	var spr_winR = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_WIN_RESULT, cmn.getRsltPos(cmn.RESULT_WIN_RESULT).x, cmn.getRsltPos(cmn.RESULT_WIN_RESULT).y);
	root.append(spr_winR);
	
	//【ブース内容を見る】ボタン
	var btn_booth = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BTN_BOOTH, cmn.getRsltPos(cmn.RESULT_BTN_BOOTH).x, cmn.getRsltPos(cmn.RESULT_BTN_BOOTH).y);
	btn_booth.touchable = false;
	/****** RawPointUpPlugin 利用時特有の処理ここから *********/
	// RawPointUpPlugin からの通知を受ける Trigger を設定
	btn_booth.rawPointUp = new g.Trigger();
	btn_booth.rawPointUp.add(function () {
		cmn.playSE(cmn.SND_SE_1);
		cmn.jumpURL(gameCore.pc.hit_bln);
	});
	/****** RawPointUpPlugin 利用時特有の処理ここまで *********/
	// 見た目上のボタンらしい振る舞いは通常どおり pointDown, pointUp で指定
	btn_booth.pointDown.add(function () {
		btn_booth.y += 2;
		btn_booth.modified();
	});
	btn_booth.pointUp.add(function () {
		btn_booth.y -= 2;
		btn_booth.modified();
	});
	spr_base.append(btn_booth);
	
	//【もう一回あそぶ】ボタン
	var btn_retry = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BTN_RETRY, cmn.getRsltPos(cmn.RESULT_BTN_RETRY).x, cmn.getRsltPos(cmn.RESULT_BTN_RETRY).y);
	btn_retry.touchable = false;
	btn_retry.pointDown.add(function () {
		btn_retry.y += 2;
		btn_retry.modified();
	});
	btn_retry.pointUp.add(function () {
		btn_retry.y -= 2;
		btn_retry.modified();
		restartGame();
		
		group_bg.show();
		
		imgUI_clear.hide();
		imgUI_clear.children[0].destroy();
		
		imgUI_clear.x = 0;
		imgUI_clear.modified();
		root.hide();
		cmn.playSE(cmn.SND_SE_1);
	});
	spr_base.append(btn_retry);
	
	//【やりなおす】ボタン
	var btn_redo = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_BTN_REDO, cmn.getRsltPos(cmn.RESULT_BTN_REDO).x, cmn.getRsltPos(cmn.RESULT_BTN_REDO).y);
	btn_redo.touchable = false;
	btn_redo.pointDown.add(function () {
		btn_redo.y += 2;
		btn_redo.modified();
	});
	btn_redo.pointUp.add(function () {
		btn_redo.y -= 2;
		btn_redo.modified();
		restartGame();
		root.hide();
		cmn.playSE(cmn.SND_SE_1);
		cmn.rePlayBGM();
	});
	btn_redo.hide();
	spr_base.append(btn_redo);
	
	//マークベース
	var base_mark = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_MARK_BASE, cmn.getRsltPos(cmn.RESULT_MARK_BASE).x, cmn.getRsltPos(cmn.RESULT_MARK_BASE).y);
	spr_base.append(base_mark);
	
	//マーク1
	var mark_1 = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_MARK_1, cmn.getRsltPos(cmn.RESULT_MARK_1).x, cmn.getRsltPos(cmn.RESULT_MARK_1).y);
	base_mark.append(mark_1);
	
	//マーク2
	var mark_2 = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_MARK_2, cmn.getRsltPos(cmn.RESULT_MARK_2).x, cmn.getRsltPos(cmn.RESULT_MARK_2).y);
	base_mark.append(mark_2);
	
	//マーク3
	var mark_3 = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_MARK_3, cmn.getRsltPos(cmn.RESULT_MARK_3).x, cmn.getRsltPos(cmn.RESULT_MARK_3).y);
	base_mark.append(mark_3);
	
	//称号ベース
	var base_achiev = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_WIN_ACHIEV, cmn.getRsltPos(cmn.RESULT_WIN_ACHIEV).x, cmn.getRsltPos(cmn.RESULT_WIN_ACHIEV).y);
	spr_base.append(base_achiev);
	
	//称号
	var font = new g.DynamicFont({
		game: game,
		fontFamily: g.FontFamily.SansSerif,
		size: 30
	});
	var text_achiev = new g.Label({
		scene: scene,
		font: font,
		text: "称号",
		fontSize: 16,
		textColor: "black",
		x:80,
		y:25
	});
	base_achiev.append(text_achiev);
	
	//ランクベース
	var base_rank = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_RANK_BASE, cmn.getRsltPos(cmn.RESULT_RANK_BASE).x, cmn.getRsltPos(cmn.RESULT_RANK_BASE).y);
	spr_base.append(base_rank);
	
	//ランク
	for(var i = 0; i < 8; i++){
		var spr_rank = cmn.createSprite(scene, cmn.TBL_RSLT, cmn.RESULT_RANK_SS+i, cmn.getRsltPos(cmn.RESULT_RANK_SS+i).x, cmn.getRsltPos(cmn.RESULT_RANK_SS+i).y);
		spr_rank.hide();
		spr_base.append(spr_rank);
	}
	
	root.hide();
	return root;
}

//リザルト表示
var result_rank = 0;
function onResult(mode, rank, achiev, m1, m2, m3) {
	var spr_win = imgUI_rslt.children[1];
	var spr_board = imgUI_rslt.children[2];
	var btn_booth = spr_win.children[0];
	var btn_retry = spr_win.children[1];
	var btn_redo = spr_win.children[2];
	var base_mark = spr_win.children[3];
	var base_achiev = spr_win.children[4];
	
	//ボタン設定
	btn_booth.touchable = false;
	btn_retry.touchable = false;
	btn_redo.touchable = false;
	btn_booth.opacity = 0.0;
	btn_retry.opacity = 0.0;
	btn_redo.opacity = 0.0;
	btn_booth.hide();
	btn_retry.hide();
	btn_redo.hide();
	btn_booth.modified();
	btn_retry.modified();
	btn_redo.modified();
	
	//マーク設定
	if(m1){
		base_mark.children[0].show();
	}else{
		base_mark.children[0].hide();
	}
	if(m2){
		base_mark.children[1].show();
	}else{
		base_mark.children[1].hide();
	}
	if(m3){
		base_mark.children[2].show();
	}else{
		base_mark.children[2].hide();
	}
	//称号設定
	base_achiev.children[0].text = achiev;
	base_achiev.children[0].opacity = 0.0;
	base_achiev.children[0].invalidate();
	
	//ランク設定
	for(var i = 0; i < 8; i++){
		spr_win.children[6+i].hide();
	}
	result_rank = rank;
	spr_win.children[6+rank].opacity = 0.0;
	spr_win.children[6+rank].modified();
	spr_win.children[6+rank].show();
	
	//アニメーション用座標設定
	spr_win.y = game.height + 20;
	spr_win.modified();
	
	spr_board.y = game.height + 20;
	spr_board.modified();
	
	imgUI_rslt.show();
}

//リザルト非表示
function offResult() {
	var spr_win = imgUI_rslt.children[1];
	var btn_booth = spr_win.children[1];
	var btn_retry = spr_win.children[2];
	var btn_redo = spr_win.children[3];
	
	//ボタン設定
	btn_booth.touchable = false;
	btn_retry.touchable = false;
	btn_redo.touchable = false;
	
	imgUI_rslt.hide();
}

//リザルト生成(称号含む)
function createResult(mode,bln_no) {
	
	var point_A = 0;
	var point_B = 0;
	var point_C = 0;
	var point_all = 0;
	var point_base = 20;
	
	var cl_cnt = 0;	// 雲
	var cm_cnt = 0;	// コメント
	var flg_bg1 = false;
	var flg_bg2 = false;
	var flg_bg3 = false;
	for(var i = 0; i < gameCore.pc.hit_type.length; i++){
		var obj_type = gameCore.pc.hit_type[i];
		if(obj_type == cmn.MAP_CLOUD || obj_type == cmn.MAP_CLOUD+1){ //雲
			cl_cnt ++;
		}else if(cmn.MAP_COMMENT <= obj_type && obj_type < cmn.MAP_COMMENT + TAG_MUTEKI){ //コメント
			cm_cnt ++;
		}else if(obj_type == cmn.MAP_BG_ANIM){
			flg_bg1 = true;
		}else if(obj_type == cmn.MAP_BG_ANIM+1){
			flg_bg2 = true;
		}else if(obj_type == cmn.MAP_BG_ANIM+2){
			flg_bg3 = true;
		}
	}
	if(cl_cnt >= 4) cl_cnt = 4;
	if(cm_cnt >= 4) cm_cnt = 4;
	
	//進んだ距離
	var max_w = BG_CURSOR_WIDTH-250/4 - cursor_startx;
	var move_value = gameCore.pc.posX - cursor_startx;
	if(move_value >= max_w+150) move_value = max_w+150;
	var sec_num = Math.floor(move_value / (max_w / 5));
	if(sec_num >= 4) sec_num = 4; // 距離は、4が最大
	sec_num = sec_num + 1; // 1は、保証
	point_A = sec_num * point_base;
	
	//雲に当たった回数
	point_B = 100 - cl_cnt*point_base;
	if(point_B <= 0) point_B = 0;
	if(point_B > point_A){
		point_B = point_A; // 進んだ距離以上でも、進んだ距離に比例
		cl_cnt = 4 - (point_B-point_base) /point_base;
	}
	
	//コメント弾幕に当たった回数
	point_C = 100 - cm_cnt*point_base;
	if(point_C <= 0) point_C = 0;
	if(point_C > point_A){
		point_C = point_A; // 進んだ距離以上でも、進んだ距離に比例
		cm_cnt = 4 - (point_C-point_base) /point_base;
	}
	
	//合計
	point_all = point_A + point_B + point_C;
	
	//ランク
	var rank = -1;
	if(bln_no == -1){ // アドバルーンヒット無し
		if(point_all >= 140){ // C
			rank = 4;
		}else if(120 <= point_all && point_all < 140){ // D
			rank = 5;
		}else if(100 <= point_all && point_all < 120){ // E
			rank = 6;
		}else if(point_all < 100){ // F
			rank = 7;
		}
	}else{ // アドバルーンヒット有り
		if(point_all >= 280){ // 超
			rank = 0;
		}else if(220 <= point_all && point_all < 280){ // S
			rank = 1;
		}else if(160 <= point_all && point_all < 220){ // A
			rank = 2;
		}else if(140 <= point_all && point_all < 160){ // B
			rank = 3;
		}
	}
	
	//称号生成
	var achiv = "";
	//C
	achiv += cmn.getAchievName(2,4-cm_cnt);
	//AorD
	if(bln_no == -1){ // アドバルーンヒット無し
		achiv += cmn.getAchievName(0,(sec_num-1));
	}else{ // アドバルーンヒット有り
		achiv += cmn.getAchievName(3,bln_no);
	}
	//B
	achiv += cmn.getAchievName(1,4-cl_cnt);
	
	onResult(mode, rank, achiv, flg_bg1, flg_bg2, flg_bg3);
}

//リザルト出現アニメーション
function animResult( mode ) {
	var spr_win = imgUI_rslt.children[1];
	var spr_board = imgUI_rslt.children[2];
	var btn_booth = spr_win.children[0];
	var btn_retry = spr_win.children[1];
	var btn_redo = spr_win.children[2];
	var base_achiev = spr_win.children[4];
	var base_rank = spr_win.children[5];
	
	var sub_num = globalCntr - global_lastTouch -2;
	
	if(sub_num <= 20){ // ボード・ウィンドウ登場
		spr_board.y -= (game.height + 20)/20;
		if(spr_board.y <= 0) spr_board.y = 0;
		spr_board.modified();
		
		spr_win.y -= (game.height + 20)/20;
		if(spr_win.y <= 0) spr_win.y = 0;
		spr_win.modified();
		
	}else if(sub_num <= 60){ //待機
	}else if(sub_num <= 81){ //ランク表示
		spr_win.children[6+result_rank].opacity += 0.05;
		if(spr_win.children[6+result_rank].opacity >= 1.0){
			spr_win.children[6+result_rank].opacity = 1.0;
		}
		spr_win.children[6+result_rank].modified();
		
		if(sub_num == 61){
			cmn.playSE(cmn.SND_SE_1);
		}
	}else if(sub_num <= 102){ // 称号表示
		base_achiev.children[0].opacity += 0.05;
		if(base_achiev.children[0].opacity >= 1.0){
			base_achiev.children[0].opacity = 1.0;
		}
		base_achiev.children[0].invalidate();
		
		if(sub_num == 82){
			cmn.playSE(cmn.SND_SE_1);
		}
		
		if(sub_num == 102){
			if(mode == 0){ // アドバルーンヒット
				btn_booth.show();
				btn_retry.show();
				btn_redo.hide();
			}else{
				btn_booth.hide();
				btn_retry.hide();
				btn_redo.show();
			}
		}
	}else if(sub_num <= 113){ // ボタン群表示
		if(sub_num == 103){
			cmn.playSE(cmn.SND_SE_1);
		}
		if(mode == 0){ // アドバルーンヒット
			btn_booth.opacity += 0.1;
			if(btn_booth.opacity >= 1.0){
				btn_booth.opacity = 1.0;
				btn_booth.touchable = true;
			}
			btn_booth.modified();
			
			btn_retry.opacity += 0.1;
			if(btn_retry.opacity >= 1.0){
				btn_retry.opacity = 1.0;
				btn_retry.touchable = true;
			}
			btn_retry.modified();
		}else{
			btn_redo.opacity += 0.1;
			if(btn_redo.opacity >= 1.0){
				btn_redo.opacity = 1.0;
				btn_redo.touchable = true;
			}
			btn_redo.modified();
		}
	}else if(sub_num >= 114){
		var cnt = Math.floor(sub_num/10%6);
		if(cnt == 1){
			base_rank.angle +=1;
			base_rank.modified();
		}
	}
}


//------------------
//背景生成 + オブジェクト付与
//------------------
function createGameBg(scene) {
	var root = sub.createGameBg(scene);
	return root;
}

//背景初期化
function initBg() {
	camera_posx = 0;
	camera_posy = -cmn.BG_HEIGHT+game.height;
	cmn.setCameraPos(camera_posx,camera_posy);
	
	group_bg.x = world_posx + camera_posx;
	group_bg.y = world_posy + camera_posy;
	
	if(imgCannonTv.children.length <= 0){
		onEffect(cmn.EFF_SPARK_1, 72, 60, 0, imgCannonTv);
	}
	imgCannonTv.show();
	imgCannon.hide();
	
	imgCannon.modified();
	imgCannonTv.modified();
	imgCannonBase.modified();
	
	//不具合対策
	//左に1dotずれる不具合対策の為、ウィンドウ座標初期化
	if(imgUI_base != null){
		imgUI_base.x = 0;
		imgUI_base.children[0].x = 0;
		imgUI_base.children[0].modified();
		imgUI_base.modified();
		
		imgUI_gameover.x = 0;
		imgUI_gameover.modified();
		
		imgUI_clear.x = 0;
		imgUI_clear.modified();
	}
	
	sub.resetTaguSprite();
	
}

//背景移動
function moveBg() {
	group_bg.x = world_posx + camera_posx;
	group_bg.y = world_posy + camera_posy;
	group_bg.modified();
}


//------------------
//エフェクトクラス
//------------------
function Effect( scene, type, x, y, angle, parent, groupId, groupno){
	this.type = type;
	this.startx = this.x = x;
	this.starty = this.y = y;
	this.time = 0;
	this.angle = angle;
	this.opacity = 1.0;
	if (typeof groupno === "undefined") {
		this.groupId = this.type;
		this.groupno = 0;
	}else{
		this.groupId = groupId;
		this.groupno = groupno;
	}
	
	if(this.type == cmn.EFF_HIT){
		this.scaleX = 0.5;
		this.scaleY = 0.5;
	}else{
		this.scaleX = 1.0;
		this.scaleY = 1.0;
	}
	this.movex = 0.0;
	this.movey = 0.0;
	
	this.spr = cmn.createSprite(scene, cmn.TBL_EFF, type, x, y);
	this.spr.scaleX = this.scaleX;
	this.spr.scaleY = this.scaleY;
	this.spr.angle = this.angle;
	parent.append(this.spr);
}

//エフェクト定期処理
Effect.prototype.update = function() {
	var animIndex = 0;
	//グループエフェクト
	if(this.groupId == EG_FIRE){ // 発射エフェクト(グループ)
		if(this.groupno == 0){
			if(this.time >= 0){
				this.x += 3.0;
				this.y -= 4.0;
				if(this.time == 0){
					this.opacity = 1.0;
				}else{
					this.opacity -= 0.050;
					if(this.opacity <= 0) this.opacity = 0;
				}
				this.scaleX += 0.050;
				this.scaleY += 0.050;
				this.spr.x = this.x;
				this.spr.opacity = this.opacity;
				this.spr.scaleX = this.scaleX;
				this.spr.scaleY = this.scaleY;
				this.spr.modified();
				
				if(this.time >= 80){
					return false;
				}
			}
		}
		else if(this.groupno == 1){
			if(this.time >= 0){
				this.x += 2.5;
				this.y += 3.0;
				if(this.time == 0){
					this.opacity = 1.0;
				}else{
					this.opacity -= 0.050;
					if(this.opacity <= 0) this.opacity = 0;
				}
				this.scaleX += 0.045;
				this.scaleY += 0.045;
				this.spr.x = this.x;
				this.spr.opacity = this.opacity;
				this.spr.scaleX = this.scaleX;
				this.spr.scaleY = this.scaleY;
				this.spr.modified();
				
				if(this.time >= 80){
					return false;
				}
			}
		}
		else if(this.groupno == 2){
			if(this.time >= 0){
				this.x += 4.5;
				this.y -= 4.5;
				if(this.time == 0){
					this.opacity = 1.0;
				}else{
					this.opacity -= 0.035;
					if(this.opacity <= 0) this.opacity = 0;
				}
				this.scaleX += 0.030;
				this.scaleY += 0.030;
				this.spr.x = this.x;
				this.spr.opacity = this.opacity;
				this.spr.scaleX = this.scaleX;
				this.spr.scaleY = this.scaleY;
				this.spr.modified();
				
				if(this.time >= 40){
					return false;
				}
			}
		}
		else if(this.groupno == 3){
			if(this.time >= 0){
				this.x += 2.0;
				this.y += 2.0;
				if(this.time == 0){
					this.opacity = 1.0;
				}else{
					this.opacity -= 0.035;
					if(this.opacity <= 0) this.opacity = 0;
				}
				this.scaleX += 0.02;
				this.scaleY += 0.02;
				this.spr.x = this.x;
				this.spr.opacity = this.opacity;
				this.spr.scaleX = this.scaleX;
				this.spr.scaleY = this.scaleY;
				this.spr.modified();
				
				if(this.time >= 80){
					return false;
				}
			}
		}
		else if(this.groupno == 4){
			if(this.time >= 0){
				this.x += 2.0;
				this.y += 2.5;
				if(this.time == 0){
					this.opacity = 1.0;
				}else{
					this.opacity -= 0.035;
					if(this.opacity <= 0) this.opacity = 0;
				}
				this.scaleX += 0.02;
				this.scaleY += 0.02;
				this.spr.x = this.x;
				this.spr.opacity = this.opacity;
				this.spr.scaleX = this.scaleX;
				this.spr.scaleY = this.scaleY;
				this.spr.modified();
				
				if(this.time >= 80){
					return false;
				}
			}
		}else if(this.groupno == 5){
			if(this.time >= 0){
				this.x += 2.5;
				this.y += 1.5;
				if(this.time == 0){
					this.opacity = 1.0;
				}else{
					this.opacity -= 0.035;
					if(this.opacity <= 0) this.opacity = 0;
				}
				this.scaleX += 0.025;
				this.scaleY += 0.025;
				if(this.scaleX >= 2.0) this.scaleX = 2.0;
				if(this.scaleY >= 2.0) this.scaleY = 2.0;
				this.spr.x = this.x;
				this.spr.opacity = this.opacity;
				this.spr.scaleX = this.scaleX;
				this.spr.scaleY = this.scaleY;
				this.spr.modified();
				
				if(this.time >= 80){
					return false;
				}
			}
		}
		
		this.time ++;
		return true;
	}
	//通常エフェクト
	else if(this.groupId == cmn.EFF_FIRE_S || this.groupId == cmn.EFF_FIRE_B){ // 煙エフェクト
		if (this.opacity <= 0) {
			return false;
		}
		this.x += 0.75;
		this.opacity -= 0.025;
		if(this.opacity <= 0) this.opacity = 0;
		this.scaleX += 0.01;
		this.scaleY += 0.01;
		this.spr.x = this.x;
		this.spr.opacity = this.opacity;
		this.spr.scaleX = this.scaleX;
		this.spr.scaleY = this.scaleY;
		this.spr.modified();
		
		return true;
	}else if(this.groupId == cmn.EFF_BARIKI_S || this.groupId == cmn.EFF_BARIKI_B){ // 馬力エフェクト
		if (this.opacity <= 0) {
			return false;
		}
		this.x -= 0.75;
		this.y += 0.75;
		this.opacity -= 0.025;
		if(this.opacity <= 0) this.opacity = 0;
		this.scaleX += 0.01;
		this.scaleY += 0.01;
		this.spr.x = this.x;
		this.spr.y = this.y;
		this.spr.opacity = this.opacity;
		this.spr.scaleX = this.scaleX;
		this.spr.scaleY = this.scaleY;
		this.spr.modified();
		
		gameCore.pc.angle = 45;
		setImgPlyAngle(gameCore.pc.angle);
		
		return true;
	}else if(this.groupId == cmn.EFF_HIT){ // アドバルーンヒットエフェクト
		if(!gameCore.demo_mode){
			if(gameCore.getState() === STEP_CLEAR_ANIM){
				return false;
			}
		}else{
			if(gameCore.getState() === STEP_CLEAR_FADEOUT_){
				return false;
			}
		}
		this.scaleX += 0.05;
		this.scaleY += 0.05;
		if(this.scaleX >= 1.5) this.scaleX = 1.5;
		if(this.scaleY >= 1.5) this.scaleY = 1.5;
		this.spr.scaleX = this.scaleX;
		this.spr.scaleY = this.scaleY;
		this.spr.modified();
		return true;
	}else if(this.groupId == cmn.EFF_CDUST_S || this.groupId == cmn.EFF_CDUST_B){ // 土煙エフェクト
		if (this.opacity <= 0) {
			return false;
		}
		this.x -= 0.75;
		this.opacity -= 0.025;
		if(this.opacity <= 0) this.opacity = 0;
		this.scaleX += 0.01;
		this.scaleY += 0.01;
		this.spr.x = this.x;
		this.spr.y = this.y;
		this.spr.opacity = this.opacity;
		this.spr.scaleX = this.scaleX;
		this.spr.scaleY = this.scaleY;
		this.spr.modified();
		
		return true;
	}else if(this.groupId == cmn.EFF_WATER_1){ // 水しぶきエフェクト
	
		animIndex = this.groupId + (this.time | 0);
		if (animIndex >= cmn.EFF_WATER_1+5 ){	//終了時
			return false;
		}
		
		this.spr.show();
		this.spr.srcX = cmn.getSpriteData(cmn.TBL_EFF, animIndex,0);
		this.spr.srcY = cmn.getSpriteData(cmn.TBL_EFF, animIndex,1);
		this.spr.srcWidth = cmn.getSpriteData(cmn.TBL_EFF, animIndex,2) - this.spr.srcX;
		this.spr.srcHeight = cmn.getSpriteData(cmn.TBL_EFF, animIndex,3) - this.spr.srcY;
		this.spr.invalidate();
		this.time += 0.25;
		
		return true;
	}else if(this.groupId == cmn.EFF_SPARK_1){ // 火花エフェクト(待機)
	
		animIndex = this.groupId + Math.floor(this.time /5 %2);
		if(gameCore.getState() === STEP_GAME_){
			return false;
		}
		
		//火花アニメーション
		this.spr.show();
		this.spr.srcX = cmn.getSpriteData(cmn.TBL_EFF, animIndex,0);
		this.spr.srcY = cmn.getSpriteData(cmn.TBL_EFF, animIndex,1);
		this.spr.srcWidth = cmn.getSpriteData(cmn.TBL_EFF, animIndex,2) - this.spr.srcX;
		this.spr.srcHeight = cmn.getSpriteData(cmn.TBL_EFF, animIndex,3) - this.spr.srcY;
		this.spr.invalidate();
		
		this.time += 1;
		return true;
	}else if(this.groupId == cmn.EFF_SPARK_2){ // 火花エフェクト
	
		animIndex = cmn.EFF_SPARK_1 + Math.floor(this.time /5 %2);
		
		//火花アニメーション
		this.spr.show();
		this.spr.srcX = cmn.getSpriteData(cmn.TBL_EFF, animIndex,0);
		this.spr.srcY = cmn.getSpriteData(cmn.TBL_EFF, animIndex,1);
		this.spr.srcWidth = cmn.getSpriteData(cmn.TBL_EFF, animIndex,2) - this.spr.srcX;
		this.spr.srcHeight = cmn.getSpriteData(cmn.TBL_EFF, animIndex,3) - this.spr.srcY;
		this.spr.invalidate();
		
		//発射処理
		if(this.time <= 1){
			//表示待機
		}else if(this.time == 4){
			this.x += 3;
			this.y += 10;
			this.spr.x = this.x;
			this.spr.y = this.y;
			this.spr.modified();
		}else if(this.time == 8){
			this.x += 5;
			this.y += 10;
			this.spr.x = this.x;
			this.spr.y = this.y;
			this.spr.modified();
		}else if(this.time == 11){
			this.opacity = 0.0;
			this.spr.opacity = this.opacity;
			this.spr.modified();
			return false;
		}
		this.time += 1;
		return true;
	}
	return false;
};

//エフェクト終了処理
Effect.prototype.destroy = function() {
	this.spr.destroy();
};

//エフェクトパラメーター設定
Effect.prototype.setParam = function(scaleX,scaleY,opacity) {
	this.opacity = opacity;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	
	this.spr.scaleX = this.scaleX;
	this.spr.scaleY = this.scaleY;
	this.spr.opacity = this.opacity;
	this.spr.modified();
};

//エフェクト生成表示
function onEffect( eff_no, posx, posy, angle, parent, groupId, groupno) {
	var tmp_gi = groupId;
	var tmp_gn = groupno;
	if (typeof tmp_gn === "undefined") {
		tmp_gi = eff_no;
		tmp_gn = 0;
	}
	var eff = new Effect(gameCore.scene, eff_no, posx, posy, angle, parent, tmp_gi, tmp_gn);
	gameCore.entities.push(eff);
}


//------------------
// エントリーポイント
//------------------
var input_angle = 0;
var input_power = 0;
module.exports = function() {
	var scene = new g.Scene({ game: game , assetIds: cmn.assetFileName });
		
	//シーン読み込み完了時
	scene.loaded.add(function() {
		
		//起動時ブラウザ判定
		cmn.checkBrowser();
		
		//ゲームコア生成
		gameCore = new GameCore(scene);
		
		//ベースエンティティ生成
		var game_base = new g.E({scene: gameCore.scene, width: game.width, height: game.height});
		gameCore.scene.append(game_base);
		
		//背景グループ生成
		group_bg = createGameBg(gameCore.scene);
		game_base.append(group_bg);
		
		//プレイヤー画像生成
		imgPly = createImgPly(gameCore.scene);
		imgPly.hide();
		group_bg.append(imgPly);
		
		//前面背景生成
		var imgBgF = sub.createGameBgFront(gameCore.scene);
		group_bg.append(imgBgF);
		
		//大砲生成
		imgCannonTv = cmn.createSprite(gameCore.scene, cmn.TBL_UI, cmn.UI_CANNONTV, cmn.getUIPos(cmn.UI_CANNONTV).x, cmn.getUIPos(cmn.UI_CANNONTV).y+(cmn.BG_HEIGHT-game.height));
		imgCannonTv.tag = -1;
		group_bg.append(imgCannonTv);
		onEffect(cmn.EFF_SPARK_1, 72, 60, 0, imgCannonTv);
		
		imgCannon = cmn.createSprite(gameCore.scene, cmn.TBL_UI, cmn.UI_CANNON, cmn.getUIPos(cmn.UI_CANNON).x, cmn.getUIPos(cmn.UI_CANNON).y+(cmn.BG_HEIGHT-game.height));
		imgCannon.hide();
		imgCannon.tag = -1;
		group_bg.append(imgCannon);
		setCannonAngle(CANNON_ANGLE);
		
		//大砲台
		imgCannonBase = cmn.createSprite(gameCore.scene, cmn.TBL_UI, cmn.UI_CANNONBASE, cmn.getUIPos(cmn.UI_CANNONBASE).x, cmn.getUIPos(cmn.UI_CANNONBASE).y + (cmn.BG_HEIGHT-game.height));
		imgCannonBase.tag = -1;
		group_bg.append(imgCannonBase);
		
		//背景初期化
		initBg();
		
		//UI生成
		imgUI_base = createUIWindow(gameCore.scene);
		game_base.append(imgUI_base);
		
		//タイトル生成
		imgUI_title = createTitleUI(gameCore.scene);
		imgUI_base.append(imgUI_title);
		
		//ゲームオーバー生成
		imgUI_gameover = new g.E({scene: gameCore.scene, x:0, y:0, width: game.width, height: game.height});
		imgUI_gameover.hide();
		imgUI_base.append(imgUI_gameover);
		
		//ゲームクリア生成
		imgUI_clear = new g.E({scene: gameCore.scene, x:0, y:0, width: game.width, height: game.height});
		imgUI_clear.hide();
		imgUI_base.append(imgUI_clear);
		
		//ポップアップ生成
		imgUI_popWin = createPopupBanner(gameCore.scene);
		imgUI_popWin.hide();
		imgUI_base.append(imgUI_popWin);
		
		//あそびかた生成
		imgUI_help = createHelpUI(gameCore.scene);
		imgUI_base.append(imgUI_help);
		
		//リザルト生成
		imgUI_rslt = createResultUI(gameCore.scene);
		imgUI_base.append(imgUI_rslt);
		
		//フェード用矩形
		imgUI_rectF = new g.FilledRect({
			scene: gameCore.scene,
			cssColor: "#FFFFFF",
			width: game.width,
			height: game.height,
			x:0,
			y:0,
			opacity:0.0
		});
		imgUI_rectF.hide();
		imgUI_base.append(imgUI_rectF);
		
		//定期処理
		scene.update.handle(function(){
			globalCntr++;
			
			// 背景更新
			if(gameCore.getState() === STEP_TITLE || (STEP_GAME <= gameCore.getState() && gameCore.getState() <= STEP_GAME_FIREANIM_)){
				sub.callSubGameUpdate( scene , 1.0 );
			}
			else if(gameCore.getState() === STEP_GAME_FLY){
				var cmtspd = 1.0;
				if(gameCore.pc.tag_no == cmn.TAG_ID_2) cmtspd = 0.2;
				sub.callSubGameUpdate( scene , cmtspd );
			}
			
			// ゲーム状態更新
			gameCore.updateDemo();
			gameCore.update(clicked);
			
			//シーン処理
			switch(gameCore.getState()){
			case STEP_INIT:
				break;
			case STEP_TITLE:
				title_move_start ++;
				if(TITLE_MOVESTART_MAX <= title_move_start){
					if(title_move_mode == 0){
						title_move_x = -TITLE_SCROLL_SPD;
						
						//背景スクロール
						camera_posx += title_move_x;
						//カメラ終端判定
						if(camera_posx <= -BG_SCROLL_WIDTH+game.width){
							camera_posx = -BG_SCROLL_WIDTH+game.width;
							title_move_mode = 1;
							title_move_start = 0;
						}
					}else if(title_move_mode == 1){
						if(title_move_start >= 90){ //デモへ
							camera_posx = 0;
							title_move_mode = 0;
							title_move_start = 0;
							
							//デモ開始
							gameCore.StartDemo();
						}
					}
					
					//背景処理
					moveBg();
					
					cmn.setCameraPos(camera_posx,camera_posy);
				}
				break;
			case STEP_TUTORIAL:
				openHelp();
				gameCore.setState(STEP_TUTORIAL_);
				break;
			case STEP_TUTORIAL_:
				break;
			case STEP_HELP:
				break;
			case STEP_HELP_:
				break;
			case STEP_GAME_STANDBY:
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_GAME_STANDBY_);
				gameCore.setTelop(-1);
				sub.resetTelop();
				break;
			case STEP_GAME_STANDBY_:
				if(global_lastTouch+1 <= globalCntr){
					gameCore.setState(STEP_GAME);
				}
				break;
			case STEP_GAME:
				break;
			case STEP_GAME_:
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_GAME_FIREANIM);
				break;
			case STEP_GAME_FIREANIM:
				if(global_lastTouch+12 <= globalCntr){
					if(!gameCore.demo_mode){
						StartFire();
					}else{
						gameCore.demoStartFire();
						gameCore.demo_step = DEMO_FLY;
					}
					global_lastTouch = globalCntr;
					gameCore.setState(STEP_GAME_FLY);
				}
				break;
			case STEP_GAME_FLY:
				if(gameCore.pc.flyF){
					animChangeGage();
					
					//カメラ処理
					var tmp_x = gameCore.pc.posX;
					var tmp_y = gameCore.pc.posY;
					camera_posx = -tmp_x + (game.width/2 - PLY_WIDTH/2);
					camera_posy = -tmp_y + (game.height/2 - PLY_HEIGHT/2);
					
					//カメラ終端判定
					if(camera_posx <= -cmn.BG_WIDTH+game.width+game.width/2){
						camera_posx = -cmn.BG_WIDTH+game.width+game.width/2;
					}else if(camera_posx >= 0){
						camera_posx = 0;
					}
					if(camera_posy <= -cmn.BG_HEIGHT+game.height){
						camera_posy = -cmn.BG_HEIGHT+game.height;
					}else if(camera_posy >= 0){
						camera_posy = 0;
					}
					
					//プレイヤー画像に情報反映
					setImgPlyPos(tmp_x,tmp_y);
					gameCore.pc.angle += (PLAYER_ANGLE*gameCore.pc.anglepower);
					setImgPlyAngle(gameCore.pc.angle);
					
					//カーソル処理
					var max_w = BG_CURSOR_WIDTH-250/4 - cursor_startx;
					var move_base = max_w / CORSOR_MAX;
					var move_value = gameCore.pc.posX - cursor_startx;
					if(move_value >= max_w+150) move_value = max_w+150;
					var gage_x = move_value / move_base;
					setCursorPos(gage_x);
					
					//テロップ更新
					var sec_num = 0;
					for(var i = 0; i < TELOP_POINT.length; i++){
						if(TELOP_POINT[i] >= 0 && TELOP_POINT[i] <= gameCore.pc.posX){
							sec_num = i;
						}
					}
					gameCore.setTelop(cmn.UI_TELOP_1+sec_num);
					
					//背景処理
					moveBg();
					
					cmn.setCameraPos(camera_posx,camera_posy);
				}
				break;
			case STEP_GAME_HITBLN:
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_GAME_HITBLN_);
				break;
			case STEP_GAME_HITBLN_:
				if(global_lastTouch+CLEAR_HIT_TIME <= globalCntr){
					gameCore.setState(STEP_CLEAR);
				}
				break;
			case STEP_GAME_MISS:
				//はずれ演出待機
				break;
			case STEP_GAME_MISS_:
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_GAME_MISS_END);
				break;
			case STEP_GAME_MISS_END:
				if(global_lastTouch+30 <= globalCntr){
					landGame();
				}
				break;
			case STEP_GAMEOVER:
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_GAMEOVER_);
				break;
			case STEP_GAMEOVER_:
				imgUI_gage.hide();
				gameCore.setTelop(-1);
				sub.resetTelop();
				createResult(1,gameCore.pc.hit_bln);
				gameCore.setState(STEP_GAMEOVER_RESULT);
				break;
			case STEP_GAMEOVER_RESULT:
				animResult(1);
				if(global_lastTouch+60*5 == globalCntr){ // BGM再再生
					cmn.rePlayBGM();
				}
				else if(global_lastTouch+CHANGE_TIME <= globalCntr){// 自動でタイトルへ
					restartTitle();
				}
				break;
			case STEP_DEMO_RESTART:
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_DEMO_RESTART_);
				break;
			case STEP_DEMO_RESTART_CLR:
				gameCore.setState(STEP_DEMO_RESTART_);
				break;
			case STEP_DEMO_RESTART_:
				if(global_lastTouch+DEMO_END_TIME <= globalCntr){
					imgUI_gage.hide();
					gameCore.setTelop(-1);
					sub.resetTelop();
					
					gameCore.demo_mode = true;
					gameCore.demo_step = DEMO_START;
					gameCore.demo_time = 0;
					
					imgUI_rectF.hide();
					restartGame();
				}
				break;
			case STEP_RESET:
				setCannonAngle(CANNON_ANGLE);
				break;
			case STEP_CLEAR:
				if(!gameCore.demo_mode){
					//アタリ演出生成
					var clearanim = sub.createHitStagingEffect( gameCore.pc.hit_bln, 0, 0, function () {gameCore.setState(STEP_CLEAR_ANIM);});
					imgUI_clear.append( clearanim );
					imgUI_clear.show();
					
					global_lastTouch = globalCntr;
					gameCore.setState(STEP_CLEAR_FADEOUT);
				}else{
					global_lastTouch = globalCntr;
					
					imgUI_rectF.opacity = 0.0;
					imgUI_rectF.modified();
					imgUI_rectF.show();
					
					gameCore.setState(STEP_CLEAR_FADEOUT);
				}
				break;
			case STEP_CLEAR_FADEOUT:
				if(!gameCore.demo_mode){
					//アタリ演出待機
					if(global_lastTouch+90 == globalCntr){
						group_bg.hide();
					}
				}else{
					imgUI_rectF.opacity += 0.0333;
					if(imgUI_rectF.opacity >= 1) imgUI_rectF.opacity = 1.0;
					imgUI_rectF.modified();
					
					if(global_lastTouch+CLEAR_FADE_TIME <= globalCntr){
						gameCore.setState(STEP_CLEAR_FADEOUT_);
					}
				}
				break;
			case STEP_CLEAR_FADEOUT_:
				if(!gameCore.demo_mode){
					imgUI_clear.show();
					gameCore.setState(STEP_CLEAR_FADEIN);
				}else{
					gameCore.setState(STEP_DEMO_RESTART_CLR);
				}
				break;
			case STEP_CLEAR_FADEIN:
				break;
			case STEP_CLEAR_FADEIN_:
				break;
			case STEP_CLEAR_ANIM:
				gameCore.setTelop(-1);
				sub.resetTelop();
				imgUI_gage.hide();
				
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_CLEAR_ANIM_);
				break;
			case STEP_CLEAR_ANIM_:
				if(global_lastTouch+CLEAR_RESULT_TIME <= globalCntr){
					gameCore.setState(STEP_CLEAR_RESULT);
					cmn.rePlayBGM();
					createResult(0,gameCore.pc.hit_bln);
				}
				break;
			case STEP_CLEAR_RESULT:
				global_lastTouch = globalCntr;
				gameCore.setState(STEP_CLEAR_RESULT_);
				break;
			case STEP_CLEAR_RESULT_:
				animResult(0);
				break;
			case STEP_PAUSE:
				break;
			case STEP_PAUSE_:
				if(STEP_GAME_FLY == gameCore.prev_state && gameCore.pc.flyF){ //飛行中
					onPopupCount();
					global_lastTouch = globalCntr;
					gameCore.setState(STEP_PAUSE_COUNT);
				}else{
					imgUI_popWin.hide();
					global_lastTouch = globalCntr;
					gameCore.setState(STEP_PAUSE_STAY);
				}
				break;
			case STEP_PAUSE_STAY:
				if(global_lastTouch+15 <= globalCntr){
					gameCore.setState(gameCore.getPrevState());
				}
				break;
			case STEP_PAUSE_COUNT:
				cmn.playSE(cmn.SND_SE_1);
				gameCore.setState(STEP_PAUSE_COUNT_1);
				break;
			case STEP_PAUSE_COUNT_1:
				if(global_lastTouch+30 <= globalCntr){
					cmn.playSE(cmn.SND_SE_1);
					updatePopupCount("2");
					global_lastTouch = globalCntr;
					gameCore.setState(STEP_PAUSE_COUNT_2);
				}
				break;
			case STEP_PAUSE_COUNT_2:
				if(global_lastTouch+30 <= globalCntr){
					cmn.playSE(cmn.SND_SE_1);
					updatePopupCount("1");
					global_lastTouch = globalCntr;
					gameCore.setState(STEP_PAUSE_COUNT_3);
				}
				break;
			case STEP_PAUSE_COUNT_3:
				if(global_lastTouch+30 <= globalCntr){
					cmn.playSE(cmn.SND_SE_1);
					updatePopupCount("0");
					global_lastTouch = globalCntr;
					gameCore.setState(STEP_PAUSE_COUNT_END);
				}
				break;
			case STEP_PAUSE_COUNT_END:
				if(global_lastTouch+5 <= globalCntr){
					offPopupCount();
					gameCore.setState(gameCore.getPrevState());
				}
				break;
			}
		});
		
		
		//------------------
		//入力処理
		//------------------
		var clicked = false;
		var clicked_btn = 0;
		var start_x = 0;
		var start_y = 0;
		var now_x = 0;
		var now_y = 0;
		scene.pointDownCapture.handle(function(ev) {
			clicked = true;
			clicked_btn = 0;
			
			//タッチ座標
			var point = ev.point;
			now_x = 0;
			now_y = 0;
			
			//ロゴバナー部分を無視
			var no = cmn.UI_BANNER;
			var l_posX	= cmn.getUIPos(no).x;
			var l_posY	= cmn.getUIPos(no).y;
			var l_spW	= cmn.getUIPos(no).width;
			var l_spH	= cmn.getUIPos(no).height;
			
			//ヘルプボタン部分を無視
			no = cmn.UI_BTN_HELP;
			var h_posX	= cmn.getUIPos(no).x;
			var h_posY	= cmn.getUIPos(no).y;
			var h_spW	= cmn.getUIPos(no).width;
			var h_spH	= cmn.getUIPos(no).height;
			
			//サウンドボタン部分を無視
			no = cmn.UI_BTN_SOUND_ON;
			var s_posX	= cmn.getUIPos(no).x;
			var s_posY	= cmn.getUIPos(no).y;
			var s_spW	= cmn.getUIPos(no).width;
			var s_spH	= cmn.getUIPos(no).height;
			
			var btn_help = null;
			
			//ロゴ判定
			if(l_posX <= point.x && point.x <= l_posX + l_spW &&
				l_posY <= point.y && point.y <= l_posY + l_spH){
				if(gameCore.demo_mode){
					gameCore.EndDemo();
				}
				//公式サイトへ
				if(gameCore.getState() != STEP_TUTORIAL_ && 
				gameCore.getState() != STEP_HELP && 
				gameCore.getState() < STEP_GAME_MISS){
					cmn.playSE(cmn.SND_SE_1);
					onPopupB();
				}
				clicked = false;
			}//ヘルプボタン判定
			else if(h_posX <= point.x && point.x <= h_posX + h_spW &&
				h_posY <= point.y && point.y <= h_posY + h_spH){
				if(gameCore.demo_mode){
					clicked = false;
					gameCore.EndDemo();
					return;
				}
				
				if(!cmn.getIE()){
					if((gameCore.getState() == STEP_TITLE ||
					(gameCore.getState() == STEP_GAME && !gameCore.pc.flyF)) &&
					gameCore.getState() != STEP_HELP ){
						clicked = false;
						btn_help = imgUI_base.children[0].children[5];
						btn_help.y += 4;
						btn_help.modified();
						clicked_btn = 1;
					}else if(gameCore.getState() === STEP_GAME_FLY && gameCore.pc.flyF){
						gameCore.pc.touch_starttime = globalCntr;
						setBtnBariki(clicked);
					}else{
						clicked = false;
					}
				}else{
					if(gameCore.getState() === STEP_GAME_FLY && gameCore.pc.flyF){
						gameCore.pc.touch_starttime = globalCntr;
						setBtnBariki(clicked);
					}else{
						clicked = false;
					}
				}
			}//サウンドボタン判定
			else if(s_posX <= point.x && point.x <= s_posX + s_spW &&
				s_posY <= point.y && point.y <= s_posY + s_spH){
				if(gameCore.demo_mode){
					clicked = false;
					gameCore.EndDemo();
					return;
				}
				
				if(!cmn.getIE()){
					if(gameCore.getState() != STEP_TUTORIAL_ && 
					gameCore.getState() != STEP_HELP && 
					gameCore.getState() < STEP_GAME_MISS){
						clicked = false;
						
						var btn_snd = null;
						if(cmn.getSndF()){
							btn_snd = imgUI_base.children[0].children[6];
							btn_snd.y += 4;
							btn_snd.modified();
						}else{
							btn_snd = imgUI_base.children[0].children[7];
							btn_snd.y += 4;
							btn_snd.modified();
						}
						clicked_btn = 2;
					}
				}else{ // IEでは、ヘルプボタン
					if((gameCore.getState() == STEP_TITLE ||
					(gameCore.getState() == STEP_GAME && !gameCore.pc.flyF)) &&
					gameCore.getState() != STEP_HELP ){
						clicked = false;
						btn_help = imgUI_base.children[0].children[5];
						btn_help.y += 4;
						btn_help.modified();
						clicked_btn = 1;
					}else if(gameCore.getState() === STEP_GAME_FLY && gameCore.pc.flyF){
						gameCore.pc.touch_starttime = globalCntr;
						setBtnBariki(clicked);
					}
				}
			}else{
				if(!gameCore.demo_mode){
					//馬力
					if(gameCore.getState() === STEP_GAME_FLY && gameCore.pc.flyF){
						gameCore.pc.touch_starttime = globalCntr;
						setBtnBariki(clicked);
					}
					//発射
					else if (gameCore.getState() === STEP_GAME) {
						start_x = point.x;
						start_y = point.y;
						
						input_angle = CANNON_ANGLE;
						input_power = 0;
						setUIPower(input_power);
						
						var cld_no = 0;
						var tmp_w = imgUI_tuto.children[cld_no].width;
						var tmp_h = imgUI_tuto.children[cld_no].height;
						imgUI_tuto.children[cld_no].x = start_x-tmp_w/2;
						imgUI_tuto.children[cld_no].y = start_y-tmp_h/2;
						imgUI_tuto.children[cld_no].angle = 315;
						imgUI_tuto.children[cld_no].scaleX = 0.25;
						imgUI_tuto.children[cld_no].modified();
						imgUI_tuto.children[cld_no].show();
						imgUI_tuto.show();
						
						cmn.playSE(cmn.SND_SE_1);
					}
				}else{
					gameCore.EndDemo();
					clicked = false;
				}
			}
		});
		scene.pointMoveCapture.handle(function(ev) {
			if (!clicked) {
				return;
			}
			
			var point = ev.point;
			now_x += ev.prevDelta.x;
			now_y += ev.prevDelta.y;
			//ウィンドウ外判定
			if(gameCore.getState() === STEP_GAME && !gameCore.pc.flyF){
				if(point.x + now_x < 0 || point.x + now_x > game.width ||
					point.y + now_y < 0 || point.y + now_y > game.height){
					restartGame(); //パラメータリセット
					clicked = false; // 操作キャンセル
					
					imgUI_tuto.children[0].hide();
					imgUI_tuto.hide();
				}
			}
			if(clicked){
				if(globalCntr%10 == 0){
					cmn.playSE(cmn.SND_SE_1);
				}
				if(gameCore.getState() === STEP_GAME && !gameCore.pc.flyF){
					
					var control_value = 80;
					
					var now_posx = start_x + now_x;
					var now_posy = start_y + now_y;
					var dis = Math.sqrt((now_posx - start_x) * (now_posx - start_x) + (now_posy - start_y) * (now_posy - start_y));
					var rad = Math.atan2(now_posy - start_y,now_posx - start_x);
					var deg = cmn.getDegrees(rad);
					
					//角度調整
					input_angle = deg + 180;
					if( 0 <= input_angle && input_angle <= 180) input_angle = 360;
					if( 180 < input_angle && input_angle <= 270) input_angle = 270;
					setCannonAngle(input_angle);
					gameCore.pc.setStartPosAngle(input_angle);
					setImgPlyPos(gameCore.pc.posX,gameCore.pc.posY);
					
					//パワー調整
					var power_sub = 10; // 入力猶予(開始地点ぴったりにマウスを持っていくのは、難しい為、ある程度の幅を初期位置とみなす)
					var sub_p = (dis-power_sub) / control_value;
					if(sub_p <= 0) sub_p = 0;
					if(sub_p >= 1.0) sub_p = 1.0;
					
					input_power = POWER_MAX * sub_p;
					setUIPower(input_power);
					
					var cld_no = 0;
					imgUI_tuto.children[cld_no].angle = input_angle;
					imgUI_tuto.children[cld_no].scaleX = 0.25 + (0.75*sub_p);
					imgUI_tuto.children[cld_no].modified();
				}
			}
		});
		scene.pointUpCapture.handle(function(ev) {
			//ボタン判定
			if(clicked_btn == 1){ // ヘルプボタン
				cmn.playSE(cmn.SND_SE_1);
				openHelp();
				var btn_help = imgUI_base.children[0].children[5];
				btn_help.y -= 4;
				btn_help.modified();
				gameCore.setState(STEP_HELP);
				
				clicked_btn = 0;
			}else if(clicked_btn == 2){ // サウンドボタン
				var s_flg = cmn.getSndF();
				var btn_snd_on = imgUI_base.children[0].children[6];
				var btn_snd_off = imgUI_base.children[0].children[7];
				if(s_flg){
					btn_snd_on.y -= 4;
					btn_snd_on.modified();
				}else{
					btn_snd_off.y -= 4;
					btn_snd_off.modified();
				}
				cmn.setSndF(!s_flg);
				if(!cmn.getIE()){
					if(cmn.getSndF()){
						btn_snd_on.show();
						btn_snd_off.hide();
						
						cmn.playBGM(cmn.SND_BGM_1);
						cmn.playSE(cmn.SND_SE_1);
					}else{
						btn_snd_off.show();
						btn_snd_on.hide();
						
						cmn.stopBGM();
					}
				}
				
				clicked_btn = 0;
			}
		
			if(!gameCore.demo_mode){
				if(gameCore.getState() === STEP_GAME && !gameCore.pc.flyF){
					if(input_power == 0){ // パワー0の場合、発射キャンセル
						restartGame(); //パラメータリセット
						clicked = false; // 操作キャンセル
						
						imgUI_tuto.hide();
						imgUI_tuto.children[0].hide();
					}
				}
				if(clicked){
					if(gameCore.getState() === STEP_GAME){
						//発射準備
						imgUI_tuto.hide();
						//ヘルプボタン非表示
						imgUI_base.children[0].children[5].hide();
						//火花エフェクト生成
						onEffect(cmn.EFF_SPARK_2, 72, 60, 0, imgCannonTv);
						cmn.playSE(cmn.SND_SE_1);
						gameCore.setState(STEP_GAME_);
					}else if(gameCore.getState() === STEP_GAME_FLY && gameCore.pc.flyF){ // 移動中
						// 画面を押してから、1秒以内に離したら
						if(globalCntr - gameCore.pc.touch_starttime <= fps/BARIKI_TYPE_TIME){
							gameCore.pc.onBariki(0);
							setBtnBariki(false);
							gameCore.pc.touch_starttime = 0;
						}else{
							gameCore.pc.bariki_type = -1;
							gameCore.pc.bariki_animtime = 0;
							setBtnBariki(false);
						}
					}
				}
			}
			clicked = false;
		});
	});
	game.pushScene(scene);
};
