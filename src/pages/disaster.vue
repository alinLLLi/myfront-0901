<template>
  <div class="disaster-minimal-page d-flex flex-column align-center justify-center px-4">
    <!-- 8-1. Logo (120px x 100px) -->
    <div class="logo-container mb-6" @click="router.push('/')">
      <MascotLogo />
    </div>

    <!-- 8-2. Alert Notice Text -->
    <div class="alert-notice-box text-center mb-8 max-w-800 px-6 py-4 rounded-lg">
      <h1 class="alert-text mb-0">
        花蓮地區 7.0 強震警報 (15:58)，「請注意餘震，若位於室內請立即趴下掩護」
      </h1>
    </div>

    <!-- Action Banners Grid / Row (8-3, 8-4, 8-6) -->
    <div class="banner-actions-row d-flex flex-wrap justify-center ga-4 mb-8">
      <!-- 8-3. 避難地圖 banner (142px x 48px, bg #3C3C5A, text 18px bold #FFFFFF) -->
      <button class="banner-btn btn-dark" @click="downloadEvacuationMap">
        避難地圖
      </button>

      <!-- 8-4. 緊急求救 banner (142px x 48px, bg #FFFFFF, border 2px #3C3C5A, text 18px bold #3C3C5A) -->
      <a href="tel:119" class="banner-btn btn-white-border text-decoration-none d-flex align-center justify-center">
        緊急求救
      </a>

      <!-- 8-6. 回到首頁 banner (142px x 48px, bg #FFFFFF, border 2px #3C3C5A, text 18px bold #3C3C5A) -->
      <button class="banner-btn btn-white-border" @click="router.push('/')">
        回到首頁
      </button>
    </div>

    <!-- 8-5. 即時災情連接至 NCDR (文字 16px, 顏色 #3C3C5A, 行距 22px, 居中對齊) -->
    <div class="ncdr-info-box text-center">
      <p class="ncdr-text mb-1">
        了解即時災害最新訊息與防颱避難通報：
      </p>
      <a
        href="https://www.ncdr.nat.gov.tw/"
        target="_blank"
        rel="noopener noreferrer"
        class="ncdr-link"
      >
        國家災害防救科技中心 (NCDR) 官方網站 ↗
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import MascotLogo from '@/components/MascotLogo.vue'

  const router = useRouter()

  function downloadEvacuationMap () {
    // Create a mock blob download for the evacuation map
    const element = document.createElement('a')
    const file = new Blob([
      '=== 防災避難地圖指南 ===\n1. 保持冷靜，注意頭部防護\n2. 鄰近避難所：國家公園與各級學校操場\n3. 緊急聯絡電話：119 / 110\n',
    ], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = '避難地圖指南.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
</script>

<style scoped>
/* 8. 災時極簡模式，滿版底色 #FFD800 */
.disaster-minimal-page {
  min-height: 100vh;
  width: 100vw;
  background-color: #FFD800;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow-y: auto;
}

.logo-container {
  cursor: pointer;
}

/* 8-2. 警報文字 24px, 粗體 900, 顏色 #3C3C5A */
.alert-notice-box {
  background-color: rgba(255, 255, 255, 0.4);
  border: 3px solid #3C3C5A;
  max-width: 840px;
}

.alert-text {
  font-size: 24px;
  font-weight: 900;
  color: #3C3C5A;
  line-height: 1.5;
}

/* Banner Buttons General (width 142px, height 48px) */
.banner-btn {
  width: 142px;
  height: 48px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
  user-select: none;
}

.banner-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* 8-3. 避難地圖 banner (底色 #3C3C5A, 文字 18px 粗體 #FFFFFF) */
.btn-dark {
  background-color: #3C3C5A;
  color: #FFFFFF;
  border: none;
}

/* 8-4 & 8-6. 緊急求救 / 回到首頁 banner (底色 #FFFFFF, 邊框 2px #3C3C5A, 文字 18px 粗體 #3C3C5A) */
.btn-white-border {
  background-color: #FFFFFF;
  border: 2px solid #3C3C5A;
  color: #3C3C5A;
}

/* 8-5. 即時災情文字 16px, 顏色 #3C3C5A, 行距 22px, 居中對齊 */
.ncdr-info-box {
  max-width: 600px;
}

.ncdr-text {
  font-size: 16px;
  color: #3C3C5A;
  line-height: 22px;
  font-weight: 500;
}

.ncdr-link {
  font-size: 16px;
  color: #3C3C5A;
  line-height: 22px;
  font-weight: bold;
  text-decoration: underline;
}

.ncdr-link:hover {
  color: #EF4628;
}
</style>

<route lang="yaml">
meta:
  title: 災時極簡模式
  layout: false
</route>
