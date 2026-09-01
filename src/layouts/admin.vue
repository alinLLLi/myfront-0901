<template>
  <div class="admin-app-layout bg-white-mode">
    <!-- 1. Fixed Left Sidebar Main Menu (主選單 240px x 100vh) -->
    <aside class="sidebar-drawer">
      <!-- 1-1. Logo (120px x 100px) -->
      <div class="logo-wrapper d-flex justify-center align-center py-2" @click="router.push('/')">
        <MascotLogo />
      </div>

      <!-- 後台主選單列表 (1-2 ~ 1-4) -->
      <nav class="sidebar-nav flex-grow-1 py-2">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="sidebar-nav-item d-flex align-center"
          :class="{ active: route.path === item.to }"
        >
          <v-icon :icon="item.icon" size="16" class="nav-icon mr-3" />
          <span class="nav-text">{{ item.title }}</span>
        </router-link>
      </nav>

      <!-- 1-5. 回首頁 Banner (200px x 52px, bg #8C90AB, text #ffffff 18px 粗體) -->
      <div class="sidebar-bottom-wrapper d-flex justify-center pb-6">
        <button
          class="banner-btn home-banner-btn d-flex align-center justify-center"
          @click="router.push('/')"
        >
          <v-icon icon="mdi-home" size="20" class="text-white mr-2" />
          <span class="banner-text text-white">回首頁</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Shell (Margin Left 240px) -->
    <div class="main-shell">
      <!-- 2. Header (Height 72px, static position - moves with window scroll) -->
      <header class="site-header d-flex align-center justify-space-between px-6">
        <!-- Left: Cart Icon, User Icon (Logged in: enters Member Center), Logout Button -->
        <div class="header-left d-flex align-center ga-3">
          <v-btn
            icon
            variant="text"
            color="secondary"
            to="/user/cart"
            title="購物車"
          >
            <v-badge
              v-if="user.cart > 0"
              :content="user.cart"
              color="#EF4628"
              floating
            >
              <v-icon icon="mdi-cart-outline" size="24" />
            </v-badge>
            <v-icon v-else icon="mdi-cart-outline" size="24" />
          </v-btn>

          <!-- User Icon -->
          <v-btn
            icon
            variant="text"
            color="secondary"
            to="/user/order"
            title="會員中心"
          >
            <v-icon icon="mdi-account-circle-outline" size="26" />
          </v-btn>

          <!-- Member Logout Button -->
          <v-btn
            color="secondary"
            variant="outlined"
            rounded="pill"
            class="font-weight-bold px-5"
            @click="handleLogout"
          >
            會員登出
          </v-btn>
        </div>

        <!-- Right: Product Search Bar -->
        <div class="header-right d-flex align-center">
          <v-text-field
            v-model="searchQuery"
            density="compact"
            variant="outlined"
            placeholder="搜尋商品..."
            append-inner-icon="mdi-magnify"
            hide-details
            class="search-bar"
            rounded="pill"
            bg-color="#FFFFFF"
            @keyup.enter="handleSearch"
          />
        </div>
      </header>

      <!-- 3. Breadcrumb Path Bar (路徑顯示) -->
      <BreadcrumbBar />

      <!-- Main Body Router View -->
      <main class="page-content">
        <router-view :key="$route.fullPath" />
      </main>

      <!-- 5. 版權說明 Footer (底色 #8C90AB，寬度 100vw - 240px，高度 88px) -->
      <footer class="site-footer d-flex align-center justify-center">
        <p class="copyright-text mb-0">
          © 2026 防災資訊與應變專區 ‧ 版權所有 All Rights Reserved.
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
  import MascotLogo from '@/components/MascotLogo.vue'
  import { useLogoutMutation } from '@/quries/auth'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const user = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const snackbar = useSnackbarStore()
  const { mutateAsync: logoutMutate } = useLogoutMutation()

  const searchQuery = ref('')

  // 後台主選單 (1-1 ~ 1-4)
  const navItems = [
    { title: '商品管理', to: '/admin/product', icon: 'mdi-shopping-outline' },
    { title: '訂單管理', to: '/admin/order', icon: 'mdi-list-box-outline' },
    { title: '災防知識', to: '/news', icon: 'mdi-book-open-page-variant-outline' },
  ]

  async function handleLogout () {
    await logoutMutate().catch(() => {})
    user.logout()
    router.push('/')
    snackbar.add({ text: '登出成功', color: 'green' })
  }

  function handleSearch () {
    if (searchQuery.value.trim()) {
      router.push({ path: '/shop', query: { q: searchQuery.value.trim() } })
    }
  }
</script>

<style scoped>
.admin-app-layout {
  min-height: 100vh;
  background-color: #FFFFFF !important;
  display: flex;
}

/* 1. Left Sidebar Drawer */
.sidebar-drawer {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.logo-wrapper {
  cursor: pointer;
  border-bottom: 1px solid #ECECF2;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-nav-item {
  height: 48px;
  padding: 0 24px;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sidebar-nav-item:hover {
  background-color: #F4F4F8;
}

.sidebar-nav-item.active {
  background-color: #ECECF2;
  border-left: 4px solid #FFD800;
}

.nav-icon {
  color: #8C90AB !important;
  width: 16px;
  height: 16px;
}

.nav-text {
  font-size: 18px;
  font-weight: bold;
  color: #3C3C5A;
}

.sidebar-bottom-wrapper {
  margin-top: auto;
}

/* 1-5. 回首頁 Banner (200px x 52px, bg #8C90AB, text #ffffff 18px 粗體) */
.home-banner-btn {
  width: 200px;
  height: 52px;
  background-color: #8C90AB;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.home-banner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.banner-text {
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
}

.main-shell {
  margin-left: 240px;
  width: calc(100vw - 240px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  height: 72px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #E0E0EC;
  position: relative;
  z-index: 10;
}

.search-bar {
  width: 280px;
}

.page-content {
  flex: 1;
}

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
