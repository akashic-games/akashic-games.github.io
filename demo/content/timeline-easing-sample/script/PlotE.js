const __extends = (this && this.__extends) || (() => {
    let extendStatics = (d, b) => {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return (d, b) => {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotE = void 0;
const highlightColor = "#00BFFF";
const PlotE = /** @class */ (function (_super) {
    __extends(PlotE, _super);
    function PlotE(param) {
        const _this = _super.call(this, param) || this;
        _this.value = 0;
        return _this;
    }
    PlotE.prototype.renderSelf = (renderer, _camera) => {
        const axisSize = 4;
        renderer.fillRect(0, 0, this.width, axisSize, "silver");
        renderer.fillRect((this.width - axisSize) / 2, axisSize, axisSize, this.height - axisSize * 2, "silver");
        renderer.fillRect(0, this.height - axisSize, this.width, axisSize, "silver");
        const x = this.width / 2;
        const y = (1 - this.value) * this.height;
        const size = 24;
        renderer.fillRect(x - size / 2, y - size / 2, size, size, highlightColor);
        return true;
    };
    ;
    return PlotE;
}(g.E));
exports.PlotE = PlotE;
