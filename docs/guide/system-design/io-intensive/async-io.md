# 异步I/O编程

> **AI生成声明**: 本文档由AI辅助生成，旨在提供异步I/O编程的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解异步I/O的原理和优势
- 掌握Python异步编程
- 了解事件循环和协程
- 学习异步I/O的实践应用

## 📚 异步I/O基础

### 什么是异步I/O

异步I/O是一种非阻塞的I/O模型,允许程序在等待I/O操作时继续执行其他任务。

### 同步vs异步

```python
# 同步I/O - 阻塞等待
def sync_read():
    data = read_file()  # 阻塞,等待文件读取完成
    return data

# 异步I/O - 非阻塞
async def async_read():
    data = await async_read_file()  # 不阻塞,可以执行其他任务
    return data
```

### 异步I/O优势

1. **高并发**: 可以处理大量并发连接
2. **资源高效**: 不需要大量线程
3. **低延迟**: 减少上下文切换开销

## 🚀 Python异步编程

### asyncio基础

```python
import asyncio

async def main():
    print('Hello')
    await asyncio.sleep(1)
    print('World')

# 运行
asyncio.run(main())
```

### 并发执行

```python
import asyncio

async def task(name, delay):
    print(f'Task {name} started')
    await asyncio.sleep(delay)
    print(f'Task {name} completed')

async def main():
    # 并发执行多个任务
    await asyncio.gather(
        task('A', 1),
        task('B', 2),
        task('C', 3)
    )

asyncio.run(main())
```

### 异步HTTP客户端

```python
import aiohttp
import asyncio

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        urls = ['http://example.com'] * 10
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
    return results

asyncio.run(main())
```

### 异步文件操作

```python
import aiofiles

async def read_file_async(file_path):
    async with aiofiles.open(file_path, 'r') as f:
        content = await f.read()
    return content

async def write_file_async(file_path, content):
    async with aiofiles.open(file_path, 'w') as f:
        await f.write(content)
```

## 📖 推荐资源

- [asyncio文档](https://docs.python.org/3/library/asyncio.html)
- [aiohttp文档](https://docs.aiohttp.org/)

---

*最后更新时间: 2025-01-20*

