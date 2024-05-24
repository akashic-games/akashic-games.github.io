var co = require("@akashic-extension/collision-js");

function main(_param) {
	var scene = new g.Scene({ game: g.game });
    scene.onLoad.add(function () {
        var root = new g.E({ scene });
        var p1 = createRegularPolygon(200, 200, 90, 5);
        var p2 = createRegularPolygon(50, 50, 50, 3, "ccw");
        var p1e = new PolygonE({
            scene,
            polygon: p1,
            cssColor: "green"
        });
        var p2e = new PolygonE({
            scene,
            polygon: p2,
            cssColor: "blue",
            touchable: true
        });
        p2e.onPointMove.add(ev => {
            co.Vec2.add(p2.position, ev.prevDelta);
            p2.vertices.forEach(v => co.Vec2.add(v, ev.prevDelta));
            co.Vec2.add(p2e, ev.prevDelta);
            p2e.cssColor = co.polygonToPolygon(p1, p2) ? "red" : "blue";
            p2e.modified();
        });
        root.append(p1e);
        root.append(p2e);
        scene.append(root);
    });
    g.game.pushScene(scene);
}

function drawLine(renderer, from, to, cssColor, thickMode = "inside") {
    var dir = new co.Vec2(to).sub(from);
    var width = dir.length();
    var height = 4;
    dir.normalize();
    renderer.save();
    renderer.transform([
        dir.x, dir.y,
        -dir.y, dir.x,
        from.x, from.y
    ]);
    var offsetY = thickMode === "center" ?
        -height / 2 :
        thickMode === "outside" ? -height : 0;
    renderer.fillRect(0, offsetY, width, height, cssColor);
    renderer.restore();
}

function createRegularPolygon(cx, cy, r, n, wise = "cw") {
    var position = { x: cx, y: cy };
    var vertices = [];
    var da = Math.PI * 2 / n * (wise === "cw" ? 1 : -1);
    for (let i = 0; i < n; i++) {
        var th = -Math.PI / 2 + da * i;
        var x = r * Math.cos(th) + cx;
        var y = r * Math.sin(th) + cy;
        vertices.push({ x, y });
    }
    return {
        position,
        vertices
    };
}

class PolygonE extends g.E {
    constructor(param) {
        var polygon = PolygonE.calcParam(param, param.polygon);
        super(param);
        this.polygon = polygon;
        this.cssColor = param.cssColor;
    }
    renderSelf(renderer, _camera) {
        var vertices = this.polygon.vertices;
        for (let i = 0; i < vertices.length; i++) {
            var v1 = vertices[i];
            var v2 = vertices[(i + 1) % vertices.length];
            drawLine(renderer, v1, v2, this.cssColor, "inside");
        }
        return true;
    }
    static calcParam(param, srcPolygon) {
        var aabb = {
            min: { x: 0, y: 0 },
            max: { x: 0, y: 0 }
        };
        var srcVertices = srcPolygon.vertices;
        for (let i = 0; i < srcVertices.length; i++) {
            co.enlargeAABB(aabb, srcVertices[i]);
        }
        param.x = aabb.min.x;
        param.y = aabb.min.y;
        param.width = aabb.max.x - aabb.min.x;
        param.height = aabb.max.y - aabb.min.y;
        var position = {
            x: srcPolygon.position.x - param.x,
            y: srcPolygon.position.y - param.y,
        };
        var vertices = srcVertices.map(v => ({
            x: v.x - param.x,
            y: v.y - param.y
        }));
        var polygon = {
            position,
            vertices
        };
        return polygon;
    }
}

module.exports = main;
