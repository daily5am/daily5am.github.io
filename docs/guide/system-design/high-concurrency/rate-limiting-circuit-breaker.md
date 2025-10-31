# 限流与熔断

> **AI生成声明**: 本文档由AI辅助生成，旨在提供限流与熔断的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解限流和熔断的作用和原理
- 掌握常见的限流算法
- 了解熔断器的实现机制
- 学习限流和熔断的实践应用

## 📚 限流(Rate Limiting)

限流是控制系统处理请求的速率,防止系统过载。

### 限流的作用

1. **保护系统**: 防止突发流量压垮系统
2. **公平分配**: 保证资源公平分配
3. **成本控制**: 限制API调用次数
4. **提高稳定性**: 保证系统稳定运行

### 限流维度

- **QPS限流**: 限制每秒请求数
- **并发限流**: 限制同时处理的请求数
- **用户限流**: 限制单个用户的请求频率
- **IP限流**: 限制单个IP的访问频率

## 🔍 限流算法

### 1. 固定窗口算法

将时间划分为固定窗口,每个窗口内限制请求数量。

**优点**: 实现简单
**缺点**: 窗口边界可能出现突发流量

```python
from time import time

class FixedWindowLimiter:
    def __init__(self, max_requests, window_size):
        self.max_requests = max_requests
        self.window_size = window_size
        self.window_start = time()
        self.request_count = 0
    
    def allow(self):
        current_time = time()
        
        # 新窗口,重置计数
        if current_time - self.window_start >= self.window_size:
            self.window_start = current_time
            self.request_count = 0
        
        # 检查是否超限
        if self.request_count >= self.max_requests:
            return False
        
        self.request_count += 1
        return True
```

### 2. 滑动窗口算法

使用滑动窗口,平滑限制请求。

**优点**: 限流更平滑
**缺点**: 需要存储时间戳,内存开销大

```python
from collections import deque
from time import time

class SlidingWindowLimiter:
    def __init__(self, max_requests, window_size):
        self.max_requests = max_requests
        self.window_size = window_size
        self.requests = deque()
    
    def allow(self):
        current_time = time()
        
        # 移除过期请求
        while self.requests and self.requests[0] < current_time - self.window_size:
            self.requests.popleft()
        
        # 检查是否超限
        if len(self.requests) >= self.max_requests:
            return False
        
        self.requests.append(current_time)
        return True
```

### 3. 令牌桶算法

以固定速率生成令牌,请求需要获取令牌才能通过。

**优点**: 允许突发流量,平滑限流
**缺点**: 实现相对复杂

```python
from time import time
import threading

class TokenBucketLimiter:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity  # 桶容量
        self.tokens = capacity  # 当前令牌数
        self.refill_rate = refill_rate  # 每秒补充令牌数
        self.last_refill = time()
        self.lock = threading.Lock()
    
    def allow(self, tokens=1):
        with self.lock:
            current_time = time()
            # 补充令牌
            elapsed = current_time - self.last_refill
            new_tokens = elapsed * self.refill_rate
            self.tokens = min(self.capacity, self.tokens + new_tokens)
            self.last_refill = current_time
            
            # 检查是否有足够令牌
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False
```

### 4. 漏桶算法

请求进入漏桶,以固定速率流出。

**优点**: 严格控制流出速率
**缺点**: 不能处理突发流量

```python
from time import time
import threading

class LeakyBucketLimiter:
    def __init__(self, capacity, leak_rate):
        self.capacity = capacity  # 桶容量
        self.water = 0  # 当前水量
        self.leak_rate = leak_rate  # 每秒流出速率
        self.last_leak = time()
        self.lock = threading.Lock()
    
    def allow(self):
        with self.lock:
            current_time = time()
            # 漏水
            elapsed = current_time - self.last_leak
            leaked = elapsed * self.leak_rate
            self.water = max(0, self.water - leaked)
            self.last_leak = current_time
            
            # 检查是否有空间
            if self.water < self.capacity:
                self.water += 1
                return True
            return False
```

## 🚨 熔断器(Circuit Breaker)

熔断器是防止级联故障的保护机制,当服务出现故障时快速失败。

### 熔断器状态

1. **关闭(Closed)**: 正常状态,请求正常通过
2. **打开(Open)**: 故障状态,直接拒绝请求
3. **半开(Half-Open)**: 尝试恢复,允许少量请求通过

### 状态转换

```
关闭 → (失败率超阈值) → 打开 → (超时) → 半开
  ↑                                    ↓
  └──────────── (成功率恢复) ──────────┘
```

## 🏗️ 熔断器实现

```python
from time import time
from enum import Enum
import threading

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60, success_threshold=2):
        self.failure_threshold = failure_threshold  # 失败阈值
        self.timeout = timeout  # 打开状态持续时间
        self.success_threshold = success_threshold  # 半开状态成功阈值
        self.failure_count = 0
        self.success_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
        self.lock = threading.Lock()
    
    def call(self, func, *args, **kwargs):
        with self.lock:
            # 检查状态
            if self.state == CircuitState.OPEN:
                # 检查是否可以进入半开状态
                if time() - self.last_failure_time > self.timeout:
                    self.state = CircuitState.HALF_OPEN
                    self.success_count = 0
                else:
                    raise Exception("Circuit breaker is OPEN")
            elif self.state == CircuitState.HALF_OPEN:
                if self.success_count >= self.success_threshold:
                    self.state = CircuitState.CLOSED
                    self.failure_count = 0
        
        # 执行函数
        try:
            result = func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise e
    
    def on_success(self):
        with self.lock:
            if self.state == CircuitState.HALF_OPEN:
                self.success_count += 1
            elif self.state == CircuitState.CLOSED:
                self.failure_count = 0
    
    def on_failure(self):
        with self.lock:
            self.failure_count += 1
            self.last_failure_time = time()
            
            if self.failure_count >= self.failure_threshold:
                self.state = CircuitState.OPEN
            elif self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.OPEN
```

## 🚀 实践应用

### Nginx限流配置

```nginx
# 基于IP限流
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

server {
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://backend;
    }
}
```

### Redis限流实现

```python
import redis
import time

redis_client = redis.Redis(host='localhost', port=6379)

def rate_limit(key, max_requests, window_size):
    """基于Redis的滑动窗口限流"""
    current_time = time.time()
    window_start = current_time - window_size
    
    # 使用有序集合存储请求时间戳
    pipe = redis_client.pipeline()
    pipe.zremrangebyscore(key, 0, window_start)
    pipe.zcard(key)
    pipe.zadd(key, {str(current_time): current_time})
    pipe.expire(key, window_size)
    results = pipe.execute()
    
    request_count = results[1]
    
    if request_count >= max_requests:
        return False
    
    return True

# 使用示例
if rate_limit('user:123', 100, 60):  # 60秒内最多100次
    # 处理请求
    pass
else:
    # 限流
    return "Rate limit exceeded"
```

### Spring Cloud Gateway限流

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: api_route
          uri: http://backend
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10  # 每秒补充令牌数
                redis-rate-limiter.burstCapacity: 20  # 桶容量
                key-resolver: "#{@ipKeyResolver}"  # 限流key
```

## 📖 推荐资源

- [限流算法详解](https://en.wikipedia.org/wiki/Token_bucket)
- [Hystrix熔断器](https://github.com/Netflix/Hystrix)
- [Sentinel限流熔断](https://sentinelguard.io/zh-cn/)

## 💡 下一步

- 学习[高并发架构设计](./architecture-design.md)
- 深入了解[系统设计](./index.md)整体方案

---

*最后更新时间: 2025-01-20*

