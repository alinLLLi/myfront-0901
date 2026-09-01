<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center mb-6">
      <div class="title-bar mr-3"></div>
      <h1 class="page-title">災防知識與最新訊息</h1>
    </div>

    <v-row>
      <v-col
        v-for="news in publishedNews"
        :key="news.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card flat class="news-card rounded-lg h-100 pa-2">
          <v-responsive aspect-ratio="1.3333">
            <v-img :src="news.image" cover class="rounded-lg h-100"></v-img>
          </v-responsive>
          <v-card-text class="pa-4">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="news-tag px-3 py-1 rounded-pill">{{ news.category }}</span>
              <span class="news-date">{{ news.date }}</span>
            </div>
            <h2 class="news-title text-clamp-2 mb-3" :title="news.title">
              {{ news.title }}
            </h2>
            <p class="news-desc text-clamp-3 mb-0">
              {{ news.summary }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useNewsStore } from '@/stores/news'

  const newsStore = useNewsStore()

  const publishedNews = computed(() => {
    return newsStore.newsList.filter(item => item.published)
  })
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

.news-card {
  background-color: #FFFFFF !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.news-tag {
  background-color: #FFD800;
  color: #3C3C5A;
  font-size: 12px;
  font-weight: bold;
}

.news-date {
  font-size: 13px;
  color: #8C90AB;
}

.news-title {
  font-size: 17px;
  font-weight: bold;
  color: #3C3C5A;
}

.news-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<route lang="yaml">
meta:
  title: 災防知識
</route>
