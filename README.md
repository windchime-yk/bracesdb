# Deno Simple DB
【日本語 / [English](./README_EN.md)】

Denoベースの簡単なDB。

## 注意事項
**まだ開発中のモジュールです。**  
非同期やDB書き込み時の暗号化など、クリティカルな部分に対応していません。  
もし必要な機能が『今後追加される機能』になければ、Issueで教えてください。

## 特徴
- Denoモジュール
- JSONベース
- 保存形式はインメモリとファイル

## 今後追加される機能
- [x] データを書き込み
- [x] 指定したデータを削除
- [x] 条件に合致するデータを返す
- [x] データをファイルとして保存
- [x] 非同期対応
- [ ] DBファイルの暗号化

## 使い方
ファイルを作成する保存形式では、ファイルの読み込みと書き込みを行なうため、実行の際に`--allow-read`と`--allow-write`をつけてください。

``` typescript
import { SimpleDB } from 'https://denopkg.com/windchime-yk/deno-simple-db/mod.ts'

interface DB {
  _id: string,
  name?: string
}

// DBの作成
// 第1引数はDBの種類。fileならファイル、memoryならインメモリで管理する
// 第2引数はDBのパス。fileの場合は書かないとエラーになる
const db = new SimpleDB<DB>('file', 'db/')

const test = {
  _id: 'vafavrwaevawe4evarvarevga',
  name: 'あそまか といか'
}

// DBにObjectを追加
// 第1引数はDBに追加するObject
// 第2引数は重複処理で利用するkey
await db.add(test, 'name')

// DBから該当するObjectをすべて削除
// 第1引数はkey、第2引数はその値
await db.delete('name', 'あそまか といか')

// DBの検索
// 第1引数にkeyの名前、第2引数にkeyの値を指定し、該当するObjectを返す
// 引数なしはDBデータすべてを返す
const data = await db.find('name', 'あそまか といか')
const dataAll = await db.find()
```