<template>
  <div class="home-page-container">
    <!-- 3. 形象圖片滿版顯示 (寬度扣除主選單 240px，隨滾動移動視窗下移) -->
    <section class="hero-banner-section mb-8">
      <div class="hero-banner-wrapper">
        <svg
          class="hero-banner-svg"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3C3C5A" />
              <stop offset="50%" stop-color="#4B4B6E" />
              <stop offset="100%" stop-color="#17D7BA" />
            </linearGradient>
            <linearGradient id="yellowAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFD800" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#FFD800" stop-opacity="0" />
            </linearGradient>
          </defs>
          <rect width="1200" height="400" fill="url(#heroGradient)" />
          <!-- Decorative shapes -->
          <circle cx="1050" cy="80" r="180" fill="url(#yellowAccent)" />
          <path d="M-50 320 Q 300 240, 650 340 T 1300 300" fill="none" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="40" />
          <path d="M0 360 Q 400 280, 800 380 T 1250 320" fill="none" stroke="#17D7BA" stroke-opacity="0.25" stroke-width="20" />
          
          <!-- Banner Hero Text Content -->
          <text x="80" y="150" fill="#FFD800" font-size="44" font-weight="900" letter-spacing="2">全民防災，智慧守護</text>
          <text x="80" y="210" fill="#FFFFFF" font-size="24" font-weight="500">即時掌握災害新知與避難資訊 ‧ 打造最堅固的安全防護網</text>
          
          <!-- Badge overlay -->
          <rect x="80" y="250" width="220" height="48" rx="24" fill="#FFD800" />
          <text x="190" y="281" fill="#3C3C5A" font-size="18" font-weight="bold" text-anchor="middle">探索防災專區</text>
        </svg>
      </div>
    </section>

    <v-container fluid class="px-8 pb-12">
      <!-- 4. 災防新知條列 (一列 4 條，圖片 4:3，日期，標題最多 2 行顯示...) -->
      <section class="news-section mb-12">
        <div class="section-header d-flex align-center justify-space-between mb-6">
          <div class="section-title-wrap d-flex align-center">
            <div class="title-accent-bar mr-3"></div>
            <h2 class="section-title">災防新知</h2>
          </div>
          <router-link to="/news" class="more-link d-flex align-center">
            more <v-icon icon="mdi-chevron-right" size="18" />
          </router-link>
        </div>

        <v-row>
          <v-col
            v-for="news in latestNews"
            :key="news.id"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card flat class="news-card rounded-lg h-100" :to="'/news/' + news.id">
              <!-- 4:3 Image ratio -->
              <v-responsive aspect-ratio="1.3333">
                <v-img :src="news.image" cover class="h-100 bg-grey-lighten-2" />
              </v-responsive>
              <v-card-text class="pa-4 d-flex flex-column">
                <span class="news-date mb-2">{{ news.date }}</span>
                <h3 class="news-title text-clamp-2" :title="news.title">
                  {{ news.title }}
                </h3>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- 5. 防災商城產品列 (一列 4 個，圖片 4:3，商品名稱最多 2 行顯示...，價格) -->
      <section class="shop-section mb-12">
        <div class="section-header d-flex align-center justify-space-between mb-6">
          <div class="section-title-wrap d-flex align-center">
            <div class="title-accent-bar mr-3"></div>
            <h2 class="section-title">防災商城</h2>
          </div>
          <router-link to="/shop" class="more-link d-flex align-center">
            more <v-icon icon="mdi-chevron-right" size="18" />
          </router-link>
        </div>

        <v-row>
          <v-col
            v-for="product in displayedProducts"
            :key="product._id"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card flat class="product-card rounded-lg h-100 d-flex flex-column">
              <!-- 4:3 Image ratio -->
              <v-responsive aspect-ratio="1.3333">
                <v-img :src="product.imageUrl" cover class="h-100 bg-grey-lighten-2" />
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
                    icon="mdi-cart-plus"
                    size="small"
                    color="secondary"
                    variant="tonal"
                    title="加入購物車"
                    @click.stop="handleAddToCart(product)"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- 6. 防災遊戲圖片 (引導點進防災遊戲頁面) -->
      <section class="game-banner-section mb-12">
        <router-link to="/game" class="game-banner-link">
          <div class="game-banner-wrapper rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 1000 220"
              preserveAspectRatio="xMidYMid slice"
              class="w-100 h-100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="1000" height="220" fill="#3C3C5A" />
              <!-- Background patterns -->
              <circle cx="900" cy="110" r="160" fill="#17D7BA" opacity="0.2" />
              <circle cx="100" cy="20" r="90" fill="#FFD800" opacity="0.15" />
              <path d="M 0 180 Q 250 80 500 180 T 1000 140" fill="none" stroke="#FFD800" stroke-width="8" opacity="0.3" />

              <!-- Game illustration elements -->
              <g transform="translate(750, 45)">
                <!-- Gamepad icon representation -->
                <rect x="0" y="0" width="160" height="110" rx="30" fill="#17D7BA" />
                <circle cx="45" cy="55" r="16" fill="#3C3C5A" />
                <path d="M 45 44 V 66 M 34 55 H 56" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" />
                <circle cx="115" cy="40" r="10" fill="#EF4628" />
                <circle cx="130" cy="65" r="10" fill="#FFD800" />
                <circle cx="100" cy="70" r="10" fill="#3C3C5A" />
              </g>

              <!-- Text Content -->
              <text x="80" y="90" fill="#FFD800" font-size="36" font-weight="900">🎮 防災小英雄 ‧ 闖關大冒險</text>
              <text x="80" y="135" fill="#FFFFFF" font-size="20" font-weight="500">透過趣味互動遊戲，學習正確地震與火災避難小常識！</text>

              <!-- Button CTA -->
              <g transform="translate(80, 155)">
                <rect width="180" height="42" rx="21" fill="#FFD800" />
                <text x="90" y="27" fill="#3C3C5A" font-size="16" font-weight="bold" text-anchor="middle">立即開始遊戲 ▶</text>
              </g>
            </svg>
          </div>
        </router-link>
      </section>
    </v-container>

    <!-- 7. 下方版權說明 (底色 #8C90AB，寬度 100vw - 240px，高度 88px，文字居中對齊，文字顏色 #FFFFFF) -->
    <footer class="site-footer d-flex align-center justify-center">
      <p class="copyright-text mb-0">
        © 2026 防災資訊與應變專區 ‧ 版權所有 All Rights Reserved.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import type { IProduct } from '@/types/product'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGetQuery, useGetQuery as useGetProducts } from '@/quries/product'
  import { useAddCartMutation } from '@/quries/user'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const user = useUserStore()
  const router = useRouter()
  const snackbar = useSnackbarStore()
  const { mutateAsync: addCartMutate } = useAddCartMutation()
  const { data: productsData } = useGetProducts()

  // 4. Mock disaster news (4 items for 1 row)
  const latestNews = [
    {
      id: 1,
      date: '2026-08-28',
      title: '防範強震來襲！居家防災家具固定與緊急避難包準備指南規範說明',
      image: 'https://picsum.photos/seed/disaster1/600/450',
    },
    {
      id: 2,
      date: '2026-08-22',
      title: '極端氣候防汛動員：各地水利署防汛演練與最新淹水警戒系統升級通知',
      image: 'https://picsum.photos/seed/disaster2/600/450',
    },
    {
      id: 3,
      date: '2026-08-15',
      title: '火災避難新觀念：「趴下、掩護、穩住」與關門避難安全示範',
      image: 'https://picsum.photos/seed/disaster3/600/450',
    },
    {
      id: 4,
      date: '2026-08-09',
      title: '國家級警報測試及各縣市應變中心連線運作狀況綜合報告',
      image: 'https://picsum.photos/seed/disaster4/600/450',
    },
  ]

  // Fallback product items if backend is empty
  const fallbackProducts: IProduct[] = [
    {
      _id: 'p1',
      name: '多功能防災應變收音機與手搖發電手電筒組',
      price: 1280,
      description: '具備手搖發電、太陽能充電與緊急SOS警報器機能',
      category: '3C',
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
      category: '3C',
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
      category: '食品',
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
      category: '食品',
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
}

.hero-banner-wrapper {
  width: 100%;
  max-height: 400px;
  display: block;
}

.hero-banner-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Section Header & Title */
.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #3C3C5A;
}

.title-accent-bar {
  width: 6px;
  height: 24px;
  background-color: #FFD800;
  border-radius: 3px;
}

.more-link {
  font-size: 16px;
  font-weight: bold;
  color: #8C90AB;
  text-decoration: none;
  transition: color 0.2s ease;
}

.more-link:hover {
  color: #3C3C5A;
}

/* 4 & 5. News & Product Cards */
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

/* CSS Line-clamp for maximum 2 lines truncation */
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

/* 6. Game Banner */
.game-banner-link {
  display: block;
  text-decoration: none;
}

.game-banner-wrapper {
  height: 220px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.game-banner-wrapper:hover {
  transform: scale(1.01);
}

/* 7. Copyright Footer */
.site-footer {
  background-color: #8C90AB;
  width: 100%;
  height: 88px;
  margin-top: auto;
}

.copyright-text {
  font-size: 15px;
  color: #FFFFFF;
  text-align: center;
  font-weight: 400;
}
</style>
