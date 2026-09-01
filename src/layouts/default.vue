<template>
  <div class="disaster-app-layout" :class="{ 'bg-white-mode': isMemberOrAdminPage }">
    <!-- 1. Fixed Left Sidebar Main Menu (主選單 240px x 100vh) -->
    <aside class="sidebar-drawer">
      <!-- 1-1. Logo (120px x 100px) -->
      <div class="logo-wrapper d-flex justify-center align-center py-2" @click="router.push('/')">
        <MascotLogo />
      </div>

      <!-- Main Navigation List (Switches dynamically based on login state) -->
      <!-- 登入前：前台選單 / 登入後：後台選單 -->
      <nav class="sidebar-nav flex-grow-1 py-2">
        <router-link
          v-for="item in currentNavItems"
          :key="item.to"
          :to="item.to"
          class="sidebar-nav-item d-flex align-center"
          :class="{ active: route.path === item.to }"
        >
          <v-icon :icon="item.icon" size="16" class="nav-icon mr-3" />
          <span class="nav-text">{{ item.title }}</span>
        </router-link>
      </nav>

      <!-- Bottom Banner Button -->
      <div class="sidebar-bottom-wrapper d-flex justify-center pb-6">
        <!-- 未登入前：災時極簡模式 Banner (200px x 52px, bg #FFD800) -->
        <button
          v-if="!user.isLoggedIn"
          class="banner-btn emergency-banner-btn d-flex align-center justify-center"
          @click="router.push('/disaster')"
        >
          <v-icon icon="mdi-alert-circle" size="24" class="emergency-icon mr-2" />
          <span class="banner-text text-dark">災時極簡模式</span>
        </button>

        <!-- 登入後：1-5. 回首頁 Banner (200px x 52px, bg #8C90AB, text #ffffff 18px 粗體) -->
        <button
          v-else
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
        <!-- Left: Cart Icon, User Icon (if logged in), Login/Logout Button -->
        <div class="header-left d-flex align-center ga-3">
          <!-- Cart Icon -->
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

          <!-- User Icon (登入後購物車 icon 會多出一個 user 的 icon，點擊進入會員中心) -->
          <v-btn
            v-if="user.isLoggedIn"
            icon
            variant="text"
            color="secondary"
            to="/user/order"
            title="會員中心"
          >
            <v-icon icon="mdi-account-circle-outline" size="26" />
          </v-btn>

          <!-- Member Login / Logout Button -->
          <v-btn
            v-if="!user.isLoggedIn"
            color="secondary"
            variant="flat"
            rounded="pill"
            to="/login"
            class="font-weight-bold px-5"
          >
            會員登入
          </v-btn>

          <v-btn
            v-else
            color="secondary"
            variant="outlined"
            rounded="pill"
            class="font-weight-bold px-5"
            @click="handleLogout"
          >
            會員登出
          </v-btn>
        </div>

        <!-- Right: Product Search Bar (齊右) -->
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

      <!-- 3. Breadcrumb Path Bar (路徑顯示，如首頁 / 會員中心) -->
      <BreadcrumbBar v-if="route.path !== '/'" />

      <!-- Main Body Router View -->
      <main class="page-content">
        <router-view :key="$route.fullPath" />
      </main>

      <!-- 5. 下方版權說明 (底色 #8C90AB，寬度 100vw - 240px，高度 88px，文字居中對齊，文字顏色 #FFFFFF) -->
      <footer class="site-footer d-flex align-center justify-center">
        <p class="copyright-text mb-0">
          © 2026 防災資訊與應變專區 ‧ 版權所有 All Rights Reserved.
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
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

  // 判斷是否為會員中心 / 管理頁面 / 登入註冊頁面 (背景改為 #ffffff)
  const isMemberOrAdminPage = computed(() => {
    return (
      route.path.startsWith('/admin') ||
      route.path.startsWith('/user') ||
      route.path === '/login' ||
      route.path === '/register'
    )
  })

  // 前台主選單列表 (未登入前)
  const frontendNavItems = [
    { title: '首頁', to: '/', icon: 'mdi-home-outline' },
    { title: '災防知識', to: '/news', icon: 'mdi-book-open-page-variant-outline' },
    { title: '災防商城', to: '/shop', icon: 'mdi-storefront-outline' },
    { title: '防災地圖', to: '/map', icon: 'mdi-map-marker-radius-outline' },
    { title: '防災遊戲', to: '/game', icon: 'mdi-gamepad-variant-outline' },
    { title: '防災懶人包', to: '/guide', icon: 'mdi-file-document-outline' },
    { title: '與我聯絡', to: '/contact', icon: 'mdi-email-outline' },
  ]

  // 後台主選單列表 (1-1 ~ 1-4，登入後)
  const backendNavItems = [
    { title: '商品管理', to: '/admin/product', icon: 'mdi-shopping-outline' },
    { title: '訂單管理', to: '/admin/order', icon: 'mdi-list-box-outline' },
    { title: '災防知識', to: '/news', icon: 'mdi-book-open-page-variant-outline' },
  ]

  // 動態切換選單
  const currentNavItems = computed(() => {
    return user.isLoggedIn ? backendNavItems : frontendNavItems
  })

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
.disaster-app-layout {
  min-height: 100vh;
  background-color: #ECECF2;
  display: flex;
}

.disaster-app-layout.bg-white-mode {
  background-color: #FFFFFF !important;
}

/* 1. Left Sidebar Drawer (240px x 100vh) */
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

/* Navigation items */
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

/* Bottom Banner Buttons (Width 200px, Height 52px) */
.sidebar-bottom-wrapper {
  margin-top: auto;
}

.banner-btn {
  width: 200px;
  height: 52px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.banner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

/* 未登入：災時極簡模式 Banner (bg #FFD800) */
.emergency-banner-btn {
  background-color: #FFD800;
}

.emergency-icon {
  color: #EF4628 !important;
  width: 24px;
  height: 24px;
}

/* 登入後：1-5. 回首頁 Banner (bg #8C90AB, text #ffffff 18px 粗體) */
.home-banner-btn {
  background-color: #8C90AB;
}

.banner-text {
  font-size: 18px;
  font-weight: bold;
}

.banner-text.text-dark {
  color: #3C3C5A;
}

.banner-text.text-white {
  color: #FFFFFF;
}

/* Main Shell Right of 240px Sidebar */
.main-shell {
  margin-left: 240px;
  width: calc(100vw - 240px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 2. Site Header (72px height, non-sticky so window scroll moves past it) */
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

/* 5. 版權宣告 Footer (底色 #8C90AB，高度 88px) */
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
