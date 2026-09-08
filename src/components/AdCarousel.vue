<template>
  <div class="ad-carousel-wrapper">
    <!-- Main Carousel Card (720px x 240px) -->
    <div
      class="carousel-container"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <!-- Slides Track -->
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="carousel-slide"
          :style="{ background: banner.bgGradient }"
        >
          <div class="slide-content">
            <div class="slide-tag">{{ banner.tag }}</div>
            <h3 class="slide-title">{{ banner.title }}</h3>
            <p class="slide-subtitle">{{ banner.subtitle }}</p>
            <router-link :to="banner.link" class="slide-cta-btn">
              <span>立即了解</span>
              <v-icon icon="mdi-arrow-right" size="16" />
            </router-link>
          </div>
          <div class="slide-graphic">
            <div class="graphic-circle">
              <v-icon v-if="index === 0" icon="mdi-shield-alert" size="56" color="#FFD800" />
              <v-icon v-else-if="index === 1" icon="mdi-bag-personal" size="56" color="#FFD800" />
              <v-icon v-else-if="index === 2" icon="mdi-weather-pouring" size="56" color="#FFD800" />
              <v-icon v-else-if="index === 3" icon="mdi-map-marker-radius" size="56" color="#FFD800" />
              <v-icon v-else icon="mdi-gamepad-variant" size="56" color="#FFD800" />
            </div>
          </div>
        </div>
      </div>

      <!-- 左右寬度 34px、高度 34px 箭頭按鈕 -->
      <button
        class="carousel-arrow prev-arrow"
        aria-label="上一張輪播"
        @click="prevSlide"
      >
        <v-icon icon="mdi-chevron-left" size="20" color="#3C3C5A" />
      </button>

      <button
        class="carousel-arrow next-arrow"
        aria-label="下一張輪播"
        @click="nextSlide"
      >
        <v-icon icon="mdi-chevron-right" size="20" color="#3C3C5A" />
      </button>
    </div>

    <!-- 下方提示目前顯示哪一張輪播圖如 1/5 -->
    <div class="carousel-counter-bar">
      <div class="counter-badge">
        <span class="current-num">{{ currentIndex + 1 }}</span>
        <span class="separator">/</span>
        <span class="total-num">{{ banners.length }}</span>
      </div>

      <!-- Progress dots -->
      <div class="carousel-dots">
        <button
          v-for="(_, idx) in banners"
          :key="idx"
          :class="['dot-item', { active: currentIndex === idx }]"
          :aria-label="`切換至第 ${idx + 1} 張`"
          @click="goToSlide(idx)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'

  const banners = ref([
    {
      id: 1,
      title: '國家防災日專題：居家防震三大守則',
      subtitle: '趴下、掩護、穩住，守護全家人的生命安全',
      tag: '年度宣導',
      bgGradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      link: '/news',
    },
    {
      id: 2,
      title: '防災避難包必備清單：黃金72小時物資',
      subtitle: '水、乾糧、手電筒、急救包，你準備好了嗎？',
      tag: '必備清單',
      bgGradient: 'linear-gradient(135deg, #FF8008 0%, #FFC837 100%)',
      link: '/shop',
    },
    {
      id: 3,
      title: '強烈颱風來襲！低窪地區防汛沙包與防水閘門整備',
      subtitle: '提前檢視排水孔與備妥緊急照明，避免災損',
      tag: '即時防汛',
      bgGradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
      link: '/news',
    },
    {
      id: 4,
      title: '防災避難所即時查詢系統上線',
      subtitle: '快速定位最近避難收容處所與容納人數',
      tag: '地圖定位',
      bgGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      link: '/map',
    },
    {
      id: 5,
      title: '防災小知識互動測驗挑戰賽',
      subtitle: '挑戰防災生存大師，立即領取商城專屬防災優惠券！',
      tag: '寓教於樂',
      bgGradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
      link: '/game',
    },
  ])

  const currentIndex = ref(0)
  let timer: ReturnType<typeof setInterval> | null = null

  function nextSlide () {
    currentIndex.value = (currentIndex.value + 1) % banners.value.length
  }

  function prevSlide () {
    currentIndex.value =
      (currentIndex.value - 1 + banners.value.length) % banners.value.length
  }

  function goToSlide (index: number) {
    currentIndex.value = index
  }

  function startAutoPlay () {
    stopAutoPlay()
    // 5秒後播下一張圖
    timer = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  function stopAutoPlay () {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onMounted(() => {
    startAutoPlay()
  })

  onUnmounted(() => {
    stopAutoPlay()
  })
</script>

<style scoped>
/* 4. 廣告輪播圖，寬度720px、高度240px，左右有寬度34px、高度34px箭頭按鈕，可切換上一張或下一張圖，廣告圖須自動輪播，5秒後播下一張圖。下方有提示目前顯示哪一張輪播圖如1/5 */
.ad-carousel-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 720px;
}

.carousel-container {
  position: relative;
  width: 720px;
  max-width: 100%;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 40px;
  box-sizing: border-box;
  color: #ffffff;
}

.slide-content {
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slide-tag {
  align-self: flex-start;
  background-color: #FFD800;
  color: #3C3C5A;
  font-size: 12px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.slide-title {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
}

.slide-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.4;
}

.slide-cta-btn {
  align-self: flex-start;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.slide-cta-btn:hover {
  background-color: #FFD800;
  border-color: #FFD800;
  color: #3C3C5A;
}

.slide-graphic {
  display: flex;
  align-items: center;
  justify-content: center;
}

.graphic-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 2px dashed rgba(255, 216, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 寬度34px、高度34px箭頭按鈕 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #dcdce6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 10;
}

.carousel-arrow:hover {
  background-color: #FFD800;
  border-color: #FFD800;
  transform: translateY(-50%) scale(1.1);
}

.prev-arrow {
  left: 12px;
}

.next-arrow {
  right: 12px;
}

/* 下方提示目前顯示哪一張輪播圖如 1/5 */
.carousel-counter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
  padding: 0 8px;
}

.counter-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #3C3C5A;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.current-num {
  color: #EF4628;
  font-size: 16px;
  font-weight: 900;
}

.separator {
  color: #8C90AB;
}

.total-num {
  color: #8C90AB;
}

.carousel-dots {
  display: flex;
  gap: 6px;
}

.dot-item {
  width: 24px;
  height: 6px;
  border-radius: 3px;
  background-color: #d1d5db;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.dot-item.active {
  background-color: #FFD800;
  width: 36px;
}

@media (max-width: 768px) {
  .carousel-container {
    height: 200px;
  }
  .carousel-slide {
    padding: 20px;
  }
  .slide-title {
    font-size: 16px;
  }
  .slide-subtitle {
    display: none;
  }
  .slide-graphic {
    display: none;
  }
}
</style>
