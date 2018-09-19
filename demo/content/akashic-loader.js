function start(gamePath, assetBase)  {

	var sandboxGameId = gamePath;
	var sandboxPlayer = { id: "9999", name: "sandbox-player" };
	var sandboxPlayId = "sandboxDummyPlayId";
	var storage = new gameStorage.GameStorage(window.localStorage, { gameId: sandboxGameId });

	var pdiBrowser = require("@akashic/pdi-browser");
	var gdr = require("@akashic/game-driver");

	var amflowClient = new gdr.MemoryAmflowClient({
		playId: sandboxPlayId,
		putStorageDataSyncFunc: storage.set.bind(storage),
		getStorageDataSyncFunc: function (readKeys) {
			var svs = storage.load(readKeys);
			// StorageValue[][]からStorageData[]に変換する
			// TODO: StorageValue[][]が返ってくる必然性はない。game-storage側の仕様を変えるべき。
			return readKeys.map(function (k, i) { return { readKey: k, values: svs[i] }; });
		}
	});

	var pf = new pdiBrowser.Platform({
		amflow: amflowClient,
		containerView: document.getElementById("container"),
		audioPlugins: [pdiBrowser.WebAudioPlugin, pdiBrowser.HTMLAudioPlugin],
	});

	var driver = new gdr.GameDriver({
		platform: pf,
		player: sandboxPlayer,
		errorHandler: function (e) { console.log("ERRORHANDLER:", e); }
	});

	driver.gameCreatedTrigger.handle(function (game) {
		function fitToWindow(center) {
			if (!pf.containerController) return;
			var parentView = document.getElementById("container").parentElement;
			parentView.style.margin = "0px";
			parentView.style.padding = "0px";
			parentView.style.overflow = "hidden";
			var viewportSize = {
				width: window.innerWidth || document.documentElement.clientWidth,
				height: window.innerHeight || document.documentElement.clientHeight
			};
			fitToSize(viewportSize, center);
		}

		function fitToSize(viewportSize, center) {
			var gameScale = Math.min(
				viewportSize.width / game.width,
				viewportSize.height / game.height
			);
			var gameSize = {
				width: Math.floor(game.width * gameScale),
				height: Math.floor(game.height * gameScale)
			};
			pf.containerController.changeScale(gameScale, gameScale);
			if (!!center) {
				var gameOffset = {
					x: Math.floor((viewportSize.width - gameSize.width) / 2),
					y: Math.floor((viewportSize.height - gameSize.height) / 2)
				};
				pf.containerController.inputHandlerLayer.setOffset(gameOffset);
			}
		}

		fitToWindow(true);
	});

	driver.initialize({
		configurationUrl: gamePath,
		assetBase: assetBase,
		driverConfiguration: {
			playId: sandboxPlayId,
			playToken: "dummyToken",
			executionMode: gdr.ExecutionMode.Active
		},
		loopConfiguration: { loopMode: gdr.LoopMode.Realtime }
	}, function (e) {
		if (e) {
			console.log(e);
			throw e;
		}

		driver.startGame();
	});
}
