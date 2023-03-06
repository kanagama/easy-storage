const emptyKey = 'キーは必須です';

class EasyStorage
{
  /**
   *
   * @param {string} key
   * @param {Object|string} value
   */
  setItem(key, value)
  {
    if (!key) {
      throw new Error(emptyKey);
    }

    // value がオブジェクトである場合、JSON.stringify() を使って文字列に変換します
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  }

  /**
   * @param {string} key
   */
  getItem(key)
  {
    if (!key) {
      throw new Error(emptyKey);
    }

    const value = localStorage.getItem(key);
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
      throw new Error(emptyKey);
    }

    localStorage.removeItem(key);
  }

  /**
   *
   */
  clear()
  {
    localStorage.clear();
  }

  /**
   * @param {string} key
   * @returns {boolean}
   */
  hasItem(key)
  {
    if (!key) {
      throw new Error(emptyKey);
    }

    return localStorage.getItem(key) !== null;
  }
}

module.exports = EasyStorage;
