<template>
  <div class="breadcrumb-bar px-6 py-3 d-flex align-center">
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
    '/admin/order': '訂單管理',
    '/news': '災防知識',
    '/shop': '災防商城',
    '/map': '防災地圖',
    '/game': '防災遊戲',
    '/guide': '防災懶人包',
    '/contact': '與我聯絡',
    '/disaster': '災時極簡模式',
  }

  const breadcrumbItems = computed(() => {
    const currentTitle = route.meta?.title || pathMap[route.path] || '頁面'
    if (route.path === '/') {
      return [{ title: '首頁', to: '/' }]
    }
    return [
      { title: '首頁', to: '/' },
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
