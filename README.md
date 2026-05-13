# Ruflo Design

> Ruflo 多智能体编排系统架构设计文档站

## 项目简介

Ruflo（原 Claude Flow）是一个多智能体 AI 编排系统，协调 100+ specialized AI agents across machines, teams, and trust boundaries.

## 文档结构

- [架构分析](./architecture.md) — 6大核心包、3-Tier模型路由、设计原则
- [Agent 系统](./agents.md) — 16种Agent角色、314 MCP工具
- [Swarm 编排](./swarm.md) — hierarchical/mesh拓扑、抗 drift 机制
- [Memory 系统](./memory.md) — AgentDB向量库、HNSW搜索、RVF持久化
- [插件生态](./plugins.md) — 32个插件(core/swarm/autopilot/federation等)
- [CLI 参考](./cli.md) — 60+命令、3种安装路径
- [安全设计](./security.md) — CVE修复、输入验证、路径安全

## 在线访问

https://yeluo45.github.io/ruflo-design/

## 技术栈

- VitePress — 文档渲染
- GitHub Actions — 自动构建部署
- GitHub Pages — 托管
