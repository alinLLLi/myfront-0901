<template>
  <div v-if="breadcrumbItems.length > 0" class="breadcrumb-bar px-6 py-3 d-flex align-center">
    <v-breadcrumbs :items="breadcrumbItems" class="pa-0 font-weight-medium text-subtitle-2">
      <template #divider>
        <span class="mx-2 text-grey-medium">/</span>
      </template>
      <template #item="{ item }">
        <router-link
          v-if="item.to && item.to !== route.path"
          :to="item.to"
          class="breadcrumb-link text-decoration-none"
        >
          {{ item.title }}
        </router-link>
        <span v-else class="breadcrumb-current font-weight-bold">
          {{ item.title }}
        </span>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const pathMap: Record<string, string> = {
    '/': '首頁',
    '/login': '會員登入',
    '/register': '會員註冊',
    '/user/order': '會員中心',
    '/user/cart': '購物車',
    '/admin': '管理後台',
    '/admin/product': '商品管理',
    '/admin/product-form': '新增商品',
    '/admin/news': '災防知識',
    '/admin/news-form': '新增災防知識',
    '/admin/order': '訂單管理',
    '/news': '災防知識',
    '/shop': '災防商城',
    '/map': '防災地圖',
    '/game': '防災遊戲',
    '/guide': '防災懶人包',
    '/contact': '與我聯絡',
    '/disaster': '災時極簡模式',
  }

  const isAdminOrUserRoute = computed(() => {
    return route.path.startsWith('/admin') || route.path.startsWith('/user')
  })

  const rootItem = computed(() => {
    return isAdminOrUserRoute.value
      ? { title: '會員中心', to: '/user/order' }
      : { title: '首頁', to: '/' }
  })

  const breadcrumbItems = computed(() => {
    // 首頁不用顯示路徑顯示條
    if (route.path === '/') {
      return []
    }
    if (route.path === '/user/order') {
      return [{ title: '會員中心', to: '/user/order' }]
    }
    if (route.path === '/admin/product-form') {
      const isEdit = Boolean(route.query.id)
      return [
        rootItem.value,
        { title: '商品管理', to: '/admin/product' },
        { title: isEdit ? '編輯商品' : '新增商品', to: route.fullPath },
      ]
    }
    if (route.path === '/admin/news-form') {
      const isEdit = Boolean(route.query.id)
      return [
        rootItem.value,
        { title: '災防知識', to: '/admin/news' },
        { title: isEdit ? '編輯災防知識' : '新增災防知識', to: route.fullPath },
      ]
    }
    const currentTitle = route.meta?.title || pathMap[route.path] || '頁面'
    return [
      rootItem.value,
      { title: currentTitle, to: route.path },
    ]
  })
</script>

<style scoped>
.breadcrumb-bar {
  background-color: transparent;
  border-bottom: 1px solid #EEEEF5;
}

.breadcrumb-link {
  color: #8C90AB;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #3C3C5A;
}

.breadcrumb-current {
  color: #3C3C5A;
}

.text-grey-medium {
  color: #8C90AB;
}
</style>
