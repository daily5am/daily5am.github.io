# 容器化

> **AI生成声明**: 本文档由AI辅助生成，旨在提供容器化技术的完整指南。

## 🎯 概述

容器化技术通过将应用及其依赖打包成容器，实现应用的快速部署和一致运行环境。

## 📚 核心概念

### Docker

Docker是最流行的容器化技术，提供：
- 镜像构建
- 容器运行
- 镜像仓库
- 容器编排

### Kubernetes

Kubernetes是容器编排平台，提供：
- 容器编排
- 自动扩展
- 服务发现
- 负载均衡

## 🔧 实践要点

- 容器镜像构建
- 容器编排
- 服务部署
- 监控和管理

## 💡 实战案例：VitePress 项目 Docker 开发环境配置

### 项目背景

为 VitePress 文档项目配置 Docker 开发环境，实现一键启动、环境隔离和热重载支持。

### 配置文件

#### Dockerfile

```dockerfile
# 全栈不止编程 Dockerfile
# 用于开发环境的容器化部署

FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package 文件并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目文件（用于开发，支持热重载）
COPY . .

# 暴露端口
EXPOSE 5173

# 启动开发服务器（添加 --host 参数以监听所有网络接口）
CMD ["sh", "-c", "npm run docs:dev -- --host 0.0.0.0"]
```

#### docker-compose.yml

```yaml
# 全栈不止编程 Docker Compose 配置

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: milliondollardev
    ports:
      - "5173:5173"
    # volumes:
    # 暂时注释掉源代码挂载，使用镜像内的文件
    # 如果需要在 macOS 上启用热重载，需要：
    # 1. 确保 Docker Desktop 的文件共享设置包含项目目录
    # 2. 取消注释下面的行
    # - .:/app:cached
    # 排除 node_modules，使用容器内构建时安装的依赖
    # - /app/node_modules
    working_dir: /app
    environment:
      - NODE_ENV=development
      - DOCKER_ENV=true
    restart: unless-stopped
    stdin_open: true
    tty: true
```

### 遇到的问题及解决方案

#### 问题 1: `node:fs/promises` 模块找不到

**错误信息**:
```
Error [ERR_UNKNOWN_BUILTIN_MODULE]: No such built-in module: node:fs/promises
```

**原因分析**:
- Node.js 版本过低（< 18）
- Alpine 镜像的某些限制

**解决方案**:
- 升级到 Node.js 20: `FROM node:20-alpine`
- 确保使用最新的 LTS 版本

#### 问题 2: 容器内找不到 `package.json`

**错误信息**:
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open '/app/package.json'
```

**原因分析**:
1. **Volume 挂载覆盖问题**: 在 macOS 上，Docker Desktop 的文件共享可能导致 volume 挂载失败
2. **挂载顺序问题**: 匿名卷 `/app/node_modules` 可能覆盖了源代码挂载
3. **文件共享配置**: Docker Desktop 的文件共享设置可能未包含项目目录

**解决方案**:

**方案 A: 使用镜像内文件（当前方案）**
- 在 Dockerfile 中复制所有文件到镜像
- 注释掉 docker-compose.yml 中的 volumes 配置
- 优点：稳定可靠，不依赖文件共享
- 缺点：不支持热重载，需要重新构建镜像才能看到代码更改

**方案 B: 启用热重载（macOS）**
1. 打开 Docker Desktop → Settings → Resources → File Sharing
2. 确保项目目录在共享列表中（如：`/Users/username/Code/project`）
3. 取消注释 docker-compose.yml 中的 volumes 配置：
   ```yaml
   volumes:
     - .:/app:cached
     - /app/node_modules
   ```
4. 重新构建并启动：`docker compose down -v && docker compose up -d --build`

#### 问题 3: VitePress 只监听 localhost，无法从外部访问

**现象**:
- 容器内服务正常启动
- 但只能通过容器内部访问，无法从宿主机访问

**原因分析**:
- VitePress 默认只监听 `localhost`
- 在容器中需要监听 `0.0.0.0` 才能从外部访问

**解决方案**:

1. **在配置文件中设置**:
   ```typescript
   // docs/.vitepress/config.ts
   server: {
     host: '0.0.0.0',
     port: 5173
   }
   ```

2. **在启动命令中添加参数**:
   ```dockerfile
   CMD ["sh", "-c", "npm run docs:dev -- --host 0.0.0.0"]
   ```

### 最佳实践

1. **版本选择**
   - 使用 Node.js LTS 版本（推荐 20+）
   - 使用 Alpine 镜像减小体积

2. **依赖管理**
   - 使用匿名卷保护 `node_modules`: `- /app/node_modules`
   - 避免宿主机和容器内的依赖冲突

3. **网络配置**
   - 开发环境始终监听 `0.0.0.0`
   - 生产环境根据安全需求选择监听地址

4. **热重载配置**
   - macOS: 确保 Docker Desktop 文件共享配置正确
   - Linux: 直接使用 volume 挂载即可
   - Windows: 使用 WSL2 或配置文件共享

5. **调试技巧**
   ```bash
   # 检查容器内文件
   docker compose exec app ls -la /app
   
   # 检查挂载情况
   docker compose exec app mount | grep /app
   
   # 查看环境变量
   docker compose exec app env | grep DOCKER
   
   # 进入容器调试
   docker compose exec app sh
   ```

### 常用命令

```bash
# 构建并启动（后台运行）
docker compose up -d --build

# 查看日志
docker compose logs -f

# 停止并删除容器
docker compose down

# 清理所有资源（包括卷）
docker compose down -v

# 重新构建镜像
docker compose build --no-cache

# 进入容器
docker compose exec app sh
```

### 总结

Docker 开发环境配置需要注意：
- ✅ 选择合适的 Node.js 版本
- ✅ 正确处理 volume 挂载
- ✅ 配置服务监听地址
- ✅ 根据平台调整文件共享设置
- ✅ 使用匿名卷保护依赖

通过以上配置和问题排查，可以建立一个稳定可靠的 Docker 开发环境。

---

*最后更新时间: 2025-11-14*
