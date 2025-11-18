# 分布式系统设计原则

> **AI生成声明**: 本文档由AI辅助生成，旨在提供分布式系统设计原则的完整指南。

分布式系统设计是高级开发者的核心技能，理解设计原则对于构建高可用系统至关重要。

## 核心问题

### CAP理论

**CAP定理：**
- **C（Consistency）**：一致性
- **A（Availability）**：可用性
- **P（Partition Tolerance）**：分区容错性

**结论：**
- 只能同时满足两个
- 分布式系统必须满足P
- 在C和A之间选择

### BASE理论

- **BA（Basically Available）**：基本可用
- **S（Soft State）**：软状态
- **E（Eventually Consistent）**：最终一致性

### 一致性哈希算法

**原理：**
- 将哈希空间组织成环形
- 节点映射到环上
- 数据映射到最近的节点

**优点：**
- 节点增减影响小
- 负载均衡
- 扩展性好

## 负载均衡策略

1. **轮询（Round Robin）**
2. **加权轮询（Weighted Round Robin）**
3. **最少连接（Least Connections）**
4. **IP哈希（IP Hash）**
5. **一致性哈希（Consistent Hash）**

## 服务治理

### 1. 服务注册与发现

- Eureka
- Consul
- Nacos
- Zookeeper

### 2. 配置中心

- Config Server
- Nacos Config
- Apollo

### 3. 限流降级

- Hystrix
- Sentinel
- Resilience4j

## 常见面试题

1. **如何保证分布式系统的一致性？**
   - 强一致性：使用2PC
   - 最终一致性：使用消息队列
   - 弱一致性：接受延迟

2. **如何设计高可用系统？**
   - 多副本部署
   - 负载均衡
   - 故障转移
   - 限流降级

3. **分布式系统的监控？**
   - 链路追踪：Zipkin、Jaeger
   - 指标监控：Prometheus
   - 日志聚合：ELK

