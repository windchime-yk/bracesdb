# BracesDB
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/bracesdb/mod.ts)

【日本語 / [English](./README.md)】

Denoで作られたJSON形式のDBモジュール。

## 注意事項
**このモジュールは暗号化に対応していません。重要なデータの保存には用いないでください。**

## 特徴
- Denoモジュール
- JSON形式でのデータ保存
- インメモリとファイルでのデータ保存に対応

## 今後追加される機能
Local Storage APIやCache APIへの対応を予定しています。  
詳細は[Issues](https://github.com/rwl-dev/bracesdb/issues)を参照してください。

もし必要だと思う機能がなければ、[Issueを作成して](https://github.com/rwl-dev/bracesdb/issues/new)教えてください。参考にします。

## API
大きく分けてファイル作成形式とインメモリ形式があります。  
ファイル作成形式は`FileDB`としてモジュールが分離されており、これはDeno Deployが仕様上ファイル作成できないためです。それ以外は`BracesDB`としてモジュール化されています。  
`FileDB`ではファイルの読み込みと書き込みを行なうため、実行の際に`--allow-read`と`--allow-write`をつけてください。

### BracesDB
#### DBの作成
`type`はDBの種類です。現在はインメモリのみ指定できます。

``` typescript
import { BracesDB } from "https://deno.land/x/bracesdb/mod.ts";

interface DB {
  name?: string;
  description?: string;
}

const db = new BracesDB<DB>({ type: "memory" });
```

### FileDB
#### DBの作成
`folder`はDBファイルを格納するフォルダのパスです。デフォルトではプロジェクトルートに生成されます。  
`filename`はDBファイルの名前です。デフォルトは`main`です。

``` typescript
import { FileDB } from "https://deno.land/x/bracesdb/mod.ts";

interface DB {
  name?: string;
  description?: string;
}

const db = new FileDB<DB>({
  folder: "./db/",
  filename: "test",
});
```

### 共通処理
#### データの追加
第1引数はDBに追加するObject、第2引数は重複防止処理で利用するkeyです。  
以下の例の場合、`name`の値が重複すると追加されません。なお、現状は無警告で重複を弾きます。
``` typescript
const test = {
  name: "あそまか といか",
  description: "ふと思い浮かんだ名前",
};

await db.add(test, "name");
```

#### データの削除
DBから該当するObjectを削除します。  
第1引数はkey、第2引数はその値です。
``` typescript
await db.delete("name", "あそまか といか");
```

#### データの検索
完全一致と正規表現による部分一致に対応しています。  
第1引数にkeyの名前、第2引数にkeyの値を指定し、該当するObjectを返します。  
引数なしは、DBデータすべてを返します。
``` typescript
// 完全一致
const data = db.find("name", "あそまか といか");
// 部分検索
const dataPartial = db.find("name", /といか/);
// すべてのDBデータ
const dataAll = db.find();
```

## テスト
以下のコマンドを実行してください。
``` bash
$ git clone https://github.com/rwl-dev/bracesdb.git
$ cd bracesdb

$ deno task test
```