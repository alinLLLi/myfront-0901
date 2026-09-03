<template>
  <div class="news-form-page bg-white min-h-screen pa-8">
    <div class="form-max-width mx-auto">
      <v-form :disabled="isSubmitting" @submit.prevent="submit">
        <!-- Top Row: Title on Left, 發布 Checkbox on Right -->
        <div class="d-flex align-center justify-space-between mb-4">
          <h1 class="page-title">{{ isEdit ? '編輯災防知識' : '新增災防知識' }}</h1>

          <!-- 發布 Checkbox -->
          <div class="d-flex align-center">
            <v-checkbox
              v-model="published"
              :error-messages="errors.published"
              label="發布"
              hide-details
              density="compact"
              color="secondary"
              class="sell-checkbox font-weight-bold"
            />
          </div>
        </div>

        <!-- 1. 標題 -->
        <div class="field-group mb-4">
          <label class="field-label">標題</label>
          <v-text-field
            v-model="title"
            :error-messages="errors.title"
            placeholder="請輸入災防知識標題"
            variant="solo-filled"
            density="comfortable"
            append-inner-icon="mdi-pencil"
            class="grey-filled-input"
            hide-details="auto"
          />
        </div>

        <!-- 2. 分類 -->
        <div class="field-group mb-4">
          <label class="field-label">分類</label>
          <v-select
            v-model="category"
            :error-messages="errors.category"
            :items="categoryOptions"
            placeholder="請選擇災防分類"
            variant="solo-filled"
            density="comfortable"
            append-inner-icon="mdi-chevron-down"
            class="grey-filled-input"
            hide-details="auto"
          />
        </div>

        <!-- 3. 內容與摘要 -->
        <div class="field-group mb-6">
          <label class="field-label">災防知識內容</label>
          <v-textarea
            v-model="summary"
            :error-messages="errors.summary"
            placeholder="請輸入詳細防災應變知識或公告內容..."
            variant="solo-filled"
            density="comfortable"
            rows="6"
            class="grey-filled-input"
            hide-details="auto"
          />
        </div>

        <!-- 4. 封面圖片拖拉上傳區域 (虛線框 2px dashed #8C90AB) -->
        <div class="field-group mb-8">
          <div class="file-upload-dropzone rounded-lg d-flex flex-column align-center justify-center pa-6">
            <vue-file-agent
              ref="fileAgent"
              v-model="fileRecords"
              v-model:raw-model-value="rawFileRecords"
              accept="image/png,image/jpeg"
              deletable
              :error-text="{ type: '檔案類型無效', size: '文件大小不應超過 1MB' }"
              help-text="將封面圖片拖拉至此即可上傳"
              :max-files="1"
              max-size="1MB"
              class="w-100"
            />
          </div>
        </div>

        <!-- 5. 底部黃色「清除」與「送出」按鈕 (置中對齊，底色 #FFD800) -->
        <div class="action-buttons-wrap d-flex justify-center ga-6">
          <button
            type="button"
            class="yellow-action-btn"
            @click="clearForm"
          >
            清除
          </button>
          <button
            type="submit"
            class="yellow-action-btn"
            :disabled="isSubmitting"
          >
            送出
          </button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useForm } from 'vee-validate'
  import { computed, onMounted, ref, useTemplateRef } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import * as yup from 'yup'
  import { useNewsStore } from '@/stores/news'
  import { useSnackbarStore } from '@/stores/snackbar'

  const route = useRoute()
  const router = useRouter()
  const fileAgent = useTemplateRef('fileAgent')
  const snackbar = useSnackbarStore()
  const newsStore = useNewsStore()

  const newsId = computed(() => (route.query.id as string) || '')
  const isEdit = computed(() => Boolean(newsId.value))

  const categoryOptions = [
    '地震防護',
    '颱風防汛',
    '火災避難',
    '國家警報',
    '核災救護',
    '社區聯防',
  ]

  const schema = yup.object({
    title: yup.string().typeError('資料格式錯誤').required('標題必填'),
    category: yup.string().typeError('資料格式錯誤').required('分類必填'),
    summary: yup.string().typeError('資料格式錯誤').required('內容必填'),
    published: yup.boolean().typeError('資料格式錯誤').required('發布狀態必填'),
  })

  const { defineField, errors, isSubmitting, resetForm, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      title: '',
      category: '地震防護',
      summary: '',
      published: true,
    },
  })

  const [title] = defineField('title')
  const [category] = defineField('category')
  const [summary] = defineField('summary')
  const [published] = defineField('published')
  const fileRecords = ref<any[]>([])
  const rawFileRecords = ref<any[]>([])

  onMounted(() => {
    if (isEdit.value) {
      const item = newsStore.getNewsById(newsId.value)
      if (item) {
        title.value = item.title
        category.value = item.category
        summary.value = item.summary
        published.value = item.published
      }
    }
  })

  function clearForm () {
    resetForm()
    if (fileAgent.value) {
      fileAgent.value.deleteFileRecord()
    }
  }

  const submit = handleSubmit(async values => {
    if (fileRecords.value[0]?.error) {
      snackbar.add({ text: '檔案格式錯誤', color: 'red' })
      return
    }

    try {
      const fileImage = fileRecords.value[0]?.file
      if (isEdit.value) {
        await newsStore.updateNews(newsId.value, {
          ...values,
          fileImage,
        })
      } else {
        await newsStore.addNews({
          ...values,
          image: '',
          fileImage,
        })
      }

      snackbar.add({ text: '儲存成功', color: 'green' })
      router.push('/admin/news')
    } catch (error) {
      snackbar.addError(error)
    }
  })
</script>

<style scoped>
.news-form-page {
  background-color: #FFFFFF;
}

.form-max-width {
  max-width: 900px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #3C3C5A;
}

.field-label {
  font-size: 16px;
  font-weight: 500;
  color: #3C3C5A;
  margin-bottom: 8px;
  display: block;
}

:deep(.grey-filled-input .v-field) {
  background-color: #E5E5EB !important;
  border-radius: 4px !important;
  box-shadow: none !important;
}

:deep(.grey-filled-input .v-field__input) {
  color: #3C3C5A !important;
  font-size: 16px;
}

:deep(.grey-filled-input .v-icon) {
  color: #3C3C5A !important;
  opacity: 0.8;
}

.file-upload-dropzone {
  border: 2px dashed #8C90AB;
  background-color: #EBEBEF;
  min-height: 200px;
}

:deep(.vue-file-agent) {
  border: none !important;
  background: transparent !important;
}

:deep(.vue-file-agent .file-select-element) {
  color: #8C90AB !important;
  font-size: 16px;
  font-weight: bold;
}

.yellow-action-btn {
  width: 140px;
  height: 44px;
  background-color: #FFD800;
  color: #3C3C5A;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.yellow-action-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.yellow-action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sell-checkbox {
  color: #3C3C5A;
}
</style>

<route lang="yaml">
meta:
  layout: admin
  title: 新增災防知識
  login: login-only
  admin: true
</route>
