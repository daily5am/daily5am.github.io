# GitHub Pages 配置指南

## 🔧 修复GitHub Pages显示README.md的问题

### 问题诊断
当前GitHub Pages显示README.md文件而不是VitePress编译的静态网站，说明GitHub Pages的Source设置不正确。

### 解决步骤

#### 1. 检查GitHub Pages设置
1. 访问仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 检查 **Source** 设置

#### 2. 正确的GitHub Pages配置
**Source** 应该设置为：**GitHub Actions**

❌ **错误配置**：
- Source: Deploy from a branch
- Branch: main / master

✅ **正确配置**：
- Source: GitHub Actions

#### 3. 验证环境设置
确保仓库有以下环境：
- **Environment name**: `github-pages`
- **Protection rules**: 可以设置为 "None" 或根据需要设置

#### 4. 权限检查
确保仓库有以下权限：
- **Actions**: 启用
- **Pages**: 启用
- **Workflow permissions**: 设置为 "Read and write permissions"

### 🚀 重新部署

#### 方法1: 手动触发
1. 访问 `https://github.com/daily5am/daily5am.github.io/actions`
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮

#### 方法2: 推送新标签
```bash
# 创建新标签
git tag v1.0.2
git push origin v1.0.2
```

#### 方法3: 使用部署脚本
```bash
npm run deploy:version 1.0.2
```

### 🔍 故障排除

#### 如果仍然显示README.md
1. **清除浏览器缓存**
2. **等待5-10分钟** - GitHub Pages更新需要时间
3. **检查Actions日志** - 查看是否有构建错误

#### 检查Actions状态
访问：`https://github.com/daily5am/daily5am.github.io/actions`

确保：
- ✅ Build job 成功完成
- ✅ Deploy job 成功完成
- ✅ 没有错误信息

#### 验证部署产物
在Actions日志中检查：
- `Upload artifact` 步骤是否成功
- `Deploy to GitHub Pages` 步骤是否成功
- 部署的URL是否正确

### 📋 检查清单

- [ ] GitHub Pages Source 设置为 "GitHub Actions"
- [ ] 仓库权限正确设置
- [ ] GitHub Actions 工作流文件存在
- [ ] 最新标签已推送
- [ ] Actions 运行成功
- [ ] 等待5-10分钟让更改生效

### 🎯 预期结果

修复后，访问 `https://daily5am.github.io/` 应该看到：
- ✅ VitePress 编译的静态网站
- ✅ 正确的样式和布局
- ✅ 导航栏和交互功能正常
- ✅ 不是README.md文件内容

### 📞 如果问题仍然存在

如果按照上述步骤操作后问题仍然存在，请：
1. 截图GitHub Pages设置页面
2. 截图GitHub Actions运行状态
3. 提供具体的错误信息
