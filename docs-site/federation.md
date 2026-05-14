# Federation

> Ruflo 跨机器安全联邦通信系统

## 1. 概述

Federation 让不同机器上的 Ruflo 智能体安全协作：

- **端到端加密** — 消息全程加密
- **信任验证** — 零信任架构
- **联邦学习** — 跨节点知识共享
- **无数据泄露** — 敏感数据不出本地

## 2. 架构

```
┌──────────────────┐         ┌──────────────────┐
│    Node A        │         │    Node B        │
│  ┌────────────┐  │   TLS   │  ┌────────────┐  │
│  │  Swarm A   │──│◄───────►│──│  Swarm B   │  │
│  └──────┬─────┘  │  E2E    │  └──────┬─────┘  │
│         │       │ 加密     │         │        │
│  ┌──────┴─────┐  │         │  ┌──────┴─────┐  │
│  │   Memory    │  │         │  │   Memory    │  │
│  └────────────┘  │         │  └────────────┘  │
└──────────────────┘         └──────────────────┘
```

## 3. 信任级别

| 级别 | 说明 | 权限 |
|------|------|------|
| L1 | 本地节点 | 完全访问本地资源 |
| L2 | 同一组织 | 共享项目访问 |
| L3 | 合作伙伴 | 受限数据交换 |
| L4 | 公共注册 | 公开接口调用 |

## 4. 节点配置

### 4.1 创建节点

```bash
# 创建新节点
npx ruflo federation node create \
  --name "node-alpha" \
  --port 8443 \
  --trust-level 2
```

### 4.2 连接配置

```json
{
  "federation": {
    "nodeId": "node-alpha",
    "listen": {
      "port": 8443,
      "tls": {
        "cert": "./certs/node.crt",
        "key": "./certs/node.key"
      }
    },
    "encryption": "e2e",
    "trustLevel": 2
  }
}
```

## 5. 安全通信

### 5.1 端到端加密

```typescript
const fed = new Federation({
  encryption: "e2e",
  keyExchange: "x25519",
  cipher: "aes-256-gcm",
});

// 生成密钥对
const keyPair = await fed.generateKeys();

// 加密消息
const encrypted = await fed.encrypt({
  message: sensitiveData,
  recipientPublicKey: remotePublicKey,
});
```

### 5.2 消息签名

```typescript
// 签名消息
const signed = await fed.sign({
  message: data,
  privateKey: localPrivateKey,
});

// 验证签名
const verified = await fed.verify({
  message: data,
  signature: signed.signature,
  publicKey: senderPublicKey,
});
```

## 6. 联邦操作

### 6.1 连接节点

```bash
# 连接远程节点
npx ruflo federation connect \
  --node node-alpha \
  --url "wss://node-alpha.example.com:8443" \
  --token "federation-token"
```

### 6.2 共享任务

```bash
# 分发任务到远程节点
npx ruflo federation share-task \
  --task-id task-123 \
  --to node-alpha \
  --permissions "read,execute"

# 接受共享任务
npx ruflo federation accept-task --task-id remote-task-456
```

### 6.3 联邦记忆

```bash
# 共享记忆片段（加密）
npx ruflo federation share-memory \
  --key "pattern:auth" \
  --to node-alpha \
  --encrypt true

# 拉取远程记忆
npx ruflo federation pull-memory \
  --from node-alpha \
  --key "pattern:api-design"
```

## 7. 权限控制

### 7.1 权限矩阵

| 操作 | L1 | L2 | L3 | L4 |
|------|----|----|----|----|
| 读取记忆 | ✅ | ⚠️ | ❌ | ❌ |
| 写入记忆 | ✅ | ❌ | ❌ | ❌ |
| 执行任务 | ✅ | ⚠️ | ❌ | ❌ |
| 查看状态 | ✅ | ✅ | ⚠️ | ❌ |
| 管理节点 | ✅ | ❌ | ❌ | ❌ |

### 7.2 细粒度权限

```typescript
const permissions = {
  memory: {
    read: ["patterns:*", "context:current"],
    write: ["context:current"],
  },
  tasks: {
    read: ["mine:*", "shared:*"],
    execute: ["mine:*"],
  },
  agents: {
    spawn: false,
    kill: false,
  },
};
```

## 8. 使用场景

### 8.1 跨团队协作

```bash
# 团队 A 共享设计任务
npx ruflo federation share-task \
  --task-id "arch-design-123" \
  --to "team-b-node" \
  --permissions "read"

# 团队 B 完成设计
npx ruflo federation pull-result \
  --task-id "arch-design-123" \
  --from "team-b-node"
```

### 8.2 联邦学习

```bash
# 贡献学习成果（不暴露原始数据）
npx ruflo federation contribute \
  --type "model-updates" \
  --data "encrypted-gradient" \
  --to "federation-hub"

# 聚合全球模型
npx ruflo federation aggregate \
  --from "federation-hub"
```

### 8.3 负载均衡

```bash
# 任务委派到空闲节点
npx ruflo federation delegate \
  --task "build-feature-x" \
  --to "node-with-capacity"

# 检查远程节点状态
npx ruflo federation status --node node-alpha
```