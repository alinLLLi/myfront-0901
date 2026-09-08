export interface RegisterForm {
  account: string
  password: string
<<<<<<< HEAD
  adminKey?: string
=======
>>>>>>> 4119bf19917c7c726180a8258c0f92fde6a6dcc7
}

export interface LoginForm {
  account: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  account: string
  role: 'user' | 'admin'
  cart: number
}
