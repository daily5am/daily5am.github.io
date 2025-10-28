import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '百万研发知识平台',
  description: '从小白到价值百万的研发专家成长指南',
  base: '/',
  
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
    
    // 外观设置
    appearance: true,
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到亮色模式',
    darkModeSwitchTitle: '切换到暗色模式',
    
    nav: [
      { text: '首页', link: '/' },
      {
        text: '学习指南',
        items: [
          { text: '学习路径', link: '/guide/learning-path' },
          { text: '新手入门', link: '/guide/beginner/' }
        ]
      },
      {
        text: '系统设计',
        items: [
          { text: '架构基础', link: '/guide/system-design/architecture-basics' },
          { text: '分布式系统', link: '/guide/system-design/distributed-systems' },
          { text: '微服务系统', link: '/guide/system-design/microservices' },
          { text: '系统设计', link: '/guide/system-design/system-design' }
        ]
      },
      {
        text: '运维开发',
        items: [
          { text: '发布部署', link: '/guide/devops/deployment' },
          { text: '可观测技术', link: '/guide/devops/observability' },
          { text: 'CI/CD', link: '/guide/devops/cicd' },
          { text: '容器化', link: '/guide/devops/containerization' },
          { text: '基础设施即代码', link: '/guide/devops/iac' },
          { text: '监控告警', link: '/guide/devops/monitoring' },
          { text: '日志管理', link: '/guide/devops/logging' },
          { text: '性能调优', link: '/guide/devops/performance' }
        ]
      },
      {
        text: '人工智能',
        items: [
          { text: 'AI Agent', link: '/guide/ai/ai-agent' },
          { text: '大语言模型', link: '/guide/ai/llm' },
          { text: '机器学习', link: '/guide/ai/machine-learning' },
          { text: '深度学习', link: '/guide/ai/deep-learning' },
          { text: '计算机视觉', link: '/guide/ai/computer-vision' },
          { text: '自然语言处理', link: '/guide/ai/nlp' },
          { text: '强化学习', link: '/guide/ai/reinforcement-learning' },
          { text: 'AI工具与框架', link: '/guide/ai/tools-frameworks' }
        ]
      },
      {
        text: '就业面试',
        items: [
          { text: '面试指导', link: '/guide/career/' },
          { text: '求职平台', link: '/guide/career/job-platforms' }
        ]
      },
      {
        text: '行业资讯',
        items: [
          {
            text: '优质企业',
            items: [
              { text: '优质企业列表', link: '/guide/career/companies/' },
              { text: '优质企业搜索', link: '/guide/career/top-companies' }
            ]
          },
          {
            text: '协会资源',
            items: [
              { text: '协会资源列表', link: '/guide/career/associations/' },
              { text: '协会资源搜索', link: '/guide/career/shenzhen-associations' }
            ]
          },
          { text: '产业趋势分析', link: '/guide/career/industry-trends' },
          { text: '政策支持解读', link: '/guide/career/policy-support' }
        ]
      },
      {
        text: '竞赛科研',
        items: [
          { text: '竞赛指导', link: '/guide/competition/' },
          { text: '科研机构', link: '/guide/research/' }
        ]
      },
      {
        text: '周刊',
        items: [
          { text: '2025', link: '/weekly/2025' }
        ]
      },
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
      '/guide/career/industry-trends': [
        {
          text: '产业趋势分析',
          items: [
            { text: '概览', link: '/guide/career/industry-trends' },
            { text: 'AI与人工智能', link: '/guide/career/industry-trends#ai与人工智能' },
            { text: '云计算与大数据', link: '/guide/career/industry-trends#云计算与大数据' },
            { text: '物联网与5G', link: '/guide/career/industry-trends#物联网与5g' },
            { text: '区块链与Web3', link: '/guide/career/industry-trends#区块链与web3' },
            { text: '量子计算', link: '/guide/career/industry-trends#量子计算' },
            { text: '元宇宙与VR/AR', link: '/guide/career/industry-trends#元宇宙与vrar' },
            { text: '自动驾驶', link: '/guide/career/industry-trends#自动驾驶' },
            { text: '技术发展建议', link: '/guide/career/industry-trends#技术发展建议' },
            { text: '相关资源', link: '/guide/career/industry-trends#相关资源' }
          ]
        }
      ],
      '/guide/career/policy-support': [
        {
          text: '政策支持解读',
          items: [
            { text: '概览', link: '/guide/career/policy-support' },
            { text: '国家层面政策', link: '/guide/career/policy-support#国家层面政策' },
            { text: '深圳地方政策', link: '/guide/career/policy-support#深圳地方政策' },
            { text: '资金支持政策', link: '/guide/career/policy-support#资金支持政策' },
            { text: '申报流程指南', link: '/guide/career/policy-support#申报流程指南' },
            { text: '政策利用建议', link: '/guide/career/policy-support#政策利用建议' },
            { text: '相关资源', link: '/guide/career/policy-support#相关资源' }
          ]
        }
      ],
      '/guide/ai/ai-agent': [
        {
          text: 'AI Agent',
          items: [
            { text: '概览', link: '/guide/ai/ai-agent' },
            { text: 'AI Agent基础', link: '/guide/ai/ai-agent#ai-agent基础' },
            { text: 'Agent架构', link: '/guide/ai/ai-agent#agent架构' },
            { text: '智能决策', link: '/guide/ai/ai-agent#智能决策' },
            { text: '技术实现', link: '/guide/ai/ai-agent#技术实现' },
            { text: '应用场景', link: '/guide/ai/ai-agent#应用场景' },
            { text: '开发实践', link: '/guide/ai/ai-agent#开发实践' },
            { text: '学习资源', link: '/guide/ai/ai-agent#学习资源' },
            { text: '下一步', link: '/guide/ai/ai-agent#下一步' }
          ]
        }
      ],
      '/guide/ai/llm': [
        {
          text: '大语言模型',
          items: [
            { text: '概览', link: '/guide/ai/llm' },
            { text: '模型架构', link: '/guide/ai/llm#模型架构' },
            { text: '技术原理', link: '/guide/ai/llm#技术原理' },
            { text: '应用场景', link: '/guide/ai/llm#应用场景' },
            { text: '实践应用', link: '/guide/ai/llm#实践应用' },
            { text: '技术挑战', link: '/guide/ai/llm#技术挑战' },
            { text: '学习资源', link: '/guide/ai/llm#学习资源' },
            { text: '下一步', link: '/guide/ai/llm#下一步' }
          ]
        }
      ],
      '/guide/ai/machine-learning': [
        {
          text: '机器学习',
          items: [
            { text: '概览', link: '/guide/ai/machine-learning' },
            { text: '基础概念', link: '/guide/ai/machine-learning#基础概念' },
            { text: '监督学习', link: '/guide/ai/machine-learning#监督学习' },
            { text: '无监督学习', link: '/guide/ai/machine-learning#无监督学习' },
            { text: '强化学习', link: '/guide/ai/machine-learning#强化学习' },
            { text: '实践应用', link: '/guide/ai/machine-learning#实践应用' },
            { text: '应用场景', link: '/guide/ai/machine-learning#应用场景' },
            { text: '开发实践', link: '/guide/ai/machine-learning#开发实践' },
            { text: '学习资源', link: '/guide/ai/machine-learning#学习资源' },
            { text: '下一步', link: '/guide/ai/machine-learning#下一步' }
          ]
        }
      ],
      '/guide/ai/deep-learning': [
        {
          text: '深度学习',
          items: [
            { text: '概览', link: '/guide/ai/deep-learning' },
            { text: '神经网络基础', link: '/guide/ai/deep-learning#神经网络基础' },
            { text: '卷积神经网络', link: '/guide/ai/deep-learning#卷积神经网络' },
            { text: '循环神经网络', link: '/guide/ai/deep-learning#循环神经网络' },
            { text: '注意力机制', link: '/guide/ai/deep-learning#注意力机制' },
            { text: '训练技术', link: '/guide/ai/deep-learning#训练技术' },
            { text: '应用场景', link: '/guide/ai/deep-learning#应用场景' },
            { text: '实践应用', link: '/guide/ai/deep-learning#实践应用' },
            { text: '技术挑战', link: '/guide/ai/deep-learning#技术挑战' },
            { text: '学习资源', link: '/guide/ai/deep-learning#学习资源' },
            { text: '下一步', link: '/guide/ai/deep-learning#下一步' }
          ]
        }
      ],
      '/guide/ai/computer-vision': [
        {
          text: '计算机视觉',
          items: [
            { text: '概览', link: '/guide/ai/computer-vision' },
            { text: '图像基础', link: '/guide/ai/computer-vision#图像基础' },
            { text: '特征提取', link: '/guide/ai/computer-vision#特征提取' },
            { text: '图像分类', link: '/guide/ai/computer-vision#图像分类' },
            { text: '目标检测', link: '/guide/ai/computer-vision#目标检测' },
            { text: '图像分割', link: '/guide/ai/computer-vision#图像分割' },
            { text: '图像生成', link: '/guide/ai/computer-vision#图像生成' },
            { text: '实践应用', link: '/guide/ai/computer-vision#实践应用' },
            { text: '应用场景', link: '/guide/ai/computer-vision#应用场景' },
            { text: '技术挑战', link: '/guide/ai/computer-vision#技术挑战' },
            { text: '学习资源', link: '/guide/ai/computer-vision#学习资源' },
            { text: '下一步', link: '/guide/ai/computer-vision#下一步' }
          ]
        }
      ],
      '/guide/ai/nlp': [
        {
          text: '自然语言处理',
          items: [
            { text: '概览', link: '/guide/ai/nlp' },
            { text: '文本基础', link: '/guide/ai/nlp#文本基础' },
            { text: '词向量技术', link: '/guide/ai/nlp#词向量技术' },
            { text: '语言模型', link: '/guide/ai/nlp#语言模型' },
            { text: '序列到序列模型', link: '/guide/ai/nlp#序列到序列模型' },
            { text: '文本分类', link: '/guide/ai/nlp#文本分类' },
            { text: '信息提取', link: '/guide/ai/nlp#信息提取' },
            { text: '对话系统', link: '/guide/ai/nlp#对话系统' },
            { text: '实践应用', link: '/guide/ai/nlp#实践应用' },
            { text: '应用场景', link: '/guide/ai/nlp#应用场景' },
            { text: '技术挑战', link: '/guide/ai/nlp#技术挑战' },
            { text: '学习资源', link: '/guide/ai/nlp#学习资源' },
            { text: '下一步', link: '/guide/ai/nlp#下一步' }
          ]
        }
      ],
      '/guide/ai/reinforcement-learning': [
        {
          text: '强化学习',
          items: [
            { text: '概览', link: '/guide/ai/reinforcement-learning' },
            { text: '基本概念', link: '/guide/ai/reinforcement-learning#基本概念' },
            { text: '价值函数方法', link: '/guide/ai/reinforcement-learning#价值函数方法' },
            { text: '策略梯度方法', link: '/guide/ai/reinforcement-learning#策略梯度方法' },
            { text: '深度强化学习', link: '/guide/ai/reinforcement-learning#深度强化学习' },
            { text: '应用场景', link: '/guide/ai/reinforcement-learning#应用场景' },
            { text: '实践应用', link: '/guide/ai/reinforcement-learning#实践应用' },
            { text: '技术挑战', link: '/guide/ai/reinforcement-learning#技术挑战' },
            { text: '学习资源', link: '/guide/ai/reinforcement-learning#学习资源' },
            { text: '下一步', link: '/guide/ai/reinforcement-learning#下一步' }
          ]
        }
      ],
      '/guide/ai/tools-frameworks': [
        {
          text: 'AI工具与框架',
          items: [
            { text: '概览', link: '/guide/ai/tools-frameworks' },
            { text: 'Python生态', link: '/guide/ai/tools-frameworks#python生态' },
            { text: '云平台服务', link: '/guide/ai/tools-frameworks#云平台服务' },
            { text: '开发工具', link: '/guide/ai/tools-frameworks#开发工具' },
            { text: '部署工具', link: '/guide/ai/tools-frameworks#部署工具' },
            { text: '数据处理工具', link: '/guide/ai/tools-frameworks#数据处理工具' },
            { text: '模型评估工具', link: '/guide/ai/tools-frameworks#模型评估工具' },
            { text: '应用场景', link: '/guide/ai/tools-frameworks#应用场景' },
            { text: '选择建议', link: '/guide/ai/tools-frameworks#选择建议' },
            { text: '学习资源', link: '/guide/ai/tools-frameworks#学习资源' },
            { text: '下一步', link: '/guide/ai/tools-frameworks#下一步' }
          ]
        }
      ],
      '/guide/career/job-platforms': [
        {
          text: '求职平台',
          items: [
            { text: '概览', link: '/guide/career/job-platforms' },
            {
              text: '国内求职平台',
              items: [
                { text: '智联招聘', link: '/guide/career/platforms/zhaopin' },
                { text: '前程无忧', link: '/guide/career/platforms/51job' },
                { text: '58同城', link: '/guide/career/platforms/58' },
                { text: 'Boss直聘', link: '/guide/career/platforms/boss' },
                { text: '拉勾网', link: '/guide/career/platforms/lagou' },
                { text: '猎聘网', link: '/guide/career/platforms/liepin' },
                { text: '牛客网', link: '/guide/career/platforms/nowcoder' },
                { text: '实习僧', link: '/guide/career/platforms/shixiseng' }
              ]
            },
            {
              text: '国外求职平台',
              items: [
                { text: 'LinkedIn', link: '/guide/career/platforms/linkedin' },
                { text: 'Indeed', link: '/guide/career/platforms/indeed' },
                { text: 'Stack Overflow Jobs', link: '/guide/career/platforms/stackoverflow' },
                { text: 'AngelList', link: '/guide/career/platforms/angellist' }
              ]
            },
            { text: '平台使用策略', link: '/guide/career/job-platforms#平台使用策略' },
            { text: '相关资源', link: '/guide/career/job-platforms#相关资源' }
          ]
        }
      ],
      '/guide/career/platforms/zhaopin': [
        {
          text: '智联招聘',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/zhaopin' },
            { text: '平台特色', link: '/guide/career/platforms/zhaopin#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/zhaopin#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/zhaopin#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/zhaopin#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/zhaopin#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/zhaopin#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/zhaopin#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/zhaopin#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/zhaopin#相关资源' },
            { text: '总结', link: '/guide/career/platforms/zhaopin#总结' }
          ]
        }
      ],
      '/guide/career/platforms/51job': [
        {
          text: '前程无忧',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/51job' },
            { text: '平台特色', link: '/guide/career/platforms/51job#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/51job#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/51job#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/51job#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/51job#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/51job#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/51job#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/51job#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/51job#相关资源' },
            { text: '总结', link: '/guide/career/platforms/51job#总结' }
          ]
        }
      ],
      '/guide/career/platforms/58': [
        {
          text: '58同城',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/58' },
            { text: '平台特色', link: '/guide/career/platforms/58#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/58#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/58#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/58#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/58#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/58#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/58#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/58#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/58#相关资源' },
            { text: '总结', link: '/guide/career/platforms/58#总结' }
          ]
        }
      ],
      '/guide/career/platforms/boss': [
        {
          text: 'Boss直聘',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/boss' },
            { text: '平台特色', link: '/guide/career/platforms/boss#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/boss#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/boss#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/boss#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/boss#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/boss#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/boss#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/boss#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/boss#相关资源' },
            { text: '总结', link: '/guide/career/platforms/boss#总结' }
          ]
        }
      ],
      '/guide/career/platforms/lagou': [
        {
          text: '拉勾网',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/lagou' },
            { text: '平台特色', link: '/guide/career/platforms/lagou#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/lagou#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/lagou#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/lagou#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/lagou#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/lagou#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/lagou#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/lagou#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/lagou#相关资源' },
            { text: '总结', link: '/guide/career/platforms/lagou#总结' }
          ]
        }
      ],
      '/guide/career/platforms/liepin': [
        {
          text: '猎聘网',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/liepin' },
            { text: '平台特色', link: '/guide/career/platforms/liepin#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/liepin#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/liepin#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/liepin#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/liepin#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/liepin#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/liepin#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/liepin#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/liepin#相关资源' },
            { text: '总结', link: '/guide/career/platforms/liepin#总结' }
          ]
        }
      ],
      '/guide/career/platforms/nowcoder': [
        {
          text: '牛客网',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/nowcoder' },
            { text: '平台特色', link: '/guide/career/platforms/nowcoder#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/nowcoder#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/nowcoder#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/nowcoder#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/nowcoder#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/nowcoder#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/nowcoder#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/nowcoder#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/nowcoder#相关资源' },
            { text: '总结', link: '/guide/career/platforms/nowcoder#总结' }
          ]
        }
      ],
      '/guide/career/platforms/shixiseng': [
        {
          text: '实习僧',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/shixiseng' },
            { text: '平台特色', link: '/guide/career/platforms/shixiseng#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/shixiseng#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/shixiseng#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/shixiseng#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/shixiseng#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/shixiseng#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/shixiseng#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/shixiseng#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/shixiseng#相关资源' },
            { text: '总结', link: '/guide/career/platforms/shixiseng#总结' }
          ]
        }
      ],
      '/guide/career/platforms/linkedin': [
        {
          text: 'LinkedIn',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/linkedin' },
            { text: '平台特色', link: '/guide/career/platforms/linkedin#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/linkedin#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/linkedin#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/linkedin#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/linkedin#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/linkedin#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/linkedin#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/linkedin#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/linkedin#相关资源' },
            { text: '总结', link: '/guide/career/platforms/linkedin#总结' }
          ]
        }
      ],
      '/guide/career/platforms/indeed': [
        {
          text: 'Indeed',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/indeed' },
            { text: '平台特色', link: '/guide/career/platforms/indeed#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/indeed#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/indeed#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/indeed#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/indeed#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/indeed#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/indeed#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/indeed#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/indeed#相关资源' },
            { text: '总结', link: '/guide/career/platforms/indeed#总结' }
          ]
        }
      ],
      '/guide/career/platforms/stackoverflow': [
        {
          text: 'Stack Overflow Jobs',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/stackoverflow' },
            { text: '平台特色', link: '/guide/career/platforms/stackoverflow#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/stackoverflow#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/stackoverflow#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/stackoverflow#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/stackoverflow#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/stackoverflow#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/stackoverflow#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/stackoverflow#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/stackoverflow#相关资源' },
            { text: '总结', link: '/guide/career/platforms/stackoverflow#总结' }
          ]
        }
      ],
      '/guide/career/platforms/angellist': [
        {
          text: 'AngelList',
          items: [
            { text: '平台简介', link: '/guide/career/platforms/angellist' },
            { text: '平台特色', link: '/guide/career/platforms/angellist#平台特色' },
            { text: '主要功能', link: '/guide/career/platforms/angellist#主要功能' },
            { text: '使用技巧', link: '/guide/career/platforms/angellist#使用技巧' },
            { text: '注意事项', link: '/guide/career/platforms/angellist#注意事项' },
            { text: '适用人群', link: '/guide/career/platforms/angellist#适用人群' },
            { text: '费用说明', link: '/guide/career/platforms/angellist#费用说明' },
            { text: '平台优势', link: '/guide/career/platforms/angellist#平台优势' },
            { text: '成功案例', link: '/guide/career/platforms/angellist#成功案例' },
            { text: '相关资源', link: '/guide/career/platforms/angellist#相关资源' },
            { text: '总结', link: '/guide/career/platforms/angellist#总结' }
          ]
        }
      ],
      '/weekly/2025': [
        {
          text: '2025年技术周刊',
          items: [
            { text: '概览', link: '/weekly/2025' },
            { text: '第52周: 年终技术回顾与展望', link: '/weekly/2025#第52周-2025-12-22---2025-12-28' },
            { text: '第51周: AI技术年终盘点', link: '/weekly/2025#第51周-2025-12-15---2025-12-21' },
            { text: '第50周: 云原生技术前沿', link: '/weekly/2025#第50周-2025-12-08---2025-12-14' },
            { text: '第49周: 前端技术革新', link: '/weekly/2025#第49周-2025-12-01---2025-12-07' },
            { text: '第48周: 后端架构设计', link: '/weekly/2025#第48周-2025-11-24---2025-11-30' },
            { text: '第47周: 移动开发技术', link: '/weekly/2025#第47周-2025-11-17---2025-11-23' },
            { text: '第46周: 数据科学与分析', link: '/weekly/2025#第46周-2025-11-10---2025-11-16' },
            { text: '第45周: 网络安全与隐私', link: '/weekly/2025#第45周-2025-11-03---2025-11-09' },
            { text: '第44周: 区块链与Web3', link: '/weekly/2025#第44周-2025-10-27---2025-11-02' },
            { text: '第43周: 物联网与边缘计算', link: '/weekly/2025#第43周-2025-10-20---2025-10-26' },
            { text: '第42周: 游戏开发技术', link: '/weekly/2025#第42周-2025-10-13---2025-10-19' },
            { text: '第41周: DevOps与自动化', link: '/weekly/2025#第41周-2025-10-06---2025-10-12' },
            { text: '第40周: 开源项目推荐', link: '/weekly/2025#第40周-2025-09-29---2025-10-05' },
            { text: '第39周: 编程语言发展', link: '/weekly/2025#第39周-2025-09-22---2025-09-28' },
            { text: '第38周: 技术团队管理', link: '/weekly/2025#第38周-2025-09-15---2025-09-21' },
            { text: '第37周: 性能优化专题', link: '/weekly/2025#第37周-2025-09-08---2025-09-14' },
            { text: '第36周: 测试与质量保证', link: '/weekly/2025#第36周-2025-09-01---2025-09-08' },
            { text: '第35周: 架构模式与设计', link: '/weekly/2025#第35周-2025-08-25---2025-08-31' },
            { text: '第34周: 云计算服务', link: '/weekly/2025#第34周-2025-08-18---2025-08-24' },
            { text: '第33周: 人工智能应用', link: '/weekly/2025#第33周-2025-08-11---2025-08-17' },
            { text: '第32周: 数据库技术', link: '/weekly/2025#第32周-2025-08-04---2025-08-10' },
            { text: '第31周: API设计与开发', link: '/weekly/2025#第31周-2025-07-28---2025-08-03' },
            { text: '第30周: 前端工程化', link: '/weekly/2025#第30周-2025-07-21---2025-07-27' },
            { text: '第29周: 移动端开发', link: '/weekly/2025#第29周-2025-07-14---2025-07-20' },
            { text: '第28周: 微服务架构', link: '/weekly/2025#第28周-2025-07-07---2025-07-13' },
            { text: '第27周: 容器化技术', link: '/weekly/2025#第27周-2025-06-30---2025-07-06' },
            { text: '第26周: 大数据处理', link: '/weekly/2025#第26周-2025-06-23---2025-06-29' },
            { text: '第25周: 机器学习工程', link: '/weekly/2025#第25周-2025-06-16---2025-06-22' },
            { text: '第24周: 网络安全', link: '/weekly/2025#第24周-2025-06-09---2025-06-15' },
            { text: '第23周: 区块链技术', link: '/weekly/2025#第23周-2025-06-02---2025-06-08' },
            { text: '第22周: 物联网开发', link: '/weekly/2025#第22周-2025-05-26---2025-06-01' },
            { text: '第21周: 游戏开发', link: '/weekly/2025#第21周-2025-05-19---2025-05-25' },
            { text: '第20周: DevOps实践', link: '/weekly/2025#第20周-2025-05-12---2025-05-18' },
            { text: '第19周: 开源社区', link: '/weekly/2025#第19周-2025-05-05---2025-05-11' },
            { text: '第18周: 编程语言', link: '/weekly/2025#第18周-2025-04-28---2025-05-04' },
            { text: '第17周: 技术管理', link: '/weekly/2025#第17周-2025-04-21---2025-04-27' },
            { text: '第16周: 性能优化', link: '/weekly/2025#第16周-2025-04-14---2025-04-20' },
            { text: '第15周: 测试策略', link: '/weekly/2025#第15周-2025-04-07---2025-04-13' },
            { text: '第14周: 架构设计', link: '/weekly/2025#第14周-2025-03-31---2025-04-06' },
            { text: '第13周: 云计算', link: '/weekly/2025#第13周-2025-03-24---2025-03-30' },
            { text: '第12周: 人工智能', link: '/weekly/2025#第12周-2025-03-17---2025-03-23' },
            { text: '第11周: 数据库', link: '/weekly/2025#第11周-2025-03-10---2025-03-16' },
            { text: '第10周: API开发', link: '/weekly/2025#第10周-2025-03-03---2025-03-09' },
            { text: '第9周: 前端技术', link: '/weekly/2025#第9周-2025-02-24---2025-03-02' },
            { text: '第8周: 移动开发', link: '/weekly/2025#第8周-2025-02-17---2025-02-23' },
            { text: '第7周: 微服务', link: '/weekly/2025#第7周-2025-02-10---2025-02-16' },
            { text: '第6周: 容器技术', link: '/weekly/2025#第6周-2025-02-03---2025-02-09' },
            { text: '第5周: 大数据', link: '/weekly/2025#第5周-2025-01-27---2025-02-02' },
            { text: '第4周: 机器学习', link: '/weekly/2025#第4周-2025-01-20---2025-01-26' },
            { text: '第3周: 网络安全', link: '/weekly/2025#第3周-2025-01-13---2025-01-19' },
            { text: '第2周: 区块链', link: '/weekly/2025#第2周-2025-01-06---2025-01-12' },
            { text: '第1周: 新年技术展望', link: '/weekly/2025#第1周-2025-01-01---2025-01-05' },
            { text: '如何阅读周刊', link: '/weekly/2025#如何阅读周刊' },
            { text: '相关资源', link: '/weekly/2025#相关资源' },
            { text: '下一步', link: '/weekly/2025#下一步' }
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
            { text: '深圳市智能硬件协会', link: '/guide/career/associations/shenzhen-smart-hardware' },
            { text: '深圳市智能终端产业协会', link: '/guide/career/associations/shenzhen-smart-terminal' },
            { text: '深圳市信息服务业区块链协会', link: '/guide/career/associations/shenzhen-blockchain' },
            { text: '深圳市金融区块链发展促进会', link: '/guide/career/associations/shenzhen-fisco' },
            { text: '深圳市物联网产业协会', link: '/guide/career/associations/shenzhen-iot' },
            { text: '深圳市智能制造产业促进会', link: '/guide/career/associations/shenzhen-smart-manufacturing' },
            { text: '深圳市智慧医疗协会', link: '/guide/career/associations/shenzhen-smart-health' },
            { text: '深圳市信息技术应用创新联盟', link: '/guide/career/associations/shenzhen-xinchuang' },
            { text: '深圳市鲲鹏产业联盟', link: '/guide/career/associations/shenzhen-kunpeng' },
            { text: '中国计算机学会深圳分部', link: '/guide/career/associations/shenzhen-ccf' },
            { text: '国际人工智能产业联盟深圳中心', link: '/guide/career/associations/shenzhen-international-ai' }
          ]
        }
      ],
      '/guide/career/shenzhen-associations': false,
      '/guide/career/companies/': [
        {
          text: '优质企业资源',
          items: [
            { text: '企业概览', link: '/guide/career/companies/' },
            { text: '云天励飞', link: '/guide/career/companies/yunshan-lifly' },
            { text: '云豹智能', link: '/guide/career/companies/cloud-leopard' },
            { text: '奥比中光', link: '/guide/career/companies/orbbec' },
            { text: '元象科技', link: '/guide/career/companies/yuanxiang-tech' },
            { text: '实在智能', link: '/guide/career/companies/shizai-intelligent' },
            { text: '极视角', link: '/guide/career/companies/extreme-vision' },
            { text: '优必选', link: '/guide/career/companies/ubtech' },
            { text: '力维智联', link: '/guide/career/companies/levi-intelligent' },
            { text: '商汤科技', link: '/guide/career/companies/sense-time' },
            { text: '微众银行', link: '/guide/career/companies/webank' },
            { text: '腾讯金融科技', link: '/guide/career/companies/tencent-fintech' },
            { text: '平安科技', link: '/guide/career/companies/pingan-tech' },
            { text: '金证科技', link: '/guide/career/companies/jinzheng-tech' },
            { text: '招银云创', link: '/guide/career/companies/cmb-cloud' },
            { text: '集友科创', link: '/guide/career/companies/jiyou-tech' },
            { text: '华为技术', link: '/guide/career/companies/huawei' },
            { text: '中兴通讯', link: '/guide/career/companies/zte' },
            { text: 'TCL', link: '/guide/career/companies/tcl' },
            { text: '创维', link: '/guide/career/companies/skyworth' },
            { text: '康佳', link: '/guide/career/companies/konka' },
            { text: '华勤控股', link: '/guide/career/companies/huaqin' },
            { text: '闻泰科技', link: '/guide/career/companies/wingtech' },
            { text: '广和通', link: '/guide/career/companies/fibocom' },
            { text: '富士康', link: '/guide/career/companies/foxconn' },
            { text: '正威集团', link: '/guide/career/companies/amer' },
            { text: '华珑国际', link: '/guide/career/companies/hualong' },
            { text: '迈瑞医疗', link: '/guide/career/companies/mindray' },
            { text: '卫盈联信息技术', link: '/guide/career/companies/weiyinlian' },
            { text: '中电科新型智慧城市研究院', link: '/guide/career/companies/cetc-smart-city' }
          ]
        }
      ],
      '/guide/career/top-companies': false,
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