/**
 * @class
 */
var EasyStorage = /** @class */ (function () {
    /**
     * @constructor
     *
     * @param {string} storageType
     */
    function EasyStorage(storageType) {
        if (!storageType) {
            storageType = 'local';
        }
        switch (storageType) {
            case 'local':
                this.storage = localStorage;
                break;
            case 'session':
                this.storage = sessionStorage;
                break;
            default:
                throw new Error('種別は local もしくは session で指定してください');
        }
    }
    /**
     * @method
     *
     * @param {string} key
     * @param {unknown|string} value
     */
    EasyStorage.prototype.setItem = function (key, value) {
        if (!key) {
            throw new Error(EasyStorage.emptyKey);
        }
        // value がオブジェクトである場合、JSON.stringify() を使って文字列に変換します
        if (typeof value === 'object') {
            this.storage.setItem(key, JSON.stringify(value));
        }
        else if (typeof value === 'string') {
            this.storage.setItem(key, value);
        }
    };
    /**
     * @method
     *
     * @param {string} key
     * @returns {string|number|null}
     */
    EasyStorage.prototype.getItem = function (key) {
        if (!key) {
            throw new Error(EasyStorage.emptyKey);
        }
        var value = this.storage.getItem(key);
        if (value == null) {
            return null;
        }
        try {
            return JSON.parse(value);
        }
        catch (error) {
            return value;
        }
    };
    /**
     * @method
     *
     * @param {string} key
     * @returns {void}
     *
     * @throws {Error} keyが指定されていない場合
     */
    EasyStorage.prototype.removeItem = function (key) {
        if (!key) {
            throw new Error(EasyStorage.emptyKey);
        }
        this.storage.removeItem(key);
    };
    /**
     * @method
     *
     * @returns {void}
     */
    EasyStorage.prototype.clear = function () {
        this.storage.clear();
    };
    /**
     * @method
     *
     * @param {string} key
     * @returns {boolean}
     *
     * @throws {Error} keyが指定されていない場合
     */
    EasyStorage.prototype.hasItem = function (key) {
        if (!key) {
            throw new Error(EasyStorage.emptyKey);
        }
        return this.storage.getItem(key) !== null;
    };
    /**
     * @type {string}
     */
    EasyStorage.emptyKey = 'キーは必須です';
    return EasyStorage;
}());
module.exports = EasyStorage;
