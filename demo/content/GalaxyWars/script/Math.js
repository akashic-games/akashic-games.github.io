//
// 矩形の交差判定
//
function intersectArea(a, b) {
    return a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y;
}

//
// 乱数
//
function random() {
    return g.game.random.generate();
}

module.exports.intersectArea = intersectArea;
module.exports.random = random;
