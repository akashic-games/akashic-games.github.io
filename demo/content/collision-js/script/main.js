var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var co = require("@akashic-extension/collision-js");
var collision_js_1 = require("@akashic-extension/collision-js");
function drawLine(renderer, from, to, cssColor, thickMode) {
    if (thickMode === void 0) { thickMode = "inside"; }
    var dir = new collision_js_1.Vec2(to).sub(from);
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
function createAABBE(scene, aabb, cssColor, touchable) {
    if (touchable === void 0) { touchable = false; }
    return new g.FilledRect({
        scene: scene,
        x: aabb.min.x,
        y: aabb.min.y,
        width: aabb.max.x - aabb.min.x,
        height: aabb.max.y - aabb.min.y,
        cssColor: cssColor,
        touchable: touchable
    });
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function aabbToAABBDemo(scene) {
    var root = new g.E({ scene: scene });
    var halfExtend = { x: g.game.width / 8, y: g.game.height / 8 };
    var position = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    var aabb1 = {
        min: position.clone().sub(halfExtend),
        max: position.clone().add(halfExtend)
    };
    var aabb2 = {
        min: { x: 0, y: 0 },
        max: { x: 128, y: 96 }
    };
    var aabbe1 = createAABBE(scene, aabb1, "green");
    var aabbe2 = createAABBE(scene, aabb2, "blue", true);
    aabbe2.onPointMove.add(function (ev) {
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
function createCircleE(scene, c, surface, touchable) {
    if (touchable === void 0) { touchable = false; }
    return new g.Sprite({
        scene: scene,
        x: c.position.x,
        y: c.position.y,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: c.radius * 2 / surface.width,
        scaleY: c.radius * 2 / surface.height,
        src: surface,
        touchable: touchable
    });
}
function createSegmentE(scene, s, cssColor, touchable) {
    if (touchable === void 0) { touchable = false; }
    var dir = new collision_js_1.Vec2(s.endPosition).sub(s.position);
    return new LineSegmentE({
        scene: scene,
        x: s.position.x,
        y: s.position.y,
        width: dir.length(),
        height: 16,
        anchorX: 0,
        anchorY: 0.5,
        angle: Math.atan2(dir.y, dir.x) / Math.PI * 180,
        cssColor: cssColor,
        touchable: touchable
    });
}
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
        angle: b.angle / Math.PI * 180,
        cssColor: cssColor,
        touchable: touchable
    });
}
function createLineE(scene, l, cssColor, touchable) {
    if (touchable === void 0) { touchable = false; }
    return new LineSegmentE({
        scene: scene,
        x: l.position.x,
        y: l.position.y,
        width: g.game.width * 2,
        height: 16,
        anchorX: 0.5,
        anchorY: 0.5,
        angle: Math.atan2(l.direction.y, l.direction.x) / Math.PI * 180,
        cssColor: cssColor,
        touchable: touchable
    });
}
var LineSegmentE = /** @class */ (function (_super) {
    __extends(LineSegmentE, _super);
    function LineSegmentE(param) {
        var _this = _super.call(this, param) || this;
        _this.cssColor = param.cssColor;
        return _this;
    }
    LineSegmentE.prototype.renderSelf = function (renderer, _camera) {
        renderer.fillRect(0, this.height * this.anchorY, this.width, 1, this.cssColor);
        return true;
    };
    return LineSegmentE;
}(g.E));
var ContactE = /** @class */ (function (_super) {
    __extends(ContactE, _super);
    function ContactE(param) {
        var _this = _super.call(this, param) || this;
        _this.contact = param.contact;
        return _this;
    }
    ContactE.prototype.renderSelf = function (renderer, _camera) {
        var c = this.contact;
        renderer.save();
        renderer.translate(c.point.x, c.point.y);
        renderer.fillRect(-4, -4, 8, 8, "black");
        renderer.restore();
        drawLine(renderer, c.point, new collision_js_1.Vec2(c.normal).scale(-c.separation).add(c.point), "blue", "center");
        return true;
    };
    return ContactE;
}(g.E));
var CrossCursorE = /** @class */ (function (_super) {
    __extends(CrossCursorE, _super);
    function CrossCursorE(param) {
        var _this = _super.call(this, param) || this;
        _this.cssColor = param.cssColor;
        return _this;
    }
    CrossCursorE.prototype.renderSelf = function (renderer, _camera) {
        var halfw = this.width / 2;
        var halfh = this.height / 2;
        renderer.save();
        renderer.translate(halfw, halfh);
        renderer.fillRect(-halfw, 0, halfw, 1, this.cssColor);
        renderer.fillRect(1, 0, halfw, 1, this.cssColor);
        renderer.fillRect(0, -halfh, 1, halfh, this.cssColor);
        renderer.fillRect(0, 1, 1, halfh, this.cssColor);
        renderer.restore();
        return true;
    };
    return CrossCursorE;
}(g.E));
var GridE = /** @class */ (function (_super) {
    __extends(GridE, _super);
    function GridE(param) {
        var _this = _super.call(this, param) || this;
        _this.size = param.size;
        _this.cssColor = param.cssColor;
        return _this;
    }
    GridE.prototype.renderSelf = function (renderer, _camera) {
        for (var x = 0; x < this.width; x += this.size) {
            renderer.fillRect(x, 0, 1, this.height, this.cssColor);
        }
        for (var y = 0; y < this.height; y += this.size) {
            renderer.fillRect(0, y, this.width, 1, this.cssColor);
        }
        return true;
    };
    return GridE;
}(g.E));
var PolygonE = /** @class */ (function (_super) {
    __extends(PolygonE, _super);
    function PolygonE(param) {
        var _this = this;
        var polygon = PolygonE.calcParam(param, param.polygon);
        _this = _super.call(this, param) || this;
        _this.polygon = polygon;
        _this.cssColor = param.cssColor;
        return _this;
    }
    PolygonE.prototype.renderSelf = function (renderer, _camera) {
        var vertices = this.polygon.vertices;
        for (var i = 0; i < vertices.length; i++) {
            var v1 = vertices[i];
            var v2 = vertices[(i + 1) % vertices.length];
            drawLine(renderer, v1, v2, this.cssColor, "inside");
        }
        return true;
    };
    PolygonE.calcParam = function (param, srcPolygon) {
        var aabb = {
            min: { x: 0, y: 0 },
            max: { x: 0, y: 0 }
        };
        var srcVertices = srcPolygon.vertices;
        for (var i = 0; i < srcVertices.length; i++) {
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
        var vertices = srcVertices.map(function (v) {
            return ({
                x: v.x - param.x,
                y: v.y - param.y
            });
        });
        var polygon = {
            position: position,
            vertices: vertices
        };
        return polygon;
    };
    return PolygonE;
}(g.E));
function circleToCircleDemo(scene) {
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var green = scene.asset.getImageById("green").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var c1 = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        radius: 128
    };
    var c2 = {
        position: { x: 32, y: 32 },
        radius: 32
    };
    var ce1 = createCircleE(scene, c1, green);
    var ce2 = createCircleE(scene, c2, blue, true);
    ce2.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var green = scene.asset.getImageById("green").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var c1 = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        radius: 128
    };
    var c2 = {
        position: { x: 32, y: 32 },
        radius: 32
    };
    var ce1 = createCircleE(scene, c1, green);
    var ce2 = createCircleE(scene, c2, blue, true);
    var contactE = null;
    ce2.onPointMove.add(function (ev) {
        collision_js_1.Vec2.add(c2.position, ev.prevDelta);
        collision_js_1.Vec2.add(ce2, ev.prevDelta);
        var contact = co.circleToCircleContact(c1, c2);
        ce2.src = contact ? red : blue;
        ce2.invalidate();
        if (contact) {
            if (contactE) {
                contactE.contact = contact;
                contactE.modified();
            }
            else {
                contactE = new ContactE({ scene: scene, contact: contact });
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
    var root = new g.E({ scene: scene });
    var s1 = {
        position: { x: g.game.width / 4, y: g.game.height / 2 },
        endPosition: { x: g.game.width / 4 * 3, y: g.game.height / 2 }
    };
    var s2 = {
        position: { x: 8, y: 200 - 8 },
        endPosition: { x: 200 - 8, y: 8 }
    };
    var s1e = createSegmentE(scene, s1, "green");
    var s2e = createSegmentE(scene, s2, "blue", true);
    s2e.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var b1HalfExtend = { x: 128, y: 96 };
    var b1 = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: b1HalfExtend,
        angle: Math.PI / 4
    };
    var b2 = {
        position: { x: 100, y: 100 },
        halfExtend: { x: 64, y: 48 },
        angle: -Math.PI / 6
    };
    var b1e = createBoxE(scene, b1, "green");
    var b2e = createBoxE(scene, b2, "blue", true);
    b2e.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var v = { x: g.game.width / 2, y: g.game.height / 2 };
    var c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    var ve = new CrossCursorE({
        scene: scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "green"
    });
    var ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var l = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        direction: { x: 1, y: -1 }
    };
    var c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    var le = createLineE(scene, l, "green");
    var ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    var center = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    var dir = new collision_js_1.Vec2(1, -1).normalize().scale(128);
    var s = {
        position: center.clone().sub(dir),
        endPosition: center.clone().add(dir)
    };
    var se = createSegmentE(scene, s, "green");
    var ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var halfExtend = { x: 64, y: 48 };
    var center = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    var aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    var c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    var aabbe = createAABBE(scene, aabb, "green");
    var ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    var b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 4
    };
    var be = createBoxE(scene, b, "green");
    var ce = createCircleE(scene, c, blue, true);
    ce.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var halfExtend = { x: 64, y: 48 };
    var center = new collision_js_1.Vec2(halfExtend);
    var aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    var v = { x: g.game.width / 2, y: g.game.height / 2 };
    var ve = new CrossCursorE({
        scene: scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "green"
    });
    var aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var halfExtend = { x: 64, y: 48 };
    var center = new collision_js_1.Vec2(halfExtend);
    var aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    var l = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        direction: { x: 2, y: -1 }
    };
    var le = createLineE(scene, l, "green");
    var aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var center = new collision_js_1.Vec2(g.game.width / 2, g.game.height / 2);
    var dir = new collision_js_1.Vec2(1, -1).normalize().scale(128);
    var s = {
        position: center.clone().sub(dir),
        endPosition: center.clone().add(dir)
    };
    var halfExtend = { x: 64, y: 48 };
    center = new collision_js_1.Vec2(halfExtend);
    var aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    var se = createSegmentE(scene, s, "green");
    var aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 4
    };
    var halfExtend = { x: 64, y: 48 };
    var center = new collision_js_1.Vec2(halfExtend);
    var aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    var be = createBoxE(scene, b, "green");
    var aabbe = createAABBE(scene, aabb, "blue", true);
    aabbe.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 4
    };
    var v = { x: 32, y: 32 };
    var be = createBoxE(scene, b, "green");
    var ve = new CrossCursorE({
        scene: scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "blue",
        touchable: true
    });
    ve.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var s = {
        position: { x: 192, y: 192 },
        endPosition: { x: g.game.width - 192, y: g.game.height - 192 }
    };
    var l = {
        position: { x: 0, y: 128 },
        direction: { x: 1, y: -1 }
    };
    var se = createSegmentE(scene, s, "green");
    var le = createLineE(scene, l, "blue", true);
    le.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 3
    };
    var l = {
        position: { x: 0, y: 128 },
        direction: { x: 1, y: -1 }
    };
    var be = createBoxE(scene, b, "green");
    var le = createLineE(scene, l, "blue", true);
    le.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var b = {
        position: { x: g.game.width / 2, y: g.game.height / 2 },
        halfExtend: { x: 128, y: 96 },
        angle: Math.PI / 3
    };
    var s = {
        position: { x: 8, y: 128 },
        endPosition: { x: 128, y: 8 }
    };
    var be = createBoxE(scene, b, "green");
    var se = createSegmentE(scene, s, "blue", true);
    se.onPointMove.add(function (ev) {
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
function createRegularPolygon(cx, cy, r, n, wise) {
    if (wise === void 0) { wise = "cw"; }
    var position = { x: cx, y: cy };
    var vertices = [];
    var da = Math.PI * 2 / n * (wise === "cw" ? 1 : -1);
    for (var i = 0; i < n; i++) {
        var th = -Math.PI / 2 + da * i;
        var x = r * Math.cos(th) + cx;
        var y = r * Math.sin(th) + cy;
        vertices.push({ x: x, y: y });
    }
    return {
        position: position,
        vertices: vertices
    };
}
function polygonToSegmentDemo(scene) {
    var root = new g.E({ scene: scene });
    var s = {
        position: { x: 8, y: 128 },
        endPosition: { x: 128, y: 8 }
    };
    var se = createSegmentE(scene, s, "blue", true);
    var p = createRegularPolygon(250, 250, 180, 5);
    var pe = new PolygonE({
        scene: scene,
        polygon: p,
        cssColor: "green"
    });
    se.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var red = scene.asset.getImageById("red").asSurface();
    var blue = scene.asset.getImageById("blue").asSurface();
    var c = {
        position: { x: 64, y: 64 },
        radius: 64
    };
    var ce = createCircleE(scene, c, blue, true);
    var p = createRegularPolygon(250, 250, 180, 5);
    var pe = new PolygonE({
        scene: scene,
        polygon: p,
        cssColor: "green"
    });
    ce.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var v = { x: 32, y: 32 };
    var ve = new CrossCursorE({
        scene: scene,
        x: v.x,
        y: v.y,
        width: 32,
        height: 32,
        anchorX: 0.5,
        anchorY: 0.5,
        cssColor: "blue",
        touchable: true
    });
    var p = createRegularPolygon(250, 250, 180, 5);
    var pe = new PolygonE({
        scene: scene,
        polygon: p,
        cssColor: "green"
    });
    ve.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var b = {
        position: { x: 100, y: 100 },
        halfExtend: { x: 64, y: 48 },
        angle: -Math.PI / 6
    };
    var be = createBoxE(scene, b, "blue", true);
    var p = createRegularPolygon(250, 250, 180, 5);
    var pe = new PolygonE({
        scene: scene,
        polygon: p,
        cssColor: "green"
    });
    be.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var halfExtend = { x: 64, y: 48 };
    var center = new collision_js_1.Vec2(halfExtend);
    var aabb = {
        min: center.clone().sub(halfExtend),
        max: center.clone().add(halfExtend)
    };
    var aabbe = createAABBE(scene, aabb, "blue", true);
    var p = createRegularPolygon(250, 250, 180, 5);
    var pe = new PolygonE({
        scene: scene,
        polygon: p,
        cssColor: "green"
    });
    aabbe.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var l = {
        position: { x: 0, y: 128 },
        direction: { x: 1, y: -1 }
    };
    var le = createLineE(scene, l, "blue", true);
    var p = createRegularPolygon(250, 250, 180, 5);
    var pe = new PolygonE({
        scene: scene,
        polygon: p,
        cssColor: "green"
    });
    le.onPointMove.add(function (ev) {
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
    var root = new g.E({ scene: scene });
    var p1 = createRegularPolygon(250, 250, 180, 5);
    var p2 = createRegularPolygon(50, 50, 50, 3, "ccw");
    var p1e = new PolygonE({
        scene: scene,
        polygon: p1,
        cssColor: "green"
    });
    var p2e = new PolygonE({
        scene: scene,
        polygon: p2,
        cssColor: "blue",
        touchable: true
    });
    p2e.onPointMove.add(function (ev) {
        collision_js_1.Vec2.add(p2.position, ev.prevDelta);
        p2.vertices.forEach(function (v) { return collision_js_1.Vec2.add(v, ev.prevDelta); });
        collision_js_1.Vec2.add(p2e, ev.prevDelta);
        p2e.cssColor = co.polygonToPolygon(p1, p2) ? "red" : "blue";
        p2e.modified();
    });
    root.append(p1e);
    root.append(p2e);
    return root;
}
function main(_param) {
    var demos = [
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
    var scene = new g.Scene({
        game: g.game,
        assetIds: ["red", "green", "blue"]
    });
    var currentDemoE;
    scene.onLoad.add(function () {
        var btnInactiveColor = "#4689FF";
        var btnActiveAcolor = "#BAD3FF";
        var labelInactiveColor = "white";
        var labelActiveColor = "black";
        var btnWidth = 192;
        var btnGroupX = g.game.width - btnWidth;
        var cutinDuration = 12;
        var font = new g.DynamicFont({
            game: g.game,
            fontFamily: "monospace",
            size: 14,
        });
        var demoRoot = new g.E({ scene: scene });
        var btnGroup = new g.E({
            scene: scene,
            x: g.game.width
        });
        var burgerBtn = new g.FilledRect({
            scene: scene,
            x: g.game.width - 80,
            width: 20,
            height: 20,
            cssColor: "#4689FF",
            touchable: true
        });
        var burgerLabel = new g.Label({
            scene: scene,
            x: 2,
            text: "三",
            font: font,
            fontSize: font.size,
            textColor: "white"
        });
        burgerBtn.append(burgerLabel);
        burgerBtn.onPointDown.add(function (_ev) {
            burgerBtn.touchable = false;
            buttons.forEach(function (btn) { return btn.touchable = false; });
            var cntr = 0;
            scene.onUpdate.add(function () {
                cntr++;
                var s = cntr / cutinDuration;
                var t = Math.sin(Math.PI / 2 * s);
                btnGroup.x = g.game.width * (1 - t) + btnGroupX * t;
                btnGroup.modified();
                if (cntr === cutinDuration) {
                    buttons.forEach(function (btn) { return btn.touchable = true; });
                    return true;
                }
            });
        });
        var titleLabel = new g.Label({
            scene: scene,
            text: "",
            font: font,
            fontSize: font.size,
            textColor: "black"
        });
        var changeDemo = function (idx) {
            titleLabel.text = demos[idx].name;
            titleLabel.invalidate();
            titleLabel.x = burgerBtn.x - titleLabel.width - 8;
            titleLabel.modified();
            return demos[idx].ctor(scene);
        };
        var btnY = 0;
        var buttons = [];
        demos.forEach(function (demo, idx) {
            var btn = new g.FilledRect({
                scene: scene,
                y: btnY,
                width: btnWidth,
                height: 16,
                cssColor: idx === 0 ? btnActiveAcolor : btnInactiveColor,
                touchable: true
            });
            var label = new g.Label({
                scene: scene,
                text: demo.name,
                font: font,
                fontSize: font.size,
                textColor: idx === 0 ? labelActiveColor : labelInactiveColor
            });
            btn.append(label);
            label.x = (btn.width - label.width) / 2;
            label.modified();
            btn.onPointDown.add(function (_ev) {
                if (currentDemoE) {
                    currentDemoE.destroy();
                }
                currentDemoE = changeDemo(idx);
                demoRoot.append(currentDemoE);
                btn.cssColor = btnActiveAcolor;
                btn.modified();
                label.textColor = labelActiveColor;
                label.invalidate();
                buttons.forEach(function (aBtn) {
                    if (aBtn !== btn) {
                        aBtn.cssColor = btnInactiveColor;
                        aBtn.modified();
                        var label_1 = aBtn.children[0];
                        label_1.textColor = labelInactiveColor;
                        label_1.invalidate();
                    }
                    aBtn.touchable = false;
                });
                var cntr = 0;
                scene.onUpdate.add(function () {
                    cntr++;
                    var s = cntr / cutinDuration;
                    var t = Math.sin(Math.PI / 2 * s);
                    btnGroup.x = btnGroupX * (1 - t) + g.game.width * t;
                    btnGroup.modified();
                    if (cntr === cutinDuration) {
                        burgerBtn.touchable = true;
                        buttons.forEach(function (btn) { return btn.touchable = true; });
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
            scene: scene,
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
