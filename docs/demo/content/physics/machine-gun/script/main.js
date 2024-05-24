"use strict";
const box2d = require("@akashic-extension/akashic-box2d");
const params = require("./parameters");
const utils = require("./utils");
/** 衝突した物体のUserDataリスト */
const contactDataList = [];
/** 衝突イベントのリスナ */
const contactListener = new box2d.Box2DWeb.Dynamics.b2ContactListener();
// 衝突開始時のイベントリスナを設定
contactListener.BeginContact = (contact) => {
    // userDataの組を保存しておく
    const a = contact.GetFixtureA().GetBody();
    const b = contact.GetFixtureB().GetBody();
    contactDataList.push({ a: a.GetUserData(), b: b.GetUserData() });
};
// イベントリスナを設定
params.physics.world.SetContactListener(contactListener);
function main() {
    const scene = new g.Scene({ game: g.game, assetIds: ["circleA", "circleB"] });
    scene.onLoad.add(() => {
        const gameCenter = utils.calcCenter(g.game);
        const position = gameCenter.Copy();
        // 壁Aを生成
        const wallA = utils.createRect(scene, params.wallParameterA);
        position.x -= 1.0;
        wallA.b2Body.SetPosition(position);
        // 壁Bを生成
        const wallB = utils.createRect(scene, params.wallParameterB);
        position.x += 2.0;
        wallB.b2Body.SetPosition(position);
        /** 画面をタッチしているか */
        let touch = false;
        /** タッチしている座標 */
        let touchPosition;
        // 画面をタッチしている間、タッチ座標を追う
        scene.onPointDownCapture.add((event) => {
            touch = true;
            touchPosition = params.physics.vec2(event.point.x, event.point.y);
        });
        scene.onPointMoveCapture.add((event) => {
            const delta = params.physics.vec2(event.prevDelta.x, event.prevDelta.y);
            touchPosition.Add(delta);
        });
        scene.onPointUpCapture.add(() => {
            touch = false;
        });
        /** フレームカウント（銃弾の発射間隔に使用） */
        let frameCount = 0;
        scene.onUpdate.add(() => {
            // 画面をタッチしている間、銃弾を発射
            if (touch) {
                // 画面左側をタッチしている場合はグループAの銃弾、右側はグループBの銃弾
                if (touchPosition.x < gameCenter.x) {
                    // 1 / 3 Fで銃弾発射
                    if (2 <= frameCount++) {
                        frameCount = 0;
                        utils.shootA(scene, touchPosition);
                    }
                }
                else {
                    // 1 / 6 Fで銃弾発射
                    if (5 <= frameCount++) {
                        frameCount = 0;
                        utils.shootB(scene, touchPosition);
                    }
                }
            }
            // 衝突した銃弾を処理する
            while (0 < contactDataList.length) {
                const data = contactDataList.pop();
                for (let i = 0; i < params.bulletList.length; ++i) {
                    const bullet = params.bulletList[i];
                    const bulletData = bullet.b2Body.GetUserData();
                    // UserDataから衝突した銃弾を特定する
                    if (data.a.id === bullet.entity.id || data.b.id === bullet.entity.id) {
                        const position = bullet.b2Body.GetPosition().Copy();
                        position.Multiply(params.worldProperty.scale);
                        // グループによってダメージ表示の色を変更
                        const filter = bullet.b2Body.GetFixtureList().GetFilterData();
                        const color = filter.groupIndex === params.GROUP_A ? "crimson" : "teal";
                        scene.append(utils.createDamage(scene, position, bulletData.damage, color));
                        utils.removeBullet(bullet);
                        --i; // 消した分インデックスを詰める
                    }
                }
            }
            // 物理エンジンの世界をすすめる
            // ※ step関数の引数は秒数なので、1フレーム分の時間（1.0 / g.game.fps）を指定する
            params.physics.step(1.0 / g.game.fps);
        });
    });
    g.game.pushScene(scene);
}
module.exports = main;
