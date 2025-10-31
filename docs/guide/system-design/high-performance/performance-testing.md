# 性能测试与调优

> **AI生成声明**: 本文档由AI辅助生成，旨在提供性能测试与调优的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解性能测试的类型和方法
- 掌握性能测试工具的使用
- 了解性能调优的步骤和技巧
- 学习性能测试的实践应用

## 📚 性能测试类型

### 1. 负载测试(Load Testing)

在正常和预期峰值负载条件下测试系统性能。

**目标**: 验证系统在正常负载下的性能

```python
import requests
import time
from concurrent.futures import ThreadPoolExecutor
import statistics

class LoadTester:
    def __init__(self, url, concurrent_users=10, duration=60):
        self.url = url
        self.concurrent_users = concurrent_users
        self.duration = duration
        self.results = []
    
    def send_request(self):
        """发送单个请求"""
        start_time = time.time()
        try:
            response = requests.get(self.url, timeout=10)
            elapsed = (time.time() - start_time) * 1000
            return {
                'status_code': response.status_code,
                'response_time': elapsed,
                'success': response.status_code == 200
            }
        except Exception as e:
            return {
                'status_code': 0,
                'response_time': (time.time() - start_time) * 1000,
                'success': False,
                'error': str(e)
            }
    
    def run_test(self):
        """运行负载测试"""
        end_time = time.time() + self.duration
        request_count = 0
        
        with ThreadPoolExecutor(max_workers=self.concurrent_users) as executor:
            while time.time() < end_time:
                futures = []
                for _ in range(self.concurrent_users):
                    future = executor.submit(self.send_request)
                    futures.append(future)
                
                for future in futures:
                    result = future.result()
                    self.results.append(result)
                    request_count += 1
        
        return self.generate_report()
    
    def generate_report(self):
        """生成测试报告"""
        response_times = [r['response_time'] for r in self.results if r['success']]
        success_count = sum(1 for r in self.results if r['success'])
        total_count = len(self.results)
        
        if not response_times:
            return {'error': 'No successful requests'}
        
        return {
            'total_requests': total_count,
            'successful_requests': success_count,
            'failed_requests': total_count - success_count,
            'success_rate': success_count / total_count * 100,
            'avg_response_time': statistics.mean(response_times),
            'median_response_time': statistics.median(response_times),
            'p95_response_time': statistics.quantiles(response_times, n=20)[18],
            'p99_response_time': statistics.quantiles(response_times, n=100)[98],
            'min_response_time': min(response_times),
            'max_response_time': max(response_times),
            'throughput': success_count / self.duration  # RPS
        }

# 使用示例
tester = LoadTester('http://example.com/api', concurrent_users=50, duration=60)
report = tester.run_test()
print(report)
```

### 2. 压力测试(Stress Testing)

在超出正常负载的条件下测试系统。

**目标**: 找到系统的性能极限

### 3. 容量测试(Capacity Testing)

测试系统在特定负载下的容量。

**目标**: 确定系统能够支持的最大用户数或负载

### 4. 稳定性测试(Stability Testing)

长时间运行测试,检查内存泄漏等问题。

**目标**: 验证系统的稳定性

## 🔧 性能测试工具

### 1. Apache JMeter

```python
# JMeter可以通过Python脚本调用
import subprocess
import json

def run_jmeter_test(plan_file, result_file):
    """运行JMeter测试计划"""
    cmd = [
        'jmeter',
        '-n',  # 非GUI模式
        '-t', plan_file,  # 测试计划文件
        '-l', result_file  # 结果文件
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0

def parse_jmeter_results(result_file):
    """解析JMeter结果"""
    # 解析CSV结果文件
    import csv
    
    results = []
    with open(result_file, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            results.append({
                'timestamp': row['timeStamp'],
                'elapsed': float(row['elapsed']),
                'success': row['success'] == 'true',
                'response_code': row['responseCode']
            })
    
    return results
```

### 2. Locust

```python
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)  # 用户等待时间
    
    @task(3)  # 权重3,执行频率更高
    def index(self):
        self.client.get("/")
    
    @task(1)  # 权重1
    def about(self):
        self.client.get("/about")
    
    def on_start(self):
        """用户启动时执行"""
        # 登录等操作
        pass

# 运行: locust -f locustfile.py
```

### 3. wrk

```bash
# 基本用法
wrk -t12 -c400 -d30s http://example.com

# 使用Lua脚本
wrk -t12 -c400 -d30s -s script.lua http://example.com
```

## 🚀 性能调优流程

### 1. 基线测试

建立性能基线,作为对比基准。

```python
def baseline_test():
    """建立性能基线"""
    metrics = {
        'response_time': [],
        'throughput': [],
        'error_rate': []
    }
    
    # 运行测试并收集指标
    for _ in range(10):
        result = run_performance_test()
        metrics['response_time'].append(result['avg_response_time'])
        metrics['throughput'].append(result['throughput'])
        metrics['error_rate'].append(result['error_rate'])
    
    baseline = {
        'avg_response_time': statistics.mean(metrics['response_time']),
        'avg_throughput': statistics.mean(metrics['throughput']),
        'avg_error_rate': statistics.mean(metrics['error_rate'])
    }
    
    return baseline
```

### 2. 瓶颈识别

找出性能瓶颈。

```python
import cProfile
import pstats
from io import StringIO

def identify_bottleneck(func):
    """识别性能瓶颈"""
    profiler = cProfile.Profile()
    profiler.enable()
    
    func()
    
    profiler.disable()
    s = StringIO()
    stats = pstats.Stats(profiler, stream=s)
    stats.sort_stats('cumulative')
    stats.print_stats(20)
    
    return s.getvalue()
```

### 3. 优化实施

根据瓶颈进行优化。

### 4. 验证优化

验证优化效果。

```python
def validate_optimization(baseline, optimized):
    """验证优化效果"""
    improvements = {
        'response_time_improvement': 
            (baseline['avg_response_time'] - optimized['avg_response_time']) / baseline['avg_response_time'] * 100,
        'throughput_improvement': 
            (optimized['avg_throughput'] - baseline['avg_throughput']) / baseline['avg_throughput'] * 100,
        'error_rate_improvement': 
            (baseline['avg_error_rate'] - optimized['avg_error_rate']) / baseline['avg_error_rate'] * 100
    }
    
    return improvements
```

## 📊 性能监控

### 实时监控

```python
import psutil
import time
from collections import deque

class PerformanceMonitor:
    def __init__(self):
        self.metrics = {
            'cpu': deque(maxlen=100),
            'memory': deque(maxlen=100),
            'response_time': deque(maxlen=100)
        }
    
    def collect_metrics(self):
        """收集性能指标"""
        while True:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            
            self.metrics['cpu'].append(cpu_percent)
            self.metrics['memory'].append(memory.percent)
            
            time.sleep(1)
    
    def get_statistics(self):
        """获取统计信息"""
        return {
            'avg_cpu': statistics.mean(self.metrics['cpu']),
            'max_cpu': max(self.metrics['cpu']),
            'avg_memory': statistics.mean(self.metrics['memory']),
            'max_memory': max(self.metrics['memory'])
        }
```

## ⚠️ 注意事项

### 1. 测试环境

- 测试环境要与生产环境尽可能相似
- 数据量要足够大
- 网络条件要一致

### 2. 测试数据

- 使用真实的测试数据
- 数据分布要符合实际情况
- 避免使用缓存数据

### 3. 结果分析

- 关注P95、P99指标
- 分析错误类型和原因
- 对比优化前后的效果

## 📖 推荐资源

- [JMeter官方文档](https://jmeter.apache.org/)
- [Locust官方文档](https://docs.locust.io/)
- 《性能测试实战》书籍

## 💡 下一步

- 学习[性能监控](./performance-monitoring.md)
- 了解[高性能架构设计](./architecture-design.md)

---

*最后更新时间: 2025-01-20*

