# Plugin Authoring

> 创建和发布 Ruflo 插件

## 1. 插件结构

```
ruflo-plugin-example/
├── SKILL.md           # 技能定义
├── src/
│   ├── index.ts       # 入口点
│   ├── commands/      # 命令
│   ├── skills/        # 技能
│   └── hooks/         # Hooks
├── package.json
└── README.md
```

## 2. 插件定义

### 2.1 package.json

```json
{
  "name": "ruflo-example",
  "version": "1.0.0",
  "ruflo": {
    "plugins": ["ruflo-core"]
  },
  "commands": [
    {
      "name": "example",
      "description": "Example command"
    }
  ]
}
```

### 2.2 SKILL.md

```markdown
---
name: ruflo-example
description: Example Ruflo plugin
version: 1.0.0
---

# Ruflo Example

This is an example plugin.
```

## 3. 入口点

### 3.1 index.ts

```typescript
import type { RufloPlugin } from "@ruflo/types";

export default {
  name: "ruflo-example",
  version: "1.0.0",

  // 插件初始化
  async setup(api) {
    console.log("Example plugin loaded");

    // 注册命令
    api.registerCommand({
      name: "example",
      handler: async (args) => {
        console.log("Example command:", args);
      },
    });

    // 注册技能
    api.registerSkill({
      name: "example-skill",
      handler: async (ctx) => {
        return { result: "skill executed" };
      },
    });

    // 注册 Hook
    api.registerHook({
      name: "pre-task",
      handler: async (ctx) => {
        console.log("Task starting:", ctx.taskId);
      },
    });
  },

  // 插件卸载
  async teardown() {
    console.log("Example plugin unloaded");
  },
} satisfies RufloPlugin;
```

## 4. 命令

### 4.1 定义命令

```typescript
api.registerCommand({
  name: "greet",
  description: "Greet someone",
  options: [
    {
      name: "name",
      type: "string",
      required: true,
      description: "Name to greet",
    },
  ],

  async handler(args) {
    console.log(`Hello, ${args.name}!`);
  },
});
```

### 4.2 使用命令

```bash
ruflo example greet --name "World"
```

## 5. 技能

### 5.1 定义技能

```typescript
api.registerSkill({
  name: "analyze-code",
  description: "Analyze code quality",

  async execute(ctx) {
    const { file } = ctx.params;

    return {
      quality: await analyzeQuality(file),
      suggestions: await generateSuggestions(file),
    };
  },
});
```

### 5.2 调用技能

```bash
ruflo skill run analyze-code --file src/index.ts
```

## 6. Hooks

### 6.1 可用 Hooks

| Hook | 时机 |
|------|------|
| `pre-task` | 任务执行前 |
| `post-task` | 任务完成后 |
| `pre-agent` | 智能体创建前 |
| `post-agent` | 智能体创建后 |
| `tool-call` | 工具调用前 |
| `tool-error` | 工具调用错误 |

### 6.2 Hook 实现

```typescript
api.registerHook({
  name: "pre-task",
  async handler(ctx) {
    // 验证
    if (!ctx.task) {
      throw new Error("No task provided");
    }

    // 记录
    console.log(`[Hook] Task ${ctx.taskId} starting`);

    // 返回修改后的上下文
    return {
      ...ctx,
      metadata: {
        ...ctx.metadata,
        hookApplied: true,
      },
    };
  },
});
```

## 7. 测试

### 7.1 测试框架

```typescript
import { describe, it, expect } from "@ruflo/test";

describe("ruflo-example", () => {
  it("should register command", async () => {
    const api = createTestAPI();
    await api.loadPlugin(examplePlugin);

    expect(api.hasCommand("example")).toBe(true);
  });

  it("should execute command", async () => {
    const api = createTestAPI();
    await api.loadPlugin(examplePlugin);

    const result = await api.executeCommand("example", { args: "test" });
    expect(result).toBeDefined();
  });
});
```

## 8. 发布

### 8.1 发布到市场

```bash
# 登录
ruflo plugin login

# 发布
ruflo plugin publish --path ./ruflo-plugin-example

# 更新
ruflo plugin update ruflo-example@1.0.1
```

### 8.2 版本管理

```bash
# 1.0.0 -> 1.0.1 (patch)
ruflo plugin version bump --patch

# 1.0.0 -> 1.1.0 (minor)
ruflo plugin version bump --minor

# 1.0.0 -> 2.0.0 (major)
ruflo plugin version bump --major
```

## 9. 最佳实践

### 9.1 命名

- 插件名：`ruflo-<name>`
- 命令名：`<name>`
- 技能名：`<name>-skill`

### 9.2 错误处理

```typescript
async setup(api) {
  try {
    // 初始化逻辑
  } catch (error) {
    console.error("Failed to load plugin:", error);
    throw error; // 重新抛出让 Ruflo 知道
  }
}
```

### 9.3 资源清理

```typescript
async teardown() {
  // 清理定时器
  clearInterval(this.interval);

  // 关闭连接
  await this.db.close();

  // 清理文件
  await fs.rm(this.tempDir, { recursive: true });
}
```