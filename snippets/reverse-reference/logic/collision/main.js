function main(_param) {
	var co = require("@akashic-extension/collision-js");
	function createBoxE(scene, b, cssColor, touchable) {
		if (touchable === void 0) { touchable = false; }
		return new g.FilledRect({
			scene: scene,
			x: b.position.x,
			y: b.position.y,
			anchorX: 0.5,
			anchorY: 0.5,
			width: b.halfExtend.x * 2,
			height: b.halfExtend.y * 2,
			cssColor: cssColor,
			touchable: touchable
		});
	}

	var scene = new g.Scene({ game: g.game });
    scene.onLoad.add(function () {
        var b1 = {
            position: { x: 300, y: 200 },
            halfExtend: { x: 128, y: 96 },
            angle: 0
        };
        var b2 = {
            position: { x: 100, y: 100 },
            halfExtend: { x: 64, y: 48 },
            angle: 0
        };
        var b1e = createBoxE(scene, b1, "green");
        var b2e = createBoxE(scene, b2, "blue", true);
        b2e.onPointMove.add(function (ev) {
            co.Vec2.add(b2.position, ev.prevDelta);
            co.Vec2.add(b2e, ev.prevDelta);
            b2e.cssColor = co.boxToBox(b1, b2) ? "red" : "blue";
            b2e.modified();
        });
        scene.append(b1e);
        scene.append(b2e);
    });
    g.game.pushScene(scene);
}
module.exports = main;
