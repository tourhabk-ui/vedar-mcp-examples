// npm i @modelcontextprotocol/sdk && npx tsx client.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const client = new Client({ name: "vedar-example", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(new URL("https://vedarai.ru/api/mcp")));
console.log((await client.listTools()).tools.map((t) => t.name));
const r = await client.callTool({ name: "get_tours", arguments: { activity_type: "volcanoes" } });
console.log(JSON.stringify(r.content, null, 2));
await client.close();
