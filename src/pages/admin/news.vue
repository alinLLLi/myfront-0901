<template>
  <v-container fluid class="pa-8 bg-white min-h-screen">
    <div class="d-flex align-center justify-space-between mb-6">
      <div class="d-flex align-center">
        <div class="title-bar mr-3"></div>
        <h1 class="page-title">災防知識管理</h1>
      </div>
      <v-btn
        color="secondary"
        variant="flat"
        prepend-icon="mdi-plus"
        to="/admin/news-form"
        class="font-weight-bold"
      >
        新增災防知識
      </v-btn>
    </div>

    <v-card flat class="rounded-xl border pa-4 bg-white">
      <v-data-table
        :filter-keys="filterKeys"
        :headers="headers"
        :items="newsStore.newsList"
        :search="search"
      >
        <template #[`item.image`]="{ value }">
          <v-img aspect-ratio="1.3333" :src="value" width="60" class="rounded border" />
        </template>

        <template #[`item.published`]="{ value }">
          <v-chip
            :color="value ? 'success' : 'grey-medium'"
            size="small"
            class="font-weight-bold"
          >
            {{ value ? '已發布' : '未發布' }}
          </v-chip>
        </template>

        <template #[`item.action`]="{ item }">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            color="secondary"
            :to="'/admin/news-form?id=' + item.id"
            title="編輯災防知識"
          />
        </template>

        <template #top>
          <v-toolbar class="px-2 bg-transparent" flat>
            <v-text-field
              v-model="search"
              density="compact"
              hide-details
              placeholder="搜尋災防知識標題、分類..."
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
  import { useNewsStore } from '@/stores/news'

  const newsStore = useNewsStore()

  const headers = [
    { title: 'ID', key: 'id' },
    { title: '封面圖片', key: 'image', sortable: false },
    { title: '標題', key: 'title' },
    { title: '分類', key: 'category' },
    { title: '摘要內容', key: 'summary' },
    { title: '發布狀態', key: 'published' },
    { title: '發布日期', key: 'date' },
    { title: '操作', key: 'action', sortable: false },
  ]

  const search = ref('')
  const filterKeys = ['id', 'title', 'category', 'summary', 'date']
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
  title: 災防知識管理
  login: login-only
  admin: true
</route>
