# RabbitMQ消息队列

> **AI生成声明**: 本文档由AI辅助生成，旨在提供RabbitMQ消息队列的面试题集合。

RabbitMQ消息队列相关的面试题集合。

## 题目列表

### 1. RabbitMQ基础

#### 1.1 核心概念
- Exchange（交换机）
- Queue（队列）
- Binding（绑定）
- Routing Key（路由键）

#### 1.2 消息模型
- 工作队列模式
- 发布订阅模式
- 路由模式
- 主题模式

### 2. Exchange类型

#### 2.1 Direct Exchange
- 直连交换机
- 路由规则
- 使用场景

#### 2.2 Topic Exchange
- 主题交换机
- 通配符匹配
- 路由键模式

#### 2.3 Fanout Exchange
- 扇出交换机
- 广播模式
- 使用场景

#### 2.4 Headers Exchange
- 头部交换机
- 头部匹配
- 使用场景

### 3. 消息可靠性

- [消息可靠性](/guide/career/interview-preparation/rabbitmq/message-reliability)
  - 生产者确认机制
  - 消费者确认机制
  - 消息持久化
  - 完整可靠性方案

### 4. 高级特性

#### 4.1 死信队列
- [死信队列](/guide/career/interview-preparation/rabbitmq/dead-letter-queue)
  - 死信队列的概念
  - 死信产生的原因
  - 死信队列的配置
  - 使用场景

#### 4.2 延迟队列
- [延迟队列](/guide/career/interview-preparation/rabbitmq/delayed-queue)
  - 基于TTL+死信队列实现
  - 延迟消息插件
  - 使用场景

#### 4.3 消息堆积
- [消息堆积](/guide/career/interview-preparation/rabbitmq/message-accumulation)
  - 消息堆积的原因
  - 监控方法
  - 解决方案

#### 4.4 消息幂等性
- [消息幂等性](/guide/career/interview-preparation/rabbitmq/message-idempotency)
  - 幂等性的概念
  - 实现方式
  - 最佳实践

#### 4.5 消息顺序消费
- [消息顺序消费](/guide/career/interview-preparation/rabbitmq/message-ordering)
  - 顺序消费的场景
  - 实现方式
  - 注意事项

#### 4.6 优先级队列
- 队列优先级
- 消息优先级
- 使用场景

### 5. 集群和高可用

#### 5.1 集群模式
- 普通集群
- 镜像队列
- 高可用配置

#### 5.2 负载均衡
- 队列负载均衡
- 消费者负载均衡

---

> 💡 **提示**: RabbitMQ是功能丰富的消息队列中间件，需要深入理解其交换机类型、消息确认机制和集群配置。

