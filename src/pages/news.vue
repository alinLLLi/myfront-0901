<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center mb-6">
      <div class="title-bar mr-3"></div>
      <h1 class="page-title">災防知識與最新訊息</h1>
    </div>

    <v-row>
      <v-col
        v-for="news in newsList"
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
  const newsList = [
    {
      id: 1,
      category: '地震防護',
      date: '2026-08-28',
      title: '防範強震來襲！居家防災家具固定與緊急避難包準備指南規範說明',
      summary: '地震發生時應掌握「趴下、掩護、穩住」三要領。居家大型傢俱應做好防震固定，緊急避難包內應包含高熱量戰備糧食、飲用水、手電筒及個人必備藥品。',
      image: 'https://picsum.photos/seed/disaster1/600/450',
    },
    {
      id: 2,
      category: '颱風防汛',
      date: '2026-08-22',
      title: '極端氣候防汛動員：各地水利署防汛演練與最新淹水警戒系統升級通知',
      summary: '隨著颱風季節來臨，經濟部水利署全面強化全台抽水站運作與感測器警報，民眾可透過手機App接收區域積淹水第一手提醒。',
      image: 'https://picsum.photos/seed/disaster2/600/450',
    },
    {
      id: 3,
      category: '火災避難',
      date: '2026-08-15',
      title: '火災避難新觀念：「趴下、掩護、穩住」與關門避難安全示範',
      summary: '遇到火災時切勿盲目向上逃生，濃煙是最大的致死因子。正確方式為向下逃生或尋求安全房間關門並以濕布塞住門縫等待救援。',
      image: 'https://picsum.photos/seed/disaster3/600/450',
    },
    {
      id: 4,
      category: '國家警報',
      date: '2026-08-09',
      title: '國家級警報測試及各縣市應變中心連線運作狀況綜合報告',
      summary: '測試強震即時警報與細胞廣播通知系統，確保在發生大規模自然災害時能於數秒內將危急警示傳達給全國民眾。',
      image: 'https://picsum.photos/seed/disaster4/600/450',
    },
    {
      id: 5,
      category: '核災救護',
      date: '2026-07-30',
      title: '核子事故緊急應變與全民掩蔽物資儲備作業流程',
      summary: '核生化緊急演習重點介紹，如何正確佩戴防護面罩與服用碘片之時機點注意事項宣導。',
      image: 'https://picsum.photos/seed/disaster5/600/450',
    },
    {
      id: 6,
      category: '社區聯防',
      date: '2026-07-18',
      title: '自主防災社區推動成果：建立在地救援隊與自主避難地圖劃設',
      summary: '強化社區層級的自救與互助能力，發揮鄰里守望相助機制，大幅提升災害發生初期黃金72小時之救援成功率。',
      image: 'https://picsum.photos/seed/disaster6/600/450',
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
