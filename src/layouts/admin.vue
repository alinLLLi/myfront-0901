<template>
  <div class="admin-app-layout bg-white-mode">
    <!-- 1. Fixed Left Sidebar Main Menu (主選單 240px x 100vh) -->
    <aside class="sidebar-drawer">
      <!-- 2-1. Logo (120px x 100px) -->
      <div class="logo-wrapper d-flex justify-center align-center py-2" @click="router.push('/')">
        <MascotLogo />
      </div>

      <!-- 後台主選單列表 (2-2 ~ 2-4) -->
      <nav class="sidebar-nav flex-grow-1 py-2">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          class="sidebar-nav-item d-flex align-center"
          :class="{ active: route.path === item.to }"
          :to="item.to"
        >
          <v-icon class="nav-icon mr-3" :icon="item.icon" size="16" />
          <span class="nav-text">{{ item.title }}</span>
        </router-link>
      </nav>

      <!-- 2-5. 回首頁 Banner (200px x 52px, bg #8C90AB, text #ffffff 18px 粗體) -->
      <div class="sidebar-bottom-wrapper d-flex justify-center pb-6">
        <button
          class="banner-btn home-banner-btn d-flex align-center justify-center"
          @click="router.push('/')"
        >
          <v-icon class="text-white mr-2 banner-home-icon" icon="mdi-home" size="20" />
          <span class="banner-text text-white">回首頁</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Shell (Margin Left 240px) -->
    <div class="main-shell">
      <!-- 2. Header (Height 72px, static position - moves with window scroll) -->
      <header class="site-header d-flex align-center justify-end px-6">
        <!-- Right: Cart Icon (點擊開啟購物車彈窗), User Icon (登入後點擊進入會員中心), Logout Button -->
        <div class="header-right d-flex align-center ga-3">
          <!-- Cart Icon (點擊開啟購物車彈窗) -->
          <v-btn
            color="secondary"
            icon
            title="購物車"
            variant="text"
            @click="cartDrawerStore.open()"
          >
            <v-badge
              v-if="user.cart > 0"
              color="#EF4628"
              :content="user.cart"
              floating
            >
              <v-icon icon="mdi-cart-outline" size="24" />
            </v-badge>

            <v-icon v-else icon="mdi-cart-outline" size="24" />
          </v-btn>

          <!-- User Icon -->
          <v-btn
            color="secondary"
            icon
            title="會員中心"
            to="/user/order"
            variant="text"
          >
            <v-icon icon="mdi-account-circle-outline" size="26" />
          </v-btn>

          <!-- Member Logout Button -->
          <v-btn
            class="font-weight-bold px-5"
            color="secondary"
            rounded="pill"
            variant="outlined"
            @click="handleLogout"
          >
            登出
          </v-btn>
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

  <!-- 全局購物車彈窗組件 -->
  <CartDrawer />
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
  import CartDrawer from '@/components/CartDrawer.vue'
  import MascotLogo from '@/components/MascotLogo.vue'
  import { useLogoutMutation } from '@/quries/auth'
  import { useCartDrawerStore } from '@/stores/cartDrawer'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const user = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const snackbar = useSnackbarStore()
  const cartDrawerStore = useCartDrawerStore()
  const { mutateAsync: logoutMutate } = useLogoutMutation()

  // 2-2 ~ 2-4. 後台主選單列表
  const navItems = [
    { title: '商品管理', to: '/admin/product', icon: 'mdi-shopping-outline' },
    { title: '訂單管理', to: '/admin/order', icon: 'mdi-list-box-outline' },
    { title: '災防知識', to: '/admin/news', icon: 'mdi-book-open-page-variant-outline' },
  ]

  async function handleLogout () {
    await logoutMutate().catch(() => {})
    user.logout()
    router.push('/')
    snackbar.add({ text: '登出成功', color: 'green' })
  }
</script>

<style scoped>
.admin-app-layout {
  min-height: 100vh;
  background-color: #FFFFFF !important;
  display: flex;
}

.sidebar-drawer {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #FFFFFF;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
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
  gap: 0;
}

/* 後台主選單動態填滿效果 (參考 SSSSS 資料夾之動畫與顏色樣式) */
.sidebar-nav-item {
  position: relative;
  height: 48px;
  padding: 0 24px;
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
}

/* 填滿動態背景層 (transform scaleX 0 -> 1, ease-out 0.3s) */
.sidebar-nav-item::before {
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

.sidebar-nav-item:hover::before {
  transform: scaleX(1);
}

.sidebar-nav-item.active {
  background-color: #ECECF2;
  border-left: 4px solid #FFD800;
}

.nav-icon {
  color: #8C90AB !important;
  width: 16px;
  height: 16px;
  position: relative;
  z-index: 1;
  transition: color 0.5s ease-out, transform 0.2s ease;
}

.nav-text {
  font-size: 18px;
  font-weight: bold;
  color: #3C3C5A;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  transition: color 0.5s ease-out;
}

/* Hover 狀態：文字與圖示轉換為白色 */
.sidebar-nav-item:hover .nav-text {
  color: #FFFFFF !important;
}

.sidebar-nav-item:hover .nav-icon {
  color: #FFFFFF !important;
}

.sidebar-bottom-wrapper {
  margin-top: auto;
}

/* 2-5. 回首頁 Banner (200px x 52px, bg #8C90AB, text #ffffff 18px 粗體) 動態填滿效果 */
.home-banner-btn {
  position: relative;
  width: 200px;
  height: 52px;
  background-color: #8C90AB;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.home-banner-btn::before {
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

.home-banner-btn:hover::before {
  transform: scaleX(1);
}

.home-banner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.banner-home-icon {
  position: relative;
  z-index: 1;
}

.banner-text {
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
  position: relative;
  z-index: 1;
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
