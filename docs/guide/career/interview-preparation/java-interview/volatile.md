# volatile关键字原理

> **AI生成声明**: 本文档由AI辅助生成，旨在提供volatile关键字原理的完整指南。

volatile是Java并发编程中的重要关键字，用于保证变量的可见性和禁止指令重排序。

## 核心问题

### volatile的作用是什么？

1. **保证可见性**：一个线程修改了volatile变量，其他线程能立即看到修改
2. **禁止指令重排序**：防止编译器优化导致的指令重排序
3. **不保证原子性**：volatile不能保证复合操作的原子性

### volatile如何保证可见性？

通过**MESI缓存一致性协议**实现：
- 当线程修改volatile变量时，会立即将修改写回主内存
- 其他线程的缓存中该变量的缓存行会被标记为无效
- 其他线程需要从主内存重新读取

### volatile如何禁止指令重排序？

通过**内存屏障（Memory Barrier）**实现：
- 在volatile写操作前插入StoreStore屏障
- 在volatile写操作后插入StoreLoad屏障
- 在volatile读操作前插入LoadLoad屏障
- 在volatile读操作后插入LoadStore屏障

## 使用场景

### 1. 状态标志

```java
private volatile boolean running = true;

public void stop() {
    running = false;
}

public void run() {
    while (running) {
        // 执行任务
    }
}
```

### 2. 双重检查锁定（DCL）

```java
private volatile static Singleton instance;

public static Singleton getInstance() {
    if (instance == null) {
        synchronized (Singleton.class) {
            if (instance == null) {
                instance = new Singleton();
            }
        }
    }
    return instance;
}
```

## 常见面试题

1. **volatile和synchronized的区别？**
   - volatile只能修饰变量，synchronized可以修饰方法和代码块
   - volatile保证可见性和有序性，synchronized保证可见性、有序性和原子性
   - volatile性能更好，但功能更弱

2. **volatile能保证原子性吗？**
   - 不能，volatile只能保证单个读/写操作的原子性
   - 对于复合操作（如i++），需要使用synchronized或Atomic类

3. **volatile的使用场景？**
   - 状态标志
   - 双重检查锁定
   - 单例模式
   - 线程间通信

## 注意事项

- volatile不能替代synchronized
- 复合操作需要使用锁或原子类
- 过度使用volatile可能影响性能

