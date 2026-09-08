<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center mb-6">
      <div class="title-bar mr-3"></div>
      <h1 class="page-title">與我聯絡 ‧ 防災諮詢與建議</h1>
    </div>

    <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="pa-6 rounded-lg bg-white h-100">
          <h2 class="text-h6 font-weight-bold mb-4" style="color: #3C3C5A;">線上意見回饋單</h2>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field label="您的姓名" variant="outlined" density="compact" class="mb-3" />
            <v-text-field label="電子郵件" type="email" variant="outlined" density="compact" class="mb-3" />
            <v-select label="諮詢類別" :items="categories" variant="outlined" density="compact" class="mb-3" />
            <v-textarea label="訊息內容" variant="outlined" rows="4" class="mb-4" />
            <v-btn color="secondary" size="large" block class="font-weight-bold" type="submit">
              送出訊息
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card flat class="pa-6 rounded-lg bg-white h-100">
          <h2 class="text-h6 font-weight-bold mb-4" style="color: #3C3C5A;">聯絡資訊與緊急電話</h2>
          <div class="contact-info-list d-flex flex-column ga-4">
            <div class="d-flex align-center">
              <v-icon icon="mdi-phone" color="secondary" size="24" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-1">緊急求救電話</div>
                <div class="text-body-2 text-grey-darken-1">119 (火災救護) / 110 (報案)</div>
              </div>
            </div>
            <div class="d-flex align-center">
              <v-icon icon="mdi-email" color="secondary" size="24" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-1">客服電子信箱</div>
                <div class="text-body-2 text-grey-darken-1">service@disaster-safety.gov.tw</div>
              </div>
            </div>
            <div class="d-flex align-center">
              <v-icon icon="mdi-map-marker" color="secondary" size="24" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-1">服務地址</div>
                <div class="text-body-2 text-grey-darken-1">臺北市中正區防災路 100 號 5 樓</div>
              </div>
            </div>
            <div class="d-flex align-center">
              <v-icon icon="mdi-clock-outline" color="secondary" size="24" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-1">服務時間</div>
                <div class="text-body-2 text-grey-darken-1">週一至週五 08:30 - 17:30 (災害期間 24H 輪值)</div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { useSnackbarStore } from '@/stores/snackbar'

  const categories = ['防災宣導', '物資採購諮詢', '網站建議', '緊急通報與合作']
  const snackbar = useSnackbarStore()

  function handleSubmit () {
    snackbar.add({ text: '感謝您的留言！我們將盡快回覆您。', color: 'green' })
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
  title: 與我聯絡
</route>
