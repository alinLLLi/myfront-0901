<template>
  <v-container class="py-8 min-h-screen">
    <div class="cart-card-wrap mx-auto">
      <!-- 購物車標題區 (對照 SSSSS 樣式) -->
      <div class="cart-header d-flex align-center justify-space-between mb-6 pb-4">
        <div class="d-flex align-center ga-3">
          <v-icon icon="mdi-cart" size="28" color="#3C3C5A" />
          <h1 class="cart-title mb-0">防災物資購物車 ({{ totalCount }})</h1>
        </div>
      </div>

      <!-- 空購物車狀態 -->
      <div v-if="!cart || cart.length === 0" class="empty-cart text-center py-12 px-4 rounded-xl border bg-white">
        <v-icon icon="mdi-package-variant-remove" size="64" color="#8C90AB" class="mb-4" />
        <p class="empty-text mb-6">購物車目前沒有任何防災物資</p>
        <v-btn
          to="/shop"
          color="#FFD800"
          size="large"
          class="font-weight-bold text-secondary px-8 rounded-lg"
          elevation="2"
        >
          前往選購防災用品
        </v-btn>
      </div>

      <!-- 購物車列表卡片區 -->
      <div v-else class="cart-main-content">
        <v-card flat class="rounded-xl border pa-6 bg-white mb-6">
          <div class="cart-items-stack">
            <div
              v-for="item in cart"
              :key="item._id"
              class="cart-item-row d-flex align-center py-4 border-b"
              :class="{ 'unavailable-item': !item.product.sell }"
            >
              <!-- 商品圖片 -->
              <div class="item-img-box mr-4" @click="$router.push('/product/' + item.product._id)">
                <img :src="item.product.imageUrl" :alt="item.product.name" class="item-img" />
              </div>

              <!-- 商品資訊 -->
              <div class="item-info flex-grow-1">
                <h3 class="item-name mb-1" @click="$router.push('/product/' + item.product._id)">
                  {{ item.product.name }}
                </h3>
                <span v-if="!item.product.sell" class="badge-disabled text-caption font-weight-bold text-red mr-2">
                  [已下架]
                </span>
                <div class="item-price font-weight-black">
                  NT$ {{ item.product.price.toLocaleString() }}
                </div>
              </div>

              <!-- 數量控制按鈕組 (對照 SSSSS 加減按鈕組) -->
              <div class="quantity-controller d-flex align-center mr-4">
                <button
                  class="qty-btn"
                  :disabled="isSubmitting"
                  @click="updateCart(item.quantity - 1, item.product._id)"
                >
                  <v-icon icon="mdi-minus" size="14" color="#3C3C5A" />
                </button>
                <span class="qty-num px-3 font-weight-bold">{{ item.quantity }}</span>
                <button
                  class="qty-btn"
                  :disabled="isSubmitting"
                  @click="updateCart(item.quantity + 1, item.product._id)"
                >
                  <v-icon icon="mdi-plus" size="14" color="#3C3C5A" />
                </button>
              </div>

              <!-- 移除按鈕 (垃圾桶 Icon) -->
              <v-btn
                icon
                variant="text"
                color="#EF4628"
                size="small"
                title="移除商品"
                :disabled="isSubmitting"
                @click="updateCart(0, item.product._id)"
              >
                <v-icon icon="mdi-trash-can-outline" size="22" />
              </v-btn>
            </div>
          </div>
        </v-card>

        <!-- 結帳資訊總計卡片 (對照 SSSSS 結帳底欄) -->
        <v-card flat class="rounded-xl border pa-6 bg-white">
          <div class="d-flex align-center justify-space-between mb-4">
            <span class="subtotal-label font-weight-bold text-secondary" style="font-size: 18px;">總計金額：</span>
            <span class="subtotal-amount font-weight-black" style="font-size: 28px; color: #EF4628;">
              NT$ {{ totalPrice.toLocaleString() }}
            </span>
          </div>

          <v-btn
            block
            size="x-large"
            color="primary"
            class="checkout-btn font-weight-bold text-secondary rounded-lg mb-3"
            style="height: 52px; font-size: 18px; background-color: #FFD800 !important;"
            :disabled="checkoutDisable || isSubmitting"
            :loading="isSubmitting"
            @click="checkout"
          >
            立即結帳確認 (安全配送)
          </v-btn>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCreateMutation } from '@/quries/order'
  import { useAddCartMutation, useGetCartQuery } from '@/quries/user'
  import { useSnackbarStore } from '@/stores/snackbar'

  const { data: cart } = useGetCartQuery()
  const snackbar = useSnackbarStore()
  const router = useRouter()
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

  async function checkout () {
    try {
      isSubmitting.value = true
      await createMutate()
      router.push('/user/order')
      snackbar.add({ text: '結帳成功，感謝您的訂購！', color: 'green' })
    } catch (error) {
      snackbar.addError(error)
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped>
.cart-card-wrap {
  max-width: 800px;
  width: 100%;
}

.cart-header {
  border-bottom: 2px solid #3C3C5A;
}

.cart-title {
  font-size: 22px;
  font-weight: 800;
  color: #3C3C5A;
}

.empty-text {
  font-size: 16px;
  color: #8C90AB;
}

.cart-item-row {
  transition: background-color 0.2s ease;
}

.cart-item-row:last-child {
  border-bottom: none !important;
}

.unavailable-item {
  opacity: 0.6;
}

.item-img-box {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  background-color: #F4F4F8;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.item-img-box:hover .item-img {
  transform: scale(1.05);
}

.item-name {
  font-size: 16px;
  font-weight: 700;
  color: #3C3C5A;
  cursor: pointer;
  transition: color 0.2s ease;
}

.item-name:hover {
  color: #EF4628;
}

.item-price {
  font-size: 16px;
  color: #EF4628;
}

.quantity-controller {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  background-color: #FFFFFF;
}

.qty-btn {
  width: 32px;
  height: 32px;
  background-color: #f9fafb;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.qty-btn:hover:not(:disabled) {
  background-color: #ECECF2;
}

.qty-num {
  font-size: 14px;
  color: #3C3C5A;
  min-width: 28px;
  text-align: center;
}

.checkout-btn {
  box-shadow: 0 4px 12px rgba(255, 216, 0, 0.4) !important;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.checkout-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 216, 0, 0.5) !important;
}
</style>

<route lang="yaml">
meta:
  title: 購物車
  login: login-only
  admin: false
</route>
