function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		for (let i = 0; i < 36; ++i)
			scene.append(createRandomRect(scene, i * 10));

		scene.onPointDownCapture.add(function () {
			g.game.pushScene(createCascadingScene());
		});
	});
	g.game.pushScene(scene);
}

function createCascadingScene() {
	var scene = new g.Scene({
		game: g.game,
		seethrough: true,
	});
	scene.onLoad.add(function () {
		// 画面の中央を大きく覆う矩形
		const wall = new g.FilledRect({
			scene: scene,
			cssColor: "gray",
			opacity: 0.6,
			width: g.game.width * 0.8,
			height: g.game.height * 0.8,
			anchorX: 0.5,
			anchorY: 0.5,
			x: g.game.width / 2,
			y: g.game.height / 2,
			touchable: true,
		});
		wall.onPointDown.add(() => {
			// 操作した感のため、クリックされたら縮むエフェクト
			wall.scale(0.95, 0.95);
			wall.modified();
		});
		wall.onPointUp.add(() => {
			// 縮んだものを戻す
			wall.scale(1, 1);
			wall.modified();

			// 一拍置いて (100ms 待機後) シーンを破棄
			scene.setTimeout(() => {
				g.game.popScene();
			}, 100);
		});
		scene.append(wall);
	});
	return scene;
}

/**
 * 画面中央から指定した角度で動き続ける適当な色の矩形を生成する
 */
function createRandomRect(scene, angle) {
	const rect = new g.FilledRect({
		scene: scene,
		cssColor: randomColor(),
		width: 32,
		height: 32,
		anchorX: 0.5,
		anchorY: 0.5,
		x: g.game.width / 2,
		y: g.game.height / 2,
	});
	const rad = angle * Math.PI / 180;
	const speed = 5;
	const dx = speed * Math.cos(rad);
	const dy = speed * Math.sin(rad);
	rect.onUpdate.add(() => {
		rect.x = wrap(rect.x + dx, 0, g.game.width);
		rect.y = wrap(rect.y + dy, 0, g.game.height);
		rect.modified();
	});
	return rect;
}

function wrap(val, min, max) {
	if (val < min)
		return max;
	if (val > max)
		return min;
	return val;
}

function randomColor() {
	const val = g.game.random.generate() * 0x1000000;
	const blue = val & 0xff;
	const green = (val >> 8) & 0xff;
	const red = (val >> 16) & 0xff;
	return `rgba(${red}, ${green}, ${blue}, 0.5)`;
}

module.exports = main;
