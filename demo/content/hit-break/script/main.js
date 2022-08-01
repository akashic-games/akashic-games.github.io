"use strict";
var box2d = require("@akashic-extension/akashic-box2d");
// 2次元ベクトル
var b2Vec2 = box2d.Box2DWeb.Common.Math.b2Vec2;
// 斜め方向のベクトル
var directions = [
    new b2Vec2(-1, -1),
    new b2Vec2(1, -1),
    new b2Vec2(-1, 1),
    new b2Vec2(1, 1) // 右下
];
/** 物理世界のプロパティ */
var worldProperty = {
    gravity: [0.0, 9.8],
    scale: 50,
    sleep: true // 停止した物体を演算対象としないかどうか
};
/** 物理エンジンの世界 */
var physics = new box2d.Box2D(worldProperty);
/** 衝突判定を持つ箱のリスト */
var boxList = [];
/** 衝突した物体のIDリスト */
var contactIDList = [];
/** 衝突イベントのリスナ */
var contactListener = new box2d.Box2DWeb.Dynamics.b2ContactListener();
// 衝突開始時のイベントリスナを設定
contactListener.BeginContact = function (contact) {
    // physics.createBodyDefにuserDataを指定していない場合は、
    // userDataにg.E.idが設定されるので、IDの組を保存しておく
    var a = contact
        .GetFixtureA()
        .GetBody()
        .GetUserData();
    var b = contact
        .GetFixtureB()
        .GetBody()
        .GetUserData();
    contactIDList.push({ a: a, b: b });
};
// イベントリスナを設定
physics.world.SetContactListener(contactListener);
;
function main() {
    var scene = new g.Scene({ game: g.game });
    scene.onLoad.add(function () {
        scene.onPointDownCapture.add(function (event) {
            // タッチされた場所の画面下から箱を飛ばす
            var box = createBox(scene, createBoxParameter(1.0, 1.0, "crimson"));
            boxList.push(box);
            // ※ 表示はbox2dのbodyの座標に同期するので、box2dの座標だけ書き換える
            box.b2Body.SetPosition(physics.vec2(event.point.x, g.game.height));
            // 箱に上向きの瞬間的な力を加える
            box.b2Body.ApplyImpulse(new b2Vec2(0, -13), // 加える力ベクトル
            box.b2Body.GetPosition() // 力点
            );
        });
        scene.onUpdate.add(function () {
            // 衝突した箱を4分割して斜めに飛ばす
            while (0 < contactIDList.length) {
                var contactID = contactIDList.pop();
                for (var i = 0; i < boxList.length; ++i) {
                    var box = boxList[i];
                    // 衝突した箱かどうかの判定
                    if (box.entity.id === contactID.a || box.entity.id === contactID.b) {
                        // 大きさは衝突した箱の4分の1
                        var size = physics.vec2(box.entity.width, box.entity.height);
                        size.Multiply(0.5);
                        // 処理落ちしないように一定の大きさで分裂をやめる
                        if (size.x < 0.1) {
                            break;
                        }
                        for (var j = 0; j < 4; ++j) {
                            var dir = directions[j];
                            var miniBox = createBox(scene, createBoxParameter(size.x, size.y, "royalblue"));
                            // 斜めに少しずらして配置する
                            var pos = box.b2Body.GetPosition().Copy();
                            pos.Add(dir);
                            miniBox.b2Body.SetPosition(pos);
                            // 分裂前の箱の速度を引き継ぐ
                            miniBox.b2Body.SetLinearVelocity(box.b2Body.GetLinearVelocity());
                            // 斜め方向に加速させる
                            miniBox.b2Body.ApplyImpulse(dir, miniBox.b2Body.GetPosition());
                            boxList.push(miniBox);
                        }
                        removeBox(box);
                        --i; // boxListから要素を削除した分、indexを前に詰める
                    }
                }
            }
            // 物理エンジンの世界をすすめる
            // ※ step関数の引数は秒数なので、1フレーム分の時間（1.0 / g.game.fps）を指定する
            physics.step(1.0 / g.game.fps);
        });
    });
    g.game.pushScene(scene);
}
/**
 * 箱の生成パラメータを生成する
 * @param {number} width 横幅（m）
 * @param {number} height 縦幅（m）
 * @param {string} color 描画色
 */
function createBoxParameter(width, height, color) {
    return {
        /** 表示情報のパラメータ */
        appear: {
            width: width * worldProperty.scale,
            height: height * worldProperty.scale,
            cssColor: color
        },
        /** 物理定義 */
        physics: {
            /** 物理挙動 */
            body: physics.createBodyDef({
                type: box2d.BodyType.Dynamic // 自由に動ける物体
            }),
            /** 物理性質 */
            fixture: physics.createFixtureDef({
                density: 1.0,
                friction: 0.5,
                restitution: 0.3,
                shape: physics.createRectShape(width * worldProperty.scale, height * worldProperty.scale) // 衝突判定の形
            })
        }
    };
}
/**
 * 衝突判定を持つ箱を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {BoxParameterObject} parameter 箱の生成パラメータ
 */
function createBox(scene, parameter) {
    // 表示用の矩形（1m × 1m）を生成
    var rect = new g.FilledRect({
        scene: scene,
        width: parameter.appear.width,
        height: parameter.appear.height,
        cssColor: parameter.appear.cssColor
    });
    scene.append(rect);
    // 表示用の矩形と衝突判定を結び付けて返す
    var box = physics.createBody(rect, parameter.physics.body, parameter.physics.fixture);
    box.entity.onUpdate.add(function () {
        // 画面外に出たら自分を削除
        if (g.game.height + 100 < box.entity.y) {
            removeBox(box);
        }
    });
    return box;
}
/**
 * 箱を削除する
 * @param {EBody} box 削除する箱
 */
function removeBox(box) {
    boxList.splice(boxList.indexOf(box), 1);
    physics.removeBody(box);
    box.entity.destroy();
}
module.exports = main;
