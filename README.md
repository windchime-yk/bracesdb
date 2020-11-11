# Deno JSON DB
【[日本語](./README_JP.md) / English】

A simple DB based on Deno.

## Notes
**This module is a work in progress.**  
We are working on a pilot implementation of a module like NeDB.

If the feature you need is not present in the "Upcoming features", please let us know what you want in [Issue](https://github.com/windchime-yk/deno-simple-db/issues/new).

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
- [ ] Partial search with regular expressions

## API
When creating a file, you must add `--allow-read` and `--allow-write` at execution to read and write the file.

### Create DB
The first argument is the DB type. If it is "file", it is a file; if it is "memory", it is managed in-memory.  
The second argument is the DB path. If it is "file", it will be an error if it is not written.

``` typescript
import { SimpleDB } from 'https://github.com/windchime-yk/deno-simple-db/raw/master/mod.ts'

interface DB {
  _id: string,
  name?: string
}

const db = new SimpleDB<DB>({
  type: 'file',
  folder: './db/',
})
```

### Add an Object to the DB
The first argument is the Object to add to the DB.  
The second argument is the key used in the duplication prevention process.
``` typescript
import { v4 } from 'https://deno.land/std@0.77.0/uuid/mod.ts';

const test = {
  _id: v4.generate(),
  name: 'Asomaka Toika'
}

await db.add(test, 'name')
```

### Remove matching objects from DB
The first argument is the key, and the second argument is the value of the key.
``` typescript
await db.delete('name', 'Asomaka Toika')
```

### Searching the DB
Returns an Object that matches the conditions, with the name of the key as the first argument and the value of the key as the second argument.  
No arguments return all DB data.
``` typescript
const data = await db.find('name', 'Asomaka Toika')
const dataAll = await db.find()
```

### Test
Execute the following command.
``` bash
$ git clone git@github.com:windchime-yk/deno-simple-db.git
$ cd path/to/deno-simple-db

# If there is no Denon
$ deno run --allow-write --allow-read test.ts
# If you have a Denon
$ denon test
```

## On translation
I am using "[DeepL Translation](https://www.deepl.com/home)" to translate this README.