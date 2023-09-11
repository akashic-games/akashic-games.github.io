"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window_Message = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowBase_1 = require("./WindowBase");
var WindowChoiceList_1 = require("./WindowChoiceList");
var WindowEventItem_1 = require("./WindowEventItem");
var WindowGold_1 = require("./WindowGold");
var WindowNumberInput_1 = require("./WindowNumberInput");
var Window_Message = /** @class */ (function (_super) {
    __extends(Window_Message, _super);
    function Window_Message(scene) {
        return _super.call(this, scene) || this;
        // if (Object.getPrototypeOf(this) === Window_Message.prototype) {
        // 	this.initialize();
        // }
    }
    Window_Message.prototype.initialize = function () {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = (core_1.Graphics.boxWidth - width) / 2;
        _super.prototype.initialize.call(this, x, 0, width, height);
        this.openness = 0;
        this.initMembers();
        this.createSubWindows();
        this.updatePlacement();
    };
    Window_Message.prototype.initMembers = function () {
        this._imageReservationId = core_1.Utils.generateRuntimeId();
        this._background = 0;
        this._positionType = 2;
        this._waitCount = 0;
        this._faceBitmap = null;
        this._textState = null;
        this.clearFlags();
    };
    Window_Message.prototype.subWindows = function () {
        return [this._goldWindow, this._choiceWindow, this._numberWindow, this._itemWindow];
    };
    Window_Message.prototype.createSubWindows = function () {
        this._goldWindow = new WindowGold_1.Window_Gold(this.scene, 0, 0);
        this._goldWindow.x = core_1.Graphics.boxWidth - this._goldWindow.width;
        this._goldWindow.openness = 0;
        this._choiceWindow = new WindowChoiceList_1.Window_ChoiceList(this.scene, this);
        this._numberWindow = new WindowNumberInput_1.Window_NumberInput(this.scene, this);
        this._itemWindow = new WindowEventItem_1.Window_EventItem(this.scene, this);
    };
    Window_Message.prototype.windowWidth = function () {
        return core_1.Graphics.boxWidth;
    };
    Window_Message.prototype.windowHeight = function () {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_Message.prototype.clearFlags = function () {
        this._showFast = false;
        this._lineShowFast = false;
        this._pauseSkip = false;
    };
    Window_Message.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_Message.prototype.update = function () {
        this.checkToNotClose();
        _super.prototype.update.call(this);
        while (!this.isOpening() && !this.isClosing()) {
            if (this.updateWait()) {
                return;
            }
            else if (this.updateLoading()) {
                return;
            }
            else if (this.updateInput()) {
                return;
            }
            else if (this.updateMessage()) {
                return;
            }
            else if (this.canStart()) {
                this.startMessage();
            }
            else {
                this.startInput();
                return;
            }
        }
    };
    Window_Message.prototype.checkToNotClose = function () {
        if (this.isClosing() && this.isOpen()) {
            if (this.doesContinue()) {
                this.open();
            }
        }
    };
    Window_Message.prototype.canStart = function () {
        return DataManager_1.$gameMessage.hasText() && !DataManager_1.$gameMessage.scrollMode();
    };
    Window_Message.prototype.startMessage = function () {
        this._textState = {};
        this._textState.index = 0;
        this._textState.text = this.convertEscapeCharacters(DataManager_1.$gameMessage.allText());
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.open();
    };
    Window_Message.prototype.updatePlacement = function () {
        this._positionType = DataManager_1.$gameMessage.positionType();
        this.y = (this._positionType * (core_1.Graphics.boxHeight - this.height)) / 2;
        this._goldWindow.y = this.y > 0 ? 0 : core_1.Graphics.boxHeight - this._goldWindow.height;
    };
    Window_Message.prototype.updateBackground = function () {
        this._background = DataManager_1.$gameMessage.background();
        this.setBackgroundType(this._background);
    };
    Window_Message.prototype.terminateMessage = function () {
        this.close();
        this._goldWindow.close();
        DataManager_1.$gameMessage.clear();
    };
    Window_Message.prototype.updateWait = function () {
        if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        }
        else {
            return false;
        }
    };
    Window_Message.prototype.updateLoading = function () {
        if (this._faceBitmap) {
            if (this._faceBitmap.isReady()) {
                this.drawMessageFace();
                this._faceBitmap = null;
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    Window_Message.prototype.updateInput = function () {
        if (this.isAnySubWindowActive()) {
            return true;
        }
        if (this.pause) {
            if (this.isTriggered()) {
                // Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }
            }
            return true;
        }
        return false;
    };
    Window_Message.prototype.isAnySubWindowActive = function () {
        return this._choiceWindow.active || this._numberWindow.active || this._itemWindow.active;
    };
    Window_Message.prototype.updateMessage = function () {
        if (this._textState) {
            while (!this.isEndOfText(this._textState)) {
                if (this.needsNewPage(this._textState)) {
                    this.newPage(this._textState);
                }
                this.updateShowFast();
                this.processCharacter(this._textState);
                if (!this._showFast && !this._lineShowFast) {
                    break;
                }
                if (this.pause || this._waitCount > 0) {
                    break;
                }
            }
            if (this.isEndOfText(this._textState)) {
                this.onEndOfText();
            }
            return true;
        }
        else {
            return false;
        }
    };
    Window_Message.prototype.onEndOfText = function () {
        if (!this.startInput()) {
            if (!this._pauseSkip) {
                this.startPause();
            }
            else {
                this.terminateMessage();
            }
        }
        this._textState = null;
    };
    Window_Message.prototype.startInput = function () {
        if (DataManager_1.$gameMessage.isChoice()) {
            this._choiceWindow.start();
            return true;
        }
        else if (DataManager_1.$gameMessage.isNumberInput()) {
            this._numberWindow.start();
            return true;
        }
        else if (DataManager_1.$gameMessage.isItemChoice()) {
            this._itemWindow.start();
            return true;
        }
        else {
            return false;
        }
    };
    Window_Message.prototype.isTriggered = function () {
        return (
        /* Input.isRepeated("ok") || Input.isRepeated("cancel") ||*/
        core_1.TouchInput.isRepeated());
    };
    Window_Message.prototype.doesContinue = function () {
        return DataManager_1.$gameMessage.hasText() && !DataManager_1.$gameMessage.scrollMode() && !this.areSettingsChanged();
    };
    Window_Message.prototype.areSettingsChanged = function () {
        return this._background !== DataManager_1.$gameMessage.background() || this._positionType !== DataManager_1.$gameMessage.positionType();
    };
    Window_Message.prototype.updateShowFast = function () {
        if (this.isTriggered()) {
            this._showFast = true;
        }
    };
    Window_Message.prototype.newPage = function (textState) {
        this.contents.clear();
        this.resetFontSettings();
        this.clearFlags();
        this.loadMessageFace();
        textState.x = this.newLineX();
        textState.y = 0;
        textState.left = this.newLineX();
        textState.height = this.calcTextHeight(textState, false);
    };
    Window_Message.prototype.loadMessageFace = function () {
        this._faceBitmap = managers_1.ImageManager.reserveFace(DataManager_1.$gameMessage.faceName(), 0, this._imageReservationId);
    };
    Window_Message.prototype.drawMessageFace = function () {
        this.drawFace(DataManager_1.$gameMessage.faceName(), DataManager_1.$gameMessage.faceIndex(), 0, 0);
        managers_1.ImageManager.releaseReservation(this._imageReservationId);
    };
    Window_Message.prototype.newLineX = function () {
        return DataManager_1.$gameMessage.faceName() === "" ? 0 : 168;
    };
    Window_Message.prototype.processNewLine = function (textState) {
        this._lineShowFast = false;
        WindowBase_1.Window_Base.prototype.processNewLine.call(this, textState);
        if (this.needsNewPage(textState)) {
            this.startPause();
        }
    };
    Window_Message.prototype.processNewPage = function (textState) {
        WindowBase_1.Window_Base.prototype.processNewPage.call(this, textState);
        if (textState.text[textState.index] === "\n") {
            textState.index++;
        }
        textState.y = this.contents.height;
        this.startPause();
    };
    Window_Message.prototype.isEndOfText = function (textState) {
        return textState.index >= textState.text.length;
    };
    Window_Message.prototype.needsNewPage = function (textState) {
        return !this.isEndOfText(textState) && textState.y + textState.height > this.contents.height;
    };
    Window_Message.prototype.processEscapeCharacter = function (code, textState) {
        switch (code) {
            case "$":
                this._goldWindow.open();
                break;
            case ".":
                this.startWait(15);
                break;
            case "|":
                this.startWait(60);
                break;
            case "!":
                this.startPause();
                break;
            case ">":
                this._lineShowFast = true;
                break;
            case "<":
                this._lineShowFast = false;
                break;
            case "^":
                this._pauseSkip = true;
                break;
            default:
                WindowBase_1.Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
                break;
        }
    };
    Window_Message.prototype.startWait = function (count) {
        this._waitCount = count;
    };
    Window_Message.prototype.startPause = function () {
        this.startWait(10);
        this.pause = true;
    };
    return Window_Message;
}(WindowBase_1.Window_Base));
exports.Window_Message = Window_Message;
