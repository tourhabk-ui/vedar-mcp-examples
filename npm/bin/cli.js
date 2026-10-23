#!/usr/bin/env node
const { url, config } = require("../index.js");
const c = process.argv[2];
if (c === "url") console.log(url);
else if (c === "claude") console.log(`claude mcp add --transport http vedar ${url}`);
else console.log(JSON.stringify(config, null, 2));
