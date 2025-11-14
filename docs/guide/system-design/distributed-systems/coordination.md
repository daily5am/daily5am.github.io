# 分布式协调

> **AI生成声明**: 本文档由AI辅助生成，旨在提供分布式协调技术的完整指南。

## 🎯 概述

分布式协调是分布式系统中节点间协调和同步的机制，包括服务发现、配置管理、分布式锁、选主等功能。

## 📚 核心功能

### 服务发现

服务发现是分布式系统中服务自动注册和发现的机制。

#### 服务注册

服务启动时向注册中心注册自己的信息。

```java
// 服务注册
@Service
public class ServiceRegistry {
    @Autowired
    private DiscoveryClient discoveryClient;
    
    @PostConstruct
    public void register() {
        ServiceInstance instance = ServiceInstance.builder()
            .serviceId("user-service")
            .host("localhost")
            .port(8080)
            .build();
        discoveryClient.register(instance);
    }
}
```

#### 服务发现

客户端从注册中心获取服务实例列表。

```java
// 服务发现
@Service
public class ServiceDiscovery {
    @Autowired
    private DiscoveryClient discoveryClient;
    
    public List<ServiceInstance> getInstances(String serviceId) {
        return discoveryClient.getInstances(serviceId);
    }
    
    public ServiceInstance chooseInstance(String serviceId) {
        List<ServiceInstance> instances = getInstances(serviceId);
        // 负载均衡选择实例
        return loadBalancer.choose(instances);
    }
}
```

### 配置管理

配置管理提供集中式配置管理和动态配置更新。

#### 配置中心

```java
// 使用Nacos配置中心
@NacosPropertySource(dataId = "application", autoRefreshed = true)
@Configuration
public class NacosConfig {
    @NacosValue(value = "${app.name:default}", autoRefreshed = true)
    private String appName;
}
```

#### 动态配置

```java
// Spring Cloud Config
@RefreshScope
@Configuration
public class DynamicConfig {
    @Value("${config.value}")
    private String configValue;
}
```

### 分布式锁

分布式锁用于在分布式环境中实现互斥访问。

#### 基于Redis的分布式锁

```java
// Redisson分布式锁
public class DistributedLock {
    private RedissonClient redisson;
    
    public void doWithLock(String lockKey, Runnable task) {
        RLock lock = redisson.getLock(lockKey);
        try {
            if (lock.tryLock(10, 30, TimeUnit.SECONDS)) {
                task.run();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
}
```

#### 基于ZooKeeper的分布式锁

```java
// Curator分布式锁
public class ZkDistributedLock {
    private CuratorFramework client;
    
    public void doWithLock(String lockPath, Runnable task) {
        InterProcessMutex lock = new InterProcessMutex(client, lockPath);
        try {
            if (lock.acquire(10, TimeUnit.SECONDS)) {
                task.run();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                lock.release();
            } catch (Exception e) {
                // 处理异常
            }
        }
    }
}
```

### 选主 (Leader Election)

选主用于在分布式系统中选举主节点。

```java
// Curator选主
public class LeaderElection {
    private CuratorFramework client;
    
    public void electLeader() {
        LeaderSelector selector = new LeaderSelector(client, "/leader", 
            new LeaderSelectorListener() {
                @Override
                public void takeLeadership(CuratorFramework client) {
                    // 成为Leader后的逻辑
                    while (true) {
                        // 执行Leader任务
                    }
                }
                
                @Override
                public void stateChanged(CuratorFramework client, 
                    ConnectionState newState) {
                    // 连接状态变化处理
                }
            });
        selector.autoRequeue();
        selector.start();
    }
}
```

## 🔧 协调框架

### ZooKeeper

ZooKeeper是经典的分布式协调服务。

#### 核心概念

- **ZNode**: 数据节点
- **Watcher**: 监听器
- **Session**: 会话

#### Java客户端

```java
// ZooKeeper客户端
public class ZookeeperClient {
    private ZooKeeper zk;
    
    public void init() throws IOException {
        zk = new ZooKeeper("localhost:2181", 3000, event -> {
            // 处理事件
        });
    }
    
    public void createNode(String path, byte[] data) throws Exception {
        zk.create(path, data, ZooDefs.Ids.OPEN_ACL_UNSAFE, 
            CreateMode.PERSISTENT);
    }
    
    public byte[] getData(String path) throws Exception {
        return zk.getData(path, false, null);
    }
}
```

### Etcd

Etcd是分布式键值存储，用于服务发现和配置管理。

```java
// Etcd客户端
public class EtcdClient {
    private Client etcdClient;
    
    public void put(String key, String value) {
        etcdClient.getKVClient().put(
            ByteSequence.from(key.getBytes()),
            ByteSequence.from(value.getBytes())
        );
    }
    
    public String get(String key) {
        GetResponse response = etcdClient.getKVClient().get(
            ByteSequence.from(key.getBytes())
        );
        return response.getKvs().get(0).getValue().toString();
    }
}
```

### Consul

Consul是服务发现和配置管理工具。

```java
// Consul客户端
public class ConsulClient {
    private Consul consul;
    
    public void registerService(String serviceId, String serviceName, 
        String address, int port) {
        NewService service = new NewService();
        service.setId(serviceId);
        service.setName(serviceName);
        service.setAddress(address);
        service.setPort(port);
        consul.agentClient().register(service);
    }
}
```

## 🚀 实践要点

### 服务发现最佳实践

1. **健康检查**: 定期检查服务健康状态
2. **负载均衡**: 选择合适的负载均衡策略
3. **服务降级**: 服务不可用时的降级策略
4. **缓存机制**: 缓存服务列表，减少注册中心压力

### 配置管理最佳实践

1. **配置版本**: 管理配置版本
2. **配置加密**: 敏感配置加密存储
3. **配置校验**: 配置更新时进行校验
4. **配置回滚**: 支持配置回滚

### 分布式锁最佳实践

1. **锁超时**: 设置合理的锁超时时间
2. **可重入锁**: 支持可重入
3. **公平锁**: 根据需求选择公平或非公平锁
4. **锁续期**: 长时间任务需要锁续期

## 💡 最佳实践

1. **选择合适的框架**: 根据场景选择ZooKeeper、Etcd或Consul
2. **高可用部署**: 协调服务需要高可用部署
3. **监控告警**: 监控协调服务状态
4. **性能优化**: 优化协调服务性能
5. **容错设计**: 设计容错机制

## 📖 学习资源

- [ZooKeeper官方文档](https://zookeeper.apache.org/)
- [Etcd官方文档](https://etcd.io/)
- [Consul官方文档](https://www.consul.io/)

---

*最后更新时间: 2025-01-20*



