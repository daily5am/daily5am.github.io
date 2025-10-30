# 开发清单（评论系统）

## 修改步骤
1. 变更前端：`Comment.vue`、`Layout.vue`、`config.ts`。
2. 更新 `/dev` 文档：说明变更目的与操作方法。
3. 本地验证：
   - `npm run docs:dev` 打开文档页，检查评论加载。
   - 触发敏感词/非法 URL，确认被拦截。
4. 生成环境：
   - CloudBase TMS 开启；变量正确；函数 HTTP 已开启。

## 测试要点
- 未配置 `serverURL/envId` 时展示友好错误。
- Frontmatter `comments:false` 页面不显示评论。
- 链接 `rel="nofollow ugc noopener noreferrer"`。
- 提交速率与字数与服务端策略一致。

## 回滚
- 关闭评论：将 `window.__TK__` 清空或在页面 frontmatter 关闭。
- 禁用入口：临时注释 `Layout.vue` 中的 `<Comment />`。
