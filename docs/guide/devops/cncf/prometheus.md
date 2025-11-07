# Prometheus

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Prometheus监控系统的完整指南。

## 🎯 概述

Prometheus是一个开源的监控和告警系统，最初由SoundCloud开发。它采用拉取（pull）模型收集指标数据，使用时间序列数据库存储，并提供强大的查询语言PromQL。

## 📚 核心概念

### 数据模型

- **Metric**: 指标，表示一个可测量的值
- **Label**: 标签，用于区分不同的指标实例
- **Time Series**: 时间序列，指标随时间变化的数据
- **Sample**: 样本，时间序列在某个时间点的值

### 指标类型

- **Counter**: 计数器，只增不减
- **Gauge**: 仪表盘，可增可减
- **Histogram**: 直方图，统计分布
- **Summary**: 摘要，类似直方图但计算分位数

### 核心组件

- **Prometheus Server**: 核心服务器，收集和存储指标
- **Exporters**: 导出器，将第三方系统指标转换为Prometheus格式
- **Pushgateway**: 推送网关，接收短期任务的指标
- **Alertmanager**: 告警管理器，处理告警规则

## 🔧 核心功能

### 数据收集

- **Pull模型**: Prometheus主动拉取指标
- **Service Discovery**: 自动发现监控目标
- **Scrape配置**: 配置抓取规则

### 数据存储

- **TSDB**: 时间序列数据库
- **本地存储**: 高效的时间序列存储
- **远程存储**: 支持长期存储

### 查询语言

- **PromQL**: Prometheus查询语言
- **聚合函数**: sum, avg, max, min等
- **时间选择器**: 范围查询和即时查询

### 告警规则

- **Alert Rules**: 告警规则定义
- **Alertmanager**: 告警路由和通知
- **告警分组**: 减少告警噪音

## 🚀 实践要点

### 基本查询

```promql
# CPU使用率
100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# 内存使用率
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# HTTP请求速率
rate(http_requests_total[5m])
```

### 告警规则

```yaml
groups:
- name: example
  rules:
  - alert: HighCPUUsage
    expr: 100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "CPU使用率过高"
```

### 服务发现

```yaml
scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
```

## 📖 学习资源

- [Prometheus官方文档](https://prometheus.io/docs/)
- [PromQL查询语言](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Prometheus最佳实践](https://prometheus.io/docs/practices/)

## 💡 最佳实践

1. **指标命名**: 使用清晰的指标命名规范
2. **标签使用**: 合理使用标签，避免高基数
3. **采集频率**: 根据需求设置合适的采集间隔
4. **告警规则**: 设置合理的告警阈值和持续时间
5. **数据保留**: 配置合适的数据保留策略

---

*最后更新时间: 2025-01-20*

