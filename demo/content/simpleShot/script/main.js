var killedEnemy = 0;

function main() {
	let scene = new g.Scene({game: g.game});
	scene.loaded.add(function() {
		makeEnemy(scene);
	});
	scene.pointDownCapture.add(function(event) {
		var point = event.point;
		if (event.target) {
			point.x += event.target.x;
			point.y += event.target.y;
		}
		makeShot(scene, point);
	});
	scene.update.add(function () {
		if (killedEnemy === 36) {
			gameOver(scene);
			return true; // trueを返すと(`scene.update` から)この関数の登録が解除されます。
		}
	});
	g.game.pushScene(scene);
}

module.exports = main;

function makeEnemy(scene) {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 4; j++) {
			var movingEnemy = new g.FilledRect({
				scene: scene,
				cssColor: (j < 2 ? "#ff0000" : "#0fffff"),
				width: 16,
				height: 16,
				x: i * (16 + 4) + 64,
				y: j * (16 + 4) + 30
			});
			movingEnemy.update.add(function() { // add(func, obj)の形式で呼び出すと、objがfunc呼び出しの際thisとして扱われます。
				if (scene.game.age % scene.game.fps === 0) {
					var tick = Math.round(scene.game.age / scene.game.fps) % 4;
					if (tick === 0 || tick === 1) {
						this.x += 8;
					} else {
						this.x -= 8;
					}
					this.modified();
				}
			}, movingEnemy);
			scene.append(movingEnemy);
		}
	}
	for (var i = 0; i < 4; i++) {
		var stoppedEnemy = new g.FilledRect({
			scene: scene,
			cssColor: "#0000ff",
			width: 16,
			height: 16,
			x: i * (16 + 4) + 112,
			y: 2
		});
		scene.append(stoppedEnemy);
	}
}

function makeShot(scene, point) {
	var shot = new g.FilledRect({
		scene: scene,
		cssColor: "#000000",
		width: 2,
		height: 8,
		x: point.x,
		y: point.y
	});

	shot.update.add(function () {
		shot.y -= 10;
		if (shot.y < 0 || killedEnemy === 36) {
			shot.destroy();
			shot.modified();
			return;
		}
		var collisionTarget;
		scene.children.forEach(function(entity) {
			if (shot === entity)
				return;
			if (g.Collision.intersectAreas(shot, entity))
				collisionTarget = entity;
		});
		if (!!collisionTarget) {
			shot.destroy();
			collisionTarget.destroy();
			killedEnemy += 1;
		}
		shot.modified();
	});
	scene.append(shot);
}

function gameOver(scene) {
	var dfont = new g.DynamicFont({
		fontFamily: g.FontFamily.Serif,
		size: 80,
		game: scene.game
	});
	var label = new g.Label({
		scene: scene,
		text: "GAME OVER",
		font: dfont,
		fontSize: 40
	});
	label.x = scene.game.width / 2 - label.width / 2;
	label.y = 0;
	label.update.add(function() {
		if (this.y < scene.game.height / 2 - this.height / 2)
			this.y += 2;
		this.invalidate();
	}, label);
	scene.append(label);
}
