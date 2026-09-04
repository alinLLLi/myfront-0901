export const categoryOptions = [
  '地震防護',
  '颱風防汛',
  '火災避難',
  '國家警報',
  '核災救護',
  '社區聯防',
] as const

export type TCategoryOptions = (typeof categoryOptions)[number]

export interface IKnowledge {
  _id: string
  id?: string
  title: string
  category: TCategoryOptions
  description: string
  summary?: string
  image: string
  imageUrl: string
  published: boolean
  date?: string
  createdAt: string
  updatedAt: string
}

export interface KnowledgeForm {
  title: string
  category: string
  description?: string
  summary?: string
  published: boolean
  image?: File
}
