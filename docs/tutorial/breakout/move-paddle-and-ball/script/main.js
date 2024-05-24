exports.main = (param) => {
    const game = g.game; // よくアクセスするため変数に保持しておく
    const scene = new g.Scene({
        game,
        assetPaths: [
            "/assets/images/breakout_paddle.png",
            "/assets/images/breakout_ball.png",
        ],
    });
    let time = 60; // 制限時間
    if (param.sessionParameter.totalTimeLimit) {
        time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用
    }
    // ニコ生ゲームのランキングモードでは g.game.vars.gameState.score の値がスコアとして扱われる
    game.vars.gameState = { score: 0 };
    scene.onLoad.add(() => {
        // 背景を作成
        const background = new g.FilledRect({
            scene,
            cssColor: "#fff",
            x: 0,
            y: 0,
            width: game.width,
            height: game.height,
            opacity: 0.5, // 透過度 50% で表示
        });
        scene.append(background); // 背景をシーンに追加

        // paddle を作成
        const paddle = new g.Sprite({
            scene,
            src: scene.asset.getImage("/assets/images/breakout_paddle.png"),
            x: game.width / 2,
            y: game.height - 20,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        scene.append(paddle); // paddle をシーンに追加

        // ball を作成
        const ball = new g.Sprite({
            scene,
            src: scene.asset.getImage("/assets/images/breakout_ball.png"),
            x: paddle.x,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        ball.y = paddle.y - paddle.height / 2 - ball.height / 2 - 5;
        scene.append(ball); // ball をシーンに追加

        // スワイプでパドルが左右に動くようにする
        scene.onPointMoveCapture.add((event) => {
            paddle.x += event.prevDelta.x;
            paddle.modified();
        });

        let vx = 8;
        let vy = 8;
        scene.onUpdate.add(() => {
            ball.x += vx;
            ball.y -= vy;

            // ボールが画面の左右に到達したとき
            if ((ball.x > game.width - ball.width / 2) || (ball.x < ball.width / 2)) {
                vx = -vx;
            }
            // ボールが画面の上端に到達したとき
            if (ball.y < ball.height / 2) {
                vy = -vy;
            }

            // ボールとパドルが衝突したとき
            if (intersect(ball, paddle)) {
                vy = -vy;
            }

            ball.modified();
        });

        // 任意のエンティティの衝突を判定する関数
        function intersect(e1, e2) {
            return g.Collision.intersect(
                e1.x - e1.width / 2,
                e1.y - e1.height / 2,
                e1.width,
                e1.height,
                e2.x - e2.width / 2,
                e2.y - e2.height / 2,
                e2.width,
                e2.height
            );
        }
    });
    game.pushScene(scene);
};
