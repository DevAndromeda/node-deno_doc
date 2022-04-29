import { doc as JSDoc } from "./deno_doc/deno_doc.js";
import { load as defaultLoad } from "./utils/graph.js";

function doc(
    specifier,
    options = {},
) {
    const { load = defaultLoad, includeAll = false, resolve } = options;    
    return JSDoc(specifier, includeAll, load, resolve);
}

export default doc;
export { doc };