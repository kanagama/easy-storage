class EasyStorage
{
  static emptyKey = 'キーは必須です';

  /**
   * @param {string} storageType
   */
  constructor(storageType)
  {
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
   *
   * @param {string} key
   * @param {Object|string} value
   */
  setItem(key, value)
  {
    if (!key) {
      throw new Error(EasyStorage.emptyKey);
    }

    // value がオブジェクトである場合、JSON.stringify() を使って文字列に変換します
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    this.storage.setItem(key, value);
  }

  /**
   * @param {string} key
   */
  getItem(key)
  {
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
   * @param {string} key
   */
  removeItem(key)
  {
    if (!key) {
      throw new Error(EasyStorage.emptyKey);
    }

    this.storage.removeItem(key);
  }

  /**
   *
   */
  clear()
  {
    this.storage.clear();
  }

  /**
   * @param {string} key
   * @returns {boolean}
   */
  hasItem(key)
  {
    if (!key) {
      throw new Error(EasyStorage.emptyKey);
    }

    return this.storage.getItem(key) !== null;
  }
}

module.exports = EasyStorage;
