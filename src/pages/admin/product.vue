<template>
  <v-container fluid class="pa-8 bg-white min-h-screen">
    <div class="d-flex align-center justify-space-between mb-6">
      <div class="d-flex align-center">
        <div class="title-bar mr-3"></div>
        <h1 class="page-title">商品管理</h1>
      </div>
      <v-btn
        color="secondary"
        variant="flat"
        prepend-icon="mdi-plus"
        to="/admin/product-form"
        class="font-weight-bold"
      >
        新增商品
      </v-btn>
    </div>

    <v-card flat class="rounded-xl border pa-4 bg-white">
      <v-data-table
        :filter-keys="filterKeys"
        :headers="headers"
        :items="products"
        :loading="isLoading"
        :search="search"
      >
        <template #[`item.imageUrl`]="{ value }">
          <v-img aspect-ratio="1/1" :src="value" width="40" class="rounded border" />
        </template>

        <template #[`item.sell`]="{ value }">
          <v-icon v-if="value" icon="mdi-check-circle" color="success" />
          <v-icon v-else icon="mdi-close-circle" color="grey-lighten-1" />
        </template>

        <template #[`item.action`]="{ item }">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            color="secondary"
            :to="'/admin/product-form?id=' + item._id"
            title="編輯商品"
          />
        </template>

        <template #top>
          <v-toolbar class="px-2 bg-transparent" flat>
            <v-text-field
              v-model="search"
              density="compact"
              hide-details
              placeholder="搜尋商品..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              style="max-width: 320px;"
            />
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useGetAllQuery } from '@/quries/product'

  const { data: products, isLoading } = useGetAllQuery()

  const headers = [
    { title: 'ID', key: '_id' },
    { title: '圖片', key: 'imageUrl', sortable: false },
    { title: '名稱', key: 'name' },
    { title: '價格', key: 'price' },
    { title: '分類', key: 'category' },
    { title: '說明', key: 'description' },
    { title: '上架', key: 'sell' },
    { title: '建立日期', key: 'createdAt', value: (item: any) => new Date(item.createdAt).toLocaleString() },
    { title: '修改日期', key: 'updatedAt', value: (item: any) => new Date(item.updatedAt).toLocaleString() },
    { title: '操作', key: 'action', sortable: false },
  ]

  const search = ref('')
  const filterKeys = ['_id', 'name', 'price', 'category', 'description', 'createdAt', 'updatedAt']
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
</style>

<route lang="yaml">
meta:
  layout: admin
  title: 商品管理
  login: login-only
  admin: true
</route>
