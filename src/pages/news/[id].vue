<template>
  <v-container fluid class="pa-4 pa-md-8 page-container">
    <!-- 頂部返回按鈕與路徑標題 -->
    <div class="d-flex align-center justify-space-between mb-6">
      <v-btn
        to="/news"
        variant="text"
        color="secondary"
        class="back-btn font-weight-bold"
      >
        <v-icon icon="mdi-arrow-left" size="20" class="mr-1" />
        返回災防知識列表
      </v-btn>

      <div class="d-flex align-center ga-2">
        <v-btn
          icon
          variant="tonal"
          color="secondary"
          size="small"
          title="分享文章"
          @click="handleShare"
        >
          <v-icon icon="mdi-share-variant" size="18" />
        </v-btn>
        <v-btn
          icon
          variant="tonal"
          color="secondary"
          size="small"
          title="收藏文章"
          @click="handleBookmark"
        >
          <v-icon :icon="isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" size="18" :color="isBookmarked ? '#FFD800' : ''" />
        </v-btn>
        <v-btn
          icon
          variant="tonal"
          color="secondary"
          size="small"
          title="列印內容"
          @click="handlePrint"
        >
          <v-icon icon="mdi-printer" size="18" />
        </v-btn>
      </div>
    </div>

    <!-- 文章載入中 -->
    <div v-if="loading" class="text-center py-12">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="mt-4 text-grey">讀取災防知識資料中...</p>
    </div>

    <!-- 找不到文章 -->
    <v-card v-else-if="!article" flat class="pa-8 text-center rounded-lg bg-white">
      <v-icon icon="mdi-file-alert-outline" size="64" color="warning" class="mb-4" />
      <h2 class="text-h6 font-weight-bold color-dark mb-2">找不到該篇災防知識文章</h2>
      <p class="text-body-2 text-grey mb-6">您查詢的內容可能已被移除或網址有誤。</p>
      <v-btn to="/news" color="primary" class="font-weight-bold">
        返回列表頁面
      </v-btn>
    </v-card>

    <!-- 文章內頁主要區塊 -->
    <article v-else class="article-content-wrapper">
      <!-- 1. 文章標頭與 Meta 資訊 -->
      <header class="article-header mb-6">
        <div class="d-flex align-center ga-3 mb-3 flex-wrap">
          <span class="category-pill">{{ article.category }}</span>
          <span class="date-text d-flex align-center text-grey fs-14">
            <v-icon icon="mdi-clock-outline" size="16" class="mr-1" />
            {{ article.date }}
          </span>
          <span class="read-time d-flex align-center text-grey fs-14">
            <v-icon icon="mdi-book-open-outline" size="16" class="mr-1" />
            預計閱讀時間：3 分鐘
          </span>
        </div>

        <h1 class="article-main-title mb-4">
          {{ article.title }}
        </h1>

        <!-- 摘要簡述引言盒 -->
        <div class="article-summary-box pa-4 rounded-lg">
          <p class="summary-text mb-0">
            <v-icon icon="mdi-format-quote-open" size="20" color="#3C3C5A" class="mr-1" />
            {{ article.summary }}
          </p>
        </div>
      </header>

      <!-- 2. 主圖封面展示 (4:3 比例與垂直居中遮蔽) -->
      <div class="hero-image-wrapper mb-8 rounded-lg overflow-hidden">
        <v-responsive aspect-ratio="1.3333">
          <v-img
            :src="article.image"
            cover
            position="center center"
            class="hero-img h-100"
            alt="災防知識封面圖"
          />
        </v-responsive>
      </div>

      <!-- 3. 正文內容區 -->
      <section class="article-body color-dark mb-10">
        <h3 class="section-heading mb-3">一、核心避難觀念與說明</h3>
        <p class="paragraph-text mb-4">
          在遭遇極端天然災害時，應變黃金時間通常僅有短短數秒至數分鐘。熟悉正確的應變與防護步驟，能有效減低人身傷害與財產損失風險。
        </p>

        <v-row class="my-4">
          <v-col cols="12" md="4">
            <v-card flat class="step-card pa-4 rounded-lg h-100">
              <div class="step-num mb-2">01</div>
              <h4 class="step-title mb-2">趴下 (Drop)</h4>
              <p class="step-desc mb-0">立即雙手雙膝著地，避免強烈震動導致摔倒摔傷。</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card flat class="step-card pa-4 rounded-lg h-100">
              <div class="step-num mb-2">02</div>
              <h4 class="step-title mb-2">掩護 (Cover)</h4>
              <p class="step-desc mb-0">尋找堅固桌子或桌腳躲避，保護頭部與頸部安全。</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card flat class="step-card pa-4 rounded-lg h-100">
              <div class="step-num mb-2">03</div>
              <h4 class="step-title mb-2">穩住 (Hold on)</h4>
              <p class="step-desc mb-0">緊握桌腳直到劇烈搖晃停止，避免桌面位移造成曝露。</p>
            </v-card>
          </v-col>
        </v-row>

        <h3 class="section-heading mt-8 mb-3">二、建議儲備防護物資清單</h3>
        <p class="paragraph-text mb-4">
          家庭緊急避難包應擺放在靠近出入口處，確保急難時能「一提即走」。內容物應每半年定時檢查更換維護。
        </p>

        <div class="checklist-wrapper pa-4 pa-md-6 rounded-lg mb-6">
          <div class="checklist-grid d-grid">
            <div class="checklist-item d-flex align-center">
              <v-icon icon="mdi-checkbox-marked-circle" color="#17D7BA" class="mr-2" />
              <span>維持 3 天份高熱量戰備口糧與飲用水 (每人每天 3L)</span>
            </div>
            <div class="checklist-item d-flex align-center">
              <v-icon icon="mdi-checkbox-marked-circle" color="#17D7BA" class="mr-2" />
              <span>照明設備：LED 手電筒、備用電池、高分貝哨子</span>
            </div>
            <div class="checklist-item d-flex align-center">
              <v-icon icon="mdi-checkbox-marked-circle" color="#17D7BA" class="mr-2" />
              <span>緊急醫療用品：包紮繃帶、消毒棉片、個人慢性病必備藥物</span>
            </div>
            <div class="checklist-item d-flex align-center">
              <v-icon icon="mdi-checkbox-marked-circle" color="#17D7BA" class="mr-2" />
              <span>保暖及清潔物資：保暖毯、防雨外套、濕紙巾與口罩</span>
            </div>
          </div>
        </div>

        <h3 class="section-heading mt-8 mb-3">三、專家叮嚀與防災即時提醒</h3>
        <p class="paragraph-text mb-6">
          當氣象局或消防署發佈即時警報時，請保持冷靜，切勿聽信謠言或未經證實之網路傳言。請隨時鎖定官方廣播與內政部消防署「防災有熊樣」相關通報管道。
        </p>

        <!-- 按鈕動作區 -->
        <div class="d-flex align-center justify-center ga-4 py-6 border-top border-bottom my-8 flex-wrap">
          <v-btn
            to="/shop"
            color="primary"
            size="large"
            class="font-weight-bold px-6"
          >
            <v-icon icon="mdi-shield-check-outline" class="mr-2" />
            前往災防商城選購應變裝備
          </v-btn>
          <v-btn
            to="/disaster"
            variant="outlined"
            color="secondary"
            size="large"
            class="font-weight-bold px-6"
          >
            <v-icon icon="mdi-alert-circle" color="#EF4628" class="mr-2" />
            切換至災時極簡模式
          </v-btn>
        </div>
      </section>

      <!-- 4. 延伸推薦閱讀區塊 -->
      <section v-if="relatedArticles.length > 0" class="related-section mt-12">
        <div class="d-flex align-center mb-6">
          <div class="title-bar mr-3"></div>
          <h2 class="section-title mb-0">相關災防知識推薦</h2>
        </div>

        <v-row>
          <v-col
            v-for="item in relatedArticles"
            :key="item.id"
            cols="12"
            md="4"
          >
            <v-card
              flat
              class="related-card rounded-lg h-100 pa-2 cursor-pointer"
              @click="navigateToArticle(item.id)"
            >
              <v-responsive aspect-ratio="1.3333" class="rounded-lg overflow-hidden">
                <v-img :src="item.image" cover position="center center" class="h-100" />
              </v-responsive>
              <v-card-text class="pa-3">
                <span class="category-pill small mb-2 d-inline-block">{{ item.category }}</span>
                <h4 class="related-title text-clamp-2 mb-2" :title="item.title">
                  {{ item.title }}
                </h4>
                <span class="date-text fs-12 text-grey">{{ item.date }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </article>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { type INews, useNewsStore } from '@/stores/news'

  const route = useRoute('/news/[id]')
  const router = useRouter()
  const snackbar = useSnackbarStore()
  const newsStore = useNewsStore()

  const loading = ref(false)
  const isBookmarked = ref(false)

  // 取得路由網址上的文章 ID (例如 '1', 'news-1', 等)
  const articleId = computed(() => {
    return String(route.params.id || '1')
  })

  // 比對 store 中的文章資料
  const article = computed<INews | undefined>(() => {
    const rawId = articleId.value
    // 試圖尋找 ID 恰好等於 rawId 的文章 (例如 '1' 或 'news-1')
    let found = newsStore.newsList.find(n => n.id === rawId || n.id === `news-${rawId}`)
    if (!found) {
      // 若傳入純數字，尋找第 (Index - 1) 篇或是數值比對
      const numericIndex = Number.parseInt(rawId, 10)
      if (!Number.isNaN(numericIndex) && numericIndex > 0 && numericIndex <= newsStore.newsList.length) {
        found = newsStore.newsList[numericIndex - 1]
      }
    }
    // 若依然找不到，回傳預設第一篇文章
    return found || newsStore.newsList[0]
  })

  // 相關延伸閱讀 (排除了當前文章)
  const relatedArticles = computed(() => {
    if (!article.value) return []
    return newsStore.newsList
      .filter(item => item.id !== article.value?.id && item.published)
      .slice(0, 3)
  })

  function handleShare () {
    navigator.clipboard?.writeText(window.location.href)
    snackbar.add({ text: '已複製文章連結至剪貼簿', color: 'success' })
  }

  function handleBookmark () {
    isBookmarked.value = !isBookmarked.value
    snackbar.add({
      text: isBookmarked.value ? '已將文章加入收藏紀錄' : '已取消收藏',
      color: isBookmarked.value ? 'success' : 'info',
    })
  }

  function handlePrint () {
    window.print()
  }

  function navigateToArticle (id: string) {
    const cleanId = id.startsWith('news-') ? id.replace('news-', '') : id
    router.push(`/news/${cleanId}`)
  }

  watch(
    () => route.params.id,
    () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  )
</script>

<style scoped>
.page-container {
  max-width: 1080px;
  margin: 0 auto;
}

.article-content-wrapper {
  background-color: #FFFFFF;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.category-pill {
  background-color: #FFD800;
  color: #3C3C5A;
  font-size: 13px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
}

.category-pill.small {
  font-size: 11px;
  padding: 2px 8px;
}

.fs-14 {
  font-size: 14px;
}

.fs-12 {
  font-size: 12px;
}

.article-main-title {
  font-size: 30px;
  font-weight: 800;
  line-height: 1.35;
  color: #3C3C5A;
}

.article-summary-box {
  background-color: #F4F4F8;
  border-left: 5px solid #FFD800;
  color: #3C3C5A;
  font-size: 16px;
  line-height: 1.6;
}

.summary-text {
  font-weight: 500;
}

.hero-image-wrapper {
  max-height: 440px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.section-heading {
  font-size: 20px;
  font-weight: 800;
  color: #3C3C5A;
  border-left: 4px solid #17D7BA;
  padding-left: 10px;
}

.paragraph-text {
  font-size: 16px;
  line-height: 1.75;
  color: #4A4A68;
}

.step-card {
  background-color: #ECECF2 !important;
  border-top: 4px solid #FFD800;
  transition: transform 0.2s ease;
}

.step-card:hover {
  transform: translateY(-2px);
}

.step-num {
  font-size: 22px;
  font-weight: 900;
  color: #EF4628;
}

.step-title {
  font-size: 17px;
  font-weight: bold;
  color: #3C3C5A;
}

.step-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.checklist-wrapper {
  background-color: #F8F9FD;
  border: 1px solid #E0E0EC;
}

.checklist-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.checklist-item {
  font-size: 15px;
  font-weight: 600;
  color: #3C3C5A;
}

.title-bar {
  width: 6px;
  height: 22px;
  background-color: #FFD800;
  border-radius: 3px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #3C3C5A;
}

.related-card {
  background-color: #F8F9FD !important;
  border: 1px solid #ECECF2 !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08) !important;
}

.related-title {
  font-size: 15px;
  font-weight: bold;
  color: #3C3C5A;
  line-height: 1.4;
}

.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.border-top {
  border-top: 1px solid #ECECF2;
}

.border-bottom {
  border-bottom: 1px solid #ECECF2;
}

@media (max-width: 768px) {
  .article-content-wrapper {
    padding: 18px;
  }
  .article-main-title {
    font-size: 22px;
  }
}
</style>

<route lang="yaml">
meta:
  title: 災防知識詳細頁
</route>
