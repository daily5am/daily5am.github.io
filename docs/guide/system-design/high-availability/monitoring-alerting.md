# 监控告警

> **AI生成声明**: 本文档由AI辅助生成，旨在提供监控告警的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解监控告警的重要性
- 掌握监控指标的分类和选择
- 了解常见的监控工具
- 学习告警策略和最佳实践

## 📚 监控体系

### 监控层次

#### 1. 基础设施监控

- **服务器监控**: CPU、内存、磁盘、网络
- **网络监控**: 带宽、延迟、丢包率
- **存储监控**: 容量、IOPS、读写速度

#### 2. 应用监控

- **性能监控**: 响应时间、吞吐量、错误率
- **业务监控**: 订单量、支付成功率、用户活跃度
- **日志监控**: 错误日志、异常日志、访问日志

#### 3. 用户体验监控

- **真实用户监控(RUM)**: 页面加载时间、交互响应时间
- **合成监控**: 模拟用户行为监控
- **可用性监控**: 服务可用性、SLA达成情况

## 🔍 关键监控指标

### 系统指标

#### CPU使用率

```python
import psutil

def get_cpu_metrics():
    """获取CPU指标"""
    return {
        'cpu_percent': psutil.cpu_percent(interval=1),
        'cpu_count': psutil.cpu_count(),
        'cpu_load': psutil.getloadavg()  # Linux/Unix
    }
```

#### 内存使用率

```python
def get_memory_metrics():
    """获取内存指标"""
    memory = psutil.virtual_memory()
    return {
        'total': memory.total,
        'available': memory.available,
        'used': memory.used,
        'percent': memory.percent
    }
```

#### 磁盘使用率

```python
def get_disk_metrics():
    """获取磁盘指标"""
    disk = psutil.disk_usage('/')
    return {
        'total': disk.total,
        'used': disk.used,
        'free': disk.free,
        'percent': disk.percent
    }
```

### 应用指标

#### 响应时间

```python
import time
from functools import wraps

def monitor_response_time(func):
    """监控响应时间装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            response_time = (time.time() - start_time) * 1000  # 转换为毫秒
            
            # 记录指标
            record_metric('response_time', response_time, {
                'function': func.__name__
            })
            
            return result
        except Exception as e:
            # 记录错误
            record_error(func.__name__, str(e))
            raise
    return wrapper

# 使用示例
@monitor_response_time
def process_request(data):
    # 处理请求
    time.sleep(0.1)
    return {'status': 'success'}
```

#### 错误率

```python
class ErrorRateMonitor:
    def __init__(self, window_size=60):
        self.window_size = window_size
        self.errors = []
        self.total_requests = []
    
    def record_request(self, success=True):
        """记录请求"""
        current_time = time.time()
        self.total_requests.append(current_time)
        
        if not success:
            self.errors.append(current_time)
        
        # 清理过期数据
        self._clean_old_data(current_time)
    
    def get_error_rate(self):
        """计算错误率"""
        if len(self.total_requests) == 0:
            return 0.0
        
        window_start = time.time() - self.window_size
        recent_errors = sum(1 for t in self.errors if t > window_start)
        recent_requests = sum(1 for t in self.total_requests if t > window_start)
        
        if recent_requests == 0:
            return 0.0
        
        return recent_errors / recent_requests
    
    def _clean_old_data(self, current_time):
        """清理过期数据"""
        cutoff = current_time - self.window_size
        self.errors = [t for t in self.errors if t > cutoff]
        self.total_requests = [t for t in self.total_requests if t > cutoff]
```

### 业务指标

```python
class BusinessMetrics:
    def __init__(self):
        self.metrics = {
            'orders': 0,
            'revenue': 0.0,
            'active_users': set(),
            'conversion_rate': 0.0
        }
    
    def record_order(self, user_id, amount):
        """记录订单"""
        self.metrics['orders'] += 1
        self.metrics['revenue'] += amount
        self.metrics['active_users'].add(user_id)
    
    def calculate_conversion_rate(self, total_visitors):
        """计算转化率"""
        if total_visitors == 0:
            return 0.0
        self.metrics['conversion_rate'] = len(self.metrics['active_users']) / total_visitors
        return self.metrics['conversion_rate']
```

## 🏗️ 监控工具

### Prometheus + Grafana

#### Prometheus配置

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'app'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/metrics'
```

#### Python应用集成

```python
from prometheus_client import Counter, Histogram, Gauge, start_http_server

# 定义指标
request_count = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])
request_duration = Histogram('http_request_duration_seconds', 'HTTP request duration')
active_connections = Gauge('active_connections', 'Number of active connections')

# 记录指标
def handle_request(method, endpoint):
    request_count.labels(method=method, endpoint=endpoint).inc()
    
    with request_duration.time():
        # 处理请求
        process_request()
    
    active_connections.inc()

# 启动Prometheus指标服务器
start_http_server(8000)
```

### ELK Stack

#### Elasticsearch + Logstash + Kibana

```python
import logging
from pythonjsonlogger import jsonlogger

# 配置JSON日志
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)

logger = logging.getLogger()
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

# 记录日志
logger.info("User logged in", extra={
    'user_id': '12345',
    'ip': '192.168.1.1',
    'timestamp': '2024-01-20T10:00:00Z'
})
```

### 自定义监控

```python
import time
import threading
from collections import defaultdict

class SimpleMonitor:
    def __init__(self):
        self.metrics = defaultdict(list)
        self.lock = threading.Lock()
    
    def record(self, metric_name, value, tags=None):
        """记录指标"""
        with self.lock:
            self.metrics[metric_name].append({
                'value': value,
                'timestamp': time.time(),
                'tags': tags or {}
            })
    
    def get_metrics(self, metric_name, window_size=300):
        """获取指标数据"""
        with self.lock:
            cutoff = time.time() - window_size
            recent_metrics = [
                m for m in self.metrics[metric_name]
                if m['timestamp'] > cutoff
            ]
            return recent_metrics
    
    def get_statistics(self, metric_name, window_size=300):
        """获取统计信息"""
        metrics = self.get_metrics(metric_name, window_size)
        if not metrics:
            return None
        
        values = [m['value'] for m in metrics]
        return {
            'count': len(values),
            'min': min(values),
            'max': max(values),
            'avg': sum(values) / len(values),
            'sum': sum(values)
        }
```

## 🚨 告警策略

### 告警规则

#### 阈值告警

```python
class AlertManager:
    def __init__(self):
        self.rules = [
            {
                'metric': 'cpu_usage',
                'threshold': 80,
                'operator': '>',
                'severity': 'warning'
            },
            {
                'metric': 'memory_usage',
                'threshold': 90,
                'operator': '>',
                'severity': 'critical'
            },
            {
                'metric': 'error_rate',
                'threshold': 0.05,
                'operator': '>',
                'severity': 'warning'
            }
        ]
    
    def check_alerts(self, metrics):
        """检查告警"""
        alerts = []
        
        for rule in self.rules:
            metric_name = rule['metric']
            threshold = rule['threshold']
            operator = rule['operator']
            severity = rule['severity']
            
            value = metrics.get(metric_name)
            if value is None:
                continue
            
            if self._compare(value, operator, threshold):
                alerts.append({
                    'metric': metric_name,
                    'value': value,
                    'threshold': threshold,
                    'severity': severity,
                    'message': f"{metric_name} {operator} {threshold}"
                })
        
        return alerts
    
    def _compare(self, value, operator, threshold):
        """比较操作"""
        if operator == '>':
            return value > threshold
        elif operator == '<':
            return value < threshold
        elif operator == '>=':
            return value >= threshold
        elif operator == '<=':
            return value <= threshold
        elif operator == '==':
            return value == threshold
        return False
```

### 告警抑制

```python
class AlertSuppressor:
    def __init__(self):
        self.active_alerts = {}
        self.suppression_rules = {
            'cpu_usage': 300,  # 5分钟内不重复告警
            'memory_usage': 300,
            'error_rate': 60  # 1分钟内不重复告警
        }
    
    def should_alert(self, alert):
        """判断是否应该发送告警"""
        metric_name = alert['metric']
        last_alert_time = self.active_alerts.get(metric_name, 0)
        suppression_window = self.suppression_rules.get(metric_name, 300)
        
        current_time = time.time()
        
        if current_time - last_alert_time > suppression_window:
            self.active_alerts[metric_name] = current_time
            return True
        
        return False
```

### 告警通知

```python
class AlertNotifier:
    def __init__(self):
        self.channels = {
            'email': self.send_email,
            'sms': self.send_sms,
            'webhook': self.send_webhook,
            'slack': self.send_slack
        }
    
    def notify(self, alert, channels=None):
        """发送告警通知"""
        if channels is None:
            channels = ['email', 'webhook']
        
        for channel in channels:
            if channel in self.channels:
                try:
                    self.channels[channel](alert)
                except Exception as e:
                    print(f"告警发送失败 {channel}: {e}")
    
    def send_email(self, alert):
        """发送邮件"""
        # 实现邮件发送逻辑
        print(f"发送邮件告警: {alert['message']}")
    
    def send_webhook(self, alert):
        """发送Webhook"""
        import requests
        requests.post('https://webhook.url', json=alert)
    
    def send_slack(self, alert):
        """发送Slack通知"""
        import requests
        payload = {
            'text': f"🚨 {alert['severity'].upper()}: {alert['message']}"
        }
        requests.post('https://hooks.slack.com/...', json=payload)
```

## 📊 监控面板

### Grafana仪表板配置

```json
{
  "dashboard": {
    "title": "应用监控",
    "panels": [
      {
        "title": "CPU使用率",
        "targets": [
          {
            "expr": "cpu_usage_percent",
            "legendFormat": "{{instance}}"
          }
        ]
      },
      {
        "title": "响应时间",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, http_request_duration_seconds_bucket)",
            "legendFormat": "P95"
          }
        ]
      }
    ]
  }
}
```

## ⚠️ 最佳实践

### 1. 告警规则设计

- **避免告警风暴**: 合理设置告警阈值和抑制
- **分级告警**: 根据严重程度分级
- **告警聚合**: 相关告警聚合发送

### 2. 监控覆盖

- **全链路监控**: 覆盖所有关键路径
- **关键指标**: 重点监控核心指标
- **业务指标**: 监控业务相关指标

### 3. 性能考虑

- **采样**: 高频率指标适当采样
- **聚合**: 在采集端聚合减少数据量
- **存储**: 合理设置数据保留策略

## 📖 推荐资源

- [Prometheus官方文档](https://prometheus.io/docs/)
- [Grafana文档](https://grafana.com/docs/)
- [ELK Stack指南](https://www.elastic.co/guide/)

## 💡 下一步

- 学习[数据一致性](./data-consistency.md)保证
- 了解[高可用架构设计](./architecture-design.md)

---

*最后更新时间: 2025-01-20*

