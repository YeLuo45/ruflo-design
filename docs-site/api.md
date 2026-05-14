# API Reference

> Ruflo SDK API 参考

## 1. 安装

```bash
npm install @ruflo/sdk
```

## 2. 初始化

### 2.1 基本初始化

```typescript
import { Ruflo } from "@ruflo/sdk";

const ruflo = new Ruflo({
  verbose: true,
});
```

### 2.2 带配置初始化

```typescript
const ruflo = new Ruflo({
  config: {
    swarm: {
      topology: "hierarchical",
      maxAgents: 8,
    },
    memory: {
      embedding: "openai",
    },
  },
});
```

---

## 3. Swarm API

### 3.1 创建 Swarm

```typescript
const swarm = await ruflo.swarm.create({
  topology: "hierarchical",
  maxAgents: 8,
});

console.log(`Swarm ${swarm.id} created`);
```

### 3.2 启动 Swarm

```typescript
await swarm.start({
  objective: "Build a REST API",
  strategy: "development",
});

swarm.on("task:complete", (task) => {
  console.log(`Task ${task.id} completed`);
});
```

### 3.3 停止 Swarm

```typescript
await swarm.stop();
```

### 3.4 Swarm 事件

```typescript
swarm.on("agent:spawn", (agent) => {
  console.log(`Agent ${agent.id} spawned`);
});

swarm.on("agent:death", (agent) => {
  console.log(`Agent ${agent.id} died`);
});

swarm.on("task:start", (task) => {
  console.log(`Task ${task.id} started`);
});

swarm.on("task:complete", (task) => {
  console.log(`Task ${task.id} completed`);
});

swarm.on("error", (error) => {
  console.error(`Swarm error: ${error.message}`);
});
```

---

## 4. Memory API

### 4.1 存储

```typescript
await ruflo.memory.store({
  key: "pattern:auth",
  value: "JWT with refresh tokens",
  namespace: "patterns",
});
```

### 4.2 搜索

```typescript
const results = await ruflo.memory.search({
  query: "authentication patterns",
  namespace: "patterns",
  limit: 10,
});

results.forEach((result) => {
  console.log(`${result.score}: ${result.value}`);
});
```

### 4.3 检索

```typescript
const result = await ruflo.memory.retrieve({
  key: "pattern:auth",
  namespace: "patterns",
});
```

---

## 5. Agent API

### 5.1 生成智能体

```typescript
const agent = await swarm.spawn({
  type: "coder",
  name: "coder-1",
});

console.log(`Agent ${agent.id} spawned`);
```

### 5.2 发送消息

```typescript
await agent.send({
  type: "task",
  payload: {
    description: "Implement user authentication",
  },
});
```

### 5.3 终止智能体

```typescript
await agent.kill();
```

---

## 6. Task API

### 6.1 创建任务

```typescript
const task = await ruflo.task.create({
  type: "implementation",
  description: "Build auth module",
});

console.log(`Task ${task.id} created`);
```

### 6.2 分配任务

```typescript
await task.assignTo(agent);
```

### 6.3 完成任务

```typescript
await task.complete({
  result: "Auth module built successfully",
  outputs: ["src/auth/jwt.ts", "src/auth/middleware.ts"],
});
```

---

## 7. Federation API

### 7.1 连接节点

```typescript
const remoteNode = await ruflo.federation.connect({
  url: "wss://node.example.com:8443",
  token: "federation-token",
});

console.log(`Connected to ${remoteNode.id}`);
```

### 7.2 发送消息

```typescript
await remoteNode.send({
  type: "task",
  payload: { description: "Collaborative task" },
});
```

### 7.3 共享记忆

```typescript
await remoteNode.shareMemory({
  key: "pattern:api-design",
  value: "RESTful with HATEOAS",
  encrypted: true,
});
```

---

## 8. Intelligence API

### 8.1 学习

```typescript
await ruflo.intelligence.learn({
  taskId: "task-123",
  pattern: "test-driven-development",
  outcome: "success",
  metrics: {
    quality: 0.95,
    duration: 180,
  },
});
```

### 8.2 建议

```typescript
const suggestions = await ruflo.intelligence.suggest({
  context: "building-auth-system",
});

suggestions.forEach((s) => {
  console.log(`${s.confidence}: ${s.recommendation}`);
});
```

---

## 9. 类型定义

### 9.1 核心类型

```typescript
interface RufloOptions {
  verbose?: boolean;
  config?: RufloConfig;
}

interface RufloConfig {
  swarm?: SwarmConfig;
  memory?: MemoryConfig;
  federation?: FederationConfig;
}

interface SwarmConfig {
  topology?: "hierarchical" | "mesh" | "star" | "ring";
  maxAgents?: number;
  strategy?: "development" | "research" | "production";
}

interface Swarm {
  id: string;
  topology: SwarmConfig["topology"];
  agents: Agent[];
  status: "created" | "running" | "stopped";
}
```

### 9.2 记忆类型

```typescript
interface MemoryEntry {
  key: string;
  value: string;
  namespace: string;
  metadata?: Record<string, unknown>;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MemorySearchOptions {
  query: string;
  namespace?: string;
  limit?: number;
  threshold?: number;
}
```

---

## 10. 错误处理

### 10.1 错误类型

```typescript
try {
  await swarm.start({ objective: "test" });
} catch (error) {
  if (error instanceof RufloError) {
    console.error(`Ruflo error: ${error.code} - ${error.message}`);
  }
}
```

### 10.2 错误代码

| 代码 | 说明 |
|------|------|
| `SWARM_NOT_FOUND` | Swarm 不存在 |
| `AGENT_NOT_FOUND` | 智能体不存在 |
| `TASK_NOT_FOUND` | 任务不存在 |
| `MEMORY_ERROR` | 记忆操作失败 |
| `FEDERATION_ERROR` | 联邦通信失败 |
| `TIMEOUT` | 操作超时 |