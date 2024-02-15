"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
var hover = require("@akashic-extension/akashic-hover-plugin");
var PIXI_1 = require("../PIXI");
var Graphics_1 = require("./Graphics");
var TouchInput_1 = require("./TouchInput");
var Utils_1 = require("./Utils");
var hoverPlugin = g.game.operationPluginManager.register(hover.HoverPlugin, Utils_1.Utils._akashicHoverPluginId);
g.game.operationPluginManager.start(Utils_1.Utils._akashicHoverPluginId);
// MV では Stage は Container から派生している(Scene と Sprite などとの間に区別がない)。
var Stage = /** @class */ (function () {
    function Stage() {
        this.scene = new g.Scene({ game: g.game, name: this.constructor.name });
        this._root = new PIXI_1.Container();
        this.touchEntity = new g.E({
            scene: this.scene,
            width: Graphics_1.Graphics.width,
            height: Graphics_1.Graphics.height,
            touchable: true
        });
        // 互換性を保つためカーソルの見た目は従来と同じ見た目(default)にする
        var hoverableE = hover.Converter.asHoverable(this.touchEntity, { cursor: "default" });
        var isHovered = false;
        var latestHoveredPoint = null;
        hoverableE.hovered.add(function () {
            isHovered = true;
        });
        hoverableE.unhovered.add(function () {
            isHovered = false;
        });
        hoverableE.onUpdate.add(function () {
            if (!isHovered) {
                return;
            }
            // HoverPlugin は OperationPlugin のサブクラスだがそれ自体の型が公開されていないので、独自のメソッドにアクセスするためにはanyにする必要がある
            // TODO: ここのanyをなくすために、HoverPlugin側で型を用意するなどの対応が必要
            var p = hoverPlugin.getLatestHoveredPoint();
            if (p && p.x !== (latestHoveredPoint === null || latestHoveredPoint === void 0 ? void 0 : latestHoveredPoint.x) && p.y !== (latestHoveredPoint === null || latestHoveredPoint === void 0 ? void 0 : latestHoveredPoint.y)) {
                TouchInput_1.TouchInput._onMove(p.x, p.y);
                latestHoveredPoint = p;
            }
        });
        this.scene.append(this.touchEntity);
    }
    Stage.prototype.addChild = function (child) {
        this._root.addChild(child);
        this.scene.insertBefore(child.pixiEntity, this.touchEntity);
    };
    Stage.prototype.removeChild = function (child) {
        return !!this._root.removeChild(child);
    };
    return Stage;
}());
exports.Stage = Stage;
