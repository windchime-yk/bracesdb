# Deno JSON DB
【日本語 / [English](./README.md)】

Denoで作られたJSON形式のDBモジュール。

## 注意事項
**まだ開発中のモジュールです。**  
NeDBのようなモジュールを目指し、試験的に実装しています。

もし必要な機能が『今後追加される機能』になければ、[Issues](https://github.com/windchime-yk/deno-json-db/issues/new)で教えてください。

## 特徴
- Denoモジュール
- JSON形式でのデータ保存
- インメモリとファイルでのデータ保存に対応

## 今後追加される機能
- [x] データを書き込み
- [x] 指定したデータを削除
- [x] 条件に合致するデータを返す
- [x] データをファイルとして保存
- [x] 非同期対応
- [x] 正規表現による部分検索

## API
ファイルを作成する保存形式では、ファイルの読み込みと書き込みを行なうため、実行の際に`--allow-read`と`--allow-write`をつけてください。

### DBの作成
`type`はDBの種類です。`file`ならファイル、`memory`ならインメモリで管理します。  
`folder`はDBファイルを格納するフォルダのパスです。デフォルトではプロジェクトルートに生成されます。  
`filename`はDBファイルの名前です。デフォルトは`main`です。
``` typescript
import { JsonDB } from "https://github.com/windchime-yk/deno-json-db/raw/master/mod.ts";

interface DB {
  name?: string;
  description?: string;
}

const db = new JsonDB<DB>({
  type: "file",
  folder: "./db/",
  filename: "test",
});
```

### データの追加
第1引数はDBに追加するObject、第2引数は重複防止処理で利用するkeyです。  
以下の例の場合、`name`の値が重複すると追加されません。なお、現状は無警告で重複を弾きます。
``` typescript
const test = {
  name: "あそまか といか",
  description: "ふと思い浮かんだ名前",
};

await db.add(test, "name");
```

### データの削除
DBから該当するObjectを削除します。  
第1引数はkey、第2引数はその値です。
``` typescript
await db.delete("name", "あそまか といか");
```

### データの検索
完全一致と正規表現による部分一致に対応しています。  
第1引数にkeyの名前、第2引数にkeyの値を指定し、該当するObjectを返します。  
引数なしは、DBデータすべてを返します。
``` typescript
// 完全一致
const data = await db.find("name", "あそまか といか");
// 部分検索
const dataPartial = await db.find("name", /といか/);
// すべてのDBデータ
const dataAll = await db.find();
```

## テスト
以下のコマンドを実行してください。
``` bash
$ git clone git@github.com:windchime-yk/deno-json-db.git
$ cd path/to/deno-json-db

# Denonがない場合
$ deno test --allow-write --allow-read
# Denonがある場合
$ denon test
```