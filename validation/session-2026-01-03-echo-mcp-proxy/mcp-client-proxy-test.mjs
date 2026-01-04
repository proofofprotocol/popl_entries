#!/usr/bin/env node
/**
 * MCP Client for testing proofscan proxy mode
 * Connects to proofscan proxy server via stdio
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  console.log('=== MCP Client → Proofscan Proxy Test ===\n');
  
  const startTime = Date.now();
  
  // Create client that connects to proofscan proxy via stdio
  console.log('1. Starting proofscan proxy transport...');
  
  const transport = new StdioClientTransport({
    command: 'npx',
    args: [
      'proofscan@latest',
      'proxy',
      'start',
      '--connectors',
      'echo-mcp',
      '--timeout',
      '60'
    ]
  });
  
  const client = new Client({
    name: 'mcp-proxy-validation-client',
    version: '1.0.0'
  }, {
    capabilities: {
      tools: {}
    }
  });
  
  console.log('2. Connecting client to proxy...');
  await client.connect(transport);
  console.log('   ✓ Connected\n');
  
  const initTime = Date.now();
  console.log(`   Initialize latency: ${initTime - startTime}ms\n`);
  
  // List available tools through proxy
  console.log('3. Listing tools through proxy...');
  const listStartTime = Date.now();
  const toolsList = await client.listTools();
  const listTime = Date.now() - listStartTime;
  
  console.log(`   ✓ Found ${toolsList.tools.length} tool(s):`);
  toolsList.tools.forEach(tool => {
    console.log(`     - ${tool.name}: ${tool.description || 'No description'}`);
  });
  console.log(`   List latency: ${listTime}ms\n`);
  
  // Find echo_tool (may be prefixed with connector name in proxy mode)
  const echoTool = toolsList.tools.find(t => 
    t.name === 'echo_tool' || t.name === 'echo-mcp__echo_tool'
  );
  
  if (!echoTool) {
    throw new Error('echo_tool not found in proxy tools list');
  }
  
  console.log(`4. Calling tool: ${echoTool.name}`);
  const callStartTime = Date.now();
  
  const testInput = 'POPL proxy mode validation test';
  console.log(`   Input: "${testInput}"`);
  
  const result = await client.callTool({
    name: echoTool.name,
    arguments: {
      input: testInput
    }
  });
  
  const callTime = Date.now() - callStartTime;
  
  console.log(`   Output: "${result.content[0].text}"`);
  console.log(`   Call latency: ${callTime}ms\n`);
  
  // Verify output
  const expectedOutput = `Echo: ${testInput}`;
  const actualOutput = result.content[0].text;
  
  if (actualOutput === expectedOutput) {
    console.log('✓ Tool call SUCCESS: Output matches expected value\n');
  } else {
    console.log(`✗ Tool call FAILED: Expected "${expectedOutput}", got "${actualOutput}"\n`);
  }
  
  // Close connection
  console.log('5. Closing connection...');
  await client.close();
  
  const totalTime = Date.now() - startTime;
  console.log(`   ✓ Connection closed\n`);
  console.log(`=== Test Complete (${totalTime}ms total) ===`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
