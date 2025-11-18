# 缓存更新策略

> **AI生成声明**: 本文档由AI辅助生成，旨在提供缓存更新策略的完整指南。

缓存更新策略是缓存系统的核心问题，选择合适的更新策略对于保证数据一致性和系统性能至关重要。

## 核心问题

### 更新策略类型

1. **Cache Aside（旁路缓存）**
   - 更新：先更新数据库，再删除缓存
   - 读取：先查缓存，未命中查数据库并写入缓存

2. **Read/Write Through（读写穿透）**
   - 更新：先更新缓存，再更新数据库
   - 读取：缓存负责加载数据

3. **Write Back（写回）**
   - 更新：只更新缓存，异步写数据库
   - 读取：从缓存读取

## Cache Aside详解

### 更新流程

```java
// 更新数据
public void updateData(String key, String value) {
    // 1. 更新数据库
    database.update(key, value);
    
    // 2. 删除缓存
    cache.delete(key);
}
```

### 优点
- 实现简单
- 缓存只存储热点数据
- 数据库和缓存解耦

### 缺点
- 可能出现数据不一致
- 需要处理并发问题

## 并发问题

### 问题场景

**场景1：先更新数据库，后删除缓存**
```
线程A: 更新数据库 (value=1)
线程B: 更新数据库 (value=2)
线程B: 删除缓存
线程A: 删除缓存
结果: 缓存为空，下次读取到value=2 ✓
```

**场景2：先删除缓存，后更新数据库**
```
线程A: 删除缓存
线程B: 读取缓存（未命中）
线程B: 读取数据库（value=1）
线程B: 写入缓存（value=1）
线程A: 更新数据库（value=2）
结果: 缓存是旧值（value=1）✗
```

### 解决方案

1. **延迟双删**
   ```java
   // 删除缓存
   cache.delete(key);
   // 更新数据库
   database.update(key, value);
   // 延迟删除
   Thread.sleep(500);
   cache.delete(key);
   ```

2. **使用消息队列**
   - 更新数据库后发送消息
   - 异步删除缓存
   - 保证最终一致性

## Write Through策略

### 更新流程

```java
public void updateData(String key, String value) {
    // 1. 更新缓存
    cache.update(key, value);
    
    // 2. 更新数据库
    database.update(key, value);
}
```

### 优点
- 数据一致性高
- 缓存始终有效

### 缺点
- 写性能较低
- 非热点数据也写入缓存

## Write Back策略

### 更新流程

```java
public void updateData(String key, String value) {
    // 只更新缓存
    cache.update(key, value);
    
    // 异步写数据库
    asyncWriteToDatabase(key, value);
}
```

### 优点
- 写性能高
- 减少数据库压力

### 缺点
- 数据可能丢失
- 实现复杂

## 策略选择

1. **数据一致性要求高**
   - 使用Write Through
   - 或Cache Aside + 延迟双删

2. **写性能要求高**
   - 使用Write Back
   - 接受最终一致性

3. **读多写少**
   - 使用Cache Aside
   - 简单高效

## 常见面试题

1. **Cache Aside的并发问题？**
   - 先删缓存后更新数据库可能不一致
   - 使用延迟双删解决

2. **如何保证缓存一致性？**
   - 根据业务选择策略
   - 使用消息队列异步更新
   - 设置合理的过期时间

3. **Write Back的风险？**
   - 数据可能丢失
   - 需要持久化机制
   - 适合写多读少场景

