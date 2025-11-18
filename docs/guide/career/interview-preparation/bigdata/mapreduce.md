# MapReduce计算模型

> **AI生成声明**: 本文档由AI辅助生成，旨在提供MapReduce计算模型的完整指南。

MapReduce是Hadoop的分布式计算框架，理解其计算模型对于掌握大数据处理至关重要。

## 核心问题

### MapReduce设计思想

1. **分而治之**
   - 将大任务分解为小任务
   - 并行处理
   - 合并结果

2. **数据本地性**
   - 计算靠近数据
   - 减少网络传输
   - 提高性能

3. **容错机制**
   - 任务失败自动重试
   - 节点故障不影响整体
   - 保证结果正确性

### 计算模型

**Map阶段：**
- 输入：键值对（key, value）
- 处理：并行处理每个键值对
- 输出：中间结果（key, value）

**Shuffle阶段：**
- 分区（Partition）
- 排序（Sort）
- 分组（Group）
- 数据传输

**Reduce阶段：**
- 输入：分组后的数据
- 处理：聚合计算
- 输出：最终结果

## 执行流程

### 1. 作业提交

```java
// 提交MapReduce作业
Job job = Job.getInstance();
job.setJarByClass(WordCount.class);
job.setMapperClass(TokenizerMapper.class);
job.setReducerClass(IntSumReducer.class);
job.waitForCompletion(true);
```

### 2. 任务分配

- ResourceManager分配资源
- ApplicationMaster分配任务
- 考虑数据本地性

### 3. Map阶段执行

- 读取输入数据
- 执行Map函数
- 输出中间结果

### 4. Shuffle阶段

- **分区**：根据key分区
- **排序**：按key排序
- **合并**：相同key合并
- **传输**：发送到Reduce节点

### 5. Reduce阶段执行

- 接收Shuffle后的数据
- 执行Reduce函数
- 输出最终结果

## 优化策略

### 1. 数据本地性

- **本地节点**：数据在本地
- **同机架**：数据在同机架
- **跨机架**：数据在不同机架

### 2. Combiner

- Map端的局部Reduce
- 减少网络传输
- 必须是幂等操作

### 3. 分区优化

- 合理设置分区数
- 避免数据倾斜
- 均匀分布数据

### 4. 压缩

- 中间结果压缩
- 减少I/O开销
- 权衡CPU和I/O

## 常见面试题

1. **MapReduce的执行流程？**
   - Map → Shuffle → Reduce
   - 数据本地性优化
   - 容错机制

2. **Shuffle的作用？**
   - 数据分区和排序
   - 为Reduce准备数据
   - 网络传输阶段

3. **如何优化MapReduce性能？**
   - 数据本地性
   - Combiner优化
   - 合理分区
   - 数据压缩

