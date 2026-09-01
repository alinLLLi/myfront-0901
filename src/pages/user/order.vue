<template>
  <v-container class="pa-8 bg-white min-h-screen" fluid>
    <!-- 512px 幅寬會員中心表單區塊 -->
    <div class="form-container mx-auto">
      <v-card class="rounded-xl border pa-8 bg-white" flat>
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <!-- 1. 帳號 (唯讀/無法修改) -->
          <div class="mb-4">
            <label class="field-label mb-2 d-block">帳號</label>

            <v-text-field
              v-model="account"
              append-inner-icon="mdi-account"
              class="grey-filled-input"
              density="comfortable"
              disabled
              hide-details="auto"
              variant="solo-filled"
            />
          </div>

          <!-- 2. 修改密碼 -->
          <div class="mb-4">
            <label class="field-label mb-2 d-block">修改密碼</label>

            <v-text-field
              v-model="password"
              append-inner-icon="mdi-lock-outline"
              class="grey-filled-input"
              density="comfortable"
              :error-messages="errors.password"
              hide-details="auto"
              placeholder="請輸入新密碼"
              type="password"
              variant="solo-filled"
            />
          </div>

          <!-- 3. 確認密碼 -->
          <div class="mb-8">
            <label class="field-label mb-2 d-block">確認密碼</label>

            <v-text-field
              v-model="confirmPassword"
              append-inner-icon="mdi-lock-check-outline"
              class="grey-filled-input"
              density="comfortable"
              :error-messages="errors.confirmPassword"
              hide-details="auto"
              placeholder="請再次輸入新密碼"
              type="password"
              variant="solo-filled"
            />
          </div>

          <!-- 4. 底部按鈕區 (清除與送出) -->
          <div class="d-flex align-center justify-center ga-6">
            <v-btn
              class="px-8 font-weight-bold"
              color="secondary"
              size="large"
              style="width: 140px; height: 44px;"
              variant="outlined"
              @click="clearForm"
            >
              清除
            </v-btn>

            <v-btn
              class="px-8 font-weight-bold text-secondary"
              color="primary"
              :loading="isSubmitting"
              size="large"
              style="width: 140px; height: 44px; background-color: #FFD800 !important;"
              type="submit"
              variant="flat"
            >
              送出
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { useForm } from 'vee-validate'
  import * as yup from 'yup'
  import { useSnackbarStore } from '@/stores/snackbar'
  import { useUserStore } from '@/stores/user'

  const user = useUserStore()
  const snackbar = useSnackbarStore()

  const schema = yup.object({
    password: yup
      .string()
      .typeError('資料格式錯誤')
      .required('修改密碼必填')
      .min(4, '密碼長度太短'),
    confirmPassword: yup
      .string()
      .typeError('資料格式錯誤')
      .required('確認密碼必填')
      .oneOf([yup.ref('password')], '兩次輸入的密碼不一致'),
  })

  const { defineField, errors, isSubmitting, resetForm, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const account = user.account || '使用者帳號'
  const [password] = defineField('password')
  const [confirmPassword] = defineField('confirmPassword')

  function clearForm () {
    resetForm()
  }

  const submit = handleSubmit(async () => {
    try {
      snackbar.add({ text: '密碼修改成功！', color: 'green' })
      resetForm()
    } catch (error) {
      snackbar.addError(error)
    }
  })
</script>

<style scoped>
.form-container {
  max-width: 512px;
  width: 100%;
}

.field-label {
  font-size: 16px;
  font-weight: 500;
  color: #3C3C5A;
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
</style>

<route lang="yaml">
meta:
  layout: admin
  title: 會員中心
  login: login-only
  admin: false
</route>
