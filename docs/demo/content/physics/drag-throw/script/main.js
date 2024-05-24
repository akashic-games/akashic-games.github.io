"use strict";
const box2d = require("@akashic-extension/akashic-box2d");
// 2×2 の行列
const b2Mat22 = box2d.Box2DWeb.Common.Math.b2Mat22;
/** 物理世界のプロパティ */
const worldProperty = {
    gravity: [0.0, 9.8],
    scale: 50,
    sleep: true // 停止した物体を演算対象としないかどうか
};
/** 物理エンジンの世界 */
const physics = new box2d.Box2D(worldProperty);
;
/** 箱の生成パラメータ */
const boxParameter = {
    /** 表示情報のパラメータ */
    appear: {
        width: 1.0 * worldProperty.scale,
        height: 1.0 * worldProperty.scale,
        cssColor: "crimson"
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
            shape: physics.createRectShape(1.0 * worldProperty.scale, 1.0 * worldProperty.scale) // 衝突判定の形（1m × 1m の矩形）
        })
    }
};
/** 壁の生成パラメータ */
const wallParameter = {
    appear: {
        width: 0.3 * worldProperty.scale,
        height: g.game.height,
        cssColor: "royalblue"
    },
    physics: {
        body: physics.createBodyDef({
            type: box2d.BodyType.Static // 固定されて動かない物体
        }),
        fixture: physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: physics.createRectShape(0.3 * worldProperty.scale, g.game.height)
        })
    }
};
/** 床・天井の生成パラメータ */
const floorParameter = {
    appear: {
        width: g.game.width,
        height: 0.3 * worldProperty.scale,
        cssColor: "royalblue"
    },
    physics: {
        body: physics.createBodyDef({
            type: box2d.BodyType.Static
        }),
        fixture: physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: physics.createRectShape(g.game.width, 0.3 * worldProperty.scale)
        })
    }
};
function main() {
    const scene = new g.Scene({ game: g.game });
    scene.onLoad.add(() => {
        // 左の壁を生成する
        const leftWall = createRect(scene, wallParameter);
        // ※ box2dの座標は実距離（単位はメートル）で指定する
        const leftWallPos = physics.vec2(0, 0);
        // ※ 指定された座標はオブジェクトの中心座標に設定される
        leftWallPos.Add(calcCenter(leftWall.entity));
        // ※ 表示はbox2dのbodyの座標に同期するので、box2dの座標だけ書き換える
        leftWall.b2Body.SetPosition(leftWallPos);
        // 右の壁を生成する
        const rightWall = createRect(scene, wallParameter);
        const rightWallPos = physics.vec2(g.game.width - rightWall.entity.width, 0);
        rightWallPos.Add(calcCenter(rightWall.entity));
        rightWall.b2Body.SetPosition(rightWallPos);
        // 床を生成する
        const floor = createRect(scene, floorParameter);
        const floorPos = physics.vec2(0, g.game.height - floor.entity.height);
        floorPos.Add(calcCenter(floor.entity));
        floor.b2Body.SetPosition(floorPos);
        // 天井を生成する
        const ceil = createRect(scene, floorParameter);
        const ceilPos = physics.vec2(0, 0);
        ceilPos.Add(calcCenter(ceil.entity));
        ceil.b2Body.SetPosition(ceilPos);
        // 箱を生成する
        const box = createRect(scene, boxParameter);
        box.b2Body.SetPosition(calcCenter(g.game));
        // タッチされている座標（Box2D上の絶対座標）
        let anchor;
        // 箱を触れるようにする
        box.entity.touchable = true;
        /** マウスと箱の紐づけ */
        let mouseJoint = null;
        // 箱がタッチされたときの処理
        box.entity.onPointDown.add((event) => {
            // 既にマウスジョイントが生成されていた場合は消しておく
            if (mouseJoint !== null) {
                physics.world.DestroyJoint(mouseJoint);
                mouseJoint = null;
            }
            // タッチした位置の絶対座標を計算する
            // ※ Box2Dが必要とするタッチ座標は、画面左上を原点とした絶対座標。
            // ※ g.PointDownEventから取得できる座標は、ポインティング対象からの
            //    相対座標なので、タッチ座標に対象となるb2Body  の回転を与えた後、
            //    b2Body  の座標を足すことで絶対座標へと変換する。
            // ※ 回転の軸をg.Entityの中心にするため、回転の前にタッチ座標から
            //    中心座標を引いておく。
            anchor = physics.vec2(event.point.x, event.point.y);
            anchor.Subtract(calcCenter(box.entity));
            anchor.MulM(b2Mat22.FromAngle(box.b2Body.GetAngle()));
            anchor.Add(box.b2Body.GetPosition());
            // マウスと箱の紐づけを作成
            const mouseJointDef = new box2d.Box2DWeb.Dynamics.Joints.b2MouseJointDef();
            // 紐づける２つの物体
            // ※ 今回はマウスと結び付けるので、bodyAにはworld.GetGroundBodyを指定する。
            mouseJointDef.bodyA = physics.world.GetGroundBody();
            mouseJointDef.bodyB = box.b2Body;
            // bodyAとbodyBの衝突判定を行うかどうか
            mouseJointDef.collideConnected = true;
            // マウスの引き寄せる力
            // ※ この値が大きいと、マウスにぴったりと追従するように動き、
            //    小さいと、ヨーヨーのように少し遅れてマウスに追従する。
            mouseJointDef.maxForce = 1000.0 * box.b2Body.GetMass();
            // ジョイントの初期位置
            // ※ この座標を基準にジョイントが生成されるので、以降マウスの位置を変更しても
            //    この座標と現在のb2Body  の座標との距離が保たれるような挙動を行う。
            mouseJointDef.target = anchor;
            // マウスジョイントを生成
            mouseJoint = physics.world.CreateJoint(mouseJointDef);
            // 色を変更する
            box.entity.cssColor = "teal";
            box.entity.modified();
        });
        // タッチ中の座標が移動したときの処理
        box.entity.onPointMove.add((event) => {
            // タッチ座標を更新する
            anchor.Add(physics.vec2(event.prevDelta.x, event.prevDelta.y));
            mouseJoint.SetTarget(anchor);
        });
        // 箱が離されたときの処理
        box.entity.onPointUp.add(() => {
            // 箱とマウスの紐づけを解除
            physics.world.DestroyJoint(mouseJoint);
            mouseJoint = null;
            // 色を元に戻す
            box.entity.cssColor = "crimson";
            box.entity.modified();
        });
        scene.onUpdate.add(() => {
            // 物理エンジンの世界をすすめる
            // ※ step関数の引数は秒数なので、1フレーム分の時間（1.0 / g.game.fps）を指定する
            physics.step(1.0 / g.game.fps);
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
    return physics.createBody(rect, parameter.physics.body, parameter.physics.fixture);
}
/**
 * オブジェクトの中心座標を計算する
 * @param {g.Game | g.E} obj 中心座標を計算するオブジェクト
 */
function calcCenter(obj) {
    return physics.vec2(obj.width / 2, obj.height / 2);
}
module.exports = main;
