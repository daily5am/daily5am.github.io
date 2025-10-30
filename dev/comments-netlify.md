# Twikoo on Netlify 部署指南

参考官方文档：[Twikoo: Netlify 部署](https://twikoo.js.org/backend.html#netlify-%E9%83%A8%E7%BD%B2)。

## 方案概览
- 前端：继续使用 GitHub Pages 托管静态站点。
- 评论后端：在 Netlify Functions 部署 Twikoo，仅提供后端 API Endpoint。
- 前端只需在 `window.__TK__` 中填入 `serverURL` 为该函数 URL。

## 部署步骤（概要）
1. 准备仓库
   - A：使用官方 Netlify 模板（推荐）。
   - B：自建仓库，并添加 Netlify Functions：`netlify/functions/twikoo/index.js`：
     ```js
     exports.handler = require('twikoo-netlify').handler
     ```
   - `package.json` 添加依赖：`twikoo-netlify`。
2. 创建 Netlify 站点
   - New site from Git → 选择上述仓库。
   - Build command：空（仅 Functions）或 `npm install`。
   - Publish directory：空。
3. 环境变量（按需）
   - `MONGODB_URI`（如使用 MongoDB Atlas）。
   - `TWIKOO_THROTTLE_MS`、`TWIKOO_MAX_TEXT_LEN`、`TWIKOO_BLOCK_WORDS`（反滥用）。
4. 部署并获取函数 URL
   - Site settings → Functions → 复制 URL：
     - 形如：`https://<site>.netlify.app/.netlify/functions/twikoo`
5. 前端接入
   - 在 `docs/.vitepress/config.ts` 中设置：
     ```ts
     ['script', {}, `window.__TK__={serverURL:'https://<site>.netlify.app/.netlify/functions/twikoo',envId:'',lang:'zh-CN'}`]
     ```

## 验证
- 本地启动文档站后，文章页底部应出现评论框并可提交评论。
- 包含外链的评论展示应带有 `rel="nofollow ugc noopener noreferrer"`。

> 详细配置、限制、更新以官方文档为准：[Twikoo: Netlify 部署](https://twikoo.js.org/backend.html#netlify-%E9%83%A8%E7%BD%B2)。
