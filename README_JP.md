# Deno Simple DB
【日本語 / [English](./README.md)】

Denoベースの簡単なDB。

## 注意事項
**まだ開発中のモジュールです。**  
NeDBのようなモジュールを目指し、試験的に実装しています。

もし必要な機能が『今後追加される機能』になければ、[Issues](https://github.com/windchime-yk/deno-simple-db/issues/new)で教えてください。

## 特徴
- Denoモジュール
- JSONベースの保存形式
- インメモリとファイルでのデータ保存に対応

## 今後追加される機能
- [x] データを書き込み
- [x] 指定したデータを削除
- [x] 条件に合致するデータを返す
- [x] データをファイルとして保存
- [x] 非同期対応
- [ ] 正規表現による部分検索

## API
ファイルを作成する保存形式では、ファイルの読み込みと書き込みを行なうため、実行の際に`--allow-read`と`--allow-write`をつけてください。

### DBの作成
第1引数はDBの種類です。`file`ならファイル、`memory`ならインメモリで管理します。  
第2引数はDBのパス。fileの場合は書かないとエラーになります。
``` typescript
import { SimpleDB } from 'https://github.com/windchime-yk/deno-simple-db/raw/master/mod.ts'

interface DB {
  _id: string,
  name?: string
}

const db = new SimpleDB<DB>('file', 'db/')
```

### データの追加
第1引数はDBに追加するObject、第2引数は重複防止処理で利用するkeyです。  
以下の例の場合、`name`の値が重複すると追加されません。なお、現状は無警告で重複を弾きます。

``` typescript
import { v4 } from 'https://deno.land/std@0.77.0/uuid/mod.ts';

const test = {
  _id: v4.generate(),
  name: 'あそまか といか'
}

await db.add(test, 'name')
```

### データの削除
DBから該当するObjectを削除します。  
第1引数はkey、第2引数はその値です。
``` typescript
await db.delete('name', 'あそまか といか')
```

### データの検索
現状は、完全一致のみに対応しています。  
第1引数にkeyの名前、第2引数にkeyの値を指定し、該当するObjectを返します。  
引数なしは、DBデータすべてを返します。
``` typescript
const data = await db.find('name', 'あそまか といか')
const dataAll = await db.find()
```

## テスト
以下のコマンドを実行してください。
``` bash
$ git clone git@github.com:windchime-yk/deno-simple-db.git
$ cd path/to/deno-simple-db

# Denonがない場合
$ deno run --allow-write --allow-read test.ts
# Denonがある場合
$ denon test
```