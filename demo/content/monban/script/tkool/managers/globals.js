"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set$gameActorsFactory = exports.$gameActors = exports.set$gameSelfSwitchesFactory = exports.$gameSelfSwitches = exports.set$gameVariablesFactory = exports.$gameVariables = exports.set$gameSwitchesFactory = exports.$gameSwitches = exports.set$gameMessageFactory = exports.$gameMessage = exports.set$gameTimerFactory = exports.$gameTimer = exports.set$gameScreenFactory = exports.$gameScreen = exports.set$gameSystemFactory = exports.$gameSystem = exports.set$gameTempFactory = exports.$gameTemp = exports.set$dataMap = exports.set$dataMapFactory = exports.$dataMap = exports.set$dataMapInfosFactory = exports.$dataMapInfos = exports.set$dataSystemFactory = exports.$dataSystem = exports.set$dataCommonEventsFactory = exports.$dataCommonEvents = exports.set$dataTilesetsFactory = exports.$dataTilesets = exports.set$dataAnimationsFactory = exports.$dataAnimations = exports.set$dataStatesFactory = exports.$dataStates = exports.set$dataTroopsFactory = exports.$dataTroops = exports.set$dataEnemiesFactory = exports.$dataEnemies = exports.set$dataArmorsFactory = exports.$dataArmors = exports.set$dataWeaponsFactory = exports.$dataWeapons = exports.set$dataItemsFactory = exports.$dataItems = exports.set$dataSkillsFactory = exports.$dataSkills = exports.set$dataClassesFactory = exports.$dataClasses = exports.set$dataActorsFactory = exports.$dataActors = exports.createGlobals = void 0;
exports.$testEvent = exports.set$gamePlayerFactory = exports.$gamePlayer = exports.set$gameMapFactory = exports.$gameMap = exports.set$gameTroopFactory = exports.$gameTroop = exports.set$gamePartyFactory = exports.$gameParty = void 0;
function createGlobals() {
    // TODO: エラー箇所の特定が分かりづらくなるので if 文は不要。また $data~ については setter で直接値を代入するため、ここでの代入は不要
    if (!!$gameActorsFactory)
        exports.$gameActors = $gameActorsFactory();
    if (!!$dataActorsFactory)
        exports.$dataActors = $dataActorsFactory();
    if (!!$dataClassesFactory)
        exports.$dataClasses = $dataClassesFactory();
    if (!!$dataSkillsFactory)
        exports.$dataSkills = $dataSkillsFactory();
    if (!!$dataItemsFactory)
        exports.$dataItems = $dataItemsFactory();
    if (!!$dataWeaponsFactory)
        exports.$dataWeapons = $dataWeaponsFactory();
    if (!!$dataArmorsFactory)
        exports.$dataArmors = $dataArmorsFactory();
    if (!!$dataEnemiesFactory)
        exports.$dataEnemies = $dataEnemiesFactory();
    if (!!$dataTroopsFactory)
        exports.$dataTroops = $dataTroopsFactory();
    if (!!$dataStatesFactory)
        exports.$dataStates = $dataStatesFactory();
    if (!!$dataAnimationsFactory)
        exports.$dataAnimations = $dataAnimationsFactory();
    if (!!$dataTilesetsFactory)
        exports.$dataTilesets = $dataTilesetsFactory();
    if (!!$dataCommonEventsFactory)
        exports.$dataCommonEvents = $dataCommonEventsFactory();
    if (!!$dataSystemFactory)
        exports.$dataSystem = $dataSystemFactory();
    if (!!$dataMapInfosFactory)
        exports.$dataMapInfos = $dataMapInfosFactory();
    if (!!$dataMapFactory)
        exports.$dataMap = $dataMapFactory();
    if (!!$gameTempFactory)
        exports.$gameTemp = $gameTempFactory();
    if (!!$gameSystemFactory)
        exports.$gameSystem = $gameSystemFactory();
    if (!!$gameScreenFactory)
        exports.$gameScreen = $gameScreenFactory();
    if (!!$gameTimerFactory)
        exports.$gameTimer = $gameTimerFactory();
    if (!!$gameMessageFactory)
        exports.$gameMessage = $gameMessageFactory();
    if (!!$gameSwitchesFactory)
        exports.$gameSwitches = $gameSwitchesFactory();
    if (!!$gameVariablesFactory)
        exports.$gameVariables = $gameVariablesFactory();
    if (!!$gameSelfSwitchesFactory)
        exports.$gameSelfSwitches = $gameSelfSwitchesFactory();
    if (!!$gamePartyFactory)
        exports.$gameParty = $gamePartyFactory();
    if (!!$gameTroopFactory)
        exports.$gameTroop = $gameTroopFactory();
    if (!!$gameMapFactory)
        exports.$gameMap = $gameMapFactory();
    if (!!$gamePlayerFactory)
        exports.$gamePlayer = $gamePlayerFactory();
}
exports.createGlobals = createGlobals;
// TODO: $data~ は静的な値なので Factory とその setter は不要。代わりに $data~ に直接代入する setter が必要
exports.$dataActors = null;
var $dataActorsFactory;
function set$dataActorsFactory(func) {
    $dataActorsFactory = func;
}
exports.set$dataActorsFactory = set$dataActorsFactory;
exports.$dataClasses = null;
var $dataClassesFactory;
function set$dataClassesFactory(func) {
    $dataClassesFactory = func;
}
exports.set$dataClassesFactory = set$dataClassesFactory;
exports.$dataSkills = null;
var $dataSkillsFactory;
function set$dataSkillsFactory(func) {
    $dataSkillsFactory = func;
}
exports.set$dataSkillsFactory = set$dataSkillsFactory;
exports.$dataItems = null;
var $dataItemsFactory;
function set$dataItemsFactory(func) {
    $dataItemsFactory = func;
}
exports.set$dataItemsFactory = set$dataItemsFactory;
exports.$dataWeapons = null;
var $dataWeaponsFactory;
function set$dataWeaponsFactory(func) {
    $dataWeaponsFactory = func;
}
exports.set$dataWeaponsFactory = set$dataWeaponsFactory;
exports.$dataArmors = null;
var $dataArmorsFactory;
function set$dataArmorsFactory(func) {
    $dataArmorsFactory = func;
}
exports.set$dataArmorsFactory = set$dataArmorsFactory;
exports.$dataEnemies = null;
var $dataEnemiesFactory;
function set$dataEnemiesFactory(func) {
    $dataEnemiesFactory = func;
}
exports.set$dataEnemiesFactory = set$dataEnemiesFactory;
exports.$dataTroops = null;
var $dataTroopsFactory;
function set$dataTroopsFactory(func) {
    $dataTroopsFactory = func;
}
exports.set$dataTroopsFactory = set$dataTroopsFactory;
exports.$dataStates = null;
var $dataStatesFactory;
function set$dataStatesFactory(func) {
    $dataStatesFactory = func;
}
exports.set$dataStatesFactory = set$dataStatesFactory;
exports.$dataAnimations = null;
var $dataAnimationsFactory;
function set$dataAnimationsFactory(func) {
    $dataAnimationsFactory = func;
}
exports.set$dataAnimationsFactory = set$dataAnimationsFactory;
exports.$dataTilesets = null;
var $dataTilesetsFactory;
function set$dataTilesetsFactory(func) {
    $dataTilesetsFactory = func;
}
exports.set$dataTilesetsFactory = set$dataTilesetsFactory;
exports.$dataCommonEvents = null;
var $dataCommonEventsFactory;
function set$dataCommonEventsFactory(func) {
    $dataCommonEventsFactory = func;
}
exports.set$dataCommonEventsFactory = set$dataCommonEventsFactory;
exports.$dataSystem = null;
var $dataSystemFactory;
function set$dataSystemFactory(func) {
    $dataSystemFactory = func;
}
exports.set$dataSystemFactory = set$dataSystemFactory;
exports.$dataMapInfos = null;
var $dataMapInfosFactory;
function set$dataMapInfosFactory(func) {
    $dataMapInfosFactory = func;
}
exports.set$dataMapInfosFactory = set$dataMapInfosFactory;
exports.$dataMap = null;
var $dataMapFactory;
function set$dataMapFactory(func) {
    $dataMapFactory = func;
}
exports.set$dataMapFactory = set$dataMapFactory;
// $dataMapを直接代入する処理のために用意している
function set$dataMap(value) {
    exports.$dataMap = value;
}
exports.set$dataMap = set$dataMap;
exports.$gameTemp = null;
var $gameTempFactory;
function set$gameTempFactory(func) {
    $gameTempFactory = func;
}
exports.set$gameTempFactory = set$gameTempFactory;
exports.$gameSystem = null;
var $gameSystemFactory;
function set$gameSystemFactory(func) {
    $gameSystemFactory = func;
}
exports.set$gameSystemFactory = set$gameSystemFactory;
exports.$gameScreen = null;
var $gameScreenFactory;
function set$gameScreenFactory(func) {
    $gameScreenFactory = func;
}
exports.set$gameScreenFactory = set$gameScreenFactory;
exports.$gameTimer = null;
var $gameTimerFactory;
function set$gameTimerFactory(func) {
    $gameTimerFactory = func;
}
exports.set$gameTimerFactory = set$gameTimerFactory;
exports.$gameMessage = null;
var $gameMessageFactory;
function set$gameMessageFactory(func) {
    $gameMessageFactory = func;
}
exports.set$gameMessageFactory = set$gameMessageFactory;
exports.$gameSwitches = null;
var $gameSwitchesFactory;
function set$gameSwitchesFactory(func) {
    $gameSwitchesFactory = func;
}
exports.set$gameSwitchesFactory = set$gameSwitchesFactory;
exports.$gameVariables = null;
var $gameVariablesFactory;
function set$gameVariablesFactory(func) {
    $gameVariablesFactory = func;
}
exports.set$gameVariablesFactory = set$gameVariablesFactory;
exports.$gameSelfSwitches = null;
var $gameSelfSwitchesFactory;
function set$gameSelfSwitchesFactory(func) {
    $gameSelfSwitchesFactory = func;
}
exports.set$gameSelfSwitchesFactory = set$gameSelfSwitchesFactory;
exports.$gameActors = null;
var $gameActorsFactory;
function set$gameActorsFactory(func) {
    $gameActorsFactory = func;
}
exports.set$gameActorsFactory = set$gameActorsFactory;
exports.$gameParty = null;
var $gamePartyFactory;
function set$gamePartyFactory(func) {
    $gamePartyFactory = func;
}
exports.set$gamePartyFactory = set$gamePartyFactory;
exports.$gameTroop = null;
var $gameTroopFactory;
function set$gameTroopFactory(func) {
    $gameTroopFactory = func;
}
exports.set$gameTroopFactory = set$gameTroopFactory;
exports.$gameMap = null;
var $gameMapFactory;
function set$gameMapFactory(func) {
    $gameMapFactory = func;
}
exports.set$gameMapFactory = set$gameMapFactory;
exports.$gamePlayer = null;
var $gamePlayerFactory;
function set$gamePlayerFactory(func) {
    $gamePlayerFactory = func;
}
exports.set$gamePlayerFactory = set$gamePlayerFactory;
exports.$testEvent = null;
