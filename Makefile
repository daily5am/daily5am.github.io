# 百万研发知识平台 Makefile
# 提供便捷的开发和管理命令

# 默认目标
.DEFAULT_GOAL := help

# 颜色定义
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
NC=\033[0m

# 项目信息
PROJECT_NAME := 百万研发知识平台

# 帮助信息
.PHONY: help
help:
	@echo "$(GREEN)$(PROJECT_NAME) - 开发命令$(NC)"
	@echo ""
	@echo "$(YELLOW)可用命令:$(NC)"
	@echo "  $(GREEN)start$(NC)         启动本地开发服务器"
	@echo "  $(GREEN)dev$(NC)           启动开发服务器 (start的别名)"
	@echo "  $(GREEN)build$(NC)         构建生产版本"
	@echo "  $(GREEN)preview$(NC)        预览构建结果"
	@echo "  $(GREEN)install$(NC)        安装项目依赖"
	@echo "  $(GREEN)clean$(NC)          清理依赖和构建文件"
	@echo "  $(GREEN)reinstall$(NC)      重新安装依赖"
	@echo "  $(GREEN)deploy$(NC)         构建并准备部署"
	@echo "  $(GREEN)release$(NC)        创建发布标签并推送到远程仓库"
	@echo "  $(GREEN)info$(NC)           显示项目信息"
	@echo "  $(GREEN)status$(NC)         检查项目状态"
	@echo "  $(GREEN)quick-start$(NC)    快速开始 (安装依赖 + 启动开发服务器)"
	@echo "  $(GREEN)all$(NC)            检查环境 + 安装依赖 + 启动开发服务器"

# 开发相关命令
.PHONY: start
start:
	@echo "$(GREEN)🚀 启动 $(PROJECT_NAME) 开发服务器...$(NC)"
	@echo "$(YELLOW)访问地址: http://localhost:5173$(NC)"
	@echo "$(YELLOW)按 Ctrl+C 停止服务器$(NC)"
	@npm run docs:dev

.PHONY: dev
dev: start

.PHONY: build
build:
	@echo "$(GREEN)🔨 构建生产版本...$(NC)"
	@npm run docs:build
	@echo "$(GREEN)✅ 构建完成！输出目录: docs/.vitepress/dist$(NC)"

.PHONY: preview
preview: build
	@echo "$(GREEN)👀 预览构建结果...$(NC)"
	@echo "$(YELLOW)访问地址: http://localhost:4173$(NC)"
	@npm run docs:preview

# 安装和依赖管理
.PHONY: install
install:
	@echo "$(GREEN)📦 安装项目依赖...$(NC)"
	@npm install
	@echo "$(GREEN)✅ 依赖安装完成！$(NC)"

.PHONY: clean
clean:
	@echo "$(GREEN)🧹 清理项目文件...$(NC)"
	@rm -rf node_modules
	@rm -rf docs/.vitepress/dist
	@rm -rf .vitepress/cache
	@echo "$(GREEN)✅ 清理完成！$(NC)"

.PHONY: reinstall
reinstall: clean install

# 部署相关
.PHONY: deploy
deploy: build
	@echo "$(GREEN)🚀 准备部署...$(NC)"
	@echo "$(YELLOW)构建文件位于: docs/.vitepress/dist$(NC)"
	@echo "$(YELLOW)可以推送到GitHub/GitLab进行自动部署$(NC)"

.PHONY: release
release:
	@echo "$(GREEN)🏷️  创建发布标签...$(NC)"
	@TIMESTAMP=$$(date +"%Y%m%d.%H%M%S"); \
	TAG_NAME="release-$$TIMESTAMP"; \
	echo "$(YELLOW)创建标签: $$TAG_NAME$(NC)"; \
	git tag $$TAG_NAME; \
	echo "$(GREEN)✅ 标签创建成功: $$TAG_NAME$(NC)"; \
	echo "$(YELLOW)推送标签到远程仓库...$(NC)"; \
	git push origin $$TAG_NAME; \
	echo "$(GREEN)✅ 标签推送成功！$(NC)"

# 项目信息
.PHONY: info
info:
	@echo "$(GREEN)📋 项目信息:$(NC)"
	@echo "  项目名称: $(PROJECT_NAME)"
	@echo "  技术栈: VitePress + Vue3"
	@echo "  本地开发: make start"
	@echo "  构建部署: make build"

.PHONY: status
status:
	@echo "$(GREEN)📊 项目状态:$(NC)"
	@if [ -d "node_modules" ]; then \
		echo "  依赖状态: $(GREEN)✅ 已安装$(NC)"; \
	else \
		echo "  依赖状态: $(RED)❌ 未安装$(NC)"; \
	fi
	@if [ -d "docs/.vitepress/dist" ]; then \
		echo "  构建状态: $(GREEN)✅ 已构建$(NC)"; \
	else \
		echo "  构建状态: $(YELLOW)⚠️  未构建$(NC)"; \
	fi
	@echo "  文章数量: $$(find docs/guide -name "*.md" -type f | wc -l | tr -d ' ') 篇"

# 快速命令
.PHONY: quick-start
quick-start: install start

.PHONY: all
all: install start