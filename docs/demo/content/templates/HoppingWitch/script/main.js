const Tile = require("@akashic-extension/akashic-tile").Tile;

const game = g.game;

// タイルの幅
const TILE_WIDTH = 32;

// タイルの高さ
const TILE_HEIGHT = 32;

// 重力加速度
const GRAVITY_ACC = 500;

// ホップ初速度
const HOPPING_SPD = -Math.sqrt((TILE_HEIGHT * 2) * 2 * GRAVITY_ACC);

// スクロール速度
const SCROLL_SPD = (TILE_WIDTH * 2) / (Math.abs(HOPPING_SPD) / GRAVITY_ACC * 2);

let gameCore;

let globalCntr = 0;

//
// プレイヤークラス
//
function Player(params) {
    this.width = params.width;
    this.height = params.height;
    this.x = { x: params.x, y: params.y };
    this.v = { x: 0, y: 0 };
}

// プレイヤー状態更新
Player.prototype.update = function(hopping) {
    const dt = 1 / game.fps;

    if (hopping) {
        this.v.y = HOPPING_SPD;
    } else {
        const a = { x: 0, y: GRAVITY_ACC };
        this.v.x += a.x * dt;
        this.v.y += a.y * dt;
    }
    this.x.x += this.v.x * dt;
    this.x.y += this.v.y * dt;
}


//
// ゲームコアクラス
//
function GameCore(map, pcParams) {
    this.map = map;
    this.pcParams = pcParams;
    this.reset();
}

// 初期化
GameCore.prototype.reset = function() {
    this.state = "title";
    this.scroll = 0;
    this.scrollSpeed = SCROLL_SPD;
    this.touched = false;
    this.pc = null;
    this.score = 0;
}

// ゲーム開始
GameCore.prototype.start = function() {
    this.state = "playing";
    this.scroll = 0;
    this.scrollSpeed = SCROLL_SPD;
    this.touched = false;
    this.pc = new Player(this.pcParams);
    this.score = 0;
}

// 当たり判定
GameCore.prototype.checkCollision = function() {
    const pc = this.pc;
    const top = Math.floor(pc.x.y / TILE_HEIGHT);
    const bottom = Math.floor((pc.x.y + pc.width) / TILE_HEIGHT);
    const left = Math.floor((pc.x.x + this.scroll) / TILE_WIDTH);
    const right = Math.floor((pc.x.x + this.scroll + pc.width) / TILE_WIDTH);

    for (let y = top; y <= bottom; y++) {
        for (let x = left; x <= right; x++) {
            if (this.map[y][x] !== -1) {
                return true;
            }
        }
    }

    return false;
}

// ゲーム状態更新
GameCore.prototype.update = function() {
    const dt = 1 / game.fps;

    if (this.state !== "result") {
        this.scroll += this.scrollSpeed * dt;
        if (this.scroll <= 0 || this.scroll >= this.map[0].length * TILE_WIDTH - game.width) {
            this.scrollSpeed *= -1;
        }

        if (this.pc) {
            this.pc.update(this.touched);
            if (this.checkCollision()) {
                this.state = "result";
            } else {
                ++this.score;
            }
        }
    }

    this.touched = false;
}

//
// タイトル画面UI生成関数
//
function createTitleUI(scene) {
    const root = new g.E({scene: scene});

    const titlePosY = 112;
    const title = new g.Sprite({
        scene: scene,
        src: scene.asset.getImageById("title"),
        x: 128, y: titlePosY
    });
    scene.onUpdate.add(() => {
        title.y = titlePosY - 24 * Math.abs(Math.sin(10 * globalCntr / 180 * Math.PI));
        title.modified();
    });
    root.append(title);

    const startBtn = new g.Sprite({
        scene: scene,
        src: scene.asset.getImageById("button_start"),
        x: 192, y: 272,
        touchable: true
    });
    startBtn.onPointDown.add(() => {
        startBtn.x += 4;
        startBtn.y += 4;
        startBtn.modified();
    });
    startBtn.onPointUp.add(() => {
        startBtn.x -= 4;
        startBtn.y -= 4;
        startBtn.touchable = false;
        startBtn.modified();
        scene.setTimeout(() => {
            gameCore.start();
            root.destroy();
        }, 100);
    });
    root.append(startBtn);

    return root;
}

//
// リザルト画面UI生成関数
//
function createResultUI(scene) {
    const root = new g.E({scene: scene});

    const backBtn = new g.Sprite({
        scene: scene,
        src: scene.asset.getImageById("button_back"),
        x: 192, y: 272,
        touchable: true
    });

    backBtn.onPointDown.add(() => {
        backBtn.x += 4;
        backBtn.y += 4;
        backBtn.modified();
    });

    backBtn.onPointUp.add(() => {
        backBtn.x -= 4;
        backBtn.y -= 4;
        backBtn.touchable = false;
        backBtn.modified();
        scene.setTimeout(() => {
            gameCore.reset();
            root.destroy();
            scene.append(createTitleUI(scene));
        }, 100);
    });

    let amp = game.width / 2;
    let scaleAdd = 1;
    const gameover = new g.Sprite({
        scene: scene,
        src: scene.asset.getImageById("gameover"),
        x: 80 + amp, y: 160,
        scaleX: 1 + scaleAdd,
        scaleY: 1 + scaleAdd
    });
    gameover.onUpdate.add(() => {
        amp *= -0.85;
        scaleAdd *= 0.85;
        if (Math.abs(amp) < 1) {
            amp = 0;
            scaleAdd = 0;
            root.append(backBtn);
            gameover.onUpdate.removeAll();
        }
        gameover.x = 80 + amp;
        gameover.scaleX = 1 + scaleAdd;
        gameover.scaleY = 1 + scaleAdd;
        gameover.modified();
    });
    root.append(gameover);

    return root;
}

//
// スコアテキスト
//
function scoreText(score, prefix) {
    return (prefix ? prefix : "") + " " + ("0000000" + score).substr(-8);
}

//
// エントリーポイント
//
module.exports = function() {
    const scene = new g.Scene({game: game, assetIds: [
        "background",
        "button_back",
        "button_start",
        "font16",
        "gameover",
        "glyph_area",
        "map",
        "map_data",
        "player",
        "title",
        "version"
    ]});

    scene.onLoad.add(() => {
        let hiScore = 0;

        gameCore = new GameCore(
            JSON.parse(scene.asset.getTextById("map_data").data),
            {
                x: game.width / 2,
                y: game.height / 2,
                width: scene.asset.getImageById("player").width,
                height: scene.asset.getImageById("player").height
            }
        );

        scene.append(new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("background")
        }));

        const tile = new Tile({
            scene: scene,
            src: scene.asset.getImageById("map"),
            tileWidth: TILE_WIDTH,
            tileHeight: TILE_HEIGHT,
            tileData: gameCore.map
        });
        scene.append(tile);

        const pcSpr = new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("player"),
            hidden: true
        });
        scene.append(pcSpr);

        const fontSize = 16;
        const bmpFont = new g.BitmapFont({
            src: scene.asset.getImageById("font16"),
            map: JSON.parse(scene.asset.getTextById("glyph_area").data),
            defaultGlyphWidth: fontSize,
            defaultGlyphHeight: fontSize
        });

        const scoreLabel = new g.Label({
            scene: scene,
            text: "",
            font: bmpFont,
            fontSize: fontSize,
            x: 4, y: 4
        });
        scene.append(scoreLabel);

        const hiScoreLabel = new g.Label({
            scene: scene,
            text: "",
            font: bmpFont,
            fontSize: fontSize,
            x: game.width - (fontSize * scoreText(0, "HI").length + 4), y: 4
        });
        scene.append(hiScoreLabel);

        const versionText = "ver " + scene.asset.getTextById("version").data.replace(/[\r\n]/g, "");
        const verLabel = new g.Label({
            scene: scene,
            text: versionText,
            font: bmpFont,
            fontSize: fontSize,
            x: game.width - (fontSize * versionText.length + 4), y: game.height - (fontSize + 4)
        });
        scene.append(verLabel);

        scene.append(createTitleUI(scene));

        scene.onUpdate.add(() => {
            const prevState = gameCore.state;
            globalCntr++;

            // ゲーム状態更新
            gameCore.update();

            // プレイヤーキャラの描画位置など更新
            if (gameCore.pc) {
                pcSpr.show();
                pcSpr.x = gameCore.pc.x.x;
                pcSpr.y = gameCore.pc.x.y;
                pcSpr.scaleX = gameCore.scrollSpeed >= 0 ? 1 : -1;
                pcSpr.modified();
            } else {
                pcSpr.hide();
            }

            // スコア描画更新
            hiScore = Math.max(hiScore, gameCore.score);
            scoreLabel.text = scoreText(gameCore.score, "SCORE");
            scoreLabel.invalidate();
            hiScoreLabel.text = scoreText(hiScore, "HI");
            hiScoreLabel.invalidate();

            // タイル位置更新
            tile.x = -gameCore.scroll;
            tile.modified();

            // バージョンラベル表示状態更新
            gameCore.state === "title" ? verLabel.show() : verLabel.hide();

            if (prevState !== "result" && gameCore.state === "result") {
                scene.append(createResultUI(scene));
            }
        });

        scene.onPointDownCapture.add(() => {
            if (gameCore.state === "playing") {
                gameCore.touched = true;
            }
        });
    });

    g.game.pushScene(scene);
}
