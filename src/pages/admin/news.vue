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
        :items="knowledges"
        :loading="isLoading"
        :search="search"
      >
        <template #[`item.imageUrl`]="{ item }">
          <v-img aspect-ratio="1.3333" :src="item.imageUrl || item.image" width="60" class="rounded border" />
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
          <div class="d-flex align-center">
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              color="secondary"
              :to="'/admin/news-form?id=' + (item._id || item.id)"
              title="編輯災防知識"
            />
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              color="red"
              title="刪除災防知識"
              @click="handleDelete(String(item._id || item.id))"
            />
          </div>
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
  import { useGetAllQuery, useDeleteMutation } from '@/quries/knowledge'
  import { useSnackbarStore } from '@/stores/snackbar'

  const { data: knowledges, isLoading } = useGetAllQuery()
  const { mutateAsync: deleteMutate } = useDeleteMutation()
  const snackbar = useSnackbarStore()

  const headers = [
    { title: 'ID', key: '_id' },
    { title: '封面圖片', key: 'imageUrl', sortable: false },
    { title: '標題', key: 'title' },
    { title: '分類', key: 'category' },
    { title: '摘要內容', key: 'summary', value: (item: any) => item.summary || item.description },
    { title: '發布狀態', key: 'published' },
    { title: '發布日期', key: 'date', value: (item: any) => item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '') },
    { title: '操作', key: 'action', sortable: false },
  ]

  const search = ref('')
  const filterKeys = ['_id', 'title', 'category', 'summary', 'description', 'date']

  async function handleDelete (id: string) {
    if (!window.confirm('確定要刪除這筆災防知識嗎？')) return
    try {
      await deleteMutate(id)
      snackbar.add({ text: '刪除成功', color: 'green' })
    } catch (error) {
      snackbar.addError(error)
    }
  }
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
