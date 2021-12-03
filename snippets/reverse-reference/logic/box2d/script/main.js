
function main(param) {
	var b2 = require("@akashic-extension/akashic-box2d");
	var scene = new g.Scene({game: g.game});
	scene.onLoad.add(function() {
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
				y: g.game.height - 50,
				width: g.game.width,
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
			box2d.createBody(floor, staticDef, floorDef);

			var rect1 = new g.FilledRect({
				scene: scene,
				cssColor: "red",
				x: 100,
				y: 100,
				width: 50,
				height: 50
			});
			scene.append(rect1);

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

			scene.onUpdate.add(function () {
				// 物理エンジンの世界をすすめる
				box2d.step(1 / g.game.fps);
			});
	});
	g.game.pushScene(scene);
}
module.exports = main;
