// based on deno graph

export async function load(specifier) {
    const url = new URL(specifier);
    try {
        switch (url.protocol) {
            case "file:": {
                const fs = await import("fs/promises");
                const content = await fs.readFile(url, { encoding: "utf-8" });
                return {
                    kind: "module",
                    specifier,
                    content,
                };
            }
            case "http:":
            case "https:": {
                const _fetchLib = await import("./util.js").then(res => res.default());
                const response = await _fetchLib(String(url), { redirect: "follow" });
                if (response.status !== 200) {
                    // ensure the body is read as to not leak resources
                    await response.arrayBuffer();
                    return undefined;
                }
                const content = await response.text();
                const headers = {};
                for (const [key, value] of response.headers) {
                    headers[key.toLowerCase()] = value;
                }
                return {
                    kind: "module",
                    specifier: response.url,
                    headers,
                    content,
                };
            }
            default:
                return undefined;
        }
    } catch {
        return undefined;
    }
}