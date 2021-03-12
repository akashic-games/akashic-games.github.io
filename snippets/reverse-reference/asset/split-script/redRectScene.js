module.exports.create = function () {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var rect = new g.FilledRect({
			scene: scene,
			cssColor: "red",
			width: 32,
			height: 32
		});
		scene.append(rect);
	});
	return scene;
};
