# 多级缓存策略

> **AI生成声明**: 本文档由AI辅助生成，旨在提供多级缓存策略的完整指南。

多级缓存是提高系统性能的重要手段，通过不同层次的缓存组合，可以大幅提升响应速度。

## 核心问题

### 多级缓存架构

**典型架构：**
```
L1: 本地缓存（JVM内）
    ↓ 未命中
L2: 分布式缓存（Redis）
    ↓ 未命中
L3: 数据库
```

### 各级缓存特点

1. **L1本地缓存**
   - 速度快，延迟低
   - 容量有限
   - 单机缓存

2. **L2分布式缓存**
   - 容量大
   - 多机共享
   - 网络延迟

3. **L3数据库**
   - 数据源
   - 持久化存储
   - 性能最低

## 实现方案

### 本地缓存选择

1. **Caffeine**
   - 高性能
   - 丰富的淘汰策略
   - 推荐使用

2. **Guava Cache**
   - Google出品
   - 功能完善
   - 性能良好

3. **Ehcache**
   - 功能强大
   - 支持持久化
   - 配置复杂

### 缓存加载流程

```java
public String getData(String key) {
    // L1: 本地缓存
    String value = localCache.get(key);
    if (value != null) {
        return value;
    }
    
    // L2: Redis缓存
    value = redis.get(key);
    if (value != null) {
        localCache.put(key, value);
        return value;
    }
    
    // L3: 数据库
    value = database.get(key);
    if (value != null) {
        redis.set(key, value);
        localCache.put(key, value);
    }
    
    return value;
}
```

## 缓存更新策略

### 1. 主动更新

- 数据变更时主动更新缓存
- 保证一致性
- 实现复杂

### 2. 被动失效

- 设置过期时间
- 过期后重新加载
- 实现简单

### 3. 定时刷新

- 定时任务刷新缓存
- 保证数据新鲜
- 可能浪费资源

## 注意事项

1. **缓存穿透**
   - 多级缓存都可能穿透
   - 需要在每层防护

2. **缓存雪崩**
   - 避免同时过期
   - 过期时间随机化

3. **数据一致性**
   - 多级缓存一致性复杂
   - 根据业务选择策略

## 常见面试题

1. **为什么需要多级缓存？**
   - 提高响应速度
   - 减少网络开销
   - 降低Redis压力

2. **如何选择本地缓存？**
   - Caffeine：性能优先
   - Guava Cache：功能完善
   - Ehcache：需要持久化

3. **多级缓存的一致性？**
   - 最终一致性
   - 主动更新
   - 被动失效

