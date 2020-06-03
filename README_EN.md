# Deno Simple DB
【[日本語](./README.md) / English】

A simple DB based on Deno.

## Notes
**This module is a work in progress.**  
It does not support critical parts such as asynchronous support and encryption for DB writing.  
If the feature you need is not present in the "Upcoming features", please let us know what you want in Issue.

## Feature
- Deno Modules
- Save in JSON format
- The storage formats are in-memory and file

## Upcoming features
- [x] Write data
- [x] Delete the specified data
- [x] Return data that matches the condition
- [x] Save the data as a file
- [x] Asynchronous support
- [ ] Encryption of DB files

## Usage
When creating a file, you must add `--allow-read` and `--allow-write` at execution to read and write the file.

``` typescript
import { SimpleDB } from 'https://github.com/windchime-yk/deno-simple-db/raw/master/mod.ts'

interface DB {
  _id: string,
  name?: string
}

// Create DB
// The first argument is the DB type. If it is "file", it is a file; if it is "memory", it is managed in-memory.
// The second argument is the DB path. If it is "file", it will be an error if it is not written.
const db = new SimpleDB<DB>('file', 'db/')

const test = {
  _id: 'vafavrwaevawe4evarvarevga',
  name: 'Asomaka Toika'
}

// Add an Object to the DB
// The first argument is the Object to add to the DB
// The second argument is the key used in the duplication prevention process.
db.add(test, 'name')

// Remove matching objects from DB.
// The first argument is the key, and the second argument is the value of the key.
db.delete('name', 'Asomaka Toika')

// Searching the DB
// returns an Object that matches the conditions, with the name of the key as the first argument and the value of the key as the second argument.
// no arguments return all DB data
const data = db.find('name', 'Asomaka Toika')
const dataAll = db.find()
```

## On translation
I am using "[DeepL Translation](https://www.deepl.com/home)" to translate this README.