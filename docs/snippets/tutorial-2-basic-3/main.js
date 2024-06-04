function main() {
  const scene = new g.Scene({
    game: g.game,
    assetPaths: ["/image/player.png"] // シーン内で利用するアセットのパス
  });

  scene.loaded.add(() => {
    const sprite = new g.Sprite({
      scene: scene,
      src: scene.asset.getImage("/image/player.png")
    });
    scene.append(sprite);
  });
  g.game.pushScene(scene);
}

module.exports = main;
