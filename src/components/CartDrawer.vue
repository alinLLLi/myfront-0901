<template>
  <Teleport to="body">
    <!-- Backdrop遮罩 -->
    <div
      v-if="cartDrawerStore.isOpen"
      class="cart-backdrop"
      @click="cartDrawerStore.close()"
    />

    <!-- 右側抽屜主體 (對照 SSSSS 樣式) -->
    <div :class="['cart-drawer', { open: cartDrawerStore.isOpen }]">
      <!-- 標題欄 Header -->
      <div class="cart-header">
        <div class="header-title-wrap">
          <v-icon icon="mdi-cart" size="22" color="#3C3C5A" />
          <h3 class="cart-title">防災物資購物車 ({{ totalCount }})</h3>
        </div>
        <button
          class="close-btn d-flex align-center justify-center"
          aria-label="關閉購物車"
          @click="cartDrawerStore.close()"
        >
          <v-icon icon="mdi-close" size="20" color="#3C3C5A" />
        </button>
      </div>

      <!-- 購物車內容區 Content -->
      <div v-if="!cart || cart.length === 0" class="empty-cart">
        <v-icon icon="mdi-package-variant-remove" size="64" color="#8C90AB" />
        <p class="empty-text">購物車目前沒有任何防災物資</p>
        <router-link
          to="/shop"
          class="browse-btn"
          @click="cartDrawerStore.close()"
        >
          前往選購防災用品
        </router-link>
      </div>

      <!-- 商品列表區 -->
      <div v-else class="cart-items-list">
        <div
          v-for="item in cart"
          :key="item._id"
          class="cart-item-row"
          :class="{ 'unavailable-item': !item.product.sell }"
        >
          <img
            :src="item.product.imageUrl"
            :alt="item.product.name"
            class="item-img"
            @click="goToProduct(item.product._id)"
          />
          <div class="item-info">
            <h4 class="item-name" @click="goToProduct(item.product._id)">
              {{ item.product.name }}
            </h4>
            <div class="item-price">NT$ {{ item.product.price.toLocaleString() }}</div>
            <div class="quantity-controller">
              <button
                class="qty-btn"
                :disabled="isSubmitting"
                @click="updateCart(item.quantity - 1, item.product._id)"
              >
                <v-icon icon="mdi-minus" size="14" color="#3C3C5A" />
              </button>
              <span class="qty-num">{{ item.quantity }}</span>
              <button
                class="qty-btn"
                :disabled="isSubmitting"
                @click="updateCart(item.quantity + 1, item.product._id)"
              >
                <v-icon icon="mdi-plus" size="14" color="#3C3C5A" />
              </button>
            </div>
          </div>
          <button
            class="remove-item-btn"
            title="移除商品"
            :disabled="isSubmitting"
            @click="updateCart(0, item.product._id)"
          >
            <v-icon icon="mdi-trash-can-outline" size="18" color="#EF4628" />
          </button>
        </div>
      </div>

      <!-- 底部結帳區 Footer -->
      <div v-if="cart && cart.length > 0" class="cart-drawer-footer">
        <div class="subtotal-row">
          <span class="subtotal-label">總計金額：</span>
          <span class="subtotal-amount">
            NT$ {{ totalPrice.toLocaleString() }}
          </span>
        </div>
        <button
          class="checkout-btn"
          :disabled="checkoutDisable || isSubmitting"
          @click="handleCheckout"
        >
          {{ isSubmitting ? '處理中...' : '立即結帳確認 (安全配送)' }}
        </button>
        <button
          class="clear-cart-btn"
          :disabled="isSubmitting"
          @click="clearAllCart"
        >
          清空購物車
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCreateMutation } from '@/quries/order'
  import { useAddCartMutation, useGetCartQuery } from '@/quries/user'
  import { useCartDrawerStore } from '@/stores/cartDrawer'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const cartDrawerStore = useCartDrawerStore()
  const router = useRouter()
  const snackbar = useSnackbarStore()
  const userStore = useUserStore()

  const { data: cart } = useGetCartQuery()
  const { mutateAsync: addCartMutate } = useAddCartMutation()
  const { mutateAsync: createMutate } = useCreateMutation()

  const isSubmitting = ref(false)

  const totalCount = computed(() => {
    return cart.value ? cart.value.reduce((total, item) => total + item.quantity, 0) : 0
  })

  const totalPrice = computed(() => {
    return cart.value ? cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0) : 0
  })

  const checkoutDisable = computed(() => {
    return cart.value ? cart.value.length === 0 || cart.value.some(item => !item.product.sell) : true
  })

  function goToProduct (id: string) {
    cartDrawerStore.close()
    router.push(`/product/${id}`)
  }

  async function updateCart (quantity: number, id: string) {
    try {
      isSubmitting.value = true
      await addCartMutate({
        product: id,
        quantity,
        replace: true,
      })
    } catch (error) {
      snackbar.addError(error)
    } finally {
      isSubmitting.value = false
    }
  }

  async function clearAllCart () {
    if (!cart.value || cart.value.length === 0) return
    try {
      isSubmitting.value = true
      for (const item of cart.value) {
        await addCartMutate({
          product: item.product._id,
          quantity: 0,
          replace: true,
        })
      }
      userStore.cart = 0
    } catch (error) {
      snackbar.addError(error)
    } finally {
      isSubmitting.value = false
    }
  }

  async function handleCheckout () {
    try {
      isSubmitting.value = true
      await createMutate()
      cartDrawerStore.close()
      router.push('/user/order')
      snackbar.add({ text: '結帳成功！已為您發貨防災物資。', color: 'green' })
    } catch (error) {
      snackbar.addError(error)
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped>
.cart-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 90vw;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0);
  z-index: 2010;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.cart-drawer.open {
  transform: translateX(0);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
}

.cart-header {
  height: 72px;
  padding: 0 24px;
  border-bottom: 2px solid #3C3C5A;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-title {
  font-size: 17px;
  font-weight: 800;
  color: #3C3C5A;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #ECECF2;
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  gap: 16px;
}

.empty-text {
  font-size: 15px;
  color: #8C90AB;
  margin: 0;
}

.browse-btn {
  background-color: #FFD800;
  color: #3C3C5A;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.browse-btn:hover {
  background-color: #f5cf00;
}

.cart-items-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item-row {
  display: flex;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f5;
  align-items: center;
}

.unavailable-item {
  opacity: 0.6;
}

.item-img {
  width: 72px;
  height: 54px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 13px;
  font-weight: 700;
  color: #3C3C5A;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.item-name:hover {
  color: #EF4628;
}

.item-price {
  font-size: 14px;
  font-weight: 800;
  color: #EF4628;
  margin-bottom: 6px;
}

.quantity-controller {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}

.qty-btn {
  width: 24px;
  height: 24px;
  background: #f9fafb;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.qty-btn:hover:not(:disabled) {
  background-color: #ECECF2;
}

.qty-num {
  padding: 0 8px;
  font-size: 13px;
  font-weight: 700;
  color: #3C3C5A;
}

.remove-item-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.remove-item-btn:hover {
  background-color: #fee2e2;
}

.cart-drawer-footer {
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  background-color: #fcfcfd;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtotal-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.subtotal-label {
  font-size: 15px;
  font-weight: 700;
  color: #3C3C5A;
}

.subtotal-amount {
  font-size: 22px;
  font-weight: 900;
  color: #EF4628;
}

.checkout-btn {
  width: 100%;
  height: 48px;
  background-color: #FFD800;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 800;
  color: #3C3C5A;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(255, 216, 0, 0.4);
}

.checkout-btn:hover:not(:disabled) {
  background-color: #f5cf00;
  transform: translateY(-1px);
}

.checkout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clear-cart-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: #8C90AB;
  cursor: pointer;
  text-decoration: underline;
}
</style>
