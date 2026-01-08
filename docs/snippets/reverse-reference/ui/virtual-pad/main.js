function main(param) {
    const scene = new g.Scene({
        game: g.game,
        assetPaths: ["/image/player.png", "/image/gameStick.png"]
    });
    scene.onLoad.add(() => {
        // 各アセットオブジェクトを取得します
        const playerImageAsset = scene.asset.getImage("/image/player.png");
        const gameStickAsset = scene.asset.getImage("/image/gameStick.png");
        // プレイヤーを生成します
        const player = new g.Sprite({
            scene: scene,
            src: playerImageAsset,
            width: playerImageAsset.width,
            height: playerImageAsset.height
        });
        // プレイヤーの初期座標を、画面の中心に設定します
        player.x = (g.game.width - player.width) / 2;
        player.y = (g.game.height - player.height) / 2;
        // 操作方法としてバーチャルスティックを追加します
        const padSize = 100; // パッドのサイズ
        const virtualPadSize = 72; // スティックサイズ
        const speed = 10; // 移動速度
        const margin = 12; // バーチャルパッドと画面端の間の余白
        const padPosition = {
            x: g.game.width - padSize - margin,
            y: g.game.height - padSize - margin,
        };
        const virtualPad = createVirtualPadEntity(scene, gameStickAsset, padPosition, padSize, virtualPadSize, (offset) => {
            // スティックの移動距離の値を利用し player を移動させます
            let dx = Math.round(offset.x * speed);
            let dy = Math.round(offset.y * speed);
            player.x += dx;
            player.y += dy;
            player.modified();
        });
        scene.append(virtualPad);
        scene.append(player);
    });
    g.game.pushScene(scene);
}

/**
 * バーチャルゲームパッドのエンティティを生成する関数
 */
function createVirtualPadEntity(scene, gameStickImage, padPosition, padSize, stickSize, handleUpdate) {
    const pad = new g.E({
        scene,
        x: padPosition.x,
        y: padPosition.y,
        width: padSize,
        height: padSize
    });
    const stickInitialX = Math.round(padSize / 2);
    const stickInitialY = Math.round(padSize / 2);
    const stickBack = new g.Sprite({
        scene,
        src: gameStickImage,
        x: stickInitialX,
        y: stickInitialY,
        scaleX: padSize / gameStickImage.width,
        scaleY: padSize / gameStickImage.height,
        anchorX: 0.5,
        anchorY: 0.5,
        opacity: 0.5
    });
    pad.append(stickBack);
    const stick = new g.Sprite({
        scene,
        src: gameStickImage,
        x: stickInitialX,
        y: stickInitialY,
        scaleX: stickSize / gameStickImage.width,
        scaleY: stickSize / gameStickImage.height,
        anchorX: 0.5,
        anchorY: 0.5,
        touchable: true
    });
    stick.onPointMove.add((ev) => {
        // ev.prevDelta から直近の PointMoveEvent からの移動量を取得。
        const dx = ev.prevDelta.x;
        const dy = ev.prevDelta.y;

        const radius = (stickBack.width * (stickSize / gameStickImage.width)) / 2; // stickBack の半径
        const squareRadius = radius ** 2; // stickBack の半径の二乗
        const distanceX = stickInitialX - (stick.x + dx); // X 方向の移動距離
        const distanceY = stickInitialY - (stick.y + dy); // Y 方向の移動距離
        const squareDistance = distanceX ** 2 + distanceY ** 2; // X, Y の移動距離を二乗し加算した値
        // (中心からのX軸移動距離)^2 + (中心からのY軸移動距離)^2 < squareRadius を stick の制限範囲とする
        if (squareDistance > squareRadius) {
            // 範囲外の場合、角度から座標を求め、stick.x と y の値へ代入。
            const angle = Math.atan2(distanceY, distanceX);
            const pointX = radius * Math.cos(angle);
            const pointY = radius * Math.sin(angle);

            stick.x = stickInitialX - pointX;
            stick.y = stickInitialY - pointY;
            stick.modified();
            return;
        }
        stick.moveBy(dx, dy);
        stick.modified();
    });
    stick.onPointUp.add(() => {
        stick.moveTo(stickInitialX, stickInitialY);
        stick.modified();
    });
    stick.onUpdate.add(() => {
        handleUpdate({
            x: (stick.x - stickInitialX) / (padSize / 2),
            y: (stick.y - stickInitialY) / (padSize / 2)
        });
    });
    pad.append(stick);
    return pad;
}

module.exports = main;
