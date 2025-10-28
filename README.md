# 百万研发知识平台

> 从小白到价值百万的研发专家成长指南

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-在线访问-blue)](https://yourusername.github.io/milliondollardev/)
[![VitePress](https://img.shields.io/badge/VitePress-文档生成-green)](https://vitepress.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 项目简介

百万研发知识平台是一个专为软件研发人员设计的知识分享平台，基于深圳软件技术协会资源，按照职业发展生命周期（新手到专家）系统化地组织学习内容，帮助开发者从小白成长为价值百万的研发专家。平台不仅提供技术学习指导，还提供就业面试和竞赛指导，助力开发者在深圳科技产业生态中实现职业发展。

## ✨ 特色功能

- 🚀 **系统化学习路径** - 按照职业发展轨迹设计，每个阶段都有明确目标
- 📚 **实战导向** - 注重实际工作技能培养，学以致用
- 🏢 **深圳产业资源** - 基于深圳软件技术协会资源，提供真实的企业对接机会
- 💼 **就业面试指导** - 提供全面的面试准备和职业发展指导
- 🏆 **竞赛指导** - 技术竞赛准备和参赛技巧，助你在各类竞赛中脱颖而出
- 🎥 **多媒体支持** - 支持文章、视频等多种内容形式
- 🔍 **智能搜索** - 内置全文搜索，快速找到所需内容
- 📱 **响应式设计** - 支持各种设备访问
- ⚡ **高性能** - 基于 VitePress，构建快速，加载迅速

## 🏗️ 技术架构

### 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - 基于 Vue 3 的静态站点生成器
- **前端**: Vue 3 + TypeScript + Vite
- **样式**: CSS3 + 自定义主题
- **部署**: GitHub Pages / GitLab Pages
- **CI/CD**: GitHub Actions / GitLab CI

### 项目结构

```
milliondollardev/
├── docs/                          # 文档内容
│   ├── .vitepress/               # VitePress 配置
│   │   ├── config.ts             # 站点配置
│   │   ├── theme/                 # 自定义主题
│   │   │   ├── index.ts          # 主题入口
│   │   │   ├── custom.css        # 自定义样式
│   │   │   └── components/       # 自定义组件
│   │   │       └── VideoPlayer.vue # 视频播放组件
│   │   └── public/               # 静态资源
│   ├── guide/                    # 学习指南
│   │   ├── beginner/            # 新手入门 (0-1年)
│   │   ├── junior/              # 初级开发者 (1-3年)
│   │   ├── intermediate/        # 中级开发者 (3-5年)
│   │   ├── senior/              # 高级开发者 (5-8年)
│   │   ├── expert/              # 技术专家 (8年+)
│   │   ├── career/              # 就业面试指导
│   │   │   ├── shenzhen-associations.md # 深圳协会资源
│   │   │   └── top-companies.md  # 优质企业名录
│   │   ├── competition/         # 竞赛指导
│   │   └── soft-skills/         # 通用能力
│   └── index.md                 # 首页
├── .github/workflows/            # GitHub Actions
│   └── deploy.yml               # 自动部署配置
├── .gitlab-ci.yml               # GitLab CI 配置
├── package.json                 # 项目配置
└── README.md                   # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm >= 7

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/milliondollardev.git
   cd milliondollardev
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run docs:dev
   ```

4. **访问站点**
   打开浏览器访问 `http://localhost:5173`

### 构建部署

1. **构建静态站点**
   ```bash
   npm run docs:build
   ```

2. **预览构建结果**
   ```bash
   npm run docs:preview
   ```

3. **自动部署到 GitHub Pages**
   ```bash
   # 使用脚本自动创建标签并部署
   npm run deploy
   
   # 或者指定版本号
   npm run deploy:version 1.0.0
   ```

### 🚀 GitHub Actions 自动部署

项目配置了 GitHub Actions 工作流，支持自动部署到 GitHub Pages：

#### 触发条件
- **自动触发**: 推送以 `v` 开头的标签（如 `v1.0.0`）
- **手动触发**: 在 GitHub Actions 页面手动运行

#### 部署流程
1. **构建**: 安装依赖并构建 VitePress 项目
2. **部署**: 将构建结果部署到 GitHub Pages
3. **发布**: 自动创建 GitHub Release

#### 使用方法
```bash
# 创建并推送标签（自动触发部署）
git tag v1.0.0
git push origin v1.0.0

# 或使用便捷脚本
npm run deploy
```

#### 部署地址
- **GitHub Pages**: `https://{username}.github.io/milliondollardev/`
- **Actions 状态**: `https://github.com/{username}/milliondollardev/actions`

## 📖 内容模块

### 🚀 新手入门 (0-1年)
- 编程语言基础
- 开发环境搭建
- Git版本控制
- IDE使用技巧

### 💼 初级开发者 (1-3年)
- 代码规范
- 业务开发流程
- 调试技巧
- 单元测试

### 🔧 中级开发者 (3-5年)
- 系统设计
- 性能优化
- 数据库设计
- 常用中间件

### 🏗️ 高级开发者 (5-8年)
- 架构设计
- 技术选型
- 分布式系统
- 高可用方案

### 🎯 技术专家 (8年+)
- 技术深度
- 团队影响力
- 技术决策
- 系统演进

### 💼 就业面试指导
- **深圳软件技术协会资源** - 基于深入调研的协会名录和企业对接指南
- **优质企业名录** - 涵盖AI、金融科技、智能硬件、智慧医疗等领域的领军企业
- **技术面试准备** - 算法面试、系统设计面试、行为面试等全面指导
- **简历优化** - 简历撰写技巧、项目经验包装、技能展示方法
- **职业规划** - 职业发展路径、技能提升计划、薪资谈判技巧

### 🏆 竞赛指导
- **竞赛类型了解** - 算法竞赛、系统设计竞赛、创新大赛、黑客马拉松
- **竞赛准备** - 技能提升、团队组建、项目管理、时间管理
- **参赛技巧** - 竞赛策略、代码优化、调试技巧、压力管理
- **成果展示** - 项目展示、技术演讲、文档编写、作品集制作

### 🌟 通用能力
- 软技能
- 职业规划
- 面试指南
- 学习方法

## 🛠️ 开发指南

### 添加新内容

1. **创建新文章**
   ```bash
   # 在对应模块下创建新的 .md 文件
   touch docs/guide/beginner/new-article.md
   ```

2. **更新导航**
   编辑 `docs/.vitepress/config.ts` 文件，在对应的 sidebar 配置中添加新文章链接。

3. **添加视频内容**
   ```markdown
   <VideoPlayer src="https://www.youtube.com/watch?v=VIDEO_ID" />
   ```

### 自定义主题

1. **修改样式**
   编辑 `docs/.vitepress/theme/custom.css` 文件

2. **添加组件**
   在 `docs/.vitepress/theme/components/` 目录下创建新的 Vue 组件

3. **注册组件**
   在 `docs/.vitepress/theme/index.ts` 中注册新组件

### 内容编写规范

1. **Markdown 格式**
   - 使用标准的 Markdown 语法
   - 代码块指定语言类型
   - 图片使用相对路径

2. **文章结构**
   ```markdown
   # 文章标题
   
   ## 🎯 学习目标
   
   ## 📚 学习内容
   
   ## 🚀 实践练习
   
   ## 📖 推荐资源
   
   ## 💡 学习建议
   ```

3. **视频嵌入**
   ```markdown
   <VideoPlayer src="视频链接" />
   ```

## 🔧 配置说明

### VitePress 配置

主要配置文件：`docs/.vitepress/config.ts`

- **导航栏配置**: `nav` 选项
- **侧边栏配置**: `sidebar` 选项
- **搜索配置**: `search` 选项
- **主题配置**: `themeConfig` 选项

### 部署配置

#### GitHub Pages

1. 在仓库设置中启用 Pages
2. 选择 GitHub Actions 作为部署源
3. 推送代码到 main 分支即可自动部署

#### GitLab Pages

1. 推送代码到 GitLab 仓库
2. 在 CI/CD 设置中启用 Pages
3. 自动构建和部署

## 🤝 贡献指南

### 如何贡献

1. **Fork 项目**
2. **创建功能分支**
   ```bash
   git checkout -b feature/new-content
   ```
3. **提交更改**
   ```bash
   git commit -m "Add new content"
   ```
4. **推送分支**
   ```bash
   git push origin feature/new-content
   ```
5. **创建 Pull Request**

### 贡献内容

- 📝 添加新的学习内容
- 🐛 修复文档错误
- 💡 改进内容结构
- 🎨 优化页面样式
- 🔧 改进开发工具

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！

## 📞 联系我们

- **GitHub Issues**: [提交问题](https://github.com/yourusername/milliondollardev/issues)
- **GitHub Discussions**: [参与讨论](https://github.com/yourusername/milliondollardev/discussions)
- **Email**: your-email@example.com

## 🏢 深圳产业资源

### 核心协会资源
- **深圳市软件行业协会** - 4000+会员企业，5A级社会组织
- **深圳市人工智能产业协会** - 1132+会员企业，46家上市企业
- **深圳市金融科技协会** - 174家会员，全国最活跃金融CIO社群
- **深圳市计算机行业协会** - 180+会员，华为、中兴等知名企业

### 优质企业生态
- **AI与人工智能**: 云天励飞、云豹智能、元象科技、优必选、奥比中光
- **金融科技**: 微众银行、平安科技、腾讯金融科技、金证科技
- **智能硬件**: 华为技术、中兴通讯、TCL、创维、康佳
- **智慧医疗**: 迈瑞医疗、卫盈联信息技术、中电科新型智慧城市研究院

### 活动资源
- **年均500+场**各类技术交流和商务对接活动
- **投融资对接会** - 项目展示和投资机会
- **技术研讨会** - 前沿技术分享和学习
- **企业考察** - 走进知名企业，了解企业文化

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
