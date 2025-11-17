# ConcurrentHashMap实现原理

ConcurrentHashMap是Java并发包中提供的线程安全的HashMap实现。

## 核心问题

### ConcurrentHashMap如何保证线程安全？

**JDK 1.7：**
- 使用分段锁（Segment）机制
- 将数据分成多个段，每个段独立加锁
- 降低了锁的粒度，提高了并发性能

**JDK 1.8：**
- 使用CAS + synchronized
- 锁的粒度更细，只锁住数组中的单个元素（Node）
- 性能进一步提升

### CAS + synchronized的实现

```java
final V putVal(K key, V value, boolean onlyIfAbsent) {
    // 使用CAS尝试插入
    if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value, null)))
        break;
    // 如果CAS失败，使用synchronized锁住节点
    synchronized (f) {
        // 插入逻辑
    }
}
```

## 关键特性

### 1. 分段锁 vs 细粒度锁

- JDK 1.7：锁的粒度是Segment（多个Node）
- JDK 1.8：锁的粒度是单个Node

### 2. 读操作无锁

- 读操作不需要加锁
- 使用volatile保证可见性
- 提高了读操作的性能

### 3. 扩容机制

- 支持多线程并发扩容
- 使用ForwardingNode标记已迁移的节点
- 其他线程可以帮助扩容

## 常见面试题

1. **ConcurrentHashMap和Hashtable的区别？**
   - Hashtable使用synchronized锁住整个表
   - ConcurrentHashMap使用更细粒度的锁
   - ConcurrentHashMap的并发性能更好

2. **为什么ConcurrentHashMap的读操作不需要加锁？**
   - 使用volatile保证可见性
   - Node的value使用volatile修饰
   - 读操作是线程安全的

3. **ConcurrentHashMap的size()方法如何实现？**
   - JDK 1.7：分段统计，可能不准确
   - JDK 1.8：使用LongAdder，更准确

## 使用建议

- 高并发场景下使用ConcurrentHashMap
- 注意key和value不能为null
- 合理设置初始容量和负载因子

