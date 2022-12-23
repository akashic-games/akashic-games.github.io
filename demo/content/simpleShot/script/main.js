let killedEnemy = 0;

function main() {
	const scene = new g.Scene({game: g.game});
	scene.onLoad.add(() => {
		makeEnemy(scene);
	});
	scene.onPointDownCapture.add(event => {
		const point = event.point;
		if (event.target) {
			point.x += event.target.x;
			point.y += event.target.y;
		}
		makeShot(scene, point);
	});
	scene.onUpdate.add(() => {
		if (killedEnemy === 36) {
			gameOver(scene);
			return true; // trueを返すと(`scene.update` から)この関数の登録が解除されます。
		}
	});
	g.game.pushScene(scene);
}

module.exports = main;

function makeEnemy(scene) {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 4; j++) {
			const movingEnemy = new g.FilledRect({
				scene: scene,
				cssColor: (j < 2 ? "#ff0000" : "#0fffff"),
				width: 16,
				height: 16,
				x: i * (16 + 4) + 64,
				y: j * (16 + 4) + 30
			});
			movingEnemy.onUpdate.add(() => {
				if (scene.game.age % scene.game.fps === 0) {
					const tick = Math.round(scene.game.age / scene.game.fps) % 4;
					if (tick === 0 || tick === 1) {
						movingEnemy.x += 8;
					} else {
						movingEnemy.x -= 8;
					}
					movingEnemy.modified();
				}
			});
			scene.append(movingEnemy);
		}
	}
	for (let i = 0; i < 4; i++) {
		const stoppedEnemy = new g.FilledRect({
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
	const shot = new g.FilledRect({
		scene: scene,
		cssColor: "#000000",
		width: 2,
		height: 8,
		x: point.x,
		y: point.y
	});

	shot.onUpdate.add(() => {
		shot.y -= 10;
		if (shot.y < 0 || killedEnemy === 36) {
			shot.destroy();
			shot.modified();
			return;
		}
		let collisionTarget;
		scene.children.forEach(entity => {
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
	const dfont = new g.DynamicFont({
		fontFamily: "serif",
		size: 80,
		game: scene.game
	});
	const label = new g.Label({
		scene: scene,
		text: "GAME OVER",
		font: dfont,
		fontSize: 40
	});
	label.x = scene.game.width / 2 - label.width / 2;
	label.y = 0;
	label.onUpdate.add(() => {
		if (label.y < scene.game.height / 2 - label.height / 2)
			label.y += 2;
		label.invalidate();
	});
	scene.append(label);
}
