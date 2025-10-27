import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '百万研发知识平台',
  description: '从小白到价值百万的研发专家成长指南',
  base: '/milliondollardev/',
  
  // 忽略死链接检查，因为很多页面还在规划中
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '学习指南', link: '/guide/beginner/' },
      {
        text: '就业面试',
        items: [
          { text: '面试指导', link: '/guide/career/' },
          { text: '软件协会资源', link: '/guide/career/associations/' },
          { text: '优质企业名录', link: '/guide/career/top-companies' },
          { text: '产业趋势分析', link: '/guide/career/industry-trends' },
          { text: '政策支持解读', link: '/guide/career/policy-support' }
        ]
      },
      { text: '深圳软件协会资源', link: '/guide/career/shenzhen-associations' },
      { text: '竞赛指导', link: '/guide/competition/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/guide/beginner/': [
        {
          text: '新手入门 (0-1年)',
          items: [
            { text: '学习路径', link: '/guide/beginner/' },
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
            { text: '学习路径', link: '/guide/junior/' },
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
            { text: '学习路径', link: '/guide/intermediate/' },
            { text: '系统设计', link: '/guide/intermediate/system-design' },
            { text: '性能优化', link: '/guide/intermediate/performance' },
            { text: '数据库设计', link: '/guide/intermediate/database' },
            { text: '常用中间件', link: '/guide/intermediate/middleware' }
          ]
        }
      ],
      '/guide/senior/': [
        {
          text: '高级开发者 (5-8年)',
          items: [
            { text: '学习路径', link: '/guide/senior/' },
            { text: '架构设计', link: '/guide/senior/architecture' },
            { text: '技术选型', link: '/guide/senior/tech-selection' },
            { text: '分布式系统', link: '/guide/senior/distributed' },
            { text: '高可用方案', link: '/guide/senior/high-availability' }
          ]
        }
      ],
      '/guide/expert/': [
        {
          text: '技术专家 (8年+)',
          items: [
            { text: '学习路径', link: '/guide/expert/' },
            { text: '技术深度', link: '/guide/expert/technical-depth' },
            { text: '团队影响力', link: '/guide/expert/team-influence' },
            { text: '技术决策', link: '/guide/expert/technical-decisions' },
            { text: '系统演进', link: '/guide/expert/system-evolution' }
          ]
        }
      ],
      '/guide/career/': [
        {
          text: '面试指导',
          items: [
            { text: '学习路径', link: '/guide/career/' },
            { text: '面试技巧', link: '/guide/career/interview-skills' },
            { text: '企业分享', link: '/guide/career/enterprise-sharing' },
            { text: '技术面试准备', link: '/guide/career/interview-preparation' },
            { text: '算法面试技巧', link: '/guide/career/algorithm-interview' },
            { text: '系统设计面试', link: '/guide/career/system-design-interview' },
            { text: '行为面试指南', link: '/guide/career/behavioral-interview' },
            { text: '简历撰写技巧', link: '/guide/career/resume-writing' },
            { text: '项目经验包装', link: '/guide/career/project-presentation' },
            { text: '技能展示方法', link: '/guide/career/skill-showcase' },
            { text: '简历模板下载', link: '/guide/career/resume-templates' },
            { text: '职业发展路径', link: '/guide/career/career-path' },
            { text: '技能提升计划', link: '/guide/career/skill-development' },
            { text: '薪资谈判技巧', link: '/guide/career/salary-negotiation' },
            { text: '跳槽策略指南', link: '/guide/career/job-hopping-strategy' }
          ]
        }
      ],
      '/guide/career/associations/': [
        {
          text: '软件协会资源',
          items: [
            { text: '协会概览', link: '/guide/career/associations/' },
            { text: '深圳市软件行业协会', link: '/guide/career/associations/shenzhen-software-industry' },
            { text: '深圳市人工智能产业协会', link: '/guide/career/associations/shenzhen-ai-industry' },
            { text: '深圳市金融科技协会', link: '/guide/career/associations/shenzhen-fintech' },
            { text: '深圳市计算机行业协会', link: '/guide/career/associations/shenzhen-computer-industry' },
            { text: '深圳市人工智能行业协会', link: '/guide/career/associations/shenzhen-ai-association' },
            { text: '深圳市智能硬件协会', link: '/guide/career/associations/shenzhen-smart-hardware' }
          ]
        }
      ],
      '/guide/career/shenzhen-associations': false,
      '/guide/career/top-companies': false,
      '/guide/career/industry-trends': false,
      '/guide/career/policy-support': false,
      '/guide/competition/': [
        {
          text: '竞赛指导',
          items: [
            { text: '学习路径', link: '/guide/competition/' },
            { text: '算法竞赛', link: '/guide/competition/algorithm-competition' },
            { text: '系统设计竞赛', link: '/guide/competition/system-design-competition' },
            { text: '创新大赛', link: '/guide/competition/innovation-contest' },
            { text: '黑客马拉松', link: '/guide/competition/hackathon' },
            { text: '竞赛技能提升', link: '/guide/competition/competition-skills' },
            { text: '团队组建', link: '/guide/competition/team-building' },
            { text: '项目管理', link: '/guide/competition/project-management' },
            { text: '时间管理', link: '/guide/competition/time-management' },
            { text: '竞赛策略', link: '/guide/competition/competition-strategy' },
            { text: '代码优化', link: '/guide/competition/code-optimization' },
            { text: '调试技巧', link: '/guide/competition/debugging-skills' },
            { text: '压力管理', link: '/guide/competition/stress-management' },
            { text: '项目展示', link: '/guide/competition/project-presentation' },
            { text: '技术演讲', link: '/guide/competition/technical-presentation' },
            { text: '文档编写', link: '/guide/competition/documentation' },
            { text: '作品集制作', link: '/guide/competition/portfolio' }
          ]
        }
      ],
      '/guide/soft-skills/': [
        {
          text: '通用能力',
          items: [
            { text: '学习路径', link: '/guide/soft-skills/' },
            { text: '软技能', link: '/guide/soft-skills/soft-skills' },
            { text: '职业规划', link: '/guide/soft-skills/career-planning' },
            { text: '面试指南', link: '/guide/soft-skills/interview-guide' },
            { text: '学习方法', link: '/guide/soft-skills/learning-methods' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/milliondollardev' }
    ],

    footer: {
      message: '基于深圳软件技术协会资源，助力开发者成长',
      copyright: 'Copyright © 2024 百万研发知识平台'
    },

    search: {
      provider: 'local'
    }
  }
})