# CloudBase + Twikoo 部署指南

## 1. 创建环境
- 登录腾讯云 CloudBase → 新建环境（按量计费或免费资源包）。
- 选择接近受众的地域（如华南/华东）。

## 2. 部署 Twikoo（云函数）
- 控制台 → 云函数 → 创建 → 应用模板 → 搜索“Twikoo 评论系统”。
- 一键部署，记下函数名称与环境 ID。
- 开启“HTTP 访问服务”，得到 `serverURL`（形如 `https://service-xxx.run.tcloudbase.com/twikoo`）。

## 3. 内容安全与变量
- 开启“内容安全（TMS）”文本/图片检测，全类目勾选。
- 在函数环境变量设置：
  - `TWIKOO_THROTTLE_MS=10000`（同 IP 最小 10s）
  - `TWIKOO_MAX_TEXT_LEN=1000`
  - `TWIKOO_BLOCK_WORDS=违禁词1,违禁词2,...`
  - `TWIKOO_SITE_TITLE=MillionDollarDev`（可选）
- 访问控制（可选）：Referer 白名单为站点域名。

## 4. 数据库与存储
- 若未自动创建集合：建 `tk_comments`、`tk_counters`，权限“仅创建者可写”。
- 如需图片：建议关闭匿名直传，改为审核后可见。

## 5. 前端接入
- 在 `docs/.vitepress/config.ts` 中填入：
  ```ts
  ['script', {}, `window.__TK__={serverURL:'https://service-xxx.run.tcloudbase.com/twikoo',envId:'',lang:'zh-CN'}`]
  ```
- 或者使用 `envId`：
  ```ts
  ['script', {}, `window.__TK__={envId:'env-xxx',serverURL:'',lang:'zh-CN'}`]
  ```

## 6. 微信登录（可选）
- CloudBase → 登录与权限 → 开启“微信登录”，绑定 AppID/密钥。
- 先保持匿名可发，后续再切换“仅登录可发”。

## 7. 故障排查
- 评论无法加载：检查 `serverURL/envId` 是否正确、函数 HTTP 访问是否开启。
- 审核不生效：核对 TMS 是否开通、云函数角色权限是否足够。
- 被他站滥用：开启 Referer 白名单；必要时加验证码。
