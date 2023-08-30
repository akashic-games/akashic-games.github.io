"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
var PIXI_1 = require("../PIXI");
// MV では Stage は Container から派生している(Scene と Sprite などとの間に区別がない)。
var Stage = /** @class */ (function () {
    function Stage() {
        this.scene = new g.Scene({ game: g.game });
        this._root = new PIXI_1.Container(this.scene);
    }
    Stage.prototype.addChild = function (child) {
        this._root.addChild(child);
        this.scene.append(child.pixiEntity);
    };
    Stage.prototype.removeChild = function (child) {
        return !!this._root.removeChild(child);
    };
    return Stage;
}());
exports.Stage = Stage;
