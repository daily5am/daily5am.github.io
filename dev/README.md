# 开发者文档（/dev）

本目录用于记录站点的工程化与运营配置，供开发人员与 AI Agent 快速掌握并持续更新。

## 目录说明
- `comments-netlify.md`：Netlify Functions 部署 Twikoo（推荐）
- `comments-cloudbase.md`：CloudBase 环境与 Twikoo 部署指南（备选）
- `comments-policy.md`：评论内容安全策略（违禁词、URL 白名单、限流）
- `dev-checklist.md`：开发修改清单与测试要点

## 快速开始
1. 推荐：阅读 `comments-netlify.md`，将 Twikoo 后端部署到 Netlify 并获取函数 URL。
2. 在 `docs/.vitepress/config.ts` 的 `head` 中为 `window.__TK__` 填入 `serverURL`（Netlify 函数 URL）。
3. 文章页默认显示评论，若需关闭，在 Frontmatter 中设置：
   ```yaml
   ---
   title: 示例
   comments: false
   ---
   ```

## 更新约定
- 任何与评论系统、风控策略、部署细节相关的变更，均应同步更新本目录文档。
- 文档采用“小步快更”，每次提交请描述本次修改目的与影响范围。
- 优先保证中国大陆网络可访问性与合规性。
