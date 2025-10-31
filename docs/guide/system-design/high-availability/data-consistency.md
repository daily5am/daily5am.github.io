# 数据一致性

> **AI生成声明**: 本文档由AI辅助生成，旨在提供数据一致性的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解数据一致性的概念和重要性
- 掌握CAP理论和BASE理论
- 了解数据一致性保证机制
- 学习分布式事务和最终一致性

## 📚 数据一致性概念

### 一致性类型

#### 1. 强一致性

所有节点在同一时刻看到相同的数据。

**特点**:
- 数据完全一致
- 性能影响较大
- 可用性可能受影响

#### 2. 弱一致性

系统不保证立即一致,但保证最终一致。

**特点**:
- 性能好
- 可能出现短暂不一致
- 最终会达到一致

#### 3. 最终一致性

系统保证在没有新的更新操作后,最终会达到一致状态。

**特点**:
- 性能好
- 延迟一致性
- 适合大多数场景

### 一致性场景

- **主从复制**: 主库写入,从库同步
- **分布式缓存**: 缓存与数据库一致
- **分布式存储**: 多副本数据一致
- **分布式事务**: 跨服务数据一致

## 🔍 CAP理论

### CAP定理

在一个分布式系统中,以下三个特性最多只能同时满足两个:

- **C (Consistency)**: 一致性
- **A (Availability)**: 可用性
- **P (Partition tolerance)**: 分区容错性

### CAP组合

#### CP系统

保证一致性和分区容错性,牺牲可用性。

**示例**: 分布式数据库(如MongoDB、HBase)

#### AP系统

保证可用性和分区容错性,牺牲一致性。

**示例**: DNS系统、CDN系统

#### CA系统

保证一致性和可用性,不适合分布式环境。

**注意**: 实际分布式系统必须满足P,所以CA组合在分布式系统中不存在。

## 🏗️ BASE理论

### BASE含义

- **BA (Basically Available)**: 基本可用
- **S (Soft state)**: 软状态
- **E (Eventual consistency)**: 最终一致性

### BASE vs ACID

| 特性 | ACID | BASE |
|------|------|------|
| 一致性 | 强一致性 | 最终一致性 |
| 可用性 | 低(强一致导致) | 高 |
| 事务 | 支持 | 不支持 |
| 性能 | 低 | 高 |

## 💾 数据一致性保证

### 1. 主从复制一致性

#### 同步复制

主库等待所有从库确认后才返回成功。

```sql
-- MySQL半同步复制
SET GLOBAL rpl_semi_sync_master_enabled = 1;
SET GLOBAL rpl_semi_sync_slave_enabled = 1;
```

**优点**: 数据一致性好
**缺点**: 性能影响,可用性降低

#### 异步复制

主库不等待从库确认直接返回。

**优点**: 性能好,可用性高
**缺点**: 可能丢失数据

### 2. 分布式锁

保证同一时刻只有一个节点能修改数据。

```python
import redis
import time
import uuid

class DistributedLock:
    def __init__(self, redis_client, key, timeout=10):
        self.redis = redis_client
        self.key = f"lock:{key}"
        self.timeout = timeout
        self.identifier = str(uuid.uuid4())
    
    def acquire(self, block=True, timeout=None):
        """获取锁"""
        end_time = time.time() + (timeout or self.timeout)
        
        while True:
            # 尝试获取锁
            if self.redis.set(self.key, self.identifier, nx=True, ex=self.timeout):
                return True
            
            if not block or time.time() > end_time:
                return False
            
            time.sleep(0.001)  # 短暂等待后重试
    
    def release(self):
        """释放锁"""
        # 使用Lua脚本保证原子性
        lua_script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        self.redis.eval(lua_script, 1, self.key, self.identifier)

# 使用示例
redis_client = redis.Redis()
lock = DistributedLock(redis_client, 'user:123')

if lock.acquire():
    try:
        # 修改数据
        update_user_data('user:123')
    finally:
        lock.release()
```

### 3. 版本控制

使用版本号或时间戳保证数据一致性。

```python
class VersionedData:
    def __init__(self):
        self.data = {}
        self.versions = {}
    
    def update(self, key, value, expected_version=None):
        """更新数据(带版本检查)"""
        current_version = self.versions.get(key, 0)
        
        # 乐观锁检查
        if expected_version is not None and current_version != expected_version:
            raise ValueError("版本不匹配,更新失败")
        
        # 更新数据和版本
        self.data[key] = value
        self.versions[key] = current_version + 1
        
        return self.versions[key]
    
    def get(self, key):
        """获取数据和版本"""
        return {
            'value': self.data.get(key),
            'version': self.versions.get(key, 0)
        }

# 使用示例
store = VersionedData()

# 第一次更新
version = store.update('user:123', {'name': 'Alice'})

# 读取数据
data = store.get('user:123')
current_version = data['version']

# 带版本检查的更新
try:
    store.update('user:123', {'name': 'Bob'}, expected_version=current_version)
except ValueError as e:
    print(f"更新失败: {e}")
```

### 4. 两阶段提交(2PC)

分布式事务协议,保证所有节点同时提交或回滚。

```python
class TwoPhaseCommit:
    def __init__(self, participants):
        self.participants = participants
        self.transaction_id = None
    
    def prepare(self, transaction_id):
        """阶段1: 准备阶段"""
        self.transaction_id = transaction_id
        prepare_results = []
        
        for participant in self.participants:
            try:
                result = participant.prepare(transaction_id)
                prepare_results.append(result)
            except Exception as e:
                # 任一节点失败,回滚所有
                self.rollback(transaction_id)
                raise
        
        return all(prepare_results)
    
    def commit(self, transaction_id):
        """阶段2: 提交阶段"""
        if not self.prepare(transaction_id):
            return False
        
        commit_results = []
        for participant in self.participants:
            try:
                result = participant.commit(transaction_id)
                commit_results.append(result)
            except Exception as e:
                # 提交失败,尝试回滚
                self.rollback(transaction_id)
                raise
        
        return all(commit_results)
    
    def rollback(self, transaction_id):
        """回滚"""
        for participant in self.participants:
            try:
                participant.rollback(transaction_id)
            except Exception as e:
                print(f"回滚失败: {e}")
```

### 5. 最终一致性实现

#### 消息队列保证

```python
import json
from kafka import KafkaProducer, KafkaConsumer

class EventualConsistency:
    def __init__(self, kafka_producer, kafka_consumer):
        self.producer = kafka_producer
        self.consumer = kafka_consumer
    
    def update_primary(self, key, value):
        """更新主数据"""
        # 1. 更新主库
        update_database(key, value)
        
        # 2. 发送同步消息
        event = {
            'key': key,
            'value': value,
            'timestamp': time.time()
        }
        self.producer.send('data_sync', json.dumps(event).encode())
    
    def sync_to_cache(self):
        """同步到缓存"""
        for message in self.consumer:
            event = json.loads(message.value.decode())
            
            # 更新缓存
            update_cache(event['key'], event['value'])
            
            # 确认消费
            self.consumer.commit()
```

#### 版本向量

```python
class VersionVector:
    def __init__(self, node_id):
        self.node_id = node_id
        self.vector = {node_id: 0}
    
    def increment(self):
        """递增版本"""
        self.vector[self.node_id] = self.vector.get(self.node_id, 0) + 1
    
    def update(self, other_vector):
        """合并版本向量"""
        for node, version in other_vector.items():
            current_version = self.vector.get(node, 0)
            self.vector[node] = max(current_version, version)
    
    def compare(self, other_vector):
        """比较版本向量"""
        for node in set(self.vector.keys()) | set(other_vector.keys()):
            v1 = self.vector.get(node, 0)
            v2 = other_vector.get(node, 0)
            
            if v1 < v2:
                return -1  # 小于
            elif v1 > v2:
                return 1  # 大于
        
        return 0  # 相等
```

## 🚀 实践应用

### 分布式事务解决方案

#### Saga模式

```python
class SagaOrchestrator:
    def __init__(self):
        self.steps = []
        self.compensations = []
    
    def add_step(self, action, compensation):
        """添加步骤"""
        self.steps.append(action)
        self.compensations.append(compensation)
    
    def execute(self):
        """执行Saga"""
        completed_steps = []
        
        try:
            for i, step in enumerate(self.steps):
                step()  # 执行步骤
                completed_steps.append(i)
            
            return True
        except Exception as e:
            # 补偿已完成的步骤
            for i in reversed(completed_steps):
                self.compensations[i]()
            raise e
```

### 分布式锁应用

```python
# 使用分布式锁保证库存扣减一致性
def deduct_inventory(product_id, quantity):
    lock_key = f"inventory_lock:{product_id}"
    lock = DistributedLock(redis_client, lock_key, timeout=10)
    
    if lock.acquire():
        try:
            # 检查库存
            current_stock = get_inventory(product_id)
            if current_stock < quantity:
                raise ValueError("库存不足")
            
            # 扣减库存
            update_inventory(product_id, current_stock - quantity)
            return True
        finally:
            lock.release()
    else:
        raise Exception("获取锁失败")
```

## ⚠️ 注意事项

### 1. 性能权衡

- **强一致性**: 性能影响大
- **最终一致性**: 性能好,但需要处理不一致

### 2. 故障处理

- **数据冲突**: 设计冲突解决策略
- **补偿机制**: 失败后补偿处理
- **重试机制**: 失败后重试

### 3. 业务场景

- **金融系统**: 强一致性
- **电商系统**: 最终一致性
- **社交系统**: 弱一致性

## 📖 推荐资源

- [CAP理论详解](https://en.wikipedia.org/wiki/CAP_theorem)
- [分布式系统一致性](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)
- 《数据密集型应用系统设计》书籍

## 💡 下一步

- 学习[高可用架构设计](./architecture-design.md)
- 深入了解分布式系统一致性

---

*最后更新时间: 2025-01-20*

