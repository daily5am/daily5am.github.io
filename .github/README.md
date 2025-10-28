# GitHub Actions 部署指南

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

## 🚀 部署流程

### 1. 触发条件
- **自动触发**: 当推送以 `v` 开头的标签时（如 `v1.0.0`）
- **手动触发**: 在 GitHub Actions 页面手动运行工作流

### 2. 部署步骤
1. **构建**: 安装依赖并构建 VitePress 项目
2. **部署**: 将构建结果部署到 GitHub Pages
3. **发布**: 自动创建 GitHub Release

## 📋 使用方法

### 创建并推送标签
```bash
# 创建标签
git tag v1.0.0

# 推送标签到远程仓库
git push origin v1.0.0
```

### 手动触发部署
1. 访问 GitHub 仓库的 Actions 页面
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮

## 🔧 配置要求

### GitHub Pages 设置
1. 进入仓库的 Settings → Pages
2. 设置 Source 为 "GitHub Actions"
3. 确保仓库有 Pages 权限

### 权限设置
工作流需要以下权限：
- `contents: read` - 读取仓库内容
- `pages: write` - 写入 GitHub Pages
- `id-token: write` - 用于身份验证

## 📦 构建产物

- **构建目录**: `docs/.vitepress/dist`
- **部署地址**: `https://{username}.github.io/milliondollardev/`

## 🎯 Release 信息

每次部署会自动创建 GitHub Release，包含：
- 版本标签
- 更新日志
- 在线预览链接
- 构建信息

## 🔍 故障排除

### 常见问题
1. **权限不足**: 检查仓库的 Pages 权限设置
2. **构建失败**: 检查 Node.js 版本和依赖
3. **部署失败**: 检查 GitHub Pages 配置

### 查看日志
在 GitHub Actions 页面查看详细的构建和部署日志。

## 📚 相关文档

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
