<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center mb-6">
      <div class="title-bar mr-3"></div>
      <h1 class="page-title">防災懶人包圖解卡片</h1>
    </div>

    <v-row>
      <v-col v-for="guide in guides" :key="guide.id" cols="12" md="6" lg="4">
        <v-card flat class="guide-card rounded-lg h-100 pa-4">
          <v-responsive aspect-ratio="1.3333" class="mb-4">
            <v-img :src="guide.image" cover class="rounded-lg h-100" />
          </v-responsive>
          <h2 class="text-h6 font-weight-bold mb-2" style="color: #3C3C5A;">{{ guide.title }}</h2>
          <p class="text-body-2 text-grey-darken-1 mb-4">{{ guide.description }}</p>
          <v-btn color="secondary" variant="outlined" size="small" block prepend-icon="mdi-download">
            下載高清懶人包 (PDF)
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const guides = [
    {
      id: 1,
      title: '家庭緊急避難包黃金清單',
      description: '圖解說明 15 項必備避難物資，包含水、高熱量乾糧、哨子與個人藥品。',
      image: 'https://picsum.photos/seed/guide1/600/450',
    },
    {
      id: 2,
      title: '地震應變三要領懶人包',
      description: '趴下、掩護、穩住！圖解室內、戶外與行車中的地震防護處置步驟。',
      image: 'https://picsum.photos/seed/guide2/600/450',
    },
    {
      id: 3,
      title: '火災避難濃煙對策圖卡',
      description: '濃煙是火災最危險因素。示範關門避難、壓低身體逃生與正確通報要領。',
      image: 'https://picsum.photos/seed/guide3/600/450',
    },
  ]
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

.guide-card {
  background-color: #FFFFFF !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}
</style>

<route lang="yaml">
meta:
  title: 防災懶人包
</route>
