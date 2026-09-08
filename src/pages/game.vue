<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center mb-6">
      <div class="title-bar mr-3"></div>
      <h1 class="page-title">防災小英雄 ‧ 互動闖關遊戲</h1>
    </div>

    <!-- Game Card Wrapper -->
    <v-card flat class="rounded-xl overflow-hidden bg-white pa-8 text-center">
      <div class="game-stage-box rounded-lg pa-8 mb-6" style="background-color: #3C3C5A; color: #FFFFFF;">
        <div class="mb-4">
          <v-icon icon="mdi-gamepad-variant" size="72" color="#FFD800" />
        </div>
        <h2 class="text-h4 font-weight-bold mb-4" style="color: #FFD800;">第一關：地震應對選擇題</h2>
        <p class="text-subtitle-1 mb-6" style="max-width: 600px; margin: 0 auto; color: #ECECF2;">
          當你在室內突然感受到劇烈搖晃，桌子就在身旁，你第一時間應該怎麼做？
        </p>

        <div class="d-flex flex-column align-center ga-3 max-w-400 mx-auto">
          <v-btn
            v-for="(ans, idx) in answers"
            :key="idx"
            block
            size="large"
            :color="selectedAns === idx ? (idx === 0 ? 'success' : 'error') : 'surface'"
            variant="flat"
            class="font-weight-bold text-none py-3"
            @click="checkAnswer(idx)"
          >
            {{ ans }}
          </v-btn>
        </div>

        <div v-if="feedback" class="mt-6 text-h6 font-weight-bold" :class="isCorrect ? 'text-teal-accent-3' : 'text-deep-orange-accent-2'">
          {{ feedback }}
        </div>
      </div>

      <v-btn color="secondary" size="large" rounded="pill" class="px-8 font-weight-bold" @click="resetGame">
        重新挑戰 / 下一關
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const answers = [
    'A. 趴下、掩護、穩住，躲在堅固桌下',
    'B. 立刻搭乘電梯向下逃生',
    'C. 衝到窗戶邊向外大聲呼救',
    'D. 站在大燈或吊燈正下方觀察',
  ]

  const selectedAns = ref<number | null>(null)
  const feedback = ref('')
  const isCorrect = ref(false)

  function checkAnswer (idx: number) {
    selectedAns.value = idx
    if (idx === 0) {
      isCorrect.value = true
      feedback.value = '🎉 正確答案！「趴下、掩護、穩住」是地震保命三步驟！'
    } else {
      isCorrect.value = false
      feedback.value = '❌ 答錯囉！危急時刻搭電梯或靠近吊燈非常危險！'
    }
  }

  function resetGame () {
    selectedAns.value = null
    feedback.value = ''
    isCorrect.value = false
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

.max-w-400 {
  max-width: 400px;
}
</style>

<route lang="yaml">
meta:
  title: 防災遊戲
</route>
