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
/*
 * トグルボタン
 */
var ToggleButton = /** @class */ (function (_super) {
    __extends(ToggleButton, _super);
    function ToggleButton(param) {
        var _this = _super.call(this, param) || this;
        _this.onoff = param.onoff;
        _this.highlight = new g.FilledRect({ scene: param.scene, cssColor: "#208020", width: _this.width, height: 2 });
        _this.highlight.y = _this.height;
        _this.append(_this.highlight);
        _this.toggled = new g.Trigger();
        _this.pointDown.add(_this.onPointDown, _this);
        if (param.onoff) {
            _this.highlight.show();
        }
        else {
            _this.highlight.hide();
        }
        return _this;
    }
    ToggleButton.prototype.onPointDown = function (e) {
        this.toggle();
        this.toggled.fire(this.onoff);
    };
    ToggleButton.prototype.setState = function (onoff) {
        if (this.onoff != onoff) {
            this.toggle();
            this.toggled.fire(this.onoff);
        }
    };
    ToggleButton.prototype.toggle = function () {
        this.onoff = !this.onoff;
        if (this.onoff) {
            this.highlight.show();
        }
        else {
            this.highlight.hide();
        }
        this.highlight.modified();
    };
    return ToggleButton;
}(g.Sprite));
exports.ToggleButton = ToggleButton;
/*
 * インジケータ
 */
var Indicator = /** @class */ (function (_super) {
    __extends(Indicator, _super);
    function Indicator(scene) {
        var _this = _super.call(this, { scene: scene, x: 0, y: scene.game.height - 2, cssColor: "#A0A0A0", width: scene.game.width, height: 2 }) || this;
        _this.progress = new g.FilledRect({ scene: scene, x: 0, y: 0, cssColor: "#FF6060", width: 0, height: 2 });
        _this.append(_this.progress);
        return _this;
    }
    Object.defineProperty(Indicator.prototype, "position", {
        set: function (p) {
            this.progress.width = this.scene.game.width * p;
        },
        enumerable: true,
        configurable: true
    });
    return Indicator;
}(g.FilledRect));
exports.Indicator = Indicator;
