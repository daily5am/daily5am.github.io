# Kafka消息队列

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Kafka消息队列的面试题集合。

Kafka消息队列相关的面试题集合。

## 题目列表

### 1. Kafka基础

#### 1.1 核心概念
- Topic和Partition
- Producer和Consumer
- Broker和Cluster

#### 1.2 消息模型
- 点对点模型
- 发布订阅模型
- Consumer Group

### 2. Kafka架构

#### 2.1 分区机制
- 分区的目的
- 分区策略
- 分区副本

#### 2.2 消息存储
- 日志段（Log Segment）
- 索引文件
- 消息压缩

### 3. 生产者

#### 3.1 消息发送
- 同步发送和异步发送
- 消息确认机制
- 重试机制

#### 3.2 分区选择
- 分区器（Partitioner）
- 自定义分区策略

### 4. 消费者

#### 4.1 消费模式
- 拉取模式
- 消费位移（Offset）
- 位移提交

#### 4.2 消费者组
- 消费者组的概念
- 重平衡（Rebalance）
- 消费分配策略

### 5. 消息可靠性

- [消息可靠性](/guide/career/interview-preparation/kafka/message-reliability)
  - 生产者确认机制
  - 副本机制
  - 消费者位移提交

### 6. 高级特性

#### 6.1 死信队列
- [死信队列](/guide/career/interview-preparation/kafka/dead-letter-queue)
  - 死信队列的概念
  - 实现方式
  - 使用场景

#### 6.2 延迟队列
- [延迟队列](/guide/career/interview-preparation/kafka/delayed-queue)
  - 基于时间戳实现
  - 使用场景

#### 6.3 消息堆积
- [消息堆积](/guide/career/interview-preparation/kafka/message-accumulation)
  - 消息堆积的原因
  - 监控方法
  - 解决方案

#### 6.4 消息幂等性
- [消息幂等性](/guide/career/interview-preparation/kafka/message-idempotency)
  - 生产者幂等性
  - 消费者幂等性
  - 最佳实践

#### 6.5 消息顺序消费
- [消息顺序消费](/guide/career/interview-preparation/kafka/message-ordering)
  - 顺序消费的场景
  - 实现方式
  - 注意事项

### 7. 性能优化

#### 7.1 吞吐量优化
- 批量发送
- 压缩
- 分区数量

#### 7.2 可靠性保证
- 副本机制
- ISR（In-Sync Replicas）
- 消息持久化

---

> 💡 **提示**: Kafka是高性能的分布式消息队列，需要深入理解其分区机制、副本机制和消费模型。

