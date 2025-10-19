# Makefile 使用说明

这个Makefile为百万研发知识平台提供了便捷的开发和管理命令。

## 🚀 快速开始

### 最简单的启动方式
```bash
make start
```
这将启动本地开发服务器，访问地址：http://localhost:5173

### 完整的环境设置
```bash
make all
```
这将检查环境、安装依赖并启动开发服务器。

## 📋 可用命令

### 开发命令
- `make start` - 启动本地开发服务器
- `make dev` - 启动开发服务器 (start的别名)
- `make build` - 构建生产版本
- `make preview` - 预览构建结果

### 依赖管理
- `make install` - 安装项目依赖
- `make clean` - 清理依赖和构建文件
- `make reinstall` - 重新安装依赖

### 部署相关
- `make deploy` - 构建并准备部署

### 项目信息
- `make info` - 显示项目信息
- `make status` - 检查项目状态
- `make help` - 显示所有可用命令

### 快速命令
- `make quick-start` - 快速开始 (安装依赖 + 启动开发服务器)
- `make all` - 检查环境 + 安装依赖 + 启动开发服务器

## 🎯 常用工作流

### 1. 首次使用
```bash
# 克隆项目后首次使用
make all
```

### 2. 日常开发
```bash
# 启动开发服务器
make start

# 构建生产版本
make build

# 预览构建结果
make preview
```

### 3. 部署准备
```bash
# 构建并准备部署
make deploy
```

### 4. 清理重建
```bash
# 清理并重新安装
make reinstall
```

## 🔧 自定义命令

如果需要添加新的命令，可以在Makefile中添加：

```makefile
.PHONY: your-command
your-command:
	@echo "执行你的命令"
	@your-command-here
```

## 📝 注意事项

1. **环境要求**: 确保已安装Node.js和npm
2. **端口占用**: 默认使用5173端口，如果被占用会自动选择其他端口
3. **依赖管理**: 首次使用建议运行`make all`确保环境完整
4. **构建输出**: 构建文件位于`docs/.vitepress/dist`目录

## 🆘 故障排除

### 常见问题

1. **命令不存在**
   ```bash
   # 检查make是否安装
   which make
   ```

2. **权限问题**
   ```bash
   # 给Makefile执行权限
   chmod +x Makefile
   ```

3. **依赖问题**
   ```bash
   # 清理并重新安装
   make reinstall
   ```

4. **端口占用**
   ```bash
   # 查看端口使用情况
   lsof -i :5173
   ```

## 🎉 开始使用

现在你可以使用 `make start` 快速启动百万研发知识平台了！

```bash
make start
```

访问 http://localhost:5173 查看你的知识平台！
