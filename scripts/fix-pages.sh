#!/bin/bash

# GitHub Pages 快速修复脚本
# 用于修复显示README.md而不是VitePress网站的问题

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

print_info "🔧 GitHub Pages 快速修复脚本"
echo

print_info "当前问题：GitHub Pages显示README.md而不是VitePress网站"
print_info "解决方案：确保GitHub Pages Source设置为'GitHub Actions'"
echo

print_warning "请按照以下步骤操作："
echo
echo "1. 访问仓库设置页面："
echo "   https://github.com/daily5am/daily5am.github.io/settings/pages"
echo
echo "2. 在 'Source' 部分："
echo "   - 选择 'GitHub Actions'"
echo "   - 不要选择 'Deploy from a branch'"
echo
echo "3. 保存设置"
echo
echo "4. 运行此脚本重新部署："
echo "   ./scripts/fix-pages.sh deploy"
echo

if [ "$1" = "deploy" ]; then
    print_info "开始重新部署..."
    
    # 检查是否在git仓库中
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "当前目录不是git仓库"
        exit 1
    fi
    
    # 获取版本号
    if [ -z "$2" ]; then
        VERSION="1.0.2"
    else
        VERSION=$2
    fi
    
    TAG="v$VERSION"
    
    # 检查标签是否已存在
    if git tag -l | grep -q "^$TAG$"; then
        print_warning "标签 $TAG 已存在，使用下一个版本"
        VERSION="1.0.3"
        TAG="v$VERSION"
    fi
    
    print_info "创建标签: $TAG"
    
    # 创建标签
    git tag -a "$TAG" -m "Fix GitHub Pages deployment

🔧 修复GitHub Pages配置问题

### 📝 更新内容
- 确保GitHub Pages Source设置为GitHub Actions
- 重新部署VitePress静态网站
- 修复显示README.md的问题

### 🌐 在线预览
网站将重新部署到 GitHub Pages

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
    print_info "部署地址: https://daily5am.github.io/"
    print_info "查看部署状态: https://github.com/daily5am/daily5am.github.io/actions"
    
    print_success "部署流程已启动！"
    print_warning "请等待5-10分钟让更改生效"
    
else
    print_info "使用方法："
    echo "  ./scripts/fix-pages.sh          # 显示修复指南"
    echo "  ./scripts/fix-pages.sh deploy   # 重新部署"
    echo "  ./scripts/fix-pages.sh deploy 1.0.3  # 指定版本号部署"
fi
