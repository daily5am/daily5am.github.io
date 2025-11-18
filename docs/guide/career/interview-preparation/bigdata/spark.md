# Spark核心原理

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Spark核心原理的完整指南。

Spark是快速、通用的大数据处理引擎，理解其核心原理对于掌握大数据计算至关重要。

## 核心问题

### Spark特点

1. **速度快**
   - 内存计算
   - DAG执行引擎
   - 比MapReduce快10-100倍

2. **易用性**
   - 丰富的API
   - 支持多种语言
   - 统一的批流处理

3. **通用性**
   - Spark SQL：结构化数据处理
   - Spark Streaming：流处理
   - MLlib：机器学习
   - GraphX：图计算

### 核心概念

1. **RDD（Resilient Distributed Dataset）**
   - 弹性分布式数据集
   - 不可变
   - 可分区
   - 容错性

2. **DAG（Directed Acyclic Graph）**
   - 有向无环图
   - 表示计算流程
   - 优化执行计划

3. **Stage**
   - DAG的划分单位
   - 宽依赖划分Stage
   - 窄依赖在同一Stage

## RDD特性

### 五大特性

1. **分区列表**：RDD由多个分区组成
2. **计算函数**：每个分区有计算函数
3. **依赖关系**：RDD之间的依赖
4. **分区器**：可选的分区函数
5. **优先位置**：数据本地性

### 依赖类型

1. **窄依赖（Narrow Dependency）**
   - 一个父分区对应一个子分区
   - 可以流水线执行
   - 容错恢复简单

2. **宽依赖（Wide Dependency）**
   - 一个父分区对应多个子分区
   - 需要Shuffle
   - 容错恢复复杂

## 执行流程

### 1. 创建RDD

```scala
val rdd = sc.parallelize(1 to 100)
val rdd2 = sc.textFile("hdfs://...")
```

### 2. 转换操作（Transformation）

```scala
val mapped = rdd.map(x => x * 2)
val filtered = mapped.filter(x => x > 10)
```

### 3. 行动操作（Action）

```scala
val count = filtered.count()
val result = filtered.collect()
```

### 4. 任务调度

- DAGScheduler：划分Stage
- TaskScheduler：分配Task
- Executor：执行Task

## Spark SQL

### DataFrame和Dataset

- **DataFrame**：基于RDD的分布式数据集合
- **Dataset**：类型安全的DataFrame
- **Catalyst优化器**：查询优化

### 执行流程

1. SQL解析
2. 逻辑计划生成
3. 逻辑计划优化
4. 物理计划生成
5. 代码生成

## 常见面试题

1. **Spark为什么比MapReduce快？**
   - 内存计算
   - DAG优化
   - 减少磁盘I/O

2. **RDD的五大特性？**
   - 分区列表
   - 计算函数
   - 依赖关系
   - 分区器
   - 优先位置

3. **宽依赖和窄依赖的区别？**
   - 窄依赖：一对一，可流水线
   - 宽依赖：一对多，需要Shuffle

