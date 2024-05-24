var values = [
	"source-over",
	"source-atop",
	"lighter",
	"copy",
	"experimental-source-in",
	"experimental-source-out",
	"experimental-destination-atop",
	"experimental-destination-in",
	"destination-out",
	"destination-over",
	"xor",
	"difference",
	"saturation",
];
var valuesIndex = 0;
var font = new g.DynamicFont({
	game: g.game,
	fontFamily: "sans-serif",
	size: 24
});

function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var bgRect = createRect(scene, "white", 0, 0, g.game.width, g.game.height);
		bgRect.hide();
		scene.append(bgRect);

		var green = createRect(scene, "rgb(60, 200, 80)", 120, 50);
		var red = createRect(scene, "rgb(200, 30, 0)", 70, 70);
		var blue = createRect(scene, "rgb(40, 70, 200)", 145, 100);
		green.compositeOperation = values[valuesIndex];
		red.compositeOperation = values[valuesIndex];
		blue.compositeOperation = values[valuesIndex];
		scene.append(green);
		scene.append(red);
		scene.append(blue);

		var nextLabel = createLabel(scene, "次へ", 270, 270);
		var prevLabel = createLabel(scene, "前へ", 10, 270);
		var titleLabel = createLabel(scene, "", 0, 240);
		changeTitleLabel(titleLabel);
		scene.append(titleLabel);
		scene.append(nextLabel);
		scene.append(prevLabel);

		nextLabel.onPointDown.add(function () {
			valuesIndex++;
			if (valuesIndex >= values.length)
				valuesIndex = 0;
			changeTitleLabel(titleLabel);
			updateValue(green, red, blue);
			// "destination-out" は透明となるため、わかりやすくするため白の背景色を表示
			values[valuesIndex] === "destination-out" ? bgRect.show() : bgRect.hide();
		});
		prevLabel.onPointDown.add(function () {
			valuesIndex--;
			if (valuesIndex < 0)
				valuesIndex = values.length - 1;
			changeTitleLabel(titleLabel);
			updateValue(green, red, blue);
			// "destination-out" は透明となるため、わかりやすくするため白の背景色を表示
			values[valuesIndex] === "destination-out" ? bgRect.show() : bgRect.hide();
		});
	});
	g.game.pushScene(scene);
}

function changeTitleLabel(label) {
	label.text = values[valuesIndex];
	label.invalidate();
	label.x = g.game.width / 2 - label.width / 2;
	label.modified();
}

function updateValue(...args) {
	var value = values[valuesIndex];
	args.forEach(function (rect) {
		if (rect.cssColor === "green") {
			rect.compositeOperation = value === "destination-out" ? value : "source-over";
		}
		else {
			rect.compositeOperation = value;
		}
		rect.modified();
	});
}

function createRect(scene, color, x, y, width, height) {
	if (!width) width = 100;
	if (!height) height = 100;
	return new g.FilledRect({
		scene: scene,
		width: width,
		height: height,
		x: x,
		y: y,
		cssColor: color
	});
}

function createLabel(scene, text, x, y) {
	return new g.Label({
		scene: scene,
		font: font,
		text: text,
		fontSize: 20,
		x: x,
		y: y,
		touchable: true
	});
}

module.exports = main;
