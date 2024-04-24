"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var Input = /** @class */ (function () {
    function Input() {
    }
    Object.defineProperty(Input, "dir4", {
        get: function () {
            return Input._dir4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "dir8", {
        get: function () {
            return Input._dir8;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "date", {
        get: function () {
            return Input._date;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initializes the input system.
     *
     * @static
     * @method initialize
     */
    Input.initialize = function () {
        Input.clear();
        Input._wrapNwjsAlert();
        Input._setupEventHandlers();
    };
    /**
     * Clears all the input data.
     *
     * @static
     * @method clear
     */
    Input.clear = function () {
        Input._currentState = {};
        Input._previousState = {};
        Input._gamepadStates = [];
        Input._latestButton = null;
        Input._pressedTime = 0;
        Input._dir4 = 0;
        Input._dir8 = 0;
        Input._preferredAxis = "";
        Input._date = 0;
    };
    /**
     * Updates the input data.
     *
     * @static
     * @method update
     */
    Input.update = function () {
        Input._pollGamepads();
        if (Input._currentState[Input._latestButton]) {
            Input._pressedTime++;
        }
        else {
            Input._latestButton = null;
        }
        for (var _i = 0, _a = Input._currentState; _i < _a.length; _i++) {
            var name = _a[_i];
            if (Input._currentState[name] && !Input._previousState[name]) {
                Input._latestButton = name;
                Input._pressedTime = 0;
                Input._date = Date.now();
            }
            Input._previousState[name] = Input._currentState[name];
        }
        Input._updateDirection();
    };
    /**
     * Checks whether a key is currently pressed down.
     *
     * @static
     * @method isPressed
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is pressed
     */
    Input.isPressed = function (keyName) {
        if (Input._isEscapeCompatible(keyName) && Input.isPressed("escape")) {
            return true;
        }
        else {
            return !!Input._currentState[keyName];
        }
    };
    /**
     * Checks whether a key is just pressed.
     *
     * @static
     * @method isTriggered
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is triggered
     */
    Input.isTriggered = function (keyName) {
        if (Input._isEscapeCompatible(keyName) && Input.isTriggered("escape")) {
            return true;
        }
        else {
            return Input._latestButton === keyName && Input._pressedTime === 0;
        }
    };
    /**
     * Checks whether a key is just pressed or a key repeat occurred.
     *
     * @static
     * @method isRepeated
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is repeated
     */
    Input.isRepeated = function (keyName) {
        if (Input._isEscapeCompatible(keyName) && Input.isRepeated("escape")) {
            return true;
        }
        else {
            return (Input._latestButton === keyName &&
                (Input._pressedTime === 0 ||
                    (Input._pressedTime >= Input.keyRepeatWait && Input._pressedTime % Input.keyRepeatInterval === 0)));
        }
    };
    /**
     * Checks whether a key is kept depressed.
     *
     * @static
     * @method isLongPressed
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is long-pressed
     */
    Input.isLongPressed = function (keyName) {
        if (Input._isEscapeCompatible(keyName) && Input.isLongPressed("escape")) {
            return true;
        }
        else {
            return Input._latestButton === keyName && Input._pressedTime >= Input.keyRepeatWait;
        }
    };
    /**
     * @static
     * @method _wrapNwjsAlert
     * @private
     */
    Input._wrapNwjsAlert = function () {
        // if (Utils.isNwjs()) {
        //     var _alert = window.alert;
        //     window.alert = function() {
        //         var gui = require("nw.gui");
        //         var win = gui.Window.get();
        //         _alert.apply(this, arguments);
        //         win.focus();
        //         Input.clear();
        //     };
        // }
    };
    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    Input._setupEventHandlers = function () {
        // document.addEventListener("keydown", Input._onKeyDown.bind(this));
        // document.addEventListener("keyup", Input._onKeyUp.bind(this));
        // window.addEventListener("blur", Input._onLostFocus.bind(this));
    };
    /**
     * @static
     * @method _onKeyDown
     * @param {KeyboardEvent} event
     * @private
     */
    Input._onKeyDown = function (_event) {
        // if (Input._shouldPreventDefault(event.keyCode)) {
        //     event.preventDefault();
        // }
        // if (event.keyCode === 144) {    // Numlock
        //     Input.clear();
        // }
        // var buttonName = Input.keyMapper[event.keyCode];
        // if (ResourceHandler.exists() && buttonName === "ok") {
        //     ResourceHandler.retry();
        // } else if (buttonName) {
        //     Input._currentState[buttonName] = true;
        // }
    };
    /**
     * @static
     * @method _shouldPreventDefault
     * @param {Number} keyCode
     * @private
     */
    Input._shouldPreventDefault = function (keyCode) {
        switch (keyCode) {
            case 8: // backspace
            case 33: // pageup
            case 34: // pagedown
            case 37: // left arrow
            case 38: // up arrow
            case 39: // right arrow
            case 40: // down arrow
                return true;
        }
        return false;
    };
    /**
     * @static
     * @method _onKeyUp
     * @param {KeyboardEvent} event
     * @private
     */
    Input._onKeyUp = function (event) {
        var buttonName = Input.keyMapper[event.keyCode];
        if (buttonName) {
            Input._currentState[buttonName] = false;
        }
        if (event.keyCode === 0) {
            // For QtWebEngine on OS X
            Input.clear();
        }
    };
    /**
     * @static
     * @method _onLostFocus
     * @private
     */
    Input._onLostFocus = function () {
        Input.clear();
    };
    /**
     * @static
     * @method _pollGamepads
     * @private
     */
    Input._pollGamepads = function () {
        // if (navigator.getGamepads) {
        //     var gamepads = navigator.getGamepads();
        //     if (gamepads) {
        //         for (var i = 0; i < gamepads.length; i++) {
        //             var gamepad = gamepads[i];
        //             if (gamepad && gamepad.connected) {
        //                 Input._updateGamepadState(gamepad);
        //             }
        //         }
        //     }
        // }
    };
    /**
     * @static
     * @method _updateGamepadState
     * @param {Gamepad} gamepad
     * @param {Number} index
     * @private
     */
    Input._updateGamepadState = function (gamepad) {
        var lastState = Input._gamepadStates[gamepad.index] || [];
        var newState = [];
        var buttons = gamepad.buttons;
        var axes = gamepad.axes;
        var threshold = 0.5;
        newState[12] = false;
        newState[13] = false;
        newState[14] = false;
        newState[15] = false;
        for (var i = 0; i < buttons.length; i++) {
            newState[i] = buttons[i].pressed;
        }
        if (axes[1] < -threshold) {
            newState[12] = true; // up
        }
        else if (axes[1] > threshold) {
            newState[13] = true; // down
        }
        if (axes[0] < -threshold) {
            newState[14] = true; // left
        }
        else if (axes[0] > threshold) {
            newState[15] = true; // right
        }
        for (var j = 0; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                var buttonName = Input.gamepadMapper[j];
                if (buttonName) {
                    Input._currentState[buttonName] = newState[j];
                }
            }
        }
        Input._gamepadStates[gamepad.index] = newState;
    };
    /**
     * @static
     * @method _updateDirection
     * @private
     */
    Input._updateDirection = function () {
        var x = Input._signX();
        var y = Input._signY();
        Input._dir8 = Input._makeNumpadDirection(x, y);
        if (x !== 0 && y !== 0) {
            if (Input._preferredAxis === "x") {
                y = 0;
            }
            else {
                x = 0;
            }
        }
        else if (x !== 0) {
            Input._preferredAxis = "y";
        }
        else if (y !== 0) {
            Input._preferredAxis = "x";
        }
        Input._dir4 = Input._makeNumpadDirection(x, y);
    };
    /**
     * @static
     * @method _signX
     * @private
     */
    Input._signX = function () {
        var x = 0;
        if (Input.isPressed("left")) {
            x--;
        }
        if (Input.isPressed("right")) {
            x++;
        }
        return x;
    };
    /**
     * @static
     * @method _signY
     * @private
     */
    Input._signY = function () {
        var y = 0;
        if (Input.isPressed("up")) {
            y--;
        }
        if (Input.isPressed("down")) {
            y++;
        }
        return y;
    };
    /**
     * @static
     * @method _makeNumpadDirection
     * @param {Number} x
     * @param {Number} y
     * @return {Number}
     * @private
     */
    Input._makeNumpadDirection = function (x, y) {
        if (x !== 0 || y !== 0) {
            return 5 - y * 3 + x;
        }
        return 0;
    };
    /**
     * @static
     * @method _isEscapeCompatible
     * @param {String} keyName
     * @return {Boolean}
     * @private
     */
    Input._isEscapeCompatible = function (keyName) {
        return keyName === "cancel" || keyName === "menu";
    };
    /**
     * The wait time of the key repeat in frames.
     *
     * @static
     * @property keyRepeatWait
     * @type Number
     */
    Input.keyRepeatWait = 24;
    /**
     * The interval of the key repeat in frames.
     *
     * @static
     * @property keyRepeatInterval
     * @type Number
     */
    Input.keyRepeatInterval = 6;
    /**
     * A hash table to convert from a virtual key code to a mapped key name.
     *
     * @static
     * @property keyMapper
     * @type Object
     */
    Input.keyMapper = {
        9: "tab",
        13: "ok",
        16: "shift",
        17: "control",
        18: "control",
        27: "escape",
        32: "ok",
        33: "pageup",
        34: "pagedown",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "escape",
        81: "pageup",
        87: "pagedown",
        88: "escape",
        90: "ok",
        96: "escape",
        98: "down",
        100: "left",
        102: "right",
        104: "up",
        120: "debug" // F9
    };
    /**
     * A hash table to convert from a gamepad button to a mapped key name.
     *
     * @static
     * @property gamepadMapper
     * @type Object
     */
    Input.gamepadMapper = {
        0: "ok",
        1: "cancel",
        2: "shift",
        3: "menu",
        4: "pageup",
        5: "pagedown",
        12: "up",
        13: "down",
        14: "left",
        15: "right" // D-pad right
    };
    Input._currentState = {};
    Input._previousState = {};
    Input._gamepadStates = [];
    Input._latestButton = null;
    Input._pressedTime = 0;
    Input._dir4 = 0;
    Input._dir8 = 0;
    Input._preferredAxis = "";
    Input._date = 0;
    return Input;
}());
exports.Input = Input;
