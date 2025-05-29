Object.defineProperty(exports, "__esModule", { value: true });
exports.createTitleScene = void 0;
const Global_1 = require("./Global");
const ScreenEffector_1 = require("./ScreenEffector");
const gameScene_1 = require("./gameScene");
const math = require("./Math");
// タイトルシーン表示時間
const TIME_LIMIT = 4;
//
// さざなみ発生
//
function ripple(heights, frame) {
    const hn = heights[(frame + 2) % 3];
    const hc = heights[(frame + 1) % 3];
    const hp = heights[(frame + 0) % 3];
    const c = 0.25;
    for (let y = 0; y < hn.length; y++) {
        for (let x = 0; x < hn[y].length; x++) {
            const yp = Math.max(0, y - 1);
            const yn = Math.min(hn.length - 1, y + 1);
            const xp = Math.max(0, x - 1);
            const xn = Math.min(hn[y].length - 1, x + 1);
            hn[y][x] = 2 * hc[y][x] + c * (hc[y][xp] + hc[y][xn] + hc[yp][x] + hc[yn][x] - 4 * hc[y][x]) - hp[y][x];
            hn[y][x] *= 0.95;
        }
    }
    return hn;
}
//
// さざなみの高さを矩形の色に反映
//
function updateCellColor(cells, hc) {
    for (let i = 0; i < hc.length; i++) {
        for (let j = 0; j < hc[i].length; j++) {
            const intensity = Math.min(1.0, Math.max(0, (hc[i][j] + 1) / 2));
            const cell = cells[i][j];
            const R = (0x10 + 0x10 * intensity) | 0;
            const G = (0x10 + 0x10 * intensity) | 0;
            const B = 0xFF * intensity | 0;
            cell.cssColor = "#" + ("000000" + ((R << 16) | (G << 8) | B).toString(16)).slice(-6);
            cell.modified();
        }
    }
}
//
// さざなみ描画のための矩形群生成
//
function createCells(scene, root, cellSize) {
    const cells = [];
    for (let i = 0; i < g.game.height / cellSize; i++) {
        const row = [];
        for (let j = 0; j < g.game.width / cellSize; j++) {
            const cell = new g.FilledRect({
                scene: scene,
                cssColor: "#000020",
                width: cellSize,
                height: cellSize,
                x: cellSize * j,
                y: cellSize * i
            });
            row.push(cell);
            root.append(cell);
        }
        cells.push(row);
    }
    return cells;
}
//
// さざなみ計算用バッファ生成
//
function createHeightBuffer(cellSize) {
    const heights = [];
    const aryLen = g.game.width / cellSize;
    for (let i = 0; i < 3; i++) {
        const col = [];
        for (let j = 0; j < g.game.height / cellSize; j++) {
            const ary = Array(aryLen);
            for (let i = 0; i < aryLen; i++)
                ary[i] = 0;
            col.push(ary);
        }
        heights.push(col);
    }
    return heights;
}
//
// タイトルシーン生成
//
function createTitleScene() {
    // "version" は未使用。使用する場合は npm run build:version で version.txt 生成すること。
    const scene = new g.Scene({ game: g.game, assetPaths: ["/text/version.txt"] });
    scene.onLoad.add(() => {
        const root = new ScreenEffector_1.ScreenEffector({
            scene: scene,
            width: g.game.width,
            height: g.game.height,
            touchable: true,
            mosaicLevel: 60
        });
        scene.append(root);
        const cellSize = 16;
        const cells = createCells(scene, root, cellSize);
        const heights = createHeightBuffer(cellSize);
        const titleImageAsset = scene.asset.getImage("/image/title.png");
        const title = new g.Sprite({
            scene: scene,
            src: titleImageAsset,
            x: (g.game.width - titleImageAsset.width) / 2,
            y: (g.game.height - titleImageAsset.height) / 2,
            touchable: true
        });
        root.append(title);
        const timerLabel = new g.Label({
            scene: scene,
            text: "-.--",
            font: Global_1.Global.bmpFont,
            fontSize: 16,
            x: g.game.width - (16 * 4 + 4),
            y: g.game.height - (16 + 4)
        });
        root.append(timerLabel);
        let cntr = 0;
        scene.onUpdate.add(() => {
            if (root.mosaicLevel > 1) {
                root.mosaicLevel--;
            }
            else {
                if (math.random() < 0.05) {
                    const x = cells[0].length * math.random() | 0;
                    const y = cells.length * math.random() | 0;
                    heights[(cntr + 1) % 3][y][x] = 2.0;
                }
            }
            updateCellColor(cells, ripple(heights, cntr));
            const remainInSec = Math.max(0, TIME_LIMIT - cntr / g.game.fps);
            timerLabel.text = remainInSec === 0 ? "0.00" : (((remainInSec * 100) | 0) / 100) + "";
            timerLabel.invalidate();
            if (cntr === g.game.fps * TIME_LIMIT) {
                root.startBlur();
                scene.setTimeout(() => {
                    g.game.replaceScene((0, gameScene_1.createGameScene)());
                }, 1000);
            }
            cntr++;
        });
    });
    return scene;
}
exports.createTitleScene = createTitleScene;
