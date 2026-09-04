import type { ApiResponse } from '@/types/api'
import type { IKnowledge, KnowledgeForm } from '@/types/knowledge'
import type { AxiosResponse } from 'axios'
import { api, apiAuth } from '@/utils/api'

function buildKnowledgeFormData (data: KnowledgeForm) {
  const fd = new FormData()
  fd.append('title', data.title)
  fd.append('category', data.category)
  fd.append('description', data.description || data.summary || '')
  fd.append('published', data.published.toString())
  if (data.image) {
    fd.append('image', data.image)
  }
  return fd
}

export function create (data: KnowledgeForm): Promise<AxiosResponse<ApiResponse<IKnowledge>>> {
  const fd = buildKnowledgeFormData(data)
  return apiAuth.post('/knowledge', fd)
}

export function update (id: string, data: KnowledgeForm): Promise<AxiosResponse<ApiResponse<IKnowledge>>> {
  const fd = buildKnowledgeFormData(data)
  return apiAuth.patch(`/knowledge/${id}`, fd)
}

export function remove (id: string): Promise<AxiosResponse<ApiResponse<{}>>> {
  return apiAuth.delete(`/knowledge/${id}`)
}

export function get (): Promise<AxiosResponse<ApiResponse<IKnowledge[]>>> {
  return api.get('/knowledge')
}

export function getAll (): Promise<AxiosResponse<ApiResponse<IKnowledge[]>>> {
  return apiAuth.get('/knowledge/all')
}

export function getId (id: string): Promise<AxiosResponse<ApiResponse<IKnowledge>>> {
  return api.get(`/knowledge/${id}`)
}
