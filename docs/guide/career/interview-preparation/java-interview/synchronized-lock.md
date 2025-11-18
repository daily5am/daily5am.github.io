# synchronized和ReentrantLock

> **AI生成声明**: 本文档由AI辅助生成，旨在提供synchronized和ReentrantLock的完整指南。

synchronized和ReentrantLock是Java中两种重要的锁机制，理解它们的区别和选择对于并发编程至关重要。

## 核心问题

### synchronized和ReentrantLock的区别

| 特性 | synchronized | ReentrantLock |
|------|-------------|---------------|
| 实现层面 | JVM层面 | API层面 |
| 锁的释放 | 自动释放 | 手动释放 |
| 公平锁 | 不支持 | 支持 |
| 可中断 | 不支持 | 支持 |
| 超时获取 | 不支持 | 支持 |
| 锁绑定条件 | 不支持 | 支持 |

### synchronized的锁升级

1. **无锁状态**
2. **偏向锁**：只有一个线程访问
3. **轻量级锁**：多个线程竞争，但竞争不激烈
4. **重量级锁**：竞争激烈，线程阻塞

### ReentrantLock的实现原理

- 基于AQS（AbstractQueuedSynchronizer）
- 使用CAS和队列实现
- 支持公平锁和非公平锁

## 使用场景

### synchronized适用场景

- 简单的同步需求
- 不需要高级特性
- 代码简洁性要求高

### ReentrantLock适用场景

- 需要公平锁
- 需要可中断的锁
- 需要超时获取锁
- 需要多个条件变量

## 常见面试题

1. **synchronized和ReentrantLock的性能对比？**
   - JDK 1.6后synchronized性能大幅提升
   - 在低竞争情况下，synchronized性能更好
   - 在高竞争情况下，ReentrantLock性能更好

2. **什么是可重入锁？**
   - 同一个线程可以多次获取同一把锁
   - synchronized和ReentrantLock都是可重入锁

3. **如何选择synchronized和ReentrantLock？**
   - 简单场景使用synchronized
   - 需要高级特性时使用ReentrantLock

