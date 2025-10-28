---
layout: page
sidebar: false
---

<div class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">优质企业名录</h1>
    <p class="hero-subtitle">基于深圳软件技术协会资源的科技企业对接指南</p>
    <p class="hero-description">整合深圳地区优质科技企业资源，涵盖AI、金融科技、智能硬件、智慧医疗等新质生产力赛道，助力开发者寻找职业机会、技术合作与投资对接。</p>
  </div>
</div>

<div class="search-section">
  <div class="search-container">
    <div class="search-bar">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="搜索企业..." id="searchInput">
    </div>
  </div>
  
  <!-- 标签过滤器 -->
  
  <div class="filter-section" id="filterSection">
    <!-- 过滤器将通过JavaScript动态生成 -->
  </div>
</div>

<div class="content-section">
  <div class="section-header">
    <h2 class="section-title">所有企业资源</h2>
    <div class="section-count">
      <span class="count-badge" id="companyCount">0</span>
    </div>
  </div>

  <div class="associations-gallery" id="associationsGallery">
    <!-- 企业卡片将通过JavaScript动态生成 -->
  </div>
</div>

<script setup>
// 使用Vue的客户端组件来处理搜索和过滤功能
import { onMounted } from 'vue'

// 企业数据配置
const companiesData = [
  {
    id: 'yunshan-lifly',
    name: '云天励飞',
    website: 'https://www.intellifly.com',
    description: '专注于边缘AI芯片研发的高科技企业，自主研发DeepEdge10 Max芯片，采用GPNPU架构融合GPU与NPU特性。',
    highlight: '边缘AI芯片领先企业，GPNPU架构，智能安防+智慧城市',
    searchKeywords: '云天励飞 AI芯片 DeepEdge10 Max 边缘AI 独角兽 GPNPU 智能安防',
    tags: ['独角兽', '人工智能', '芯片设计', '深圳'],
    articlePath: '/guide/career/companies/yunshan-lifly'
  },
  {
    id: 'cloud-leopard',
    name: '云豹智能',
    website: 'https://www.cloudleopard.com',
    description: '国内DPU芯片领域唯一独角兽企业，专注于高性能数据处理芯片研发，仅用4年成长为行业龙头。',
    highlight: '国内DPU领域唯一独角兽，4年成长为行业龙头',
    searchKeywords: '云豹智能 DPU芯片 独角兽 集成电路 数据中心 云计算',
    tags: ['独角兽', '人工智能', '芯片设计', '深圳'],
    articlePath: '/guide/career/companies/cloud-leopard'
  },
  {
    id: 'orbbec',
    name: '奥比中光',
    website: 'https://www.orbbec.com',
    description: '3D视觉感知技术领导者，深度相机和AI视觉算法。',
    highlight: '3D感知技术领导者，深度相机和AI视觉算法',
    searchKeywords: '奥比中光 3D视觉 深度相机 AI视觉算法',
    tags: ['上市', '人工智能', '智能硬件'],
    articlePath: '/guide/career/companies/orbbec'
  },
  {
    id: 'yuanxiang-tech',
    name: '元象科技',
    website: 'https://www.yuanxiang.com',
    description: '连续3年入选胡润全球独角兽榜，AI+3D融合技术。',
    highlight: '连续3年胡润独角兽榜，AI+3D融合技术',
    searchKeywords: '元象科技 AI+3D 胡润独角兽榜 融合技术',
    tags: ['独角兽', '人工智能', '算法研发', '深圳'],
    articlePath: '/guide/career/companies/yuanxiang-tech'
  },
  {
    id: 'shizai-intelligent',
    name: '实在智能',
    website: 'https://www.shizai.com',
    description: '国家级专精特新小巨人企业，AI准独角兽企业。',
    highlight: '国家级专精特新小巨人，AI准独角兽企业',
    searchKeywords: '实在智能 专精特新 小巨人 AI准独角兽',
    tags: ['小巨人', '人工智能', '算法研发', '深圳'],
    articlePath: '/guide/career/companies/shizai-intelligent'
  },
  {
    id: 'extreme-vision',
    name: '极视角',
    website: 'https://www.extremevision.com',
    description: '计算机视觉算法平台，AI视觉解决方案。',
    highlight: '计算机视觉算法平台，AI视觉解决方案',
    searchKeywords: '极视角 计算机视觉 AI视觉解决方案',
    tags: ['专精特新', '人工智能', '算法研发', '深圳'],
    articlePath: '/guide/career/companies/extreme-vision'
  },
  {
    id: 'ubtech',
    name: '优必选',
    website: 'https://www.ubtrobot.com',
    description: '智能机器人技术，全球机器人领先企业。',
    highlight: '全球机器人领先企业，人形机器人技术',
    searchKeywords: '优必选 智能机器人 人形机器人 全球领先',
    tags: ['独角兽', '人工智能', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/ubtech'
  },
  {
    id: 'levi-intelligent',
    name: '力维智联',
    website: 'https://www.levi.com',
    description: '智慧城市AI解决方案提供商。',
    highlight: '智慧城市AI解决方案提供商',
    searchKeywords: '力维智联 智慧城市 AI解决方案',
    tags: ['专精特新', '人工智能', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/levi-intelligent'
  },
  {
    id: 'sense-time',
    name: '商汤科技',
    website: 'https://www.sensetime.com',
    description: '计算机视觉和深度学习技术，AI视觉领域独角兽。',
    highlight: '计算机视觉和深度学习技术，AI视觉独角兽',
    searchKeywords: '商汤科技 计算机视觉 深度学习 独角兽',
    tags: ['独角兽', '人工智能', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/sense-time'
  },
  {
    id: 'webank',
    name: '微众银行',
    website: 'https://www.webank.com',
    description: '中国首家互联网银行，数字银行领域排名第一，自主研发FISCO BCOS区块链平台，构建全分布式银行系统。',
    highlight: '数字银行第一，FISCO BCOS平台，服务3亿+用户',
    searchKeywords: '微众银行 数字银行 FISCO BCOS 区块链 全分布式银行 微粒贷',
    tags: ['上市', '金融科技', '数字货币', '深圳'],
    articlePath: '/guide/career/companies/webank'
  },
  {
    id: 'tencent-fintech',
    name: '腾讯金融科技',
    website: 'https://www.tencent.com',
    description: '支付领域排名第二，金融科技生态。',
    highlight: '支付领域第二，金融科技生态',
    searchKeywords: '腾讯金融科技 支付 金融科技生态',
    tags: ['上市', '金融科技', '支付', '深圳'],
    articlePath: '/guide/career/companies/tencent-fintech'
  },
  {
    id: 'pingan-tech',
    name: '平安科技',
    website: 'https://tech.pingan.com',
    description: '保险科技领域排名第一，金融+AI生态联盟。',
    highlight: '保险科技第一，金融+AI生态联盟',
    searchKeywords: '平安科技 保险科技 金融+AI 生态联盟',
    tags: ['上市', '金融科技', '保险科技', '深圳'],
    articlePath: '/guide/career/companies/pingan-tech'
  },
  {
    id: 'jinzheng-tech',
    name: '金证科技',
    website: 'https://www.jinzheng.com',
    description: '金融IT解决方案提供商。',
    highlight: '金融IT解决方案提供商',
    searchKeywords: '金证科技 金融IT 解决方案',
    tags: ['上市', '金融科技', '区块链', '深圳'],
    articlePath: '/guide/career/companies/jinzheng-tech'
  },
  {
    id: 'cmb-cloud',
    name: '招银云创',
    website: 'https://www.cmbcloud.com',
    description: '招商银行科技子公司。',
    highlight: '招商银行科技子公司',
    searchKeywords: '招银云创 招商银行 科技子公司',
    tags: ['专精特新', '金融科技', '区块链', '深圳'],
    articlePath: '/guide/career/companies/cmb-cloud'
  },
  {
    id: 'jiyou-tech',
    name: '集友科创',
    website: 'https://www.jiyou.com',
    description: '金融科技创新企业。',
    highlight: '金融科技创新企业',
    searchKeywords: '集友科创 金融科技 创新企业',
    tags: ['专精特新', '金融科技', '智能金融', '深圳'],
    articlePath: '/guide/career/companies/jiyou-tech'
  },
  {
    id: 'huawei',
    name: '华为技术',
    website: 'https://www.huawei.com',
    description: '全球领先的ICT解决方案供应商，5G技术全球领先，拥有鸿蒙分布式操作系统和昇腾AI计算平台。',
    highlight: '全球通信设备巨头，5G技术全球领先，年研发投入超千亿',
    searchKeywords: '华为技术 通信设备 5G技术 全球领先 鸿蒙系统 昇腾AI',
    tags: ['上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/huawei'
  },
  {
    id: 'zte',
    name: '中兴通讯',
    website: 'https://www.zte.com.cn',
    description: '5G技术领先，通信设备制造。',
    highlight: '5G技术领先，通信设备制造',
    searchKeywords: '中兴通讯 5G技术 通信设备 制造',
    tags: ['上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/zte'
  },
  {
    id: 'tcl',
    name: 'TCL',
    website: 'https://www.tcl.com',
    description: '消费电子制造，智能家电。',
    highlight: '消费电子制造，智能家电',
    searchKeywords: 'TCL 消费电子 智能家电 制造',
    tags: ['上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/tcl'
  },
  {
    id: 'skyworth',
    name: '创维',
    website: 'https://www.skyworth.com',
    description: '智能家电，显示技术。',
    highlight: '智能家电，显示技术',
    searchKeywords: '创维 智能家电 显示技术',
    tags: ['上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/skyworth'
  },
  {
    id: 'konka',
    name: '康佳',
    website: 'https://www.konka.com',
    description: '电子制造，智能终端。',
    highlight: '电子制造，智能终端',
    searchKeywords: '康佳 电子制造 智能终端',
    tags: ['上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/konka'
  },
  {
    id: 'huaqin',
    name: '华勤控股',
    website: 'https://www.huaqin.com',
    description: 'ODM/OEM厂商，智能终端制造。',
    highlight: 'ODM/OEM厂商，智能终端制造',
    searchKeywords: '华勤控股 ODM OEM 智能终端',
    tags: ['上市', '智能硬件', '智能穿戴', '深圳'],
    articlePath: '/guide/career/companies/huaqin'
  },
  {
    id: 'wingtech',
    name: '闻泰科技',
    website: 'https://www.wingtech.com',
    description: '智能终端制造。',
    highlight: '智能终端制造',
    searchKeywords: '闻泰科技 智能终端 制造',
    tags: ['上市', '智能硬件', '智能穿戴', '深圳'],
    articlePath: '/guide/career/companies/wingtech'
  },
  {
    id: 'fibocom',
    name: '广和通',
    website: 'https://www.fibocom.com',
    description: '无线通信模块供应商。',
    highlight: '无线通信模块供应商',
    searchKeywords: '广和通 无线通信 模块供应商',
    tags: ['上市', '智能硬件', '智能穿戴', '深圳'],
    articlePath: '/guide/career/companies/fibocom'
  },
  {
    id: 'foxconn',
    name: '富士康',
    website: 'https://www.foxconn.com',
    description: '制造服务商，全球代工巨头。',
    highlight: '制造服务商，全球代工巨头',
    searchKeywords: '富士康 制造服务 代工',
    tags: ['上市', '智能硬件', '核心器件', '深圳'],
    articlePath: '/guide/career/companies/foxconn'
  },
  {
    id: 'amer',
    name: '正威集团',
    website: 'https://www.amer.com',
    description: '制造服务商，金属加工。',
    highlight: '制造服务商，金属加工',
    searchKeywords: '正威集团 制造服务 金属加工',
    tags: ['上市', '智能硬件', '核心器件', '深圳'],
    articlePath: '/guide/career/companies/amer'
  },
  {
    id: 'hualong',
    name: '华珑国际',
    website: 'https://www.hualong.com',
    description: '制造服务商。',
    highlight: '制造服务商',
    searchKeywords: '华珑国际 制造服务',
    tags: ['专精特新', '智能硬件', '核心器件', '深圳'],
    articlePath: '/guide/career/companies/hualong'
  },
  {
    id: 'mindray',
    name: '迈瑞医疗',
    website: 'https://www.mindray.com',
    description: '中国"医械一哥"，全球领先医疗器械企业，2023年营业收入接近350亿元，与腾讯联合开发"启元重症大模型"。',
    highlight: '中国医械一哥，2023年营收350亿元，AI血细胞识别准确率97%+',
    searchKeywords: '迈瑞医疗 医械一哥 医疗器械 AI医疗 启元重症大模型 350亿营收',
    tags: ['上市', '智慧医疗', '医疗设备', '深圳'],
    articlePath: '/guide/career/companies/mindray'
  },
  {
    id: 'weiyinlian',
    name: '卫盈联信息技术',
    website: 'https://www.weiyinlian.com',
    description: '医疗信息化解决方案提供商。',
    highlight: '医疗信息化解决方案提供商',
    searchKeywords: '卫盈联信息技术 医疗信息化 解决方案',
    tags: ['专精特新', '智慧医疗', '智慧服务', '深圳'],
    articlePath: '/guide/career/companies/weiyinlian'
  },
  {
    id: 'cetc-smart-city',
    name: '中电科新型智慧城市研究院',
    website: 'https://www.cetc-smartcity.com',
    description: '智慧城市医疗应用。',
    highlight: '智慧城市医疗应用',
    searchKeywords: '中电科新型智慧城市研究院 智慧城市 医疗应用',
    tags: ['专精特新', '智慧医疗', '智慧服务', '深圳'],
    articlePath: '/guide/career/companies/cetc-smart-city'
  }
]

// 生成企业卡片的HTML
function generateCompanyCard(company) {
  const tagClass = getTagClass(company.tags[0])
  const cityTag = company.tags.includes('深圳') ? '<span class="tag city">深圳</span>' : ''
  
  return `
  <div class="association-card clickable-card" data-search="${company.searchKeywords}" data-article="${company.articlePath}">
    <div class="card-header">
      <div class="card-title">${company.name}</div>
      <div class="card-action">
        <button class="install-btn" onclick="event.stopPropagation(); window.open('${company.website}', '_blank');">
          访问官网
          <i class="fas fa-external-link-alt"></i>
        </button>
      </div>
    </div>
    <div class="card-content">
      <p class="card-description">${company.description}</p>
      <div class="card-meta">
        <span class="meta-highlight">${company.highlight}</span>
      </div>
      <div class="card-tags">
        <span class="tag ${tagClass}">${company.tags[0]}</span>
        ${company.tags.slice(1).map(tag => `<span class="tag">${tag}</span>`).join('')}
        ${cityTag}
      </div>
    </div>
  </div>`
}

// 获取标签样式类
function getTagClass(tag) {
  const tagClassMap = {
    '独角兽': 'premium',
    '上市': 'standard',
    '专精特新': 'standard',
    '小巨人': 'standard'
  }
  return tagClassMap[tag] || ''
}

onMounted(() => {
  const searchInput = document.getElementById('searchInput')
  const countBadge = document.getElementById('companyCount')
  const associationsGallery = document.getElementById('associationsGallery')
  const filterSection = document.getElementById('filterSection')
  
  let currentSearchTerm = ''
  let activeFilters = {
    nature: 'all',
    industry: 'all', 
    level: 'all',
    city: 'all'
  }
  
  // 渲染企业卡片
  function renderCompanies() {
    associationsGallery.innerHTML = companiesData.map(company => generateCompanyCard(company)).join('')
    updateCount()
    setupCardListeners()
  }
  
  // 动态创建过滤器
  function createFilterSection() {
    const filterGroups = [
      {
        title: '企业类型',
        type: 'nature',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '独角兽', text: '独角兽' },
          { value: '上市', text: '上市' },
          { value: '专精特新', text: '专精特新' },
          { value: '小巨人', text: '小巨人' }
        ]
      },
      {
        title: '行业分类',
        type: 'industry',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '人工智能', text: '人工智能' },
          { value: '金融科技', text: '金融科技' },
          { value: '智能硬件', text: '智能硬件' },
          { value: '智慧医疗', text: '智慧医疗' }
        ]
      },
      {
        title: '细分领域',
        type: 'level',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '芯片设计', text: '芯片设计' },
          { value: '算法研发', text: '算法研发' },
          { value: '应用开发', text: '应用开发' },
          { value: '数字货币', text: '数字货币' },
          { value: '支付', text: '支付' },
          { value: '保险科技', text: '保险科技' },
          { value: '区块链', text: '区块链' },
          { value: '智能金融', text: '智能金融' },
          { value: '消费电子', text: '消费电子' },
          { value: '智能穿戴', text: '智能穿戴' },
          { value: '核心器件', text: '核心器件' },
          { value: '医疗设备', text: '医疗设备' },
          { value: '智慧服务', text: '智慧服务' }
        ]
      },
      {
        title: '城市分布',
        type: 'city',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '深圳', text: '深圳' }
        ]
      }
    ]
    
    filterSection.innerHTML = filterGroups.map(group => `
      <div class="filter-group">
        <h3 class="filter-title">${group.title}</h3>
        <div class="filter-tags">
          ${group.filters.map(filter => `
            <button class="filter-tag ${filter.active ? 'active' : ''}" data-filter="${filter.value}" data-type="${group.type}">
              ${filter.text}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('')
  }
  
  function updateCount() {
    const visibleCards = document.querySelectorAll('.association-card:not([style*="display: none"])')
    if (countBadge) {
      countBadge.textContent = visibleCards.length
    }
  }
  
  function filterCards(searchTerm = '', filterType = '', filterValue = '') {
    currentSearchTerm = searchTerm.toLowerCase().trim()
    
    // 更新活动过滤器
    if (filterType && filterValue) {
      activeFilters[filterType] = filterValue
    }
    
    const associationCards = document.querySelectorAll('.association-card')
    associationCards.forEach(card => {
      const searchData = card.getAttribute('data-search')?.toLowerCase() || ''
      const cardTitle = card.querySelector('.card-title')?.textContent?.toLowerCase() || ''
      const cardDescription = card.querySelector('.card-description')?.textContent?.toLowerCase() || ''
      
      // 搜索匹配
      const searchMatches = currentSearchTerm === '' || 
                           searchData.includes(currentSearchTerm) || 
                           cardTitle.includes(currentSearchTerm) || 
                           cardDescription.includes(currentSearchTerm)
      
      // 标签过滤匹配
      const cardTags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.trim())
      
      const natureMatches = activeFilters.nature === 'all' || cardTags.includes(activeFilters.nature)
      const industryMatches = activeFilters.industry === 'all' || cardTags.includes(activeFilters.industry)
      const levelMatches = activeFilters.level === 'all' || cardTags.includes(activeFilters.level)
      const cityMatches = activeFilters.city === 'all' || cardTags.includes(activeFilters.city)
      
      // 同时满足搜索和所有过滤条件
      if (searchMatches && natureMatches && industryMatches && levelMatches && cityMatches) {
        card.style.display = 'block'
      } else {
        card.style.display = 'none'
      }
    })
    
    updateCount()
  }
  
  // 处理卡片点击事件
  function handleCardClick(event) {
    const card = event.currentTarget
    const articlePath = card.getAttribute('data-article')
    
    if (articlePath) {
      // 使用VitePress的路由导航
      window.location.href = articlePath
    }
  }
  
  // 处理标签过滤点击事件
  function handleFilterClick(event) {
    event.stopPropagation() // 防止事件冒泡
    const clickedTag = event.currentTarget
    const filter = clickedTag.getAttribute('data-filter')
    const filterType = clickedTag.getAttribute('data-type')
    const filterGroup = clickedTag.closest('.filter-group')
    
    // 更新活动状态 - 只更新同一组内的标签
    if (filterGroup) {
      const groupTags = filterGroup.querySelectorAll('.filter-tag')
      groupTags.forEach(tag => tag.classList.remove('active'))
    }
    clickedTag.classList.add('active')
    
    // 执行过滤
    filterCards(currentSearchTerm, filterType, filter)
  }
  
  // 处理协会卡片标签点击事件
  function handleCardTagClick(event) {
    event.stopPropagation() // 防止触发卡片点击事件
    const clickedTag = event.currentTarget
    const tagText = clickedTag.textContent.trim()
    
    // 确定过滤器类型
    let filterType = ''
    let filterValue = tagText
    
    if (['独角兽', '上市', '专精特新', '小巨人'].includes(tagText)) {
      filterType = 'nature'
    } else if (['人工智能', '金融科技', '智能硬件', '智慧医疗'].includes(tagText)) {
      filterType = 'industry'
    } else if (['芯片设计', '算法研发', '应用开发', '数字货币', '支付', '保险科技', '区块链', '智能金融', '消费电子', '智能穿戴', '核心器件', '医疗设备', '智慧服务'].includes(tagText)) {
      filterType = 'level'
    } else if (['深圳'].includes(tagText)) {
      filterType = 'city'
    }
    
    if (filterType) {
      // 更新过滤器按钮状态
      updateFilterButtonState(filterType, filterValue)
      
      // 执行过滤
      filterCards(currentSearchTerm, filterType, filterValue)
    }
  }
  
  // 更新过滤器按钮状态
  function updateFilterButtonState(filterType, filterValue) {
    // 重置所有过滤器组
    const filterGroups = document.querySelectorAll('.filter-group')
    filterGroups.forEach(group => {
      const groupTags = group.querySelectorAll('.filter-tag')
      groupTags.forEach(tag => tag.classList.remove('active'))
      
      // 激活对应的过滤器按钮
      const targetTag = group.querySelector(`[data-filter="${filterValue}"][data-type="${filterType}"]`)
      if (targetTag) {
        targetTag.classList.add('active')
      } else {
        // 如果没有找到对应的按钮，激活"全部"按钮
        const allTag = group.querySelector('[data-filter="all"]')
        if (allTag) {
          allTag.classList.add('active')
        }
      }
    })
  }
  
  // 为所有过滤标签添加点击事件监听器
  function setupFilterListeners() {
    const filterTags = document.querySelectorAll('.filter-tag')
    filterTags.forEach(tag => {
      tag.addEventListener('click', handleFilterClick)
    })
  }
  
  // 为所有可点击卡片添加点击事件监听器
  function setupCardListeners() {
    const associationCards = document.querySelectorAll('.association-card')
    associationCards.forEach(card => {
      if (card.classList.contains('clickable-card')) {
        card.addEventListener('click', handleCardClick)
        
        // 为卡片上的标签添加点击事件监听器
        const cardTags = card.querySelectorAll('.tag')
        cardTags.forEach(tag => {
          tag.addEventListener('click', handleCardTagClick)
        })
      }
    })
  }
  
  // 监听搜索输入
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterCards(this.value)
    })
  }
  
  // 初始化
  renderCompanies()
  createFilterSection()
  setupFilterListeners()
})
</script>