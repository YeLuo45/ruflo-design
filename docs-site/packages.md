# Packages

> Ruflo v3 monorepo 包清单 — 24+ 原生包

## 1. Core Packages

### @claude-flow/cli

CLI 入口点，提供 26 个命令和 140+ 子命令。

```bash
npx @claude-flow/cli init
npx @claude-flow/cli swarm start
npx @claude-flow/cli memory search "query"
```

| 属性 | 值 |
|------|---|
| 路径 | `v3/@claude-flow/cli/` |
| 命令数 | 26 |
| 子命令数 | 140+ |
| 启动时间 | <500ms |

### @claude-flow/memory

AgentDB + HNSW 向量搜索，Int8 量化减少 50-75% 内存。

```typescript
import { createMemoryStore } from "@claude-flow/memory";

const store = createMemoryStore({
  quantization: "int8",
  hnsw: { efConstruction: 128, M: 16 },
});
```

### @claude-flow/swarm

Swarm 引擎，支持 hierarchical 和 mesh 拓扑。

```typescript
import { createSwarm } from "@claude-flow/swarm";

const swarm = createSwarm({
  topology: "hierarchical",
  maxAgents: 100,
});
```

### @claude-flow/guidance

Governance control plane — 编译、执行、证明、演进。

```typescript
import { createGuidance } from "@claude-flow/guidance";

const guidance = createGuidance({
  compile: true,
  enforce: true,
  prove: true,
});
```

### @claude-flow/hooks

17 个钩子 + 12 个后台 workers。

| Hook | 触发时机 |
|------|---------|
| pre-task | 任务执行前 |
| post-task | 任务完成后 |
| tool-error | 工具调用错误 |
| agent-spawn | 智能体启动 |
| agent-despawn | 智能体销毁 |

### @claude-flow/security

输入验证、路径安全、CVE 修复。

```typescript
import { validateInput, sanitizePath } from "@claude-flow/security";

// 输入验证
const result = validateInput({
  schema: taskSchema,
  data: userInput,
});

// 路径安全
const safePath = sanitizePath(userPath);
```

## 2. MCP & Communication

### @claude-flow/mcp

MCP 服务器，314+ 工具，响应时间 <100ms。

### @claude-flow/providers

LLM Provider 抽象，支持多后端。

| Provider | 状态 |
|----------|------|
| Anthropic | Stable |
| OpenAI | Stable |
| Local | Stable |
| Ollama | Stable |

## 3. Plugins

### @claude-flow/plugins

基础插件系统。

### plugin-agent-federation

跨机器安全通信，联邦学习支持。

### plugin-iot-cognitum

IoT 设备集成（Cognitum 平台）。

## 4. Intelligence

### @claude-flow/embeddings

向量嵌入生成，支持多种模型。

### @claude-flow/neural

神经模式学习，从任务中自动提取模式。

```typescript
import { learnPattern } from "@claude-flow/neural";

await learnPattern({
  context: taskContext,
  outcome: taskResult,
  confidence: 0.95,
});
```

## 5. Utilities

| 包 | 路径 | 用途 |
|----|------|------|
| @claude-flow/shared | `shared/` | 共享类型和工具函数 |
| @claude-flow/agents | `agents/` | 智能体定义和类型 |
| @claude-flow/testing | `testing/` | 测试框架和工具 |
| @claude-flow/performance | `performance/` | 性能监控和优化 |
| @claude-flow/aidefence | `aidefence/` | AI 安全防护 |
| @claude-flow/claims | `claims/` | 声明/证明系统 |
| @claude-flow/deployment | `deployment/` | 部署配置模板 |
| @claude-flow/integration | `integration/` | 第三方集成 |
