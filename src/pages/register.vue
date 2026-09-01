<template>
  <div class="register-page-bg py-10 px-4">
    <div class="form-container rounded-xl pa-8 border shadow-sm">
      <h1 class="text-h5 font-weight-bold text-center mb-6 text-secondary">
        會員註冊
      </h1>

      <v-form :disabled="isSubmitting" @submit.prevent="submit">
        <!-- 帳號欄位 -->
        <v-text-field
          v-model="account"
          :error-messages="errors.account"
          hint="長度 4 ~ 20 的英數字"
          label="帳號"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-account"
          class="mb-3"
        />

        <!-- 密碼欄位 -->
        <v-text-field
          v-model="password"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="errors.password"
          hint="長度 4 ~ 20 字"
          label="密碼"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          class="mb-3"
          @click:append-inner="showPassword = !showPassword"
        />

        <!-- 確認密碼欄位 -->
        <v-text-field
          v-model="confirmPassword"
          :append-inner-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="errors.confirmPassword"
          hint="請再次輸入密碼"
          label="確認密碼"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-lock-check"
          :type="showPasswordConfirm ? 'text' : 'password'"
          class="mb-6"
          @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
        />

        <!-- 下方清除與送出按鈕 -->
        <v-row dense>
          <v-col cols="6">
            <v-btn
              block
              size="large"
              color="grey-lighten-2"
              variant="flat"
              class="font-weight-bold text-secondary"
              @click="clearForm"
            >
              清除
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              size="large"
              color="secondary"
              variant="flat"
              class="font-weight-bold"
              :loading="isSubmitting"
              type="submit"
            >
              送出
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import validator from 'validator'
  import { useForm } from 'vee-validate'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import * as yup from 'yup'
  import { useRegisterMutation } from '@/quries/auth'
  import { useSnackbarStore } from '@/stores/snackbar'

  const { mutateAsync: register } = useRegisterMutation()
  const router = useRouter()
  const snackbar = useSnackbarStore()

  const showPassword = ref(false)
  const showPasswordConfirm = ref(false)

  const schema = yup.object({
    account: yup
      .string()
      .typeError('資料格式錯誤')
      .required('帳號必填')
      .min(4, '帳號必需是 4 個字以上')
      .max(20, '帳號必需是 20 個字以下')
      .test('isAlphanumeric', '帳號只能是英數字', value => validator.isAlphanumeric(value)),
    password: yup
      .string()
      .typeError('資料格式錯誤')
      .required('密碼必填')
      .min(4, '密碼最少 4 個字')
      .max(20, '密碼最長 20 個字'),
    confirmPassword: yup
      .string()
      .typeError('資料格式錯誤')
      .oneOf([yup.ref('password')], '密碼不一致'),
  })

  const { defineField, handleSubmit, isSubmitting, errors, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      account: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [account] = defineField('account')
  const [password] = defineField('password')
  const [confirmPassword] = defineField('confirmPassword')

  function clearForm () {
    resetForm()
  }

  const submit = handleSubmit(async values => {
    try {
      await register({
        account: values.account,
        password: values.password,
      })
      snackbar.add({ text: '註冊成功', color: 'green' })
      router.push('/login')
    } catch (error) {
      snackbar.addError(error)
    }
  })
</script>

<style scoped>
.register-page-bg {
  background-color: #FFFFFF;
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 4-1. 寬度 512px 的 Form */
.form-container {
  width: 100%;
  max-width: 512px;
  background-color: #FFFFFF;
}
</style>

<route lang="yaml">
meta:
  title: 會員註冊
  login: no-login-only
</route>
