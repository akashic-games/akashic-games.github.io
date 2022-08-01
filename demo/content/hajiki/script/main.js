"use strict";
var params = require("./parameters");
/** おはじきを弾く力 */
var power = 10;
function main() {
    var scene = new g.Scene({
        game: g.game,
        assetIds: ["circle", "circle_touch", "arrow"]
    });
    scene.onLoad.add(function () {
        // 壁を生成
        createWall(scene);
        // おはじきを7個ランダムな位置に生成する
        for (var i = 0; i < 7; ++i) {
            createHajiki(scene, randomPosition());
        }
        scene.onUpdate.add(function () {
            // 物理エンジンの世界をすすめる
            // ※ step関数の引数は秒数なので、1フレーム分の時間（1.0 / g.game.fps）を指定する
            params.physics.step(1.0 / g.game.fps);
        });
        var begin;
        scene.onPointDownCapture.add(function (event) {
            begin = new params.b2Vec2(event.point.x, event.point.y);
        });
        scene.onPointUpCapture.add(function (event) {
            var end = new params.b2Vec2(event.startDelta.x, event.startDelta.y);
            end.Add(begin);
        });
    });
    g.game.pushScene(scene);
}
/**
 * オブジェクトの中心座標を計算する
 * @param {g.E} obj 中心座標を計算するオブジェクト
 */
function calcCenter(obj) {
    return params.physics.vec2(obj.width / 2, obj.height / 2);
}
/**
 * ランダムに生成された座標を返す
 * ※ 生成される座標は画面の外枠から 1.0m 内側に限定される
 */
function randomPosition() {
    var scale = params.worldProperty.scale;
    var x = g.game.random.generate() * (g.game.width - scale) + scale;
    var y = g.game.random.generate() * (g.game.height - scale) + scale;
    return params.physics.vec2(x, y);
}
/**
 * 衝突判定を持つ矩形を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {HajikiParameterObject} parameter 矩形の生成パラメータ
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
/**
 * 衝突判定を持つ円を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {HajikiParameterObject} parameter 円の生成パラメータ
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
    return params.physics.createBody(entity, parameter.physics.body, parameter.physics.fixture);
}
function createWall(scene) {
    // 左の壁を生成する
    var leftWall = createRect(scene, params.wallParameter);
    var leftWallPos = params.physics.vec2(0, 0);
    leftWallPos.Add(calcCenter(leftWall.entity));
    leftWall.b2Body.SetPosition(leftWallPos);
    // 右の壁を生成する
    var rightWall = createRect(scene, params.wallParameter);
    var rightWallPos = params.physics.vec2(g.game.width - rightWall.entity.width, 0);
    rightWallPos.Add(calcCenter(rightWall.entity));
    rightWall.b2Body.SetPosition(rightWallPos);
    // 床を生成する
    var floor = createRect(scene, params.floorParameter);
    var floorPos = params.physics.vec2(0, g.game.height - floor.entity.height);
    floorPos.Add(calcCenter(floor.entity));
    floor.b2Body.SetPosition(floorPos);
    // 天井を生成する
    var ceil = createRect(scene, params.floorParameter);
    var ceilPos = params.physics.vec2(0, 0);
    ceilPos.Add(calcCenter(ceil.entity));
    ceil.b2Body.SetPosition(ceilPos);
}
/**
 * おはじきを生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {b2Vec2} position おはじきを設置する座標
 */
function createHajiki(scene, position) {
    var hajiki = createCircle(scene, params.hajikiParameter);
    hajiki.b2Body.SetPosition(position);
    hajiki.entity.touchable = true;
    // 足りない物理情報を付与する
    // ※ 今回は見下ろし視点なので、独自に抵抗を持たせる
    // 速度の減衰率を設定
    hajiki.b2Body.SetLinearDamping(0.5);
    // 角速度の減衰率を設定
    hajiki.b2Body.SetAngularDamping(0.5);
    var arrow = null; // 矢印画像
    var anchor; // タッチ開始座標
    // おはじきを引っ張ったときの処理を追加
    hajiki.entity.onPointDown.add(function (event) {
        // 既に矢印画像が生成されている場合は削除しておく
        if (arrow !== null) {
            arrow.destroy();
        }
        // おはじきの移動をストップ
        hajiki.b2Body.SetLinearVelocity(params.physics.vec2(0, 0));
        hajiki.b2Body.SetAngularVelocity(0);
        // タッチした位置の絶対座標を計算する
        // ※ Box2Dが必要とするタッチ座標は、画面左上を原点とした絶対座標。
        // ※ g.PointDownEventから取得できる座標は、ポインティング対象からの
        //    相対座標なので、タッチ座標に対象となるb2Bodyの回転を与えた後、
        //    b2Bodyの座標を足すことで絶対座標へと変換する。
        // ※ 回転の軸をg.Entityの中心にするため、回転の前にタッチ座標から
        //    中心座標を引いておく。
        anchor = params.physics.vec2(event.point.x, event.point.y);
        anchor.Subtract(calcCenter(hajiki.entity));
        anchor.MulM(params.b2Mat22.FromAngle(hajiki.b2Body.GetAngle()));
        anchor.Add(hajiki.b2Body.GetPosition());
        // タッチされた座標に矢印画像を生成
        arrow = new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("arrow"),
            srcWidth: 100,
            srcHeight: 100,
            x: anchor.x * params.worldProperty.scale,
            y: anchor.y * params.worldProperty.scale,
            /* アンカーの位置を矢印の先端に設定 */
            anchorX: 0,
            anchorY: 0.5,
            /* 矢印の大きさはドラッグ距離で決定 */
            scaleX: 0,
            scaleY: 0
        });
        scene.append(arrow);
    });
    hajiki.entity.onPointMove.add(function (event) {
        // pointDownEventからの移動量
        var delta = params.physics.vec2(event.startDelta.x, event.startDelta.y);
        // 矢印の長さを変更
        var mouseMovement = delta.Length() * params.worldProperty.scale;
        arrow.scaleX = mouseMovement / arrow.width;
        arrow.scaleY = mouseMovement / arrow.height;
        arrow.angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
        arrow.modified();
    });
    hajiki.entity.onPointUp.add(function (event) {
        // pointDownEventからの移動量
        var delta = params.physics.vec2(event.startDelta.x, event.startDelta.y);
        delta.NegativeSelf();
        delta.Multiply(power);
        hajiki.b2Body.ApplyImpulse(delta, anchor);
        arrow.destroy();
        arrow = null;
    });
}
module.exports = main;
