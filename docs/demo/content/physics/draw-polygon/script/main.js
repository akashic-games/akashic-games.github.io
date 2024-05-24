"use strict";
const box2d = require("@akashic-extension/akashic-box2d");
/** 2次元ベクトル */
const b2Vec2 = box2d.Box2DWeb.Common.Math.b2Vec2;
/** 物理世界のプロパティ */
const worldProperty = {
    gravity: [0.0, 9.8],
    scale: 50,
    sleep: true // 停止した物体を演算対象としないかどうか
};
/** 物理エンジンの世界 */
const physics = new box2d.Box2D(worldProperty);
/** 動的オブジェクトの生成パラメータ */
const dynamicParameter = {
    /** 物理挙動 */
    body: physics.createBodyDef({
        type: box2d.BodyType.Dynamic // 自由に動ける物体
    }),
    /** 物理性質 */
    fixture: physics.createFixtureDef({
        density: 1.0,
        friction: 0.5,
        restitution: 0.5 // 反発係数
    })
};
/** 動的オブジェクトの生成パラメータ */
const staticParameter = {
    body: physics.createBodyDef({
        type: box2d.BodyType.Static // 空間に固定される物体
    }),
    fixture: physics.createFixtureDef({
        density: 1.0,
        friction: 0.5,
        restitution: 0.5
    })
};
function main() {
    const scene = new g.Scene({
        game: g.game,
        assetIds: []
    });
    scene.onLoad.add(() => {
        /** タッチ座標 */
        let touchVertices = [];
        /** 描画途中の線リスト */
        let lineList = [];
        // 画面をタッチした時の処理
        scene.onPointDownCapture.add((event) => {
            touchVertices.push(new b2Vec2(event.point.x, event.point.y));
            const len = touchVertices.length;
            if (1 < len) {
                const baseLine = {
                    begin: touchVertices[len - 2],
                    end: touchVertices[len - 1]
                };
                const line = createLine(scene, baseLine, 3.0, "crimson");
                lineList.push(line);
                scene.append(line);
                for (let i = 0; i < len - 3; ++i) {
                    const check = {
                        begin: touchVertices[i],
                        end: touchVertices[i + 1]
                    };
                    /** 既存線分との交点 */
                    const point = crossPoint(baseLine, check);
                    // 交点がある -> ポリゴンが閉じている
                    if (point) {
                        const vertices = touchVertices.splice(i, len);
                        // 配列の先頭・末尾を交点に置き換える
                        vertices.shift();
                        vertices.pop();
                        vertices.unshift(point);
                        vertices.push(point);
                        createPolygon(scene, vertices);
                        // 一時情報を削除
                        touchVertices = [];
                        for (let j = 0; j < lineList.length; ++j) {
                            lineList[j].destroy();
                        }
                        lineList = [];
                        break;
                    }
                }
            }
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
 * 線を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {LineData} line 線の端座標の情報
 * @param {number} weight 線の太さ
 * @param {string} color 描画色
 */
function createLine(scene, line, weight, color) {
    const dist = line.end.Copy();
    dist.Subtract(line.begin);
    const length = dist.Length();
    const angle = Math.atan2(dist.y, dist.x) * (180 / Math.PI);
    // AkashicEngineでは線を描画できないので、細い矩形で描画する
    const l = new g.FilledRect({
        scene: scene,
        width: length,
        height: weight,
        anchorX: 0.0,
        anchorY: 0.5,
        angle: angle,
        cssColor: color
    });
    l.x = line.begin.x;
    l.y = line.begin.y;
    return l;
}
/**
 * 衝突判定を持った多角形を生成する
 * @param {g.Scene} scene 描画を行うシーン
 * @param {b2Vec2[]}} vertices 頂点配列
 */
function createPolygon(scene, vertices) {
    const entity = new g.E({
        scene: scene
    });
    const length = vertices.length;
    for (let i = 0; i < length - 1; ++i) {
        const line = {
            begin: vertices[i],
            end: vertices[i + 1 === length ? 0 : i + 1]
        };
        entity.append(createLine(scene, line, 3, "teal"));
    }
    scene.append(entity);
    // Box2D用に座標のスケールを変換＆末尾の要素を削除
    const box2dVertices = [];
    for (let j = 0; j < vertices.length - 1; ++j) {
        const vertex = vertices[j].Copy();
        vertex.Multiply(1.0 / worldProperty.scale);
        box2dVertices.push(vertex);
    }
    // 頂点数が偶数かどうかで、外力の影響を受けるかを切り替える
    let bodyParameter;
    if (box2dVertices.length % 2 === 0) {
        bodyParameter = staticParameter;
    }
    else {
        bodyParameter = dynamicParameter;
    }
    bodyParameter.fixture.shape = physics.createPolygonShape(box2dVertices);
    physics.createBody(entity, bodyParameter.body, bodyParameter.fixture);
}
/**
 * 2つの線分の交点を求める（交差しない場合null）
 * @param {LineData} line1 線分情報１
 * @param {LineData} line2 線分情報２
 */
function crossPoint(line1, line2) {
    const a = line1.begin;
    const b = line1.end;
    const c = line2.begin;
    const d = line2.end;
    const ab = new b2Vec2(b.x - a.x, b.y - a.y);
    const cd = new b2Vec2(d.x - c.x, d.y - c.y);
    const ad = new b2Vec2(d.x - a.x, d.y - a.y);
    const base = ab.x * cd.y - ab.y * cd.x;
    const t = (cd.y * ad.x - cd.x * ad.y) / base;
    const u = (ab.x * ad.y - ab.y * ad.x) / base;
    if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
        ab.Multiply(t);
        ab.Add(a);
        return ab;
    }
    return null;
}
module.exports = main;
