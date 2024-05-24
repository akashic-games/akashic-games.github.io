"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchInput = void 0;
var Graphics_1 = require("./Graphics");
var TouchInput = /** @class */ (function () {
    function TouchInput() {
    }
    TouchInput.initialize = function () {
        this.clear();
        this._setupEventHandlers();
    };
    TouchInput.clear = function () {
        this._mousePressed = false;
        this._screenPressed = false;
        this._pressedTime = 0;
        this._events = {
            triggered: false,
            cancelled: false,
            moved: false,
            released: false,
            wheelX: 0,
            wheelY: 0
        };
        this._triggered = false;
        this._cancelled = false;
        this._moved = false;
        this._released = false;
        this._wheelX = 0;
        this._wheelY = 0;
        this._x = 0;
        this._y = 0;
        this._date = 0;
    };
    TouchInput.update = function () {
        this._triggered = this._events.triggered;
        this._cancelled = this._events.cancelled;
        this._moved = this._events.moved;
        this._released = this._events.released;
        this._wheelX = this._events.wheelX;
        this._wheelY = this._events.wheelY;
        this._events.triggered = false;
        this._events.cancelled = false;
        this._events.moved = false;
        this._events.released = false;
        this._events.wheelX = 0;
        this._events.wheelY = 0;
        if (this.isPressed()) {
            this._pressedTime++;
        }
    };
    TouchInput.isPressed = function () {
        return this._mousePressed || this._screenPressed;
    };
    TouchInput.isTriggered = function () {
        return this._triggered;
    };
    TouchInput.isRepeated = function () {
        return (this.isPressed() &&
            (this._triggered || (this._pressedTime >= this.keyRepeatWait && this._pressedTime % this.keyRepeatInterval === 0)));
    };
    TouchInput.isLongPressed = function () {
        return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
    };
    TouchInput.isCancelled = function () {
        return this._cancelled;
    };
    TouchInput.isMoved = function () {
        return this._moved;
    };
    TouchInput.isReleased = function () {
        return this._released;
    };
    Object.defineProperty(TouchInput, "wheelX", {
        get: function () {
            return this._wheelX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchInput, "wheelY", {
        get: function () {
            return this._wheelY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchInput, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchInput, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TouchInput, "date", {
        get: function () {
            return this._date;
        },
        enumerable: false,
        configurable: true
    });
    TouchInput._setupEventHandlers = function (scene) {
        var _this = this;
        if (!scene) {
            return;
        }
        // var isSupportPassive = Utils.isSupportPassiveEvent();
        // document.addEventListener('mousedown', this._onMouseDown.bind(this));
        // document.addEventListener('mousemove', this._onMouseMove.bind(this));
        // document.addEventListener('mouseup', this._onMouseUp.bind(this));
        // document.addEventListener('wheel', this._onWheel.bind(this));
        // document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? { passive: false } : false);
        // document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? { passive: false } : false);
        // document.addEventListener('touchend', this._onTouchEnd.bind(this));
        // document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
        // document.addEventListener('pointerdown', this._onPointerDown.bind(this));
        scene.onPointDownCapture.add(function (e) {
            // 右クリックの場合、キャンセル動作
            if (e.button === 2) {
                _this._onRightButtonDown(e);
            }
            else {
                _this._onTouchStart(e);
            }
        });
        scene.onPointMoveCapture.add(function (e) {
            // 右は押された時点でキャンセル処理したいので、ここでは何もしない
            if (e.button === 2) {
                return;
            }
            _this._onTouchMove(e);
        });
        scene.onPointUpCapture.add(function (e) {
            // 右は押された時点でキャンセル処理したいので、ここでは何もしない
            if (e.button === 2) {
                return;
            }
            _this._onTouchEnd(e);
        });
    };
    TouchInput._onMouseDown = function (event) {
        if (event.button === 0) {
            this._onLeftButtonDown(event);
        }
        else if (event.button === 1) {
            this._onMiddleButtonDown(event);
        }
        else if (event.button === 2) {
            this._onRightButtonDown(event);
        }
    };
    TouchInput._onLeftButtonDown = function (event) {
        var x = Graphics_1.Graphics.pageToCanvasX(event.pageX);
        var y = Graphics_1.Graphics.pageToCanvasY(event.pageY);
        this._mousePressed = true;
        this._pressedTime = 0;
        this._onTrigger(x, y);
    };
    TouchInput._onMiddleButtonDown = function (_event) {
        //
    };
    TouchInput._onRightButtonDown = function (event) {
        var x = Graphics_1.Graphics.pageToCanvasX(event.pageX);
        var y = Graphics_1.Graphics.pageToCanvasY(event.pageY);
        this._onCancel(x, y);
    };
    TouchInput._onMouseMove = function (event) {
        if (this._mousePressed) {
            var x = Graphics_1.Graphics.pageToCanvasX(event.pageX);
            var y = Graphics_1.Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);
        }
    };
    TouchInput._onMouseUp = function (event) {
        if (event.button === 0) {
            var x = Graphics_1.Graphics.pageToCanvasX(event.pageX);
            var y = Graphics_1.Graphics.pageToCanvasY(event.pageY);
            this._mousePressed = false;
            this._onRelease(x, y);
        }
    };
    TouchInput._onWheel = function (event) {
        this._events.wheelX += event.deltaX;
        this._events.wheelY += event.deltaY;
        event.preventDefault();
    };
    TouchInput._onTouchStart = function (event) {
        var point = event.point;
        this._currentTouchedPointers[event.pointerId] = point;
        var x = point.x;
        var y = point.y;
        this._screenPressed = true;
        this._pressedTime = 0;
        if (Object.keys(this._currentTouchedPointers).length >= 2) {
            this._onCancel(x, y);
        }
        else {
            this._onTrigger(x, y);
        }
    };
    TouchInput._onTouchMove = function (event) {
        var point = event.point;
        this._currentTouchedPointers[event.pointerId] = point;
        this._onMove(point.x, point.y);
    };
    TouchInput._onTouchEnd = function (event) {
        this._screenPressed = false;
        this._onRelease(event.point.x, event.point.y);
        delete this._currentTouchedPointers[event.pointerId];
    };
    TouchInput._onTouchCancel = function (_event) {
        this._screenPressed = false;
    };
    TouchInput._onPointerDown = function (event) {
        if (event.pointerType === "touch" && !event.isPrimary) {
            var x = Graphics_1.Graphics.pageToCanvasX(event.pageX);
            var y = Graphics_1.Graphics.pageToCanvasY(event.pageY);
            // For Microsoft Edge
            this._onCancel(x, y);
            event.preventDefault();
        }
    };
    TouchInput._onTrigger = function (x, y) {
        this._events.triggered = true;
        this._x = x;
        this._y = y;
        this._date = Date.now();
    };
    TouchInput._onCancel = function (x, y) {
        this._events.cancelled = true;
        this._x = x;
        this._y = y;
    };
    TouchInput._onMove = function (x, y) {
        this._events.moved = true;
        this._x = x;
        this._y = y;
    };
    TouchInput._onRelease = function (x, y) {
        this._events.released = true;
        this._x = x;
        this._y = y;
    };
    TouchInput.keyRepeatWait = 24;
    TouchInput.keyRepeatInterval = 6;
    TouchInput._currentTouchedPointers = Object.create(null);
    return TouchInput;
}());
exports.TouchInput = TouchInput;
