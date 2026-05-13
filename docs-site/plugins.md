# Ruflo 插件系统

Ruflo 提供 32 个 Claude Code 插件，涵盖核心协调、记忆知识、智能学习等多个领域。

## 安装方式

**Path A — Claude Code Plugins：**

```bash
/plugin marketplace add ruvnet/ruflo
/plugin install ruflo-core@ruflo
/plugin install ruflo-swarm@ruflo
```

## 插件分类总览

### 1. Core & Orchestration（核心与编排）

| 插件 | 描述 |
|------|------|
| [ruflo-core](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-core) | 基础插件 — MCP server、health checks、plugin discovery |
| [ruflo-swarm](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-swarm) | 多 Agent 协作团队 — swarm topologies、Monitor streaming |
| [ruflo-autopilot](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-autopilot) | Agent 自主循环运行 — autonomous /loop task completion |
| [ruflo-loop-workers](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-loop-workers) | 定时后台任务 — 12 background workers via /loop or CronCreate |
| [ruflo-workflows](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-workflows) | 可复用多步骤任务模板 — parallel execution、branching |
| [ruflo-federation](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-federation) | 跨机器安全协作 — zero-trust cross-installation federation |

### 2. Memory & Knowledge（记忆与知识）

| 插件 | 描述 |
|------|------|
| [ruflo-agentdb](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-agentdb) | 快速向量数据库 — HNSW vector search (150x-12,500x faster) |
| [ruflo-rag-memory](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-rag-memory) | 混合搜索、图跳、多样性排序 — hybrid search、Graph RAG、MMR |
| [ruflo-rvf](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-rvf) | 跨 session 记忆保存恢复 — portable RVF memory format |
| [ruflo-ruvector](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-ruvector) | GPU加速搜索 — FlashAttention-3、Graph RAG、103 tools |
| [ruflo-knowledge-graph](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-knowledge-graph) | 实体关系图构建遍历 — entity extraction、pathfinder traversal |

### 3. Intelligence & Learning（智能与学习）

| 插件 | 描述 |
|------|------|
| [ruflo-intelligence](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-intelligence) | 智能增强 — SONA neural patterns、trajectory learning |
| [ruflo-adr](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-adr) | 架构决策记录 — ADR lifecycle、compliance checking |
| [ruflo-neural](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-neural-trader) | 神经模式学习 — LSTM/Transformer models、Rust/NAPI engine |

### 4. Ecosystem（生态工具）

| 插件 | 描述 |
|------|------|
| [ruflo-browser](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-browser) | 浏览器自动化 — Playwright browser automation and testing |
| [ruflo-cost-tracker](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-cost-tracker) | 成本追踪 — token usage tracking、budget alerts |
| [ruflo-docs](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-docs) | 文档生成 — doc generation、drift detection、API docs |
| [ruflo-goals](https://github.com/ruvnet/ruflo/tree/main/plugins/ruflo-goals) | 目标管理 — GOAP planning、deep research、horizon tracking |

## 推荐组合

| 使用场景 | 推荐插件组合 |
|----------|-------------|
| 特性开发 | `ruflo-core` + `ruflo-swarm` + `ruflo-testgen` + `ruflo-ddd` |
| 安全审计 | `ruflo-core` + `ruflo-security-audit` + `ruflo-aidefence` |
| 架构设计 | `ruflo-core` + `ruflo-adr` + `ruflo-ddd` + `ruflo-sparc` |
| 深度研究 | `ruflo-core` + `ruflo-goals` + `ruflo-rag-memory` + `ruflo-intelligence` |
| 向量搜索 | `ruflo-core` + `ruflo-ruvector` + `ruflo-rag-memory` + `ruflo-knowledge-graph` |

## 插件结构

每个插件遵循 Claude Code 插件规范：

```
ruflo-<name>/
  .claude-plugin/plugin.json    # 插件清单
  agents/<name>.md              # Agent 定义
  commands/<name>.md            # CLI 命令映射
  skills/<name>/SKILL.md        # 交互技能
  README.md                     # 插件文档
```

## 验证插件

```bash
claude plugin validate plugins/ruflo-<name>
```
