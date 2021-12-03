"use strict";
var b2 = require("@akashic-extension/akashic-box2d");
var game = g.game;
module.exports = function () {
    var scene = new g.Scene({
        game: game,
        assetIds: ["soccer", "pentagon"]
    });
    scene.onLoad.add(function () {
        // 物理エンジン世界の生成
        var box2d = new b2.Box2D({
            gravity: [0, 9.8],
            scale: 50,
            sleep: true
        });
        // 地面エンティティの生成
        var floor = new g.FilledRect({
            scene: scene,
            cssColor: "black",
            x: 0,
            y: game.height - 50,
            width: game.width,
            height: 50
        });
        scene.append(floor);
        // 地面エンティティの性質を定義
        var floorDef = box2d.createFixtureDef({
            density: 1.0,
            friction: 0.5,
            restitution: 0.3,
            shape: box2d.createRectShape(floor.width, floor.height) // 地面エンティティを四角に設定
        });
        // 地面エンティティを静的物体化
        var staticDef = box2d.createBodyDef({
            type: b2.BodyType.Static
        });
        // Box2Dに地面エンティティを追加
        var floorBody = box2d.createBody(floor, staticDef, floorDef);
        // rect1エンティティの生成
        var rect1 = new g.FilledRect({
            scene: scene,
            cssColor: "pink",
            x: 100,
            y: 100,
            width: 10,
            height: 90
        });
        scene.append(rect1);
        // rect2エンティティの生成
        var rect2 = new g.FilledRect({
            scene: scene,
            cssColor: "red",
            x: 120,
            y: 0,
            width: 30,
            height: 10
        });
        scene.append(rect2);
        // サッカーボールエンティティの作成
        var soccer = new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("soccer"),
            x: 105,
            y: 30,
            width: 40,
            height: 40,
            srcWidth: 100,
            srcHeight: 98,
            touchable: true
        });
        scene.append(soccer);
        // 五角形エンティティの作成
        var pentagon = new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("pentagon"),
            x: 150,
            y: 0,
            width: 40,
            height: 40,
            srcWidth: 100,
            srcHeight: 95
        });
        scene.append(pentagon);
        // エンティティの性質を定義
        var entityDef = box2d.createFixtureDef({
            density: 1.0,
            friction: 0.5,
            restitution: 0.3 // 反発係数
        });
        // 動的物体化
        var dynamicDef = box2d.createBodyDef({
            type: b2.BodyType.Dynamic
        });
        // rect1エンティティを四角に設定
        entityDef.shape = box2d.createRectShape(rect1.width, rect1.height);
        // rect1エンティティをBox2Dに追加
        box2d.createBody(rect1, dynamicDef, entityDef);
        // rect2エンティティを四角に設定
        entityDef.shape = box2d.createRectShape(rect2.width, rect2.height);
        // rect2エンティティをBox2Dに追加
        box2d.createBody(rect2, dynamicDef, entityDef);
        // サッカーボールエンティティを円に設定
        entityDef.shape = box2d.createCircleShape(soccer.width);
        // サッカーボールエンティティをBox2Dに追加
        var soccerBody = box2d.createBody(soccer, dynamicDef, entityDef);
        // 五角形エンティティを設定
        var vertices = [
            box2d.vec2(20 - pentagon.width / 2, 0 - pentagon.height / 2),
            box2d.vec2(pentagon.width - pentagon.width / 2, 14 - pentagon.height / 2),
            box2d.vec2(32 - pentagon.width / 2, pentagon.height - pentagon.height / 2),
            box2d.vec2(8 - pentagon.width / 2, pentagon.height - pentagon.height / 2),
            box2d.vec2(0 - pentagon.width / 2, 14 - pentagon.height / 2)
        ];
        entityDef.shape = box2d.createPolygonShape(vertices);
        // 五角形エンティティをBox2Dに追加
        box2d.createBody(pentagon, dynamicDef, entityDef);
        // 接触イベントのリスナーを生成
        var contactListener = new b2.Box2DWeb.Dynamics.b2ContactListener();
        // 接触開始時のイベントリスナー
        contactListener.BeginContact = function (contact) {
            // サッカーボールと地面がぶつかったら地面の色を青にする
            if (box2d.isContact(floorBody, soccerBody, contact)) {
                floor.cssColor = "blue";
                floor.modified();
            }
        };
        // 接触が離れた時のイベントリスナー
        contactListener.EndContact = function (contact) {
            // サッカーボールと地面が離れたら地面の色を黒にする
            if (box2d.isContact(floorBody, soccerBody, contact)) {
                floor.cssColor = "black";
                floor.modified();
            }
        };
        // イベントリスナーを設定
        box2d.world.SetContactListener(contactListener);
        soccer.onPointDown.add(function (e) {
            var pos = getEntityPosition(soccer);
            var delta = {
                x: e.point.x - soccer.width / 2,
                y: e.point.y - soccer.height / 2
            };
            // ボールクリックでインパルスを与える
            // ApplyImpulse()はBox2Dの機能です。
            soccerBody.b2Body.ApplyImpulse(box2d.vec2(delta.x * -5, delta.y * -5), box2d.vec2(pos.x, pos.y));
        });
        scene.onUpdate.add(function () {
            // 物理エンジンの世界をすすめる
            box2d.step(1 / game.fps);
        });
        function getEntityPosition(entity) {
            return {
                x: entity.x + entity.width / 2,
                y: entity.y + entity.height / 2
            };
        }
    });
    game.pushScene(scene);
};
