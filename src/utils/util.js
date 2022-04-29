/**
 * @returns {fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>}
 */
export default async function tryGetFetch() {
    // native impl
    if ("fetch" in globalThis) return globalThis.fetch;

    // fallback
    for (const mod of ["undici", "node-fetch"]) {
        return import(mod).then(res => res.fetch || res.default || res);
    }

    throw new Error("Could not resolve fetch api");
}