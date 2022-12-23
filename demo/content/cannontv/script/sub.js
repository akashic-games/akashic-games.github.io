const game = g.game;
const cmn = require("./Common");

// 背景描画関係
let topSpace2 = null;

// オブジェクト描画関係
const baloonSprite = [];
const cloudObj = [];
let cloudCount=0;
const bgAnimPtn = [
	[    0,   0, ],
	[ 2011, 742, ],

	[    0, 211, ],
	[ 3569, 493, ],

	[    0, 422, ],
	[ 5076, 509, ],
];


// テロップ関係
let nowTelopID=-1;
let telopPane = null;
let telopFont = null;
let telopFrame = null;
let rollPos;
let rollSpeed = 0.1;


// タグ関係
const taguObj = [];
let taguCount=0;


//------------------
// ローカルデータ
//------------------
// Baloonスプライト生成
const ballonPosData = [
	[  279, 689 -175, 1],	//00:超歌舞伎
	[   95, 662 -200, 0],	//01:超音楽祭
	[  459, 999 -100, 3],	//02:超囲碁・将棋
	[  822, 986 -150, 7],	//03:超丸投げ
	[  638,1043 -125, 5],	//04:超ボーカロイド

	[  638, 662 - 320, 8],	//05:超コスプレ
	[  459, 626 - 65, 2],	//06:超ゲーム
	[  815, 647 - 85, 9],	//07:超アニメ
	[  270,1070 -  0, 4],	//08:超料理
	[   95,1022 - 95, 6],	//09:超踊ってみた
];

// ハズレ演出【土管】用雲座標
const missEff3_clTbl = [
	// 雲ID(0:大 1:小), x, y
	[ 0, -500, -125],	// 雲1
	[ 1, -450,   15],	// 雲2
	[ 0, -270,  -45],	// 雲3
	[ 0,  100,   10],	// 雲4
	[ 1,  250,  -70],	// 雲5
];


//------------------
// Subスクリプト
//------------------
//定期処理
let updCount = 0;
function callSubGameUpdate( scene , cmtSpd ) {

	if( cmtSpd === undefined ) cmtSpd = 1.0;

	//背景更新処理
	starBGProcess( );

	//バルーン動作
	let i = 0;
	for( i = 0; i < 10; i++){
		balloonSpriteAction( baloonSprite[i] );
	}

	//クラウド動作
	for( i = 0; i < cloudCount; i++){
		cloudSpriteAction( cloudObj[i] ,cmtSpd, i);
	}

	//タグ動作
	for( i = 0; i < taguCount; i++){
		taguSpriteAction( taguObj[i] );
	}

	if(telopPane != null ) {
		//テロップ動作
		if(nowTelopID != -1){

			const telopLength = cmn.uiSpriteData[ nowTelopID ][2];
			rollPos += rollSpeed;

			if(rollPos >= telopLength) rollPos -= telopLength;
			telopFont.x = -rollPos;

			telopFont.y = 0;
			if((updCount%60)>30 ) telopFont.y = -telopFont.children[0].height;

			telopFont.modified();

			//テロップ告知
			if(telopFrame != null){
				telopFrame.timeCount++;
				if( (telopFrame.timeCount % 30) >= 15){
					telopFrame.hide();
				}else{
					telopFrame.show();
				}

				telopFrame.modified();
				if(telopFrame.timeCount>59){ telopFrame.destroy(); telopFrame = null; }
			}

		}
	}

	updCount++;
}


//------------------
// 背景管理
//------------------
// 背景生成
function createGameBg(scene) {

	//背景グループ生成
	const root = new g.E({scene: scene, x:0, y:0 });
	const at = require("@akashic-extension/akashic-tile");

	//上部宇宙空間
	const topSpace = new g.FilledRect({
		scene: scene,
		cssColor: "#280858",
		width: cmn.SCREEN_WIDTH *9,
		height: cmn.SCREEN_HEIGHT *12,
		x: 0,
		y: 0

	});
	root.append(topSpace);

	topSpace2 = new at.Tile({
		scene: scene,
		src: scene.assets[cmn.IMG_BG_STAGESTAR],
		tileWidth: cmn.SCREEN_WIDTH ,
		tileHeight: cmn.SCREEN_HEIGHT ,
		//
		// マップデータ
		//
		tileData: [
			[ 0, 0 ],
			[ 0, 0 ],
		],
		x: 0,
		y: 0
	});
	root.append(topSpace2);


	const tileBG = new at.Tile({
		scene: scene,
		src: scene.assets[cmn.IMG_MAP],
		tileWidth: cmn.SCREEN_WIDTH ,
		tileHeight: 1500,
		//
		// マップデータ
		//
		tileData: [
			[ 0, 1, 1 ],
		],
		x: 0,
		y: cmn.SCREEN_HEIGHT *11
	});

	const tileBG2 = new at.Tile({
		scene: scene,
		src: scene.assets[cmn.IMG_MAP],
		tileWidth: cmn.SCREEN_WIDTH ,
		tileHeight: 1500,
		//
		// マップデータ
		//
		tileData: [
			[ 2, 3, 4 ],
		],
		x: cmn.SCREEN_WIDTH * 3-1,
		y: cmn.SCREEN_HEIGHT *11
	});

	const tileBG3 = new at.Tile({
		scene: scene,
		src: scene.assets[cmn.IMG_MAP],
		tileWidth: cmn.SCREEN_WIDTH ,
		tileHeight: 1500,
		//
		// マップデータ
		//
		tileData: [
			[ 5, 6, 7 ],
		],
		x: cmn.SCREEN_WIDTH * 6-2,
		y: cmn.SCREEN_HEIGHT *11
	});

	tileBG.width = cmn.SCREEN_WIDTH*3 ;
	tileBG2.width = cmn.SCREEN_WIDTH*3;
	tileBG3.width = cmn.SCREEN_WIDTH*3;

	tileBG.modified();
	tileBG2.modified();
	tileBG3.modified();

	root.append(tileBG);
	root.append(tileBG2);
	root.append(tileBG3);

	//バルーン生成
	for(let i = 0; i < ballonPosData.length; i++){
		baloonSprite[i] = createBalloonSprite ( scene , i);
		baloonSprite[i].x = ballonPosData[i][0] +( cmn.SCREEN_WIDTH *8 - cmn.SCREEN_WIDTH );
		baloonSprite[i].y = ballonPosData[i][1] + cmn.SCREEN_HEIGHT *11;
		baloonSprite[i].tag=ballonPosData[i][2];

		baloonSprite[i].baseX = baloonSprite[i].x;
		baloonSprite[i].baseY = baloonSprite[i].y;
		baloonSprite[i].count = cmn.getRandom(2)/20;

		root.append(baloonSprite[i]);
	}

	createCloudSprite( scene ,root );
	createTaguSprite ( scene ,root );

	return root;
}

//前面背景生成
function createGameBgFront(scene) {
	const root = new g.E({scene: scene, width: game.width, height: game.height});
	//海
	let sea_num = 3;
	let i = 0;
	for( i = 0; i < sea_num; i++){
		const seabg = new g.Sprite({
			scene: scene,
			src: scene.assets[cmn.IMG_MAP],
			width: game.width,
			height: 30,
			srcX: 0,
			srcY: 1500-30,
			srcWidth: game.width,
			srcHeight: 25,
			x: game.width*i,
			y: cmn.BG_HEIGHT-30
		});
		root.append(seabg);
	}
	//陸地
	let gbg = null;
	for( i = 0; i < 1; i++){
		gbg = new g.Sprite({
			scene: scene,
			src: scene.assets[cmn.IMG_MAP],
			width: game.width,
			height: 30,
			srcX: game.width*2,
			srcY: 1500-30,
			srcWidth: game.width,
			srcHeight: 25,
			x: sea_num*game.width + game.width*i,
			y: cmn.BG_HEIGHT-30
		});
		root.append(gbg);
	}
	sea_num = sea_num+1;
	const g_num = cmn.BG_WIDTH/game.width - 4;
	for( i = 0; i < g_num; i++){
		gbg = new g.Sprite({
			scene: scene,
			src: scene.assets[cmn.IMG_MAP],
			width: game.width,
			height: 30,
			srcX: game.width*3,
			srcY: 1500-30,
			srcWidth: game.width,
			srcHeight: 25,
			x: sea_num*game.width + game.width*i,
			y: cmn.BG_HEIGHT-30
		});
		root.append(gbg);
	}
	return root;
}

//夜空背景定期処理
function starBGProcess( ){
	const tmpPos = cmn.getCameraPos();
	const camX = tmpPos.x;
	let camY = tmpPos.y;

	//下限
	if(camY < -cmn.SCREEN_HEIGHT*10) camY = -cmn.SCREEN_HEIGHT*10	;

	topSpace2.x = ((-camX / cmn.SCREEN_WIDTH )|0) * cmn.SCREEN_WIDTH;
	topSpace2.y = ((-camY / cmn.SCREEN_HEIGHT)|0) * cmn.SCREEN_HEIGHT;
	topSpace2.modified();
}


//------------------
// アドバルーン管理
//------------------
// アドバルーン生成
function createBalloonSprite( scene, balloonSpriteID ){

	const blSrcX = balloonSpriteID * 124;
	const blSrcY = 0;
	const blW = 124;
	const blH = 124;

	const nbSrcX = balloonSpriteID * 124;
	const nbSrcY = 124;

	const nbW = 124;
	const nbH = 444 - nbSrcY;

	//バルーン部分生成
	const blSprite = new g.Sprite({
		scene: scene,
		src: scene.assets[cmn.IMG_BALLOON],
		width: blW,
		height: blH,
		srcX: blSrcX,
		srcY: blSrcY,
		srcWidth: blW,
		srcHeight: blH,
		x: 0,
		y: 0,
	});
	blSprite.tag = balloonSpriteID;
	blSprite.count = 0;

	//広告のぼり部分生成
	const nbSprite = new g.Sprite({
		scene: scene,
		src: scene.assets[cmn.IMG_BALLOON],
		width: nbW,
		height: nbH,
		srcX: nbSrcX,
		srcY: nbSrcY,
		srcWidth: nbW,
		srcHeight: nbH,
		x: 0,
		y: -36,
		angle: 0,
		tag: 50,
	});

	nbSprite.tag = cmn.getRandom(3);
	blSprite.append( nbSprite );

	return blSprite;
}

//アドバルーン定期処理
function balloonSpriteAction( balloonSprite ){

	const rad = Math.cos( balloonSprite.children[0].tag );
	balloonSprite.children[0].tag += 0.1;

	const deg = (rad * 6)-3;
	balloonSprite.children[0].angle = deg;
	balloonSprite.children[0].modified();

	balloonSprite.y = Math.cos( balloonSprite.count )*10 + balloonSprite.baseY;

	balloonSprite.count += (cmn.getRandom(350)+150)/10000;
	balloonSprite.modified();
}


//------------------
// 雲管理
//------------------
//雲生成
function createCloudSprite( scene , root) {

	//配置位置
	const CLOUD_TOP = 10;
	cloudCount=0;

	//背景演出生成
	//背景演出3種生成
	let i = 0;
	for( i = 0; i < 3; i++){
		const bgEff = new g.Sprite({
			scene: scene,
			src: scene.assets[cmn.IMG_BG_ANIM],
			width: 211,
			height: 211,
			srcX: bgAnimPtn[i*2][0],
			srcY: bgAnimPtn[i*2][1],
			srcWidth: 211,
			srcHeight: 211,
			x: bgAnimPtn[i*2+1][0] + 970,
			y: bgAnimPtn[i*2+1][1] + cmn.SCREEN_HEIGHT * 11,
		});

		//ローカルメンバ
		cloudObj[cloudCount] = bgEff;
		cloudObj[cloudCount].tag = cmn.MAP_BG_ANIM + i;

		cloudObj[cloudCount].actionFlag = false;
		cloudObj[cloudCount].actionCount = 0;
		cloudObj[cloudCount].scrlAddX = 0;
		cloudObj[cloudCount].baseX = cloudObj[cloudCount].x;
		cloudObj[cloudCount].baseY = cloudObj[cloudCount].y;
		cloudObj[cloudCount].setAction = function () { this.actionFlag = true; };
		cloudObj[cloudCount].actFunc = null;

		root.append( cloudObj[cloudCount] );
		cloudCount++;
	}

	let tmpObj = null;
	let cx,cy,cw,ch;
	let ngFlag = false;
	let chk = 0;
	for (let areaY = 0; areaY < cmn.CloudAreaPattern.length; areaY++){
		for (let areaX = 0; areaX < cmn.CloudAreaPattern[ areaY ].length; areaX++){
			//雲生成
			const genCount = cmn.CloudAreaPattern[ areaY ][ areaX ] % 10;
			for( i = 0; i < genCount; i++){
				const clID = cmn.getRandom(2)<1 ? cmn.OBJ_CLOUD_B:cmn.OBJ_CLOUD_S;	//03:お邪魔雲_大 04:お邪魔雲_小
				tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, clID, cmn.getRandom( cmn.SCREEN_WIDTH ) + areaX* cmn.SCREEN_WIDTH , cmn.getRandom( cmn.SCREEN_HEIGHT ) + cmn.SCREEN_HEIGHT * (areaY+CLOUD_TOP));
				cx = tmpObj.x;
				cy = tmpObj.y;
				cw = tmpObj.width;
				ch = tmpObj.height;

				ngFlag = false;
				for( chk = 0; chk < cloudCount; chk++){
					if( g.Collision.intersect( cx, cy, cw, ch, cloudObj[chk].x, cloudObj[chk].y, cloudObj[chk].width, cloudObj[chk].height )){
						ngFlag = true;break;
					}
				}

				//海面チェック
				if( cy >= (cmn.SCREEN_HEIGHT * (cmn.CloudAreaPattern.length-1+CLOUD_TOP))+100 )ngFlag = true;
				if( ngFlag ){i--; continue;}	//やり直し

				cloudObj[cloudCount] = tmpObj;
				cloudObj[cloudCount].tag = 100 + clID-cmn.OBJ_CLOUD_B;

				//ローカルメンバ
				cloudObj[cloudCount].actionFlag = false;
				cloudObj[cloudCount].zoomCount = cmn.getRandom(3);
				cloudObj[cloudCount].actionCount = 0;
				cloudObj[cloudCount].baseX = cloudObj[cloudCount].x;
				cloudObj[cloudCount].baseY = cloudObj[cloudCount].y;
				cloudObj[cloudCount].setAction = function () { this.actionFlag = true; };
				root.append( cloudObj[cloudCount] );

				cloudCount++;
			}

			//コメント弾幕生成
			for( i = 0; i < 1; i++){
				let genID = (cmn.CloudAreaPattern[ areaY ][ areaX ] / 10) |0;
				if(genID != 0){		//genID コメント弾幕生成番号

					genID--;	//0番からに補正
					tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, genID+cmn.OBJ_COMENT_1, cmn.getRandom( cmn.SCREEN_WIDTH ) + areaX* cmn.SCREEN_WIDTH , cmn.getRandom( cmn.SCREEN_HEIGHT ) + cmn.SCREEN_HEIGHT * (areaY+CLOUD_TOP));
					cx = tmpObj.x;
					cy = tmpObj.y;
					cw = tmpObj.width;
					ch = tmpObj.height;

					//海面チェック
					if( cy >= (cmn.SCREEN_HEIGHT * (cmn.CloudAreaPattern.length-1+CLOUD_TOP))+180 ){i--;continue;}	//やり直し

					cloudObj[cloudCount] = tmpObj;
					cloudObj[cloudCount].tag = cmn.MAP_COMMENT + genID;

					//ローカルメンバ
					cloudObj[cloudCount].actionFlag = false;
					cloudObj[cloudCount].invincibleFlag = false;
					cloudObj[cloudCount].actionCount = 0;
					cloudObj[cloudCount].scrlAddX = -(cmn.getRandom(6)+3);
					cloudObj[cloudCount].baseX = cloudObj[cloudCount].x;
					cloudObj[cloudCount].baseY = cloudObj[cloudCount].y;
					cloudObj[cloudCount].setAction = function () { this.actionFlag = true; this.invincibleFlag = cmn.getPlyTagNo() == cmn.TAG_ID_4; };	//無敵チェック
					root.append( cloudObj[cloudCount] );
					cloudCount++;
				}
			}

			//孔明の罠生成
			for( i = 0; i < 1; i++){
				let createID = ( cmn.TrapAreaPattern[ areaY ][ areaX ] ) |0;
				if(createID != 0){		//生成番号

					createID--;			//0番からに補正
					const spID = {0:cmn.MISS_SHIP, 1:cmn.MISS_CLOUD, 2:cmn.MISS_HOLE };	//データID→スプライトID 変換テーブル

					if(createID == 0){	//ニコ生クルーズ
						if(cmn.getRandom(30)>20)continue;//1/3でキャンセル
						tmpObj = cmn.createSprite(
							scene ,
							cmn.TBL_MISS,
							spID[ createID ],
							cmn.SCREEN_WIDTH/2 + areaX * cmn.SCREEN_WIDTH ,
							cmn.SCREEN_HEIGHT*1.5 + cmn.SCREEN_HEIGHT * (areaY+CLOUD_TOP)
						);
					}else{
						tmpObj = cmn.createSprite(
							scene ,
							cmn.TBL_MISS,
							spID[ createID ],
							cmn.getRandom( cmn.SCREEN_WIDTH ) + areaX * cmn.SCREEN_WIDTH ,
							cmn.getRandom( cmn.SCREEN_HEIGHT ) + cmn.SCREEN_HEIGHT * (areaY+CLOUD_TOP)
						);
					}

					cx = tmpObj.x;
					cy = tmpObj.y;
					cw = tmpObj.width;
					ch = tmpObj.height;

					//雲との重なりチェック
					ngFlag = false;
					for( chk = 0; chk < cloudCount; chk++){

					if( g.Collision.intersect( cx, cy, cw, ch, cloudObj[chk].x, cloudObj[chk].y, cloudObj[chk].width, cloudObj[chk].height )){
						ngFlag = true;break;
						}
					}
					if( ngFlag ){i--; continue;}	//やり直し

					cloudObj[cloudCount] = tmpObj;
					switch( createID ){
						case 0:	cloudObj[cloudCount].tag = cmn.MAP_MISS_SHIP; break;
						case 1:	cloudObj[cloudCount].tag = cmn.MAP_MISS_KOUMEI; break;
						case 2:	cloudObj[cloudCount].tag = cmn.MAP_MISS_HOLE; break;
					}

					cloudObj[cloudCount].tag + createID;

					//ローカルメンバ
					cloudObj[cloudCount].actionFlag = false;

					cloudObj[cloudCount].actionCount = 0;
					cloudObj[cloudCount].scrlAddX = 0;
					cloudObj[cloudCount].baseX = cloudObj[cloudCount].x;
					cloudObj[cloudCount].baseY = cloudObj[cloudCount].y;
					cloudObj[cloudCount].setAction = function () { this.actionFlag = true; };
					cloudObj[cloudCount].actFunc = null;

					root.append( cloudObj[cloudCount] );

					cloudCount++;
				}
			}
		}
	}
}

//雲定期処理
function cloudSpriteAction(clSp , cmtSpd , clID){
	const tagType = ((clSp.tag / 1000)|0) *1000;
	let addY = 0;

	if(tagType == 0){	//雲
		//通常時雲アニメーション
		clSp.zoomCount += 0.075;
		const zoom = Math.cos( clSp.zoomCount )/12.0;
		clSp.scaleX = 1.0+zoom;
		clSp.scaleY = 1.0+zoom;

		//アクション時アニメーション
		if(clSp.actionFlag == true){
			clSp.actionCount += 0.4;
			if(clSp.actionCount >= Math.PI*2 ){
				clSp.actionCount = 0;
				clSp.actionFlag = false;
			}else{
				addY = -Math.sin( clSp.actionCount )*25	;
			}
		}
	}else if(tagType == cmn.MAP_COMMENT){
		//コメント弾幕アニメーション
		clSp.x += clSp.scrlAddX * cmtSpd;

		//座標リセット＆新規固有IDに切り替え
		if(clSp.x < - cmn.SCREEN_WIDTH){
			clSp.x = cmn.SCREEN_WIDTH *9;

			cloudObj[clID] = cmn.createSprite( clSp.scene , cmn.TBL_OBJ, (clSp.tag - cmn.MAP_COMMENT) + cmn.OBJ_COMENT_1, clSp.x, clSp.y);
			//ローカルメンバ
			cloudObj[clID].tag = clSp.tag;
			cloudObj[clID].actionFlag = clSp.actionFlag;
			cloudObj[clID].actionCount = clSp.actionCount;
			cloudObj[clID].scrlAddX = clSp.scrlAddX;
			cloudObj[clID].baseX = clSp.baseX;
			cloudObj[clID].baseY = clSp.baseY;
			cloudObj[clID].setAction = clSp.setAction;
			clSp.parent.append( cloudObj[clID] );	//新規IDで登録
			clSp.destroy();							//旧オブジェクトは消去
		}

		//アクション時アニメーション
		if(clSp.actionFlag == true){
			if( !clSp.invincibleFlag ) {
				//通常時処理
				clSp.actionCount += 0.4;
				if(clSp.actionCount >= Math.PI*2 ){
					clSp.actionCount = 0;
					clSp.actionFlag = false;
				}else{
					addY = -Math.sin( clSp.actionCount )*25	;
				}
			}else{
				//無敵時処理
				clSp.actionCount += 0.03;
				if(clSp.actionCount >= 1.0 ){
					clSp.actionCount = 0;
					clSp.actionFlag = false;
					clSp.invincibleFlag = false;
					clSp.hide();
					clSp.x = - cmn.SCREEN_WIDTH;		//消去処理
				}else{
					clSp.scale(1+clSp.actionCount);
					clSp.opacity = 1-clSp.actionCount;
					clSp.angle += 15;
					addY = -Math.sin( clSp.actionCount )*90	;
				}
			}
		}
	}else if(tagType == cmn.MAP_MISS_KOUMEI){
		//アクション時アニメーション
		if(clSp.actionFlag == true){
			clSp.actionCount += 10;
			if(clSp.actionCount >= 200 ){
				clSp.opacity -= 0.08;
				if( clSp.opacity <= 0 ){
					clSp.hide();
					clSp.actionCount = 0;
					clSp.actionFlag = false;
					clSp.opacity = 1;
				}
			}
			clSp.x = clSp.actionCount+clSp.baseX;
		}
	}else if(tagType == cmn.MAP_MISS_HOLE){
		//ハズレ演出-土管
	}else if(tagType == cmn.MAP_BG_ANIM){
		//アクション時アニメーション
		if(clSp.actionFlag == true){
			clSp.actionCount += 30/60;
			if(clSp.actionCount >= 1 ){
				clSp.srcX = 211;
			}
		}
	}
	clSp.y = addY+clSp.baseY;
	clSp.modified();
}


//------------------
// テロップ管理
//------------------
//テロップ生成・設定
function setTelop ( scene, root , telopID) {
	if( telopID === undefined ) telopID = cmn.UI_TELOP_1;

	//同IDは未処理で戻る
	if(telopID == nowTelopID)return;
	nowTelopID = telopID;

	//ペインを一旦消す。
	if(telopPane!=null){
		telopPane.destroy();
		telopPane=null;
		telopFont=null;
	}

	if(telopID == -1){
		//消去時は戻る
		return;
	}else{
		//ペイン生成
		telopPane = new g.Pane({
			scene: scene,
			width: 122,
			height: 22,
			x: 136,
			y: 2
		});
	}

	telopFont = new g.E({scene: scene});
	for(let i = 0; i < 2; i++){
		let tmpFont = cmn.createSprite( scene, cmn.TBL_UI, telopID, 0, 0);

		tmpFont.x = tmpFont.width * i;
		tmpFont.y = 0;
		telopFont.append( tmpFont );

		//明滅アクション用
		let flashChk = 0;
		if( telopID == cmn.UI_TELOP_TAG1_1 || (telopID == cmn.UI_TELOP_TAG2_1) ){
			flashChk = 1;
		}

		tmpFont = cmn.createSprite( scene, cmn.TBL_UI, telopID+flashChk , 0, 0 );
		tmpFont.x = tmpFont.width * i;
		tmpFont.y = tmpFont.height;
		telopFont.append( tmpFont );
	}

	rollPos = 0;
	rollSpeed = cmn.telopRollSpeedData[ telopID - cmn.UI_TELOP_1 ];

	//テロップループ生成
	telopPane.append( telopFont );
	root.append( telopPane );

	//テロップ告知アクション
	if(telopFrame != null){
		telopFrame.destroy();
		telopFrame = null;
	}
	if(telopFrame == null){
		telopFrame = cmn.createSprite( scene, cmn.TBL_UI, cmn.UI_UIBASE_TELOP_2 , 0, 0 );
		telopFrame.timeCount=0;
		telopFrame.modified();

		root.append( telopFrame );
	}
}

//テロップリセット処理
function resetTelop(){
	//テロップ告知アクション
	if(telopFrame != null){
		telopFrame.destroy();
		telopFrame = null;
	}
}

//------------------
//タグ管理
//※E.tagと区別する為、taguと表記
//------------------
//タグ生成
function createTaguSprite( scene , root) {
	let tgDB = false;
	let i = 0;
	//配置位置
	const TAGU_TOP = 10;
	taguCount=0;
	for (let areaY = 0; areaY < cmn.taguAreaPattern.length; areaY++){
		for (let areaX = 0; areaX < cmn.taguAreaPattern[ areaY ].length; areaX++){
			//タグ生成
			const genCount = (cmn.taguAreaPattern[ areaY ][ areaX ] % 10);

			for( i = 0; i < genCount; i++){
			let tgID = (cmn.taguAreaPattern[ areaY ][ areaX ] / 10) |0;

			let tmpObj;
			let cx,cy,cw,ch;

			if(tgDB == true) {
				tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, tgID+cmn.OBJ_TAG_1, (areaY * 194) + areaX* cmn.SCREEN_WIDTH , cmn.SCREEN_HEIGHT * (areaY+TAGU_TOP));
			}else{
				if(tgID >= 7){		//特定IDのみエリア領域を変更
					const tgID2 = tgID-7 +2;
					tgID = cmn.TAG_ID_2;
					tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, tgID+cmn.OBJ_TAG_1, cmn.getRandom( cmn.SCREEN_WIDTH*tgID2 ) + areaX* cmn.SCREEN_WIDTH , cmn.getRandom( cmn.SCREEN_HEIGHT*tgID2 ) + cmn.SCREEN_HEIGHT * (areaY+TAGU_TOP));
				}else
					tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, tgID+cmn.OBJ_TAG_1, cmn.getRandom( cmn.SCREEN_WIDTH ) + areaX* cmn.SCREEN_WIDTH , cmn.getRandom( cmn.SCREEN_HEIGHT ) + cmn.SCREEN_HEIGHT * (areaY+TAGU_TOP));
				}

				cx = tmpObj.x;
				cy = tmpObj.y;
				cw = tmpObj.width;
				ch = tmpObj.height;

				let ngFlag = false;
				let chk = 0;
				for( chk = 0; chk < taguCount; chk++){
					if( g.Collision.intersect( cx, cy, cw, ch, taguObj[chk].x, taguObj[chk].y, taguObj[chk].width, taguObj[chk].height )){
						ngFlag = true;break;
					}
				}

				for( chk = 0; chk < cloudCount; chk++){
					if( g.Collision.intersect( cx, cy, cw, ch, cloudObj[chk].x, cloudObj[chk].y, cloudObj[chk].width, cloudObj[chk].height )){
						ngFlag = true;break;
					}
				}
				//海面チェック
				if( cy >= (cmn.SCREEN_HEIGHT * (cmn.taguAreaPattern.length-1+TAGU_TOP))+100 )ngFlag = true;
				if( ngFlag ){i--; continue;}	//やり直し

				taguObj[taguCount] = tmpObj;
				taguObj[taguCount].tag = tgID + cmn.MAP_TAGU;		//tagIDは雲と共通

				//ローカルメンバ
				taguObj[taguCount].actionFlag = false;
				taguObj[taguCount].zoomCount = cmn.getRandom(3);
				taguObj[taguCount].actionCount = 0;
				taguObj[taguCount].baseY = taguObj[taguCount].y;
				taguObj[taguCount].setAction = function () { this.actionFlag = true; };
				taguObj[taguCount].endCall = null;
				taguObj[taguCount].setEndcall= function ( callFunc ) { this.endCall = callFunc; };
				root.append( taguObj[taguCount] );

				taguCount++;
			}
		}
	}

	//固定タグ生成 1 (下降タグ1段目)
	tgID = cmn.TAG_ID_3;
	for( i = 0; i < 5; i++){
		tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, tgID+cmn.OBJ_TAG_1, i*180 , cmn.SCREEN_HEIGHT * 11-1 );
		taguObj[taguCount] = tmpObj;
		taguObj[taguCount].tag = tgID + cmn.MAP_TAGU;		//tagIDは雲と共通
		//ローカルメンバ
		taguObj[taguCount].actionFlag = false;
		taguObj[taguCount].zoomCount = cmn.getRandom(3);
		taguObj[taguCount].actionCount = 0;
		taguObj[taguCount].baseY = taguObj[taguCount].y;
		taguObj[taguCount].setAction = function () { this.actionFlag = true; };
		taguObj[taguCount].endCall = null;
		taguObj[taguCount].setEndcall= function ( callFunc ) { this.endCall = callFunc; };
		root.append( taguObj[taguCount] );
		taguCount++;
	}

	//固定タグ生成 2 (下降タグ1段目)
	tgID = cmn.TAG_ID_3;
	for( i = 0; i < 5; i++){
		tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, tgID+cmn.OBJ_TAG_1, (i+3)*180 , cmn.SCREEN_HEIGHT * 10-1 );
		taguObj[taguCount] = tmpObj;
		taguObj[taguCount].tag = tgID + cmn.MAP_TAGU;		//tagIDは雲と共通
		//ローカルメンバ
		taguObj[taguCount].actionFlag = false;
		taguObj[taguCount].zoomCount = cmn.getRandom(3);
		taguObj[taguCount].actionCount = 0;
		taguObj[taguCount].baseY = taguObj[taguCount].y;
		taguObj[taguCount].setAction = function () { this.actionFlag = true; };
		taguObj[taguCount].endCall = null;
		taguObj[taguCount].setEndcall= function ( callFunc ) { this.endCall = callFunc; };
		root.append( taguObj[taguCount] );
		taguCount++;
	}

	//固定タグ生成 3 (無敵タグ)
	tgID = cmn.TAG_ID_4;
	tmpObj = cmn.createSprite( scene , cmn.TBL_OBJ, tgID+cmn.OBJ_TAG_1, (3+3)*180 , cmn.SCREEN_HEIGHT * 10-1-125 );
	taguObj[taguCount] = tmpObj;
	taguObj[taguCount].tag = tgID + cmn.MAP_TAGU;		//tagIDは雲と共通
	//ローカルメンバ
	taguObj[taguCount].actionFlag = false;
	taguObj[taguCount].zoomCount = cmn.getRandom(3);
	taguObj[taguCount].actionCount = 0;
	taguObj[taguCount].baseY = taguObj[taguCount].y;
	taguObj[taguCount].setAction = function () { this.actionFlag = true; };
	taguObj[taguCount].endCall = null;
	taguObj[taguCount].setEndcall= function ( callFunc ) { this.endCall = callFunc; };
	root.append( taguObj[taguCount] );
	taguCount++;

}

//タグ定期処理
function taguSpriteAction( tgSp ){
	//アクション時アニメーション
	let addY = 0;

	if(tgSp.actionFlag == true){
		tgSp.actionCount += 0.03;
		if(tgSp.actionCount >= 1.0 ){
			tgSp.actionCount = 0;
			tgSp.actionFlag = false;
			if( tgSp.callFunc != null) tgSp.endCall(tgSp);
			tgSp.hide();
		}else{
			tgSp.scale(1+tgSp.actionCount);
			tgSp.opacity = 1-tgSp.actionCount;
		}
	}
	tgSp.y = addY+tgSp.baseY;
	tgSp.modified();
}

//タグリセット処理
function resetTaguSprite(){
	//タグ表示リセット
	let i = 0;
	for( i = 0; i < taguCount; i++){
		const tgSp = taguObj[i];
		tgSp.actionCount = 0;
		tgSp.actionFlag = false;
		tgSp.scaleX = 1.0;
		tgSp.scaleY = 1.0;
		tgSp.angle = 0.0;
		tgSp.opacity= 1.0;
		tgSp.show();
		tgSp.modified();
	}

	//各種表示リセット
	for( i = 0; i < cloudCount; i++){
		const clSp = cloudObj[i];
		const tagType = ((clSp.tag / 1000)|0) *1000;

		//罠表示リセット
		if( (tagType == cmn.MAP_MISS_SHIP) || (tagType == cmn.MAP_MISS_KOUMEI) ||
			(tagType == cmn.MAP_BG_ANIM) || (tagType == cmn.MAP_MISS_HOLE) ){
			clSp.actionCount = 0;
			clSp.actionFlag = false;
			clSp.show();
			if( tagType == cmn.MAP_BG_ANIM ){
				clSp.srcX = 0;
			}
			clSp.modified();
		}
	}
}


//------------------
//アタリ演出管理
//------------------
//アタリ演出生成
function createAnimationSprite( scene, animSpriteID, posx, posy, animEndCall){

	const spW = cmn.clearAnimParam[ animSpriteID ][0];
	const spH = cmn.clearAnimParam[ animSpriteID ][1];
	const imageName = (animSpriteID < 5) ? cmn.IMG_ANIM_CLEAR_L : cmn.IMG_ANIM_CLEAR_R;
	const animSpriteID2 = animSpriteID % 5;

	const animSprite = new g.FrameSprite({
		scene: scene,
		src: scene.assets[imageName],
		width: spW,
		height: spH,
		srcX: 487 * animSpriteID2,
		srcY: 0,
		srcWidth: spW,
		srcHeight: spH,
		x: posx,
		y: posy,
	});
	animSprite.actionCount = 0;

	//特定IDのみフェードタイムを変える
	if(animSpriteID==2)animSprite.actionCount=59;		//超ゲーム

	animSprite.interval = cmn.clearAnimTimeTbl[ animSpriteID ][0]*1000;	//再生間隔セット
	animSprite.oldFrameNumber = 0;

	animSprite.hide();

	//順に表示するテーブルを生成
	animSprite.frames = [];
	for(let i = 0; i < cmn.clearAnimParam[ animSpriteID ][2]; i++){
		animSprite.frames[i] = i*5 + animSpriteID2;
	}

	//終了時の呼び出し関数設定
	if( animEndCall === undefined )
		animSprite.endCall = function(){};
	else
		animSprite.endCall = animEndCall;

	//アニメーション終了時処理
	animSprite.onUpdate.add(() => {
		if( animSprite.oldFrameNumber != animSprite.frameNumber ){	//アニメーション更新時
			animSprite.interval = cmn.clearAnimTimeTbl[ animSpriteID ][animSprite.frameNumber]*1000;	//次の再生間隔セット
			animSprite.start();
		}
		animSprite.oldFrameNumber = animSprite.frameNumber;
		if (animSprite.frameNumber === animSprite.frames.length - 1){
			animSprite.stop();
			if( animSprite.actionCount == 60)animSprite.endCall();	//1秒待ち
			animSprite.actionCount++;
		}
	});

	return animSprite;
}

function createClearAnimation( animSpriteID, posx, posy, animEndCall){
	//終了時の呼び出し関数設定
	if( animEndCall === undefined )
		return createAnimationSprite( game.scene(), animSpriteID, posx, posy);
	else
		return createAnimationSprite( game.scene(), animSpriteID, posx, posy, animEndCall);
}

function createHitStagingEffect( hitID, posx, posy, animEndCall){

	//ペイン生成
	const stagePane = new g.Pane({
		scene: game.scene(),
		width: cmn.SCREEN_WIDTH+2,
		height: cmn.SCREEN_HEIGHT+2,
		x: 0,
		y: 0
	});

	const stageBG = new g.FilledRect({
		scene: game.scene(),
		//cssColor: stageBGColor[ hitID ],
		cssColor: cmn.clearAnimParam[ hitID ][3],
		width: cmn.SCREEN_WIDTH+8,
		height: cmn.SCREEN_HEIGHT+8,
		x: -4,
		y: -4,
		opacity: 0.0,
	});

	const tmpAnim = createClearAnimation( hitID, -2, -2,
	function () {
		this.stop();
		if(bgStep<=2)bgStep++; //待ち状況の時、1STEP進める
	});
	tmpAnim.scaleX = 2.0+(2/970);
	tmpAnim.scaleY = 2.0+(2/970);

	const logoSp1 = cmn.createSprite( game.scene(), cmn.TBL_CLR, cmn.CLEAR_LOGO_0, 134, -cmn.SCREEN_HEIGHT);
	const logoSp2 = cmn.createSprite( game.scene(), cmn.TBL_CLR, cmn.CLEAR_LOGO_1+hitID, 134, 0);
	logoSp2.hide();
	logoSp2.opacity = 0;

	stagePane.append( stageBG );
	stagePane.append( logoSp1 );
	stagePane.append( logoSp2 );
	stagePane.append( tmpAnim );
	cmn.stopBGM();

	let bgStep = 0;
	let tmpTimer = 0;
	stageBG.onUpdate.add(() => {

		if(bgStep == 0){	//フェードイン
			stageBG.opacity += 1/60;
			if(stageBG.opacity>=1.0){
				stageBG.opacity = 1.0;
				bgStep++;
				tmpTimer = 0;
			}
		}else if(bgStep == 1){	//ロゴイン
			logoSp1.y += cmn.SCREEN_HEIGHT/15;
			if(logoSp1.y >= 0){
				logoSp1.y = 0.0;
				tmpTimer++;
				if(tmpTimer >= 90){	//1.5秒停止後、遷移
					bgStep++;
					tmpTimer = 0;
					logoSp1.destroy();
					//アニメーション再生開始
					tmpAnim.show();
					tmpAnim.start();
					cmn.playSE(cmn.SND_JIN_1);
				}
			}
		}else if(bgStep == 2){
			//演出アニメーション 終了まで待つ
		}else if(bgStep == 3){	//フェードアウト
			tmpAnim.opacity -= 1/60;
			if(tmpAnim.opacity <= 0.0){
				tmpAnim.opacity = 0.0;
				tmpAnim.hide();
				logoSp2.show();
				bgStep++;
			}
			tmpAnim.modified();
		}else if(bgStep == 4){	//広告ロゴイン
			logoSp2.opacity += 1/60;
			if(logoSp2.opacity >= 1.0){
				logoSp2.opacity = 1.0;
				bgStep++;
				animEndCall();
			}
			logoSp2.modified();
		}
		stageBG.modified();
	});

	return stagePane;
}


//------------------
//ハズレ演出管理
//------------------
//ID1 ニコ生クルーズ
function createME1_water( drawArea , posX, posY ){
	const waves = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_SHIP_EFF_1, posX, posY+48);

	waves.actionCount = 0;
	waves.timeCount = 0;
	waves.scale( 1.0 );
	drawArea.append( waves );

	waves.onUpdate.add(() => {
		waves.actionCount += 0.075;
		waves.srcX = (waves.timeCount%1) == 0 ? 0:101;

		if(waves.actionCount>=1.0){
			waves.actionCount=0;
			waves.destroy();
		}
		waves.timeCount++;
	});
}

function createMissEffect1( drawArea, animEndCall){
	const efBG = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_SHIP_BG, 0, 0);
	const ship = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_SHIP_ANIM, cmn.SCREEN_WIDTH/2, cmn.SCREEN_HEIGHT/2-16);

	const waterPlane = new g.E({
		scene: game.scene(),
		width: cmn.SCREEN_WIDTH,
		height: cmn.SCREEN_HEIGHT,
		x: 0,
		y: 0
	});

	const edgeTop = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, 0);
	const edgeBtm = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, 220);
	edgeTop.width += 8.0;
	edgeBtm.width += 8.0;

	const maskBG = new g.FilledRect({
		scene: game.scene(),
		cssColor: "#000000",
		width: cmn.SCREEN_WIDTH,
		height: cmn.SCREEN_HEIGHT,
		x: 0,
		y: 0,
		opacity: 0.0,
	});

	drawArea.append( efBG );
	drawArea.append( ship );
	drawArea.append( waterPlane );
	drawArea.append( edgeTop );
	drawArea.append( edgeBtm );
	drawArea.append( maskBG );

	efBG.hide();
	ship.hide();
	edgeTop.hide();
	edgeBtm.hide();

	let bgStep = 0;
	let tmpTimer = 0;
	drawArea.onUpdate.add(() => {
		if(bgStep == 0){	//フェードイン
			maskBG.opacity +=0.03;
			if(maskBG.opacity >= 1){
				efBG.show();
				ship.show();
				edgeTop.show();
				edgeBtm.show();
				bgStep++;
			}
		}else if(bgStep == 1){	//フェードアウト
			maskBG.opacity -=0.03;
			if(maskBG.opacity <= 0){
				maskBG.destroy();
				bgStep++;
			}
		}else if(bgStep == 2){	//待ち
			tmpTimer++;
			if(tmpTimer >= 30){
				bgStep++;
				tmpTimer = 0;
			}
		}else if(bgStep == 3){	//船アウト
			tmpTimer++;
			ship.x -=10;

			if((tmpTimer%3) == 0){
				createME1_water(waterPlane, ship.x+5, ship.y);
			}

			if((tmpTimer%12) == 0){
				cmn.playSE(cmn.SND_SE_3);
			}

			if( ship.x <= 0-250 ){
				tmpTimer = 0;
				bgStep++;
			}
		}else if(bgStep == 4){	//終了待ち
			tmpTimer++;
			if(tmpTimer==1){
				animEndCall();
			}
		}else if(bgStep == 5){	//終了
		}

		ship.modified();
		edgeTop.modified();
		edgeBtm.modified();
	});
	return;
}

//ID2 孔明の罠
function createMissEffect2( posX, posY, animEndCall){
	const komeiCloud = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_CLOUD, posX, posY);

	komeiCloud.targetX = posX + 200;
	komeiCloud.endCall = animEndCall;
	komeiCloud.onUpdate.add(() => {
		komeiCloud.x += 8;
		if( komeiCloud.targetX <= komeiCloud.x ){
			komeiCloud.opacity -= 0.05;
			if( komeiCloud.opacity <= 0 ){
				komeiCloud.endCall();
				komeiCloud.destroy();
			}
		}
		komeiCloud.modified();
	});
	return komeiCloud;
}

//ID3 土管
function createMissEffect3( drawArea, animEndCall){
	const efBG = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_HOLE_BG, 0, 0);
	const pipe = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_HOLE, cmn.SCREEN_WIDTH/2-79, cmn.SCREEN_HEIGHT/2-20);
	const tvChan = cmn.createSprite( game.scene(), cmn.TBL_UI, cmn.UI_CHARA_TV , cmn.SCREEN_WIDTH/2-44, -60);
	//雲
	const cloud = [];
	let i = 0;
	for( i = 0; i < 5; i++){
		cloud[i] = cmn.createSprite( game.scene(), cmn.TBL_OBJ, cmn.OBJ_CLOUD_B+missEff3_clTbl[i][0] , cmn.SCREEN_WIDTH/2+missEff3_clTbl[i][1], 125+missEff3_clTbl[i][2] );
		cloud[i].actionFlag = false;
		cloud[i].zoomCount = cmn.getRandom(3);
		cloud[i].hide();
	}

	const edgeTop = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, 0);
	const edgeBtm = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, 220);
	edgeTop.width += 8.0;
	edgeBtm.width += 8.0;

	const maskBG = new g.FilledRect({
		scene: game.scene(),
		cssColor: "#000000",
		width: cmn.SCREEN_WIDTH,
		height: cmn.SCREEN_HEIGHT,
		x: 0,
		y: 0,
		opacity: 0.0,
	});

	pipe.scaleX = 1.1;
	pipe.scaleY = 1.1;

	drawArea.append( efBG );
	drawArea.append( tvChan );
	drawArea.append( pipe );

	for( i = 0; i < 5; i++){
		drawArea.append( cloud[i] );
	}

	drawArea.append( edgeTop );
	drawArea.append( edgeBtm );
	drawArea.append( maskBG );

	efBG.hide();
	pipe.hide();
	edgeTop.hide();
	edgeBtm.hide();

	let bgStep = 0;
	let tmpTimer = 0;
	drawArea.onUpdate.add(() => {
		if(bgStep == 0){	//フェードイン
			maskBG.opacity +=0.03;
			if(maskBG.opacity >= 1){
				efBG.show();
				tvChan.show();
				pipe.show();

				for(let i = 0; i < 5; i++){
					cloud[i].show();
					cloud[i].actionFlag = true;
				}

				edgeTop.show();
				edgeBtm.show();
				bgStep++;
			}
		}else if(bgStep == 1){	//フェードアウト
			maskBG.opacity -=0.03;
			if(maskBG.opacity <= 0){
				maskBG.destroy();
				bgStep++;
			}
		}else if(bgStep == 2){	//待ち
			tmpTimer++;
			if(tmpTimer >= 15){
				bgStep++;
				tmpTimer = 0;
			}
		}else if(bgStep == 3){	//TVちゃんアウト
			tmpTimer++;
			if(tmpTimer==60)cmn.playSE(cmn.SND_SE_7);
			tvChan.angle += 8;
			tvChan.y +=2;

			if( tvChan.y >= cmn.SCREEN_HEIGHT/2 ){
				tvChan.destroy();
				bgStep++;
				tmpTimer = 0;
			}
		}else if(bgStep == 4){	//終了待ち
			tmpTimer++;
			if(tmpTimer==100){
				bgStep++;
				animEndCall();

				for( i = 0; i < 5; i++){
					cloud[i].actionFlag = false;
				}
			}
		}else if(bgStep == 5){	//終了
		}

		//雲アニメ
		if(0 <= bgStep && bgStep < 5){
			for( i = 0; i < 5; i++){
				if(cloud[i].actionFlag){
					cloud[i].zoomCount += 0.075;
					const zoom = Math.cos( cloud[i].zoomCount )/12.0;
					cloud[i].scaleX = 1.0+zoom;
					cloud[i].scaleY = 1.0+zoom;
					cloud[i].modified();
				}
			}
		}

		pipe.modified();
		tvChan.modified();
		edgeTop.modified();
		edgeBtm.modified();
	});

	return;
}

//ID4 次回予告
function createMissEffect4( drawArea, animEndCall){
	const edgeTop = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, -30);
	const edgeBtm = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, 250);

	edgeTop.width += 8.0;
	edgeBtm.width += 8.0;

	const logoSp1 = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_TEXT1, 0, 0);
	const logoSp2 = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_TEXT2, 0, 0);

	logoSp1.hide();
	logoSp2.hide();
	logoSp1.baseX = 65;
	logoSp1.baseY = 48;
	logoSp2.baseX =383;
	logoSp2.baseY = 37;

	drawArea.append( edgeTop );
	drawArea.append( edgeBtm );
	drawArea.append( logoSp1 );
	drawArea.append( logoSp2 );

	let bgStep = 0;
	let tmpTimer = 0;
	let effCount = 0;
	drawArea.onUpdate.add(() => {
		if(bgStep == 0){	//上下枠イン
			edgeTop.y += 30 / 15;
			edgeBtm.y -= 30 / 15;
			if(edgeTop.y >= 0){
				edgeTop.y = 0;
				edgeBtm.y = 220;
				bgStep++;
				tmpTimer = 0;
			}
		}else if(bgStep == 1){	//待ち
			tmpTimer++;
			if(tmpTimer >= 30){
				bgStep++;
				tmpTimer = 0;
				logoSp1.show();
				effCount = 60;
			}
		}else if(bgStep == 2){	//ロゴ出し
			effCount -=5;
			if(effCount>0){
				logoSp1.x = logoSp1.baseX + cmn.getRandom( effCount ) - effCount/2;
				logoSp1.y = logoSp1.baseY + cmn.getRandom( effCount ) - effCount/2;

				if((effCount%8) == 0){
					cmn.playSE(cmn.SND_SE_1);
				}
			}
			else{
				logoSp1.x = logoSp1.baseX;
				logoSp1.y = logoSp1.baseY;
			}
			tmpTimer++;
			if(tmpTimer >= 120){
				bgStep++;
				tmpTimer = 0;
				logoSp1.hide();
				logoSp2.show();
				effCount = 60;
			}
		}else if(bgStep == 3){	//ロゴ切り替え
			effCount -=5;
			if(effCount>0){
				logoSp2.x = logoSp2.baseX + cmn.getRandom( effCount ) - effCount/2;
				logoSp2.y = logoSp2.baseY + cmn.getRandom( effCount ) - effCount/2;
			}else if(effCount == 0){
				cmn.playSE(cmn.SND_SE_7);
			}else{
				logoSp2.x = logoSp2.baseX;
				logoSp2.y = logoSp2.baseY;
			}

			tmpTimer++;
			if(tmpTimer >= 120){
				bgStep++;
				tmpTimer = 0;
			}
		}else if(bgStep == 4){
			//演出アニメーション 終了まで待つ
				bgStep++;
				animEndCall();
		}else if(bgStep == 5){	//広告ロゴイン
		}

		logoSp1.modified();
		logoSp2.modified();
		edgeTop.modified();
		edgeBtm.modified();
	});

	return;
}

//ID5 永遠に
function createMissEffect5( drawArea, animEndCall){

	const efBG = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_STAR_BG, 0, 0);
	const font1 = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_STAR_TEXT1, 88, 32);
	const font2 = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_STAR_TEXT2, 478, 137);
	const star1 = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_STAR_EFF, 734, 18);
	const star2 = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_STAR_EFF, 868, 173);
	const tvChan = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_STAR_TV, 713, 6);
	const edgeTop = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, -30);
	const edgeBtm = cmn.createSprite( game.scene(), cmn.TBL_MISS, cmn.MISS_YOKOKU_WINDOW, 0, 250);

	edgeTop.width += 8.0;
	edgeBtm.width += 8.0;

	font1.hide();
	font2.hide();
	star1.hide();
	star2.hide();
	tvChan.hide();

	font1.opacity = 0;
	font2.opacity = 0;
	star1.opacity = 0;
	star2.opacity = 0;
	tvChan.opacity = 0;

	drawArea.append( efBG );
	drawArea.append( font1 );
	drawArea.append( font2 );
	drawArea.append( tvChan );
	drawArea.append( star1 );
	drawArea.append( star2 );
	drawArea.append( edgeTop );
	drawArea.append( edgeBtm );

	let bgStep = 0;
	let tmpTimer = 0;
	drawArea.onUpdate.add(() => {

		if(bgStep == 0){	//上下枠イン
			edgeTop.y += 30 / 15;
			edgeBtm.y -= 30 / 15;

			if(edgeTop.y >= 0){
				edgeTop.y = 0;
				edgeBtm.y = 220;
				bgStep++;
				tmpTimer = 0;
			}
		}else if(bgStep == 1){	//待ち

			tmpTimer++;
			if(tmpTimer >= 30){
				bgStep++;
				tmpTimer = 0;
				font1.show();
			}
		}else if(bgStep == 2){	//font1フェードイン
			font1.opacity += 1/60;

			if(font1.opacity >= 1){
				bgStep++;
				font1.opacity = 1;
				font2.show();

				cmn.playSE(cmn.SND_SE_1);
			}
		}else if(bgStep == 3){	//font2フェードイン
			font2.opacity += 1/60;
			if(font2.opacity >= 1){
				bgStep++;
				font2.opacity = 1;
				tvChan.show();

				cmn.playSE(cmn.SND_SE_1);
			}
		}else if(bgStep == 4){	//tvChanフェードイン
			tvChan.opacity += 1/60;

			if(tvChan.opacity >= 1){
				bgStep++;
				tvChan.opacity = 1;
				star1.show();
				star2.show();

				star1.opacity = 1;
				star2.opacity = 1;

				cmn.playSE(cmn.SND_SE_1);
			}
		}else if(bgStep == 5){	//star明滅
			star1.opacity = Math.sin(tmpTimer/10)+1/2;
			star2.opacity = Math.sin((tmpTimer+15)/10)+1/2;
			tmpTimer++;
			if(tmpTimer==120){
				animEndCall();
			}
		}else if(bgStep == 5){	//終了
		}

		font1.modified();
		font2.modified();
		star1.modified();
		star2.modified();
		tvChan.modified();
		edgeTop.modified();
		edgeBtm.modified();
	});
	return;
}

//ハズレ演出生成
function createMissEffect( missID, posx, posy, animEndCall){

	//ペイン生成
	const drawArea = new g.E({
		scene: game.scene(),
		width: cmn.SCREEN_WIDTH,
		height: 30,
		x: 0,
		y: 0
	});

	switch( missID ){
		case 1: createMissEffect1( drawArea, animEndCall); break;
		case 2: return createMissEffect2( posx, posy, animEndCall);
		case 3: createMissEffect3( drawArea, animEndCall); break;
		case 4: createMissEffect4( drawArea, animEndCall); break;
		case 5: createMissEffect5( drawArea, animEndCall); break;
	}

	return drawArea;
}


module.exports.callSubGameUpdate = callSubGameUpdate;

module.exports.createGameBg = createGameBg;
module.exports.createGameBgFront = createGameBgFront;

module.exports.setTelop = setTelop;
module.exports.resetTelop = resetTelop;
module.exports.resetTaguSprite = resetTaguSprite;

module.exports.createHitStagingEffect = createHitStagingEffect;
module.exports.createMissEffect = createMissEffect;

