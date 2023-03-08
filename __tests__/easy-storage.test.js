const { EasyStorage } = require('../main.js');

const localStorageMock = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    },
    hasItem: function() {
      return store[key] !== undefined
    },
  };
})();
const SessionStorageMock = localStorageMock;

describe('setItem()', () => {
  beforeAll(() => {
    setMock();
  });
  afterAll(() => {
    resetMock();
  });

  it.each(eachParams())('文字列が正常にセットされる', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'test-key';
    const value = 'test-value';
    Es.setItem(key, value);

    expect(localStorageMock.getItem(key)).toBe(value);
  });

  it.each(eachParams())('オブジェクトが正常にセットされる', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'test-key';
    const value = { name: 'test' };

    Es.setItem(key, value);

    expect(localStorageMock.getItem(key)).toBe(JSON.stringify(value));
  });

  // 異常系のテスト
  it.each(eachParams())('キーを指定しなければ例外が発生する', (storage) => {
    const Es = new EasyStorage(storage);
    expect(() => Es.setItem()).toThrow('キーは必須です');
  });
});

describe('getItem()', () => {
  beforeAll(() => {
    setMock();
  });
  afterAll(() => {
    resetMock();
  });

  // 正常系のテスト
  it.each(eachParams())('正常に文字列が取得できる', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'test-key';
    const value = 'test-value';
    localStorageMock.setItem(key, value);

    const result = Es.getItem(key);

    expect(result).toBe(value);
  });

  it.each(eachParams())('キーが存在しない場合はnullが返却される', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'nonexistent-key';
    const result = Es.getItem(key);

    expect(result).toBeNull();
  });

  it.each(eachParams())('正常にjsonデータが取得できる', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'test-key';
    const value = { name: 'test' };
    localStorageMock.setItem(key, JSON.stringify(value));

    const result = Es.getItem(key);

    expect(result).toEqual(value);
  });

  it.each(eachParams())('キーを指定しなければ例外が発生する', (storage) => {
    const Es = new EasyStorage(storage);
    expect(() => Es.getItem()).toThrow('キーは必須です');
  });
});

describe('removeItem()', () => {
  beforeAll(() => {
    setMock();
  });
  afterAll(() => {
    resetMock();
  });

  it.each(eachParams())('ローカルストレージから正常に削除される', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'test-key';
    const value = 'test-value';
    localStorageMock.setItem(key, value);

    Es.removeItem(key);

    expect(localStorageMock.getItem(key)).toBeNull();
  });

  it.each(eachParams())('キーを指定しなければ例外が発生する', (storage) => {
    const Es = new EasyStorage(storage);
    expect(() => Es.removeItem()).toThrow('キーは必須です');
  });
});

describe('clear()', () => {
  beforeAll(() => {
    setMock();
  });
  afterAll(() => {
    resetMock();
  });

  it.each(eachParams())('全てのキーが正常に削除される', (storage) => {
    const Es = new EasyStorage(storage);
    localStorageMock.setItem('key1', 'value1');
    localStorageMock.setItem('key2', 'value2');

    Es.clear();

    expect(localStorageMock.getItem('key1')).toBeNull();
    expect(localStorageMock.getItem('key2')).toBeNull();
  });
});

describe('hasItem', () => {
  beforeAll(() => {
    setMock();
  });
  afterAll(() => {
    resetMock();
  });

  it.each(eachParams())('キーが存在している場合はtrue', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'test-key';
    const value = 'test-value';
    localStorageMock.setItem(key, value);

    const result = Es.hasItem(key);

    expect(result).toBe(true);
  });

  it.each(eachParams())('キーが存在しない場合はtrue', (storage) => {
    const Es = new EasyStorage(storage);
    const key = 'nonexistent-key';

    const result = Es.hasItem(key);

    expect(result).toBe(false);
  });

  it.each(eachParams())('キーを指定しなければ例外が発生する', (storage) => {
    const Es = new EasyStorage(storage);
    expect(() => Es.hasItem()).toThrow('キーは必須です');
  });
});

function setMock()
{
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
  Object.defineProperty(window, 'sessionStorage', {
    value: SessionStorageMock
  });
}
function resetMock()
{
  Object.defineProperty(window, 'localStorage', {
    value: global.localStorage
  });
  Object.defineProperty(window, 'sessionStorage', {
    value: global.sessionStorage
  });
}

/**
 * @returns {array}
 */
function eachParams()
{
  return [
    [
      null,
    ],
    [
      '',
    ],
    [
      'local',
    ],
    [
      'session',
    ],
  ];
}