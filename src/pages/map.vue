<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center mb-6">
      <div class="title-bar mr-3"></div>
      <h1 class="page-title">全民防災電子地圖</h1>
    </div>

    <!-- Map interactive container -->
    <v-card flat class="rounded-xl overflow-hidden bg-white pa-6 mb-8">
      <div class="d-flex flex-wrap align-center justify-space-between mb-4 ga-4">
        <div class="d-flex ga-2">
          <v-chip color="secondary" filter variant="flat">全部避難所</v-chip>
          <v-chip color="info" filter variant="outlined">急救醫院</v-chip>
          <v-chip color="warning" filter variant="outlined">消防局 / 警察局</v-chip>
          <v-chip color="error" filter variant="outlined">即時災情警示區</v-chip>
        </div>
        <div class="d-flex align-center">
          <v-btn color="secondary" prepend-icon="mdi-download" class="font-weight-bold">
            下載全區圖資
          </v-btn>
        </div>
      </div>

      <!-- Mock Map Graphical View -->
      <div class="map-view-box rounded-lg overflow-hidden border">
        <svg viewBox="0 0 1000 500" class="w-100 h-100" xmlns="http://www.w3.org/2000/svg">
          <rect width="1000" height="500" fill="#E8ECEF" />
          
          <!-- Rivers & Roads -->
          <path d="M 0 200 Q 300 280 600 150 T 1000 300" stroke="#90CAF9" stroke-width="24" fill="none" />
          <path d="M 200 0 V 500" stroke="#FFFFFF" stroke-width="12" fill="none" />
          <path d="M 600 0 V 500" stroke="#FFFFFF" stroke-width="12" fill="none" />
          <path d="M 0 350 H 1000" stroke="#FFFFFF" stroke-width="14" fill="none" />

          <!-- Region blocks -->
          <rect x="50" y="50" width="120" height="120" rx="8" fill="#C8E6C9" opacity="0.7" />
          <text x="110" y="115" text-anchor="middle" fill="#2E7D32" font-weight="bold">北區避難公園</text>

          <rect x="300" y="80" width="160" height="100" rx="8" fill="#FFF9C4" opacity="0.8" />
          <text x="380" y="135" text-anchor="middle" fill="#F57F17" font-weight="bold">中央體育館收容所</text>

          <rect x="700" y="380" width="180" height="90" rx="8" fill="#FFCDD2" opacity="0.8" />
          <text x="790" y="430" text-anchor="middle" fill="#C62828" font-weight="bold">淹水預警示範區</text>

          <!-- Pins -->
          <g transform="translate(110, 80)">
            <circle cx="0" cy="0" r="14" fill="#17D7BA" />
            <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="12" font-weight="bold">避</text>
          </g>
          <g transform="translate(380, 100)">
            <circle cx="0" cy="0" r="14" fill="#FFD800" />
            <text x="0" y="5" text-anchor="middle" fill="#3C3C5A" font-size="12" font-weight="bold">避</text>
          </g>
          <g transform="translate(790, 400)">
            <circle cx="0" cy="0" r="14" fill="#EF4628" />
            <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="12" font-weight="bold">警</text>
          </g>
        </svg>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
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

.map-view-box {
  height: 500px;
  position: relative;
}
</style>

<route lang="yaml">
meta:
  title: 防災地圖
</route>
