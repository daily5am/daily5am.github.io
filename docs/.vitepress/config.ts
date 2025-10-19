import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '百万研发知识平台',
  description: '从小白到价值百万的研发专家成长指南',
  
  // 基础配置
  base: '/milliondollardev/',
  lang: 'zh-CN',
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '新手入门', link: '/guide/beginner/' },
      { text: '初级开发者', link: '/guide/junior/' },
      { text: '中级开发者', link: '/guide/intermediate/' },
      { text: '高级开发者', link: '/guide/senior/' },
      { text: '技术专家', link: '/guide/expert/' },
      { text: '通用能力', link: '/guide/soft-skills/' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/beginner/': [
        {
          text: '新手入门 (0-1年)',
          items: [
            { text: '开始学习', link: '/guide/beginner/' },
            { text: '编程语言基础', link: '/guide/beginner/programming-basics' },
            { text: '开发环境搭建', link: '/guide/beginner/dev-environment' },
            { text: 'Git版本控制', link: '/guide/beginner/git-basics' },
            { text: 'IDE使用技巧', link: '/guide/beginner/ide-tips' }
          ]
        }
      ],
      '/guide/junior/': [
        {
          text: '初级开发者 (1-3年)',
          items: [
            { text: '开始进阶', link: '/guide/junior/' },
            { text: '代码规范', link: '/guide/junior/code-standards' },
            { text: '业务开发流程', link: '/guide/junior/business-development' },
            { text: '调试技巧', link: '/guide/junior/debugging' },
            { text: '单元测试', link: '/guide/junior/unit-testing' }
          ]
        }
      ],
      '/guide/intermediate/': [
        {
          text: '中级开发者 (3-5年)',
          items: [
            { text: '系统设计入门', link: '/guide/intermediate/' },
            { text: '性能优化', link: '/guide/intermediate/performance' },
            { text: '数据库设计', link: '/guide/intermediate/database-design' },
            { text: '常用中间件', link: '/guide/intermediate/middleware' },
            { text: '微服务架构', link: '/guide/intermediate/microservices' }
          ]
        }
      ],
      '/guide/senior/': [
        {
          text: '高级开发者 (5-8年)',
          items: [
            { text: '架构设计', link: '/guide/senior/' },
            { text: '技术选型', link: '/guide/senior/tech-selection' },
            { text: '分布式系统', link: '/guide/senior/distributed-systems' },
            { text: '高可用方案', link: '/guide/senior/high-availability' },
            { text: '监控与运维', link: '/guide/senior/monitoring' }
          ]
        }
      ],
      '/guide/expert/': [
        {
          text: '技术专家/架构师 (8年+)',
          items: [
            { text: '技术深度', link: '/guide/expert/' },
            { text: '团队影响力', link: '/guide/expert/team-influence' },
            { text: '技术决策', link: '/guide/expert/tech-decisions' },
            { text: '系统演进', link: '/guide/expert/system-evolution' },
            { text: '技术前瞻', link: '/guide/expert/tech-trends' }
          ]
        }
      ],
      '/guide/soft-skills/': [
        {
          text: '通用能力',
          items: [
            { text: '软技能', link: '/guide/soft-skills/' },
            { text: '职业规划', link: '/guide/soft-skills/career-planning' },
            { text: '面试指南', link: '/guide/soft-skills/interview-guide' },
            { text: '学习方法', link: '/guide/soft-skills/learning-methods' },
            { text: '时间管理', link: '/guide/soft-skills/time-management' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/milliondollardev' }
    ],

    // 搜索
    search: {
      provider: 'local'
    },

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024 百万研发知识平台'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/yourusername/milliondollardev/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
    theme: 'github-dark'
  },

  // 构建配置
  build: {
    outDir: '../dist'
  }
})
