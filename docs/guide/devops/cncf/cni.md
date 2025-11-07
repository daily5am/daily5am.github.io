# CNI (Container Network Interface)

> **AI生成声明**: 本文档由AI辅助生成，旨在提供CNI容器网络接口的完整指南。

## 🎯 概述

CNI（Container Network Interface）是一个容器网络接口规范，定义了容器运行时与网络插件之间的标准接口。它被Kubernetes等容器编排系统广泛采用。

## 📚 核心概念

### 接口规范

- **ADD**: 添加网络接口
- **DEL**: 删除网络接口
- **CHECK**: 检查网络配置
- **VERSION**: 版本信息

### 网络模型

- **Bridge**: 网桥模式
- **Host**: 主机模式
- **Overlay**: 覆盖网络
- **Underlay**: 底层网络

## 🔧 核心功能

### 网络插件

- **Flannel**: 简单的覆盖网络
- **Calico**: BGP网络
- **Weave**: 覆盖网络
- **Cilium**: eBPF网络
- **Multus**: 多网络支持

### 网络配置

- **IPAM**: IP地址管理
- **路由**: 路由配置
- **DNS**: DNS配置
- **安全策略**: 网络安全策略

## 🚀 实践要点

### 基本配置

```json
{
  "cniVersion": "0.4.0",
  "name": "mynet",
  "type": "bridge",
  "bridge": "cnio0",
  "isGateway": true,
  "ipMasq": true,
  "ipam": {
    "type": "host-local",
    "ranges": [
      [{
        "subnet": "10.244.0.0/16"
      }]
    ],
    "routes": [{"dst": "0.0.0.0/0"}]
  }
}
```

### Kubernetes配置

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cni-config
  namespace: kube-system
data:
  cni-conf.json: |
    {
      "cniVersion": "0.4.0",
      "name": "k8s-pod-network",
      "plugins": [
        {
          "type": "calico",
          "etcd_endpoints": "http://etcd:2379"
        }
      ]
    }
```

## 📖 学习资源

- [CNI规范](https://github.com/containernetworking/cni)
- [CNI插件](https://github.com/containernetworking/plugins)
- [Kubernetes网络](https://kubernetes.io/docs/concepts/cluster-administration/networking/)

## 💡 最佳实践

1. **插件选择**: 根据需求选择网络插件
2. **IP规划**: 合理规划IP地址空间
3. **性能优化**: 优化网络性能
4. **安全配置**: 配置网络安全策略
5. **监控告警**: 监控网络状态

---

*最后更新时间: 2025-01-20*

