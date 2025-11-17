# Spring事务传播行为和隔离级别

Spring事务管理是Spring框架的核心功能之一，理解事务传播行为和隔离级别对于保证数据一致性至关重要。

## 核心问题

### 事务传播行为（Propagation）

1. **REQUIRED（默认）**：如果存在事务则加入，否则创建新事务
2. **SUPPORTS**：如果存在事务则加入，否则以非事务方式执行
3. **MANDATORY**：必须存在事务，否则抛出异常
4. **REQUIRES_NEW**：总是创建新事务，挂起当前事务
5. **NOT_SUPPORTED**：以非事务方式执行，挂起当前事务
6. **NEVER**：以非事务方式执行，如果存在事务则抛出异常
7. **NESTED**：如果存在事务则嵌套，否则创建新事务

### 事务隔离级别（Isolation）

1. **READ_UNCOMMITTED**：读未提交，最低隔离级别
2. **READ_COMMITTED**：读已提交，避免脏读
3. **REPEATABLE_READ**：可重复读，避免脏读和不可重复读
4. **SERIALIZABLE**：串行化，最高隔离级别，避免所有问题

### MySQL默认隔离级别

- MySQL默认使用**REPEATABLE_READ**
- 通过MVCC（多版本并发控制）实现

## 事务失效场景

1. **方法不是public**
2. **异常被捕获**
3. **异常类型不匹配**
4. **同一个类内部调用**
5. **数据库不支持事务**

## 常见面试题

1. **REQUIRED和REQUIRES_NEW的区别？**
   - REQUIRED：加入现有事务
   - REQUIRES_NEW：创建新事务，独立提交

2. **如何解决事务失效问题？**
   - 使用AspectJ代理
   - 使用编程式事务
   - 避免内部调用

3. **分布式事务如何处理？**
   - 使用Seata
   - 使用TCC模式
   - 使用最终一致性方案

