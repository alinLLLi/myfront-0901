import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface INews {
  id: string
  _id?: string
  category: string
  date: string
  title: string
  summary: string
  description?: string
  image: string
  imageUrl?: string
  published: boolean
  createdAt?: string
  updatedAt?: string
}

const STORAGE_KEY = 'disaster_news_list'

export const defaultNewsList: INews[] = [
  {
    id: 'news-1',
    category: '地震防護',
    date: '2026-08-28',
    title: '防範強震來襲！居家防災家具固定與緊急避難包準備指南規範說明',
    summary: '地震發生時應掌握「趴下、掩護、穩住」三要領。居家大型傢俱應做好防震固定，緊急避難包內應包含高熱量戰備糧食、飲用水、手電筒及個人必備藥品。',
    image: 'https://picsum.photos/seed/disaster1/600/450',
    published: true,
    createdAt: '2026-08-28T08:00:00.000Z',
    updatedAt: '2026-08-28T08:00:00.000Z',
  },
  {
    id: 'news-2',
    category: '颱風防汛',
    date: '2026-08-22',
    title: '極端氣候防汛動員：各地水利署防汛演練與最新淹水警戒系統升級通知',
    summary: '隨著颱風季節來臨，經濟部水利署全面強化全台抽水站運作與感測器警報，民眾可透過手機App接收區域積淹水第一手提醒。',
    image: 'https://picsum.photos/seed/disaster2/600/450',
    published: true,
    createdAt: '2026-08-22T08:00:00.000Z',
    updatedAt: '2026-08-22T08:00:00.000Z',
  },
  {
    id: 'news-3',
    category: '火災避難',
    date: '2026-08-15',
    title: '火災避難新觀念：「趴下、掩護、穩住」與關門避難安全示範',
    summary: '遇到火災時切勿盲目向上逃生，濃煙是最大的致死因子。正確方式為向下逃生或尋求安全房間關門並以濕布塞住門縫等待救援。',
    image: 'https://picsum.photos/seed/disaster3/600/450',
    published: true,
    createdAt: '2026-08-15T08:00:00.000Z',
    updatedAt: '2026-08-15T08:00:00.000Z',
  },
  {
    id: 'news-4',
    category: '國家警報',
    date: '2026-08-09',
    title: '國家級警報測試及各縣市應變中心連線運作狀況綜合報告',
    summary: '測試強震即時警報與細胞廣播通知系統，確保在發生大規模自然災害時能於數秒內將危急警示傳達給全國民眾。',
    image: 'https://picsum.photos/seed/disaster4/600/450',
    published: true,
    createdAt: '2026-08-09T08:00:00.000Z',
    updatedAt: '2026-08-09T08:00:00.000Z',
  },
  {
    id: 'news-5',
    category: '核災救護',
    date: '2026-07-30',
    title: '核子事故緊急應變與全民掩蔽物資儲備作業流程',
    summary: '核生化緊急演習重點介紹，如何正確佩戴防護面罩與服用碘片之時機點注意事項宣導。',
    image: 'https://picsum.photos/seed/disaster5/600/450',
    published: true,
    createdAt: '2026-07-30T08:00:00.000Z',
    updatedAt: '2026-07-30T08:00:00.000Z',
  },
  {
    id: 'news-6',
    category: '社區聯防',
    date: '2026-07-18',
    title: '自主防災社區推動成果：建立在地救援隊與自主避難地圖劃設',
    summary: '強化社區層級的自救與互助能力，發揮鄰里守望相助機制，大幅提升災害發生初期黃金72小時之救援成功率。',
    image: 'https://picsum.photos/seed/disaster6/600/450',
    published: true,
    createdAt: '2026-07-18T08:00:00.000Z',
    updatedAt: '2026-07-18T08:00:00.000Z',
  },
]

function getInitialNews (): INews[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // Ignore parse error
    }
  }
  return defaultNewsList
}

function fileToBase64 (file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}

export const useNewsStore = defineStore('news', () => {
  const newsList = ref<INews[]>(getInitialNews())

  watch(newsList, newVal => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    } catch (e) {
      console.warn('Failed to save newsList to localStorage:', e)
    }
  }, { deep: true })

  function getNewsById (id: string) {
    return newsList.value.find(item => item.id === id || item._id === id)
  }

  async function addNews (item: Omit<INews, 'id' | 'date' | 'createdAt' | 'updatedAt'> & { fileImage?: File }) {
    const today = new Date().toISOString().split('T')[0]
    let imageUrl = item.image
    if (item.fileImage) {
      try {
        imageUrl = await fileToBase64(item.fileImage)
      } catch {
        imageUrl = URL.createObjectURL(item.fileImage)
      }
    }
    if (!imageUrl) {
      imageUrl = `https://picsum.photos/seed/news_${Date.now()}/600/450`
    }
    const newArticle: INews = {
      id: `news-${Date.now()}`,
      category: item.category,
      date: today,
      title: item.title,
      summary: item.summary,
      image: imageUrl,
      published: item.published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    newsList.value.unshift(newArticle)
    return newArticle
  }

  async function updateNews (id: string, item: Partial<INews> & { fileImage?: File }) {
    const index = newsList.value.findIndex(n => n.id === id || n._id === id)
    if (index !== -1) {
      let imageUrl = item.image || newsList.value[index].image
      if (item.fileImage) {
        try {
          imageUrl = await fileToBase64(item.fileImage)
        } catch {
          imageUrl = URL.createObjectURL(item.fileImage)
        }
      }
      newsList.value[index] = {
        ...newsList.value[index],
        ...item,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      }
    }
  }

  return {
    newsList,
    getNewsById,
    addNews,
    updateNews,
  }
})
