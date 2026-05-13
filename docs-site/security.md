# 安全设计

## 概述

Ruflo 安全模块 `@claude-flow/security` 提供全面的安全保障，涵盖 CVE 修复、输入验证、路径安全和凭证管理。

## 核心安全能力

### @claude-flow/security 模块

| 功能 | 描述 | 关键类/函数 |
|------|------|-------------|
| **CVE 修复** | 自动修复已知漏洞 | `PasswordHasher`, `CredentialGenerator` |
| **输入验证** | 系统边界验证，所有外部输入必须验证 | `InputValidator`, `sanitizePath` |
| **路径安全** | 防止路径遍历和符号链接攻击 | `PathValidator`, `createProjectPathValidator` |
| **安全命令执行** | 白名单命令执行，防止注入攻击 | `SafeExecutor` |
| **密码哈希** | bcrypt 安全哈希（12+ 轮） | `PasswordHasher` |
| **凭证生成** | 加密安全的 API Key 和凭证生成 | `CredentialGenerator` |

### CVE 修复清单

| CVE ID | 描述 | 修复方案 |
|--------|------|----------|
| **CVE-2** | 弱密码哈希 | 使用 bcrypt（12+ 轮） |
| **CVE-3** | 硬编码凭证 | 运行时从环境变量读取 |
| **HIGH-1** | 命令注入 | 白名单命令执行 |
| **HIGH-2** | 路径遍历 | `PathValidator` 验证 |

## 代码规范

### 关键安全规则（AGENTS.md）

```
⛔ 严格禁止：
- NEVER commit secrets（绝不提交密钥）
- NEVER commit credentials（绝不提交凭证）
- NEVER commit .env files（绝不提交 .env 文件）

✅ 必须执行：
- 必须验证所有外部输入（Must validate all external input）
```

### 输入验证原则

所有输入必须在系统边界进行验证：

```typescript
import { InputValidator, sanitizePath } from '@claude-flow/security';

// 验证输入
const validator = new InputValidator();
const result = validator.validate(input);

// 路径清理
const safePath = sanitizePath(userInput);
```

## Federation 安全架构

### 零信任安全模型

Ruflo Federation 采用零信任（Zero-Trust）安全架构：

- **跨信任边界安全通信**：使用 Ed25519 签名验证
- **不泄露数据**：端到端加密，数据不外泄
- **共识路由**：基于共识的任务路由，防止单点故障

### 安全特性

| 特性 | 描述 |
|------|------|
| **Ed25519 签名** | 使用 `@noble/ed25519` 进行真实签名/验证 |
| **Agent Handoff 控制** | 严格权限控制 `['federation:write', 'federation:spawn']` |
| **预算熔断器** | Per-call budget circuit breaker (ADR-097) |
| **Spend Reporter** | 命名空间路由的花费追踪 `namespace=federation-spend` |

## BYOK（Bring Your Own Key）

### 自带 API Key

Ruflo 支持用户自带 API Key，凭证不存储在源代码中：

```typescript
// 运行时从环境变量读取
const security = createSecurityModule({
  hmacSecret: process.env.HMAC_SECRET!,
  bcryptRounds: 12,
  allowedCommands: ['git', 'npm', 'node']
});
```

### 凭证管理规范

```
✅ 正确做法：
- API Key 存储在 .env 文件
- .env 文件加入 .gitignore
- 运行时通过 process.env 读取

❌ 错误做法：
- 硬编码 API Key
- 将凭证提交到 Git
- 在注释中写密钥
```

## 安全审计

### 审计工具

```bash
# 运行安全审计
npx @claude-flow/security audit --platform linux
npx @claude-flow/security audit --platform darwin
npx @claude-flow/security audit --platform windows
```

### 审计状态

审计状态存储在 `.claude-flow/security/audit-status.json`

## 相关模块

| 模块 | 路径 | 用途 |
|------|------|------|
| `@claude-flow/security` | `v3/@claude-flow/security/` | 安全核心模块 |
| `@claude-flow/shared` | `v3/@claude-flow/shared/` | 共享类型和工具 |
| `@claude-flow/swarm` | `v3/@claude-flow/swarm/` | Swarm 协调（安全 Agent 生成） |

## 安全常量

| 常量 | 值 | 说明 |
|------|-----|------|
| `MIN_BCRYPT_ROUNDS` | 12 | 最小 bcrypt 轮数 |
| `MAX_BCRYPT_ROUNDS` | 14 | 最大 bcrypt 轮数 |
| `MIN_PASSWORD_LENGTH` | 8 | 最小密码长度 |
| `MAX_PASSWORD_LENGTH` | 72 | 最大密码长度（bcrypt 限制） |
| `DEFAULT_TOKEN_EXPIRATION` | 3600 | Token 默认过期时间（1小时） |
| `DEFAULT_SESSION_EXPIRATION` | 86400 | 会话默认过期时间（24小时） |
