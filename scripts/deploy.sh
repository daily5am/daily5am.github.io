#!/bin/bash

# GitHub Actions 部署脚本
# 用于创建标签并触发自动部署

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
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

# 获取版本号
if [ -z "$1" ]; then
    print_info "请输入版本号 (例如: 1.0.0):"
    read -p "版本号: " VERSION
else
    VERSION=$1
fi

# 验证版本号格式
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    print_error "版本号格式不正确，请使用 x.y.z 格式 (例如: 1.0.0)"
    exit 1
fi

# 创建标签
TAG="v$VERSION"

# 检查标签是否已存在
if git tag -l | grep -q "^$TAG$"; then
    print_error "标签 $TAG 已存在"
    exit 1
fi

print_info "创建标签: $TAG"

# 创建带注释的标签
git tag -a "$TAG" -m "Release $TAG

🚀 新版本发布

### 📝 更新内容
- 自动生成更新日志

### 🌐 在线预览
网站将自动部署到 GitHub Pages

### 📦 构建信息
- 标签: $TAG
- 时间: $(date)
- 提交: $(git rev-parse --short HEAD)"

print_success "标签 $TAG 创建成功"

# 推送标签
print_info "推送标签到远程仓库..."
git push origin "$TAG"

print_success "标签 $TAG 已推送到远程仓库"

# 显示部署信息
print_info "GitHub Actions 将自动开始部署..."
print_info "部署地址: https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\)\.git/\1.github.io\/\2/')"
print_info "查看部署状态: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\)\.git/\1\/\2/')/actions"

print_success "部署流程已启动！"
