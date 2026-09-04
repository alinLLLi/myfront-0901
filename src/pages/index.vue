<template>
  <div class="home-page-container">
    <!-- 3. 形象圖片滿版顯示 (寬度扣除主選單 240px，隨滾動移動視窗下移) -->
    <section class="hero-banner-section mb-6 mb-md-8">
      <div class="hero-banner-wrapper">
        <svg
          class="hero-banner-svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="heroGradient"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#3C3C5A" />
              <stop offset="50%" stop-color="#4B4B6E" />
              <stop offset="100%" stop-color="#17D7BA" />
            </linearGradient>

            <linearGradient
              id="yellowAccent"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stop-color="#FFD800" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#FFD800" stop-opacity="0" />
            </linearGradient>
          </defs>

          <rect fill="url(#heroGradient)" height="400" width="1200" />
          <!-- Decorative shapes -->
          <circle cx="1050" cy="80" fill="url(#yellowAccent)" r="180" />

          <path
            d="M-50 320 Q 300 240, 650 340 T 1300 300"
            fill="none"
            stroke="#FFFFFF"
            stroke-opacity="0.15"
            stroke-width="40"
          />

          <path
            d="M0 360 Q 400 280, 800 380 T 1250 320"
            fill="none"
            stroke="#17D7BA"
            stroke-opacity="0.25"
            stroke-width="20"
          />

          <!-- Banner Hero Text Content -->
          <text
            fill="#FFD800"
            font-size="44"
            font-weight="900"
            letter-spacing="2"
            x="80"
            y="150"
          >全民防災，智慧守護</text>

          <text
            fill="#FFFFFF"
            font-size="24"
            font-weight="500"
            x="80"
            y="210"
          >即時掌握災害新知與避難資訊 ‧ 打造最堅固的安全防護網</text>

          <!-- Badge overlay -->
          <rect
            fill="#FFD800"
            height="48"
            rx="24"
            width="220"
            x="80"
            y="250"
          />

          <text
            fill="#3C3C5A"
            font-size="18"
            font-weight="bold"
            text-anchor="middle"
            x="190"
            y="281"
          >探索防災專區</text>
        </svg>
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
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGetQuery as useGetProducts } from '@/quries/product'
  import { useGetQuery as useGetKnowledge } from '@/quries/knowledge'
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
  display: block;
}

.hero-banner-svg {
  width: 100%;
  height: 100%;
  display: block;
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
    margin-top: -104px;
  }
  .main-content-flow {
    padding: 32px;
  }
  .cards-grid-4 {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .hero-banner-wrapper {
    height: 100vh;
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
