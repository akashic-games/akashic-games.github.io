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
exports.Window_SavefileList = void 0;
var DataManager_1 = require("../managers/DataManager");
var TextManager_1 = require("../managers/TextManager");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_SavefileList = /** @class */ (function (_super) {
    __extends(Window_SavefileList, _super);
    function Window_SavefileList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window_SavefileList.prototype.initialize = function (x, y, width, height) {
        WindowSelectable_1.Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.activate();
        this._mode = null;
    };
    Window_SavefileList.prototype.setMode = function (mode) {
        this._mode = mode;
    };
    Window_SavefileList.prototype.maxItems = function () {
        return DataManager_1.DataManager.maxSavefiles();
    };
    Window_SavefileList.prototype.maxVisibleItems = function () {
        return 5;
    };
    Window_SavefileList.prototype.itemHeight = function () {
        var innerHeight = this.height - this.padding * 2;
        return Math.floor(innerHeight / this.maxVisibleItems());
    };
    Window_SavefileList.prototype.drawItem = function (index) {
        var id = index + 1;
        var valid = DataManager_1.DataManager.isThisGameFile(id);
        var info = DataManager_1.DataManager.loadSavefileInfo(id);
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        if (this._mode === "load") {
            this.changePaintOpacity(valid);
        }
        this.drawFileId(id, rect.x, rect.y);
        if (info) {
            this.changePaintOpacity(valid);
            this.drawContents(info, rect, valid);
            this.changePaintOpacity(true);
        }
    };
    Window_SavefileList.prototype.drawFileId = function (id, x, y) {
        this.drawText(TextManager_1.TextManager.file + " " + id, x, y, 180);
    };
    Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
        var bottom = rect.y + rect.height;
        if (rect.width >= 420) {
            this.drawGameTitle(info, rect.x + 192, rect.y, rect.width - 192);
            if (valid) {
                this.drawPartyCharacters(info, rect.x + 220, bottom - 4);
            }
        }
        var lineHeight = this.lineHeight();
        var y2 = bottom - lineHeight;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };
    Window_SavefileList.prototype.drawGameTitle = function (info, x, y, width) {
        if (info.title) {
            this.drawText(info.title, x, y, width);
        }
    };
    Window_SavefileList.prototype.drawPartyCharacters = function (info, x, y) {
        if (info.characters) {
            for (var i = 0; i < info.characters.length; i++) {
                var data = info.characters[i];
                this.drawCharacter(data[0], data[1], x + i * 48, y);
            }
        }
    };
    Window_SavefileList.prototype.drawPlaytime = function (info, x, y, width) {
        if (info.playtime) {
            this.drawText(info.playtime, x, y, width, "right");
        }
    };
    Window_SavefileList.prototype.playOkSound = function () {
        //
    };
    return Window_SavefileList;
}(WindowSelectable_1.Window_Selectable));
exports.Window_SavefileList = Window_SavefileList;
