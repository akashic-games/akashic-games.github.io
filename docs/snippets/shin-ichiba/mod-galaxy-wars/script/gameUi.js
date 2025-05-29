// ゲームUIに関するモジュールをこのファイルにまとめた
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpecialAttackButton = exports.createGameStickEntity = void 0;
const Global_1 = require("./Global");
const Player_1 = require("./Player");
/**
 * バーチャルゲームパッドのエンティティを生成する関数
 */
function createGameStickEntity(scene, image, area, size, func) {
    const width = area.width > size.width ? area.width : size.width;
    const height = area.height > size.height ? area.height : size.height;
    const entity = new g.E({
        scene,
        x: area.x,
        y: area.y,
        width,
        height
    });
    const gameStickInitialX = Math.round(width / 2);
    const gameStickInitialY = Math.round(height / 2);
    const gameStickBack = new g.Sprite({
        scene,
        src: image,
        x: gameStickInitialX,
        y: gameStickInitialY,
        scaleX: width / image.width,
        scaleY: height / image.height,
        anchorX: 0.5,
        anchorY: 0.5,
        opacity: 0.5
    });
    entity.append(gameStickBack);
    const gameStick = new g.Sprite({
        scene,
        src: image,
        x: gameStickInitialX,
        y: gameStickInitialY,
        scaleX: size.width / image.width,
        scaleY: size.height / image.height,
        anchorX: 0.5,
        anchorY: 0.5,
        touchable: true
    });
    gameStick.onPointMove.add(ev => {
        let dx = ev.prevDelta.x;
        let dy = ev.prevDelta.y;
        if (gameStick.x + dx < 0 || gameStick.x + dx > width) {
            dx = 0;
        }
        if (gameStick.y + dy < 0 || gameStick.y + dy > height) {
            dy = 0;
        }
        gameStick.moveBy(dx, dy);
        gameStick.modified();
    });
    gameStick.onPointUp.add(_ev => {
        gameStick.moveTo(gameStickInitialX, gameStickInitialY);
        gameStick.modified();
    });
    gameStick.onUpdate.add(_ev => {
        func({ x: (gameStick.x - gameStickInitialX) / (width / 2), y: (gameStick.y - gameStickInitialY) / (height / 2) });
    });
    entity.append(gameStick);
    return entity;
}
exports.createGameStickEntity = createGameStickEntity;
/**
 * 必殺技ボタンのエンティティを生成する関数
 */
function createSpecialAttackButton(scene, area) {
    const entity = new g.E({
        scene,
        x: area.x,
        y: area.y,
        width: area.width,
        height: area.height,
        touchable: true
    });
    const backRect = new g.FilledRect({
        scene,
        width: area.width,
        height: area.height,
        cssColor: "gray"
    });
    entity.append(backRect);
    const label = new g.Label({
        scene,
        text: "SPECIAL",
        font: Global_1.Global.bmpFont,
        fontSize: 16
    });
    entity.append(label);
    const gageRect = new g.FilledRect({
        scene,
        width: 0,
        height: area.height,
        cssColor: "green",
        opacity: 0.7
    });
    entity.append(gageRect);
    let ableButton = false;
    entity.onPointDown.add(() => {
        if (!ableButton) {
            g.game.scene().asset.getAudioById("disable").play();
            return;
        }
        ableButton = false;
        Global_1.Global.gameCore.player.specialAttack();
    });
    entity.onUpdate.add(() => {
        const rate = Global_1.Global.gameCore.player.sp / Player_1.Player.MAX_SP;
        if (rate === 1) {
            ableButton = true;
            gageRect.opacity = ((g.game.age % 5) / 4) * 0.5 + 0.2;
        }
        else {
            ableButton = false;
            gageRect.opacity = 0.7;
        }
        gageRect.width = Math.round(rate * area.width);
        gageRect.modified();
    });
    return entity;
}
exports.createSpecialAttackButton = createSpecialAttackButton;
