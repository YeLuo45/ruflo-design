# Guidance

> Ruflo v3 Governance Control Plane — 编译、执行、证明、演进

## Overview

Guidance 是 Ruflo 的治理控制平面，确保智能体行为符合预期。

## Four Phases

### 1. Compile

将自然语言指令编译为可执行计划。

```typescript
const plan = await guidance.compile({
  instruction: "Implement user authentication",
  constraints: ["使用 JWT", "支持 OAuth2"],
});
```

### 2. Enforce

执行时验证计划是否符合约束。

```typescript
const result = await guidance.enforce({
  plan,
  context,
  onViolation: "warn", // warn | block | rollback
});
```

### 3. Prove

生成零知识证明验证执行正确性。

```typescript
const proof = await guidance.prove({
  plan,
  executionTrace,
});
```

### 4. Evolve

根据执行结果优化计划。

```typescript
await guidance.evolve({
  plan,
  feedback: executionResult,
});
```

## Configuration

```typescript
const guidance = createGuidance({
  compile: {
    timeout: 30000,
    maxRetries: 3,
  },
  enforce: {
    strict: true,
    logViolations: true,
  },
  prove: {
    algorithm: "groth16",
  },
});
```
