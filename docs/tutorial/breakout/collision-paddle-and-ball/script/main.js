exports.main = (param) => {
    const game = g.game; // よくアクセスするため変数に保持しておく
    const scene = new g.Scene({
        game,
        assetPaths: [
            "/assets/images/*",
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

        // ブロックのコンテナを作成
        const blockContainer = new g.E({
            scene,
        });
        scene.append(blockContainer);

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
        const paddleMargin = 128 + paddle.width / 2; // ブロックの横幅＋パドルの中心から端までの距離
        scene.onPointMoveCapture.add((event) => {
            paddle.x += event.prevDelta.x;

            // パドルの移動範囲を制限
            if (paddle.x <= paddleMargin) {
                paddle.x = paddleMargin;
            } else if (paddle.x >= game.width - paddleMargin) {
                paddle.x = game.width - paddleMargin;
            }

            paddle.modified();
        });

        let direction = normalize([1, 2]);
        let speed = 12;
        let vx = speed * direction[0];
        let vy = speed * direction[1];

        let isStarted = false;
        scene.onPointUpCapture.add(() => {
            if (!isStarted) {
                isStarted = true;
            }
        });

        scene.onUpdate.add(() => {
            if (isStarted) {
                ball.x += vx;
                ball.y -= vy;
            } else {
                ball.x = paddle.x;
                ball.y = paddle.y - paddle.height / 2 - ball.height / 2 - 5;
            }

            // ボールが画面の左右に到達したとき
            if ((ball.x > game.width - ball.width / 2) || (ball.x < ball.width / 2)) {
                vx = -vx;
            }
            // ボールが画面の上端に到達したとき
            if (ball.y < ball.height / 2) {
                vy = -vy;
            }
            // ボールが画面の下端に到達したとき
            if (ball.y > game.height + ball.height / 2) {
                isStarted = false;
                vx = speed * direction[0];
                vy = speed * direction[1];
            }

            // ボールとパドルが衝突したとき
            if (intersect(ball, paddle)) {
                const h = 30;
                const direction = normalize([ball.x - paddle.x, -(ball.y - (paddle.y + h))]);
                vx = speed * direction[0];
                vy = speed * direction[1];
            }

            for (const block of blockContainer.children) {
                let isCollided = false; // 衝突しているかの情報を保持する変数

                // 上下
                if (
                    pointInRect(ball.x, ball.y - ball.height / 2, block) ||
                    pointInRect(ball.x, ball.y + ball.height / 2, block)
                ) {
                    vy = -vy;
                    isCollided = true;
                }

                // 左右
                else if (
                    pointInRect(ball.x + ball.width / 2, ball.y, block) ||
                    pointInRect(ball.x - ball.width / 2, ball.y, block)
                ) {
                    vx = -vx;
                    isCollided = true;
                }

                if (isCollided) {
                    // 破壊可能のボールと衝突していたら
                    if (block.tag.mapNumber !== 1) {
                        block.destroy(); // ブロックを破壊
                        break; // 一度のフレームで一つのブロックのみを削除
                    }
                }
            }

            ball.modified();
        });

        // ブロックのマップデータ
        const blocksMap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        ];

        // ブロックの作成
        for (let col = 0; col < blocksMap.length; col++) {
            for (let row = 0; row < blocksMap[col].length; row++) {
                const mapNumber = blocksMap[col][row];

                if (mapNumber === 0) continue; // 0 は空白として扱う

                let blockAsset;
                if (mapNumber === 1) {
                    blockAsset = scene.asset.getImage("/assets/images/breakout_block_a.png");
                } else if (mapNumber === 2) {
                    blockAsset = scene.asset.getImage("/assets/images/breakout_block_b.png");
                } else {
                    throw new Error("対象の mapNumber は定義されていません");
                }

                const block = new g.Sprite({
                    scene,
                    x: row * blockAsset.width + blockAsset.width / 2,
                    y: col * blockAsset.height + blockAsset.height / 2,
                    src: blockAsset,
                    width: blockAsset.width,
                    height: blockAsset.height,
                    anchorX: 0.5,
                    anchorY: 0.5,
                    tag: {
                        mapNumber,
                    },
                });

                // ブロックを blockContainer の子として追加
                blockContainer.append(block);
            }
        }

        function normalize(vec) {
            const magnitude = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
            if (magnitude === 0) return vec; // 大きさが 0 の場合は正規化不可のため元のベクトルを返す
            return [vec[0] / magnitude, vec[1] / magnitude];
        }

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

        // ある座標が矩形と衝突しているかを判定する関数
        function pointInRect(x, y, e) {
            return (
                x >= e.x - e.width / 2 &&
                x <= e.x + e.width / 2 &&
                y >= e.y - e.height / 2 &&
                y <= e.y + e.height / 2
            );
        }
    });
    game.pushScene(scene);
};
