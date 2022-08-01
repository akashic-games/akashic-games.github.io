"use strict";
var box2d = require("@akashic-extension/akashic-box2d");
/** 2次元ベクトル */
var b2Vec2 = box2d.Box2DWeb.Common.Math.b2Vec2;
/** 物理世界のプロパティ */
var worldProperty = {
    gravity: [0.0, 9.8],
    scale: 50,
    sleep: true // 停止した物体を演算対象としないかどうか
};
/** 物理エンジンの世界 */
var physics = new box2d.Box2D(worldProperty);
/** 動的オブジェクトの生成パラメータ */
var dynamicParameter = {
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
var staticParameter = {
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
    var scene = new g.Scene({
        game: g.game,
        assetIds: []
    });
    scene.onLoad.add(function () {
        /** タッチ座標 */
        var touchVertices = [];
        /** 描画途中の線リスト */
        var lineList = [];
        // 画面をタッチした時の処理
        scene.onPointDownCapture.add(function (event) {
            touchVertices.push(new b2Vec2(event.point.x, event.point.y));
            var len = touchVertices.length;
            if (1 < len) {
                var baseLine = {
                    begin: touchVertices[len - 2],
                    end: touchVertices[len - 1]
                };
                var line = createLine(scene, baseLine, 3.0, "crimson");
                lineList.push(line);
                scene.append(line);
                for (var i = 0; i < len - 3; ++i) {
                    var check = {
                        begin: touchVertices[i],
                        end: touchVertices[i + 1]
                    };
                    /** 既存線分との交点 */
                    var point = crossPoint(baseLine, check);
                    // 交点がある -> ポリゴンが閉じている
                    if (point) {
                        var vertices = touchVertices.splice(i, len);
                        // 配列の先頭・末尾を交点に置き換える
                        vertices.shift();
                        vertices.pop();
                        vertices.unshift(point);
                        vertices.push(point);
                        createPolygon(scene, vertices);
                        // 一時情報を削除
                        touchVertices = [];
                        for (var j = 0; j < lineList.length; ++j) {
                            lineList[j].destroy();
                        }
                        lineList = [];
                        break;
                    }
                }
            }
        });
        scene.onUpdate.add(function () {
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
    var dist = line.end.Copy();
    dist.Subtract(line.begin);
    var length = dist.Length();
    var angle = Math.atan2(dist.y, dist.x) * (180 / Math.PI);
    // AkashicEngineでは線を描画できないので、細い矩形で描画する
    var l = new g.FilledRect({
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
    var entity = new g.E({
        scene: scene
    });
    var length = vertices.length;
    for (var i = 0; i < length - 1; ++i) {
        var line = {
            begin: vertices[i],
            end: vertices[i + 1 === length ? 0 : i + 1]
        };
        entity.append(createLine(scene, line, 3, "teal"));
    }
    scene.append(entity);
    // Box2D用に座標のスケールを変換＆末尾の要素を削除
    var box2dVertices = [];
    for (var j = 0; j < vertices.length - 1; ++j) {
        var vertex = vertices[j].Copy();
        vertex.Multiply(1.0 / worldProperty.scale);
        box2dVertices.push(vertex);
    }
    // 頂点数が偶数かどうかで、外力の影響を受けるかを切り替える
    var bodyParameter;
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
    var a = line1.begin;
    var b = line1.end;
    var c = line2.begin;
    var d = line2.end;
    var ab = new b2Vec2(b.x - a.x, b.y - a.y);
    var cd = new b2Vec2(d.x - c.x, d.y - c.y);
    var ad = new b2Vec2(d.x - a.x, d.y - a.y);
    var base = ab.x * cd.y - ab.y * cd.x;
    var t = (cd.y * ad.x - cd.x * ad.y) / base;
    var u = (ab.x * ad.y - ab.y * ad.x) / base;
    if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
        ab.Multiply(t);
        ab.Add(a);
        return ab;
    }
    return null;
}
module.exports = main;
