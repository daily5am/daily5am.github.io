# 分布式事务

> **AI生成声明**: 本文档由AI辅助生成，旨在提供分布式事务解决方案的完整指南。

## 🎯 概述

分布式事务是在分布式系统中，跨越多个数据库或服务的事务操作。由于网络延迟、节点故障等因素，分布式事务比本地事务复杂得多。

## 📚 核心理论

### ACID特性

在分布式环境中，ACID特性难以完全保证：

- **A (Atomicity)**: 原子性 - 全部成功或全部失败
- **C (Consistency)**: 一致性 - 数据保持一致
- **I (Isolation)**: 隔离性 - 事务间相互隔离
- **D (Durability)**: 持久性 - 提交后数据持久化

### 分布式事务挑战

- **网络延迟**: 网络通信延迟
- **节点故障**: 部分节点可能故障
- **数据一致性**: 跨节点数据一致性
- **性能影响**: 分布式事务影响性能

## 🔧 事务模式

### 两阶段提交 (2PC)

2PC是最经典的分布式事务协议。

#### 阶段

1. **准备阶段 (Prepare)**: 协调者询问所有参与者是否可以提交
2. **提交阶段 (Commit)**: 协调者根据响应决定提交或回滚

#### 缺点

- **阻塞**: 需要等待所有节点响应
- **单点故障**: 协调者故障影响整个事务
- **数据不一致**: 网络分区可能导致数据不一致

#### Java实现

```java
// 2PC协调者
public class TwoPhaseCommitCoordinator {
    private List<Participant> participants;
    
    public boolean commit(Transaction transaction) {
        // Phase 1: Prepare
        List<Boolean> responses = new ArrayList<>();
        for (Participant p : participants) {
            responses.add(p.prepare(transaction));
        }
        
        // Phase 2: Commit or Rollback
        if (responses.stream().allMatch(r -> r)) {
            participants.forEach(p -> p.commit(transaction));
            return true;
        } else {
            participants.forEach(p -> p.rollback(transaction));
            return false;
        }
    }
}
```

### 三阶段提交 (3PC)

3PC在2PC基础上增加了超时机制。

#### 阶段

1. **CanCommit**: 询问是否可以提交
2. **PreCommit**: 预提交，执行事务
3. **DoCommit**: 执行提交

#### 改进

- **减少阻塞**: 增加超时机制
- **提高可用性**: 部分节点故障不影响

### Saga模式

Saga通过补偿事务实现最终一致性。

#### 类型

- **编排式 (Choreography)**: 每个服务负责自己的事务和补偿
- **编排式 (Orchestration)**: 协调者负责编排事务和补偿

#### Java实现

```java
// Saga编排器
public class SagaOrchestrator {
    public void execute(List<SagaStep> steps) {
        List<SagaStep> executed = new ArrayList<>();
        try {
            for (SagaStep step : steps) {
                step.execute();
                executed.add(step);
            }
        } catch (Exception e) {
            // 补偿已执行的步骤
            Collections.reverse(executed);
            executed.forEach(SagaStep::compensate);
        }
    }
}
```

### TCC模式

TCC (Try-Confirm-Cancel) 通过三个阶段实现分布式事务。

#### 阶段

1. **Try**: 尝试执行，预留资源
2. **Confirm**: 确认执行，提交资源
3. **Cancel**: 取消执行，释放资源

#### Java实现

```java
// TCC接口
public interface TccService {
    @Tcc
    void tryMethod();
    
    void confirm();
    
    void cancel();
}
```

### 本地消息表

通过本地消息表保证最终一致性。

```java
// 本地消息表
@Entity
public class LocalMessage {
    @Id
    private String id;
    private String content;
    private MessageStatus status;
    private LocalDateTime createTime;
}

// 消息发送服务
@Service
public class MessageService {
    @Transactional
    public void sendMessage(String content) {
        // 1. 执行业务逻辑
        doBusiness();
        
        // 2. 保存消息到本地表
        LocalMessage message = new LocalMessage();
        message.setContent(content);
        message.setStatus(MessageStatus.PENDING);
        messageRepository.save(message);
    }
    
    @Scheduled(fixedRate = 5000)
    public void processPendingMessages() {
        // 定时处理待发送消息
        List<LocalMessage> messages = messageRepository
            .findByStatus(MessageStatus.PENDING);
        messages.forEach(this::sendAndUpdate);
    }
}
```

## 🚀 Java生态解决方案

### Seata

Seata是阿里巴巴开源的分布式事务解决方案。

#### 模式

- **AT模式**: 自动补偿，基于数据库undo log
- **TCC模式**: 手动补偿
- **Saga模式**: 长事务解决方案
- **XA模式**: 基于XA协议

#### 使用示例

```java
// Seata AT模式
@GlobalTransactional
public void transfer(TransferRequest request) {
    accountService.debit(request.getFromAccount(), request.getAmount());
    accountService.credit(request.getToAccount(), request.getAmount());
}
```

### LCN

LCN (Lock-Confirm-Notify) 分布式事务框架。

```java
// LCN事务
@TxTransaction
public void business() {
    serviceA.method();
    serviceB.method();
}
```

## 📊 事务选择指南

### 强一致性场景

- **2PC/3PC**: 金融、支付等强一致性要求
- **XA事务**: 传统数据库事务

### 最终一致性场景

- **Saga**: 长事务、业务流程
- **TCC**: 需要精确控制的事务
- **本地消息表**: 异步场景

## 💡 最佳实践

1. **避免分布式事务**: 尽量通过设计避免分布式事务
2. **选择合适的模式**: 根据业务场景选择事务模式
3. **补偿机制**: 设计完善的补偿逻辑
4. **幂等性**: 保证操作幂等性
5. **监控告警**: 监控事务执行状态

## 📖 学习资源

- [Seata官方文档](https://seata.io/)
- 《分布式系统事务处理》
- [分布式事务最佳实践](https://github.com/seata/seata)

---

*最后更新时间: 2025-01-20*



