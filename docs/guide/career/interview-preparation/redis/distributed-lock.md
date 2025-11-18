# Redis分布式锁实现

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Redis分布式锁实现的完整指南。

Redis分布式锁是分布式系统中的重要组件，理解其实现原理和问题对于设计高可用系统至关重要。

## 核心问题

### 基本实现

**SET NX EX命令：**
```java
// 设置锁，10秒过期
String result = redis.set(key, value, "NX", "EX", 10);
if ("OK".equals(result)) {
    // 获取锁成功
    try {
        // 执行业务逻辑
    } finally {
        // 释放锁
        redis.del(key);
    }
}
```

### 存在的问题

1. **锁误释放**
   - 线程A获取锁，执行时间超过过期时间
   - 锁自动释放
   - 线程B获取锁
   - 线程A执行完释放了线程B的锁

2. **锁过期时间设置困难**
   - 设置太短：业务未执行完就过期
   - 设置太长：故障时等待时间长

3. **主从切换导致锁丢失**
   - 主节点写入锁
   - 主节点故障，从节点升级
   - 锁信息丢失

## 解决方案

### 1. 设置唯一标识

```java
String lockValue = UUID.randomUUID().toString();
if (redis.set(key, lockValue, "NX", "EX", 10)) {
    try {
        // 业务逻辑
    } finally {
        // 只有是自己的锁才释放
        String script = 
            "if redis.call('get', KEYS[1]) == ARGV[1] then " +
            "return redis.call('del', KEYS[1]) " +
            "else return 0 end";
        redis.eval(script, Collections.singletonList(key), 
                   Collections.singletonList(lockValue));
    }
}
```

### 2. 看门狗机制（续期）

```java
// 启动续期线程
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.scheduleAtFixedRate(() -> {
    // 续期
    redis.expire(key, 10);
}, 3, 3, TimeUnit.SECONDS);
```

### 3. RedLock算法

**原理：**
- 在多个Redis实例上获取锁
- 大多数实例成功才算成功
- 提高可靠性

**实现：**
```java
int successCount = 0;
for (RedisClient client : redisClients) {
    if (client.set(key, value, "NX", "EX", 10)) {
        successCount++;
    }
}
// 超过半数成功才算获取锁成功
if (successCount > redisClients.size() / 2) {
    // 获取锁成功
}
```

## 最佳实践

1. **使用Lua脚本保证原子性**
   - 释放锁时检查锁的拥有者
   - 避免误释放

2. **合理设置过期时间**
   - 根据业务执行时间设置
   - 使用看门狗续期

3. **考虑锁的可重入性**
   - 同一线程可多次获取
   - 使用ThreadLocal记录重入次数

4. **监控和告警**
   - 监控锁的获取和释放
   - 检测死锁情况

## 常见面试题

1. **Redis分布式锁的问题？**
   - 锁误释放
   - 过期时间设置困难
   - 主从切换导致锁丢失

2. **如何解决锁误释放？**
   - 设置唯一标识
   - 使用Lua脚本检查
   - 只有自己的锁才释放

3. **RedLock算法的优缺点？**
   - 优点：提高可靠性
   - 缺点：性能较低，实现复杂

