<template>
  <div class="minimal-disaster-page">
    <!-- Top Emergency Bar -->
    <div class="emergency-top-banner">
      <div class="emergency-headline">
        <v-icon icon="mdi-alert-triangle" size="28" color="#FFD800" class="emergency-icon-pulse" />
        <div>
          <h1>國家災時極簡模式 (DISASTER EMERGENCY MODE)</h1>
          <p>已切換為低頻寬高對比緊急避難資訊速報，保障通訊受限時之生命安全</p>
        </div>
      </div>
      <router-link to="/" class="exit-minimal-btn">
        返回一般模式 ✕
      </router-link>
    </div>

    <main class="minimal-body">
      <!-- Direct Emergency Dials Grid (8-4 緊急求救電話專區) -->
      <section class="quick-dial-grid">
        <a href="tel:119" class="dial-card red">
          <span class="dial-number">119</span>
          <span class="dial-label">火警 / 緊急救護</span>
        </a>
        <a href="tel:110" class="dial-card dark">
          <span class="dial-number">110</span>
          <span class="dial-label">警政 / 緊急報案</span>
        </a>
        <a href="tel:1991" class="dial-card yellow">
          <span class="dial-number">1991</span>
          <span class="dial-label">報平安語音專線</span>
        </a>
        <a href="tel:1999" class="dial-card gray">
          <span class="dial-number">1999</span>
          <span class="dial-label">地方災害應變中心</span>
        </a>
      </section>

      <!-- Real-time Alerts List (8-2 即時通報) -->
      <section class="minimal-section">
        <h2 class="minimal-heading">🔴 即時災害通報與警戒範圍</h2>
        <div class="alerts-stack">
          <div v-for="alert in alerts" :key="alert.id" class="alert-box">
            <div class="alert-box-header">
              <span class="alert-type-badge">{{ alert.level === 'critical' ? '重大特報' : '警戒通報' }}</span>
              <span class="alert-time">{{ alert.time }}</span>
            </div>
            <h3 class="alert-title">{{ alert.title }}</h3>
            <p class="alert-desc">{{ alert.details }}</p>
            <div class="alert-loc">📍 影響區域：{{ alert.location }}</div>
          </div>
        </div>
      </section>

      <!-- Immediate Open Shelters (8-3 防災避難處所) -->
      <section class="minimal-section">
        <h2 class="minimal-heading">🏠 開放中之緊急避難收容所</h2>
        <div class="shelter-table-wrap">
          <table class="shelter-table">
            <thead>
              <tr>
                <th>縣市行政區</th>
                <th>避難處所名稱</th>
                <th>詳細地址</th>
                <th>收容現況</th>
                <th>緊急聯絡電話</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sh in shelters" :key="sh.id">
                <td><strong>{{ sh.city }} {{ sh.district }}</strong></td>
                <td>{{ sh.name }}</td>
                <td>{{ sh.address }}</td>
                <td><span class="people-count">{{ sh.currentPeople }}</span> / {{ sh.capacity }} 人</td>
                <td><a :href="'tel:' + sh.phone" class="table-phone">{{ sh.phone }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Earthquake Safety 3 Steps (8-6 避難指引) -->
      <section class="minimal-section">
        <h2 class="minimal-heading">⚡ 突發地震自救 3 要領</h2>
        <div class="survival-three-steps">
          <div class="step-card">
            <span class="step-num">1</span>
            <h3>趴下 (Drop)</h3>
            <p>雙手雙膝著地，避免強烈劇震造成摔倒受傷。</p>
          </div>
          <div class="step-card">
            <span class="step-num">2</span>
            <h3>掩護 (Cover)</h3>
            <p>迅速尋找堅固桌下，並用雙手保護頭部與頸部。</p>
          </div>
          <div class="step-card">
            <span class="step-num">3</span>
            <h3>穩住 (Hold on)</h3>
            <p>抓住桌腳，隨桌子移動，直到劇烈搖晃停止。</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="minimal-footer">
      <p>國家防災中心 24H 災情速報系統 | 建議離線保存此頁面</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const alerts = ref([
    {
      id: 'alt-1',
      title: '【地震特報】東部海域發生規模 6.2 有感地震，沿海居民慎防異常湧浪',
      type: 'earthquake',
      level: 'warning',
      time: '2026-08-20 01:25',
      location: '花蓮外海 25 公里處',
      details: '最大震度花蓮縣 5 弱、宜蘭縣 4 級、台北市 3 級。捷運降速巡檢，目前無重大災情回報。',
    },
    {
      id: 'alt-2',
      title: '【颱風警報】第 14 號中度颱風暴風圈逼近巴士海峽，南部山區嚴防豪雨',
      type: 'typhoon',
      level: 'critical',
      time: '2026-08-19 23:00',
      location: '恆春東南方海面',
      details: '請屏東、高雄、台東山區慎防土石流與溪水暴漲，低窪地區請架設防水閘門。',
    },
  ])

  const shelters = ref([
    {
      id: 'sh-1',
      name: '台北市立信義國中體育館避難收容所',
      city: '台北市',
      district: '信義區',
      address: '台北市信義區松仁路158號',
      capacity: 1200,
      currentPeople: 120,
      phone: '02-2723-6771',
    },
    {
      id: 'sh-2',
      name: '新北市板橋第一體育場防災收容中心',
      city: '新北市',
      district: '板橋區',
      address: '新北市板橋區漢生東路278號',
      capacity: 2500,
      currentPeople: 350,
      phone: '02-2962-0462',
    },
    {
      id: 'sh-3',
      name: '台中市南屯區大墩國民運動中心',
      city: '台中市',
      district: '南屯區',
      address: '台中市南屯區向上路二段201號',
      capacity: 800,
      currentPeople: 45,
      phone: '04-2382-9886',
    },
    {
      id: 'sh-4',
      name: '高雄市立中正技擊館緊急避難中心',
      city: '高雄市',
      district: '苓雅區',
      address: '高雄市苓雅區中正一路99號',
      capacity: 1800,
      currentPeople: 210,
      phone: '07-722-1155',
    },
    {
      id: 'sh-5',
      name: '花蓮縣立體育館 (德興小巨蛋)',
      city: '花蓮縣',
      district: '花蓮市',
      address: '花蓮縣花蓮市達固湖灣大路23號',
      capacity: 3000,
      currentPeople: 580,
      phone: '03-856-4238',
    },
  ])
</script>

<style scoped>
.minimal-disaster-page {
  min-height: 100vh;
  width: 100vw;
  background-color: #12121e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow-y: auto;
}

.emergency-top-banner {
  background-color: #EF4628;
  color: #ffffff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.emergency-headline {
  display: flex;
  align-items: center;
  gap: 14px;
}

.emergency-headline h1 {
  font-size: 20px;
  font-weight: 900;
  margin: 0 0 2px;
  letter-spacing: 0.5px;
}

.emergency-headline p {
  font-size: 13px;
  margin: 0;
  color: #ffe4e0;
}

.emergency-icon-pulse {
  animation: pulse-icon 1s infinite alternate;
}

.exit-minimal-btn {
  background-color: #ffffff;
  color: #EF4628;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.exit-minimal-btn:hover {
  opacity: 0.9;
}

.minimal-body {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* Quick Dial */
.quick-dial-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.dial-card {
  padding: 20px;
  border-radius: 12px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.2s ease;
}

.dial-card:hover {
  transform: scale(1.03);
}

.dial-card.red {
  background-color: #EF4628;
  color: #ffffff;
}

.dial-card.dark {
  background-color: #3C3C5A;
  color: #FFD800;
}

.dial-card.yellow {
  background-color: #FFD800;
  color: #3C3C5A;
}

.dial-card.gray {
  background-color: #8C90AB;
  color: #ffffff;
}

.dial-number {
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 6px;
}

.dial-label {
  font-size: 13px;
  font-weight: 700;
}

.minimal-heading {
  font-size: 20px;
  font-weight: 800;
  color: #FFD800;
  margin: 0 0 16px;
  border-bottom: 2px solid #3C3C5A;
  padding-bottom: 8px;
}

/* Alerts */
.alerts-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-box {
  background-color: #1e1e30;
  border-left: 6px solid #EF4628;
  border-radius: 8px;
  padding: 16px 20px;
}

.alert-box-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.alert-type-badge {
  background-color: #EF4628;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 4px;
}

.alert-time {
  font-size: 12px;
  color: #8C90AB;
}

.alert-title {
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 6px;
  color: #ffffff;
}

.alert-desc {
  font-size: 14px;
  color: #d1d5db;
  margin: 0 0 8px;
  line-height: 1.5;
}

.alert-loc {
  font-size: 13px;
  color: #FFD800;
  font-weight: 700;
}

/* Shelters Table */
.shelter-table-wrap {
  overflow-x: auto;
  background-color: #1e1e30;
  border-radius: 8px;
}

.shelter-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

.shelter-table th, .shelter-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #2d2d48;
}

.shelter-table th {
  background-color: #2a2a44;
  color: #FFD800;
  font-weight: 800;
}

.people-count {
  color: #FFD800;
  font-weight: 800;
}

.table-phone {
  color: #FFD800;
  text-decoration: underline;
  font-weight: 700;
}

/* 3 Steps */
.survival-three-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.step-card {
  background-color: #1e1e30;
  border: 1px solid #3C3C5A;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.step-num {
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  background-color: #FFD800;
  color: #3C3C5A;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 8px;
}

.step-card h3 {
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 6px;
  color: #ffffff;
}

.step-card p {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
}

.minimal-footer {
  margin-top: auto;
  background-color: #0c0c14;
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #8C90AB;
}

@keyframes pulse-icon {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}

@media (max-width: 959px) {
  .quick-dial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .survival-three-steps {
    grid-template-columns: 1fr;
  }
  .minimal-body {
    padding: 16px;
  }
}
</style>

<route lang="yaml">
meta:
  title: 災時極簡模式
  layout: false
</route>
