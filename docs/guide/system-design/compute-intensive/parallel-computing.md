# 并行计算

> **AI生成声明**: 本文档由AI辅助生成，旨在提供并行计算的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解并行计算的基本概念
- 掌握多线程和多进程编程
- 了解并行计算的模式和算法
- 学习并行计算的优化方法

## 📚 并行计算基础

### 并行计算类型

#### 1. 任务并行

将任务分解为独立的子任务,并行执行。

#### 2. 数据并行

对数据集的不同部分并行处理。

#### 3. 流水线并行

将任务分解为多个阶段,流水线执行。

### 并行计算挑战

- **数据竞争**: 多个线程访问共享数据
- **同步开销**: 线程同步和通信开销
- **负载均衡**: 任务分配不均
- **可扩展性**: 并行度限制

## 🚀 Python并行计算

### 多线程

```python
import threading
from queue import Queue
import time

class ThreadPool:
    def __init__(self, num_workers=4):
        self.num_workers = num_workers
        self.queue = Queue()
        self.threads = []
        self.results = []
        self.lock = threading.Lock()
    
    def worker(self):
        """工作线程"""
        while True:
            task = self.queue.get()
            if task is None:
                break
            
            result = task()
            with self.lock:
                self.results.append(result)
            
            self.queue.task_done()
    
    def submit(self, task):
        """提交任务"""
        self.queue.put(task)
    
    def start(self):
        """启动线程池"""
        self.threads = []
        for _ in range(self.num_workers):
            t = threading.Thread(target=self.worker)
            t.start()
            self.threads.append(t)
    
    def wait(self):
        """等待所有任务完成"""
        self.queue.join()
        
        # 停止线程
        for _ in range(self.num_workers):
            self.queue.put(None)
        for t in self.threads:
            t.join()
        
        return self.results

# 使用示例
pool = ThreadPool(num_workers=4)
pool.start()

for i in range(10):
    pool.submit(lambda: time.sleep(0.1))

results = pool.wait()
```

### 多进程

```python
from multiprocessing import Pool, Manager
import numpy as np

def compute_square(n):
    """计算平方"""
    return n * n

def parallel_compute(numbers, num_processes=4):
    """并行计算"""
    with Pool(processes=num_processes) as pool:
        results = pool.map(compute_square, numbers)
    return results

# 使用示例
numbers = list(range(1000000))
results = parallel_compute(numbers, num_processes=8)
```

### 异步并行

```python
import asyncio
import aiohttp

async def fetch_data(url):
    """异步获取数据"""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def parallel_fetch(urls):
    """并行获取多个URL"""
    tasks = [fetch_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
    return results

# 使用示例
urls = ['http://example.com'] * 100
results = asyncio.run(parallel_fetch(urls))
```

## 🔧 并行计算库

### NumPy并行

```python
import numpy as np
from numba import prange, jit

@jit(nopython=True, parallel=True)
def parallel_sum(arr):
    """并行求和"""
    total = 0.0
    for i in prange(len(arr)):
        total += arr[i] * arr[i]
    return total

arr = np.random.rand(10000000)
result = parallel_sum(arr)
```

### Dask并行

```python
import dask.array as da
import numpy as np

# 创建Dask数组
x = da.random.rand(10000, 10000, chunks=(1000, 1000))

# 并行计算
result = (x ** 2).sum()

# 执行计算
result = result.compute()
```

## 📖 推荐资源

- [Python并行编程](https://docs.python.org/3/library/concurrent.futures.html)
- [NumPy并行计算](https://numpy.org/)
- 《并行算法设计》书籍

## 💡 下一步

- 学习[分布式计算](./distributed-computing.md)
- 了解[GPU计算](./gpu-computing.md)

---

*最后更新时间: 2025-01-20*

