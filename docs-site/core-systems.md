# Core Systems

> Ruflo 核心子系统详解

## 1. Swarm Engine

### 1.1 Swarm 类型

```typescript
type SwarmTopology = "hierarchical" | "mesh" | "star" | "ring";

interface SwarmConfig {
  id: string;
  topology: SwarmTopology;
  maxAgents: number;
  strategy: "development" | "research" | "production";
}
```

### 1.2 创建 Swarm

```bash
# 初始化 swarm
npx ruflo swarm init --topology hierarchical --max-agents 8

# 启动 swarm
npx ruflo swarm start --objective "Build REST API" --strategy development
```

### 1.3 智能体类型

| 类型 | 用途 | 能力 |
|------|------|------|
| `coordinator` | 协调其他智能体 | 任务分配、进度跟踪 |
| `coder` | 编写代码 | 文件操作、测试生成 |
| `tester` | 编写测试 | 覆盖率分析、测试执行 |
| `reviewer` | 代码审查 | 质量评估、安全扫描 |
| `architect` | 系统设计 | 架构决策、模式推荐 |
| `researcher` | 需求分析 | 调研、方案评估 |
| `security-architect` | 安全设计 | 威胁建模、审计 |
| `performance-engineer` | 性能优化 | Profiling、基准测试 |

## 2. Memory System

### 2.1 记忆类型

| 类型 | 说明 | 持久化 |
|------|------|--------|
| `episodic` | 任务片段记忆 | 短期 |
| `semantic` | 语义知识记忆 | 长期向量存储 |
| `procedural` | 技能/模式记忆 | 长期 |
| `working` | 当前任务上下文 | 会话内 |

### 2.2 记忆操作

```bash
# 存储记忆
npx ruflo memory store --key "pattern-auth" --value "JWT + refresh token" --namespace patterns

# 搜索记忆
npx ruflo memory search --query "authentication patterns"

# 列出记忆
npx ruflo memory list --namespace patterns

# 检索记忆
npx ruflo memory retrieve --key "pattern-auth"
```

### 2.3 RAG 配置

```typescript
const ragConfig = {
  embedding: {
    provider: "openai",
    model: "text-embedding-3-small",
    dimensions: 1536,
  },
  retrieval: {
    topK: 10,
    similarityThreshold: 0.7,
    rerank: true,
  },
  indexing: {
    chunkSize: 512,
    overlap: 50,
  },
};
```

## 3. Agent DB (Vector Store)

### 3.1 向量数据库

```typescript
import { AgentDB } from "@ruflo/agentdb";

const db = new AgentDB({
  provider: "sqlite",
  dimension: 1536,
});

// 存储向量
await db.insert({
  id: "doc-1",
  embedding: await embed("Ruflo architecture"),
  metadata: { source: "docs", type: "architecture" },
});

// 相似性搜索
const results = await db.search({
  embedding: await embed("multi-agent orchestration"),
  topK: 5,
});
```

## 4. RuVector

### 4.1 GPU 加速搜索

```typescript
import { RuVector } from "ruvector";

const rv = new RuVector({
  dimension: 768,
  metric: "cosine",
  gpu: true,
});

// 批量插入
await rv.add(embeddings);

// 高性能搜索
const result = await rv.search(queryEmbedding, { topK: 10 });
```

## 5. Intelligence System

### 5.1 自学习

```typescript
const intelligence = new Intelligence({
  learnFromSuccess: true,
  learnFromFailure: true,
  minConfidence: 0.8,
});

// 从任务中学习
await intelligence.learn({
  taskId: "task-123",
  pattern: "test-driven-development",
  outcome: "success",
  metrics: { duration: 120, quality: 0.95 },
});

// 获取建议
const suggestions = await intelligence.suggest({
  context: "writing-auth-module",
  history: await memory.search("auth patterns"),
});
```

## 6. Goals System

### 6.1 目标管理

```typescript
const goals = new GoalsManager();

const goal = await goals.create({
  title: "Build E-commerce Platform",
  description: "Multi-vendor marketplace with payments",
  milestones: [
    { title: "Auth System", done: false },
    { title: "Product Catalog", done: false },
    { title: "Payment Integration", done: false },
    { title: "Order Management", done: false },
  ],
  progress: 0,
});

// 更新进度
await goals.updateProgress(goal.id, { milestone: 1 });
```

---

## 7. Federation System

### 7.1 联邦通信

```typescript
import { Federation } from "@ruflo/federation";

const fed = new Federation({
  nodeId: "node-1",
  encryption: "e2e",
  trustLevel: 2,
});

// 连接远程节点
await fed.connect("wss://remote-node:8443", {
  token: "federation-token",
 证书: "node-cert",
});

// 安全发送消息
await fed.send({
  to: "remote-node",
  message: { type: "task", payload: {...} },
  encrypted: true,
});
```

## 8. Hooks System

### 8.1 Hook 类型

| Hook | 时机 | 用途 |
|------|------|------|
| `pre-task` | 任务执行前 | 验证、准备 |
| `post-task` | 任务完成后 | 学习、记录 |
| `tool-call` | 工具调用前 | 权限检查 |
| `tool-error` | 工具错误时 | 错误处理 |
| `agent-spawn` | 智能体创建时 | 配置验证 |
| `swarm-start` | Swarm 启动时 | 初始化 |
| `swarm-stop` | Swarm 停止时 | 清理 |

### 8.2 Hook 实现

```typescript
// .ruflo/hooks.ts
export const hooks = {
  "pre-task": async (ctx) => {
    console.log(`Starting task: ${ctx.taskId}`);
    return { continue: true };
  },

  "post-task": async (ctx) => {
    await memory.store({
      key: `result:${ctx.taskId}`,
      value: ctx.result,
    });
    await intelligence.learn(ctx);
  },

  "tool-error": async (ctx) => {
    await alert.notify({
      type: "tool_error",
      tool: ctx.toolName,
      error: ctx.error.message,
    });
  },
};
```