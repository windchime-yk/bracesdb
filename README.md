# BracesDB
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/bracesdb/mod.ts)

【[日本語](./README_JP.md) / English】

DB module in JSON format created with Deno.

## Notes
**This module does not support encryption. Do not use it to store important data.**

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
- [x] Partial search with regular expressions

If you don't see a feature you think you need, please let us know what you want in [Issue](https://github.com/windchime-yk/bracesdb/issues/new). It will be used as a reference for implementation.

## Usage
### deno.land/x/
``` typescript
import { BracesDB } from "https://deno.land/x/bracesdb@VERSION/mod.ts"
```

### x.nest.land
``` typescript
import { BracesDB } from "https://x.nest.land/bracesdb@VERSION/mod.ts"
```

### pax.deno.dev
``` typescript
import { BracesDB } from "https://pax.deno.dev/windchime-yk/bracesdb@VERSION/mod.ts"
```

## API
When creating a file, you must add `--allow-read` and `--allow-write` at execution to read and write the file.

### Create DB
`type` is the DB type. If it is "file", it is a file; if it is "memory", it is managed in-memory.  
`folder` is the DB path. Default path is project root.  
`filename` is the DB name. Default name is `main`.

``` typescript
interface DB {
  name?: string;
  description?: string;
}

const db = new BracesDB<DB>({
  type: "file",
  folder: "./db/",
  filename: "test",
});
```

### Add an Object to the DB
The first argument is the Object to add to the DB.  
The second argument is the key used in the duplication prevention process.
``` typescript
const test = {
  name: "Toika Asomaka",
  description: "A name that just popped into my head",
};

await db.add(test, "name");
```

### Remove matching objects from DB
The first argument is the key, and the second argument is the value of the key.
``` typescript
await db.delete("name", "Toika Asomaka");
```

### Searching the DB
Perfect match and partial match supported.  
Returns an Object that matches the conditions, with the name of the key as the first argument and the value of the key as the second argument.  
No arguments return all DB data.
``` typescript
// Perfect match
const data = db.find("name", "Toika Asomaka");
// Partial match
const dataPartial = db.find("name", /Toika/);
// All DB data
const dataAll = db.find();
```

### Test
Execute the following command.
``` bash
$ git clone git@github.com:windchime-yk/bracesdb.git
$ cd path/to/bracesdb

# If there is no Denon
$ deno test --allow-write --allow-read
# If you have a Denon
$ denon test
```

## On translation
I am using "[DeepL Translation](https://www.deepl.com/home)" to translate this README.