#!/bin/bash

# 简化部署脚本 - 通过main分支触发GitHub Actions
# 避免环境保护规则问题

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info "🚀 简化部署脚本 - 通过main分支触发"
echo

# 检查是否在git仓库中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "当前目录不是git仓库"
    exit 1
fi

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD --; then
    print_warning "检测到未提交的更改"
    read -p "是否继续？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "操作已取消"
        exit 0
    fi
fi

# 获取提交信息
if [ -z "$1" ]; then
    COMMIT_MSG="Deploy to GitHub Pages via main branch

🚀 通过main分支触发GitHub Actions部署

### 📝 更新内容
- 修复GitHub Pages环境保护规则问题
- 通过main分支推送触发部署
- 确保VitePress静态网站正确部署

### 🌐 在线预览
网站将自动部署到 GitHub Pages

### 📦 构建信息
- 时间: $(date)
- 提交: $(git rev-parse --short HEAD)
- 分支: main"
else
    COMMIT_MSG="$1"
fi

print_info "提交更改到main分支..."

# 添加所有更改
git add .

# 提交更改
git commit -m "$COMMIT_MSG"

print_success "更改已提交"

# 推送到main分支
print_info "推送到main分支..."
git push origin main

print_success "代码已推送到main分支"

# 显示部署信息
print_info "GitHub Actions 将自动开始部署..."
print_info "部署地址: https://daily5am.github.io/"
print_info "查看部署状态: https://github.com/daily5am/daily5am.github.io/actions"

print_success "部署流程已启动！"
print_warning "请等待2-3分钟让部署完成"

print_info "如果部署仍然失败，请检查："
echo "1. GitHub Pages Source 设置为 'GitHub Actions'"
echo "2. github-pages 环境保护规则已禁用"
echo "3. 仓库有正确的 Pages 权限"
