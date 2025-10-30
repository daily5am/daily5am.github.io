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
      <span class="count-badge" id="companyCount">85</span>
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
    tags: ['独角兽', 'D轮及以上融资', '人工智能', '芯片设计', '深圳'],
    articlePath: '/guide/career/companies/cloud-leopard'
  },
  {
    id: 'orbbec',
    name: '奥比中光',
    website: 'https://www.orbbec.com',
    description: '3D视觉感知技术领导者，深度相机和AI视觉算法。',
    highlight: '3D感知技术领导者，深度相机和AI视觉算法',
    searchKeywords: '奥比中光 3D视觉 深度相机 AI视觉算法',
    tags: ['上市', '已上市', '人工智能', '智能硬件'],
    articlePath: '/guide/career/companies/orbbec'
  },
  {
    id: 'yuanxiang-tech',
    name: '元象科技',
    website: 'https://www.yuanxiang.com',
    description: '连续3年入选胡润全球独角兽榜，AI+3D融合技术。',
    highlight: '连续3年胡润独角兽榜，AI+3D融合技术',
    searchKeywords: '元象科技 AI+3D 胡润独角兽榜 融合技术',
    tags: ['独角兽', 'D轮及以上融资', '人工智能', '算法研发', '深圳'],
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
    tags: ['独角兽', 'D轮及以上融资', '人工智能', '应用开发', '深圳'],
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
    tags: ['上市', '已上市', '金融科技', '数字货币', '深圳', '银行/信用社'],
    articlePath: '/guide/career/companies/webank'
  },
  {
    id: 'tencent-fintech',
    name: '腾讯金融科技',
    website: 'https://www.tencent.com',
    description: '支付领域排名第二，金融科技生态。',
    highlight: '支付领域第二，金融科技生态',
    searchKeywords: '腾讯金融科技 支付 金融科技生态',
    tags: ['上市', '已上市', '金融科技', '支付', '深圳'],
    articlePath: '/guide/career/companies/tencent-fintech'
  },
  {
    id: 'pingan-tech',
    name: '平安科技',
    website: 'https://tech.pingan.com',
    description: '保险科技领域排名第一，金融+AI生态联盟。',
    highlight: '保险科技第一，金融+AI生态联盟',
    searchKeywords: '平安科技 保险科技 金融+AI 生态联盟',
    tags: ['上市', '已上市', '金融科技', '保险科技', '深圳'],
    articlePath: '/guide/career/companies/pingan-tech'
  },
  {
    id: 'jinzheng-tech',
    name: '金证科技',
    website: 'https://www.jinzheng.com',
    description: '金融IT解决方案提供商。',
    highlight: '金融IT解决方案提供商',
    searchKeywords: '金证科技 金融IT 解决方案',
    tags: ['上市', '已上市', '金融科技', '区块链', '深圳'],
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
    tags: ['上市', '已上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/huawei'
  },
  {
    id: 'zte',
    name: '中兴通讯',
    website: 'https://www.zte.com.cn',
    description: '5G技术领先，通信设备制造。',
    highlight: '5G技术领先，通信设备制造',
    searchKeywords: '中兴通讯 5G技术 通信设备 制造',
    tags: ['上市', '已上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/zte'
  },
  {
    id: 'tcl',
    name: 'TCL',
    website: 'https://www.tcl.com',
    description: '消费电子制造，智能家电。',
    highlight: '消费电子制造，智能家电',
    searchKeywords: 'TCL 消费电子 智能家电 制造',
    tags: ['上市', '已上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/tcl'
  },
  {
    id: 'skyworth',
    name: '创维',
    website: 'https://www.skyworth.com',
    description: '智能家电，显示技术。',
    highlight: '智能家电，显示技术',
    searchKeywords: '创维 智能家电 显示技术',
    tags: ['上市', '已上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/skyworth'
  },
  {
    id: 'konka',
    name: '康佳',
    website: 'https://www.konka.com',
    description: '电子制造，智能终端。',
    highlight: '电子制造，智能终端',
    searchKeywords: '康佳 电子制造 智能终端',
    tags: ['上市', '已上市', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/konka'
  },
  {
    id: 'huaqin',
    name: '华勤控股',
    website: 'https://www.huaqin.com',
    description: 'ODM/OEM厂商，智能终端制造。',
    highlight: 'ODM/OEM厂商，智能终端制造',
    searchKeywords: '华勤控股 ODM OEM 智能终端',
    tags: ['上市', '已上市', '智能硬件', '智能穿戴', '深圳'],
    articlePath: '/guide/career/companies/huaqin'
  },
  {
    id: 'wingtech',
    name: '闻泰科技',
    website: 'https://www.wingtech.com',
    description: '智能终端制造。',
    highlight: '智能终端制造',
    searchKeywords: '闻泰科技 智能终端 制造',
    tags: ['上市', '已上市', '智能硬件', '智能穿戴', '深圳'],
    articlePath: '/guide/career/companies/wingtech'
  },
  {
    id: 'fibocom',
    name: '广和通',
    website: 'https://www.fibocom.com',
    description: '无线通信模块供应商。',
    highlight: '无线通信模块供应商',
    searchKeywords: '广和通 无线通信 模块供应商',
    tags: ['上市', '已上市', '智能硬件', '智能穿戴', '深圳'],
    articlePath: '/guide/career/companies/fibocom'
  },
  {
    id: 'foxconn',
    name: '富士康',
    website: 'https://www.foxconn.com',
    description: '制造服务商，全球代工巨头。',
    highlight: '制造服务商，全球代工巨头',
    searchKeywords: '富士康 制造服务 代工',
    tags: ['上市', '已上市', '智能硬件', '核心器件', '深圳', '外企'],
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
    tags: ['专精特新', '智慧医疗', '智慧服务', '深圳', '研究所/院'],
    articlePath: '/guide/career/companies/cetc-smart-city'
  },
  // 新增公司列表
  {
    id: 'insta360',
    name: '影石',
    website: 'https://www.insta360.com',
    description: '全球领先的全景相机和运动相机品牌，专注于360度全景影像技术，产品覆盖消费级和专业级市场。',
    highlight: '全球全景相机领导者，360度影像技术领先',
    searchKeywords: '影石 Insta360 全景相机 运动相机 360度影像',
    tags: ['独角兽', 'D轮及以上融资', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/insta360'
  },
  {
    id: 'tencent',
    name: '腾讯',
    website: 'https://www.tencent.com',
    description: '中国领先的互联网科技公司，业务涵盖社交、游戏、金融、云服务等领域，拥有微信、QQ等核心产品。',
    highlight: '中国互联网巨头，微信生态，游戏行业领导者',
    searchKeywords: '腾讯 微信 QQ 游戏 社交 互联网',
    tags: ['上市', '已上市', '互联网', '应用开发', '深圳', '民企', '10000人以上'],
    articlePath: '/guide/career/companies/tencent'
  },
  {
    id: 'webank',
    name: '微众银行',
    website: 'https://www.webank.com',
    description: '中国首家互联网银行，数字银行领域排名第一，自主研发FISCO BCOS区块链平台，构建全分布式银行系统。',
    highlight: '数字银行第一，FISCO BCOS平台，服务3亿+用户',
    searchKeywords: '微众银行 数字银行 FISCO BCOS 区块链 微粒贷',
    tags: ['上市', '金融科技', '数字货币', '深圳'],
    articlePath: '/guide/career/companies/webank'
  },
  {
    id: 'tencent-cloud',
    name: '腾讯云',
    website: 'https://cloud.tencent.com',
    description: '腾讯旗下云计算服务品牌，提供云服务器、云数据库、人工智能等全方位云服务解决方案。',
    highlight: '国内云服务前三，AI能力领先，服务企业超200万',
    searchKeywords: '腾讯云 云计算 云服务器 AI 企业服务',
    tags: ['上市', '已上市', '云计算', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/tencent-cloud'
  },
  {
    id: 'alibaba',
    name: '阿里巴巴',
    website: 'https://www.alibaba.com',
    description: '全球领先的电子商务和云计算公司，业务涵盖电商、云计算、数字媒体、物流等领域。',
    highlight: '全球电商巨头，云计算领导者，年GMV超8万亿',
    searchKeywords: '阿里巴巴 淘宝 天猫 电商 云计算',
    tags: ['上市', '已上市', '电商', '应用开发', '杭州', '民企', '10000人以上'],
    articlePath: '/guide/career/companies/alibaba'
  },
  {
    id: 'ant-group',
    name: '蚂蚁集团',
    website: 'https://www.antgroup.com',
    description: '全球领先的金融科技公司，提供数字支付、数字金融、数字生活等服务，支付宝用户超10亿。',
    highlight: '全球金融科技领导者，支付宝生态，服务用户超10亿',
    searchKeywords: '蚂蚁集团 支付宝 金融科技 数字支付',
    tags: ['独角兽', 'D轮及以上融资', '金融科技', '支付', '杭州'],
    articlePath: '/guide/career/companies/ant-group'
  },
  {
    id: 'cainiao',
    name: '菜鸟网络',
    website: 'https://www.cainiao.com',
    description: '阿里巴巴旗下物流科技公司，致力于建设全球智能物流骨干网，提供智慧物流解决方案。',
    highlight: '全球智能物流网络，日处理包裹超1亿件',
    searchKeywords: '菜鸟网络 智能物流 快递 供应链',
    tags: ['独角兽', '物流', '应用开发', '杭州'],
    articlePath: '/guide/career/companies/cainiao'
  },
  {
    id: 'aliyun',
    name: '阿里云',
    website: 'https://www.aliyun.com',
    description: '阿里巴巴旗下云计算服务品牌，提供弹性计算、数据库、存储、网络等全方位云服务。',
    highlight: '国内云服务第一，全球前三，服务企业超300万',
    searchKeywords: '阿里云 云计算 云服务器 企业服务',
    tags: ['上市', '已上市', '云计算', '应用开发', '杭州'],
    articlePath: '/guide/career/companies/aliyun'
  },
  {
    id: 'bytedance',
    name: '字节跳动',
    website: 'https://www.bytedance.com',
    description: '全球领先的互联网科技公司，旗下产品包括抖音、今日头条、TikTok等，专注于内容创作和信息分发。',
    highlight: '全球内容平台领导者，TikTok月活超10亿',
    searchKeywords: '字节跳动 抖音 TikTok 今日头条 内容平台',
    tags: ['独角兽', 'D轮及以上融资', '互联网', '应用开发', '北京', '10000人以上'],
    articlePath: '/guide/career/companies/bytedance'
  },
  {
    id: 'jianying',
    name: '剪映',
    website: 'https://lv.ulikecam.com',
    description: '字节跳动旗下视频剪辑应用，提供智能剪辑、特效、音乐等功能，用户超2亿。',
    highlight: '国内视频剪辑第一，AI智能剪辑，用户超2亿',
    searchKeywords: '剪映 视频剪辑 AI剪辑 特效 音乐',
    tags: ['独角兽', 'D轮及以上融资', '互联网', '应用开发', '北京'],
    articlePath: '/guide/career/companies/jianying'
  },
  {
    id: 'feishu',
    name: '飞书',
    website: 'https://www.feishu.cn',
    description: '字节跳动旗下企业协作平台，提供即时通讯、视频会议、文档协作等一站式办公解决方案。',
    highlight: '企业协作平台新星，AI办公助手，服务企业超50万',
    searchKeywords: '飞书 企业协作 办公软件 视频会议',
    tags: ['独角兽', 'D轮及以上融资', '互联网', '应用开发', '北京'],
    articlePath: '/guide/career/companies/feishu'
  },
  {
    id: 'douyin',
    name: '抖音',
    website: 'https://www.douyin.com',
    description: '字节跳动旗下短视频平台，全球月活用户超6亿，是领先的短视频内容创作和分享平台。',
    highlight: '全球短视频领导者，月活超6亿，内容生态丰富',
    searchKeywords: '抖音 短视频 内容创作 直播 电商',
    tags: ['独角兽', 'D轮及以上融资', '互联网', '应用开发', '北京'],
    articlePath: '/guide/career/companies/douyin'
  },
  {
    id: 'juliang-engine',
    name: '巨量引擎',
    website: 'https://www.oceanengine.com',
    description: '字节跳动旗下数字营销平台，为广告主提供精准营销解决方案，覆盖抖音、今日头条等产品。',
    highlight: '数字营销平台领导者，服务广告主超100万',
    searchKeywords: '巨量引擎 数字营销 广告投放 精准营销',
    tags: ['独角兽', 'D轮及以上融资', '互联网', '应用开发', '北京'],
    articlePath: '/guide/career/companies/juliang-engine'
  },
  {
    id: 'dji',
    name: '大疆',
    website: 'https://www.dji.com',
    description: '全球领先的无人机和影像设备制造商，在消费级和专业级无人机市场占据主导地位。',
    highlight: '全球无人机领导者，市场份额超70%，年营收超200亿',
    searchKeywords: '大疆 无人机 航拍 影像设备 创新科技',
    tags: ['独角兽', 'D轮及以上融资', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/dji'
  },
  {
    id: 'sf-express',
    name: '顺丰',
    website: 'https://www.sf-express.com',
    description: '中国领先的综合物流服务商，提供快递、快运、冷运、同城配送等全方位物流服务。',
    highlight: '中国快递行业领导者，年营收超1500亿',
    searchKeywords: '顺丰 快递 物流 冷链 同城配送',
    tags: ['上市', '已上市', '物流', '应用开发', '深圳', '10000人以上'],
    articlePath: '/guide/career/companies/sf-express'
  },
  {
    id: 'byd',
    name: '比亚迪',
    website: 'https://www.byd.com',
    description: '全球领先的新能源汽车和电池制造商，在电动汽车、储能、轨道交通等领域具有领先优势。',
    highlight: '全球新能源汽车领导者，年销量超300万辆',
    searchKeywords: '比亚迪 新能源汽车 电池 储能 轨道交通',
    tags: ['上市', '已上市', '智能硬件', '核心器件', '深圳', '10000人以上', '民企'],
    articlePath: '/guide/career/companies/byd'
  },
  {
    id: 'pingan-tech',
    name: '平安科技',
    website: 'https://tech.pingan.com',
    description: '中国平安旗下科技公司，专注于金融科技、医疗科技、智慧城市等领域的技术创新。',
    highlight: '金融科技领导者，AI技术领先，服务用户超2亿',
    searchKeywords: '平安科技 金融科技 医疗科技 智慧城市 AI',
    tags: ['上市', '金融科技', '保险科技', '深圳'],
    articlePath: '/guide/career/companies/pingan-tech'
  },
  {
    id: 'meituan',
    name: '美团',
    website: 'https://www.meituan.com',
    description: '中国领先的生活服务电子商务平台，提供外卖、到店、酒店旅游、出行等全方位生活服务。',
    highlight: '生活服务电商领导者，年交易额超7000亿',
    searchKeywords: '美团 外卖 生活服务 到店 酒店旅游',
    tags: ['上市', '已上市', '电商', '应用开发', '北京', '10000人以上'],
    articlePath: '/guide/career/companies/meituan'
  },
  {
    id: 'didi',
    name: '滴滴出行',
    website: 'https://www.didiglobal.com',
    description: '全球领先的一站式出行平台，提供网约车、出租车、代驾、货运等多元化出行服务。',
    highlight: '全球出行平台领导者，日订单超5000万',
    searchKeywords: '滴滴出行 网约车 出租车 代驾 货运',
    tags: ['独角兽', 'D轮及以上融资', '互联网', '应用开发', '北京'],
    articlePath: '/guide/career/companies/didi'
  },
  {
    id: 'oppo',
    name: 'OPPO',
    website: 'https://www.oppo.com',
    description: '全球领先的智能终端制造商，专注于智能手机、智能手表、耳机等消费电子产品的研发和制造。',
    highlight: '全球智能手机前五，年销量超1亿台',
    searchKeywords: 'OPPO 智能手机 智能手表 耳机 消费电子',
    tags: ['上市', '已上市', '智能硬件', '消费电子', '深圳', '10000人以上'],
    articlePath: '/guide/career/companies/oppo'
  },
  {
    id: 'vivo',
    name: 'vivo',
    website: 'https://www.vivo.com',
    description: '全球领先的智能终端制造商，专注于智能手机、智能手表、耳机等消费电子产品的研发和制造。',
    highlight: '全球智能手机前五，年销量超1亿台',
    searchKeywords: 'vivo 智能手机 智能手表 耳机 消费电子',
    tags: ['上市', '已上市', '智能硬件', '消费电子', '深圳', '10000人以上'],
    articlePath: '/guide/career/companies/vivo'
  },
  {
    id: 'sangfor',
    name: '深信服',
    website: 'https://www.sangfor.com.cn',
    description: '中国领先的网络安全和云计算解决方案提供商，专注于企业级安全、云计算、基础网络等领域。',
    highlight: '网络安全领导者，云计算解决方案提供商',
    searchKeywords: '深信服 网络安全 云计算 企业安全',
    tags: ['上市', '已上市', '互联网', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/sangfor'
  },
  {
    id: 'hytera',
    name: '海能达',
    website: 'https://www.hytera.com',
    description: '全球领先的专业通信设备制造商，专注于对讲机、集群通信、应急通信等专业通信解决方案。',
    highlight: '全球专业通信设备领导者，市场份额前三',
    searchKeywords: '海能达 对讲机 集群通信 应急通信',
    tags: ['上市', '已上市', '智能硬件', '核心器件', '深圳'],
    articlePath: '/guide/career/companies/hytera'
  },
  {
    id: 'shopee',
    name: '虾皮',
    website: 'https://shopee.cn',
    description: '东南亚领先的电商平台，为消费者提供购物、支付、物流等一站式电商服务。',
    highlight: '东南亚电商领导者，月活用户超4亿',
    searchKeywords: '虾皮 Shopee 东南亚电商 购物 支付',
    tags: ['独角兽', 'D轮及以上融资', '电商', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/shopee'
  },
  {
    id: 'sense-time',
    name: '商汤科技',
    website: 'https://www.sensetime.com',
    description: '计算机视觉和深度学习技术，AI视觉领域独角兽。',
    highlight: '计算机视觉和深度学习技术，AI视觉独角兽',
    searchKeywords: '商汤科技 计算机视觉 深度学习 独角兽',
    tags: ['独角兽', 'D轮及以上融资', '人工智能', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/sense-time'
  },
  {
    id: 'ubtech',
    name: '优必选',
    website: 'https://www.ubtrobot.com',
    description: '智能机器人技术，全球机器人领先企业。',
    highlight: '全球机器人领先企业，人形机器人技术',
    searchKeywords: '优必选 智能机器人 人形机器人 全球领先',
    tags: ['独角兽', 'D轮及以上融资', '人工智能', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/ubtech'
  },
  {
    id: 'zhuoyi-tech',
    name: '追一科技',
    website: 'https://www.zhuoyi.ai',
    description: '企业级智能服务AI公司，专注于自然语言处理、对话机器人、智能客服等AI应用。',
    highlight: '企业级AI服务领导者，智能客服技术领先',
    searchKeywords: '追一科技 自然语言处理 对话机器人 智能客服',
    tags: ['独角兽', 'D轮及以上融资', '人工智能', '算法研发', '深圳'],
    articlePath: '/guide/career/companies/zhuoyi-tech'
  },
  {
    id: 'superd',
    name: '超多维科技',
    website: 'https://www.superd.com',
    description: '计算机视觉和裸眼3D技术领导者，专注于3D显示、VR/AR等视觉技术研发。',
    highlight: '裸眼3D技术领导者，计算机视觉技术领先',
    searchKeywords: '超多维科技 裸眼3D 计算机视觉 VR AR',
    tags: ['独角兽', 'D轮及以上融资', '人工智能', '算法研发', '深圳'],
    articlePath: '/guide/career/companies/superd'
  },
  {
    id: 'huolala',
    name: '货拉拉',
    website: 'https://www.huolala.cn',
    description: '中国领先的同城货运平台，为用户提供便捷的货运服务，连接货主和司机。',
    highlight: '同城货运领导者，月活用户超1000万',
    searchKeywords: '货拉拉 同城货运 物流 司机 货主',
    tags: ['独角兽', 'D轮及以上融资', '物流', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/huolala'
  },
  {
    id: 'codemao',
    name: '编程猫',
    website: 'https://www.codemao.cn',
    description: '中国领先的少儿编程教育平台，为4-16岁儿童提供编程教育服务。',
    highlight: '少儿编程教育领导者，服务用户超3000万',
    searchKeywords: '编程猫 少儿编程 编程教育 儿童教育',
    tags: ['独角兽', 'D轮及以上融资', '教育', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/codemao'
  },
  {
    id: 'fengchao',
    name: '丰巢',
    website: 'https://www.fcbox.com',
    description: '中国领先的智能快递柜服务商，为快递公司和用户提供智能快递柜服务。',
    highlight: '智能快递柜领导者，覆盖城市超300个',
    searchKeywords: '丰巢 智能快递柜 快递 物流 便民服务',
    tags: ['独角兽', 'D轮及以上融资', '物流', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/fengchao'
  },
  {
    id: 'woshipm',
    name: '人人都是产品经理',
    website: 'https://www.woshipm.com',
    description: '中国领先的产品经理学习平台，为产品经理提供学习、交流、求职等服务。',
    highlight: '产品经理学习平台领导者，用户超500万',
    searchKeywords: '人人都是产品经理 产品经理 学习 交流 求职',
    tags: ['独角兽', 'D轮及以上融资', '教育', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/woshipm'
  },
  {
    id: 'hellotalk',
    name: 'HelloTalk',
    website: 'https://www.hellotalk.com',
    description: '全球领先的语言学习社交平台，帮助用户通过语言交换学习外语。',
    highlight: '语言学习社交平台领导者，用户超3000万',
    searchKeywords: 'HelloTalk 语言学习 社交 外语 语言交换',
    tags: ['独角兽', 'D轮及以上融资', '教育', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/hellotalk'
  },
  {
    id: 'dayu-wuxian',
    name: '大宇无限',
    website: 'https://www.dayu.com',
    description: '专注于海外新兴市场的移动应用开发商，拥有SnapTube、Lark Player等多款广受欢迎的产品。',
    highlight: '海外新兴市场应用领导者，产品用户超5亿',
    searchKeywords: '大宇无限 SnapTube Lark Player 海外应用',
    tags: ['独角兽', 'D轮及以上融资', '互联网', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/dayu-wuxian'
  },
  {
    id: 'xingqiu',
    name: '知识星球',
    website: 'https://www.xingqiu.com',
    description: '中国领先的知识付费平台，为知识创作者和用户提供知识分享和付费服务。',
    highlight: '知识付费平台领导者，创作者超100万',
    searchKeywords: '知识星球 知识付费 知识分享 创作者',
    tags: ['独角兽', 'D轮及以上融资', '教育', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/xingqiu'
  },
  {
    id: 'ctrip',
    name: '携程',
    website: 'https://www.ctrip.com',
    description: '中国领先的在线旅游服务商，提供机票、酒店、旅游等全方位旅游服务。',
    highlight: '在线旅游服务领导者，年交易额超3000亿',
    searchKeywords: '携程 在线旅游 机票 酒店 旅游服务',
    tags: ['上市', '已上市', '电商', '应用开发', '上海', '10000人以上'],
    articlePath: '/guide/career/companies/ctrip'
  },
  {
    id: 'iflytek',
    name: '科大讯飞',
    website: 'https://www.iflytek.com',
    description: '中国领先的人工智能公司，专注于语音识别、自然语言处理、机器翻译等AI技术。',
    highlight: 'AI语音技术领导者，语音识别准确率超98%',
    searchKeywords: '科大讯飞 语音识别 自然语言处理 机器翻译 AI',
    tags: ['上市', '已上市', '人工智能', '算法研发', '合肥'],
    articlePath: '/guide/career/companies/iflytek'
  },
  {
    id: 'pinduoduo',
    name: '拼多多',
    website: 'https://www.pinduoduo.com',
    description: '中国领先的社交电商平台，通过社交拼团模式为用户提供优质商品和优惠价格。',
    highlight: '社交电商领导者，年GMV超2万亿',
    searchKeywords: '拼多多 社交电商 拼团 优惠 购物',
    tags: ['上市', '已上市', '电商', '应用开发', '上海', '10000人以上'],
    articlePath: '/guide/career/companies/pinduoduo'
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    website: 'https://www.xiaohongshu.com',
    description: '中国领先的生活方式平台，为用户提供购物分享、生活记录、美妆护肤等内容。',
    highlight: '生活方式平台领导者，月活用户超2亿',
    searchKeywords: '小红书 生活方式 购物分享 美妆护肤',
    tags: ['独角兽', 'D轮及以上融资', '电商', '应用开发', '上海'],
    articlePath: '/guide/career/companies/xiaohongshu'
  },
  {
    id: 'dewu',
    name: '得物',
    website: 'https://www.dewu.com',
    description: '中国领先的潮流电商平台，专注于球鞋、潮牌、美妆等潮流商品的交易和鉴定。',
    highlight: '潮流电商领导者，球鞋鉴定技术领先',
    searchKeywords: '得物 潮流电商 球鞋 潮牌 美妆 鉴定',
    tags: ['独角兽', 'D轮及以上融资', '电商', '应用开发', '上海'],
    articlePath: '/guide/career/companies/dewu'
  },
  {
    id: 'oneplus',
    name: '一加',
    website: 'https://www.oneplus.com',
    description: '全球领先的智能手机品牌，专注于高端智能手机的研发和制造。',
    highlight: '高端智能手机品牌，全球用户超1000万',
    searchKeywords: '一加 智能手机 高端 科技 创新',
    tags: ['独角兽', 'D轮及以上融资', '智能硬件', '消费电子', '深圳'],
    articlePath: '/guide/career/companies/oneplus'
  },
  {
    id: 'kuaishou',
    name: '快手',
    website: 'https://www.kuaishou.com',
    description: '中国领先的短视频平台，为用户提供短视频创作、分享、直播等服务。',
    highlight: '短视频平台领导者，日活用户超3亿',
    searchKeywords: '快手 短视频 直播 内容创作 社交',
    tags: ['上市', '互联网', '应用开发', '北京'],
    articlePath: '/guide/career/companies/kuaishou'
  },
  {
    id: 'jd',
    name: '京东',
    website: 'https://www.jd.com',
    description: '中国领先的电商平台，提供自营商品、第三方商家、物流配送等全方位电商服务。',
    highlight: '电商平台领导者，年GMV超2万亿',
    searchKeywords: '京东 电商 自营 物流 购物',
    tags: ['上市', '已上市', '电商', '应用开发', '北京', '10000人以上'],
    articlePath: '/guide/career/companies/jd'
  },
  {
    id: 'futu',
    name: '富途证券',
    website: 'https://www.futunn.com',
    description: '中国领先的互联网券商，为用户提供港股、美股、A股等全球股票交易服务。',
    highlight: '互联网券商领导者，用户超2000万',
    searchKeywords: '富途证券 互联网券商 港股 美股 A股',
    tags: ['上市', '已上市', '金融科技', '智能金融', '深圳'],
    articlePath: '/guide/career/companies/futu'
  },
  {
    id: 'cmb-tech',
    name: '招银科技',
    website: 'https://www.cmbchina.com',
    description: '招商银行旗下科技公司，专注于金融科技、数字化转型、智能风控等领域。',
    highlight: '银行科技领导者，数字化转型领先',
    searchKeywords: '招银科技 金融科技 数字化转型 智能风控',
    tags: ['上市', '已上市', '金融科技', '智能金融', '深圳'],
    articlePath: '/guide/career/companies/cmb-tech'
  },
  {
    id: 'pingan',
    name: '平安',
    website: 'https://www.pingan.com',
    description: '中国领先的综合金融服务集团，业务涵盖保险、银行、投资、科技等领域。',
    highlight: '综合金融服务领导者，年营收超1万亿',
    searchKeywords: '平安 保险 银行 投资 科技 金融服务',
    tags: ['上市', '已上市', '金融科技', '保险科技', '深圳', '民企', '10000人以上'],
    articlePath: '/guide/career/companies/pingan'
  },
  {
    id: 'youzan',
    name: '有赞',
    website: 'https://www.youzan.com',
    description: '中国领先的SaaS服务商，为商家提供电商、零售、餐饮等行业的数字化解决方案。',
    highlight: 'SaaS服务领导者，服务商家超600万',
    searchKeywords: '有赞 SaaS 电商 零售 餐饮 数字化',
    tags: ['上市', '已上市', '互联网', '应用开发', '杭州'],
    articlePath: '/guide/career/companies/youzan'
  },
  {
    id: 'xunlei',
    name: '迅雷',
    website: 'https://www.xunlei.com',
    description: '中国领先的互联网服务提供商，专注于下载加速、云计算、区块链等领域。',
    highlight: '下载加速领导者，云计算服务提供商',
    searchKeywords: '迅雷 下载加速 云计算 区块链 互联网服务',
    tags: ['上市', '已上市', '互联网', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/xunlei'
  },
  {
    id: 'kingdee',
    name: '金蝶',
    website: 'https://www.kingdee.com',
    description: '中国领先的企业管理软件提供商，专注于ERP、财务软件、人力资源等企业管理解决方案。',
    highlight: '企业管理软件领导者，服务企业超500万',
    searchKeywords: '金蝶 ERP 财务软件 人力资源 企业管理',
    tags: ['上市', '已上市', '互联网', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/kingdee'
  },
  {
    id: 'xiaoe-tong',
    name: '小鹅通',
    website: 'https://www.xiaoe-tech.com',
    description: '中国领先的知识付费技术服务商，为内容创作者提供知识付费、在线教育等技术服务。',
    highlight: '知识付费技术服务领导者，服务创作者超100万',
    searchKeywords: '小鹅通 知识付费 在线教育 内容创作 技术服务',
    tags: ['独角兽', 'D轮及以上融资', '教育', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/xiaoe-tong'
  },
  {
    id: 'xmind',
    name: 'XMind',
    website: 'https://www.xmind.cn',
    description: '全球领先的思维导图软件开发商，为用户提供思维导图、头脑风暴等思维工具。',
    highlight: '思维导图软件领导者，全球用户超1000万',
    searchKeywords: 'XMind 思维导图 头脑风暴 思维工具',
    tags: ['独角兽', '互联网', '应用开发', '深圳'],
    articlePath: '/guide/career/companies/xmind'
  },
  {
    id: 'xiaoying-tech',
    name: '小赢科技',
    website: 'https://www.xiaoying.com',
    description: '中国领先的金融科技公司，专注于个人消费金融、小微企业金融等金融服务。',
    highlight: '金融科技领导者，服务用户超1000万',
    searchKeywords: '小赢科技 金融科技 消费金融 小微企业金融',
    tags: ['上市', '金融科技', '智能金融', '深圳'],
    articlePath: '/guide/career/companies/xiaoying-tech'
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
    city: 'all',
    ownership: 'all',
    funding: 'all',
    size: 'all'
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
        title: '企业性质',
        type: 'ownership',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '国企', text: '国企' },
          { value: '央企', text: '央企' },
          { value: '银行/信用社', text: '银行/信用社' },
          { value: '研究所/院', text: '研究所/院' },
          { value: '外企', text: '外企' },
          { value: '民企', text: '民企' },
          { value: '事业单位', text: '事业单位' }
        ]
      },
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
        title: '融资阶段',
        type: 'funding',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '天使轮', text: '天使轮' },
          { value: 'A轮融资', text: 'A轮融资' },
          { value: 'B轮融资', text: 'B轮融资' },
          { value: 'C轮融资', text: 'C轮融资' },
          { value: 'D轮及以上融资', text: 'D轮及以上融资' },
          { value: '未融资', text: '未融资' },
          { value: '不需要融资', text: '不需要融资' },
          { value: '已上市', text: '已上市' }
        ]
      },
      {
        title: '公司规模',
        type: 'size',
        filters: [
          { value: 'all', text: '全部', active: true },
          { value: '0-20人', text: '0-20人' },
          { value: '20-99人', text: '20-99人' },
          { value: '100-499人', text: '100-499人' },
          { value: '500-999人', text: '500-999人' },
          { value: '1000-9999人', text: '1000-9999人' },
          { value: '10000人以上', text: '10000人以上' }
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
      const ownershipMatches = activeFilters.ownership === 'all' || cardTags.includes(activeFilters.ownership)
      const fundingMatches = activeFilters.funding === 'all' || cardTags.includes(activeFilters.funding)
      const sizeMatches = activeFilters.size === 'all' || cardTags.includes(activeFilters.size)
      
      // 同时满足搜索和所有过滤条件
      if (searchMatches && natureMatches && industryMatches && levelMatches && cityMatches && ownershipMatches && fundingMatches && sizeMatches) {
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
    } else if (['国企', '央企', '银行/信用社', '研究所/院', '外企', '民企', '事业单位'].includes(tagText)) {
      filterType = 'ownership'
    } else if (['天使轮', 'A轮融资', 'B轮融资', 'C轮融资', 'D轮及以上融资', '未融资', '不需要融资', '已上市'].includes(tagText)) {
      filterType = 'funding'
    } else if (['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'].includes(tagText)) {
      filterType = 'size'
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