<template>
  <div class="login-page-bg py-10 px-4">
    <div class="form-container rounded-xl pa-8 border shadow-sm">
      <h1 class="text-h5 font-weight-bold text-center mb-6 text-secondary">
        會員登入
      </h1>

      <v-form :disabled="isSubmitting" @submit.prevent="submit">
        <!-- 帳號欄位 -->
        <v-text-field
          v-model="account"
          :error-messages="errors.account"
          label="帳號"
          hint="長度 4 ~ 20 的英數字"
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
          class="mb-2"
          @click:append-inner="showPassword = !showPassword"
        />

        <!-- 4. 加入會員 (文字鏈接) -->
        <div class="d-flex justify-end mb-6">
          <router-link to="/register" class="register-link font-weight-bold">
            還不是會員？加入會員 ↗
          </router-link>
        </div>

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
  import { useLoginMutation } from '@/quries/auth'
  import { useSnackbarStore } from '@/stores/snackbar'

  const { mutateAsync: login } = useLoginMutation()
  const router = useRouter()
  const snackbar = useSnackbarStore()

  const showPassword = ref(false)

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
  })

  const { defineField, handleSubmit, isSubmitting, errors, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      account: '',
      password: '',
    },
  })

  const [account] = defineField('account')
  const [password] = defineField('password')

  function clearForm () {
    resetForm()
  }

  const submit = handleSubmit(async values => {
    try {
      await login({
        account: values.account,
        password: values.password,
      })
      snackbar.add({ text: '登入成功', color: 'green' })
      router.push('/')
    } catch (error) {
      snackbar.addError(error)
    }
  })
</script>

<style scoped>
.login-page-bg {
  background-color: #FFFFFF;
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 4. 寬度 512px 的 Form */
.form-container {
  width: 100%;
  max-width: 512px;
  background-color: #FFFFFF;
}

.register-link {
  color: #3C3C5A;
  font-size: 14px;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #EF4628;
}
</style>

<route lang="yaml">
meta:
  title: 會員登入
  login: no-login-only
</route>
