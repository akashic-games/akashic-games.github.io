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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasingGraphE = void 0;
var EasingGraphE = /** @class */ (function (_super) {
    __extends(EasingGraphE, _super);
    function EasingGraphE(param) {
        var _this = _super.call(this, param) || this;
        _this.margin = Math.round(_this.height / 4);
        _this._title = param.title;
        _this.font = param.font;
        _this.easingFn = param.easingFn;
        _this.surface = g.game.resourceFactory.createSurface(_this.width, _this.height + _this.margin * 2);
        _this.renderer = _this.surface.renderer();
        _this.titleLabel = new g.Label({
            scene: _this.scene,
            y: _this.height + 16,
            width: _this.width,
            font: _this.font,
            text: _this._title,
            widthAutoAdjust: false,
            textAlign: "center"
        });
        _this.append(_this.titleLabel);
        _this.updateEasingGraph();
        return _this;
    }
    Object.defineProperty(EasingGraphE.prototype, "title", {
        set: function (v) {
            this._title = v;
            this.titleLabel.text = this._title;
            this.titleLabel.invalidate();
        },
        enumerable: false,
        configurable: true
    });
    ;
    EasingGraphE.prototype.renderSelf = function (renderer, _camera) {
        var size = 4;
        renderer.fillRect(0, this.height - size, this.width, size, "silver");
        renderer.fillRect(0, 0, size, this.height, "silver");
        renderer.drawImage(this.surface, 0, 0, this.surface.width, this.surface.height, 0, -this.margin);
        return true;
    };
    /**
    * イージング関数のグラフを更新する。
    */
    EasingGraphE.prototype.updateEasingGraph = function () {
        var step = 0.5;
        var size = 4;
        var graphWidth = this.width - size;
        this.renderer.begin();
        this.renderer.clear();
        for (var x = 0; x < graphWidth; x += step) {
            var pos = this.easingPosition(x / graphWidth);
            this.renderer.fillRect(pos.x - size / 2, pos.y - size / 2 + this.margin, size, size, "gray");
        }
        this.renderer.end();
    };
    /**
    * 0 ~ 1 の値を 0 ~ 1 の値にイージングした結果を得る。
    *
    * @param t 0 ~ 1 の値。
    * @returns イージングした結果[0, 1]。
    */
    EasingGraphE.prototype.easing = function (t) {
        return this.easingFn(t, 0, 1, 1);
    };
    /**
     * 媒介変数 t [0, 1] からグラフ上の位置 (x, y) を得る。
     *
     * @param t 媒介変数。
     * @returns t に対応する位置。
     */
    EasingGraphE.prototype.easingPosition = function (t) {
        var size = 4;
        var ox = size / 2;
        var oy = this.height - size / 2;
        var graphWidth = this.width - size;
        var graphHeight = this.height - size;
        var x = t * graphWidth;
        return {
            x: x + ox,
            y: this.easingFn(x, 0, -graphHeight, graphWidth) + oy
        };
    };
    ;
    return EasingGraphE;
}(g.E));
exports.EasingGraphE = EasingGraphE;
