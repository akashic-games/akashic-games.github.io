function main() {
  var scene = new g.Scene({ game: g.game });
  scene.onLoad.add(function() {
    var rect = createRect(scene);
    scene.append(rect);
  });
  g.game.pushScene(scene);
}

function createRect(scene) {
  return new g.FilledRect({
    scene: scene,
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    cssColor: "red"
  });
}

module.exports = main;
