"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texture = void 0;
var Rectangle_1 = require("./Rectangle");
var Texture = /** @class */ (function () {
    function Texture() {
        this.frame = new Rectangle_1.Rectangle(0, 0, 1, 1);
        this.baseTexture = { width: 0, height: 0 };
    }
    return Texture;
}());
exports.Texture = Texture;
