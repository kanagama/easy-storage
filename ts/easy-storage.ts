/**
 * @class
 */
class EasyStorage
{
  /**
   * @type {string}
   */
  private static emptyKey = 'キーは必須です';

  /**
   * @type {Storage}
   */
  private storage: Storage;

  /**
   * @constructor
   *
   * @param {string} storageType
   */
  constructor(storageType: string) {
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
   * @param {Object|string} value
   */
  setItem(key: string, value: Object | string): void {
    if (!key) {
      throw new Error(EasyStorage.emptyKey);
    }

    // value がオブジェクトである場合、JSON.stringify() を使って文字列に変換します
    if (typeof value === 'object') {
        this.storage.setItem(key, JSON.stringify(value));
    } else if (typeof value === 'string') {
      this.storage.setItem(key, value);
    }
  }

  /**
   * @method
   *
   * @param {string} key
   * @returns {string|number|null}
   */
  getItem(key: string): string|number|null {
    if (!key) {
      throw new Error(EasyStorage.emptyKey);
    }

    const value = this.storage.getItem(key);
    if (value == null) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  /**
   * @method
   *
   * @param {string} key
   * @returns {void}
   *
   * @throws {Error} keyが指定されていない場合
   */
  removeItem(key: string): void {
    if (!key) {
      throw new Error(EasyStorage.emptyKey);
    }

    this.storage.removeItem(key);
  }

  /**
   * @method
   *
   * @returns {void}
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * @method
   *
   * @param {string} key
   * @returns {boolean}
   *
   * @throws {Error} keyが指定されていない場合
   */
  hasItem(key: string): boolean {
    if (!key) {
      throw new Error(EasyStorage.emptyKey);
    }

    return this.storage.getItem(key) !== null;
  }
}

module.exports = EasyStorage;
