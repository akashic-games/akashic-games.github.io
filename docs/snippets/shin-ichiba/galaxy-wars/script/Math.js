Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.intersectArea = void 0;
//
// 矩形の交差判定
//
function intersectArea(a, b) {
    return a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y;
}
exports.intersectArea = intersectArea;
//
// 乱数
//
function random() {
    return g.game.random.generate();
}
exports.random = random;
