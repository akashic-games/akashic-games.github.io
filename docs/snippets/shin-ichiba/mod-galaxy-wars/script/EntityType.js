Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityType = void 0;
//
// Entity識別子定義
//
var EntityType;
(function (EntityType) {
    EntityType[EntityType["PLAYER"] = 0] = "PLAYER";
    EntityType[EntityType["ENEMY"] = 1] = "ENEMY";
    EntityType[EntityType["PLAYER_BULLET"] = 2] = "PLAYER_BULLET";
    EntityType[EntityType["ENEMY_BULLET"] = 3] = "ENEMY_BULLET";
    EntityType[EntityType["EFFECT"] = 4] = "EFFECT";
    EntityType[EntityType["ITEM"] = 5] = "ITEM";
    EntityType[EntityType["OBSTACLE"] = 6] = "OBSTACLE";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
