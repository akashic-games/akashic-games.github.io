"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graphics = void 0;
var Graphics = /** @class */ (function () {
    function Graphics() {
    }
    Graphics.initialize = function (width, height, type) {
        this._width = width || 800;
        this._height = height || 600;
        this._rendererType = type || "auto";
        this._boxWidth = this._width;
        this._boxHeight = this._height;
        this._scale = 1;
        this._realScale = 1;
        this._errorShowed = false;
        this._errorPrinter = null;
        this._canvas = null;
        this._video = null;
        this._videoUnlocked = false;
        this._videoLoading = false;
        this._upperCanvas = null;
        this._renderer = null;
        this._fpsMeter = null;
        this._modeBox = null;
        this._skipCount = 0;
        this._maxSkip = 3;
        this._rendered = false;
        this._loadingImage = null;
        this._loadingCount = 0;
        this._fpsMeterToggled = false;
        this._stretchEnabled = this._defaultStretchMode();
        this._canUseDifferenceBlend = false;
        this._canUseSaturationBlend = false;
        this._hiddenCanvas = null;
        this._testCanvasBlendModes();
        this._modifyExistingElements();
        this._updateRealScale();
        this._createAllElements();
        this._disableTextSelection();
        this._disableContextMenu();
        this._setupEventHandlers();
        this._setupCssFontLoading();
    };
    Graphics._setupCssFontLoading = function () {
        // if(Graphics._cssFontLoading){
        // 	document.fonts.ready.then(function(fonts){
        // 		static _fontLoaded = fonts;
        // 	}).catch(function(error){
        // 		SceneManager.onError(error);
        // 	});
        // }
    };
    Graphics.canUseCssFontLoading = function () {
        return !!this._cssFontLoading;
    };
    Graphics.tickStart = function () {
        if (this._fpsMeter) {
            this._fpsMeter.tickStart();
        }
    };
    Graphics.tickEnd = function () {
        if (this._fpsMeter && this._rendered) {
            this._fpsMeter.tick();
        }
    };
    Graphics.render = function (stage) {
        if (this._skipCount === 0) {
            var startTime = Date.now();
            if (stage) {
                this._renderer.render(stage);
                if (this._renderer.gl && this._renderer.gl.flush) {
                    this._renderer.gl.flush();
                }
            }
            var endTime = Date.now();
            var elapsed = endTime - startTime;
            this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
            this._rendered = true;
        }
        else {
            this._skipCount--;
            this._rendered = false;
        }
        this.frameCount++;
    };
    Graphics.isWebGL = function () {
        // return this._renderer && this._renderer.type === PIXI.RENDERER_TYPE.WEBGL;
        return false;
    };
    Graphics.hasWebGL = function () {
        // try {
        // 	var canvas = document.createElement('canvas');
        // 	return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        // } catch (e) {
        // 	return false;
        // }
        return true;
    };
    Graphics.canUseDifferenceBlend = function () {
        return this._canUseDifferenceBlend;
    };
    Graphics.canUseSaturationBlend = function () {
        return this._canUseSaturationBlend;
    };
    Graphics.setLoadingImage = function (_src) {
        // this._loadingImage = new Image();
        // this._loadingImage.src = src;
    };
    Graphics.startLoading = function () {
        this._loadingCount = 0;
    };
    Graphics.updateLoading = function () {
        this._loadingCount++;
        this._paintUpperCanvas();
        // this._upperCanvas.style.opacity = 1;
    };
    Graphics.endLoading = function () {
        this._clearUpperCanvas();
        // this._upperCanvas.style.opacity = 0;
    };
    Graphics.printLoadingError = function (url) {
        if (this._errorPrinter && !this._errorShowed) {
            // this._errorPrinter.innerHTML = this._makeErrorHtml('Loading Error', 'Failed to load: ' + url);
            // var button = document.createElement('button');
            // button.innerHTML = 'Retry';
            // button.style.fontSize = '24px';
            // button.style.color = '#ffffff';
            // button.style.backgroundColor = '#000000';
            // button.onmousedown = button.ontouchstart(event) {
            // 	ResourceHandler.retry();
            // 	event.stopPropagation();
            // }
            // this._errorPrinter.appendChild(button);
            this._loadingCount = -Infinity;
            console.log("failed to load: " + url);
        }
    };
    Graphics.eraseLoadingError = function () {
        if (this._errorPrinter && !this._errorShowed) {
            this._errorPrinter.innerHTML = "";
            this.startLoading();
        }
    };
    Graphics.printError = function (name, message) {
        this._errorShowed = true;
        // if (this._errorPrinter) {
        // 	this._errorPrinter.innerHTML = this._makeErrorHtml(name, message);
        // }
        this._applyCanvasFilter();
        this._clearUpperCanvas();
        console.log("error: " + name + ", " + message);
    };
    Graphics.showFps = function () {
        if (this._fpsMeter) {
            this._fpsMeter.show();
            this._modeBox.style.opacity = 1;
        }
    };
    Graphics.hideFps = function () {
        if (this._fpsMeter) {
            this._fpsMeter.hide();
            this._modeBox.style.opacity = 0;
        }
    };
    Graphics.loadFont = function (name, _url) {
        // var style = document.createElement('style');
        // var head = document.getElementsByTagName('head');
        // var rule = '@font-face { font-family: "' + name + '"; src: url("' + url + '"); }';
        // style.type = 'text/css';
        // head.item(0).appendChild(style);
        // style.sheet.insertRule(rule, 0);
        this._createFontLoader(name);
    };
    Graphics.isFontLoaded = function (name) {
        // if (Graphics._cssFontLoading) {
        // 	if(Graphics._fontLoaded){
        // 		return Graphics._fontLoaded.check('10px "'+name+'"');
        // 	}
        // 	return false;
        // } else {
        // 	if (!this._hiddenCanvas) {
        // 		this._hiddenCanvas = document.createElement('canvas');
        // 	}
        // 	var context = this._hiddenCanvas.getContext('2d');
        // 	var text = 'abcdefghijklmnopqrstuvwxyz';
        // 	var width1, width2;
        // 	context.font = '40px ' + name + ', sans-serif';
        // 	width1 = context.measureText(text).width;
        // 	context.font = '40px sans-serif';
        // 	width2 = context.measureText(text).width;
        // 	return width1 !== width2;
        // }
        console.log("Graphics#isFontLoaded(" + name + ") returns true");
        return true;
    };
    Graphics.playVideo = function (src) {
        // this._videoLoader = ResourceHandler.createLoader(null, this._playVideo.bind(this, src), this._onVideoError.bind(this));
        this._playVideo(src);
    };
    Graphics._playVideo = function (src) {
        // this._video.src = src;
        // this._video.onloadeddata = this._onVideoLoad.bind(this);
        // this._video.onerror = this._videoLoader;
        // this._video.onended = this._onVideoEnd.bind(this);
        // this._video.load();
        // this._videoLoading = true;
        this._videoLoading = false;
        console.log("Graphics#_playVide() is not implemented, src = " + src);
    };
    Graphics.isVideoPlaying = function () {
        return this._videoLoading || this._isVideoVisible();
    };
    Graphics.canPlayVideoType = function (type) {
        return this._video && this._video.canPlayType(type);
    };
    Graphics.setVideoVolume = function (value) {
        this._videoVolume = value;
        if (this._video) {
            this._video.volume = this._videoVolume;
        }
    };
    Graphics.pageToCanvasX = function (x) {
        // if (this._canvas) {
        // 	// const left = this._canvas.offsetLeft;
        // 	const left = 0;
        // 	return Math.round((x - left) / this._realScale);
        // } else {
        // 	return 0;
        // }
        return x;
    };
    Graphics.pageToCanvasY = function (y) {
        // if (this._canvas) {
        // 	// const top = this._canvas.offsetTop;
        // 	const top = 0;
        // 	return Math.round((y - top) / this._realScale);
        // } else {
        // 	return 0;
        // }
        return y;
    };
    Graphics.isInsideCanvas = function (x, y) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    };
    Graphics.callGC = function () {
        // if (Graphics.isWebGL()) {
        // 	static _renderer.textureGC.run();
        // }
    };
    Object.defineProperty(Graphics, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width !== value) {
                this._width = value;
                this._updateAllElements();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Graphics, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height !== value) {
                this._height = value;
                this._updateAllElements();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Graphics, "boxWidth", {
        get: function () {
            return this._boxWidth;
        },
        set: function (value) {
            this._boxWidth = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Graphics, "boxHeight", {
        get: function () {
            return this._boxHeight;
        },
        set: function (value) {
            this._boxHeight = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Graphics, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (value) {
            if (this._scale !== value) {
                this._scale = value;
                this._updateAllElements();
            }
        },
        enumerable: false,
        configurable: true
    });
    Graphics._createAllElements = function () {
        this._createErrorPrinter();
        this._createCanvas();
        this._createVideo();
        this._createUpperCanvas();
        this._createRenderer();
        this._createFPSMeter();
        this._createModeBox();
        this._createGameFontLoader();
    };
    Graphics._updateAllElements = function () {
        this._updateRealScale();
        this._updateErrorPrinter();
        this._updateCanvas();
        this._updateVideo();
        this._updateUpperCanvas();
        this._updateRenderer();
        this._paintUpperCanvas();
    };
    Graphics._updateRealScale = function () {
        if (this._stretchEnabled) {
            // let h = window.innerWidth / this._width;
            // let v = window.innerHeight / this._height;
            // if (h >= 1 && h - 0.01 <= 1) h = 1;
            // if (v >= 1 && v - 0.01 <= 1) v = 1;
            var h = 1;
            var v = 1;
            this._realScale = Math.min(h, v);
        }
        else {
            this._realScale = this._scale;
        }
    };
    Graphics._makeErrorHtml = function (name, message) {
        return '<font color="yellow"><b>' + name + "</b></font><br>" + '<font color="white">' + message + "</font><br>";
    };
    Graphics._defaultStretchMode = function () {
        // return Utils.isNwjs() || Utils.isMobileDevice();
        return false;
    };
    Graphics._testCanvasBlendModes = function () {
        // var canvas, context, imageData1, imageData2;
        // canvas = document.createElement('canvas');
        // canvas.width = 1;
        // canvas.height = 1;
        // context = canvas.getContext('2d');
        // context.globalCompositeOperation = 'source-over';
        // context.fillStyle = 'white';
        // context.fillRect(0, 0, 1, 1);
        // context.globalCompositeOperation = 'difference';
        // context.fillStyle = 'white';
        // context.fillRect(0, 0, 1, 1);
        // imageData1 = context.getImageData(0, 0, 1, 1);
        // context.globalCompositeOperation = 'source-over';
        // context.fillStyle = 'black';
        // context.fillRect(0, 0, 1, 1);
        // context.globalCompositeOperation = 'saturation';
        // context.fillStyle = 'white';
        // context.fillRect(0, 0, 1, 1);
        // imageData2 = context.getImageData(0, 0, 1, 1);
        // this._canUseDifferenceBlend = imageData1.data[0] === 0;
        // this._canUseSaturationBlend = imageData2.data[0] === 0;
        this._canUseDifferenceBlend = true;
        this._canUseSaturationBlend = true;
    };
    Graphics._modifyExistingElements = function () {
        // var elements = document.getElementsByTagName('*');
        // for (var i = 0; i < elements.length; i++) {
        // 	if (elements[i].style.zIndex > 0) {
        // 		elements[i].style.zIndex = 0;
        // 	}
        // }
        console.log("Graphics#_modifyExistingElements not implemented");
    };
    /**
     * @static
     * @method _createErrorPrinter
     * @private
     */
    Graphics._createErrorPrinter = function () {
        // this._errorPrinter = document.createElement('p');
        // this._errorPrinter.id = 'ErrorPrinter';
        // this._updateErrorPrinter();
        // document.body.appendChild(this._errorPrinter);
        console.log("Graphics#_createErrorPrinter not implemented");
    };
    /**
     * @static
     * @method _updateErrorPrinter
     * @private
     */
    Graphics._updateErrorPrinter = function () {
        // this._errorPrinter.width = this._width * 0.9;
        // this._errorPrinter.height = 40;
        // this._errorPrinter.style.textAlign = 'center';
        // this._errorPrinter.style.textShadow = '1px 1px 3px #000';
        // this._errorPrinter.style.fontSize = '20px';
        // this._errorPrinter.style.zIndex = 99;
        // this._centerElement(this._errorPrinter);
        console.log("Graphics#_updateErrorPrinter not implemented");
    };
    Graphics._createCanvas = function () {
        // this._canvas = document.createElement('canvas');
        // this._canvas.id = 'GameCanvas';
        // this._updateCanvas();
        // document.body.appendChild(this._canvas);
    };
    Graphics._updateCanvas = function () {
        // this._canvas.width = this._width;
        // this._canvas.height = this._height;
        // this._canvas.style.zIndex = 1;
        // this._centerElement(this._canvas);
        console.log("Graphics#_updateCanvas not implemented");
    };
    Graphics._createVideo = function () {
        // this._video = document.createElement('video');
        // this._video.id = 'GameVideo';
        // this._video.style.opacity = 0;
        // this._video.setAttribute('playsinline', '');
        // this._video.volume = this._videoVolume;
        // this._updateVideo();
        // makeVideoPlayableInline(this._video);
        // document.body.appendChild(this._video);
        console.log("Graphics#_createVideo not implemented");
    };
    /**
     * @static
     * @method _updateVideo
     * @private
     */
    Graphics._updateVideo = function () {
        this._video.width = this._width;
        this._video.height = this._height;
        this._video.style.zIndex = 2;
        this._centerElement(this._video);
    };
    Graphics._createUpperCanvas = function () {
        // this._upperCanvas = document.createElement('canvas');
        // this._upperCanvas.id = 'UpperCanvas';
        // this._updateUpperCanvas();
        // document.body.appendChild(this._upperCanvas);
    };
    Graphics._updateUpperCanvas = function () {
        // this._upperCanvas.width = this._width;
        // this._upperCanvas.height = this._height;
        // this._upperCanvas.style.zIndex = 3;
        // this._centerElement(this._upperCanvas);
    };
    Graphics._clearUpperCanvas = function () {
        // var context = this._upperCanvas.getContext('2d');
        // context.clearRect(0, 0, this._width, this._height);
    };
    /**
     * @static
     * @method _paintUpperCanvas
     * @private
     */
    Graphics._paintUpperCanvas = function () {
        // this._clearUpperCanvas();
        // if (this._loadingImage && this._loadingCount >= 20) {
        // 	var context = this._upperCanvas.getContext('2d');
        // 	var dx = (this._width - this._loadingImage.width) / 2;
        // 	var dy = (this._height - this._loadingImage.height) / 2;
        // 	var alpha = ((this._loadingCount - 20) / 30).clamp(0, 1);
        // 	context.save();
        // 	context.globalAlpha = alpha;
        // 	context.drawImage(this._loadingImage, dx, dy);
        // 	context.restore();
        // }
        console.log("Graphics#_paintUpperCanvas not implemented");
    };
    Graphics._createRenderer = function () {
        // PIXI.dontSayHello = true;
        // var width = this._width;
        // var height = this._height;
        // var options = { view: this._canvas };
        // try {
        // 	switch (this._rendererType) {
        // 	case 'canvas':
        // 		this._renderer = new PIXI.CanvasRenderer(width, height, options);
        // 		break;
        // 	case 'webgl':
        // 		this._renderer = new PIXI.WebGLRenderer(width, height, options);
        // 		break;
        // 	default:
        // 		this._renderer = PIXI.autoDetectRenderer(width, height, options);
        // 		break;
        // 	}
        // 	if(this._renderer && this._renderer.textureGC)
        // 		this._renderer.textureGC.maxIdle = 1;
        // } catch (e) {
        // 	this._renderer = null;
        // }
    };
    Graphics._updateRenderer = function () {
        // if (this._renderer) {
        // 	this._renderer.resize(this._width, this._height);
        // }
    };
    Graphics._createFPSMeter = function () {
        // var options = { graph: 1, decimals: 0, theme: 'transparent', toggleOn: null };
        // this._fpsMeter = new FPSMeter(options);
        // this._fpsMeter.hide();
    };
    Graphics._createModeBox = function () {
        // var box = document.createElement('div');
        // box.id = 'modeTextBack';
        // box.style.position = 'absolute';
        // box.style.left = '5px';
        // box.style.top = '5px';
        // box.style.width = '119px';
        // box.style.height = '58px';
        // box.style.background = 'rgba(0,0,0,0.2)';
        // box.style.zIndex = 9;
        // box.style.opacity = 0;
        // var text = document.createElement('div');
        // text.id = 'modeText';
        // text.style.position = 'absolute';
        // text.style.left = '0px';
        // text.style.top = '41px';
        // text.style.width = '119px';
        // text.style.fontSize = '12px';
        // text.style.fontFamily = 'monospace';
        // text.style.color = 'white';
        // text.style.textAlign = 'center';
        // text.style.textShadow = '1px 1px 0 rgba(0,0,0,0.5)';
        // text.innerHTML = this.isWebGL() ? 'WebGL mode' : 'Canvas mode';
        // document.body.appendChild(box);
        // box.appendChild(text);
        // this._modeBox = box;
    };
    /**
     * @static
     * @method _createGameFontLoader
     * @private
     */
    Graphics._createGameFontLoader = function () {
        // this._createFontLoader('GameFont');
    };
    Graphics._createFontLoader = function (_name) {
        // var div = document.createElement('div');
        // var text = document.createTextNode('.');
        // div.style.fontFamily = name;
        // div.style.fontSize = '0px';
        // div.style.color = 'transparent';
        // div.style.position = 'absolute';
        // div.style.margin = 'auto';
        // div.style.top = '0px';
        // div.style.left = '0px';
        // div.style.width = '1px';
        // div.style.height = '1px';
        // div.appendChild(text);
        // document.body.appendChild(div);
    };
    Graphics._centerElement = function (_element) {
        // var width = element.width * this._realScale;
        // var height = element.height * this._realScale;
        // element.style.position = 'absolute';
        // element.style.margin = 'auto';
        // element.style.top = 0;
        // element.style.left = 0;
        // element.style.right = 0;
        // element.style.bottom = 0;
        // element.style.width = width + 'px';
        // element.style.height = height + 'px';
    };
    Graphics._disableTextSelection = function () {
        // var body = document.body;
        // body.style.userSelect = 'none';
        // body.style.webkitUserSelect = 'none';
        // body.style.msUserSelect = 'none';
        // body.style.mozUserSelect = 'none';
    };
    Graphics._disableContextMenu = function () {
        // var elements = document.body.getElementsByTagName('*');
        // var oncontextmenu() { return false; };
        // for (var i = 0; i < elements.length; i++) {
        // 	elements[i].oncontextmenu = oncontextmenu;
        // }
    };
    Graphics._applyCanvasFilter = function () {
        // if (this._canvas) {
        // 	this._canvas.style.opacity = 0.5;
        // 	this._canvas.style.filter = 'blur(8px)';
        // 	this._canvas.style.webkitFilter = 'blur(8px)';
        // }
    };
    Graphics._onVideoLoad = function () {
        // this._video.play();
        // this._updateVisibility(true);
        // this._videoLoading = false;
    };
    Graphics._onVideoError = function () {
        // this._updateVisibility(false);
        // this._videoLoading = false;
    };
    Graphics._onVideoEnd = function () {
        // this._updateVisibility(false);
    };
    Graphics._updateVisibility = function (_videoVisible) {
        // this._video.style.opacity = videoVisible ? 1 : 0;
        // this._canvas.style.opacity = videoVisible ? 0 : 1;
    };
    /**
     * @static
     * @method _isVideoVisible
     * @return {Boolean}
     * @private
     */
    Graphics._isVideoVisible = function () {
        // return this._video.style.opacity > 0;
        return false;
    };
    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    Graphics._setupEventHandlers = function () {
        // TODO: なんとかしてイベントハンドラを
        // window.addEventListener('resize', this._onWindowResize.bind(this));
        // document.addEventListener('keydown', this._onKeyDown.bind(this));
        // document.addEventListener('keydown', this._onTouchEnd.bind(this));
        // document.addEventListener('mousedown', this._onTouchEnd.bind(this));
        // document.addEventListener('touchend', this._onTouchEnd.bind(this));
    };
    Graphics._onWindowResize = function () {
        this._updateAllElements();
    };
    Graphics._onKeyDown = function (_event) {
        // if (!event.ctrlKey && !event.altKey) {
        // 	switch (event.keyCode) {
        // 	case 113:   // F2
        // 		event.preventDefault();
        // 		this._switchFPSMeter();
        // 		break;
        // 	case 114:   // F3
        // 		event.preventDefault();
        // 		this._switchStretchMode();
        // 		break;
        // 	case 115:   // F4
        // 		event.preventDefault();
        // 		this._switchFullScreen();
        // 		break;
        // 	}
        // }
    };
    Graphics._onTouchEnd = function (_event) {
        // if (!this._videoUnlocked) {
        // 	this._video.play();
        // 	this._videoUnlocked = true;
        // }
        // if (this._isVideoVisible() && this._video.paused) {
        // 	this._video.play();
        // }
    };
    Graphics._switchFPSMeter = function () {
        // if (this._fpsMeter.isPaused) {
        // 	this.showFps();
        // 	this._fpsMeter.showFps();
        // 	this._fpsMeterToggled = false;
        // } else if (!this._fpsMeterToggled) {
        // 	this._fpsMeter.showDuration();
        // 	this._fpsMeterToggled = true;
        // } else {
        // 	this.hideFps();
        // }
    };
    Graphics._switchStretchMode = function () {
        this._stretchEnabled = !this._stretchEnabled;
        this._updateAllElements();
    };
    Graphics._switchFullScreen = function () {
        if (this._isFullScreen()) {
            this._requestFullScreen();
        }
        else {
            this._cancelFullScreen();
        }
    };
    Graphics._isFullScreen = function () {
        // return ((document.fullScreenElement && document.fullScreenElement !== null) ||
        // 		(!document.mozFullScreen && !document.webkitFullscreenElement &&
        // 		!document.msFullscreenElement));
        return false;
    };
    Graphics._requestFullScreen = function () {
        // var element = document.body;
        // if (element.requestFullScreen) {
        // 	element.requestFullScreen();
        // } else if (element.mozRequestFullScreen) {
        // 	element.mozRequestFullScreen();
        // } else if (element.webkitRequestFullScreen) {
        // 	element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        // } else if (element.msRequestFullscreen) {
        // 	element.msRequestFullscreen();
        // }
    };
    Graphics._cancelFullScreen = function () {
        // if (document.cancelFullScreen) {
        // 	document.cancelFullScreen();
        // } else if (document.mozCancelFullScreen) {
        // 	document.mozCancelFullScreen();
        // } else if (document.webkitCancelFullScreen) {
        // 	document.webkitCancelFullScreen();
        // } else if (document.msExitFullscreen) {
        // 	document.msExitFullscreen();
        // }
    };
    Graphics._cssFontLoading = true; //  document.fonts && document.fonts.ready;
    Graphics._fontLoaded = null;
    Graphics._videoVolume = 1;
    Graphics._loadingCount = 0;
    Graphics.frameCount = 0;
    Graphics.BLEND_NORMAL = 0;
    Graphics.BLEND_ADD = 1;
    Graphics.BLEND_MULTIPLY = 2;
    Graphics.BLEND_SCREEN = 3;
    return Graphics;
}());
exports.Graphics = Graphics;
