/*
v2.1.3
*/

declare module '@akashic/trigger' {
    export * from "@akashic/trigger/TriggerLike.js";
    export * from "@akashic/trigger/ChainTriggerLike.js";
    export * from "@akashic/trigger/Trigger.js";
    export * from "@akashic/trigger/ChainTrigger.js";
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
const isPromise_js_1 = require("./isPromise.js");
/**
    * イベント通知機構クラス。
    */
class Trigger {
        constructor() {
                this._handlers = [];
                this.length = 0;
        }
        add(paramsOrFunc, owner) {
                if (typeof paramsOrFunc === "function") {
                        this._addHandler({
                                func: paramsOrFunc,
                                owner,
                                once: false,
                                name: undefined,
                                filter: undefined,
                        });
                }
                else {
                        const params = paramsOrFunc;
                        const index = typeof params.index === "number" ? params.index : undefined;
                        this._addHandler({
                                func: params.func,
                                owner: params.owner,
                                once: false,
                                name: params.name,
                                filter: params.filter,
                        }, index);
                }
                this.length = this._handlers.length;
        }
        addOnce(paramsOrFunc, owner) {
                if (typeof paramsOrFunc === "function") {
                        this._addHandler({
                                func: paramsOrFunc,
                                owner,
                                once: true,
                                name: undefined,
                                filter: undefined,
                        });
                }
                else {
                        const params = paramsOrFunc;
                        const index = typeof params.index === "number" ? params.index : undefined;
                        this._addHandler({
                                func: params.func,
                                owner: params.owner,
                                once: true,
                                name: params.name,
                                filter: params.filter
                        }, index);
                }
                this.length = this._handlers.length;
        }
        /**
            * このTriggerにハンドラを追加する。
            * @deprecated 互換性のために残されている。代わりに `add()` を利用すべきである。
            */
        handle(owner, func, name) {
                this.add(func ? { owner, func, name } : { func: owner });
        }
        /**
            * このTriggerを発火する。
            *
            * 登録された全ハンドラの関数を、引数 `arg` を与えて呼び出す。
            * 呼び出し後、次のいずれかの条件を満たす全ハンドラの登録は解除される。
            * * ハンドラが `addOnce()` で登録されていた場合
            * * ハンドラが `add()` で登録される際に `once: true` オプションが与えられていた場合
            * * ハンドラが Promise 以外の truthy な値を返した場合
            *
            * @param arg ハンドラに与えられる引数
            */
        fire(arg) {
                if (!this._handlers || !this._handlers.length)
                        return;
                const handlers = this._handlers.concat();
                for (let i = 0; i < handlers.length; i++) {
                        const handler = handlers[i];
                        if (handler.filter && !handler.filter(handler))
                                continue;
                        const ret = handler.func.call(handler.owner, arg);
                        const returnedTruthy = !(0, isPromise_js_1.isPromise)(ret) && !!ret;
                        if (returnedTruthy || handler.once) {
                                if (!this._handlers)
                                        continue;
                                const index = this._handlers.indexOf(handler);
                                if (index !== -1)
                                        this._handlers.splice(index, 1);
                        }
                }
                if (this._handlers != null)
                        this.length = this._handlers.length;
        }
        contains(paramsOrFunc, owner) {
                const condition = typeof paramsOrFunc === "function" ? { func: paramsOrFunc, owner } : paramsOrFunc;
                for (let i = 0; i < this._handlers.length; i++) {
                        if (this._comparePartial(condition, this._handlers[i])) {
                                return true;
                        }
                }
                return false;
        }
        remove(paramsOrFunc, owner) {
                const condition = typeof paramsOrFunc === "function" ? { func: paramsOrFunc, owner } : paramsOrFunc;
                for (let i = 0; i < this._handlers.length; i++) {
                        const handler = this._handlers[i];
                        if (condition.func === handler.func &&
                                condition.owner === handler.owner &&
                                condition.name === handler.name &&
                                condition.filter === handler.filter) {
                                this._handlers.splice(i, 1);
                                --this.length;
                                return;
                        }
                }
        }
        /**
            * 指定した条件に部分一致するイベントハンドラを削除する。
            *
            * 本メソッドは引数に与えた条件に一致したイベントハンドラを全て削除する。
            * 引数の条件を一部省略した場合、その値の内容が登録時と異なっていても対象のイベントハンドラは削除される。
            * 引数に与えた条件と完全に一致したイベントハンドラのみを削除したい場合は `this.remove()` を用いる。
            * 引数を省略した場合は全てのイベントハンドラを削除する。
            *
            * @param params 削除するイベントハンドラの条件
            */
        removeAll(params) {
                const handlers = [];
                if (params) {
                        for (let i = 0; i < this._handlers.length; i++) {
                                const handler = this._handlers[i];
                                if (!this._comparePartial(params, handler)) {
                                        handlers.push(handler);
                                }
                        }
                }
                this._handlers = handlers;
                this.length = this._handlers.length;
        }
        /**
            * このTriggerを破棄する。
            */
        destroy() {
                this._handlers = null;
                this.length = null;
        }
        /**
            * このTriggerが破棄されているかを返す。
            */
        destroyed() {
                return this._handlers === null;
        }
        /**
            * @private
            */
        _addHandler(params, index) {
                if (index == null) {
                        this._handlers.push({
                                func: params.func,
                                owner: params.owner,
                                once: params.once,
                                name: params.name,
                                filter: params.filter,
                        });
                }
                else {
                        this._handlers.splice(index, 0, {
                                func: params.func,
                                owner: params.owner,
                                once: params.once,
                                name: params.name,
                                filter: params.filter,
                        });
                }
        }
        /**
            * @private
            */
        _comparePartial(target, compare) {
                if (target.func !== undefined && target.func !== compare.func)
                        return false;
                if (target.owner !== undefined && target.owner !== compare.owner)
                        return false;
                if (target.name !== undefined && target.name !== compare.name)
                        return false;
                if (target.filter !== undefined && target.filter !== compare.filter)
                        return false;
                return true;
        }
}
exports.Trigger = Trigger;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainTrigger = void 0;
const Trigger_js_1 = require("./Trigger.js");
/**
    * 他のTriggerLikeに反応して発火するイベント通知機構。
    */
class ChainTrigger extends Trigger_js_1.Trigger {
        /**
            * `ChainTrigger` のインスタンスを生成する。
            *
            * このインスタンスは、 `chain` がfireされたときに `filter` を実行し、真を返した場合に自身をfireする。
            * @param chain このインスタンスがfireするきっかけとなる TriggerLike
            * @param filter `chain` がfireされたときに実行される関数。省略された場合、または本関数の戻り値が真の場合、このインスタンスをfireする。
            * @param filterOwner `filter` 呼び出し時に使われる `this` の値。
            */
        constructor(chain, filter, filterOwner) {
                super();
                this.chain = chain;
                this.filter = filter != null ? filter : null;
                this.filterOwner = filterOwner;
                this._isActivated = false;
        }
        add(paramsOrHandler, owner) {
                super.add(paramsOrHandler, owner);
                if (!this._isActivated) {
                        this.chain.add(this._onChainTriggerFired, this);
                        this._isActivated = true;
                }
        }
        addOnce(paramsOrHandler, owner) {
                super.addOnce(paramsOrHandler, owner);
                if (!this._isActivated) {
                        this.chain.add(this._onChainTriggerFired, this);
                        this._isActivated = true;
                }
        }
        remove(paramsOrFunc, owner) {
                super.remove(paramsOrFunc, owner);
                if (this.length === 0 && this._isActivated) {
                        this.chain.remove(this._onChainTriggerFired, this);
                        this._isActivated = false;
                }
        }
        removeAll(params) {
                super.removeAll(params);
                if (this.length === 0 && this._isActivated) {
                        this.chain.remove(this._onChainTriggerFired, this);
                        this._isActivated = false;
                }
        }
        destroy() {
                super.destroy();
                this.chain.remove(this._onChainTriggerFired, this);
                this.filter = null;
                this.filterOwner = null;
                this._isActivated = false;
        }
        /**
            * @private
            */
        _onChainTriggerFired(args) {
                if (!this.filter || this.filter.call(this.filterOwner, args)) {
                        this.fire(args);
                }
        }
}
exports.ChainTrigger = ChainTrigger;

