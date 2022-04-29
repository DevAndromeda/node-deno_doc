const JSDoc = import("./index.js").then(res => res.doc);

/**
 * Generate asynchronously an array of documentation nodes for the supplied
 * module.
 *
 * ### Example
 *
 * ```ts
 * const { doc } = require("deno_doc");
 *
 * ((async) => {
 *      const entries = await doc("https://deno.land/std/fmt/colors.ts");
 *
 *      for (const entry of entries) {
 *          console.log(`name: ${entry.name} kind: ${entry.kind}`);
 *      }
 * })();
 * ```
 *
 * @param specifier The URL string of the specifier to document
 * @param options A set of options for generating the documentation
 * @returns A promise that resolves with an array of documentation nodes
 */
const doc = async (specifier, options = {}) => {
    return (await JSDoc)(specifier, options);
}

module.exports = doc;
module.exports.doc = doc;