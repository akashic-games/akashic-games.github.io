const co = require("@akashic-extension/collision-js");
const collision_js_1 = require("@akashic-extension/collision-js");
function drawLine(renderer, from, to, cssColor, thickMode = "inside") {
    const dir = new collision_js_1.Vec2(to).sub(from);
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
function createAABBE(scene, aabb, cssColor, touchable = false) {
    return new g.FilledRect({
        scene,
        x: aabb.min.x,
        y: aabb.min.y,
        width: aabb.max.x - aabb.min.x,
        height: aabb.max.y - aabb.min.y,
        cssColor,
        touchable
    });
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function aabbToAABBDemo(scene) {
    const root = new g.E({ scene });
    const halfExtend = { x: g.game.width / 8, y: g.game.height / 8 };
    const position = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    const aabb1 = {
        min: position.clone().sub(halfExtend),
        max: position.clone().add(halfExtend)
    };
    const aabb2 = {
        min: { x: 0, y: 0 },
        max: { x: 128, y: 96 }
    };
    const aabbe1 = createAABBE(scene, aabb1, "green");
    const aabbe2 = createAABBE(scene, aabb2, "blue", true);
    aabbe2.onPointMove.add(ev => {
        collision_js_1.Vec2.add(aabb2.min, ev.prevDelta);
        collision_js_1.Vec2.add(aabb2.max, ev.prevDelta);
        collision_js_1.Vec2.add(aabbe2, ev.prevDelta);
        aabbe2.cssColor = co.aabbToAABB(aabb1, aabb2) ? "red" : "blue";
        aabbe2.modified();
    });
    root.append(aabbe1);
    root.append(aabbe2);
    return root;
}
function createCircleE(scene, c, surface, touchable = false) {
    return new g.Sprite({
        scene,
        x: c.position.x,
        y: c.position.y,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: c.radius * 2 / surface.width,
        scaleY: c.radius * 2 / surface.height,
        src: surface,
        touchable
    });
}
function createSegmentE(scene, s, cssColor, touchable = false) {
    const dir = new collision_js_1.Vec2(s.endPosition).sub(s.position);
    return new LineSegmentE({
        scene,
        x: s.position.x,
        y: s.position.y,
        width: dir.length(),
        height: 16,
        anchorX: 0,
        anchorY: 0.5,
        angle: Math.atan2(dir.y, dir.x) / Math.PI * 180,
        cssColor,
        touchable
    });
}
function createBoxE(scene, b, cssColor, touchable = false) {
    return new g.FilledRect({
        scene,
        x: b.position.x,
        y: b.position.y,
        anchorX: 0.5,
        anchorY: 0.5,
        width: b.halfExtend.x * 2,
        height: b.halfExtend.y * 2,
        angle: b.angle / Math.PI * 180,
        cssColor,
        touchable
    });
}
function createLineE(scene, l, cssColor, touchable = false) {
    return new LineSegmentE({
        scene,
        x: l.position.x,
        y: l.position.y,
        width: g.game.width * 2,
        height: 16,
        anchorX: 0.5,
        anchorY: 0.5,
        angle: Math.atan2(l.direction.y, l.direction.x) / Math.PI * 180,
        cssColor,
        touchable
    });
}
class LineSegmentE extends g.E {
    constructor(param) {
        super(param);
        this.cssColor = param.cssColor;
    }
    renderSelf(renderer, _camera) {
        renderer.fillRect(0, this.height * this.anchorY, this.width, 1, this.cssColor);
        return true;
    }
}
class ContactE extends g.E {
    constructor(param) {
        super(param);
        this.contact = param.contact;
    }
    renderSelf(renderer, _camera) {
        const c = this.contact;
        renderer.save();
        renderer.translate(c.point.x, c.point.y);
        renderer.fillRect(-4, -4, 8, 8, "black");
        renderer.restore();
        drawLine(renderer, c.point, new collision_js_1.Vec2(c.normal).scale(-c.separation).add(c.point), "blue", "center");
        return true;
    }
}
class CrossCursorE extends g.E {
    constructor(param) {
        super(param);
        this.cssColor = param.cssColor;
    }
    renderSelf(renderer, _camera) {
        const halfw = this.width / 2;
        const halfh = this.height / 2;
        renderer.save();
        renderer.translate(halfw, halfh);
        renderer.fillRect(-halfw, 0, halfw, 1, this.cssColor);
        renderer.fillRect(1, 0, halfw, 1, this.cssColor);
        renderer.fillRect(0, -halfh, 1, halfh, this.cssColor);
        renderer.fillRect(0, 1, 1, halfh, this.cssColor);
        renderer.restore();
        return true;
    }
}
class GridE extends g.E {
    constructor(param) {
        super(param);
        this.size = param.size;
        this.cssColor = param.cssColor;
    }
    renderSelf(renderer, _camera) {
        for (let x = 0; x < this.width; x += this.size) {
            renderer.fillRect(x, 0, 1, this.height, this.cssColor);
        }
        for (let y = 0; y < this.height; y += this.size) {
            renderer.fillRect(0, y, this.width, 1, this.cssColor);
        }
        return true;
    }
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
function circleToCircleDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const green = scene.asset.getImageById("green").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const c1 = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        radius: 128
    };
    const c2 = {
        position: { x: 32, y: 32 },
        radius: 32
    };
    const ce1 = createCircleE(scene, c1, green);
    const ce2 = createCircleE(scene, c2, blue, true);
    ce2.onPointMove.add(ev => {
        collision_js_1.Vec2.add(c2.position, ev.prevDelta);
        collision_js_1.Vec2.add(ce2, ev.prevDelta);
        ce2.src = co.circleToCircle(c1, c2) ? red : blue;
        ce2.invalidate();
    });
    root.append(ce1);
    root.append(ce2);
    return root;
}
function circleToCircleContactDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const green = scene.asset.getImageById("green").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const c1 = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        radius: 128
    };
    const c2 = {
        position: { x: 32, y: 32 },
        radius: 32
    };
    const ce1 = createCircleE(scene, c1, green);
    const ce2 = createCircleE(scene, c2, blue, true);
    let contactE = null;
    ce2.onPointMove.add(ev => {
        collision_js_1.Vec2.add(c2.position, ev.prevDelta);
        collision_js_1.Vec2.add(ce2, ev.prevDelta);
        const contact = co.circleToCircleContact(c1, c2);
        ce2.src = contact ? red : blue;
        ce2.invalidate();
        if (contact) {
            if (contactE) {
                contactE.contact = contact;
                contactE.modified();
            }
            else {
                contactE = new ContactE({ scene, contact });
                root.append(contactE);
            }
        }
        else {
            if (contactE) {
                contactE.destroy();
                contactE = null;
            }
        }
    });
    root.append(ce1);
    root.append(ce2);
    return root;
}
function segmentToSegmentDemo(scene) {
    const root = new g.E({ scene });
    const s1 = {
        position: { x: g.game.width / 4, y: g.game.height / 2 },
        endPosition: { x: g.game.width / 4 * 3, y: g.game.height / 2 }
    };
    const s2 = {
        position: { x: 8, y: 200 - 8 },
        endPosition: { x: 200 - 8, y: 8 }
    };
    const s1e = createSegmentE(scene, s1, "green");
    const s2e = createSegmentE(scene, s2, "blue", true);
    s2e.onPointMove.add(ev => {
        collision_js_1.Vec2.add(s2.position, ev.prevDelta);
        collision_js_1.Vec2.add(s2.endPosition, ev.prevDelta);
        collision_js_1.Vec2.add(s2e, ev.prevDelta);
        s2e.cssColor = co.segmentToSegment(s1, s2) ? "red" : "blue";
        s2e.modified();
    });
    root.append(s1e);
    root.append(s2e);
    return root;
}
function boxToBoxDemo(scene) {
    const root = new g.E({ scene });
    const b1HalfExtend = { x: 128, y: 96 };
    const b1 = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: b1HalfExtend,
        angle: Math.PI / 4
    };
    const b2 = {
        position: { x: 100, y: 100 },
        halfExtend: { x: 64, y: 48 },
        angle: -Math.PI / 6
    };
    const b1e = createBoxE(scene, b1, "green");
    const b2e = createBoxE(scene, b2, "blue", true);
    b2e.onPointMove.add(ev => {
        collision_js_1.Vec2.add(b2.position, ev.prevDelta);
        collision_js_1.Vec2.add(b2e, ev.prevDelta);
        b2e.cssColor = co.boxToBox(b1, b2) ? "red" : "blue";
        b2e.modified();
    });
    root.append(b1e);
    root.append(b2e);
    return root;
}
function circleToVecDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const v = { x: g.game.width / 2, y: g.game.height / 2 };
    const c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    const ve = new CrossCursorE({
        scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "green"
    });
    const ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(ev => {
        collision_js_1.Vec2.add(ce, ev.prevDelta);
        collision_js_1.Vec2.add(c.position, ev.prevDelta);
        ce.src = co.circleToVec(c, v) ? red : blue;
        ce.invalidate();
    });
    root.append(ve);
    root.append(ce);
    return root;
}
function circleToLineDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const l = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        direction: { x: 1, y: -1 }
    };
    const c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    const le = createLineE(scene, l, "green");
    const ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(ev => {
        collision_js_1.Vec2.add(ce, ev.prevDelta);
        collision_js_1.Vec2.add(c.position, ev.prevDelta);
        ce.src = co.circleToLine(c, l) ? red : blue;
        ce.invalidate();
    });
    root.append(le);
    root.append(ce);
    return root;
}
function circleToSegmentDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    const center = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    const dir = new collision_js_1.Vec2(1, -1).normalize().scale(128);
    const s = {
        position: center.clone().sub(dir),
        endPosition: center.clone().add(dir)
    };
    const se = createSegmentE(scene, s, "green");
    const ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(ev => {
        collision_js_1.Vec2.add(c.position, ev.prevDelta);
        collision_js_1.Vec2.add(ce, ev.prevDelta);
        ce.src = co.circleToSegment(c, s) ? red : blue;
        ce.invalidate();
    });
    root.append(se);
    root.append(ce);
    return root;
}
function circleToAABBDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const halfExtend = { x: 64, y: 48 };
    const center = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    const aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    const c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    const aabbe = createAABBE(scene, aabb, "green");
    const ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(ev => {
        collision_js_1.Vec2.add(c.position, ev.prevDelta);
        collision_js_1.Vec2.add(ce, ev.prevDelta);
        ce.src = co.circleToAABB(c, aabb) ? red : blue;
        ce.invalidate();
    });
    root.append(aabbe);
    root.append(ce);
    return root;
}
function circleToBoxDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    const b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 4
    };
    const be = createBoxE(scene, b, "green");
    const ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(ev => {
        collision_js_1.Vec2.add(c.position, ev.prevDelta);
        collision_js_1.Vec2.add(ce, ev.prevDelta);
        ce.src = co.circleToBox(c, b) ? red : blue;
        ce.invalidate();
    });
    root.append(be);
    root.append(ce);
    return root;
}
function aabbToVecDemo(scene) {
    const root = new g.E({ scene });
    const halfExtend = { x: 64, y: 48 };
    const center = new collision_js_1.Vec2(halfExtend);
    const aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    const v = { x: g.game.width / 2, y: g.game.height / 2 };
    const ve = new CrossCursorE({
        scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "green"
    });
    const aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(ev => {
        collision_js_1.Vec2.add(aabb.min, ev.prevDelta);
        collision_js_1.Vec2.add(aabb.max, ev.prevDelta);
        collision_js_1.Vec2.add(aabbe, ev.prevDelta);
        aabbe.cssColor = co.aabbToVec(aabb, ve) ? "red" : "blue";
        aabbe.modified();
    });
    root.append(ve);
    root.append(aabbe);
    return root;
}
function aabbToLineDemo(scene) {
    const root = new g.E({ scene });
    const halfExtend = { x: 64, y: 48 };
    const center = new collision_js_1.Vec2(halfExtend);
    const aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    const l = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        direction: { x: 2, y: -1 }
    };
    const le = createLineE(scene, l, "green");
    const aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(ev => {
        collision_js_1.Vec2.add(aabb.min, ev.prevDelta);
        collision_js_1.Vec2.add(aabb.max, ev.prevDelta);
        collision_js_1.Vec2.add(aabbe, ev.prevDelta);
        aabbe.cssColor = co.aabbToLine(aabb, l) ? "red" : "blue";
        aabbe.modified();
    });
    root.append(le);
    root.append(aabbe);
    return root;
}
function aabbToSegmentDemo(scene) {
    const root = new g.E({ scene });
    let center = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    const dir = new collision_js_1.Vec2(1, -1).normalize().scale(128);
    const s = {
        position: center.clone().sub(dir),
        endPosition: center.clone().add(dir)
    };
    const halfExtend = { x: 64, y: 48 };
    center = new collision_js_1.Vec2(halfExtend);
    const aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    const se = createSegmentE(scene, s, "green");
    const aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(ev => {
        collision_js_1.Vec2.add(aabb.min, ev.prevDelta);
        collision_js_1.Vec2.add(aabb.max, ev.prevDelta);
        collision_js_1.Vec2.add(aabbe, ev.prevDelta);
        aabbe.cssColor = co.aabbToSegment(aabb, s) ? "red" : "blue";
        aabbe.modified();
    });
    root.append(se);
    root.append(aabbe);
    return root;
}
function aabbToBoxDemo(scene) {
    const root = new g.E({ scene });
    const b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 4
    };
    const halfExtend = { x: 64, y: 48 };
    const center = new collision_js_1.Vec2(halfExtend);
    const aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    const be = createBoxE(scene, b, "green");
    const aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(ev => {
        collision_js_1.Vec2.add(aabb.min, ev.prevDelta);
        collision_js_1.Vec2.add(aabb.max, ev.prevDelta);
        collision_js_1.Vec2.add(aabbe, ev.prevDelta);
        aabbe.cssColor = co.aabbToBox(aabb, b) ? "red" : "blue";
        aabbe.modified();
    });
    root.append(be);
    root.append(aabbe);
    return root;
}
function vecToBoxDemo(scene) {
    const root = new g.E({ scene });
    const b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 4
    };
    const v = { x: 32, y: 32 };
    const be = createBoxE(scene, b, "green");
    const ve = new CrossCursorE({
        scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "blue",
        touchable: true
    });
    ve.onPointMove.add(ev => {
        collision_js_1.Vec2.add(ve, ev.prevDelta);
        collision_js_1.Vec2.add(v, ev.prevDelta);
        ve.cssColor = co.vecToBox(v, b) ? "red" : "blue";
        ve.modified();
    });
    root.append(be);
    root.append(ve);
    return root;
}
function lineToSegmentDemo(scene) {
    const root = new g.E({ scene });
    const s = {
        position: { x: 192, y: 192 },
        endPosition: { x: g.game.width - 192, y: g.game.height - 192 }
    };
    const l = {
        position: { x: 0, y: 128 },
        direction: { x: 1, y: -1 }
    };
    const se = createSegmentE(scene, s, "green");
    const le = createLineE(scene, l, "blue", true);
    le.onPointMove.add(ev => {
        collision_js_1.Vec2.add(l.position, ev.prevDelta);
        collision_js_1.Vec2.add(le, ev.prevDelta);
        le.cssColor = co.lineToSegment(l, s) ? "red" : "blue";
        le.modified();
    });
    root.append(se);
    root.append(le);
    return root;
}
function lineToBoxDemo(scene) {
    const root = new g.E({ scene });
    const b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 3
    };
    const l = {
        position: { x: 0, y: 128 },
        direction: { x: 1, y: -1 }
    };
    const be = createBoxE(scene, b, "green");
    const le = createLineE(scene, l, "blue", true);
    le.onPointMove.add(ev => {
        collision_js_1.Vec2.add(l.position, ev.prevDelta);
        collision_js_1.Vec2.add(le, ev.prevDelta);
        le.cssColor = co.lineToBox(l, b) ? "red" : "blue";
        le.modified();
    });
    root.append(be);
    root.append(le);
    return root;
}
function segmentToBoxDemo(scene) {
    const root = new g.E({ scene });
    const b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 3
    };
    const s = {
        position: { x: 8, y: 128 },
        endPosition: { x: 128, y: 8 }
    };
    const be = createBoxE(scene, b, "green");
    const se = createSegmentE(scene, s, "blue", true);
    se.onPointMove.add(ev => {
        collision_js_1.Vec2.add(s.position, ev.prevDelta);
        collision_js_1.Vec2.add(s.endPosition, ev.prevDelta);
        collision_js_1.Vec2.add(se, ev.prevDelta);
        se.cssColor = co.segmentToBox(s, b) ? "red" : "blue";
        se.modified();
    });
    root.append(be);
    root.append(se);
    return root;
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
function polygonToSegmentDemo(scene) {
    const root = new g.E({ scene });
    const s = {
        position: { x: 8, y: 128 },
        endPosition: { x: 128, y: 8 }
    };
    const se = createSegmentE(scene, s, "blue", true);
    const p = createRegularPolygon(250, 250, 180, 5);
    const pe = new PolygonE({
        scene,
        polygon: p,
        cssColor: "green"
    });
    se.onPointMove.add(ev => {
        collision_js_1.Vec2.add(s.position, ev.prevDelta);
        collision_js_1.Vec2.add(s.endPosition, ev.prevDelta);
        collision_js_1.Vec2.add(se, ev.prevDelta);
        se.cssColor = co.polygonToSegment(p, s) ? "red" : "blue";
        se.modified();
    });
    root.append(pe);
    root.append(se);
    return root;
}
function polygonToCircleDemo(scene) {
    const root = new g.E({ scene });
    const red = scene.asset.getImageById("red").asSurface();
    const blue = scene.asset.getImageById("blue").asSurface();
    const c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    const ce = createCircleE(scene, c, blue, true);
    const p = createRegularPolygon(250, 250, 180, 5);
    const pe = new PolygonE({
        scene,
        polygon: p,
        cssColor: "green"
    });
    ce.onPointMove.add(ev => {
        collision_js_1.Vec2.add(c.position, ev.prevDelta);
        collision_js_1.Vec2.add(ce, ev.prevDelta);
        ce.src = co.polygonToCircle(p, c) ? red : blue;
        ce.invalidate();
    });
    root.append(pe);
    root.append(ce);
    return root;
}
function polygonToVecDemo(scene) {
    const root = new g.E({ scene });
    const v = { x: 32, y: 32 };
    const ve = new CrossCursorE({
        scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "blue",
        touchable: true
    });
    const p = createRegularPolygon(250, 250, 180, 5);
    const pe = new PolygonE({
        scene,
        polygon: p,
        cssColor: "green"
    });
    ve.onPointMove.add(ev => {
        collision_js_1.Vec2.add(ve, ev.prevDelta);
        collision_js_1.Vec2.add(v, ev.prevDelta);
        ve.cssColor = co.polygonToVec(p, v) ? "red" : "blue";
        ve.modified();
    });
    root.append(pe);
    root.append(ve);
    return root;
}
function polygonToBoxDemo(scene) {
    const root = new g.E({ scene });
    const b = {
        position: { x: 100, y: 100 },
        halfExtend: { x: 64, y: 48 },
        angle: -Math.PI / 6
    };
    const be = createBoxE(scene, b, "blue", true);
    const p = createRegularPolygon(250, 250, 180, 5);
    const pe = new PolygonE({
        scene,
        polygon: p,
        cssColor: "green"
    });
    be.onPointMove.add(ev => {
        collision_js_1.Vec2.add(b.position, ev.prevDelta);
        collision_js_1.Vec2.add(be, ev.prevDelta);
        be.cssColor = co.polygonToBox(p, b) ? "red" : "blue";
        be.modified();
    });
    root.append(pe);
    root.append(be);
    return root;
}
function polygonToAABBDemo(scene) {
    const root = new g.E({ scene });
    const halfExtend = { x: 64, y: 48 };
    const center = new collision_js_1.Vec2(halfExtend);
    const aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    const aabbe = createAABBE(scene, aabb, "blue", true);
    const p = createRegularPolygon(250, 250, 180, 5);
    const pe = new PolygonE({
        scene,
        polygon: p,
        cssColor: "green"
    });
    aabbe.onPointMove.add(ev => {
        collision_js_1.Vec2.add(aabb.min, ev.prevDelta);
        collision_js_1.Vec2.add(aabb.max, ev.prevDelta);
        collision_js_1.Vec2.add(aabbe, ev.prevDelta);
        aabbe.cssColor = co.polygonToAABB(p, aabb) ? "red" : "blue";
        aabbe.modified();
    });
    root.append(pe);
    root.append(aabbe);
    return root;
}
function polygonToLineDemo(scene) {
    const root = new g.E({ scene });
    const l = {
        position: { x: 0, y: 128 },
        direction: { x: 1, y: -1 }
    };
    const le = createLineE(scene, l, "blue", true);
    const p = createRegularPolygon(250, 250, 180, 5);
    const pe = new PolygonE({
        scene,
        polygon: p,
        cssColor: "green"
    });
    le.onPointMove.add(ev => {
        collision_js_1.Vec2.add(l.position, ev.prevDelta);
        collision_js_1.Vec2.add(le, ev.prevDelta);
        le.cssColor = co.polygonToLine(p, l) ? "red" : "blue";
        le.modified();
    });
    root.append(pe);
    root.append(le);
    return root;
}
function polygonToPolygonDemo(scene) {
    const root = new g.E({ scene });
    const p1 = createRegularPolygon(250, 250, 180, 5);
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
        collision_js_1.Vec2.add(p2.position, ev.prevDelta);
        p2.vertices.forEach(v => collision_js_1.Vec2.add(v, ev.prevDelta));
        collision_js_1.Vec2.add(p2e, ev.prevDelta);
        p2e.cssColor = co.polygonToPolygon(p1, p2) ? "red" : "blue";
        p2e.modified();
    });
    root.append(p1e);
    root.append(p2e);
    return root;
}
function main(_param) {
    const demos = [
        { ctor: aabbToAABBDemo, name: "AABB to AABB" },
        { ctor: circleToCircleDemo, name: "Circle to Circle" },
        { ctor: circleToCircleContactDemo, name: "Circle to Circle Contact" },
        { ctor: segmentToSegmentDemo, name: "Segment to Segment" },
        { ctor: boxToBoxDemo, name: "Box to Box" },
        { ctor: circleToVecDemo, name: "Circle To Vec" },
        { ctor: circleToLineDemo, name: "Circle to Line" },
        { ctor: circleToSegmentDemo, name: "Circle to Segment" },
        { ctor: circleToAABBDemo, name: "Circle to AABB" },
        { ctor: circleToBoxDemo, name: "Circle to Box" },
        { ctor: aabbToVecDemo, name: "AABB to Vec" },
        { ctor: aabbToLineDemo, name: "AABB to Line" },
        { ctor: aabbToSegmentDemo, name: "AABB to Segment" },
        { ctor: aabbToBoxDemo, name: "AABB to Box" },
        { ctor: vecToBoxDemo, name: "Vec to Box" },
        { ctor: lineToSegmentDemo, name: "Line to Segment" },
        { ctor: lineToBoxDemo, name: "Line to Box" },
        { ctor: segmentToBoxDemo, name: "Segment to Box" },
        { ctor: polygonToSegmentDemo, name: "Polygon to Segment" },
        { ctor: polygonToCircleDemo, name: "Polygon to Circle" },
        { ctor: polygonToVecDemo, name: "Polygon to Vec" },
        { ctor: polygonToBoxDemo, name: "Polygon to Box" },
        { ctor: polygonToAABBDemo, name: "Polygon to AABB" },
        { ctor: polygonToLineDemo, name: "Polygon to Line" },
        { ctor: polygonToPolygonDemo, name: "Polygon to Polygon" }
    ];
    const scene = new g.Scene({
        game: g.game,
        assetIds: ["red", "green", "blue"]
    });
    let currentDemoE;
    scene.onLoad.add(() => {
        const btnInactiveColor = "#4689FF";
        const btnActiveAcolor = "#BAD3FF";
        const labelInactiveColor = "white";
        const labelActiveColor = "black";
        const btnWidth = 192;
        const btnGroupX = g.game.width - btnWidth;
        const cutinDuration = 12;
        const font = new g.DynamicFont({
            game: g.game,
            fontFamily: "monospace",
            size: 14,
        });
        const demoRoot = new g.E({ scene });
        const btnGroup = new g.E({
            scene,
            x: g.game.width
        });
        const burgerBtn = new g.FilledRect({
            scene,
            x: g.game.width - 80,
            width: 20,
            height: 20,
            cssColor: "#4689FF",
            touchable: true
        });
        const burgerLabel = new g.Label({
            scene,
            x: 2,
            text: "三",
            font,
            fontSize: font.size,
            textColor: "white"
        });
        burgerBtn.append(burgerLabel);
        burgerBtn.onPointDown.add(_ev => {
            burgerBtn.touchable = false;
            buttons.forEach(btn => btn.touchable = false);
            let cntr = 0;
            scene.onUpdate.add(() => {
                cntr++;
                const s = cntr / cutinDuration;
                const t = Math.sin(Math.PI / 2 * s);
                btnGroup.x = g.game.width * (1 - t) + btnGroupX * t;
                btnGroup.modified();
                if (cntr === cutinDuration) {
                    buttons.forEach(btn => btn.touchable = true);
                    return true;
                }
            });
        });
        const titleLabel = new g.Label({
            scene,
            text: "",
            font,
            fontSize: font.size,
            textColor: "black"
        });
        const changeDemo = (idx) => {
            titleLabel.text = demos[idx].name;
            titleLabel.invalidate();
            titleLabel.x = burgerBtn.x - titleLabel.width - 8;
            titleLabel.modified();
            return demos[idx].ctor(scene);
        };
        let btnY = 0;
        const buttons = [];
        demos.forEach((demo, idx) => {
            const btn = new g.FilledRect({
                scene,
                y: btnY,
                width: btnWidth,
                height: 16,
                cssColor: idx === 0 ? btnActiveAcolor : btnInactiveColor,
                touchable: true
            });
            const label = new g.Label({
                scene,
                text: demo.name,
                font,
                fontSize: font.size,
                textColor: idx === 0 ? labelActiveColor : labelInactiveColor
            });
            btn.append(label);
            label.x = (btn.width - label.width) / 2;
            label.modified();
            btn.onPointDown.add(_ev => {
                if (currentDemoE) {
                    currentDemoE.destroy();
                }
                currentDemoE = changeDemo(idx);
                demoRoot.append(currentDemoE);
                btn.cssColor = btnActiveAcolor;
                btn.modified();
                label.textColor = labelActiveColor;
                label.invalidate();
                buttons.forEach(aBtn => {
                    if (aBtn !== btn) {
                        aBtn.cssColor = btnInactiveColor;
                        aBtn.modified();
                        const label = aBtn.children[0];
                        label.textColor = labelInactiveColor;
                        label.invalidate();
                    }
                    aBtn.touchable = false;
                });
                let cntr = 0;
                scene.onUpdate.add(() => {
                    cntr++;
                    const s = cntr / cutinDuration;
                    const t = Math.sin(Math.PI / 2 * s);
                    btnGroup.x = btnGroupX * (1 - t) + g.game.width * t;
                    btnGroup.modified();
                    if (cntr === cutinDuration) {
                        burgerBtn.touchable = true;
                        buttons.forEach(btn => btn.touchable = true);
                        return true;
                    }
                });
            });
            btnGroup.append(btn);
            buttons.push(btn);
            btnY += btn.height;
        });
        currentDemoE = changeDemo(0);
        demoRoot.append(currentDemoE);
        scene.append(new GridE({
            scene,
            width: g.game.width,
            height: g.game.height,
            size: 100,
            cssColor: "gray"
        }));
        scene.append(demoRoot);
        scene.append(burgerBtn);
        scene.append(titleLabel);
        scene.append(btnGroup);
    });
    g.game.pushScene(scene);
}
module.exports = main;
