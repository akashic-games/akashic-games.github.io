"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 具体的なシーンの処理と表示を行う抽象クラス
 */
var Subscene = /** @class */ (function (_super) {
    __extends(Subscene, _super);
    function Subscene(_scene) {
        return _super.call(this, { scene: _scene }) || this;
    }
    return Subscene;
}(g.E));
exports.Subscene = Subscene;
