# JVM内存模型和GC调优

JVM内存模型是Java程序运行的基础，理解内存模型对于性能调优至关重要。

## 核心问题

### JVM内存区域划分

1. **堆（Heap）**：存储对象实例
   - 新生代（Young Generation）
     - Eden区
     - Survivor区（S0、S1）
   - 老年代（Old Generation）

2. **方法区（Method Area）**：存储类信息、常量、静态变量
   - JDK 1.8后改为元空间（Metaspace）

3. **虚拟机栈（VM Stack）**：存储局部变量、方法参数

4. **程序计数器（PC Register）**：记录当前执行的字节码指令地址

5. **本地方法栈（Native Method Stack）**：为Native方法服务

### 垃圾回收算法

1. **标记-清除（Mark-Sweep）**
   - 标记需要回收的对象
   - 清除被标记的对象
   - 缺点：产生内存碎片

2. **标记-复制（Mark-Copy）**
   - 将存活对象复制到另一块内存
   - 适用于新生代
   - 缺点：内存利用率低

3. **标记-整理（Mark-Compact）**
   - 标记存活对象
   - 整理内存，消除碎片
   - 适用于老年代

### 垃圾收集器

- **Serial GC**：单线程，适合小应用
- **Parallel GC**：多线程，适合吞吐量优先
- **CMS GC**：并发标记清除，减少停顿时间
- **G1 GC**：分代收集，可预测停顿时间
- **ZGC**：低延迟，适合大堆内存

## GC调优参数

```bash
# 堆内存设置
-Xms2g          # 初始堆大小
-Xmx4g          # 最大堆大小
-Xmn1g          # 新生代大小

# GC收集器选择
-XX:+UseG1GC    # 使用G1收集器
-XX:+UseConcMarkSweepGC  # 使用CMS收集器

# GC日志
-XX:+PrintGCDetails
-Xloggc:gc.log
```

## 常见面试题

1. **如何排查内存泄漏？**
   - 使用jmap导出堆转储
   - 使用MAT分析内存
   - 检查未关闭的资源

2. **如何优化GC性能？**
   - 合理设置堆大小
   - 选择合适的收集器
   - 调整新生代和老年代比例

3. **Full GC和Minor GC的区别？**
   - Minor GC：只回收新生代
   - Full GC：回收整个堆，停顿时间长

