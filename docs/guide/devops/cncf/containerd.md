# containerd

> **AI生成声明**: 本文档由AI辅助生成，旨在提供containerd容器运行时的完整指南。

## 🎯 概述

containerd是一个行业标准的容器运行时，专注于简单性、健壮性和可移植性。它是CNCF的毕业项目，被Kubernetes、Docker等广泛采用作为底层容器运行时。

## 📚 核心概念

### 架构组件

- **containerd daemon**: 核心守护进程
- **containerd-shim**: 容器生命周期管理
- **runc**: OCI容器运行时实现
- **ctr**: 命令行工具

### 核心功能

- **镜像管理**: 拉取、推送、管理镜像
- **容器管理**: 创建、启动、停止、删除容器
- **快照管理**: 文件系统快照
- **内容存储**: 镜像和层存储

## 🔧 核心功能

### 镜像管理

- **Pull**: 从仓库拉取镜像
- **Push**: 推送镜像到仓库
- **List**: 列出本地镜像
- **Remove**: 删除镜像

### 容器管理

- **Create**: 创建容器
- **Start**: 启动容器
- **Stop**: 停止容器
- **Delete**: 删除容器
- **Exec**: 在容器中执行命令

### 命名空间

- **Namespace**: 资源隔离
- **默认命名空间**: moby/default
- **Kubernetes命名空间**: k8s.io

## 🚀 实践要点

### 基本操作

```bash
# 拉取镜像
ctr images pull docker.io/library/nginx:latest

# 列出镜像
ctr images list

# 创建容器
ctr containers create docker.io/library/nginx:latest nginx1

# 启动容器
ctr tasks start nginx1

# 查看容器
ctr containers list
ctr tasks list
```

### 配置管理

containerd配置文件通常位于 `/etc/containerd/config.toml`:

```toml
version = 2
root = "/var/lib/containerd"
state = "/run/containerd"

[grpc]
  address = "/run/containerd/containerd.sock"

[plugins]
  [plugins."io.containerd.grpc.v1.cri"]
    sandbox_image = "k8s.gcr.io/pause:3.6"
```

## 📖 学习资源

- [containerd官方文档](https://containerd.io/docs/)
- [containerd GitHub](https://github.com/containerd/containerd)
- [OCI规范](https://opencontainers.org/)

## 💡 最佳实践

1. **版本选择**: 使用稳定版本
2. **配置优化**: 根据场景调整配置
3. **存储管理**: 定期清理未使用的镜像和容器
4. **安全配置**: 启用安全特性
5. **监控日志**: 配置日志和监控

---

*最后更新时间: 2025-01-20*

