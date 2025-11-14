# 分布式存储

> **AI生成声明**: 本文档由AI辅助生成，旨在提供分布式存储技术的完整指南。

## 🎯 概述

分布式存储是将数据分散存储在多台独立的设备上，通过网络连接形成一个统一的存储系统。它解决了单机存储的容量、性能和可靠性限制。

## 📚 核心概念

### 数据复制

数据复制是分布式存储的基础，通过复制提高可用性和性能。

#### 主从复制 (Master-Slave)

- **主节点**: 处理写请求
- **从节点**: 复制主节点数据，处理读请求
- **优点**: 简单、读性能好
- **缺点**: 主节点单点故障

```java
// 主从复制示例
public class MasterSlaveReplication {
    private Node master;
    private List<Node> slaves;
    
    public void write(String key, String value) {
        // 写入主节点
        master.write(key, value);
        // 异步复制到从节点
        slaves.forEach(slave -> slave.replicate(key, value));
    }
    
    public String read(String key) {
        // 从从节点读取
        return slaves.get(0).read(key);
    }
}
```

#### 主主复制 (Master-Master)

- **多主节点**: 多个节点都可以处理写请求
- **优点**: 高可用、写性能好
- **缺点**: 冲突解决复杂

#### 多主复制 (Multi-Master)

- **多个主节点**: 多个主节点同时服务
- **冲突解决**: 需要处理写冲突
- **适用场景**: 跨地域部署

### 数据分片

数据分片将数据分散到多个节点，提高存储容量和性能。

#### 水平分片 (Sharding)

按行将数据分散到不同节点。

```java
// 水平分片示例
public class HorizontalSharding {
    private List<Database> shards;
    
    public int getShardIndex(String userId) {
        // 根据用户ID计算分片
        return Math.abs(userId.hashCode()) % shards.size();
    }
    
    public void save(User user) {
        int shardIndex = getShardIndex(user.getId());
        shards.get(shardIndex).save(user);
    }
}
```

#### 垂直分片

按列将数据分散到不同节点，适用于不同表的分离。

#### 一致性哈希分片

使用一致性哈希算法进行动态分片。

```java
public class ConsistentHashSharding {
    private ConsistentHash hashRing;
    
    public Database getShard(String key) {
        String node = hashRing.getNode(key);
        return getDatabase(node);
    }
}
```

## 🔧 存储系统类型

### 分布式文件系统

- **HDFS**: Hadoop分布式文件系统
- **GFS**: Google文件系统
- **CephFS**: Ceph文件系统

### 分布式对象存储

- **S3**: Amazon S3
- **OSS**: 阿里云对象存储
- **MinIO**: 开源对象存储

### 分布式数据库

- **NoSQL**: MongoDB、Cassandra、HBase
- **NewSQL**: TiDB、CockroachDB
- **分布式SQL**: Spanner、OceanBase

## 🚀 Java实现

### HDFS客户端

```java
// 使用Hadoop HDFS
public class HDFSClient {
    private FileSystem fs;
    
    public void init() throws IOException {
        Configuration conf = new Configuration();
        conf.set("fs.defaultFS", "hdfs://namenode:9000");
        fs = FileSystem.get(conf);
    }
    
    public void writeFile(String path, byte[] data) throws IOException {
        Path hdfsPath = new Path(path);
        FSDataOutputStream out = fs.create(hdfsPath);
        out.write(data);
        out.close();
    }
}
```

### 分布式缓存

```java
// 使用Redis Cluster
public class DistributedCache {
    private JedisCluster cluster;
    
    public void init() {
        Set<HostAndPort> nodes = new HashSet<>();
        nodes.add(new HostAndPort("192.168.1.1", 6379));
        nodes.add(new HostAndPort("192.168.1.2", 6379));
        cluster = new JedisCluster(nodes);
    }
    
    public void set(String key, String value) {
        cluster.set(key, value);
    }
}
```

### 分库分表

```java
// 使用ShardingSphere
@Configuration
public class ShardingConfig {
    @Bean
    public DataSource shardingDataSource() {
        // 配置分片规则
        ShardingRuleConfiguration config = new ShardingRuleConfiguration();
        // ... 配置分片规则
        return ShardingDataSourceFactory.createDataSource(dataSourceMap, config, props);
    }
}
```

## 📊 数据一致性策略

### 强一致性

- **同步复制**: 写操作等待所有副本完成
- **适用场景**: 金融、支付等对一致性要求高的场景

### 最终一致性

- **异步复制**: 写操作立即返回，后台异步复制
- **适用场景**: 社交、内容等对一致性要求不高的场景

### 读写一致性

- **读主写主**: 读写都访问主节点
- **读从写主**: 读从节点，写主节点
- **读写分离**: 根据负载分配读写

## 💡 最佳实践

1. **副本数量**: 根据可用性要求设置副本数（通常3个）
2. **分片策略**: 选择合适的分片键，避免热点
3. **数据平衡**: 定期检查数据分布，进行重平衡
4. **监控告警**: 监控存储容量、性能、一致性
5. **备份恢复**: 制定备份和灾难恢复策略

## 📖 学习资源

- 《设计数据密集型应用》
- [HDFS官方文档](https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html)
- [ShardingSphere文档](https://shardingsphere.apache.org/)

---

*最后更新时间: 2025-01-20*



