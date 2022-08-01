"use strict";
var box2d = require("@akashic-extension/akashic-box2d");
/** 2次元ベクトル */
var b2Vec2 = box2d.Box2DWeb.Common.Math.b2Vec2;
/** 2×2 の行列 */
var b2Mat22 = box2d.Box2DWeb.Common.Math.b2Mat22;
/** 物理世界のプロパティ */
var worldProperty = {
    gravity: [0, 9.8],
    scale: 50,
    sleep: true // 停止した物体を物理演算対象とするかどうか
};
/** 物理エンジンの世界 */
var physics = new box2d.Box2D(worldProperty);
;
/** 鉄球のパラメータ */
var ballParameter = {
    appear: {
        width: 1.0 * worldProperty.scale,
        height: 1.0 * worldProperty.scale
    },
    /** 物理定義 */
    physics: {
        /** 物理挙動 */
        body: physics.createBodyDef({
            type: box2d.BodyType.Dynamic // 自由に動ける物体
        }),
        /** 物理性質 */
        fixture: physics.createFixtureDef({
            density: 5.0,
            friction: 1.0,
            restitution: 0.999,
            shape: physics.createCircleShape(1.0 * worldProperty.scale) // 衝突判定の形（直径 1m の円形）
        })
    }
};
function main() {
    var scene = new g.Scene({
        game: g.game,
        assetIds: ["circle", "circle_touch"]
    });
    scene.onLoad.add(function () {
        // 鉄球を5個横に並べて生成する
        var ballCount = 5;
        for (var i = 0; i < ballCount; ++i) {
            var ball = createCircle(scene, ballParameter);
            var position = calcCenter(g.game);
            position.Add(new b2Vec2(i - Math.floor(ballCount / 2), 2.0));
            ball.b2Body.SetPosition(position);
            ball.b2Body.SetAngularDamping(0.8); // 回転しづらくする
            ball.b2Body.SetSleepingAllowed(false);
            addMouseJoint(ball);
            // 支点の位置は鉄球の 10m 上に設定
            // ※ 支点からの距離が長いほど安定します
            var fulcrum = position.Copy();
            fulcrum.y -= 10.0;
            // ボールとの接点の位置はボールの中心から少しずらす
            // ※ 中心に設定すると、ボールが自由回転するため精度が落ちます
            var contact = ball.b2Body.GetPosition().Copy();
            contact.Add(new b2Vec2(0.0, -0.5));
            addDistanceJoint(ball, fulcrum, contact);
        }
        scene.onUpdate.add(function () {
            // 物理エンジンの世界をすすめる
            // ※ step関数の引数は秒数なので、1フレーム分の時間（1.0 / g.game.fps）を指定する
            // ※ 今回はさらに精度を増すために、処理をさらに細分化する（10分割）
            var accuracy = 10;
            for (var i = 0; i < accuracy; ++i) {
                physics.step(1.0 / g.game.fps / accuracy);
            }
        });
    });
    g.game.pushScene(scene);
}
/**
 * オブジェクトの中心座標を計算する
 * @param {Object} obj 中心座標を計算するオブジェクト
 */
function calcCenter(obj) {
    return physics.vec2(obj.width / 2, obj.height / 2);
}
/**
 * 衝突判定を持つ円を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {BallParameterObject} parameter 円の生成パラメータ
 */
function createCircle(scene, parameter) {
    // 画像をまとめる空のエンティティを生成
    var entity = new g.E({
        scene: scene,
        width: parameter.appear.width,
        height: parameter.appear.height
    });
    scene.append(entity);
    // 表示用の円形を生成
    // ※ AkashicEngineでは円を描画することができないので、画像で描画する
    var circle = new g.Sprite({
        scene: scene,
        src: scene.asset.getImageById("circle"),
        srcWidth: 100,
        srcHeight: 100,
        width: parameter.appear.width,
        height: parameter.appear.height
    });
    entity.append(circle);
    // タッチされたとき用の円形スプライトを生成
    var circleTouch = new g.Sprite({
        scene: scene,
        src: scene.asset.getImageById("circle_touch"),
        srcWidth: 100,
        srcHeight: 100,
        width: parameter.appear.width,
        height: parameter.appear.height,
        hidden: true
    });
    entity.append(circleTouch);
    // タッチの有無で画像を切り替える
    // タッチされたときにタッチ用の画像を表示
    entity.onPointDown.add(function () {
        circle.hide();
        circleTouch.show();
    });
    // タッチが解除されたときに通常時の画像を表示
    entity.onPointUp.add(function () {
        circle.show();
        circleTouch.hide();
    });
    // 表示用の円形と衝突判定を結び付けて返す
    return physics.createBody(entity, parameter.physics.body, parameter.physics.fixture);
}
/**
 * 指定されたオブジェクトにマウスジョイントを追加する
 * @param {EBody} ebody 描画と衝突判定を持ったオブジェクト
 */
function addMouseJoint(ebody) {
    // オブジェクトを触れるようにする
    ebody.entity.touchable = true;
    // タッチされている座標（Box2D上の絶対座標）
    var anchor;
    /** 鉄球とマウスを結びつけるジョイント */
    var mouseJoint = null;
    // オブジェクトがタッチされたときの処理
    ebody.entity.onPointDown.add(function (event) {
        // 既にマウスジョイントが生成されている場合は削除しておく
        if (mouseJoint !== null) {
            physics.world.DestroyJoint(mouseJoint);
            mouseJoint = null;
        }
        // タッチした位置の絶対座標を計算する
        // ※ Box2Dが必要とするタッチ座標は、画面左上を原点とした絶対座標。
        // ※ g.PointDownEventから取得できる座標は、ポインティング対象からの
        //    相対座標なので、タッチ座標に対象となるb2Bodyの回転を与えた後、
        //    b2Bodyの座標を足すことで絶対座標へと変換する。
        // ※ 回転の軸をg.Entityの中心にするため、回転の前にタッチ座標から
        //    中心座標を引いておく。
        anchor = physics.vec2(event.point.x, event.point.y);
        anchor.Subtract(calcCenter(ebody.entity));
        anchor.MulM(b2Mat22.FromAngle(ebody.b2Body.GetAngle()));
        anchor.Add(ebody.b2Body.GetPosition());
        // マウスとオブジェクトの紐づけを作成
        var mouseJointDef = new box2d.Box2DWeb.Dynamics.Joints.b2MouseJointDef();
        // 紐づける２つの物体
        // ※ 今回はマウスと結び付けるので、bodyAにはworld.GetGroundBodyを指定する。
        mouseJointDef.bodyA = physics.world.GetGroundBody();
        mouseJointDef.bodyB = ebody.b2Body;
        // bodyAとbodyBの衝突判定を行うかどうか
        mouseJointDef.collideConnected = true;
        // マウスの引き寄せる力
        // ※ この値が大きいと、マウスにぴったりと追従するように動き、
        //    小さいと、ヨーヨーのように少し遅れてマウスに追従する。
        mouseJointDef.maxForce = 1000.0 * ebody.b2Body.GetMass();
        // ジョイントの初期位置
        // ※ この座標を基準にジョイントが生成されるので、以降マウスの位置を変更しても
        //    この座標と現在のb2Bodyの座標との距離が保たれるような挙動を行う。
        mouseJointDef.target = anchor;
        // マウスジョイントを生成
        mouseJoint = physics.world.CreateJoint(mouseJointDef);
    });
    // タッチ中の座標が移動したときの処理
    ebody.entity.onPointMove.add(function (event) {
        // タッチ座標を更新する
        anchor.Add(physics.vec2(event.prevDelta.x, event.prevDelta.y));
        mouseJoint.SetTarget(anchor);
    });
    // オブジェクトが離されたときの処理
    ebody.entity.onPointUp.add(function () {
        // オブジェクトとマウスの紐づけを解除
        physics.world.DestroyJoint(mouseJoint);
        mouseJoint = null;
    });
}
/**
 * 指定されたオブジェクトにディスタンスジョイントを追加する
 * @param {Ebody} ebody 衝突判定を持ったオブジェクト
 * @param {b2Vec2} fulcrum オブジェクトを固定する座標
 * @param {b2Vec2} contact オブジェクト内で固定する座標
 */
function addDistanceJoint(ebody, fulcrum, contact) {
    var distanceJointdef = new box2d.Box2DWeb.Dynamics.Joints.b2DistanceJointDef();
    distanceJointdef.Initialize(physics.world.GetGroundBody(), // オブジェクトではなく空間に固定する場合は、このように書く
    ebody.b2Body, fulcrum, contact);
    physics.world.CreateJoint(distanceJointdef);
}
module.exports = main;
