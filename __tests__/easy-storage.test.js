const { EasyStorage } = require('../main.js');
const Es = new EasyStorage;

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
    }
  };
})();

describe('setItem()', () => {
  beforeAll(() => {
    setMock();
  });
  afterAll(() => {
    resetMock();
  });

  it('文字列が正常にセットされる', () => {
    const key = 'test-key';
    const value = 'test-value';
    Es.setItem(key, value);

    expect(localStorageMock.getItem(key)).toBe(value);
  });
  it('オブジェクトが正常にセットされる', () => {
    const key = 'test-key';
    const value = { name: 'test' };

    Es.setItem(key, value);

    expect(localStorageMock.getItem(key)).toBe(JSON.stringify(value));
  });

  // 異常系のテスト
  it('キーを指定しなければ例外が発生する', () => {
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
  it('正常に文字列が取得できる', () => {
    const key = 'test-key';
    const value = 'test-value';
    localStorageMock.setItem(key, value);

    const result = Es.getItem(key);

    expect(result).toBe(value);
  });

  it('キーが存在しない場合はnullが返却される', () => {
    const key = 'nonexistent-key';

    const result = Es.getItem(key);

    expect(result).toBeNull();
  });

  it('正常にjsonデータが取得できる', () => {
    const key = 'test-key';
    const value = { name: 'test' };
    localStorageMock.setItem(key, JSON.stringify(value));

    const result = Es.getItem(key);

    expect(result).toEqual(value);
  });

  it('キーを指定しなければ例外が発生する', () => {
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

  it('ローカルストレージから正常に削除される', () => {
    const key = 'test-key';
    const value = 'test-value';
    localStorageMock.setItem(key, value);

    Es.removeItem(key);

    expect(localStorageMock.getItem(key)).toBeNull();
  });

  it('キーを指定しなければ例外が発生する', () => {
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

  it('全てのキーが正常に削除される', () => {
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

  it('キーが存在している場合はtrue', () => {
    const key = 'test-key';
    const value = 'test-value';
    localStorageMock.setItem(key, value);

    const result = Es.hasItem(key);

    expect(result).toBe(true);
  });

  it('キーが存在しない場合はtrue', () => {
    const key = 'nonexistent-key';

    const result = Es.hasItem(key);

    expect(result).toBe(false);
  });

  it('キーを指定しなければ例外が発生する', () => {
    expect(() => Es.hasItem()).toThrow('キーは必須です');
  });
});

function setMock()
{
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
}
function resetMock()
{
  Object.defineProperty(window, 'localStorage', {
    value: global.localStorage
  });
}
