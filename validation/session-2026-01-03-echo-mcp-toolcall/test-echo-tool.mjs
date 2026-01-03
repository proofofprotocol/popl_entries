#!/usr/bin/env node

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function testEchoServer() {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@muhtalipdede/echo-mcp-server"],
  });

  const client = new Client(
    {
      name: "popl-validator",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  console.log("[1] Connecting to server...");
  await client.connect(transport);
  console.log("[2] Connected");

  console.log("[3] Calling echo_tool with input: 'Hello from POPL validation'");
  const result = await client.callTool({
    name: "echo_tool",
    arguments: {
      input: "Hello from POPL validation",
    },
  });

  console.log("[4] Tool response:");
  console.log(JSON.stringify(result, null, 2));

  await client.close();
  console.log("[5] Connection closed");
}

testEchoServer().catch(console.error);
