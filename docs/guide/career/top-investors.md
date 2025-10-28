---
layout: page
sidebar: false
---

<div class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">投资机构名录</h1>
    <p class="hero-subtitle">专注于互联网科技、新质生产力、科技公司投资的投资机构对接指南</p>
    <p class="hero-description">整合国内外优质投资机构资源，涵盖天使投资、风险投资、产业投资等各阶段投资机构，助力创业者和企业寻找合适的投资伙伴。</p>
  </div>
</div>

<div class="search-section">
  <div class="search-container">
    <div class="search-bar">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="搜索投资机构..." id="searchInput">
    </div>
  </div>
  
  <!-- 标签过滤器 -->
  
  <div class="filter-section" id="filterSection">
    <!-- 过滤器将通过JavaScript动态生成 -->
  </div>
</div>

<div class="content-section">
  <div class="section-header">
    <h2 class="section-title">所有投资机构资源</h2>
    <div class="section-count">
      <span class="count-badge" id="investorCount">0</span>
    </div>
  </div>

  <div class="associations-gallery" id="associationsGallery">
    <!-- 投资机构卡片将通过JavaScript动态生成 -->
  </div>
</div>

<script setup>
// 使用Vue的客户端组件来处理搜索和过滤功能
import { onMounted } from 'vue'

// 投资机构数据配置
const investorsData = [
  {
    id: 'sequoia-china',
    name: '红杉中国',
    website: 'https://www.sequoiacap.com/cn',
    description: '全球顶级风险投资机构，专注于早期和成长期投资，投资领域涵盖科技、医疗、消费等各个行业。',
    highlight: '全球顶级VC，管理资金超3000亿，投资企业超1000家',
    searchKeywords: '红杉中国 风险投资 VC 早期投资 成长期投资',
    tags: ['顶级VC', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/sequoia-china'
  },
  {
    id: 'idg-capital',
    name: 'IDG资本',
    website: 'https://www.idgvc.com',
    description: '中国最早的风险投资机构之一，专注于TMT、医疗健康、先进制造等领域的投资。',
    highlight: '中国最早VC，投资企业超800家，管理资金超1000亿',
    searchKeywords: 'IDG资本 风险投资 VC TMT 医疗健康',
    tags: ['顶级VC', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/idg-capital'
  },
  {
    id: 'matrix-china',
    name: '经纬中国',
    website: 'https://www.matrixpartners.com.cn',
    description: '专注于早期和成长期投资的风险投资机构，重点关注互联网、移动互联网、企业服务等领域。',
    highlight: '早期投资专家，投资企业超600家，成功率行业领先',
    searchKeywords: '经纬中国 早期投资 成长期投资 互联网 企业服务',
    tags: ['顶级VC', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/matrix-china'
  },
  {
    id: 'zhenfund',
    name: '真格基金',
    website: 'https://www.zhenfund.com',
    description: '专注于早期投资的天使基金，由徐小平创立，投资领域涵盖互联网、移动互联网、人工智能等。',
    highlight: '天使投资领导者，投资企业超800家，早期投资专家',
    searchKeywords: '真格基金 天使投资 早期投资 徐小平 互联网',
    tags: ['天使基金', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/zhenfund'
  },
  {
    id: 'sinovation-ventures',
    name: '创新工场',
    website: 'https://www.chuangxin.com',
    description: '李开复创立的早期投资机构，专注于人工智能、移动互联网、企业服务等领域的投资。',
    highlight: 'AI投资专家，李开复创立，投资企业超400家',
    searchKeywords: '创新工场 李开复 人工智能 AI 早期投资',
    tags: ['天使基金', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/sinovation-ventures'
  },
  {
    id: 'tencent-investment',
    name: '腾讯投资',
    website: 'https://invest.tencent.com',
    description: '腾讯战略投资部门，专注于互联网、游戏、金融科技、企业服务等领域的投资。',
    highlight: '腾讯生态投资，管理资金超1000亿，投资企业超1000家',
    searchKeywords: '腾讯投资 战略投资 互联网 游戏 金融科技',
    tags: ['产业投资', '战略投资', '成长期投资', '深圳'],
    articlePath: '/guide/career/investors/tencent-investment'
  },
  {
    id: 'alibaba-investment',
    name: '阿里巴巴投资',
    website: 'https://www.alibabagroup.com',
    description: '阿里巴巴战略投资部门，专注于电商、云计算、金融科技、物流等领域的投资。',
    highlight: '阿里生态投资，管理资金超800亿，投资企业超800家',
    searchKeywords: '阿里巴巴投资 战略投资 电商 云计算 金融科技',
    tags: ['产业投资', '战略投资', '成长期投资', '杭州'],
    articlePath: '/guide/career/investors/alibaba-investment'
  },
  {
    id: 'bytedance-investment',
    name: '字节跳动投资',
    website: 'https://www.bytedance.com',
    description: '字节跳动投资部门，专注于内容、教育、企业服务、人工智能等领域的投资。',
    highlight: '字节生态投资，管理资金超500亿，投资企业超300家',
    searchKeywords: '字节跳动投资 战略投资 内容 教育 人工智能',
    tags: ['产业投资', '战略投资', '成长期投资', '北京'],
    articlePath: '/guide/career/investors/bytedance-investment'
  },
  {
    id: 'meituan-investment',
    name: '美团投资',
    website: 'https://www.meituan.com',
    description: '美团战略投资部门，专注于生活服务、零售、物流、金融科技等领域的投资。',
    highlight: '生活服务投资专家，管理资金超300亿，投资企业超200家',
    searchKeywords: '美团投资 战略投资 生活服务 零售 物流',
    tags: ['产业投资', '战略投资', '成长期投资', '北京'],
    articlePath: '/guide/career/investors/meituan-investment'
  },
  {
    id: 'xiaomi-investment',
    name: '小米投资',
    website: 'https://www.mi.com',
    description: '小米生态链投资部门，专注于智能硬件、物联网、人工智能等领域的投资。',
    highlight: '生态链投资专家，管理资金超200亿，投资企业超400家',
    searchKeywords: '小米投资 生态链投资 智能硬件 物联网 人工智能',
    tags: ['产业投资', '战略投资', '成长期投资', '北京'],
    articlePath: '/guide/career/investors/xiaomi-investment'
  },
  {
    id: 'szvc',
    name: '深创投',
    website: 'https://www.szvc.com.cn',
    description: '深圳市创新投资集团，专注于高新技术、新兴产业、传统产业升级等领域的投资。',
    highlight: '深圳国资投资平台，管理资金超4000亿，投资企业超1500家',
    searchKeywords: '深创投 国资投资 高新技术 新兴产业 传统产业',
    tags: ['国资投资', '风险投资', '成长期投资', '深圳'],
    articlePath: '/guide/career/investors/szvc'
  },
  {
    id: 'fortune-vc',
    name: '达晨创投',
    website: 'https://www.fortunevc.com',
    description: '专注于成长期投资的风险投资机构，重点关注先进制造、医疗健康、TMT等领域。',
    highlight: '成长期投资专家，管理资金超300亿，投资企业超500家',
    searchKeywords: '达晨创投 成长期投资 先进制造 医疗健康 TMT',
    tags: ['专业VC', '风险投资', '成长期投资', '深圳'],
    articlePath: '/guide/career/investors/fortune-vc'
  },
  {
    id: 'co-win-ventures',
    name: '同创伟业',
    website: 'https://www.cowinvc.com',
    description: '专注于科技投资的风险投资机构，重点关注人工智能、生物医药、新能源等领域。',
    highlight: '科技投资专家，管理资金超200亿，投资企业超300家',
    searchKeywords: '同创伟业 科技投资 人工智能 生物医药 新能源',
    tags: ['专业VC', '风险投资', '成长期投资', '深圳'],
    articlePath: '/guide/career/investors/co-win-ventures'
  },
  {
    id: 'songhe-capital',
    name: '松禾资本',
    website: 'https://www.songhecapital.com',
    description: '专注于硬科技投资的风险投资机构，重点关注芯片、新材料、新能源等领域。',
    highlight: '硬科技投资专家，管理资金超150亿，投资企业超200家',
    searchKeywords: '松禾资本 硬科技投资 芯片 新材料 新能源',
    tags: ['专业VC', '风险投资', '成长期投资', '深圳'],
    articlePath: '/guide/career/investors/songhe-capital'
  },
  {
    id: 'china-growth-capital',
    name: '华创资本',
    website: 'https://www.cgcvc.com',
    description: '专注于早期投资的风险投资机构，重点关注企业服务、金融科技、消费升级等领域。',
    highlight: '早期投资专家，管理资金超100亿，投资企业超200家',
    searchKeywords: '华创资本 早期投资 企业服务 金融科技 消费升级',
    tags: ['专业VC', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/china-growth-capital'
  },
  {
    id: 'lightspeed-china',
    name: '光速中国',
    website: 'https://www.lsvp.com',
    description: '专注于早期投资的风险投资机构，重点关注互联网、移动互联网、企业服务等领域。',
    highlight: '早期投资专家，管理资金超50亿，投资企业超100家',
    searchKeywords: '光速中国 早期投资 互联网 移动互联网 企业服务',
    tags: ['专业VC', '风险投资', '早期投资', '上海'],
    articlePath: '/guide/career/investors/lightspeed-china'
  },
  {
    id: 'ggv-capital',
    name: 'GGV纪源资本',
    website: 'https://www.ggvc.com',
    description: '专注于中美市场的风险投资机构，重点关注企业服务、消费、金融科技等领域。',
    highlight: '中美投资专家，管理资金超100亿，投资企业超300家',
    searchKeywords: 'GGV纪源资本 中美投资 企业服务 消费 金融科技',
    tags: ['专业VC', '风险投资', '成长期投资', '上海'],
    articlePath: '/guide/career/investors/ggv-capital'
  },
  {
    id: 'dcm-ventures',
    name: 'DCM中国',
    website: 'https://www.dcm.com',
    description: '专注于早期投资的风险投资机构，重点关注移动互联网、企业服务、金融科技等领域。',
    highlight: '早期投资专家，管理资金超30亿，投资企业超100家',
    searchKeywords: 'DCM中国 早期投资 移动互联网 企业服务 金融科技',
    tags: ['专业VC', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/dcm-ventures'
  },
  {
    id: 'k2-ventures',
    name: 'K2VC',
    website: 'https://www.k2vc.com',
    description: '专注于早期投资的风险投资机构，重点关注人工智能、企业服务、消费升级等领域。',
    highlight: '早期投资专家，管理资金超20亿，投资企业超80家',
    searchKeywords: 'K2VC 早期投资 人工智能 企业服务 消费升级',
    tags: ['专业VC', '风险投资', '早期投资', '北京'],
    articlePath: '/guide/career/investors/k2-ventures'
  },
  {
    id: 'yunqi-partners',
    name: '云启资本',
    website: 'https://www.yunqi.com',
    description: '专注于早期投资的风险投资机构，重点关注人工智能、企业服务、智能制造等领域。',
    highlight: '早期投资专家，管理资金超30亿，投资企业超100家',
    searchKeywords: '云启资本 早期投资 人工智能 企业服务 智能制造',
    tags: ['专业VC', '风险投资', '早期投资', '上海'],
    articlePath: '/guide/career/investors/yunqi-partners'
  }
]

// 生成投资机构卡片的HTML
function generateInvestorCard(investor) {
  const tagClass = getTagClass(investor.tags[0])
  const cityTag = investor.tags.includes('深圳') || investor.tags.includes('北京') || investor.tags.includes('上海') || investor.tags.includes('杭州') ? `<span class="tag city">${investor.tags[3]}</span>` : ''
  
  return `
  <div class="association-card clickable-card" data-search="${investor.searchKeywords}" data-article="${investor.articlePath}">
    <div class="card-header">
      <div class="card-title">${investor.name}</div>
      <div class="card-action">
        <button class="install-btn" onclick="event.stopPropagation(); window.open('${investor.website}', '_blank');">
          访问官网
          <i class="fas fa-external-link-alt"></i>
        </button>
      </div>
    </div>
    <div class="card-content">
      <p class="card-description">${investor.description}</p>
      <div class="card-meta">
        <span class="meta-highlight">${investor.highlight}</span>
      </div>
      <div class="card-tags">
        <span class="tag ${tagClass}">${investor.tags[0]}</span>
        ${investor.tags.slice(1, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
        ${cityTag}
      </div>
    </div>
  </div>`
}

// 获取标签样式类
function getTagClass(tag) {
  const tagClassMap = {
    '顶级VC': 'premium',
    '天使基金': 'premium',
    '产业投资': 'standard',
    '国资投资': 'standard',
    '专业VC': 'standard'
  }
  return tagClassMap[tag] || ''
}

onMounted(() => {
  const searchInput = document.getElementById('searchInput')
  const countBadge = document.getElementById('investorCount')
  const associationsGallery = document.getElementById('associationsGallery')
  const filterSection = document.getElementById('filterSection')
  
  let currentSearchTerm = ''
  let activeFilters = {
    nature: 'all',
    industry: 'all', 
    level: 'all',
    city: 'all'
  }
  
  // 渲染投资机构卡片
  function renderInvestors() {
    associationsGallery.innerHTML = investorsData.map(investor => generateInvestorCard(investor)).join('')
    updateCount()
    setupCardListeners()
  }
  
  // 动态创建过滤器
  function createFilterSection() {
    const filterGroups = [
      {
        title: '机构类型',
        type: 'nature',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '顶级VC', text: '顶级VC' },
          { value: '天使基金', text: '天使基金' },
          { value: '产业投资', text: '产业投资' },
          { value: '国资投资', text: '国资投资' },
          { value: '专业VC', text: '专业VC' }
        ]
      },
      {
        title: '投资领域',
        type: 'industry',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '风险投资', text: '风险投资' },
          { value: '战略投资', text: '战略投资' },
          { value: '早期投资', text: '早期投资' },
          { value: '成长期投资', text: '成长期投资' }
        ]
      },
      {
        title: '投资阶段',
        type: 'level',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '早期投资', text: '早期投资' },
          { value: '成长期投资', text: '成长期投资' },
          { value: '战略投资', text: '战略投资' }
        ]
      },
      {
        title: '城市分布',
        type: 'city',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '北京', text: '北京' },
          { value: '上海', text: '上海' },
          { value: '深圳', text: '深圳' },
          { value: '杭州', text: '杭州' }
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
  
  // 处理投资机构卡片标签点击事件
  function handleCardTagClick(event) {
    event.stopPropagation() // 防止触发卡片点击事件
    const clickedTag = event.currentTarget
    const tagText = clickedTag.textContent.trim()
    
    // 确定过滤器类型
    let filterType = ''
    let filterValue = tagText
    
    if (['顶级VC', '天使基金', '产业投资', '国资投资', '专业VC'].includes(tagText)) {
      filterType = 'nature'
    } else if (['风险投资', '战略投资', '早期投资', '成长期投资'].includes(tagText)) {
      filterType = 'industry'
    } else if (['早期投资', '成长期投资', '战略投资'].includes(tagText)) {
      filterType = 'level'
    } else if (['北京', '上海', '深圳', '杭州'].includes(tagText)) {
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
  renderInvestors()
  createFilterSection()
  setupFilterListeners()
})
</script>
