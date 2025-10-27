<template>
  <div class="search-section">
    <div class="search-container">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="搜索协会..." 
          v-model="searchTerm"
          @input="filterCards"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchTerm = ref('')

const filterCards = () => {
  const term = searchTerm.value.toLowerCase().trim()
  const cards = document.querySelectorAll('.association-card')
  const countBadge = document.querySelector('.count-badge')
  
  let visibleCount = 0
  
  cards.forEach(card => {
    const searchData = card.getAttribute('data-search')?.toLowerCase() || ''
    const cardTitle = card.querySelector('.card-title')?.textContent?.toLowerCase() || ''
    const cardDescription = card.querySelector('.card-description')?.textContent?.toLowerCase() || ''
    
    // 搜索标题、描述和搜索数据
    const matches = searchData.includes(term) || 
                   cardTitle.includes(term) || 
                   cardDescription.includes(term)
    
    if (matches || term === '') {
      card.style.display = 'block'
      visibleCount++
    } else {
      card.style.display = 'none'
    }
  })
  
  // 更新计数
  if (countBadge) {
    countBadge.textContent = visibleCount
  }
}

onMounted(() => {
  // 初始化计数
  const cards = document.querySelectorAll('.association-card')
  const countBadge = document.querySelector('.count-badge')
  if (countBadge) {
    countBadge.textContent = cards.length
  }
})
</script>
