import type { SearchRequest, SearchResponse } from './types'

// Используем прокси Vite для обхода CORS
const API_BASE_URL = ''

/**
 * Поиск постов по API
 * @param query - поисковый запрос
 * @returns результаты поиска
 */
export async function searchPosts(query: string): Promise<SearchResponse> {
  const request: SearchRequest = { query }
  
  const response = await fetch(`${API_BASE_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    return {
      error: errorText || `HTTP error: ${response.status}`,
      results: [],
      total: 0,
    }
  }
  
  return response.json()
}

/**
 * Генерирует URL для поста ВКонтакте
 */
export function getVkPostUrl(groupId: string, postId: string): string {
  return `https://vk.com/wall${groupId}_${postId}`
}