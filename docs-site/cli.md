# CLI 命令参考

## 版本信息

| 包 | 版本 |
|----|------|
| `ruflo@latest` | 3.7.0-alpha.8 |
| `@claude-flow/cli` | 3.6.10 |
| `@claude-flow/cli-core` | 轻量路径，22.9× 加速 |

## 安装方式

| 路径 | 方式 | 特点 |
|------|------|------|
| **Path A** | Claude Code Plugins | Lite 版本，零文件侵入 |
| **Path B** | `npx ruflo init` | 完整功能：98 agents、60+ commands、30 skills |

---

## Swarm 命令（蜂群协作）

| 命令 | 描述 |
|------|------|
| `swarm init --topology hierarchical --max-agents 8` | 初始化分层拓扑的蜂群，最多 8 个代理 |
| `swarm start --objective "..."` | 启动蜂群并指定目标 |
| `swarm status` | 查看蜂群状态 |
| `swarm stop` | 停止蜂群 |

## Agent 命令（代理管理）

| 命令 | 描述 |
|------|------|
| `agent spawn --type coder --name coder-1` | 生成指定类型的代理 |
| `agent list` | 列出所有活跃代理 |

**代理类型**：`coder`、`tester`、`reviewer`、`architect`、`researcher`、`coordinator`、`security-architect`、`performance-engineer` 等

## Task 命令（任务管理）

| 命令 | 描述 |
|------|------|
| `task create --type implementation --description "..."` | 创建新任务 |
| `task assign TASK_ID --agent AGENT_NAME` | 分配任务给指定代理 |
| `task list` | 列出所有任务 |
| `task status TASK_ID` | 查看任务状态 |
| `task cancel TASK_ID` | 取消任务 |

## Memory 命令（记忆存储）

| 命令 | 描述 |
|------|------|
| `memory store --key "key" --value "value" --namespace patterns` | 存储记忆到命名空间 |
| `memory search --query "search terms"` | 搜索记忆（HNSW 索引，150x-12,500x 加速） |
| `memory list --namespace patterns` | 列出命名空间下的记忆 |
| `memory retrieve --key "key"` | 检索指定 key 的记忆 |

---

## 快速参考

```bash
# 初始化蜂群
npx ruflo swarm init --topology hierarchical --max-agents 8

# 生成代理
npx ruflo agent spawn --type coder --name coder-1

# 启动蜂群
npx ruflo swarm start --objective "构建用户认证模块"

# 创建并分配任务
npx ruflo task create --type implementation --description "实现 OAuth 登录"
npx ruflo task assign TASK_ID --agent coder-1

# 记忆管理
npx ruflo memory store --key "auth-pattern" --value "OAuth 2.0 实现" --namespace patterns
npx ruflo memory search --query "authentication"
```

## 完整命令列表（60+ commands）

| 命令 | 子命令数 | 描述 |
|------|---------|------|
| `init` | 4 | 项目初始化向导、预设、技能、钩子 |
| `agent` | 8 | 代理生命周期管理 |
| `swarm` | 6 | 多代理蜂群协作编排 |
| `memory` | 11 | AgentDB 记忆 + 向量搜索 |
| `mcp` | 9 | MCP 服务器管理与工具执行 |
| `task` | 6 | 任务创建、分配、生命周期 |
| `session` | 7 | 会话状态管理与持久化 |
| `config` | 7 | 配置管理与提供者设置 |
| `workflow` | 6 | 工作流执行与模板管理 |
| `hooks` | 17 | 自学习钩子 + 12 后台工作器 |
| `hive-mind` | 6 | Queen 主导的拜占庭容错共识 |
| `daemon` | 5 | 后台守护进程管理 |
| `neural` | 5 | 神经模式训练 |
| `security` | 6 | 安全扫描与 CVE 修复 |
| `performance` | 5 | 性能基准测试与优化 |
| `providers` | 5 | AI 提供商管理 |
| `plugins` | 5 | 插件管理 |
| `deployment` | 5 | 部署管理 |
| `embeddings` | 4 | 向量嵌入（75x 加速） |
| `claims` | 4 | 基于声明的授权 |
| `doctor` | 1 | 系统诊断与健康检查 |

---

## MCP 工具

通过 MCP（Model Context Protocol）可用的工具包括：

- `mcp__ruv-swarm__swarm_init` - 初始化蜂群
- `mcp__ruv-swarm__agent_spawn` - 生成代理
- `mcp__ruv-swarm__task_create` - 创建任务
- `mcp__memory__store` - 存储记忆
- `mcp__memory__search` - 搜索记忆

---

## 架构说明

| 组件 | 角色 | 说明 |
|------|------|------|
| **CODEX** | 执行器 | 编写代码、运行命令、创建文件 |
| **claude-flow** | 编排器 | 追踪状态、存储记忆、协调任务 |

> **注意**：`claude-flow` 本身不执行代码，它只创建协调记录。实际工作由 Codex 或其他执行代理完成。
