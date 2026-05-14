# Hooks

> Ruflo v3 Hook 系统 — 17 hooks + 12 background workers

## Hook List

| Hook | 触发时机 | 异步 |
|------|---------|------|
| `pre-task` | 任务执行前 | ✅ |
| `post-task` | 任务完成后 | ✅ |
| `tool-error` | 工具调用错误 | ✅ |
| `agent-spawn` | 智能体启动 | ✅ |
| `agent-despawn` | 智能体销毁 | ✅ |
| `swarm-start` | Swarm 启动 | ✅ |
| `swarm-stop` | Swarm 停止 | ✅ |
| `memory-store` | 记忆存储 | ✅ |
| `memory-retrieve` | 记忆检索 | ✅ |
| `security-violation` | 安全违规 | ✅ |
| `config-change` | 配置变更 | ✅ |

## Registering Hooks

```typescript
import { createHooks } from "@claude-flow/hooks";

const hooks = createHooks();

// 注册 Hook
hooks.register("pre-task", async (ctx) => {
  console.log(`Task ${ctx.taskId} starting`);
  ctx.storage.set("task_start", Date.now());
});

// 注册 Worker
hooks.worker("cleanup", async (ctx) => {
  // 定期清理任务缓存
  await cleanupOldTasks();
});
```

## Built-in Hooks

Ruflo 默认注册以下 hooks：

```typescript
const builtInHooks = {
  "pre-task": [memoryStoreHook, telemetryHook],
  "post-task": [learningHook, telemetryHook],
  "tool-error": [errorHandlerHook],
  "security-violation": [alertHook, blockHook],
};
```
