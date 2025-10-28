# 🚀 GitHub Actions 部署指南

## 快速开始

### 1. 设置 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. 设置 **Source** 为 **GitHub Actions**
3. 确保仓库是公开的

### 2. 推送代码

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "Add GitHub Actions deployment"

# 推送到远程仓库
git push origin main
```

### 3. 创建第一个发布

```bash
# 使用便捷脚本
npm run deploy

# 或者手动创建标签
git tag v1.0.0
git push origin v1.0.0
```

## 📋 部署流程

### 自动触发
- 推送以 `v` 开头的标签（如 `v1.0.0`）
- GitHub Actions 自动开始构建和部署

### 手动触发
1. 访问 `https://github.com/{username}/milliondollardev/actions`
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮

## 🔧 配置说明

### 工作流文件
- **位置**: `.github/workflows/deploy.yml`
- **触发**: 标签推送或手动触发
- **权限**: `contents: read`, `pages: write`, `id-token: write`

### 构建配置
- **Node.js 版本**: 18
- **构建命令**: `npm run docs:build`
- **输出目录**: `docs/.vitepress/dist`

## 📦 部署产物

### GitHub Pages
- **访问地址**: `https://{username}.github.io/milliondollardev/`
- **构建时间**: 约 2-3 分钟
- **缓存**: 自动缓存 node_modules

### GitHub Release
- **自动创建**: 每次标签部署都会创建 Release
- **包含内容**: 更新日志、在线预览链接、构建信息

## 🎯 使用技巧

### 版本管理
```bash
# 语义化版本
v1.0.0  # 主版本
v1.1.0  # 次版本
v1.1.1  # 补丁版本

# 预发布版本
v1.0.0-beta.1
v1.0.0-rc.1
```

### 批量操作
```bash
# 创建多个标签
git tag v1.0.0
git tag v1.1.0
git tag v1.2.0
git push origin --tags
```

## 🔍 故障排除

### 常见问题

1. **权限不足**
   - 检查仓库的 Pages 权限设置
   - 确保工作流有正确的权限

2. **构建失败**
   - 检查 Node.js 版本兼容性
   - 查看 Actions 日志中的错误信息

3. **部署失败**
   - 检查 GitHub Pages 配置
   - 确保仓库是公开的

4. **404 错误**
   - 检查 VitePress 的 `base` 配置
   - 确保路径正确

### 调试步骤

1. **查看 Actions 日志**
   ```
   https://github.com/{username}/milliondollardev/actions
   ```

2. **检查构建产物**
   ```bash
   npm run docs:build
   ls -la docs/.vitepress/dist
   ```

3. **本地测试**
   ```bash
   npm run docs:preview
   ```

## 📚 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
- [语义化版本](https://semver.org/)

## 🎉 成功部署后

部署成功后，你将获得：

- ✅ **在线网站**: `https://{username}.github.io/milliondollardev/`
- ✅ **GitHub Release**: 包含更新日志和下载链接
- ✅ **自动更新**: 每次推送标签都会自动部署
- ✅ **版本历史**: 完整的发布历史记录
