<template>
  <div class="association-page">
    <!-- 搜索和筛选区域 -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="relative flex-1">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索协会或企业..." 
            class="search-input"
          >
          <i class="fa-solid fa-search search-icon"></i>
        </div>
        
        <button 
          @click="downloadList"
          class="download-btn"
        >
          <i class="fa-solid fa-download mr-2"></i>
          协会名录下载
        </button>
      </div>
      
      <!-- 分类筛选 -->
      <div class="filter-container">
        <button 
          v-for="category in categories"
          :key="category.key"
          @click="setActiveCategory(category.key)"
          :class="[
            'filter-btn',
            activeCategory === category.key ? 'filter-btn-active' : 'filter-btn-inactive'
          ]"
        >
          {{ category.label }}
        </button>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">{{ filteredAssociations.length }}</div>
        <div class="stat-label">优质协会</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">5000+</div>
        <div class="stat-label">会员企业</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">500+</div>
        <div class="stat-label">年度活动</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">8+</div>
        <div class="stat-label">重点赛道</div>
      </div>
    </div>

    <!-- 协会卡片网格 -->
    <div class="associations-grid">
      <div 
        v-for="association in filteredAssociations"
        :key="association.id"
        class="association-card"
      >
        <div class="card-content">
          <div 
            :class="[
              'card-left',
              `card-left-${association.color}`
            ]"
          >
            <div>
              <div class="tags-container">
                <span 
                  v-for="tag in association.tags"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              <h3 class="association-name">{{ association.name }}</h3>
              <p class="association-info">{{ association.established }} · {{ association.level }}</p>
              <div class="info-item">
                <i class="fa-solid fa-building mr-2"></i>
                <span>{{ association.members }}</span>
              </div>
              <div class="info-item">
                <i class="fa-solid fa-map-marker mr-2"></i>
                <span>{{ association.influence }}</span>
              </div>
            </div>
            <div class="website-link">
              <a 
                :href="association.website" 
                target="_blank"
                class="website-link-text"
              >
                访问官网 <i class="fa-solid fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
          
          <div class="card-right">
            <div class="info-grid">
              <div class="info-section">
                <h4 class="info-title">牵头单位</h4>
                <p class="info-text">{{ association.leadership }}</p>
              </div>
              <div class="info-section">
                <h4 class="info-title">活动频率</h4>
                <p class="info-text">{{ association.activity }}</p>
              </div>
              <div class="info-section">
                <h4 class="info-title">政府资源</h4>
                <p class="info-text">{{ association.government }}</p>
              </div>
            </div>
            
            <div class="companies-section">
              <h4 class="info-title">重点会员企业</h4>
              <div class="companies-tags">
                <span 
                  v-for="company in association.companies.slice(0, 5)"
                  :key="company"
                  class="company-tag"
                >
                  {{ company }}
                </span>
                <span 
                  v-if="association.companies.length > 5"
                  class="company-tag"
                >
                  ... 查看全部
                </span>
              </div>
            </div>
            
            <div class="tracks-section">
              <h4 class="info-title">覆盖赛道</h4>
              <div class="tracks-tags">
                <span 
                  v-for="track in association.tracks"
                  :key="track"
                  :class="[
                    'track-tag',
                    `track-tag-${association.color}`
                  ]"
                >
                  {{ track }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多按钮 -->
    <div class="load-more-container">
      <button 
        @click="loadMore"
        class="load-more-btn"
      >
        <i class="fa-solid fa-refresh mr-2"></i>
        加载更多协会
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 响应式数据
const searchQuery = ref('')
const activeCategory = ref('all')

// 分类选项
const categories = [
  { key: 'all', label: '全部协会' },
  { key: 'ai', label: '人工智能' },
  { key: 'fintech', label: '金融科技' },
  { key: 'hardware', label: '智能硬件' },
  { key: 'healthcare', label: '智慧医疗' },
  { key: 'official', label: '官方背景' },
  { key: 'national', label: '全国性协会分支' }
]

// 协会数据
const associations = ref([
  {
    id: 1,
    name: '深圳市软件行业协会',
    established: '成立于1988年',
    level: '5A级协会',
    members: '近4000家会员企业',
    influence: '影响力：深圳全市',
    color: 'primary',
    tags: ['官方背景', '全领域'],
    leadership: '深圳市科技局指导，无单一牵头企业',
    activity: '每月4-6场专业活动，年度峰会1场',
    government: '参与制定深圳软件产业政策，承接政府调研项目',
    companies: ['腾讯科技', '华为终端', '金蝶软件', '大族激光', '云天励飞'],
    tracks: ['基础软件', '人工智能', '金融科技', '智能硬件'],
    website: 'http://www.ssia.org.cn/'
  },
  {
    id: 2,
    name: '深圳市人工智能产业协会',
    established: '成立于2019年',
    level: '快速成长协会',
    members: '1132+家会员企业',
    influence: '影响力：粤港澳大湾区',
    color: 'ai',
    tags: ['非官方', 'AI领域'],
    leadership: '腾讯AI Lab、大疆创新、商汤科技联合发起',
    activity: '每月6-8场技术沙龙，季度峰会，年度博览会',
    government: '参与深圳AI产业规划，获科创委重点扶持',
    companies: ['腾讯AI Lab', '大疆创新', '商汤科技', '云豹智能', '元象科技'],
    tracks: ['通用人工智能', 'AI芯片', '计算机视觉', '自然语言处理', '机器人'],
    website: 'https://www.szaicx.com/'
  },
  {
    id: 3,
    name: '深圳市金融科技协会',
    established: '成立于2005年',
    level: '行业标杆协会',
    members: '174家核心会员企业',
    influence: '影响力：全国金融科技领域',
    color: 'fintech',
    tags: ['非官方', '金融科技'],
    leadership: '深圳证券交易所、中国平安、微众银行',
    activity: '每月3-4场专业论坛，年度峰会影响力大',
    government: '与央行数字货币研究所、深圳金融局深度合作',
    companies: ['微众银行', '平安科技', '深交所', '国信证券', '腾讯金融科技'],
    tracks: ['区块链', '数字货币', '智能投顾', '风控技术'],
    website: 'https://www.szifa.org.cn/'
  },
  {
    id: 4,
    name: '深圳市智能终端产业协会',
    established: '成立于2016年',
    level: '产业联盟性质',
    members: '300+家会员企业',
    influence: '影响力：全球智能终端领域',
    color: 'hardware',
    tags: ['非官方', '智能硬件'],
    leadership: '华为、中兴、康佳、创维、惠科等联合发起',
    activity: '每季度2-3场产业论坛，年度全球峰会',
    government: '承接工信部、深圳市工信局多项产业研究项目',
    companies: ['华为技术', '中兴通讯', '大疆创新', '创维-RGB', '欣旺达'],
    tracks: ['智能终端', '物联网', '智能穿戴', '工业软件'],
    website: 'http://www.szita.cn/'
  },
  {
    id: 5,
    name: '深圳市智慧医疗协会',
    established: '成立于2018年',
    level: '跨界融合协会',
    members: '200+家会员单位',
    influence: '影响力：粤港澳大湾区医疗科技领域',
    color: 'healthcare',
    tags: ['非官方', '智慧医疗'],
    leadership: '东方汇富投资控股，联合50家医疗单位',
    activity: '每季度2-3场专题论坛，年度创新大赛',
    government: '与深圳市卫健委、科创委有深度合作',
    companies: ['迈瑞医疗', '联影医疗', '腾讯健康', '平安好医生', '华大基因'],
    tracks: ['医疗AI', '远程医疗', '医疗大数据', '智能医疗设备'],
    website: '#'
  },
  {
    id: 6,
    name: '中国计算机学会深圳分部',
    established: '成立于2012年',
    level: '首个城市分部',
    members: '800+个人会员，200+企业会员',
    influence: '影响力：全国计算机领域',
    color: 'secondary',
    tags: ['全国性分支', '全领域'],
    leadership: '中国计算机学会总部，深圳清华大学研究院',
    activity: '每周技术讲座，月度学术沙龙，年度学术会议',
    government: '与科技部、教育部及深圳科创委紧密合作',
    companies: ['华为', '腾讯', '大疆', '深信服', '南方科技大学'],
    tracks: ['计算机科学', '人工智能', '软件工程', '云计算', '大数据'],
    website: 'https://www.ccf.org.cn/'
  }
])

// 计算属性：筛选后的协会列表
const filteredAssociations = computed(() => {
  let filtered = associations.value

  // 按分类筛选
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(association => {
      if (activeCategory.value === 'official') {
        return association.tags.includes('官方背景')
      } else if (activeCategory.value === 'national') {
        return association.tags.includes('全国性分支')
      } else {
        return association.tags.some(tag => 
          tag.toLowerCase().includes(activeCategory.value) ||
          association.tracks.some(track => 
            track.toLowerCase().includes(activeCategory.value)
          )
        )
      }
    })
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(association => 
      association.name.toLowerCase().includes(query) ||
      association.companies.some(company => 
        company.toLowerCase().includes(query)
      ) ||
      association.tracks.some(track => 
        track.toLowerCase().includes(query)
      )
    )
  }

  return filtered
})

// 方法
const setActiveCategory = (category: string) => {
  activeCategory.value = category
}

const downloadList = () => {
  // 实现下载功能
  console.log('下载协会名录')
}

const loadMore = () => {
  // 实现加载更多功能
  console.log('加载更多协会')
}
</script>

<style scoped>
.association-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* 搜索和筛选区域 */
.search-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.download-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.download-btn:hover {
  background-color: rgba(37, 99, 235, 0.9);
}

.filter-container {
  display: flex;
  overflow-x: auto;
  padding: 0.75rem 0;
  gap: 0.5rem;
}

.filter-btn {
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.filter-btn-active {
  background-color: #2563eb;
  color: white;
}

.filter-btn-inactive {
  background-color: white;
  color: #6b7280;
}

.filter-btn-inactive:hover {
  background-color: #f3f4f6;
}

/* 统计信息 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* 协会卡片 */
.associations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.association-card {
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.association-card:hover {
  transform: translateY(-4px);
}

.card-content {
  display: flex;
  min-height: 300px;
}

.card-left {
  flex: 1;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-left-primary {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.card-left-ai {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.card-left-fintech {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.card-left-hardware {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.card-left-healthcare {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.card-left-secondary {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
}

.card-right {
  flex: 2;
  padding: 1.5rem;
}

.tags-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.association-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.association-info {
  opacity: 0.9;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
}

.website-link {
  margin-top: 1.5rem;
}

.website-link-text {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.website-link-text:hover {
  text-decoration: underline;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-section {
  margin-bottom: 1rem;
}

.info-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.info-text {
  font-size: 0.875rem;
  color: #374151;
}

.companies-section {
  margin-bottom: 1rem;
}

.companies-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.company-tag {
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.tracks-section {
  margin-bottom: 1rem;
}

.tracks-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.track-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.track-tag-primary {
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.track-tag-ai {
  background-color: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.track-tag-fintech {
  background-color: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.track-tag-hardware {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.track-tag-healthcare {
  background-color: rgba(236, 72, 153, 0.1);
  color: #ec4899;
}

.track-tag-secondary {
  background-color: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}

/* 加载更多按钮 */
.load-more-container {
  text-align: center;
  padding: 2rem 0;
}

.load-more-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.load-more-btn:hover {
  background-color: #f9fafb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .associations-grid {
    grid-template-columns: 1fr;
  }
  
  .card-content {
    flex-direction: column;
  }
  
  .card-left {
    min-height: 200px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filter-container {
    gap: 0.25rem;
  }
  
  .filter-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>