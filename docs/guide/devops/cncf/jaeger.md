# Jaeger

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Jaeger分布式追踪系统的完整指南。

## 🎯 概述

Jaeger是一个开源的分布式追踪系统，由Uber开发并开源。它用于监控和诊断微服务架构中的请求流程，帮助理解系统行为和性能问题。

## 📚 核心概念

### 追踪模型

- **Trace**: 追踪，表示一个请求的完整生命周期
- **Span**: 跨度，表示一个操作
- **Span Context**: 跨度上下文，在服务间传递
- **Tags**: 标签，键值对元数据
- **Logs**: 日志，时间点事件

### 组件架构

- **Agent**: 代理，收集追踪数据
- **Collector**: 收集器，接收和存储追踪数据
- **Query**: 查询服务，提供UI和API
- **Storage**: 存储后端，支持多种存储

## 🔧 核心功能

### 追踪收集

- **OpenTracing**: 支持OpenTracing标准
- **OpenTelemetry**: 支持OpenTelemetry标准
- **多种语言**: 支持多种编程语言
- **自动检测**: 自动检测常见框架

### 存储后端

- **In-Memory**: 内存存储（开发测试）
- **Cassandra**: Cassandra存储
- **Elasticsearch**: Elasticsearch存储
- **Kafka**: Kafka流式存储

### 查询和分析

- **Trace搜索**: 按服务、操作、标签搜索
- **依赖图**: 服务依赖关系可视化
- **性能分析**: 延迟和吞吐量分析
- **对比分析**: 追踪对比

## 🚀 实践要点

### 基本使用

```go
import (
    "github.com/opentracing/opentracing-go"
    "github.com/uber/jaeger-client-go"
    "github.com/uber/jaeger-client-go/config"
)

cfg := config.Configuration{
    ServiceName: "my-service",
    Sampler: &config.SamplerConfig{
        Type:  "const",
        Param: 1,
    },
}

tracer, closer, err := cfg.NewTracer()
defer closer.Close()
opentracing.SetGlobalTracer(tracer)

span := tracer.StartSpan("operation-name")
defer span.Finish()
```

### Kubernetes部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: jaeger
        image: jaegertracing/all-in-one:latest
        ports:
        - containerPort: 16686
        - containerPort: 14268
```

## 📖 学习资源

- [Jaeger官方文档](https://www.jaegertracing.io/docs/)
- [Jaeger GitHub](https://github.com/jaegertracing/jaeger)
- [OpenTracing规范](https://opentracing.io/)

## 💡 最佳实践

1. **采样策略**: 根据负载调整采样率
2. **标签使用**: 添加有意义的标签
3. **性能影响**: 注意追踪对性能的影响
4. **存储选择**: 根据需求选择存储后端
5. **数据保留**: 配置合适的数据保留策略

---

*最后更新时间: 2025-01-20*

