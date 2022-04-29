// from deno graph

import type { DocNode } from "./deno_doc/types";

export * from "./deno_doc/types";

export interface LoadResponseModule {
    /** A module with code has been loaded. */
    kind: "module";
    /** The string URL of the resource. If there were redirects, the final
     * specifier should be set here, otherwise the requested specifier. */
    specifier: string;
    /** For remote resources, a record of headers should be set, where the key's
     * have been normalized to be lower case values. */
    headers?: Record<string, string>;
    /** The string value of the loaded resources. */
    content: string;
}

export interface LoadResponseExternalBuiltIn {
    /** The loaded module is either _external_ or _built-in_ to the runtime. */
    kind: "external" | "builtIn";
    /** The strung URL of the resource. If there were redirects, the final
     * specifier should be set here, otherwise the requested specifier. */
    specifier: string;
}

export type LoadResponse = LoadResponseModule | LoadResponseExternalBuiltIn;

export interface DocOptions {
    /** If `true` include all documentation nodes in the output, included private
     * (non-exported) nodes. The default is `false`.  Use the `declarationKind`
     * of the `DocNode` to determine if the doc node is private, exported,
     * imported, or declared. */
    includeAll?: boolean;
    /**
     * An optional callback that is called with the URL string of the resource to
     * be loaded and a flag indicating if the module was required dynamically. The
     * callback should resolve with a `LoadResponse` or `undefined` if the module
     * is not found. If there are other errors encountered, a rejected promise
     * should be returned.
     *
     * This defaults to a load function which will use `fetch()` and
     * `Deno.readFile()` to load modules, and requires the appropriate permissions
     * to function. If the permissions are note available at startup, the default
     * function will prompt for them.
     *
     * @param specifier The URL string of the resource to be loaded and resolved
     * @param isDynamic A flag that indicates if the module was being loaded
     *                  dynamically
     */
    load?(
        specifier: string,
        isDynamic: boolean,
    ): Promise<LoadResponse | undefined>;
    /** An optional callback that allows the default resolution logic of the
     * module graph to be "overridden". This is intended to allow items like an
     * import map to be used with the module graph. The callback takes the string
     * of the module specifier from the referrer and the string URL of the
     * referrer. The callback then returns a resolved URL string specifier. */
    resolve?(specifier: string, referrer: string): string;
}

/**
 * Generate asynchronously an array of documentation nodes for the supplied
 * module.
 *
 * ### Example
 *
 * ```ts
 * import { doc } from "deno_doc";
 *
 * const entries = await doc("https://deno.land/std/fmt/colors.ts");
 *
 * for (const entry of entries) {
 *   console.log(`name: ${entry.name} kind: ${entry.kind}`);
 * }
 * ```
 *
 * @param specifier The URL string of the specifier to document
 * @param options A set of options for generating the documentation
 * @returns A promise that resolves with an array of documentation nodes
 */
function doc(
    specifier: string,
    options: DocOptions = {},
): Promise<Array<DocNode>>;

export default doc;
export { doc };