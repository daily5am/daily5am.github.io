# Helm

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Helm包管理工具的完整指南。

## 🎯 概述

Helm是Kubernetes的包管理器，类似于Linux的apt/yum或Node.js的npm。它允许你定义、安装和升级复杂的Kubernetes应用程序，通过Chart来管理应用的生命周期。

## 📚 核心概念

### Chart

- **Chart**: Helm包，包含运行应用所需的所有资源定义
- **Chart结构**: 预定义的目录结构
- **Chart版本**: 语义化版本控制

### Release

- **Release**: Chart的实例，部署到Kubernetes集群
- **Release版本**: 每次安装或升级的版本号
- **Release管理**: 安装、升级、回滚、删除

### Repository

- **Repository**: Chart仓库，存储和分享Chart
- **公共仓库**: Artifact Hub等公共仓库
- **私有仓库**: 企业内部仓库

## 🔧 核心功能

### Chart管理

- **创建Chart**: 使用helm create创建新Chart
- **打包Chart**: 使用helm package打包
- **验证Chart**: 使用helm lint验证
- **安装Chart**: 使用helm install安装

### Release管理

- **安装**: helm install部署应用
- **升级**: helm upgrade更新应用
- **回滚**: helm rollback回滚到之前版本
- **删除**: helm uninstall删除应用

### 模板系统

- **Go模板**: 使用Go模板语言
- **Values**: 可配置的值
- **函数**: 内置模板函数
- **流程控制**: if/else、range等

## 🚀 实践要点

### Chart结构

```
mychart/
├── Chart.yaml          # Chart元数据
├── values.yaml         # 默认配置值
├── templates/          # 模板文件
│   ├── deployment.yaml
│   ├── service.yaml
│   └── _helpers.tpl    # 辅助模板
└── charts/             # 依赖的Chart
```

### 基本安装

```bash
# 安装Chart
helm install myapp ./mychart

# 指定命名空间
helm install myapp ./mychart -n production

# 使用自定义值
helm install myapp ./mychart -f values-prod.yaml
```

### 升级和回滚

```bash
# 升级Release
helm upgrade myapp ./mychart

# 回滚到之前版本
helm rollback myapp 1

# 查看历史
helm history myapp
```

### Values文件示例

```yaml
replicaCount: 3

image:
  repository: nginx
  tag: "1.21"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi
```

## 📖 学习资源

- [Helm官方文档](https://helm.sh/docs/)
- [Chart开发指南](https://helm.sh/docs/chart_best_practices/)
- [Artifact Hub](https://artifacthub.io/) - Chart仓库

## 💡 最佳实践

1. **版本控制**: 使用语义化版本
2. **Values管理**: 分离不同环境的Values文件
3. **模板复用**: 使用_helpers.tpl复用模板
4. **依赖管理**: 使用Chart.yaml管理依赖
5. **测试验证**: 使用helm test测试Chart

---

*最后更新时间: 2025-01-20*

