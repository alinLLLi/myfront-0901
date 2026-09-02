export type TCategoryOptions = '避難食物' | '生活用品' | '外套服飾' | '防身用品'

export interface IProduct {
  _id: string
  name: string
  price: number
  description: string
  category: TCategoryOptions
  sell: boolean
  image: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface ProductForm {
  name: string
  price: number
  description: string
  category: TCategoryOptions
  sell: boolean
  image?: File
}
