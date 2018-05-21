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
		var canvas = (document.getElementsByTagName('canvas'))[0];
		canvas.style = "transform-origin: 0px 0px 0px; transform: scale(" + window.innerWidth / canvas.width + ", " + window.innerHeight / canvas.height + ")";

		driver.startGame();
	});
}
