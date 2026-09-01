<template>
  <!-- 當子頁面有指定其他 Layout (例如 admin Layout) 時，不重複渲染 default Layout 之外殼結構 -->
  <router-view v-if="hasCustomLayout" :key="$route.fullPath" />

  <div v-else class="disaster-app-layout" :class="{ 'bg-white-mode': isMemberOrAdminPage }">
    <!-- Mobile Sidebar Backdrop 遮罩 -->
    <div
      v-if="isMobileMenuOpen"
      class="sidebar-backdrop"
      @click="isMobileMenuOpen = false"
    />

    <!-- 1. Fixed Left Sidebar Main Menu (主選單 240px x 100vh) -->
    <aside class="sidebar-drawer" :class="{ 'mobile-open': isMobileMenuOpen }">
      <!-- 1-1. Logo (寬度 120px，高度 100px) -->
      <div class="logo-wrapper d-flex justify-center align-center py-2" @click="handleNavClick('/')">
        <MascotLogo />
      </div>

      <!-- 1-2 ~ 1-8. 前台主選單列表 -->
      <nav class="sidebar-nav flex-grow-1 py-2">
        <router-link
          v-for="item in frontendNavItems"
          :key="item.to"
          :to="item.to"
          class="sidebar-nav-item d-flex align-center"
          :class="{ active: route.path === item.to }"
          @click="isMobileMenuOpen = false"
        >
          <v-icon :icon="item.icon" size="16" class="nav-icon mr-3" />
          <span class="nav-text">{{ item.title }}</span>
        </router-link>
      </nav>

      <!-- 1-9. 災時極簡模式 Banner 與 登入/登出按鈕 (登入按鈕僅於手機版 d-md-none 顯示) -->
      <div class="sidebar-bottom-wrapper d-flex flex-column align-center pb-6 ga-3">
        <button
          class="banner-btn emergency-banner-btn d-flex align-center justify-center"
          @click="handleNavClick('/disaster')"
        >
          <v-icon icon="mdi-alert-circle" size="24" color="#EF4628" class="emergency-icon mr-2" />
          <span class="banner-text text-dark">災時極簡模式</span>
        </button>

        <!-- 手機版主選單 "災時極簡模式" 下方的 登入 / 登出 按鈕 (桌機版時隱藏 d-md-none) -->
        <button
          v-if="!user.isLoggedIn"
          class="sidebar-login-btn d-flex d-md-none align-center justify-center ga-2"
          title="會員登入"
          @click="handleNavClick('/login')"
        >
          <v-icon icon="mdi-login" size="18" />
          <span>登入</span>
        </button>
        <button
          v-else
          class="sidebar-login-btn d-flex d-md-none align-center justify-center ga-2"
          title="會員登出"
          @click="handleLogoutClick"
        >
          <v-icon icon="mdi-logout" size="18" />
          <span>登出</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Shell (Desktop: Margin Left 240px; RWD Mobile: Margin Left 0) -->
    <div class="main-shell">
      <!-- 2. Desktop Header (>= 960px) -->
      <header class="site-header d-none d-md-flex align-center justify-space-between px-8">
        <!-- Left: Product Search Bar -->
        <div class="header-left d-flex align-center">
          <div class="search-bar-wrap">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜尋防災相關資訊"
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" title="搜尋" @click="handleSearch">
              <v-icon icon="mdi-magnify" size="18" color="#3C3C5A" />
            </button>
          </div>
        </div>

        <!-- Right: Cart Icon, User Icon, Divider, Login/Logout Button -->
        <div class="header-right d-flex align-center ga-3">
          <!-- 購物車 Icon 按鈕 -->
          <button
            v-if="!isMemberOrAdminPage"
            class="header-icon-btn cart-btn"
            title="檢視購物車"
            @click="cartDrawerStore.open()"
          >
            <v-icon icon="mdi-cart-outline" size="22" color="#3C3C5A" />
            <span v-if="user.cart > 0" class="cart-badge">
              {{ user.cart }}
            </span>
          </button>

          <!-- 會員中心 Icon 按鈕 (登入後顯示) -->
          <router-link
            v-if="user.isLoggedIn"
            to="/user/order"
            class="header-icon-btn user-btn"
            title="會員中心"
          >
            <v-icon icon="mdi-account-circle-outline" size="24" color="#3C3C5A" />
          </router-link>

          <!-- 直向分隔線 -->
          <div class="action-divider" />

          <!-- 登入 / 登出 按鈕 (Desktop) -->
          <button
            v-if="!user.isLoggedIn"
            class="member-login-btn"
            title="會員登入"
            @click="router.push('/login')"
          >
            <span>登入</span>
            <v-icon icon="mdi-chevron-right" size="22" class="login-arrow" />
          </button>
          <button
            v-else
            class="member-login-btn"
            title="會員登出"
            @click="handleLogout"
          >
            <span>登出</span>
            <v-icon icon="mdi-chevron-right" size="22" class="login-arrow" />
          </button>
        </div>
      </header>

      <!-- 2-M. Mobile Header (< 960px) -->
      <header class="mobile-site-header d-flex d-md-none flex-column">
        <!-- 上排 Main Row: 左邊 Menu Icon, 中間 Logo, 右邊 購物車 Icon / (若登入有 User Icon) -->
        <div class="mobile-header-top-row d-flex align-center justify-space-between px-3 py-2">
          <!-- 左邊: Menu Icon -->
          <div class="mobile-header-left d-flex align-center">
            <v-btn
              icon
              variant="text"
              color="secondary"
              density="comfortable"
              title="開啟主選單"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <v-icon icon="mdi-menu" size="26" />
            </v-btn>
          </div>

          <!-- 中間: Logo -->
          <div class="mobile-header-center d-flex justify-center align-center cursor-pointer" @click="handleNavClick('/')">
            <MascotLogo class="mobile-logo-scale" />
          </div>

          <!-- 右邊: 購物車 Icon、(若登入則有 User Icon) -->
          <div class="mobile-header-right d-flex align-center ga-1 ga-sm-2">
            <!-- 購物車 Icon -->
            <button
              v-if="!isMemberOrAdminPage"
              class="header-icon-btn cart-btn"
              title="檢視購物車"
              @click="cartDrawerStore.open()"
            >
              <v-icon icon="mdi-cart-outline" size="22" color="#3C3C5A" />
              <span v-if="user.cart > 0" class="cart-badge">
                {{ user.cart }}
              </span>
            </button>

            <!-- 若已登入：出現 User Icon -->
            <router-link
              v-if="user.isLoggedIn"
              to="/user/order"
              class="header-icon-btn user-btn"
              title="會員中心"
            >
              <v-icon icon="mdi-account-circle-outline" size="22" color="#3C3C5A" />
            </router-link>
          </div>
        </div>

        <!-- 下排 Sub Row: Header 下方出現搜尋 Bar -->
        <div class="mobile-header-search-row px-3 pb-2 w-100">
          <div class="search-bar-wrap w-100">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜尋防災相關資訊"
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" title="搜尋" @click="handleSearch">
              <v-icon icon="mdi-magnify" size="18" color="#3C3C5A" />
            </button>
          </div>
        </div>
      </header>

      <!-- 3. Breadcrumb Path Bar (路徑顯示) -->
      <BreadcrumbBar />

      <!-- Main Body Router View -->
      <main class="page-content">
        <router-view :key="$route.fullPath" />
      </main>

      <!-- 5. 版權說明 Footer -->
      <footer class="site-footer d-flex align-center justify-center px-4">
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
  import { computed, ref } from 'vue'
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

  const searchQuery = ref('')
  const isMobileMenuOpen = ref(false)

  const hasCustomLayout = computed(() => {
    return Boolean(route.meta.layout && route.meta.layout !== 'default')
  })

  const isMemberOrAdminPage = computed(() => {
    return route.path.startsWith('/admin') || route.path.startsWith('/user') || route.path === '/login' || route.path === '/register'
  })

  // 前台主選單列表
  const frontendNavItems = [
    { title: '首頁', to: '/', icon: 'mdi-home-outline' },
    { title: '災防知識', to: '/news', icon: 'mdi-book-open-page-variant-outline' },
    { title: '災防商城', to: '/shop', icon: 'mdi-storefront-outline' },
    { title: '防災地圖', to: '/map', icon: 'mdi-map-marker-radius-outline' },
    { title: '防災遊戲', to: '/game', icon: 'mdi-gamepad-variant-outline' },
    { title: '防災懶人包', to: '/guide', icon: 'mdi-file-document-outline' },
    { title: '與我聯絡', to: '/contact', icon: 'mdi-email-outline' },
  ]

  function handleNavClick (path: string) {
    isMobileMenuOpen.value = false
    router.push(path)
  }

  async function handleLogoutClick () {
    isMobileMenuOpen.value = false
    await handleLogout()
  }

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

/* Mobile Sidebar Backdrop */
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
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
  transition: transform 0.3s ease;
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

/* 主選單動態填滿效果 */
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

.sidebar-nav-item:hover .nav-text,
.sidebar-nav-item:hover .nav-icon {
  color: #FFFFFF !important;
}

.sidebar-bottom-wrapper {
  margin-top: auto;
}

.banner-btn {
  position: relative;
  width: 200px;
  height: 52px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.emergency-banner-btn {
  background-color: #FFD800;
}

.emergency-banner-btn::before {
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

.emergency-banner-btn:hover::before {
  transform: scaleX(1);
}

.emergency-banner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.emergency-icon {
  color: #EF4628 !important;
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 1;
}

.banner-text {
  font-size: 18px;
  font-weight: bold;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease-out;
}

.banner-text.text-dark {
  color: #3C3C5A;
}

.emergency-banner-btn:hover .banner-text.text-dark {
  color: #FFFFFF !important;
}

/* 主選單底部 登入/登出 按鈕 (僅於手機版顯示 d-md-none) */
.sidebar-login-btn {
  width: 200px;
  height: 44px;
  background-color: #3C3C5A;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.sidebar-login-btn:hover {
  background-color: #4a4a6e;
  transform: translateY(-1px);
}

.main-shell {
  margin-left: 240px;
  width: calc(100vw - 240px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Site Header Desktop (>= 960px) */
.site-header {
  height: 72px;
  width: 100%;
  background-color: #D7D7E1;
  border-bottom: 1px solid #3C3C5A;
  position: relative;
  z-index: 10;
}

/* Mobile Site Header (< 960px) */
.mobile-site-header {
  width: 100%;
  background-color: #D7D7E1;
  border-bottom: 1px solid #3C3C5A;
  position: relative;
  z-index: 10;
}

.mobile-logo-scale {
  height: 36px;
  width: auto;
  max-width: 120px;
}

/* 商品搜尋 bar */
.search-bar-wrap {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 4px 6px 4px 12px;
  width: 280px;
  height: 42px;
  border-radius: 6px;
  transition: width 0.25s ease;
}

.search-bar-wrap:focus-within {
  width: 310px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: #3C3C5A;
}

.search-input::placeholder {
  color: #8C90AB;
}

.search-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 28px;
  cursor: pointer;
  border-left: 1px solid #8C90AB;
  padding-left: 4px;
  transition: background-color 0.2s ease;
}

.search-btn:hover {
  background-color: #ECECF2;
}

/* 購物車 Icon 按鈕 */
.header-icon-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.header-icon-btn:hover {
  transform: translateY(-1px);
  background-color: rgba(60, 60, 90, 0.08);
}

.cart-badge {
  position: absolute;
  top: -2px;
  right: -4px;
  background-color: #EF4628;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 2px 5px rgba(239, 70, 40, 0.4);
}

/* 直向分隔線 */
.action-divider {
  width: 1px;
  height: 20px;
  background-color: #3C3C5A;
  opacity: 0.6;
}

/* 登入 / 登出 按鈕 */
.member-login-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  background: transparent;
  border: none;
  color: #3C3C5A;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  white-space: nowrap;
  border-radius: 6px;
}

.member-login-btn::before {
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

.member-login-btn:hover::before {
  transform: scaleX(1);
}

.member-login-btn span {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease-out;
}

.login-arrow {
  color: #3C3C5A;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease-out, transform 0.2s ease;
}

.member-login-btn:hover span,
.member-login-btn:hover .login-arrow {
  color: #FFFFFF !important;
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

/* RWD Media Queries */
@media (max-width: 959px) {
  .sidebar-drawer {
    transform: translateX(-100%);
  }

  .sidebar-drawer.mobile-open {
    transform: translateX(0);
  }

  .main-shell {
    margin-left: 0 !important;
    width: 100vw !important;
  }

  .copyright-text {
    font-size: 13px;
  }
}
</style>
