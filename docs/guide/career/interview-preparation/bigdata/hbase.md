# HBase列式存储

> **AI生成声明**: 本文档由AI辅助生成，旨在提供HBase列式存储的完整指南。

HBase是分布式NoSQL数据库，基于HDFS的列式存储，理解其原理对于掌握大数据存储至关重要。

## 核心问题

### HBase特点

1. **列式存储**
   - 按列族存储
   - 稀疏数据高效
   - 适合宽表

2. **高可用**
   - 自动分片
   - 自动负载均衡
   - 故障自动恢复

3. **强一致性**
   - 单行事务
   - 最终一致性
   - 适合OLTP场景

### 数据模型

1. **表（Table）**
   - 由行和列组成
   - 无固定模式
   - 水平扩展

2. **行键（Row Key）**
   - 唯一标识行
   - 字典序排序
   - 影响数据分布

3. **列族（Column Family）**
   - 列的集合
   - 物理存储单位
   - 必须预先定义

4. **列限定符（Column Qualifier）**
   - 列族内的列
   - 动态添加
   - 无需预定义

5. **时间戳（Timestamp）**
   - 版本号
   - 默认保留最新版本
   - 支持多版本

## 架构组件

### 1. HMaster

- 管理元数据
- 分配Region
- 负载均衡
- 故障恢复

### 2. RegionServer

- 存储Region
- 处理读写请求
- 管理Region分裂

### 3. Region

- 表的分片
- 按行键范围划分
- 自动分裂

### 4. Store

- Region的存储单位
- 对应一个列族
- 包含MemStore和StoreFile

## 存储结构

### 1. MemStore

- 内存存储
- 写入缓冲区
- 达到阈值刷写到磁盘

### 2. StoreFile

- HFile格式
- 存储在HDFS
- 只读文件

### 3. HFile

- HBase文件格式
- 按行键排序
- 支持索引

## 读写流程

### 写流程

1. 客户端写入MemStore
2. 写入WAL（Write-Ahead Log）
3. MemStore达到阈值刷写
4. 生成HFile存储到HDFS

### 读流程

1. 先查MemStore
2. 再查BlockCache
3. 最后查HFile
4. 合并结果返回

## 常见面试题

1. **HBase和关系型数据库的区别？**
   - HBase：列式存储，无模式
   - 关系型数据库：行式存储，固定模式
   - HBase适合稀疏数据

2. **Row Key设计原则？**
   - 避免热点
   - 考虑查询模式
   - 长度适中

3. **HBase的存储结构？**
   - Region → Store → MemStore/StoreFile
   - MemStore刷写生成HFile
   - HFile存储在HDFS

