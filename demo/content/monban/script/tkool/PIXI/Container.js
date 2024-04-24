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
exports.Container = exports.PixiEntity = void 0;
var Utils_1 = require("../core/Utils");
var ObservablePoint_1 = require("./ObservablePoint");
var PixiEntity = /** @class */ (function (_super) {
    __extends(PixiEntity, _super);
    function PixiEntity(param) {
        var _this = _super.call(this, param) || this;
        _this.container = param.container;
        return _this;
    }
    // override
    PixiEntity.prototype.renderSelf = function (renderer, camera) {
        // if (
        // 	!this.container.hasOwnProperty("openness") ||
        // 	(this.container.hasOwnProperty("openness") && (this.container as any).openness > 0)
        // 	) {
        // 	return this.container.renderSelf(renderer, camera);
        // }
        return this.container.renderSelf(renderer, camera);
    };
    return PixiEntity;
}(g.E));
exports.PixiEntity = PixiEntity;
/**
 * PIXI.Container 相当品
 */
var Container = /** @class */ (function () {
    function Container() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.initialize.apply(this, args);
    }
    Object.defineProperty(Container.prototype, "scene", {
        get: function () {
            return this.pixiEntity.scene;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "x", {
        get: function () {
            return this.pixiEntity.x;
        },
        set: function (value) {
            this.pixiEntity.x = value;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "y", {
        get: function () {
            return this.pixiEntity.y;
        },
        set: function (value) {
            this.pixiEntity.y = value;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "scale", {
        get: function () {
            // `: Point` をつけてもコンパイルが通った。継承関係がなくてもインターフェースが一致しているから？
            return this._scale;
        },
        set: function (value) {
            this._scale.set(value.x, value.y);
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "pivot", {
        get: function () {
            return this._pivot;
        },
        set: function (value) {
            this._pivot.set(value.x, value.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "zIndex", {
        get: function () {
            return this._zIndex;
        },
        set: function (value) {
            this._zIndex = value;
            // TODO: sort
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "alpha", {
        get: function () {
            return this.pixiEntity.opacity;
        },
        set: function (value) {
            this.pixiEntity.opacity = value;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "rotation", {
        get: function () {
            return (this.pixiEntity.angle / 180) * Math.PI;
        },
        set: function (value) {
            this.pixiEntity.angle = (value / Math.PI) * 180;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "opacity", {
        get: function () {
            return this.pixiEntity.opacity * 255;
        },
        set: function (value) {
            value = Utils_1.Utils.clamp(value, 0, 255);
            this.pixiEntity.opacity = value / 255;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "visible", {
        get: function () {
            return this.pixiEntity.visible();
        },
        set: function (value) {
            if (value)
                this.pixiEntity.show();
            else
                this.pixiEntity.hide();
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "width", {
        get: function () {
            // return this.scale.x * this.getLocalBounds().width;
            // TODO: 以下のやり方はおそらく不正確なのでちゃんと
            return this.scale.x * this.pixiEntity.width;
        },
        set: function (value) {
            // const width = this.getLocalBounds().width;
            var width = this.pixiEntity.width;
            if (width !== 0) {
                this.scale.x = value / width;
            }
            else {
                this.scale.x = 1;
            }
            this._width = value;
            this.pixiEntity.width = value;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "height", {
        get: function () {
            // return this.scale.y * this.getLocalBounds().height;
            // TODO: 以下のやり方はおそらく不正確なのでちゃんと
            return this.scale.y * this.pixiEntity.height;
        },
        set: function (value) {
            // const height = this.getLocalBounds().height;
            var height = this.pixiEntity.height;
            if (height !== 0) {
                this.scale.y = value / height;
            }
            else {
                this.scale.y = 1;
            }
            this._height = value;
            this.pixiEntity.height = value;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    Container.prototype.initialize = function () {
        var _this = this;
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        this.pixiEntity = new PixiEntity({
            scene: g.game.scene(),
            container: this
        });
        this.parent = null;
        this.children = [];
        this.alpha = 1.0;
        this.visible = true;
        this._zIndex = 0;
        this.z = 0;
        this._pivot = new ObservablePoint_1.ObservablePoint(function (subject) {
            _this.pixiEntity.x = -1 * subject.x;
            _this.pixiEntity.y = -1 * subject.y;
            _this.modified();
        }, 0, 0);
        this._scale = new ObservablePoint_1.ObservablePoint(function (subject) {
            _this.pixiEntity.scaleX = subject.x;
            _this.pixiEntity.scaleY = subject.y;
            _this.modified();
        }, 1, 1);
    };
    Container.prototype.onChildrenChange = function (_index) {
        // nothing to do.
    };
    Container.prototype.addChild = function (child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.parent = this;
        this.children.push(child);
        this.pixiEntity.append(child.pixiEntity);
        return child;
    };
    Container.prototype.addChildAt = function (child, index) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.parent = this;
        this.children.splice(index, 0, child);
        this._addChildAt(this.pixiEntity, child.pixiEntity, index);
        return child;
    };
    Container.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index === -1)
            return null;
        child.parent = null;
        // removeItems(this.children, index, 1);
        this.children.splice(index, 1);
        if (this.pixiEntity.children.indexOf(child.pixiEntity) >= 0) {
            this.pixiEntity.remove(child.pixiEntity);
        }
        else {
            console.warn("container's child is not entity's child, cancel removing");
        }
        return child;
    };
    Container.prototype.updateTransform = function () {
        if (!this.children) {
            return;
        }
        this.children.forEach(function (c) {
            var child = c;
            if (child.updateTransform) {
                child.updateTransform();
            }
        });
    };
    Container.prototype.update = function () {
        if (!this.children) {
            return;
        }
        this.children.forEach(function (c) {
            var child = c;
            if (child.update) {
                child.update();
            }
        });
    };
    Container.prototype.modified = function () {
        this.pixiEntity.modified();
    };
    Container.prototype.renderSelf = function (_renderer, _camera) {
        return true;
    };
    Container.prototype._addChildAt = function (self, child, index) {
        var target = index < self.children.length ? self.children[index] : null;
        if (target) {
            self.insertBefore(child, target);
        }
        else {
            self.append(child);
        }
        return self;
    };
    return Container;
}());
exports.Container = Container;
