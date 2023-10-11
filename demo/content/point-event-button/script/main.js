module.exports = () => {
  const game = g.game;
  const scene = new g.Scene({
    game,
  });
  scene.onLoad.addOnce(() => {
    const rect = new g.FilledRect({
      scene,
      cssColor: "black",
      width: 32,
      height: 32,
      x: game.width / 2,
      y: game.height / 2,
      anchorX: 0.5,
      anchorY: 0.5,
      touchable: true,
    });
    const handlePointEvent = (event) => {
      if (event.button === 0) {
        rect.cssColor = "red";
      } else if (event.button === 2) {
        rect.cssColor = "blue";
      } else if (event.button === 1) {
        rect.cssColor = "green";
      }
      rect.modified();
    };

    rect.onPointDown.add(handlePointEvent);
    rect.onPointMove.add(handlePointEvent);

    rect.onPointMove.add((event) => {
      rect.x += event.prevDelta.x;
      rect.y += event.prevDelta.y;
      rect.modified();
    });
    rect.onPointUp.add(() => {
      rect.cssColor = "black";
      rect.modified();
    });

    scene.append(rect);
  });
  game.pushScene(scene);
};
