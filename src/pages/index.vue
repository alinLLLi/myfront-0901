<template>
  <div class="home-page-container">
    <!-- 3. 形象圖片滿版顯示 (主視覺套用 Studio Carousel 輪播效果) -->
    <section class="hero-banner-section mb-6 mb-md-8">
      <div class="hero-banner-wrapper">
        <div
          class="sd appear _animatingNext _playing hero-studio-carousel"
          data-s-c81fe1a0-dc63-4129-8c5a-bb0c1de18a7f=""
          data-type="carousel"
          @mouseenter="stopHeroAutoPlay"
          @mouseleave="startHeroAutoPlay"
        >
          <div
            class="hero-carousel-track"
            :style="{
              transform: `translateX(-${(heroSlideIndex + 1) * 100}%)`,
              transition: isHeroTransitioning ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }"
          >
            <div class="sd appear _animatingNext _playing __ariaHidden" data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6="" style="--sd-6f9f037f_002dfe01_002d40ea_002d9c44_002d523242ada0d6-transform: translateX(-100%); transition-duration: 9000ms;">
              <div class="sd appear _animatingNext _playing __ariaHidden" data-s-b50aa10f-fcbe-4b83-8529-6abbd2613677="" />
              <div class="image sd appear _animatingNext _playing __ariaHidden" data-r-1_-2_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be="" data-s-e85daafc-b4b3-4613-9bc9-b081034ba5be="" />
            </div>

            <div class="sd appear _animatingNext _playing __ariaHidden" data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6="" style="--sd-6f9f037f_002dfe01_002d40ea_002d9c44_002d523242ada0d6-transform: translateX(-100%); transition-duration: 9000ms;">
              <div class="sd _animatingNext _playing __ariaHidden" data-s-b50aa10f-fcbe-4b83-8529-6abbd2613677="" />
              <div class="image sd _animatingNext _playing __ariaHidden" data-r-1_-1_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be="" data-s-e85daafc-b4b3-4613-9bc9-b081034ba5be="" />
            </div>

            <div class="sd appear _animatingNext _playing __ariaHidden" data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6="" style="--sd-6f9f037f_002dfe01_002d40ea_002d9c44_002d523242ada0d6-transform: translateX(-100%); transition-duration: 9000ms;">
              <div class="sd _animatingNext _playing __ariaHidden" data-s-b50aa10f-fcbe-4b83-8529-6abbd2613677="" />
              <div class="image sd _animatingNext _playing __ariaHidden" data-r-1_0_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be="" data-s-e85daafc-b4b3-4613-9bc9-b081034ba5be="" />
            </div>

            <div class="sd appear _animatingNext _playing __ariaHidden" data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6="" style="--sd-6f9f037f_002dfe01_002d40ea_002d9c44_002d523242ada0d6-transform: translateX(-100%); transition-duration: 9000ms;">
              <div class="sd _animatingNext _playing __ariaHidden" data-s-b50aa10f-fcbe-4b83-8529-6abbd2613677="" />
              <div class="image sd _animatingNext _playing __ariaHidden" data-r-1_1_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be="" data-s-e85daafc-b4b3-4613-9bc9-b081034ba5be="" />
            </div>

            <div class="sd appear _animatingNext _playing" data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6="" style="--sd-6f9f037f_002dfe01_002d40ea_002d9c44_002d523242ada0d6-transform: translateX(-100%); transition-duration: 9000ms;">
              <div class="sd _animatingNext _playing" data-s-b50aa10f-fcbe-4b83-8529-6abbd2613677="" />
              <div class="image sd _animatingNext _playing" data-r-1_2_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be="" data-s-e85daafc-b4b3-4613-9bc9-b081034ba5be="" />
            </div>

            <div class="sd appear _animatingNext _playing __ariaHidden" data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6="" style="--sd-6f9f037f_002dfe01_002d40ea_002d9c44_002d523242ada0d6-transform: translateX(-100%); transition-duration: 9000ms;">
              <div class="sd appear _animatingNext _playing __ariaHidden" data-s-b50aa10f-fcbe-4b83-8529-6abbd2613677="" />
              <div class="image sd appear _animatingNext _playing __ariaHidden" data-r-1_3_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be="" data-s-e85daafc-b4b3-4613-9bc9-b081034ba5be="" />
            </div>

            <div class="sd appear _animatingNext _playing __ariaHidden" data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6="" style="--sd-6f9f037f_002dfe01_002d40ea_002d9c44_002d523242ada0d6-transform: translateX(-100%); transition-duration: 9000ms;">
              <div class="sd appear _animatingNext _playing __ariaHidden" data-s-b50aa10f-fcbe-4b83-8529-6abbd2613677="" />
              <div class="image sd appear _animatingNext _playing __ariaHidden" data-r-1_4_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be="" data-s-e85daafc-b4b3-4613-9bc9-b081034ba5be="" />
            </div>
          </div>

          <!-- Hero Text Content Overlay -->
          <div class="hero-overlay">
            <div class="hero-content-box">
              <span class="hero-badge">智慧防災 ‧ 全民守護</span>
              <h1 class="hero-title">全民防災，智慧守護</h1>
              <p class="hero-subtitle">即時掌握災害新知與避難資訊 ‧ 打造最堅固的安全防護網</p>

              <router-link class="hero-cta-btn" to="/news">
                <span>探索防災專區</span>
                <v-icon class="ml-1" icon="mdi-arrow-right" size="18" />
              </router-link>
            </div>

            <!-- Hero Controls -->
            <div class="hero-carousel-controls">
              <button aria-label="上一張" class="hero-arrow prev-btn" title="上一張" @click="prevHeroSlide">
                <v-icon icon="mdi-chevron-left" size="22" />
              </button>

              <div class="hero-dots">
                <span
                  v-for="(_, idx) in 4"
                  :key="idx"
                  class="hero-dot"
                  :class="{ active: heroSlideIndex % 4 === idx }"
                  @click="heroSlideIndex = idx"
                />
              </div>

              <button aria-label="下一張" class="hero-arrow next-btn" title="下一張" @click="nextHeroSlide">
                <v-icon icon="mdi-chevron-right" size="22" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主內容區塊 (對照 SSSSS 主流) -->
    <main class="main-content-flow px-6 px-md-8 pb-12">
      <!-- 即時災情即時短波提醒 Banner (對照 SSSSS 災情通報) -->
      <section class="live-alert-ticker mb-6">
        <div class="ticker-badge">
          <v-icon color="#EF4628" icon="mdi-alert-circle" size="18" />
          <span>災情通報</span>
        </div>

        <div class="ticker-text">
          【強震警戒】東部外海發生規模 6.2 強震，請民眾落實「趴下、掩護、穩住」抗震三原則。
        </div>
      </section>

      <!-- 4. 災防新知條列 (一列 4 條，對照 SSSSS RWD Breakpoints) -->
      <section class="content-section news-section mb-10 mb-md-12">
        <div class="section-header d-flex align-center justify-space-between mb-4 mb-md-6">
          <div class="section-title-wrap d-flex align-center">
            <div class="title-accent-bar mr-3" />
            <h2 class="section-title mb-0">災防新知</h2>
          </div>

          <router-link class="more-link d-flex align-center" to="/news">
            <span>more</span>
            <v-icon class="more-icon" icon="mdi-chevron-right" size="20" />
          </router-link>
        </div>

        <div class="cards-grid-4">
          <v-card
            v-for="news in latestNews"
            :key="news._id || news.id"
            class="news-card rounded-lg h-100"
            flat
            :to="'/news/' + (news._id || news.id || '')"
          >
            <!-- 4:3 Image ratio (垂直居中對齊與遮蔽溢出) -->
            <v-responsive aspect-ratio="1.3333" class="rounded-lg overflow-hidden">
              <v-img class="h-100 bg-grey-lighten-2" cover position="center center" :src="news.imageUrl || news.image" />
            </v-responsive>

            <v-card-text class="pa-4 d-flex flex-column">
              <span class="news-date mb-2">{{ news.date || (news.createdAt ? new Date(news.createdAt).toISOString().split('T')[0] : '') }}</span>

              <h3 class="news-title text-clamp-2" :title="news.title">
                {{ news.title }}
              </h3>
            </v-card-text>
          </v-card>
        </div>
      </section>

      <!-- 5. 防災商城產品列 (對照 SSSSS RWD Breakpoints) -->
      <section class="content-section shop-section mb-10 mb-md-12">
        <div class="section-header d-flex align-center justify-space-between mb-4 mb-md-6">
          <div class="section-title-wrap d-flex align-center">
            <div class="title-accent-bar mr-3" />
            <h2 class="section-title mb-0">災防商城</h2>
          </div>

          <router-link class="more-link d-flex align-center" to="/shop">
            <span>more</span>
            <v-icon class="more-icon" icon="mdi-chevron-right" size="20" />
          </router-link>
        </div>

        <div class="cards-grid-4">
          <v-card
            v-for="product in displayedProducts"
            :key="product._id"
            class="product-card rounded-lg h-100 d-flex flex-column cursor-pointer"
            flat
            :to="'/product/' + product._id"
          >
            <!-- 4:3 Image ratio (垂直居中對齊與遮蔽溢出) -->
            <v-responsive aspect-ratio="1.3333" class="rounded-lg overflow-hidden">
              <v-img class="h-100 bg-grey-lighten-2" cover position="center center" :src="product.imageUrl" />
            </v-responsive>

            <v-card-text class="pa-4 flex-grow-1 d-flex flex-column justify-space-between">
              <div>
                <h3 class="product-name text-clamp-2 mb-2" :title="product.name">
                  {{ product.name }}
                </h3>
              </div>

              <div class="d-flex align-center justify-space-between mt-2">
                <span class="product-price">NT$ {{ product.price.toLocaleString() }}</span>

                <v-btn
                  color="secondary"
                  icon="mdi-cart-plus"
                  size="small"
                  title="加入購物車"
                  variant="tonal"
                  @click.stop.prevent="handleAddToCart(product)"
                />
              </div>
            </v-card-text>
          </v-card>
        </div>
      </section>

      <!-- 6. 防災遊戲圖片卡片 (對照 SSSSS RWD 滿版彈性版面) -->
      <section class="content-section game-banner-section">
        <router-link class="game-interactive-card rounded-xl" to="/game">
          <div class="game-card-inner">
            <div class="game-card-text">
              <span class="game-chip">
                <v-icon class="mr-1" icon="mdi-gamepad-variant" size="16" />
                互動寓教於樂小遊戲
              </span>

              <h3 class="game-headline">防災生存大作戰：黃金72小時避難包大挑戰！</h3>

              <p class="game-subhead">
                面對突發強烈地震，你能限時打包正確的應急救命物資嗎？立即測驗你的防災求生指數！
              </p>

              <div class="game-play-btn">
                <span>開始遊戲挑戰 ▶</span>
              </div>
            </div>

            <div class="game-card-illu">
              <div class="illu-circle">
                <v-icon color="#FFD800" icon="mdi-gamepad-variant" size="56" />
              </div>
            </div>
          </div>
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import type { IProduct } from '@/types/product'
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGetQuery as useGetKnowledge } from '@/quries/knowledge'
  import { useGetQuery as useGetProducts } from '@/quries/product'
  import { useAddCartMutation } from '@/quries/user'
  import { defaultNewsList, useNewsStore } from '@/stores/news'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const user = useUserStore()
  const router = useRouter()
  const snackbar = useSnackbarStore()
  const newsStore = useNewsStore()
  const { mutateAsync: addCartMutate } = useAddCartMutation()
  const { data: productsData } = useGetProducts()
  const { data: knowledgeData } = useGetKnowledge()

  // 主視覺 Studio Carousel 輪播控制
  const heroSlideIndex = ref(0)
  const isHeroTransitioning = ref(true)
  let heroTimer: ReturnType<typeof setInterval> | null = null

  function nextHeroSlide () {
    isHeroTransitioning.value = true
    heroSlideIndex.value++
    if (heroSlideIndex.value >= 4) {
      setTimeout(() => {
        isHeroTransitioning.value = false
        heroSlideIndex.value = 0
      }, 800)
    }
  }

  function prevHeroSlide () {
    isHeroTransitioning.value = true
    if (heroSlideIndex.value === 0) {
      heroSlideIndex.value = 3
    } else {
      heroSlideIndex.value--
    }
  }

  function startHeroAutoPlay () {
    stopHeroAutoPlay()
    heroTimer = setInterval(() => {
      nextHeroSlide()
    }, 4500)
  }

  function stopHeroAutoPlay () {
    if (heroTimer) {
      clearInterval(heroTimer)
      heroTimer = null
    }
  }

  onMounted(() => {
    startHeroAutoPlay()
  })

  onUnmounted(() => {
    stopHeroAutoPlay()
  })

  // 4. 動態連結災防知識最新 4 篇文章 (比照 Product 從後端獲取，並有預設備援)
  const latestNews = computed(() => {
    const list = knowledgeData.value && knowledgeData.value.length > 0 ? knowledgeData.value : defaultNewsList
    return list.filter((item: any) => item.published !== false).slice(0, 4)
  })

  // Fallback product items if backend is empty
  const fallbackProducts: IProduct[] = [
    {
      _id: 'p1',
      name: '多功能防災應變收音機與手搖發電手電筒組',
      price: 1280,
      description: '具備手搖發電、太陽能充電與緊急SOS警報器機能',
      category: '生活用品',
      sell: true,
      image: 'shop1.jpg',
      imageUrl: 'https://picsum.photos/seed/shop1/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    {
      _id: 'p2',
      name: '高強度頭部防護防災避難安全帽 (黃色款)',
      price: 650,
      description: '符合國家安全檢驗標準，輕巧耐衝擊',
      category: '防身用品',
      sell: true,
      image: 'shop2.jpg',
      imageUrl: 'https://picsum.photos/seed/shop2/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    {
      _id: 'p3',
      name: '全家必備家庭式72小時緊急避難背包豪華組',
      price: 2450,
      description: '含急救包、保暖毯、水質淨化錠及備用糧食',
      category: '生活用品',
      sell: true,
      image: 'shop3.jpg',
      imageUrl: 'https://picsum.photos/seed/shop3/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    {
      _id: 'p4',
      name: '可保存5年長期保存應變戰備乾糧餅乾箱裝',
      price: 890,
      description: '高熱量易保存，緊急災變時期迅速補充能量',
      category: '避難食物',
      sell: true,
      image: 'shop4.jpg',
      imageUrl: 'https://picsum.photos/seed/shop4/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
  ]

  const displayedProducts = computed(() => {
    if (productsData.value && productsData.value.length >= 4) {
      return productsData.value.slice(0, 4)
    }
    if (productsData.value && productsData.value.length > 0) {
      return [...productsData.value, ...fallbackProducts].slice(0, 4)
    }
    return fallbackProducts
  })

  async function handleAddToCart (product: IProduct) {
    if (!user.isLoggedIn) {
      router.push('/login')
      return
    }
    if (!/^[0-9a-f]{24}$/i.test(product._id)) {
      snackbar.add({ text: '此為示範商品，無法加入購物車', color: 'warning' })
      return
    }
    try {
      await addCartMutate({ product: product._id, quantity: 1, replace: false })
      snackbar.add({ text: '已加入購物車', color: 'green' })
    } catch (error) {
      snackbar.addError(error)
    }
  }
</script>

<style scoped>
.home-page-container {
  background-color: #ECECF2;
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
}

/* 3. Hero Banner */
.hero-banner-section {
  width: 100%;
  overflow: hidden;
  margin-top: -72px;
  position: relative;
  z-index: 1;
}

.hero-banner-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.hero-studio-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #1e1e2d;
}

.hero-carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

/* Individual Studio Slide Container */
.hero-studio-carousel [data-s-6f9f037f-fe01-40ea-9c44-523242ada0d6] {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Studio Design Base SD Elements & Pseudo-element Images */
:deep(.sd), .sd {
  position: relative;
  width: 100%;
  height: 100%;
}

:deep(.sd.image), .sd.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

:deep(.sd.image::before), .sd.image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: block;
}

/* Studio Design Background Image Pseudo-element Rules */
.sd[data-r-1_-2_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be]::before {
  background-image: url("/images/index_01.jpg");
}
.sd[data-r-1_-1_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be]::before {
  background-image: url("/images/index_02.jpg");
}
.sd[data-r-1_0_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be]::before {
  background-image: url("/images/index_03.jpg");
}
.sd[data-r-1_1_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be]::before {
  background-image: url("/images/index_04.jpg");
}
.sd[data-r-1_2_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be]::before {
  background-image: url("/images/index_05.jpg");
}
.sd[data-r-1_3_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be]::before {
  background-image: url("/images/index_06.jpg");
}
.sd[data-r-1_4_1_2_e85daafc-b4b3-4613-9bc9-b081034ba5be]::before {
  background-image: url("/images/index_07.jpg");
}

/* Hero Content Text Overlay */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(30, 30, 58, 0.8) 0%,
    rgba(30, 30, 58, 0.45) 55%,
    rgba(0, 0, 0, 0.0) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 64px;
  z-index: 10;
  box-sizing: border-box;
}

.hero-content-box {
  max-width: 620px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  z-index: 12;
}

.hero-badge {
  background-color: #FFD800;
  color: #3C3C5A;
  font-size: 13px;
  font-weight: 800;
  padding: 4px 14px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 40px;
  font-weight: 900;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.25;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  letter-spacing: 1px;
}

.hero-subtitle {
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

.hero-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #FFD800;
  color: #3C3C5A;
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 216, 0, 0.35);
  transition: all 0.25s ease;
  margin-top: 6px;
}

.hero-cta-btn:hover {
  background-color: #FFFFFF;
  color: #3C3C5A;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.45);
}

/* Controls */
.hero-carousel-controls {
  position: absolute;
  bottom: 24px;
  right: 48px;
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 12;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-arrow {
  background: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.hero-arrow:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

.hero-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-dot.active {
  background-color: #FFD800;
  width: 24px;
  border-radius: 5px;
}

/* 即時災情 Ticker (對照 SSSSS 災情通報) */
.live-alert-ticker {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.ticker-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 800;
  color: #EF4628;
  white-space: nowrap;
}

.ticker-text {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: #3C3C5A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Section Header & Title */
.section-title {
  font-size: 24px;
  font-weight: 800;
  color: #3C3C5A;
  letter-spacing: -0.3px;
}

.title-accent-bar {
  width: 6px;
  height: 24px;
  background-color: #FFD800;
  border-radius: 3px;
}

/* more 按鈕 (對照 SSSSS 滿版填滿 Hover 動態效果) */
.more-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  font-size: 16px;
  font-weight: 400;
  color: #3C3C5A;
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
  white-space: nowrap;
  border-radius: 6px;
}

.more-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3C3C5A;
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease-out;
}

.more-link:hover::before {
  transform: scaleX(1);
}

.more-link span {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease-out;
}

.more-icon {
  position: relative;
  z-index: 1;
  color: #3C3C5A;
  transition: color 0.3s ease-out;
}

.more-link:hover span,
.more-link:hover .more-icon {
  color: #FFFFFF !important;
}

/* 一列四個卡片 Grid (對照 SSSSS RWD Breakpoints) */
.cards-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.news-card, .product-card {
  background-color: #FFFFFF !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-card:hover, .product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
}

.news-date {
  font-size: 13px;
  color: #8C90AB;
  font-weight: 500;
}

.news-title, .product-name {
  font-size: 16px;
  font-weight: bold;
  color: #3C3C5A;
  line-height: 1.4;
}

.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #EF4628;
}

/* 6. 防災遊戲卡片 (對照 SSSSS 風格) */
.game-interactive-card {
  display: block;
  text-decoration: none;
  background: linear-gradient(135deg, #3C3C5A 0%, #2A2A48 100%);
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(60, 60, 90, 0.2);
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}

.game-interactive-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(60, 60, 90, 0.3);
}

.game-card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 40px;
}

.game-card-text {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.game-chip {
  display: inline-flex;
  align-items: center;
  background-color: #FFD800;
  color: #3C3C5A;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 800;
  width: fit-content;
}

.game-headline {
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.game-subhead {
  font-size: 14px;
  color: #ECECF2;
  margin: 0;
  line-height: 1.5;
}

.game-play-btn {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  background-color: #ffffff;
  color: #3C3C5A;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 800;
  width: fit-content;
  transition: background-color 0.2s ease;
}

.game-interactive-card:hover .game-play-btn {
  background-color: #FFD800;
}

.game-card-illu {
  display: flex;
  align-items: center;
  justify-content: center;
}

.illu-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(255, 216, 0, 0.15);
  border: 2px dashed #FFD800;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* RWD Media Queries (對照 SSSSS 資料夾 Breakpoints) */
@media (max-width: 1200px) {
  .cards-grid-4 {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 959px) {
  .hero-banner-section {
    margin-top: 0px;
    height: calc(100vh - 106px);
  }
  .hero-banner-wrapper {
    /* height: 380px; */
    height: calc(100vh - 106px);
  }
  .hero-overlay {
    padding-top:10%;
    padding-left: 32px;
    /* padding: 0 32px; */
    background: linear-gradient(
    0deg,
    rgba(30, 30, 58, 0.8) 0%,
    rgba(30, 30, 58, 0.45) 55%,
    rgba(0, 0, 0, 0.0) 100%
  );
  }
  .hero-title {
    font-size: 28px;
  }
  .hero-subtitle {
    font-size: 15px;
  }
  .hero-carousel-controls {
    right: 24px;
    bottom: 16px;
  }
  .main-content-flow {
    padding: 32px;
  }
  .cards-grid-4 {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .game-card-inner {
    flex-direction: column;
    padding: 24px;
    text-align: center;
    align-items: center;
  }
  .game-card-text {
    align-items: center;
  }
  .game-card-illu {
    margin-top: 16px;
  }
}

@media (max-width: 599px) {
  .hero-banner-wrapper {
    /* height: 320px; */
    height: calc(100vh - 106px);
  }
  .hero-title {
    font-size: 22px;
  }
  .hero-subtitle {
    font-size: 13px;
  }
  .hero-cta-btn {
    padding: 8px 20px;
    font-size: 14px;
  }
  .section-title {
    font-size: 20px;
  }
  .ticker-text {
    font-size: 13px;
  }
}
</style>

<route lang="yaml">
meta:
  title: 首頁
</route>
