# 线程池参数配置和拒绝策略

> **AI生成声明**: 本文档由AI辅助生成，旨在提供线程池参数配置和拒绝策略的完整指南。

线程池是Java并发编程中的重要工具，合理配置线程池参数对于系统性能至关重要。

## 核心问题

### 线程池的核心参数

```java
ThreadPoolExecutor(
    int corePoolSize,        // 核心线程数
    int maximumPoolSize,      // 最大线程数
    long keepAliveTime,       // 线程存活时间
    TimeUnit unit,            // 时间单位
    BlockingQueue<Runnable> workQueue,  // 任务队列
    ThreadFactory threadFactory,        // 线程工厂
    RejectedExecutionHandler handler    // 拒绝策略
)
```

### 参数说明

1. **corePoolSize（核心线程数）**
   - 线程池中保持的线程数量
   - 即使空闲也不会被回收

2. **maximumPoolSize（最大线程数）**
   - 线程池允许的最大线程数
   - 当队列满时，会创建新线程

3. **keepAliveTime（线程存活时间）**
   - 非核心线程的空闲存活时间
   - 超过时间会被回收

4. **workQueue（任务队列）**
   - ArrayBlockingQueue：有界队列
   - LinkedBlockingQueue：无界队列
   - SynchronousQueue：同步队列
   - PriorityBlockingQueue：优先级队列

### 拒绝策略

1. **AbortPolicy（默认）**：抛出异常
2. **CallerRunsPolicy**：调用者执行
3. **DiscardPolicy**：直接丢弃
4. **DiscardOldestPolicy**：丢弃最老的任务

## 线程池执行流程

1. 提交任务
2. 如果线程数 < corePoolSize，创建新线程
3. 如果线程数 >= corePoolSize，将任务加入队列
4. 如果队列满且线程数 < maximumPoolSize，创建新线程
5. 如果队列满且线程数 >= maximumPoolSize，执行拒绝策略

## 常见面试题

1. **如何合理设置线程池参数？**
   - CPU密集型：corePoolSize = CPU核心数 + 1
   - IO密集型：corePoolSize = CPU核心数 × 2
   - 根据任务特点调整

2. **线程池的监控指标？**
   - 线程数
   - 队列大小
   - 任务完成数
   - 任务拒绝数

3. **如何动态调整线程池参数？**
   - 使用ThreadPoolExecutor的setCorePoolSize方法
   - 根据监控指标动态调整

