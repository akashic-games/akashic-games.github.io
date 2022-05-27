function main() {
  const scene = new g.Scene({
    game: g.game,
    assetIds: ["player"] // シーン内で利用するアセットID
  });

  scene.loaded.add(() => {
    const sprite = new g.Sprite({
      scene: scene,
      src: scene.assets["player"]
    });
    scene.append(sprite);
  });
  g.game.pushScene(scene);
}

module.exports = main;
