"use strict";
const box2d = require("@akashic-extension/akashic-box2d");
/** 物理世界のプロパティ */
const worldProperty = {
    gravity: [0.0, 9.8],
    scale: 50,
    sleep: true // 停止した物体を演算対象としないかどうか
};
/** 物理エンジンの世界 */
const physics = new box2d.Box2D(worldProperty);
/** 矩形の物理定義 */
const rectPhysics = {
    /** 物理挙動 */
    body: physics.createBodyDef({
        type: box2d.BodyType.Dynamic // 自由に動ける物体
    }),
    /** 物理性質 */
    fixture: physics.createFixtureDef({
        density: 1.0,
        friction: 0.5,
        restitution: 0.3,
        shape: physics.createRectShape(1.0 * worldProperty.scale, 1.0 * worldProperty.scale) // 衝突判定の形（1m × 1m の矩形）
    })
};
function main() {
    const scene = new g.Scene({ game: g.game });
    scene.onLoad.add(() => {
        // タッチされた座標に重力に従う矩形を生成する
        scene.onPointDownCapture.add((event) => {
            // 表示用の矩形（1m × 1m）を生成
            const box = new g.FilledRect({
                scene: scene,
                width: 1.0 * worldProperty.scale,
                height: 1.0 * worldProperty.scale,
                cssColor: "crimson"
            });
            box.x = event.point.x - box.width / 2;
            box.y = event.point.y - box.height / 2;
            scene.append(box);
            // 矩形の物理実体を生成
            physics.createBody(box, rectPhysics.body, rectPhysics.fixture);
        });
        scene.onUpdate.add(() => {
            // 物理エンジンの世界をすすめる
            // ※ step関数の引数は秒数なので、1フレーム分の時間（1.0 / g.game.fps）を指定する
            physics.step(1.0 / g.game.fps);
        });
    });
    g.game.pushScene(scene);
}
module.exports = main;
