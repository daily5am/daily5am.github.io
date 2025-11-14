# Java分布式事务解决方案

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Java生态中分布式事务解决方案的完整指南。

## 🎯 概述

在Java微服务架构中，分布式事务是一个重要挑战。本文档介绍Java生态中主流的分布式事务解决方案。

## 📚 解决方案对比

| 方案 | 模式 | 优点 | 缺点 | 适用场景 |
|------|------|------|------|----------|
| Seata | AT/TCC/Saga/XA | 功能全面、社区活跃 | 性能开销 | 通用场景 |
| LCN | LCN模式 | 简单易用 | 已停止维护 | 简单场景 |
| TCC-Transaction | TCC | 性能好 | 需要手动实现 | 高性能场景 |
| ByteTCC | TCC | 支持Spring | 需要手动实现 | Spring项目 |

## 🔧 Seata

Seata是阿里巴巴开源的分布式事务解决方案。

### AT模式

AT模式是Seata的默认模式，基于数据库undo log实现自动补偿。

#### 配置

```java
// Seata配置
@Configuration
public class SeataConfig {
    @Bean
    public DataSourceProxy dataSourceProxy(DataSource dataSource) {
        return new DataSourceProxy(dataSource);
    }
}

// application.yml
seata:
  enabled: true
  application-id: user-service
  tx-service-group: my_test_tx_group
  config:
    type: nacos
    nacos:
      server-addr: localhost:8848
  registry:
    type: nacos
    nacos:
      server-addr: localhost:8848
```

#### 使用

```java
// 全局事务
@GlobalTransactional
public void transfer(TransferRequest request) {
    accountService.debit(request.getFromAccount(), request.getAmount());
    accountService.credit(request.getToAccount(), request.getAmount());
}

// 本地事务
@Transactional
public void debit(String account, BigDecimal amount) {
    accountMapper.updateBalance(account, amount);
}
```

### TCC模式

TCC模式需要手动实现Try、Confirm、Cancel三个方法。

```java
// TCC接口
public interface AccountTccService {
    @TwoPhaseBusinessAction(
        name = "debit",
        commitMethod = "confirm",
        rollbackMethod = "cancel"
    )
    boolean tryDebit(BusinessActionContext context, 
        String account, BigDecimal amount);
    
    boolean confirm(BusinessActionContext context);
    
    boolean cancel(BusinessActionContext context);
}

// TCC实现
@Service
public class AccountTccServiceImpl implements AccountTccService {
    @Override
    public boolean tryDebit(BusinessActionContext context, 
        String account, BigDecimal amount) {
        // Try: 冻结金额
        accountMapper.freeze(account, amount);
        return true;
    }
    
    @Override
    public boolean confirm(BusinessActionContext context) {
        // Confirm: 扣减金额
        String account = (String) context.getActionContext("account");
        BigDecimal amount = (BigDecimal) context.getActionContext("amount");
        accountMapper.debit(account, amount);
        accountMapper.unfreeze(account, amount);
        return true;
    }
    
    @Override
    public boolean cancel(BusinessActionContext context) {
        // Cancel: 释放冻结金额
        String account = (String) context.getActionContext("account");
        BigDecimal amount = (BigDecimal) context.getActionContext("amount");
        accountMapper.unfreeze(account, amount);
        return true;
    }
}
```

### Saga模式

Saga模式适用于长事务场景。

```java
// Saga状态机
@SagaOrchestrationStart
public class TransferSaga {
    @SagaOrchestrationStart
    public void start(TransferRequest request) {
        // 开始Saga事务
    }
    
    @SagaOrchestrationStep(compensateMethod = "cancelDebit")
    public void debit(String account, BigDecimal amount) {
        accountService.debit(account, amount);
    }
    
    public void cancelDebit(String account, BigDecimal amount) {
        accountService.credit(account, amount);
    }
}
```

## 🔧 LCN

LCN (Lock-Confirm-Notify) 是分布式事务框架。

### 配置

```java
// LCN配置
@Configuration
public class LcnConfig {
    @Bean
    public TxManagerTxUrlService txManagerTxUrlService() {
        return new TxManagerTxUrlServiceImpl();
    }
}
```

### 使用

```java
// LCN事务
@TxTransaction
public void business() {
    serviceA.method();
    serviceB.method();
}
```

## 🔧 TCC-Transaction

TCC-Transaction是纯TCC模式的分布式事务框架。

### 使用

```java
// TCC接口
public interface AccountService {
    @Compensable(
        confirmMethod = "confirmIncrease",
        cancelMethod = "cancelIncrease"
    )
    void increase(Long accountId, BigDecimal amount);
    
    void confirmIncrease(Long accountId, BigDecimal amount);
    
    void cancelIncrease(Long accountId, BigDecimal amount);
}

// 调用
@Compensable
public void transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {
    accountService.increase(toAccountId, amount);
    accountService.decrease(fromAccountId, amount);
}
```

## 🔧 本地消息表

本地消息表是一种简单的最终一致性方案。

```java
// 本地消息表
@Entity
public class LocalTransactionMessage {
    @Id
    private String id;
    private String content;
    private MessageStatus status;
    private LocalDateTime createTime;
}

// 消息发送
@Service
public class MessageService {
    @Transactional
    public void sendMessage(String content) {
        // 1. 执行业务逻辑
        doBusiness();
        
        // 2. 保存消息
        LocalTransactionMessage message = new LocalTransactionMessage();
        message.setContent(content);
        message.setStatus(MessageStatus.PENDING);
        messageRepository.save(message);
    }
    
    @Scheduled(fixedRate = 5000)
    public void processPendingMessages() {
        List<LocalTransactionMessage> messages = 
            messageRepository.findByStatus(MessageStatus.PENDING);
        messages.forEach(this::sendAndUpdate);
    }
}
```

## 📊 方案选择

### 强一致性场景

- **Seata AT模式**: 适合大多数场景
- **Seata XA模式**: 传统数据库事务

### 最终一致性场景

- **Seata Saga模式**: 长事务、业务流程
- **Seata TCC模式**: 需要精确控制
- **本地消息表**: 简单场景

### 高性能场景

- **TCC-Transaction**: 纯TCC实现，性能好
- **本地消息表**: 异步处理，性能好

## 💡 最佳实践

1. **避免分布式事务**: 通过设计尽量避免分布式事务
2. **选择合适的模式**: 根据业务场景选择事务模式
3. **补偿机制**: 设计完善的补偿逻辑
4. **幂等性**: 保证操作幂等性
5. **监控告警**: 监控事务执行状态

## 📖 学习资源

- [Seata官方文档](https://seata.io/)
- [TCC-Transaction](https://github.com/changmingxie/tcc-transaction)
- [分布式事务最佳实践](https://github.com/seata/seata)

## 💡 下一步

- [分布式事务理论](./transaction) - 2PC、3PC、Saga、TCC等
- [Spring Cloud](./java-spring-cloud) - Spring Cloud微服务生态
- [服务治理](./java-governance) - 限流、熔断、降级

---

*最后更新时间: 2025-01-20*



