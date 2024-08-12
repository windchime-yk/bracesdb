# BracesDB
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/bracesdb/mod.ts)

【[日本語](./README_JP.md) / English】

DB module in JSON format created with Deno.

## Notice
Deno is supported Node.js and npm packages.

This module was inspired [NeDB](https://github.com/louischatriot/nedb). Simple control like NeDB and all datastore unified API control. That was goal. But it was out of reach.   
**This project is freezed.**

## Notes
**This module does not support encryption. Do not use it to store important data.**

## Feature
- Deno Modules
- Save in JSON format
- The storage formats are in-memory and file

## Upcoming features
Support for Local Storage API and Cache API is planned.  
See [Issues](https://github.com/rwl-dev/bracesdb/issues) for more information.

If you don't see a feature you think you need, please [create an Issue](https://github.com/rwl-dev/bracesdb/issues/new) and let me know. You will use it as a reference.

## API
There are two main types: file creation and in-memory.  
The file creation format has a separate module as `FileDB`, because Deno Deploy cannot create files due to its specification. The others are modularized as `BracesDB`.  
Since `FileDB` reads and writes files, please add `--allow-read` and `--allow-write` when executing.

### BracesDB
#### Create DB
`type` is the DB type. Currently, only in-memory can be specified.

``` typescript
import { BracesDB } from "https://deno.land/x/bracesdb/mod.ts";

interface DB {
  name?: string;
  description?: string;
}

const db = new BracesDB<DB>({ type: "memory" });
```

### FileDB
#### Create DB
`folder` is the DB path. Default path is project root.  
`filename` is the DB name. Default name is `main`.

``` typescript
import { BracesDB } from "https://deno.land/x/bracesdb/mod.ts";

interface DB {
  name?: string;
  description?: string;
}

const db = new BracesDB<DB>({
  folder: "./db/",
  filename: "test",
});
```

### Common processing
#### Add an Object to the DB
The first argument is the Object to add to the DB.  
The second argument is the key used in the duplication prevention process.
``` typescript
const test = {
  name: "Toika Asomaka",
  description: "A name that just popped into my head",
};

await db.add(test, "name");
```

#### Remove matching objects from DB
The first argument is the key, and the second argument is the value of the key.
``` typescript
await db.delete("name", "Toika Asomaka");
```

#### Searching the DB
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
$ git clone https://github.com/rwl-dev/bracesdb.git
$ cd bracesdb

$ deno task test
```

## On translation
I am using "[DeepL Translation](https://www.deepl.com/home)" to translate this README.
