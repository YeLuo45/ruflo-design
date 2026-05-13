# Agent 系统文档

> **Ruflo Agent 核心架构** | 基于 Claude Flow V3

---

## 📊 核心数字

| 指标 | 数值 |
|------|------|
| MCP Tools | 314 个 |
| CLI 命令 | 60+ 个 |
| Skills | 30 个 |
| AgentDB Controllers | 19 个 |
| Native Plugins | 21 个 |

---

## 🤖 Agent 类型（16种 + Custom）

### 核心类型

| 类型 | 用途 | 场景 |
|------|------|------|
| `coordinator` | 编排其他 agents | 多 agent 协调任务 |
| `coder` | 编写代码 | 功能实现 |
| `tester` | 编写测试 | 单元测试、集成测试 |
| `reviewer` | 审查代码 | Code Review |
| `architect` | 系统设计 | 架构规划 |
| `researcher` | 分析需求 | 需求调研 |
| `security-architect` | 安全设计 | 安全审计 |
| `performance-engineer` | 性能优化 | 性能调优 |

### 专用类型

| 类型 | 用途 |
|------|------|
| `security-auditor` | 安全审计 |
| `memory-specialist` | 记忆管理 |
| `hierarchical-coordinator` | 层级协调 |
| `mesh-coordinator` | 网状协调 |
| `adaptive-coordinator` | 自适应协调 |
| `byzantine-coordinator` | 拜占庭共识 |
| `raft-manager` | Raft 管理 |
| `gossip-coordinator` | Gossip 协议 |

---

## 🔄 Swarm 协作架构

Swarm 是多 Agent 协作的基本单元，支持多种拓扑结构。

### 拓扑类型

```mermaid
graph LR
    subgraph hierarchical["层级拓扑 (Hierarchical)"]
        C1["Coordinator"]
        A1["Architect"]
        C2["Coder"]
        C3["Tester"]
        R1["Reviewer"]
        C1 --> A1
        A1 --> C2
        A1 --> C3
        C2 --> R1
    end
    
    subgraph mesh["网状拓扑 (Mesh)"]
        M1["Agent 1"]
        M2["Agent 2"]
        M3["Agent 3"]
        M4["Agent 4"]
        M1 <--> M2
        M1 <--> M3
        M2 <--> M4
        M3 <--> M4
    end
```

| 拓扑 | 适用场景 | 特点 |
|------|----------|------|
| `hierarchical` | 团队协作、防漂移 | 上下级管理 |
| `mesh` | 对等协作 | 无中心 |
| `hierarchical-mesh` | 混合模式（V3 推荐） | 兼顾两者 |
| `ring` | 顺序处理 | 流水线 |
| `star` | 中心辐射 | 单点协调 |
| `adaptive` | 动态切换 | 智能拓扑 |

---

## 🔗 协作流程

### 典型开发流程

```mermaid
sequenceDiagram
    participant U as User
    participant CF as Claude-Flow
    participant Coord as Coordinator
    participant Arch as Architect
    participant Coder as Coder
    participant Test as Tester
    participant Review as Reviewer

    U->>CF: 启动 Swarm (hierarchical)
    CF->>Coord: Spawn Coordinator
    CF->>Arch: Spawn Architect
    CF->>Coder: Spawn Coder x2
    CF->>Test: Spawn Tester
    CF->>Review: Spawn Reviewer

    Coord->>Arch: 分析需求，设计架构
    Arch->>Coder: 下发实现任务
    Coder->>Coder: 并行编写代码
    Coder->>Test: 提交代码审查
    Test->>Review: 进行测试
    Review->>Coord: 审查结果汇总
    Coord->>U: 任务完成报告
```

### 消息处理规则

```mermaid
flowchart TD
    A["1 条消息 = 所有相关操作"] --> B["并发/并行执行"]
    B --> C["Task Tool 派生 agents"]
    C --> D["MCP + Task Tool 同一消息"]
    D --> E["maxAgents: 6-8"]
    
    style A fill:#ff6b6b
    style E fill:#4ecdc4
```

---

## 💾 Memory 持久化记忆

跨 session 的持久化记忆系统，支持向量搜索。

```mermaid
graph LR
    A["当前 Session"] -->|存储| M["Memory Store"]
    B["历史 Session"] -->|检索| M
    M -->|向量匹配| C["Pattern 匹配"]
    C -->|score > 0.7| D["使用该模式"]
    C -->|score < 0.7| E["创建新模式"]
```

### Memory 工作流

```
1. BEFORE: memory_search(query="任务关键词")
   → 找到相似模式 (score > 0.7 则使用)

2. COORDINATE: swarm_init(topology="hierarchical")

3. EXECUTE: 实际编写代码/执行命令

4. AFTER: memory_store(key="pattern-x", value="成功经验")
```

---

## 🌐 Federation 跨机器通信

安全的跨机器 Agent 通信机制。

```mermaid
graph TB
    subgraph Machine1["机器 1"]
        A1["Agent A"]
        A2["Agent B"]
    end
    
    subgraph Machine2["机器 2"]
        B1["Agent C"]
        B2["Agent D"]
    end
    
    A1 <-->|Federation 安全通道| B1
    A2 <-->|Federation 安全通道| B2
    B1 <-->|跨机协调| A1
```

---

## 🪝 Hooks 生命周期钩子（17种）

```mermaid
stateDiagram-v2
    [*] --> pre_task: 任务开始前
    pre_task --> executing: 执行中
    executing --> post_task: 任务完成后
    post_task --> reviewing: 审查阶段
    reviewing --> [*]: 流程结束
    
    pre_task --> pre_agent: Agent 启动前
    post_task --> post_agent: Agent 结束后
    
    session_start --> executing
    executing --> session_end
```

| Hook 类型 | 触发时机 |
|-----------|----------|
| `pre-task` | 任务开始前 |
| `post-task` | 任务完成后 |
| `pre-agent` | Agent 启动前 |
| `post-agent` | Agent 结束后 |
| `session-start` | Session 开始 |
| `session-end` | Session 结束 |
| `route` | 路由决策 |
| `worker-dispatch` | Worker 调度 |

---

## 📋 CLI 命令参考

### Swarm 命令

```bash
# 初始化 Swarm
npx claude-flow swarm init --topology hierarchical --max-agents 8

# 启动任务
npx claude-flow swarm start --objective "任务描述" --strategy development

# 查看状态
npx claude-flow swarm status

# 停止 Swarm
npx claude-flow swarm stop
```

### Agent 命令

```bash
# 派生 Agent
npx claude-flow agent spawn --type coder --name coder-1

# 列出 Agents
npx claude-flow agent list

# 查看状态
npx claude-flow agent status AGENT_ID

# 停止 Agent
npx claude-flow agent stop AGENT_ID
```

### Memory 命令

```bash
# 存储
npx claude-flow memory store --key "pattern-x" --value "成功经验" --namespace patterns

# 搜索
npx claude-flow memory search --query "任务关键词"

# 检索
npx claude-flow memory retrieve --key "pattern-x"
```

---

## 🛠️ MCP Tools（314个）

### 协调类

| Tool | 用途 |
|------|------|
| `swarm_init` | 初始化 Swarm |
| `swarm_status` | 查看 Swarm 状态 |
| `agent_spawn` | 注册 Agent 角色 |
| `agent_status` | 查看 Agent 状态 |
| `task_orchestrate` | 多 Agent 任务协调 |

### 记忆类

| Tool | 用途 |
|------|------|
| `memory_search` | 向量搜索 |
| `memory_store` | 存储模式 |
| `memory_retrieve` | 精确检索 |
| `neural_train` | 模式训练 |
| `neural_status` | 学习状态 |

### Hive Mind（高级）

| Tool | 用途 |
|------|------|
| `hive-mind_init` | 拜占庭共识初始化 |
| `hive-mind_spawn` | 派生 Hive Workers |
| `hive-mind_broadcast` | 广播消息 |

---

## 📦 Skills（30个）

| Skill | 用途 |
|-------|------|
| `$swarm-orchestration` | 多 Agent 协调 |
| `$memory-management` | 记忆存储/检索 |
| `$sparc-methodology` | 结构化开发 |
| `$security-audit` | 安全扫描 |
| `$performance-analysis` | 性能分析 |
| `$github-automation` | CI/CD 管理 |
| `$hive-mind` | 拜占庭共识 |
| `$neural-training` | 模式学习 |

---

## ⚙️ 默认配置

| 配置项 | 默认值 |
|--------|--------|
| Topology | `hierarchical` |
| Max Agents | 8 |
| Strategy | `specialized` |
| Consensus | `raft` |
| Memory | `hybrid` |

---

## 🚀 快速开始

### 5-Agent 开发团队

```bash
npx claude-flow swarm init --topology hierarchical --max-agents 8
npx claude-flow agent spawn --type coordinator --name coord-1
npx claude-flow agent spawn --type architect --name arch-1
npx claude-flow agent spawn --type coder --name coder-1
npx claude-flow agent spawn --type coder --name coder-2
npx claude-flow agent spawn --type tester --name tester-1
npx claude-flow agent spawn --type reviewer --name reviewer-1
npx claude-flow swarm start --objective "实现新功能" --strategy development
```

### Bug 修复团队（4 Agents）

```bash
npx claude-flow swarm init --topology hierarchical --max-agents 4
npx claude-flow agent spawn --type coordinator --name lead
npx claude-flow agent spawn --type researcher --name debug
npx claude-flow agent spawn --type coder --name fix
npx claude-flow agent spawn --type tester --name verify
npx claude-flow swarm start --objective "修复 Bug" --strategy development
```

### 安全审计团队（3 Agents）

```bash
npx claude-flow swarm init --topology hierarchical --max-agents 4
npx claude-flow agent spawn --type coordinator --name lead
npx claude-flow agent spawn --type security-architect --name audit
npx claude-flow agent spawn --type reviewer --name review
npx claude-flow swarm start --objective "安全审计" --strategy development
```

---

## 📐 Agent 协作拓扑图

### 完整功能开发流程

```mermaid
graph TD
    Start["开始"] --> Init["swarm_init"]
    Init --> Spawn["agent_spawn x6"]
    
    Spawn --> Coord["Coordinator"]
    Spawn --> Arch["Architect"]
    Spawn --> C1["Coder-1"]
    Spawn --> C2["Coder-2"]
    Spawn --> Test["Tester"]
    Spawn --> Rev["Reviewer"]
    
    Coord --> Arch["分析需求"]
    Arch --> C1["设计 & 实现"]
    Arch --> C2["设计 & 实现"]
    C1 --> Test["测试"]
    C2 --> Test["测试"]
    Test --> Rev["审查"]
    Rev --> End["完成"]
    
    style Start fill:#ff6b6b
    style End fill:#4ecdc4
    style Coord fill:#ffe66d
    style Arch fill:#ffe66d
```

---
