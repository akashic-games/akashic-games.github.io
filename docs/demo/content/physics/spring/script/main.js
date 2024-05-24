"use strict";
const box2d = require("@akashic-extension/akashic-box2d");
const params = require("./parameters");
function main() {
    const scene = new g.Scene({ game: g.game });
    scene.onLoad.add(() => {
        // 左の壁を生成する
        const leftWall = createRect(scene, params.wallParameter);
        // ※ box2dの座標は実距離（単位はメートル）で指定する
        const leftWallPos = params.physics.vec2(0, 0);
        // ※ 指定された座標はオブジェクトの中心座標に設定される
        leftWallPos.Add(calcCenter(leftWall.entity));
        // ※ 表示はbox2dのbodyの座標に同期するので、box2dの座標だけ書き換える
        leftWall.b2Body.SetPosition(leftWallPos);
        // 右の壁を生成する
        const rightWall = createRect(scene, params.wallParameter);
        const rightWallPos = params.physics.vec2(g.game.width - rightWall.entity.width, 0);
        rightWallPos.Add(calcCenter(rightWall.entity));
        rightWall.b2Body.SetPosition(rightWallPos);
        // 床を生成する
        const floor = createRect(scene, params.floorParameter);
        const floorPos = params.physics.vec2(0, g.game.height - floor.entity.height);
        floorPos.Add(calcCenter(floor.entity));
        floor.b2Body.SetPosition(floorPos);
        // 天井を生成する
        const ceil = createRect(scene, params.floorParameter);
        const ceilPos = params.physics.vec2(0, 0);
        ceilPos.Add(calcCenter(ceil.entity));
        ceil.b2Body.SetPosition(ceilPos);
        // バネを生成する
        const angle = (45 / 180) * Math.PI;
        let position = params.physics.vec2(g.game.width / 2, g.game.height - 100); // 下中央
        createSpring(scene, position, 0, 50, 100);
        position = params.physics.vec2(100, g.game.height - 100); // 左下
        createSpring(scene, position, angle, 50, 100);
        position = params.physics.vec2(g.game.width - 100, g.game.height - 100); // 右下
        createSpring(scene, position, -angle, 50, 100);
        // 箱を生成する
        const box = createRect(scene, params.boxParameter);
        box.b2Body.SetPosition(calcCenter(g.game));
        // タッチされている座標（Box2D上の絶対座標）
        let anchor;
        // 箱を触れるようにする
        box.entity.touchable = true;
        /** 箱とマウスの紐づけ */
        let mouseJoint = null;
        // 箱がタッチされたときの処理
        box.entity.onPointDown.add((event) => {
            // 既にマウスジョイントが生成されている場合は削除しておく
            if (mouseJoint !== null) {
                params.physics.world.DestroyJoint(mouseJoint);
                mouseJoint = null;
            }
            // タッチした位置の絶対座標を計算する
            // ※ Box2Dが必要とするタッチ座標は、画面左上を原点とした絶対座標。
            // ※ g.PointDownEventから取得できる座標は、ポインティング対象からの
            //    相対座標なので、タッチ座標に対象となるb2Bodyの回転を与えた後、
            //    b2Bodyの座標を足すことで絶対座標へと変換する。
            // ※ 回転の軸をg.Entityの中心にするため、回転の前にタッチ座標から
            //    中心座標を引いておく。
            anchor = params.physics.vec2(event.point.x, event.point.y);
            anchor.Subtract(calcCenter(box.entity));
            anchor.MulM(params.b2Mat22.FromAngle(box.b2Body.GetAngle()));
            anchor.Add(box.b2Body.GetPosition());
            // マウスと箱の紐づけを作成
            const mouseJointDef = new box2d.Box2DWeb.Dynamics.Joints.b2MouseJointDef();
            // 紐づける２つの物体
            // ※ 今回はマウスと結び付けるので、bodyAにはworld.GetGroundBodyを指定する。
            mouseJointDef.bodyA = params.physics.world.GetGroundBody();
            mouseJointDef.bodyB = box.b2Body;
            // bodyAとbodyBの衝突判定を行うかどうか
            mouseJointDef.collideConnected = true;
            // マウスの引き寄せる力
            // ※ この値が大きいと、マウスにぴったりと追従するように動き、
            //    小さいと、ヨーヨーのように少し遅れてマウスに追従する。 Add target to b2MouseJointDef in box2dweb.d.ts
            mouseJointDef.maxForce = 1000.0 * box.b2Body.GetMass();
            // ジョイントの初期位置
            // ※ この座標を基準にジョイントが生成されるので、以降マウスの位置を変更しても
            //    この座標と現在のb2Bodyの座標との距離が保たれるような挙動を行う。
            mouseJointDef.target = anchor;
            // マウスジョイントを生成
            mouseJoint = params.physics.world.CreateJoint(mouseJointDef);
            // 色を変更する
            box.entity.cssColor = "teal";
            box.entity.modified();
        });
        // タッチ中の座標が移動したときの処理
        box.entity.onPointMove.add((event) => {
            // タッチ座標を更新する
            anchor.Add(params.physics.vec2(event.prevDelta.x, event.prevDelta.y));
            mouseJoint.SetTarget(anchor);
        });
        // 箱が離されたときの処理
        box.entity.onPointUp.add(() => {
            // 箱とマウスの紐づけを解除
            params.physics.world.DestroyJoint(mouseJoint);
            mouseJoint = null;
            // 色を元に戻す
            box.entity.cssColor = "crimson";
            box.entity.modified();
        });
        scene.onUpdate.add(() => {
            // 物理エンジンの世界をすすめる
            // ※ step関数の引数は秒数なので、1フレーム分の時間（1.0 / g.game.fps）を指定する
            params.physics.step(1.0 / g.game.fps);
        });
    });
    g.game.pushScene(scene);
}
/**
 * 衝突判定を持つ矩形を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {RectParameterObject} parameter 矩形の生成パラメータ
 */
function createRect(scene, parameter) {
    // 表示用の矩形（1m × 1m）を生成
    const rect = new g.FilledRect({
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
 * オブジェクトの中心座標を計算する
 * @param {g.E | g.Game} obj 中心座標を計算するオブジェクト
 */
function calcCenter(obj) {
    return params.physics.vec2(obj.width / 2, obj.height / 2);
}
/**
 * バネを生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {b2Vec2} position バネの支点となる座標
 * @param {number} angle 上を基準としたバネの角度（radian）
 * @param {number} speed バネの伸縮速度
 * @param {number} force バネの押し出す力
 */
function createSpring(scene, position, angle, speed, force) {
    // バネの天板を生成
    const platform = createRect(scene, {
        appear: {
            width: 2.0 * params.worldProperty.scale,
            height: 0.3 * params.worldProperty.scale,
            cssColor: "tomato"
        },
        physics: {
            body: params.physics.createBodyDef({
                type: box2d.BodyType.Dynamic
            }),
            fixture: params.physics.createFixtureDef({
                density: 1.0,
                friction: 1.0,
                restitution: 0.0,
                shape: params.physics.createRectShape(2.0 * params.worldProperty.scale, 0.3 * params.worldProperty.scale)
            })
        }
    });
    platform.b2Body.SetPosition(position);
    platform.b2Body.SetAngle(angle);
    // 軸は上向きを基準とする
    // ※ 軸の向きに天板が移動するのでベクトルの向きに注意
    const axis = new params.b2Vec2(0, -1);
    axis.MulM(params.b2Mat22.FromAngle(angle));
    // ピストン運動（軸を固定したモーター運動）のジョイント設定を生成
    const prismaticJointDef = new box2d.Box2DWeb.Dynamics.Joints.b2PrismaticJointDef();
    prismaticJointDef.Initialize(params.physics.world.GetGroundBody(), platform.b2Body, platform.b2Body.GetPosition(), axis);
    // ピストン移動の上限と下限を設定する
    prismaticJointDef.enableLimit = true;
    prismaticJointDef.lowerTranslation = -3.0;
    prismaticJointDef.upperTranslation = 0.0;
    // ピストン運動の動きを設定
    // ※ motorSpeedでバネの動く速度を決定（大きすぎると天板に箱を置けなくなるので注意）
    // ※ maxMotorForceでバネの押し出す力を決定
    prismaticJointDef.enableMotor = true;
    prismaticJointDef.motorSpeed = speed;
    prismaticJointDef.maxMotorForce = force;
    // ピストン運動のジョイントを生成
    const prismaticJoint = params.physics.world.CreateJoint(prismaticJointDef);
    platform.entity.onUpdate.add(() => {
        // バネの長さに応じてバネの速度を変更する
        const pos = platform.b2Body.GetPosition().Copy();
        pos.Subtract(prismaticJoint.GetAnchorA());
        prismaticJoint.SetMotorSpeed(pos.Length() * speed);
    });
}
module.exports = main;
