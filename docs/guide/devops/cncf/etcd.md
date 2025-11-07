# etcd

> **AI生成声明**: 本文档由AI辅助生成，旨在提供etcd分布式键值存储的完整指南。

## 🎯 概述

etcd是一个分布式、可靠的键值存储系统，用于存储分布式系统中最关键的数据。它是Kubernetes的核心组件，用于存储集群状态和配置信息。

## 📚 核心概念

### 数据模型

- **Key-Value**: 键值对存储
- **Prefix**: 前缀查询
- **Range**: 范围查询
- **Watch**: 监听键变化

### 一致性

- **Raft算法**: 分布式一致性算法
- **Leader选举**: 主节点选举
- **日志复制**: 数据复制到所有节点
- **强一致性**: 保证数据一致性

### 核心功能

- **存储**: 键值对存储
- **监听**: 监听键变化事件
- **租约**: 键的TTL管理
- **事务**: 原子性操作

## 🔧 核心功能

### 基本操作

```bash
# 设置键值
etcdctl put /key value

# 获取值
etcdctl get /key

# 删除键
etcdctl del /key

# 列出所有键
etcdctl get --prefix ""

# 监听键变化
etcdctl watch /key
```

### 集群管理

```bash
# 查看成员
etcdctl member list

# 添加成员
etcdctl member add node3 --peer-urls=http://10.0.0.3:2380

# 移除成员
etcdctl member remove <member-id>
```

### 备份和恢复

```bash
# 备份
etcdctl snapshot save backup.db

# 恢复
etcdctl snapshot restore backup.db
```

## 🚀 实践要点

### 配置示例

```yaml
name: etcd-node1
data-dir: /var/lib/etcd
listen-client-urls: http://0.0.0.0:2379
advertise-client-urls: http://10.0.0.1:2379
listen-peer-urls: http://0.0.0.0:2380
initial-advertise-peer-urls: http://10.0.0.1:2380
initial-cluster: etcd-node1=http://10.0.0.1:2380,etcd-node2=http://10.0.0.2:2380,etcd-node3=http://10.0.0.3:2380
initial-cluster-token: etcd-cluster-1
initial-cluster-state: new
```

### 安全配置

```yaml
client-transport-security:
  cert-file: /etc/etcd/ssl/server.crt
  key-file: /etc/etcd/ssl/server.key
  client-cert-auth: true
  trusted-ca-file: /etc/etcd/ssl/ca.crt
```

## 📖 学习资源

- [etcd官方文档](https://etcd.io/docs/)
- [etcd GitHub](https://github.com/etcd-io/etcd)
- [Raft算法](https://raft.github.io/)

## 💡 最佳实践

1. **集群大小**: 使用奇数个节点（3、5、7）
2. **备份策略**: 定期备份数据
3. **监控指标**: 监控集群健康状态
4. **性能优化**: 根据负载调整配置
5. **安全配置**: 启用TLS和认证

---

*最后更新时间: 2025-01-20*

