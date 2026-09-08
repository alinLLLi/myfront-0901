<template>
  <div class="product-form-page bg-white min-h-screen pa-8">
    <div class="form-max-width mx-auto">
      <v-form :disabled="isSubmitting" @submit.prevent="submit">
        <!-- Top Row: Title on Left, 上架 Checkbox on Right -->
        <div class="d-flex align-center justify-space-between mb-4">
          <h1 class="page-title">{{ isEdit ? '編輯商品' : '新增商品' }}</h1>

          <!-- 上架 Checkbox -->
          <div class="d-flex align-center">
            <v-checkbox
              v-model="sell"
              class="sell-checkbox font-weight-bold"
              color="secondary"
              density="compact"
              :error-messages="errors.sell"
              hide-details
              label="上架"
            />
          </div>
        </div>

        <!-- 1. 名稱 -->
        <div class="field-group mb-4">
          <label class="field-label">名稱</label>

          <v-text-field
            v-model="name"
            append-inner-icon="mdi-pencil"
            class="grey-filled-input"
            density="comfortable"
            :error-messages="errors.name"
            hide-details="auto"
            placeholder="請輸入商品名稱"
            variant="solo-filled"
          />
        </div>

        <!-- 2. 分類與價格 (2 欄位併排) -->
        <v-row class="mb-2">
          <v-col cols="12" sm="6">
            <div class="field-group">
              <label class="field-label">分類</label>

              <v-select
                v-model="category"
                append-inner-icon="mdi-chevron-down"
                class="grey-filled-input"
                density="comfortable"
                :error-messages="errors.category"
                hide-details="auto"
                :items="categoryOptions"
                placeholder="請選擇分類"
                variant="solo-filled"
              />
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <div class="field-group">
              <label class="field-label">價格</label>

              <v-text-field
                v-model="price"
                append-inner-icon="mdi-pencil"
                class="grey-filled-input"
                density="comfortable"
                :error-messages="errors.price"
                hide-details="auto"
                min="0"
                placeholder="請輸入商品價格"
                type="number"
                variant="solo-filled"
              />
            </div>
          </v-col>
        </v-row>

        <!-- 3. 商品說明 -->
        <div class="field-group mb-6">
          <label class="field-label">商品說明</label>

          <v-textarea
            v-model="description"
            class="grey-filled-input"
            density="comfortable"
            :error-messages="errors.description"
            hide-details="auto"
            placeholder="請輸入商品詳細說明..."
            rows="5"
            variant="solo-filled"
          />
        </div>

        <!-- 4. 圖片拖拉上傳區域 (虛線框 2px dashed #8C90AB) -->
        <div class="field-group mb-8">
          <div class="file-upload-dropzone rounded-lg d-flex flex-column align-center justify-center pa-6">
            <vue-file-agent
              ref="fileAgent"
              v-model="fileRecords"
              v-model:raw-model-value="rawFileRecords"
              accept="image/png,image/jpeg"
              class="w-100"
              deletable
              :error-text="{ type: '檔案類型無效', size: '文件大小不應超過 1MB' }"
              help-text="將產品圖片拖拉至此即可上傳"
              :max-files="1"
              max-size="1MB"
            />
          </div>
        </div>

        <!-- 5. 底部黃色「清除」與「送出」按鈕 (置中對齊，底色 #FFD800) -->
        <div class="action-buttons-wrap d-flex justify-center ga-6">
          <button
            class="yellow-action-btn"
            type="button"
            @click="clearForm"
          >
            清除
          </button>

          <button
            class="yellow-action-btn"
            :disabled="isSubmitting"
            type="submit"
          >
            送出
          </button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { TCategoryOptions } from '@/types/product'
  import { useForm } from 'vee-validate'
  import { computed, onMounted, ref, useTemplateRef } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import * as yup from 'yup'
  import { useCreateMutation, useGetAllQuery, useUpdateMutation } from '@/quries/product'
  import { useSnackbarStore } from '@/stores/snackbar'

  const route = useRoute()
  const router = useRouter()
  const fileAgent = useTemplateRef('fileAgent')
  const snackbar = useSnackbarStore()

  const { mutateAsync: createMutate } = useCreateMutation()
  const { mutateAsync: updateMutate } = useUpdateMutation()
  const { data: products } = useGetAllQuery()

  const productId = computed(() => (route.query.id as string) || '')
  const isEdit = computed(() => Boolean(productId.value))

  const categoryOptions = ['避難食物', '生活用品', '外套服飾', '防身用品']

  const schema = yup.object({
    name: yup.string().typeError('資料格式錯誤').required('名稱必填'),
    price: yup.number().typeError('資料格式錯誤').required('價格必填').min(0, '價格錯誤'),
    description: yup.string().typeError('資料格式錯誤').required('說明必填'),
    category: yup.string().typeError('資料格式錯誤').required('分類必填'),
    sell: yup.boolean().typeError('資料格式錯誤').required('上下架必填'),
  })

  const { defineField, errors, isSubmitting, resetForm, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      price: 0,
      description: '',
      category: '避難食物',
      sell: false,
    },
  })

  const [name] = defineField('name')
  const [price] = defineField('price')
  const [description] = defineField('description')
  const [category] = defineField('category')
  const [sell] = defineField('sell')
  const fileRecords = ref<any[]>([])
  const rawFileRecords = ref<any[]>([])

  onMounted(() => {
    if (isEdit.value && products.value) {
      const item = products.value.find(p => p._id === productId.value)
      if (item) {
        name.value = item.name
        price.value = item.price
        description.value = item.description
        category.value = item.category
        sell.value = item.sell
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

    if (!isEdit.value && fileRecords.value.length === 0) {
      snackbar.add({ text: '缺少商品圖片', color: 'red' })
      return
    }

    try {
      const data = {
        ...values,
        category: values.category as TCategoryOptions,
        image: fileRecords.value[0]?.file,
      }
      await (isEdit.value
        ? updateMutate({ id: productId.value, data })
        : createMutate(data)
      )

      snackbar.add({ text: '儲存成功', color: 'green' })
      router.push('/admin/product')
    } catch (error) {
      snackbar.addError(error)
    }
  })
</script>

<style scoped>
.product-form-page {
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
  title: 新增商品
  login: login-only
  admin: true
</route>
