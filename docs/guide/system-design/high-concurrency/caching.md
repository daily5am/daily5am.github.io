# 缓存系统

> **AI生成声明**: 本文档由AI辅助生成，旨在提供缓存系统的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解缓存的作用和重要性
- 掌握多级缓存架构设计
- 了解缓存更新策略
- 学习缓存问题(穿透、击穿、雪崩)的解决方案

## 📚 什么是缓存

缓存是将经常访问的数据存储在快速存储介质中,以提高数据访问速度的技术。

### 缓存的作用

1. **提升性能**: 减少数据库访问,降低响应时间
2. **降低负载**: 减轻后端服务压力
3. **改善体验**: 快速响应用户请求

### 缓存的层次

- **浏览器缓存**: 静态资源缓存
- **CDN缓存**: 就近访问,降低网络延迟
- **反向代理缓存**: Nginx等代理层缓存
- **应用缓存**: 本地缓存、分布式缓存
- **数据库缓存**: 查询结果缓存

## 🏗️ 缓存架构设计

### 多级缓存架构

```
用户请求
  ↓
CDN缓存(静态资源)
  ↓
反向代理缓存(Nginx)
  ↓
应用本地缓存(Guava Cache)
  ↓
分布式缓存(Redis)
  ↓
数据库
```

### 本地缓存 vs 分布式缓存

**本地缓存**:
- 访问速度快,零网络延迟
- 内存容量有限
- 集群环境下数据不同步

**分布式缓存**:
- 容量大,可扩展
- 数据一致性好
- 需要网络访问,有延迟

## 🔄 缓存更新策略

### 1. Cache Aside(旁路缓存)

**流程**:
- 读: 先查缓存,缓存未命中则查数据库,然后写入缓存
- 写: 先更新数据库,再删除缓存

**优点**: 简单,数据一致性好
**缺点**: 可能出现缓存穿透

### 2. Read/Write Through(读写穿透)

**流程**:
- 读: 缓存未命中时,缓存服务负责从数据库加载
- 写: 先更新缓存,再由缓存服务更新数据库

**优点**: 业务逻辑简单
**缺点**: 缓存服务复杂度高

### 3. Write Back(写回)

**流程**:
- 写: 只更新缓存,异步批量写入数据库
- 读: 从缓存读取

**优点**: 写入性能高
**缺点**: 数据可能丢失

## ⚠️ 缓存常见问题

### 1. 缓存穿透

**问题**: 查询不存在的数据,每次都穿透到数据库

**解决方案**:
- 布隆过滤器: 快速判断数据是否存在
- 空值缓存: 对不存在的数据也缓存(设置短过期时间)
- 参数校验: 在接口层做参数校验

### 2. 缓存击穿

**问题**: 热点数据过期,大量请求同时访问数据库

**解决方案**:
- 互斥锁: 只允许一个线程查询数据库
- 永不过期: 异步更新热点数据
- 多级缓存: 本地缓存+分布式缓存

### 3. 缓存雪崩

**问题**: 大量缓存同时过期,导致数据库压力骤增

**解决方案**:
- 过期时间随机化: 避免同时过期
- 缓存预热: 系统启动时预加载数据
- 多级缓存: 降低影响范围
- 限流降级: 保护后端服务

## 🚀 实践应用

### Redis缓存实现

```python
import redis
import json
from functools import wraps

redis_client = redis.Redis(host='localhost', port=6379)

def cache_result(expire=300):
    """缓存装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # 生成缓存key
            cache_key = f"{func.__name__}:{args}:{kwargs}"
            
            # 先查缓存
            cached = redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
            
            # 查数据库
            result = func(*args, **kwargs)
            
            # 写入缓存
            redis_client.setex(
                cache_key, 
                expire, 
                json.dumps(result)
            )
            
            return result
        return wrapper
    return decorator

# 使用示例
@cache_result(expire=600)
def get_user_info(user_id):
    # 查询数据库
    return {"id": user_id, "name": "张三"}
```

### 缓存预热策略

```python
def cache_warmup():
    """缓存预热"""
    # 1. 加载热点数据
    hot_users = get_hot_users()
    for user in hot_users:
        cache_key = f"user:{user.id}"
        redis_client.setex(cache_key, 3600, json.dumps(user))
    
    # 2. 加载统计数据
    stats = calculate_stats()
    redis_client.setex("stats", 1800, json.dumps(stats))
```

### 布隆过滤器防穿透

```python
from pybloom_live import BloomFilter

# 初始化布隆过滤器
bf = BloomFilter(capacity=1000000, error_rate=0.001)

# 数据写入时添加到布隆过滤器
def add_user(user_id):
    bf.add(user_id)
    # 写入数据库...

# 查询时先检查布隆过滤器
def get_user(user_id):
    if user_id not in bf:
        return None  # 肯定不存在
    
    # 查缓存
    cached = redis_client.get(f"user:{user_id}")
    if cached:
        return json.loads(cached)
    
    # 查数据库
    user = query_database(user_id)
    if user:
        redis_client.setex(f"user:{user_id}", 600, json.dumps(user))
    return user
```

## 📊 缓存监控指标

- **命中率**: 缓存命中请求 / 总请求
- **响应时间**: 缓存访问延迟
- **内存使用**: 缓存占用内存
- **过期策略**: 过期数据清理情况

## 📖 推荐资源

- [Redis官方文档](https://redis.io/documentation)
- [缓存架构设计最佳实践](https://aws.amazon.com/caching/)
- 《Redis设计与实现》书籍

## 💡 下一步

- 学习[消息队列](./message-queue.md)应用
- 了解[数据库优化](./database-optimization.md)
- 掌握[限流与熔断](./rate-limiting-circuit-breaker.md)

---

*最后更新时间: 2025-01-20*

