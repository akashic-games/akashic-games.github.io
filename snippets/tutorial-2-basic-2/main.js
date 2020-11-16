var rectHeight = 40,
  rectWidth = 60,
  rectMargin = 10;

function main() {
  var scene = new g.Scene({ game: g.game });
  scene.loaded.add(function() {
    var x, y, rect;
    for (y = 0; y < g.game.height; y += rectHeight + rectMargin) {
      for (x = 0; x < g.game.width; x += rectWidth + rectMargin) {
        rect = createRect(scene, x, y);
        scene.append(rect);
      }
    }
  });
  g.game.pushScene(scene);
}

function createRect(scene, x, y) {
  return new g.FilledRect({
    scene: scene,
    x: x,
    y: y,
    width: rectWidth,
    height: rectHeight,
    cssColor: "#7F3F3F"
  });
}

module.exports = main;
