# GitHub Pages 配置

## 部署设置

### 源设置
- **Source**: GitHub Actions
- **Branch**: 不适用（使用Actions部署）

### 自定义域名（可选）
如需使用自定义域名，请创建 `CNAME` 文件：
```
your-domain.com
```

### 环境变量
在仓库设置中添加以下环境变量（如需要）：
- `NODE_VERSION`: Node.js版本（默认：18）
- `BUILD_COMMAND`: 构建命令（默认：npm run docs:build）

## 部署流程

1. **触发**: 推送 `v*` 标签或手动触发
2. **构建**: 使用 VitePress 构建静态文件
3. **部署**: 自动部署到 GitHub Pages
4. **发布**: 创建 GitHub Release

## 访问地址

- **GitHub Pages**: `https://{username}.github.io/milliondollardev/`
- **Actions 状态**: `https://github.com/{username}/milliondollardev/actions`

## 故障排除

### 常见问题
1. **404错误**: 检查 `base` 配置是否正确
2. **构建失败**: 检查 Node.js 版本和依赖
3. **权限错误**: 确保仓库有 Pages 权限

### 检查清单
- [ ] 仓库设置为公开
- [ ] 启用 GitHub Pages
- [ ] 设置 Source 为 GitHub Actions
- [ ] 工作流文件存在且语法正确
- [ ] 有足够的权限运行 Actions
