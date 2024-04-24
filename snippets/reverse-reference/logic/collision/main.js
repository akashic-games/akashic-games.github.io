function main(_param) {
	var co = require("@akashic-extension/collision-js");
    function drawLine(renderer, from, to, cssColor, thickMode = "inside") {
        const dir = new co.Vec2(to).sub(from);
        const width = dir.length();
        const height = 4;
        dir.normalize();
        renderer.save();
        renderer.transform([
            dir.x, dir.y,
            -dir.y, dir.x,
            from.x, from.y
        ]);
        const offsetY = thickMode === "center" ?
            -height / 2 :
            thickMode === "outside" ? -height : 0;
        renderer.fillRect(0, offsetY, width, height, cssColor);
        renderer.restore();
    }
    function createRegularPolygon(cx, cy, r, n, wise = "cw") {
        const position = { x: cx, y: cy };
        const vertices = [];
        const da = Math.PI * 2 / n * (wise === "cw" ? 1 : -1);
        for (let i = 0; i < n; i++) {
            const th = -Math.PI / 2 + da * i;
            const x = r * Math.cos(th) + cx;
            const y = r * Math.sin(th) + cy;
            vertices.push({ x, y });
        }
        return {
            position,
            vertices
        };
    }
    class PolygonE extends g.E {
        constructor(param) {
            const polygon = PolygonE.calcParam(param, param.polygon);
            super(param);
            this.polygon = polygon;
            this.cssColor = param.cssColor;
        }
        renderSelf(renderer, _camera) {
            const vertices = this.polygon.vertices;
            for (let i = 0; i < vertices.length; i++) {
                const v1 = vertices[i];
                const v2 = vertices[(i + 1) % vertices.length];
                drawLine(renderer, v1, v2, this.cssColor, "inside");
            }
            return true;
        }
        static calcParam(param, srcPolygon) {
            const aabb = {
                min: { x: 0, y: 0 },
                max: { x: 0, y: 0 }
            };
            const srcVertices = srcPolygon.vertices;
            for (let i = 0; i < srcVertices.length; i++) {
                co.enlargeAABB(aabb, srcVertices[i]);
            }
            param.x = aabb.min.x;
            param.y = aabb.min.y;
            param.width = aabb.max.x - aabb.min.x;
            param.height = aabb.max.y - aabb.min.y;
            const position = {
                x: srcPolygon.position.x - param.x,
                y: srcPolygon.position.y - param.y,
            };
            const vertices = srcVertices.map(v => ({
                x: v.x - param.x,
                y: v.y - param.y
            }));
            const polygon = {
                position,
                vertices
            };
            return polygon;
        }
    }

	var scene = new g.Scene({ game: g.game });
    scene.onLoad.add(function () {
        const root = new g.E({ scene });
        const p1 = createRegularPolygon(200, 200, 90, 5);
        const p2 = createRegularPolygon(50, 50, 50, 3, "ccw");
        const p1e = new PolygonE({
            scene,
            polygon: p1,
            cssColor: "green"
        });
        const p2e = new PolygonE({
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
module.exports = main;
