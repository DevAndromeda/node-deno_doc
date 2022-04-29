# `deno_doc`

A **[Deno Doc](https://github.com/denoland/deno_doc)** port for Node.js

# Features
* Asynchronous
* Supports both JavaScript and TypeScript
* Generates documentation from remote url or file path
* ESM & CJS supported

# Installation

```sh
# npm
$ npm install --save deno_doc
# Yarn
$ yarn add deno_doc
```

# Example Usage

```js
// ES Modules
import { doc } from "deno_doc";

const colorsDoc = await doc("https://deno.land/std/fmt/colors.ts");

for (const node of colorsDoc) {
  console.log(`name: ${node.name} kind: ${node.kind}`);
}

// CommonJS
const { doc } = require("deno_doc");

const colorsDoc = await doc("https://deno.land/std/fmt/colors.ts");

for (const node of colorsDoc) {
  console.log(`name: ${node.name} kind: ${node.kind}`);
}
```

# API

## `doc()`

The `doc()` function takes a string URL module specifier and potentially some options, and asynchronously resolves with an array of documentation nodes, which represent the surface API of the module.

A minimal example of using `doc()` and printing out some information about a function:

```js
import { doc } from "deno_doc";

const colorsDoc = await doc("https://deno.land/std/fmt/colors.ts");

for (const node of colorsDoc) {
  console.log(`name: ${node.name} kind: ${node.kind}`);
}
```

The `doc()` function needs a way to retrieve modules, and by default uses a `load()` function provided by a partial implementation of `deno_graph` which uses `fetch()` for remote modules and `fs.readFile()` for local modules.