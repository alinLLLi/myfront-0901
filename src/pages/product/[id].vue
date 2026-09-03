<template>
  <v-container class="pa-4 pa-md-8 page-container" fluid>
    <!-- 頂部導航列與按鈕 -->
    <div class="d-flex align-center justify-space-between mb-6">
      <v-btn
        class="back-btn font-weight-bold"
        color="secondary"
        to="/shop"
        variant="text"
      >
        <v-icon class="mr-1" icon="mdi-arrow-left" size="20" />
        返回災防商城
      </v-btn>

      <div class="d-flex align-center ga-2">
        <v-btn
          color="secondary"
          icon
          size="small"
          title="分享商品"
          variant="tonal"
          @click="handleShare"
        >
          <v-icon icon="mdi-share-variant" size="18" />
        </v-btn>

        <v-btn
          color="secondary"
          icon
          size="small"
          title="加入收藏"
          variant="tonal"
          @click="handleFavorite"
        >
          <v-icon :color="isFavorite ? '#EF4628' : ''" :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'" size="18" />
        </v-btn>
      </div>
    </div>

    <!-- 載入狀態 -->
    <div v-if="isLoading" class="text-center py-12">
      <v-progress-circular color="primary" indeterminate size="48" />
      <p class="mt-4 text-grey">讀取防災商品資料中...</p>
    </div>

    <!-- 找不到商品 / 下架 -->
    <v-card v-else-if="!activeProduct || !activeProduct.sell" class="pa-8 text-center rounded-lg bg-white" flat>
      <v-icon class="mb-4" color="warning" icon="mdi-package-variant-remove" size="64" />
      <h2 class="text-h6 font-weight-bold color-dark mb-2">商品暫無供應或已下架</h2>
      <p class="text-body-2 text-grey mb-6">您查看的防災物資暫時無法供貨或網址無效。</p>

      <v-btn class="font-weight-bold" color="primary" to="/shop">
        返回災防商城
      </v-btn>
    </v-card>

    <!-- 商品詳細內容主區塊 -->
    <div v-else class="product-detail-wrapper">
      <v-row>
        <!-- 左側：商品大圖與規格特點標籤 -->
        <v-col cols="12" md="6">
          <div class="product-gallery-card pa-4 rounded-xl bg-white mb-4">
            <v-responsive aspect-ratio="1.3333" class="rounded-lg overflow-hidden">
              <v-img
                :alt="activeProduct.name"
                class="product-main-img h-100"
                cover
                position="center center"
                :src="activeProduct.imageUrl"
              />
            </v-responsive>
          </div>

          <!-- 防災認證標籤盒 -->
          <div class="d-flex ga-3 flex-wrap">
            <div class="spec-pill flex-1 d-flex align-center justify-center pa-3 rounded-lg bg-white">
              <v-icon class="mr-2" color="#17D7BA" icon="mdi-shield-check" size="20" />
              <span class="fs-13 font-weight-bold color-dark">SGS 檢驗合格</span>
            </div>

            <div class="spec-pill flex-1 d-flex align-center justify-center pa-3 rounded-lg bg-white">
              <v-icon class="mr-2" color="#3C3C5A" icon="mdi-truck-fast-outline" size="20" />
              <span class="fs-13 font-weight-bold color-dark">24H 優先出貨</span>
            </div>

            <div class="spec-pill flex-1 d-flex align-center justify-center pa-3 rounded-lg bg-white">
              <v-icon class="mr-2" color="#FFD800" icon="mdi-certificate-outline" size="20" />
              <span class="fs-13 font-weight-bold color-dark">3年 極限品質保固</span>
            </div>
          </div>
        </v-col>

        <!-- 右側：商品資訊與操作面板 -->
        <v-col cols="12" md="6">
          <div class="product-info-card pa-6 rounded-xl bg-white h-100 d-flex flex-column justify-space-between">
            <div>
              <div class="d-flex align-center justify-space-between mb-3">
                <span class="category-badge px-3 py-1 rounded-pill">{{ activeProduct.category }}</span>

                <span class="stock-badge d-flex align-center">
                  <v-icon class="mr-1" color="#17D7BA" icon="mdi-check-circle" size="16" />
                  現貨供應中
                </span>
              </div>

              <h1 class="product-main-title mb-4">
                {{ activeProduct.name }}
              </h1>

              <!-- 價格區塊 -->
              <div class="price-box pa-4 rounded-lg mb-6">
                <div class="d-flex align-baseline ga-2">
                  <span class="currency-symbol">NT$</span>
                  <span class="price-amount">{{ activeProduct.price.toLocaleString() }}</span>
                  <span class="text-caption text-grey ml-2">（含稅與安全防護包裝）</span>
                </div>
              </div>

              <!-- 商品簡介說明 -->
              <div class="description-text mb-6">
                <p class="mb-0 text-grey-darken-2 fs-15">
                  {{ activeProduct.description }}
                </p>
              </div>

              <!-- 數量控制器 -->
              <div class="quantity-section mb-6">
                <label class="qty-label mb-2 d-block font-weight-bold">購買數量：</label>

                <div class="d-flex align-center ga-3">
                  <div class="quantity-controller d-flex align-center">
                    <button
                      class="qty-btn"
                      :disabled="quantity <= 1"
                      @click="quantity > 1 && quantity--"
                    >
                      <v-icon icon="mdi-minus" size="16" />
                    </button>

                    <input
                      v-model.number="quantity"
                      class="qty-input text-center"
                      max="99"
                      min="1"
                      type="number"
                    >

                    <button
                      class="qty-btn"
                      @click="quantity < 99 && quantity++"
                    >
                      <v-icon icon="mdi-plus" size="16" />
                    </button>
                  </div>

                  <span class="text-caption text-grey">每筆訂單限購 99 件</span>
                </div>
              </div>
            </div>

            <!-- 按鈕動作區 -->
            <div class="action-buttons-group d-flex ga-3 flex-column flex-sm-row">
              <v-btn
                class="flex-1 font-weight-bold btn-cart"
                color="secondary"
                :loading="isSubmitting"
                prepend-icon="mdi-cart-plus"
                size="x-large"
                @click="handleAddToCart"
              >
                加入購物車
              </v-btn>

              <v-btn
                class="flex-1 font-weight-bold btn-buy"
                color="primary"
                :loading="isSubmitting"
                prepend-icon="mdi-flash"
                size="x-large"
                @click="handleBuyNow"
              >
                立即購買
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- 下方詳細規格與防災應變說明 Tab 分頁 -->
      <section class="detail-tabs-section mt-10">
        <v-card class="rounded-xl overflow-hidden bg-white" flat>
          <v-tabs v-model="tab" bg-color="#F8F9FD" color="secondary" grow>
            <v-tab class="font-weight-bold" value="specs">
              <v-icon class="mr-2" icon="mdi-text-box-outline" />
              商品詳細規格
            </v-tab>

            <v-tab class="font-weight-bold" value="guide">
              <v-icon class="mr-2" icon="mdi-shield-alert-outline" />
              災時應變使用指南
            </v-tab>
          </v-tabs>

          <v-card-text class="pa-6">
            <v-window v-model="tab">
              <!-- Tab 1: 規格 -->
              <v-window-item value="specs">
                <div class="specs-content">
                  <h3 class="tab-title mb-4">產品安全規格與注意事項</h3>

                  <v-table class="specs-table border rounded-lg">
                    <tbody>
                      <tr>
                        <td class="font-weight-bold bg-grey-lighten-4 width-160">品名</td>
                        <td>{{ activeProduct.name }}</td>
                      </tr>

                      <tr>
                        <td class="font-weight-bold bg-grey-lighten-4">分類</td>
                        <td>{{ activeProduct.category }}</td>
                      </tr>

                      <tr>
                        <td class="font-weight-bold bg-grey-lighten-4">安全防護等級</td>
                        <td>符合國家CNS防災防護認證標準 / ISO 9001品質管理</td>
                      </tr>

                      <tr>
                        <td class="font-weight-bold bg-grey-lighten-4">產地與保固</td>
                        <td>台灣設計製造 / 享 30 天鑑賞期與 3 年原廠極限品質保固</td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
              </v-window-item>

              <!-- Tab 2: 災時使用指南 -->
              <v-window-item value="guide">
                <div class="guide-content">
                  <h3 class="tab-title mb-3">黃金 72 小時緊急使用情境指引</h3>

                  <p class="text-body-1 text-grey-darken-2 mb-4">
                    當遭逢大規模地震、強烈颱風停電或緊急疏散命令時，本項裝備能為您與家人提供最關鍵的即時防護與通訊能力。
                  </p>

                  <v-alert
                    class="rounded-lg mb-4 text-dark font-weight-bold"
                    color="#FFD800"
                    icon="mdi-lightbulb-on"
                    variant="tonal"
                  >
                    提示：建議將此裝備擺放於靠近玄關或主要逃生路線的「緊急避難包」內，並至少每半年進行一次檢驗與功能測試。
                  </v-alert>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </section>

      <!-- 相關防災商品推薦 -->
      <section v-if="relatedProducts.length > 0" class="related-products-section mt-12">
        <div class="d-flex align-center mb-6">
          <div class="title-bar mr-3" />
          <h2 class="section-title mb-0">推薦相關防災裝備</h2>
        </div>

        <v-row>
          <v-col
            v-for="item in relatedProducts"
            :key="item._id"
            cols="12"
            md="3"
            sm="6"
          >
            <v-card
              class="related-product-card rounded-lg h-100 pa-2 cursor-pointer"
              flat
              @click="router.push(`/product/${item._id}`)"
            >
              <v-responsive aspect-ratio="1.3333">
                <v-img class="rounded-lg h-100 bg-grey-lighten-2" cover :src="item.imageUrl" />
              </v-responsive>

              <v-card-text class="pa-3">
                <span class="category-badge small mb-2 d-inline-block">{{ item.category }}</span>

                <h4 class="related-name text-clamp-2 mb-2" :title="item.name">
                  {{ item.name }}
                </h4>

                <div class="related-price">NT$ {{ item.price.toLocaleString() }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import type { IProduct } from '@/types/product'
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useGetIdQuery, useGetQuery } from '@/quries/product'
  import { useAddCartMutation } from '@/quries/user'
  import { useCartDrawerStore } from '@/stores/cartDrawer'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const route = useRoute('/product/[id]')
  const router = useRouter()
  const user = useUserStore()
  const snackbar = useSnackbarStore()
  const cartDrawerStore = useCartDrawerStore()
  const { mutateAsync: addCartMutate } = useAddCartMutation()

  const quantity = ref(1)
  const isFavorite = ref(false)
  const isSubmitting = ref(false)
  const tab = ref('specs')

  // API Query
  const { data: apiProduct, isLoading, error } = useGetIdQuery()
  const { data: allProducts } = useGetQuery()

  // 備用防護商品資料庫 (當 API 無法取得時之備用回覆)
  const fallbackProducts: Record<string, IProduct> = {
    p1: {
      _id: 'p1',
      name: '多功能防災應變收音機與手搖發電手電筒組',
      price: 1280,
      description: '本款裝備整合 FM/AM 雙頻急難廣播、高亮度 LED 手電筒、手搖機械發電與 4000mAh 應急行動電源機能。遇到停電或通訊中斷時，能隨時掌握官方氣象與防災災情通報，為極端災害下不可或缺的求生神器。',
      category: '生活用品',
      sell: true,
      image: 'shop1.jpg',
      imageUrl: 'https://picsum.photos/seed/shop1/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    p2: {
      _id: 'p2',
      name: '高強度頭部防護防災避難安全帽 (黃色款)',
      price: 650,
      description: '符合國家耐衝擊檢驗規範，採用高剛性 ABS 抗震材質，搭配三點式可調式安全頭帶。地震發生時能有效防範落石、掉落磚瓦與落物衝擊，提供頭部全方位的安全防護。',
      category: '防身用品',
      sell: true,
      image: 'shop2.jpg',
      imageUrl: 'https://picsum.photos/seed/shop2/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    p3: {
      _id: 'p3',
      name: '全家必備家庭式72小時緊急避難背包豪華組',
      price: 2450,
      description: '依據消防署建議應變清單調配，全組包含 3 日戰備高能量口糧、淨水濾管、高分貝求救哨、無毒消毒急救包、保暖毯與大容量軍規防潑水背包，幫您一次備齊避難所需。',
      category: '生活用品',
      sell: true,
      image: 'shop3.jpg',
      imageUrl: 'https://picsum.photos/seed/shop3/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    p4: {
      _id: 'p4',
      name: '可保存5年長期保存應變戰備乾糧餅乾箱裝',
      price: 890,
      description: '專為極端災變研發之長期保存乾糧，採用高阻隔真空包裝，可常溫保存長達 5 年。每份提供充足熱量與必要維生素，免加熱即可即開即食。',
      category: '避難食物',
      sell: true,
      image: 'shop4.jpg',
      imageUrl: 'https://picsum.photos/seed/shop4/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    p5: {
      _id: 'p5',
      name: '個人便攜式反光防風防雨保暖保溫毯 4入組',
      price: 350,
      description: '採用美航天級聚酯薄膜材質，能有效反射並回聚人體 90% 以上散失之熱能。兼具 100% 防風與防水效果，折疊後僅手掌大小，易於攜帶。',
      category: '外套服飾',
      sell: true,
      image: 'shop5.jpg',
      imageUrl: 'https://picsum.photos/seed/shop5/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    p6: {
      _id: 'p6',
      name: '便攜式淨水器戶外緊急濾水吸管組',
      price: 520,
      description: '搭載 0.1 微米中空纖維膜，無需化學藥劑或電力，可直接將戶外溪水或儲存水過濾為符合飲用標準的乾淨水源，過濾量高達 2000 公升。',
      category: '生活用品',
      sell: true,
      image: 'shop6.jpg',
      imageUrl: 'https://picsum.photos/seed/shop6/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
  }

  // 決定使用 API 資料或備用商品
  const activeProduct = computed<IProduct | undefined>(() => {
    if (apiProduct.value) return apiProduct.value
    const paramId = String(route.params.id || 'p1')
    return fallbackProducts[paramId] || fallbackProducts.p1
  })

  // 推薦同類別其他商品（優先使用後端真實商品資料）
  const relatedProducts = computed(() => {
    if (allProducts.value && allProducts.value.length > 0) {
      return allProducts.value.filter(item => item._id !== activeProduct.value?._id).slice(0, 4)
    }
    const list = Object.values(fallbackProducts)
    return list.filter(item => item._id !== activeProduct.value?._id).slice(0, 4)
  })

  watch(activeProduct, p => {
    if (p) {
      document.title = `${p.name} - 災防商城`
    }
  }, { immediate: true })

  function handleShare () {
    navigator.clipboard?.writeText(window.location.href)
    snackbar.add({ text: '已複製商品連結至剪貼簿', color: 'success' })
  }

  function handleFavorite () {
    isFavorite.value = !isFavorite.value
    snackbar.add({
      text: isFavorite.value ? '已將商品加入追蹤清單' : '已取消追蹤',
      color: isFavorite.value ? 'success' : 'info',
    })
  }

  async function handleAddToCart () {
    if (!user.isLoggedIn) {
      router.push('/login')
      return
    }
    if (!activeProduct.value) return

    // 檢查是否為合法 24 碼 MongoDB ObjectId，避免假資料 id (如 p1) 傳入後端報錯
    if (!/^[0-9a-f]{24}$/i.test(activeProduct.value._id)) {
      snackbar.add({ text: '此為示範商品，無法加入購物車', color: 'warning' })
      return
    }

    try {
      isSubmitting.value = true
      await addCartMutate({
        product: activeProduct.value._id,
        quantity: quantity.value,
        replace: false,
      })
      snackbar.add({ text: `已將 ${quantity.value} 件商品加入購物車`, color: 'green' })
      cartDrawerStore.open()
    } catch (error_) {
      snackbar.addError(error_)
    } finally {
      isSubmitting.value = false
    }
  }

  async function handleBuyNow () {
    if (!user.isLoggedIn) {
      router.push('/login')
      return
    }
    await handleAddToCart()
    cartDrawerStore.open()
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
  max-width: 1120px;
  margin: 0 auto;
}

.product-gallery-card {
  border: 1px solid #ECECF2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.product-main-img {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.spec-pill {
  border: 1px solid #ECECF2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.fs-13 {
  font-size: 13px;
}

.fs-15 {
  font-size: 15px;
  line-height: 1.65;
}

.product-info-card {
  border: 1px solid #ECECF2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.category-badge {
  background-color: #FFD800;
  color: #3C3C5A;
  font-size: 13px;
  font-weight: 800;
}

.category-badge.small {
  font-size: 11px;
  padding: 2px 8px;
}

.stock-badge {
  font-size: 13px;
  font-weight: bold;
  color: #17D7BA;
}

.product-main-title {
  font-size: 24px;
  font-weight: 800;
  color: #3C3C5A;
  line-height: 1.35;
}

.price-box {
  background-color: #F8F9FD;
  border-left: 5px solid #EF4628;
}

.currency-symbol {
  font-size: 20px;
  font-weight: bold;
  color: #EF4628;
}

.price-amount {
  font-size: 32px;
  font-weight: 900;
  color: #EF4628;
}

.quantity-controller {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
  background-color: #FFFFFF;
}

.qty-btn {
  width: 36px;
  height: 36px;
  background-color: #F8F9FD;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background-color: #ECECF2;
}

.qty-input {
  width: 48px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: #3C3C5A;
  outline: none;
}

/* Chrome, Safari, Edge, Opera remove spinner arrows */
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-cart {
  background-color: #3C3C5A !important;
  color: #FFFFFF !important;
  border-radius: 8px;
  height: 52px;
}

.btn-buy {
  background-color: #FFD800 !important;
  color: #3C3C5A !important;
  border-radius: 8px;
  height: 52px;
}

.tab-title {
  font-size: 18px;
  font-weight: bold;
  color: #3C3C5A;
}

.width-160 {
  width: 160px;
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

.related-product-card {
  background-color: #FFFFFF !important;
  border: 1px solid #ECECF2 !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.related-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
}

.related-name {
  font-size: 14px;
  font-weight: bold;
  color: #3C3C5A;
  line-height: 1.4;
}

.related-price {
  font-size: 16px;
  font-weight: 800;
  color: #EF4628;
}

.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .product-main-title {
    font-size: 20px;
  }
  .price-amount {
    font-size: 26px;
  }
}
</style>

<route lang="yaml">
meta:
  title: 防災商品詳細
</route>
