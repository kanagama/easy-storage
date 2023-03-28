# EasyStorage

## 概要

localStorage, sessionStorage の操作をしやすくする拡張機能です。

おそらく上位互換だったり似たような拡張機能はかなりあると思いますが、 npm や node.js の学習目的が主です。

<br>

## インストール

npm 経由でのインストールは後日設定するので、それまでは github 上から zip ダウンロードとかして dist/easy-storage.min.js を使って下さい

<br>

## 使い方

```html
<script type="text/javascript" src="dist/easy-storage.min.js">
```

```js
// localStorage を使う場合はどちらもOK
const Es = new EasyStorage();
const Es = new EasyStorage('local');

// sessionStorage を使う場合
const Es = new EasyStorage('session');
```

<br>

### setItem(key, value)

localStorage, もしくは sessionStorage に指定のキーで値を格納します。

```js
const Es = new EasyStorage();
// localStrage の 'test' キーに 1 が格納されます
Es.setItem('test', 1);
```

<br>

### getItem(key)

localStorage, もしくは sessionStorage に格納された指定のキーの値を取り出します。

```js
const Es = new EasyStorage();
// localStrage の 'test' キーに 1 が格納されます
Es.setItem('test', 1);
// 1 が console に出力されます
console.log(Es.getItem('test'));
```

<br>

### removeItem(key)

localStorage, もしくは sessionStorage に格納された指定のキーの値を削除します

```js
const Es = new EasyStorage();
// localStrage の 'test' キーに 1 が格納されます
Es.setItem('test', 1);
// 'test' キーが削除されます
Es.removeItem('test');
```

<br>

### clear()

localStorage, もしくは sessionStorage に格納された指定のキーの値を削除します

```js
const Es = new EasyStorage();
// localStrage の 'test1' キーに 1 が格納されます
Es.setItem('test1', 1);
// localStrage の 'test2' キーに 2 が格納されます
Es.setItem('test2', 2);
// 全てのキー（'test1', 'test2'） キーが削除されます
Es.clear();
```

<br>

### hasItem(key)

localStorage, もしくは sessionStorage に指定のキーが格納されているか判定します

```js
const Es = new EasyStorage();
// localStrage の 'test' キーに 1 が格納されます
Es.setItem('test', 1);
// 'test' キーは格納されているため true が返却される
Es.hasItem('test');
// 'failure' キーは格納されていないため false が返却される
Es.hasItem('failure');
```

<br>

## テスト実行

jest にてテストを実行します

```bash
npm run test
```

<br>


## 静的解析

ESLint にて静的解析を実行します

```bash
npm run static_analysis
```

<br>

## ビルド実行

dist/easy-storage.min.js を作成します

```bash
npm run build
```

<br>

## TypeScript コンパイル

scr/easy-storage.js を作成します

```bash
npm run tsc
```
