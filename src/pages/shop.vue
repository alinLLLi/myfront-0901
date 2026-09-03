<template>
  <v-container class="pa-8" fluid>
    <div class="d-flex align-center justify-space-between mb-6">
      <div class="d-flex align-center">
        <div class="title-bar mr-3" />
        <h1 class="page-title">防災商城</h1>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <v-card class="pa-4 mb-6 rounded-lg bg-white" flat>
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            append-inner-icon="mdi-magnify"
            clearable
            density="compact"
            hide-details
            placeholder="搜尋防災商品..."
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="selectedCategory"
            density="compact"
            hide-details
            :items="['全部類別', '避難食物', '生活用品', '外套服飾', '防身用品']"
            label="商品分類"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="selectedSort"
            density="compact"
            hide-details
            item-title="text"
            :items="sortOptions"
            label="排序方式"
            return-object
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- Product Grid (2 items per row <= 1200px, 4 items >= 1280px) -->
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product._id"
        cols="12"
        lg="3"
        md="6"
        sm="6"
      >
        <v-card
          class="product-card rounded-lg h-100 d-flex flex-column cursor-pointer"
          flat
          :to="'/product/' + product._id"
        >
          <v-responsive aspect-ratio="1.3333" class="rounded-lg overflow-hidden">
            <v-img class="h-100 bg-grey-lighten-2" cover position="center center" :src="product.imageUrl" />
          </v-responsive>

          <v-card-text class="pa-4 flex-grow-1 d-flex flex-column justify-space-between">
            <div>
              <span class="product-category text-caption text-grey mb-1 d-block">{{ product.category }}</span>

              <h2 class="product-name text-clamp-2 mb-2" :title="product.name">
                {{ product.name }}
              </h2>
            </div>

            <div class="d-flex align-center justify-space-between mt-3">
              <span class="product-price">NT$ {{ product.price.toLocaleString() }}</span>

              <v-btn
                color="secondary"
                icon="mdi-cart-plus"
                size="small"
                title="加入購物車"
                variant="tonal"
                @click.stop.prevent="addToCart(product)"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import type { IProduct } from '@/types/product'
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useGetQuery as useGetProducts } from '@/quries/product'
  import { useAddCartMutation } from '@/quries/user'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const user = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const snackbar = useSnackbarStore()
  const { mutateAsync: addCartMutate } = useAddCartMutation()
  const { data: productsData } = useGetProducts()

  const searchQuery = ref('')
  const selectedCategory = ref('全部類別')

  interface SortOpt { text: string, key: keyof IProduct, direction: 1 | -1 }
  const sortOptions: SortOpt[] = [
    { text: '預設排序', key: 'name', direction: 1 },
    { text: '價格: 低到高', key: 'price', direction: 1 },
    { text: '價格: 高到低', key: 'price', direction: -1 },
  ]
  const selectedSort = ref<SortOpt>(sortOptions[0])

  onMounted(() => {
    if (route.query.q) {
      searchQuery.value = String(route.query.q)
    }
  })

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
    {
      _id: 'p5',
      name: '個人便攜式反光防風防雨保暖保溫毯 4入組',
      price: 350,
      description: '高反射銀薄膜，保持90%人體體溫',
      category: '外套服飾',
      sell: true,
      image: 'shop5.jpg',
      imageUrl: 'https://picsum.photos/seed/shop5/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
    {
      _id: 'p6',
      name: '便攜式淨水器戶外緊急濾水吸管組',
      price: 520,
      description: '過濾99.99%水中有害細菌與微粒',
      category: '生活用品',
      sell: true,
      image: 'shop6.jpg',
      imageUrl: 'https://picsum.photos/seed/shop6/600/450',
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
  ]

  const allProducts = computed(() => {
    if (productsData.value && productsData.value.length > 0) {
      return productsData.value
    }
    return fallbackProducts
  })

  const filteredProducts = computed(() => {
    return allProducts.value
      .filter(p => {
        const matchText = !searchQuery.value || p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchCat = selectedCategory.value === '全部類別' || p.category === selectedCategory.value
        return matchText && matchCat
      })
      .toSorted((a, b) => {
        const key = selectedSort.value.key
        const dir = selectedSort.value.direction
        return a[key] > b[key] ? dir : -1 * dir
      })
  })

  async function addToCart (product: IProduct) {
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
.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #3C3C5A;
}

.title-bar {
  width: 6px;
  height: 24px;
  background-color: #FFD800;
  border-radius: 3px;
}

.product-card {
  background-color: #FFFFFF !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: #3C3C5A;
  line-height: 1.4;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #EF4628;
}

.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1200px) {
  .v-col-md-6 {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }
}
</style>

<route lang="yaml">
meta:
  title: 災防商城
</route>
