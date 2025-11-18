# 内存泄漏排查和解决

> **AI生成声明**: 本文档由AI辅助生成，旨在提供内存泄漏排查和解决的完整指南。

内存泄漏是Java开发中常见的问题，掌握排查和解决方法对于系统稳定性至关重要。

## 核心问题

### 什么是内存泄漏？

内存泄漏是指程序在运行过程中，不再使用的对象无法被垃圾回收器回收，导致内存占用持续增长。

### 常见的内存泄漏场景

1. **未关闭的资源**
   - 文件流未关闭
   - 数据库连接未关闭
   - 网络连接未关闭

2. **集合引用**
   - 集合中持有大对象的引用
   - 监听器未移除
   - 缓存未清理

3. **内部类持有外部类引用**
   - 匿名内部类
   - 非静态内部类

4. **ThreadLocal未清理**
   - ThreadLocal使用后未remove
   - 线程池中ThreadLocal的泄漏

## 排查方法

### 1. 使用jmap导出堆转储

```bash
# 导出堆转储
jmap -dump:format=b,file=heap.hprof <pid>

# 查看堆内存使用情况
jmap -heap <pid>
```

### 2. 使用MAT分析内存

- 打开堆转储文件
- 分析内存占用
- 查找内存泄漏点

### 3. 使用jstat监控GC

```bash
# 查看GC情况
jstat -gc <pid> 1000

# 查看堆内存使用
jstat -gccapacity <pid>
```

## 预防措施

1. **使用try-with-resources**
   ```java
   try (FileInputStream fis = new FileInputStream(file)) {
       // 使用资源
   } // 自动关闭
   ```

2. **及时清理集合**
   ```java
   list.clear();
   map.clear();
   ```

3. **移除监听器**
   ```java
   eventSource.removeListener(listener);
   ```

4. **ThreadLocal使用后清理**
   ```java
   try {
       threadLocal.set(value);
       // 使用
   } finally {
       threadLocal.remove();
   }
   ```

## 常见面试题

1. **如何判断是否存在内存泄漏？**
   - 监控堆内存使用情况
   - 观察GC频率和耗时
   - 使用内存分析工具

2. **内存泄漏和内存溢出的区别？**
   - 内存泄漏：对象无法回收，内存占用持续增长
   - 内存溢出：内存不足，无法分配新对象

3. **如何避免内存泄漏？**
   - 及时关闭资源
   - 清理集合和缓存
   - 正确使用ThreadLocal

