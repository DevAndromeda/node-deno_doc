import { doc } from "../src/index.js";
import fs from "fs/promises";

const source = "https://raw.githubusercontent.com/DevAndromeda/youtube-sr/main/deno/mod.ts";

console.log(`Parsing ${source}...`);

const entries = await doc(source);

console.log(`Successfully parsed ${entries.length} entities!`);

await fs.writeFile("./youtube-sr.json", JSON.stringify(entries, null, "    "));