# Hadoop生态系统

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Hadoop生态系统的完整指南。

Hadoop是大数据领域的基础框架，理解Hadoop生态系统对于掌握大数据技术至关重要。

## 核心问题

### Hadoop核心组件

1. **HDFS（Hadoop Distributed File System）**
   - 分布式文件系统
   - 高容错性
   - 适合大文件存储

2. **MapReduce**
   - 分布式计算框架
   - 批处理模型
   - 适合离线分析

3. **YARN（Yet Another Resource Negotiator）**
   - 资源管理器
   - 统一资源调度
   - 支持多种计算框架

### Hadoop生态系统

- **Hive**：数据仓库工具，SQL on Hadoop
- **HBase**：NoSQL数据库，列式存储
- **Spark**：内存计算框架
- **Flink**：流处理框架
- **Pig**：数据流处理语言
- **Sqoop**：数据导入导出工具
- **Flume**：日志收集工具
- **Kafka**：消息队列（已单独介绍）

## HDFS架构

### 核心组件

1. **NameNode**
   - 管理文件系统命名空间
   - 存储元数据
   - 单点故障（可通过HA解决）

2. **DataNode**
   - 存储实际数据
   - 定期向NameNode报告
   - 数据块复制

3. **SecondaryNameNode**
   - 辅助NameNode
   - 合并fsimage和edits
   - 非高可用方案

### 数据存储

- **块（Block）**：默认128MB
- **副本（Replication）**：默认3个副本
- **机架感知**：优化数据分布

## MapReduce原理

### 计算模型

1. **Map阶段**
   - 输入：键值对
   - 处理：并行处理
   - 输出：中间结果

2. **Shuffle阶段**
   - 排序
   - 分组
   - 数据传输

3. **Reduce阶段**
   - 输入：分组后的数据
   - 处理：聚合计算
   - 输出：最终结果

## YARN架构

### 组件

1. **ResourceManager**
   - 全局资源管理
   - 应用调度
   - 集群资源分配

2. **NodeManager**
   - 节点资源管理
   - 容器管理
   - 向RM报告

3. **ApplicationMaster**
   - 应用级资源管理
   - 任务调度
   - 故障恢复

## 常见面试题

1. **Hadoop的优缺点？**
   - 优点：高容错、可扩展、成本低
   - 缺点：延迟高、不适合实时处理

2. **HDFS如何保证高可用？**
   - NameNode HA
   - 数据副本机制
   - 机架感知

3. **MapReduce的执行流程？**
   - Map → Shuffle → Reduce
   - 数据本地性优化
   - 容错机制

