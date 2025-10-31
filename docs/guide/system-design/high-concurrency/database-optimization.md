# 数据库优化

> **AI生成声明**: 本文档由AI辅助生成，旨在提供数据库优化的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解数据库在高并发场景下的挑战
- 掌握数据库优化策略
- 了解读写分离和分库分表
- 学习数据库连接池优化

## 📚 数据库高并发挑战

### 主要挑战

1. **连接数限制**: 数据库连接数有限,并发请求多时连接不够
2. **锁竞争**: 多个事务同时访问同一数据导致锁等待
3. **磁盘I/O**: 频繁的磁盘读写成为瓶颈
4. **查询性能**: 复杂查询和全表扫描影响性能

### 性能瓶颈点

- **CPU**: 复杂计算和排序
- **内存**: 缓冲池和缓存
- **磁盘**: 数据读写I/O
- **网络**: 数据传输带宽

## 🔍 数据库优化策略

### 1. 索引优化

**作用**: 加速查询,减少全表扫描

**优化原则**:
- 在WHERE、JOIN、ORDER BY字段上建立索引
- 避免过多索引(影响写入性能)
- 使用复合索引覆盖查询
- 定期分析索引使用情况

```sql
-- 创建索引示例
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_user_time ON orders(user_id, create_time);

-- 分析索引使用
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

### 2. 查询优化

**优化技巧**:
- 避免SELECT *,只查询需要的字段
- 使用LIMIT限制结果集
- 避免在WHERE子句中使用函数
- 合理使用JOIN,避免笛卡尔积

```sql
-- 优化前
SELECT * FROM orders WHERE YEAR(create_time) = 2024;

-- 优化后
SELECT id, user_id, amount FROM orders 
WHERE create_time >= '2024-01-01' AND create_time < '2025-01-01';
```

### 3. 表结构优化

- **字段类型**: 选择合适的数据类型
- **字段长度**: 避免过长的VARCHAR
- **NULL值**: 尽量减少NULL字段
- **范式设计**: 平衡范式和反范式

## 🏗️ 读写分离

### 原理

将数据库分为主库(写)和从库(读),写操作在主库,读操作在从库。

```
应用层
  ├─→ 主库(写)
  └─→ 从库(读)
```

### 优点

- 分担读压力
- 提高查询性能
- 提高可用性(从库故障不影响写)

### 实现方式

#### 1. 应用层分离

```python
# 主从数据库配置
DATABASES = {
    'default': {  # 主库(写)
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'master.db.com',
    },
    'slave': {  # 从库(读)
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'slave.db.com',
    }
}

# 读写分离装饰器
def read_from_slave(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        with router.db_for_read():
            return func(*args, **kwargs)
    return wrapper

@read_from_slave
def get_user(user_id):
    return User.objects.get(id=user_id)
```

#### 2. 中间件分离

- **MySQL Proxy**: MySQL官方代理
- **Atlas**: 奇虎360开源的数据库中间件
- **MyCat**: 开源分布式数据库中间件

### 注意事项

- **数据延迟**: 主从复制有延迟,需要考虑一致性
- **写后读**: 写操作后立即读可能需要读主库
- **故障切换**: 主库故障时需要切换到从库

## 📊 分库分表

### 垂直分库

按业务模块拆分数据库。

```
用户库(user_db)
订单库(order_db)
商品库(product_db)
```

### 水平分表

按数据范围或哈希值拆分表。

```
orders_0  (user_id % 4 = 0)
orders_1  (user_id % 4 = 1)
orders_2  (user_id % 4 = 2)
orders_3  (user_id % 4 = 3)
```

### 分片策略

#### 1. 范围分片

```python
def get_shard_by_range(user_id):
    if user_id < 1000000:
        return 'shard_0'
    elif user_id < 2000000:
        return 'shard_1'
    else:
        return 'shard_2'
```

#### 2. 哈希分片

```python
def get_shard_by_hash(user_id):
    shard_count = 4
    shard_index = user_id % shard_count
    return f'shard_{shard_index}'
```

#### 3. 一致性哈希

适合动态扩容场景。

### 分库分表中间件

- **ShardingSphere**: Apache开源分布式数据库中间件
- **MyCat**: 数据库分库分表中间件
- **TDDL**: 阿里巴巴分布式数据库服务

## 💾 连接池优化

### 连接池参数

- **最大连接数**: max_connections
- **最小连接数**: min_connections
- **连接超时**: connection_timeout
- **空闲超时**: idle_timeout

### 连接池配置示例

```python
# HikariCP配置
config = {
    'jdbcUrl': 'jdbc:mysql://localhost:3306/mydb',
    'username': 'user',
    'password': 'password',
    'maximumPoolSize': 20,  # 最大连接数
    'minimumIdle': 5,  # 最小空闲连接
    'connectionTimeout': 30000,  # 连接超时
    'idleTimeout': 600000,  # 空闲超时
    'maxLifetime': 1800000,  # 连接最大生命周期
}
```

### 连接池监控

- 活跃连接数
- 空闲连接数
- 等待连接的线程数
- 连接获取时间

## 🚀 其他优化策略

### 1. 批量操作

```sql
-- 批量插入
INSERT INTO users (name, email) VALUES
('user1', 'user1@example.com'),
('user2', 'user2@example.com'),
('user3', 'user3@example.com');
```

### 2. 事务优化

- 减少事务时间
- 避免长事务
- 合理使用事务隔离级别

### 3. 缓存查询结果

- 缓存热点数据
- 缓存统计结果
- 避免重复查询

### 4. 数据库参数调优

- **缓冲池大小**: innodb_buffer_pool_size
- **日志文件大小**: innodb_log_file_size
- **查询缓存**: query_cache_size(MySQL 5.7已移除)

## 📖 推荐资源

- [MySQL性能优化](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [ShardingSphere官方文档](https://shardingsphere.apache.org/document/current/cn/overview/)
- 《高性能MySQL》书籍

## 💡 下一步

- 学习[限流与熔断](./rate-limiting-circuit-breaker.md)
- 了解[高并发架构设计](./architecture-design.md)

---

*最后更新时间: 2025-01-20*

