# MCP Server

> Ruflo v3 MCP 服务器 — 314+ 工具，响应时间 <100ms

## Overview

MCP (Model Context Protocol) 服务器提供 314+ 工具，供 Claude Code 和其他客户端使用。

## Quick Start

```typescript
import { createMCPServer } from "@claude-flow/mcp";

const server = createMCPServer({
  port: 3100,
  tools: [
    "memory_store",
    "memory_search",
    "swarm_init",
    "agent_spawn",
    "task_create",
  ],
});

server.listen();
```

## Core Tools

### memory_store

存储记忆条目。

```json
{
  "name": "memory_store",
  "description": "Store a memory entry",
  "input": {
    "key": "string",
    "value": "string",
    "metadata": "object?"
  }
}
```

### memory_search

语义搜索记忆。

```json
{
  "name": "memory_search",
  "description": "Search memories by semantic similarity",
  "input": {
    "query": "string",
    "limit": "number?",
    "threshold": "number?"
  }
}
```

### swarm_init

初始化 Swarm。

```json
{
  "name": "swarm_init",
  "description": "Initialize a new swarm",
  "input": {
    "topology": "hierarchical | mesh",
    "maxAgents": "number?"
  }
}
```

### agent_spawn

启动智能体。

```json
{
  "name": "agent_spawn",
  "description": "Spawn a new agent",
  "input": {
    "type": "string",
    "name": "string?",
    "config": "object?"
  }
}
```

## Performance

| Metric | Value |
|--------|-------|
| Response Time | <100ms |
| Concurrent Requests | 1000+ |
| Tool Count | 314+ |
