# 服务降级

> **AI生成声明**: 本文档由AI辅助生成，旨在提供服务降级的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解服务降级的概念和作用
- 掌握服务降级的策略和实现方式
- 了解降级场景和触发条件
- 学习服务降级的最佳实践

## 📚 什么是服务降级

服务降级(Service Degradation)是指在系统资源不足或服务异常时,暂时关闭或减少非核心功能,保证核心服务的可用性。

### 降级的目的

1. **保证核心功能**: 优先保证核心业务可用
2. **防止系统崩溃**: 减轻系统压力
3. **改善用户体验**: 提供降级后的替代方案
4. **快速恢复**: 快速缓解系统压力

### 降级场景

- **流量突增**: 秒杀、抢购等突发流量
- **资源不足**: CPU、内存、数据库连接耗尽
- **依赖服务异常**: 第三方服务不可用
- **系统故障**: 部分服务异常

## 🔍 降级策略

### 1. 功能降级

关闭或简化非核心功能。

**示例**:
- 关闭个性化推荐
- 简化数据展示
- 关闭非必要的统计功能

### 2. 数据降级

使用缓存数据或简化数据。

**示例**:
- 使用缓存数据替代数据库查询
- 返回静态数据
- 简化数据格式

### 3. 服务降级

关闭部分服务,保证核心服务。

**示例**:
- 关闭搜索服务,使用简单列表
- 关闭推荐服务
- 关闭非核心API

### 4. 用户降级

对不同用户提供不同服务级别。

**示例**:
- VIP用户优先服务
- 普通用户限流
- 新用户功能受限

## 🏗️ 降级实现方式

### 1. 开关降级

通过配置开关控制功能开关。

```python
class FeatureToggle:
    def __init__(self):
        self.features = {
            'recommendation': True,
            'search': True,
            'personalization': True
        }
    
    def is_feature_enabled(self, feature_name):
        """检查功能是否启用"""
        return self.features.get(feature_name, False)
    
    def disable_feature(self, feature_name):
        """关闭功能"""
        self.features[feature_name] = False
        print(f"功能 {feature_name} 已关闭")
    
    def enable_feature(self, feature_name):
        """启用功能"""
        self.features[feature_name] = True
        print(f"功能 {feature_name} 已启用")

# 使用示例
toggle = FeatureToggle()

def get_recommendations(user_id):
    """获取推荐"""
    if not toggle.is_feature_enabled('recommendation'):
        # 降级: 返回默认推荐
        return get_default_recommendations()
    
    # 正常逻辑
    return get_recommendations_from_ai(user_id)
```

### 2. 限流降级

通过限流自动触发降级。

```python
from collections import deque
from time import time

class RateLimiter:
    def __init__(self, max_requests, window_size):
        self.max_requests = max_requests
        self.window_size = window_size
        self.requests = deque()
        self.degraded = False
    
    def allow_request(self):
        """检查是否允许请求"""
        current_time = time()
        
        # 清理过期请求
        while self.requests and self.requests[0] < current_time - self.window_size:
            self.requests.popleft()
        
        # 检查是否超限
        if len(self.requests) >= self.max_requests:
            self.degraded = True
            return False
        
        self.requests.append(current_time)
        self.degraded = False
        return True
    
    def is_degraded(self):
        """检查是否处于降级状态"""
        return self.degraded

# 使用示例
limiter = RateLimiter(max_requests=100, window_size=60)

def handle_request():
    if not limiter.allow_request():
        # 降级处理
        return degrade_service()
    
    # 正常处理
    return normal_service()
```

### 3. 异常降级

服务异常时自动降级。

```python
class DegradationManager:
    def __init__(self):
        self.error_count = {}
        self.error_threshold = 10
        self.degraded_services = set()
    
    def check_service_health(self, service_name, func):
        """检查服务健康并执行降级"""
        try:
            return func()
        except Exception as e:
            # 记录错误
            self.error_count[service_name] = self.error_count.get(service_name, 0) + 1
            
            # 检查是否超过阈值
            if self.error_count[service_name] >= self.error_threshold:
                self.degraded_services.add(service_name)
                print(f"服务 {service_name} 已降级")
            
            # 返回降级结果
            return self.get_degraded_result(service_name)
    
    def get_degraded_result(self, service_name):
        """获取降级结果"""
        if service_name == 'search':
            return []  # 返回空列表
        elif service_name == 'recommendation':
            return get_default_recommendations()
        else:
            return None

# 使用示例
manager = DegradationManager()

def search_products(query):
    """搜索商品"""
    return manager.check_service_health('search', lambda: search_service(query))
```

### 4. 资源降级

根据系统资源使用情况降级。

```python
import psutil

class ResourceBasedDegradation:
    def __init__(self):
        self.thresholds = {
            'cpu': 80,
            'memory': 80,
            'disk': 90
        }
    
    def check_resources(self):
        """检查系统资源"""
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        issues = []
        
        if cpu_percent > self.thresholds['cpu']:
            issues.append('cpu')
        
        if memory.percent > self.thresholds['memory']:
            issues.append('memory')
        
        if disk.percent > self.thresholds['disk']:
            issues.append('disk')
        
        return issues
    
    def should_degrade(self):
        """判断是否应该降级"""
        issues = self.check_resources()
        return len(issues) > 0
    
    def get_degradation_level(self):
        """获取降级级别"""
        issues = self.check_resources()
        if len(issues) >= 2:
            return 'severe'  # 严重降级
        elif len(issues) == 1:
            return 'moderate'  # 中等降级
        else:
            return 'normal'

# 使用示例
resource_checker = ResourceBasedDegradation()

def handle_request():
    if resource_checker.should_degrade():
        level = resource_checker.get_degradation_level()
        
        if level == 'severe':
            # 只提供核心功能
            return core_service_only()
        elif level == 'moderate':
            # 关闭部分功能
            return degrade_some_features()
    
    return full_service()
```

## 🚀 降级实践

### Hystrix降级

```java
// Java示例 - 使用Hystrix
@HystrixCommand(fallbackMethod = "getDefaultRecommendations")
public List<Recommendation> getRecommendations(String userId) {
    return recommendationService.getRecommendations(userId);
}

public List<Recommendation> getDefaultRecommendations(String userId) {
    // 降级方法: 返回默认推荐
    return Arrays.asList(
        new Recommendation("default1"),
        new Recommendation("default2")
    );
}
```

### Sentinel降级

```java
// Java示例 - 使用Sentinel
@SentinelResource(
    value = "getRecommendations",
    fallback = "getDefaultRecommendations",
    blockHandler = "handleBlock"
)
public List<Recommendation> getRecommendations(String userId) {
    return recommendationService.getRecommendations(userId);
}

public List<Recommendation> getDefaultRecommendations(String userId) {
    // 降级方法
    return getDefaultRecommendations();
}
```

### 降级配置

```yaml
# 降级配置示例
degradation:
  rules:
    - service: recommendation
      strategy: error_count
      threshold: 10
      window: 60
      fallback: default_recommendations
    
    - service: search
      strategy: response_time
      threshold: 1000  # ms
      fallback: simple_search
    
    - service: personalization
      strategy: cpu_usage
      threshold: 80
      fallback: disable
```

## 📊 降级监控

### 降级指标

- **降级次数**: 触发降级的次数
- **降级时长**: 降级持续时间
- **影响用户数**: 受降级影响的用户数
- **恢复时间**: 从降级到恢复的时间

### 监控告警

```python
class DegradationMonitor:
    def __init__(self):
        self.metrics = {
            'degradation_count': 0,
            'degradation_duration': 0,
            'affected_users': 0
        }
        self.start_time = None
    
    def record_degradation(self, service_name, user_count=1):
        """记录降级事件"""
        self.metrics['degradation_count'] += 1
        self.metrics['affected_users'] += user_count
        self.start_time = time.time()
        
        # 发送告警
        self.send_alert(f"服务 {service_name} 已降级")
    
    def record_recovery(self, service_name):
        """记录恢复事件"""
        if self.start_time:
            duration = time.time() - self.start_time
            self.metrics['degradation_duration'] += duration
            self.start_time = None
        
        # 发送恢复通知
        self.send_alert(f"服务 {service_name} 已恢复")
    
    def send_alert(self, message):
        """发送告警"""
        # 发送到监控系统
        print(f"告警: {message}")
```

## ⚠️ 注意事项

### 1. 降级策略设计

- **明确核心功能**: 确定哪些是核心功能
- **降级顺序**: 设计合理的降级顺序
- **用户体验**: 降级时提供友好提示

### 2. 降级恢复

- **自动恢复**: 条件满足时自动恢复
- **手动恢复**: 支持手动触发恢复
- **恢复验证**: 恢复后验证功能正常

### 3. 降级通知

- **用户通知**: 告知用户当前状态
- **运维通知**: 及时通知运维人员
- **监控记录**: 记录降级事件

## 📖 推荐资源

- [Hystrix文档](https://github.com/Netflix/Hystrix)
- [Sentinel文档](https://sentinelguard.io/zh-cn/)
- 《微服务架构设计模式》书籍

## 💡 下一步

- 学习[监控告警](./monitoring-alerting.md)机制
- 了解[数据一致性](./data-consistency.md)保证
- 掌握[高可用架构设计](./architecture-design.md)

---

*最后更新时间: 2025-01-20*

