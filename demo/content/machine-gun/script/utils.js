"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcCenter = exports.createDamage = exports.createRect = exports.removeBullet = exports.shootB = exports.shootA = void 0;
var params = require("./parameters");
/**
 * グループAの銃弾を発射します
 * @param {g.Scene} scene 描画を行うシーン
 * @param {b2Vec2} position 発射座標
 */
function shootA(scene, position) {
    var bullet = createBullet(scene, params.bulletParameterA);
    bullet.b2Body.SetPosition(position);
    /** 発射制度 */
    var accuracy = 10;
    /** 発射角度（右から -10° ~ 10°） */
    var angle = g.game.random.generate() * accuracy * 2 - accuracy;
    /** 発射の瞬間の力 */
    var impulse = new params.b2Vec2(0.1, 0);
    impulse.MulM(params.b2Mat22.FromAngle((angle / 180) * Math.PI));
    // 発射
    bullet.b2Body.ApplyImpulse(impulse, bullet.b2Body.GetPosition());
}
exports.shootA = shootA;
/**
 * グループBの銃弾を発射します
 * @param {g.Scene} scene 描画を行うシーン
 * @param {b2Vec2} position 発射座標
 */
function shootB(scene, position) {
    var bullet = createBullet(scene, params.bulletParameterB);
    bullet.b2Body.SetPosition(position);
    /** 発射制度 */
    var accuracy = 3;
    /** 発射角度（右から -3° ~ 3°） */
    var angle = g.game.random.generate() * accuracy * 2 - accuracy;
    /** 発射の瞬間の力 */
    var impulse = new params.b2Vec2(-0.2, 0);
    impulse.MulM(params.b2Mat22.FromAngle((angle / 180) * Math.PI));
    // 発射
    bullet.b2Body.ApplyImpulse(impulse, bullet.b2Body.GetPosition());
}
exports.shootB = shootB;
/**
 * 衝突判定を持った銃弾を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {BulletOrWallParameterObject} parameter 銃弾の生成パラメータ
 */
function createBullet(scene, parameter) {
    // 表示用の画像を生成
    // ※ AkashicEngineでは円を描画することができないので、画像で表現する
    var entity = new g.Sprite({
        scene: scene,
        src: scene.asset.getImageById(parameter.appear.assetId),
        srcWidth: 100,
        srcHeight: 100,
        width: parameter.appear.width,
        height: parameter.appear.height
    });
    scene.append(entity);
    // 表示用の円形と衝突判定を結び付けて生成
    var bullet = params.physics.createBody(entity, parameter.physics.body, parameter.physics.fixture);
    /** ダメージの揺らぎ（-5.0 ~ 5.0） */
    var rand = g.game.random.generate() * 10.0 - 5.0;
    // ユーザーデータにダメージを付与する
    bullet.b2Body.SetUserData({
        id: entity.id,
        damage: 20.0 + rand
    });
    // 3 秒後には何があろうと削除
    scene.setTimeout(removeBullet.bind(this, bullet), 3000);
    params.bulletList.push(bullet);
    return bullet;
}
/**
 * 銃弾を削除する
 * @param {EBody} bullet 削除する銃弾
 */
function removeBullet(bullet) {
    if (bullet.entity.destroyed()) {
        return; // 二重で削除しない
    }
    params.bulletList.splice(params.bulletList.indexOf(bullet), 1);
    params.physics.removeBody(bullet);
    bullet.entity.destroy();
}
exports.removeBullet = removeBullet;
/**
 * 衝突判定を持つ矩形を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {BulletOrWallParameterObject} parameter 矩形の生成パラメータ
 */
function createRect(scene, parameter) {
    // 表示用の矩形（1m × 1m）を生成
    var rect = new g.FilledRect({
        scene: scene,
        width: parameter.appear.width,
        height: parameter.appear.height,
        cssColor: parameter.appear.cssColor
    });
    scene.append(rect);
    // 表示用の矩形と衝突判定を結び付けて返す
    return params.physics.createBody(rect, parameter.physics.body, parameter.physics.fixture);
}
exports.createRect = createRect;
/**
 * ダメージ表示を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {b2Vec2} position 表示座標
 * @param {number} damage ダメージ量
 * @param {string} color 描画色
 */
function createDamage(scene, position, damage, color) {
    var label = new g.Label({
        scene: scene,
        font: params.DAMAGE_FONT,
        text: damage.toFixed(1).toString(),
        fontSize: damage,
        textColor: color,
        x: position.x,
        y: position.y
    });
    label.onUpdate.add(function () {
        // 徐々に透過、完全に透明になったら削除
        label.opacity -= 0.05;
        if (label.opacity <= 0.0) {
            label.destroy();
        }
    });
    return label;
}
exports.createDamage = createDamage;
/**
 * オブジェクトの中心座標を計算する
 * @param {g.Game | g.E} obj 中心座標を計算するオブジェクト
 */
function calcCenter(obj) {
    return params.physics.vec2(obj.width / 2, obj.height / 2);
}
exports.calcCenter = calcCenter;
