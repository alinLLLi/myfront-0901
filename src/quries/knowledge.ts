import type { KnowledgeForm } from '@/types/knowledge'
import { defineMutation, defineQuery, useMutation, useQuery, useQueryCache } from '@pinia/colada'
import { useRoute } from 'vue-router'
import * as knowledge from '@/services/knowledge'

// 快取保留時間 5 分鐘
const STALE_TIME = 1000 * 60 * 5

export const useGetQuery = defineQuery(() => {
  return useQuery({
    key: ['knowledge', 'public'],
    query: async () => {
      const { data } = await knowledge.get()
      return data.result
    },
    staleTime: STALE_TIME,
  })
})

export const useGetAllQuery = defineQuery(() => {
  return useQuery({
    key: ['knowledge', 'all'],
    query: async () => {
      const { data } = await knowledge.getAll()
      return data.result
    },
    staleTime: STALE_TIME,
  })
})

export const useGetIdQuery = defineQuery(() => {
  const route = useRoute('/news/[id]')
  return useQuery({
    key: () => ['knowledge', route.params.id],
    query: async () => {
      if (!/^[0-9a-fA-F]{24}$/.test(String(route.params.id))) {
        return null
      }
      const { data } = await knowledge.getId(route.params.id)
      return data.result
    },
    staleTime: STALE_TIME,
  })
})

export const useCreateMutation = defineMutation(() => {
  return useMutation({
    mutation: (data: KnowledgeForm) => knowledge.create(data),
    onSuccess: () => {
      const queryCache = useQueryCache()
      queryCache.invalidateQueries({ key: ['knowledge', 'public'] })
      queryCache.invalidateQueries({ key: ['knowledge', 'all'] })
    },
  })
})

export const useUpdateMutation = defineMutation(() => {
  return useMutation({
    mutation: ({ id, data }: { id: string, data: KnowledgeForm }) => knowledge.update(id, data),
    onSuccess: (response, { id }) => {
      const queryCache = useQueryCache()
      queryCache.invalidateQueries({ key: ['knowledge', 'public'] })
      queryCache.invalidateQueries({ key: ['knowledge', 'all'] })
      queryCache.setQueryData(['knowledge', id], response.data.result)
    },
  })
})

export const useDeleteMutation = defineMutation(() => {
  return useMutation({
    mutation: (id: string) => knowledge.remove(id),
    onSuccess: () => {
      const queryCache = useQueryCache()
      queryCache.invalidateQueries({ key: ['knowledge', 'public'] })
      queryCache.invalidateQueries({ key: ['knowledge', 'all'] })
    },
  })
})
