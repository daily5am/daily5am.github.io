# 故障转移

> **AI生成声明**: 本文档由AI辅助生成，旨在提供故障转移的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解故障转移的原理和机制
- 掌握主备切换的实现方式
- 了解故障检测和自动切换
- 学习故障转移的实践应用

## 📚 什么是故障转移

故障转移(Failover)是指当主系统出现故障时,自动或手动切换到备用系统的过程。

### 核心概念

- **主节点(Active/Primary)**: 当前提供服务的节点
- **备节点(Standby/Secondary)**: 待机状态的节点
- **切换时间**: 从故障发生到服务恢复的时间
- **切换类型**: 自动切换 vs 手动切换

### 故障转移的作用

1. **保证服务可用**: 故障时快速恢复服务
2. **减少影响范围**: 最小化故障对用户的影响
3. **自动化运维**: 减少人工干预
4. **提高可靠性**: 提升系统整体可靠性

## 🔍 故障检测机制

### 1. 心跳检测

定期发送心跳包,检测节点存活状态。

```python
import time
import threading
import socket

class HeartbeatChecker:
    def __init__(self, check_interval=5, timeout=10):
        self.check_interval = check_interval
        self.timeout = timeout
        self.last_heartbeat = {}
        self.is_running = False
    
    def send_heartbeat(self, target_host, target_port):
        """发送心跳"""
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(self.timeout)
            sock.connect((target_host, target_port))
            sock.send(b'PING')
            response = sock.recv(1024)
            sock.close()
            return response == b'PONG'
        except Exception as e:
            print(f"心跳检测失败: {e}")
            return False
    
    def check_nodes(self, nodes):
        """检查节点状态"""
        while self.is_running:
            for node in nodes:
                is_alive = self.send_heartbeat(node['host'], node['port'])
                current_time = time.time()
                
                if is_alive:
                    self.last_heartbeat[node['id']] = current_time
                else:
                    # 检查是否超时
                    last_time = self.last_heartbeat.get(node['id'], 0)
                    if current_time - last_time > self.timeout:
                        print(f"节点 {node['id']} 故障,触发切换")
                        self.trigger_failover(node)
            
            time.sleep(self.check_interval)
    
    def trigger_failover(self, failed_node):
        """触发故障转移"""
        # 切换到备用节点
        standby_node = self.get_standby_node(failed_node)
        self.switch_to_node(standby_node)
```

### 2. 健康检查

通过HTTP/HTTPS请求检查服务健康状态。

```python
import requests
from datetime import datetime, timedelta

class HealthChecker:
    def __init__(self, health_endpoint='/health', check_interval=10):
        self.health_endpoint = health_endpoint
        self.check_interval = check_interval
        self.failure_count = {}
        self.failure_threshold = 3
    
    def check_health(self, node):
        """检查节点健康状态"""
        try:
            url = f"http://{node['host']}:{node['port']}{self.health_endpoint}"
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                health_data = response.json()
                # 检查健康状态字段
                if health_data.get('status') == 'healthy':
                    self.failure_count[node['id']] = 0
                    return True
            
            # 健康检查失败
            self.failure_count[node['id']] = self.failure_count.get(node['id'], 0) + 1
            return False
            
        except Exception as e:
            print(f"健康检查异常: {e}")
            self.failure_count[node['id']] = self.failure_count.get(node['id'], 0) + 1
            return False
    
    def is_node_failed(self, node):
        """判断节点是否故障"""
        return self.failure_count.get(node['id'], 0) >= self.failure_threshold
```

### 3. 监控告警

通过监控系统检测故障并触发告警。

```python
class MonitorBasedFailover:
    def __init__(self, prometheus_client):
        self.prometheus = prometheus_client
        self.metrics_threshold = {
            'cpu_usage': 90,
            'memory_usage': 90,
            'response_time': 1000,  # ms
            'error_rate': 0.05  # 5%
        }
    
    def check_metrics(self, node):
        """检查监控指标"""
        metrics = self.prometheus.query(node['id'])
        
        # 检查CPU使用率
        if metrics['cpu_usage'] > self.metrics_threshold['cpu_usage']:
            return False, 'CPU使用率过高'
        
        # 检查内存使用率
        if metrics['memory_usage'] > self.metrics_threshold['memory_usage']:
            return False, '内存使用率过高'
        
        # 检查响应时间
        if metrics['response_time'] > self.metrics_threshold['response_time']:
            return False, '响应时间过长'
        
        # 检查错误率
        if metrics['error_rate'] > self.metrics_threshold['error_rate']:
            return False, '错误率过高'
        
        return True, '正常'
```

## 🏗️ 故障转移实现

### 1. VIP切换

通过虚拟IP(Virtual IP)实现故障转移。

```python
import subprocess
import netifaces

class VIPFailover:
    def __init__(self, vip, interface='eth0'):
        self.vip = vip
        self.interface = interface
        self.current_node = None
    
    def assign_vip(self, node):
        """将VIP绑定到节点"""
        try:
            # 在Linux上添加VIP
            cmd = f"ip addr add {self.vip}/24 dev {self.interface}"
            subprocess.run(cmd, shell=True, check=True)
            
            # 添加ARP通告
            cmd = f"arping -c 1 -I {self.interface} {self.vip}"
            subprocess.run(cmd, shell=True, check=True)
            
            self.current_node = node
            print(f"VIP {self.vip} 已绑定到节点 {node['id']}")
            return True
        except Exception as e:
            print(f"VIP绑定失败: {e}")
            return False
    
    def remove_vip(self):
        """移除VIP"""
        try:
            cmd = f"ip addr del {self.vip}/24 dev {self.interface}"
            subprocess.run(cmd, shell=True, check=True)
            self.current_node = None
            print(f"VIP {self.vip} 已移除")
            return True
        except Exception as e:
            print(f"VIP移除失败: {e}")
            return False
    
    def failover_to(self, standby_node):
        """故障转移到备用节点"""
        print(f"开始故障转移到节点 {standby_node['id']}")
        
        # 1. 移除当前VIP
        if self.current_node:
            self.remove_vip()
        
        # 2. 绑定VIP到备用节点
        # 注意: 这里需要在备用节点上执行
        # 实际应用中可以通过SSH或API调用实现
        return self.assign_vip(standby_node)
```

### 2. DNS切换

通过修改DNS记录实现故障转移。

```python
import boto3

class DNSFailover:
    def __init__(self, hosted_zone_id, domain):
        self.route53 = boto3.client('route53')
        self.hosted_zone_id = hosted_zone_id
        self.domain = domain
    
    def update_dns(self, target_ip):
        """更新DNS记录"""
        try:
            response = self.route53.change_resource_record_sets(
                HostedZoneId=self.hosted_zone_id,
                ChangeBatch={
                    'Changes': [{
                        'Action': 'UPSERT',
                        'ResourceRecordSet': {
                            'Name': self.domain,
                            'Type': 'A',
                            'TTL': 60,
                            'ResourceRecords': [{'Value': target_ip}]
                        }
                    }]
                }
            )
            print(f"DNS记录已更新: {self.domain} -> {target_ip}")
            return True
        except Exception as e:
            print(f"DNS更新失败: {e}")
            return False
    
    def failover_to(self, standby_node):
        """故障转移到备用节点"""
        return self.update_dns(standby_node['ip'])
```

### 3. 负载均衡切换

通过负载均衡器自动检测故障并切换。

```nginx
# Nginx配置 - 自动故障转移
upstream backend {
    # 主节点
    server 192.168.1.10:8080 weight=3 max_fails=3 fail_timeout=30s;
    
    # 备用节点
    server 192.168.1.11:8080 weight=1 max_fails=3 fail_timeout=30s backup;
    
    # 健康检查
    # 需要配合nginx_upstream_check_module模块
}

server {
    location / {
        proxy_pass http://backend;
        proxy_next_upstream error timeout http_500 http_502 http_503;
        proxy_next_upstream_tries 2;
        proxy_next_upstream_timeout 5s;
    }
}
```

### 4. Keepalived实现

使用Keepalived实现高可用。

```bash
# Keepalived配置 - /etc/keepalived/keepalived.conf

# 主节点配置
vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1234
    }
    virtual_ipaddress {
        192.168.1.100/24
    }
    track_script {
        chk_nginx
    }
}

# 健康检查脚本
vrrp_script chk_nginx {
    script "/usr/local/bin/check_nginx.sh"
    interval 2
    weight -20
    fall 3
    rise 2
}

# 备用节点配置(priority较低)
vrrp_instance VI_1 {
    state BACKUP
    interface eth0
    virtual_router_id 51
    priority 90
    # ... 其他配置相同
}
```

## 🚀 故障转移流程

### 自动切换流程

```
1. 故障检测
   ↓
2. 确认故障(多次检测)
   ↓
3. 选择备用节点
   ↓
4. 执行切换操作
   ↓
5. 验证切换结果
   ↓
6. 通知相关人员
```

### 手动切换流程

```python
class FailoverManager:
    def __init__(self):
        self.nodes = {}
        self.current_primary = None
    
    def manual_failover(self, target_node):
        """手动故障转移"""
        print(f"开始手动切换到节点 {target_node['id']}")
        
        # 1. 检查目标节点状态
        if not self.is_node_healthy(target_node):
            raise Exception("目标节点不健康,无法切换")
        
        # 2. 停止当前主节点流量
        self.drain_traffic(self.current_primary)
        
        # 3. 等待流量排空
        time.sleep(10)
        
        # 4. 执行切换
        self.switch_to_node(target_node)
        
        # 5. 验证服务
        if self.verify_service(target_node):
            print("切换成功")
            self.current_primary = target_node
        else:
            print("切换失败,回滚")
            self.rollback()
    
    def drain_traffic(self, node):
        """排空节点流量"""
        # 从负载均衡器移除节点
        # 等待现有连接完成
        pass
    
    def switch_to_node(self, node):
        """切换到目标节点"""
        # VIP切换、DNS切换等
        pass
```

## ⚠️ 注意事项

### 1. 脑裂问题

多个节点同时认为自己是主节点。

**解决方案**:
- 使用仲裁机制(Quorum)
- 使用锁服务(ZooKeeper、etcd)
- 设置优先级

### 2. 数据一致性

切换时保证数据不丢失。

**解决方案**:
- 同步复制(性能影响)
- 异步复制+数据校验
- 最终一致性

### 3. 切换时间

最小化切换时间。

**优化措施**:
- 快速故障检测
- 预切换准备
- 并行操作

## 📖 推荐资源

- [Keepalived官方文档](https://www.keepalived.org/)
- [AWS Route 53健康检查和故障转移](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html)
- 《高可用架构设计》书籍

## 💡 下一步

- 学习[服务降级](./degradation.md)方案
- 了解[监控告警](./monitoring-alerting.md)机制
- 掌握[高可用架构设计](./architecture-design.md)

---

*最后更新时间: 2025-01-20*

