import { writable } from 'svelte/store'
import type { SearchResultItem } from '../types'

// Результаты поиска постов
export const posts = writable<SearchResultItem[]>([])
export const loading = writable(false)
export const error = writable<string | null>(null)
export const total = writable(0)

// Пагинация
export const page = writable(1)
export const hasMore = writable(true)
export const PAGE_SIZE = 20

// Текущий поисковый запрос
export const searchQuery = writable('')

// Сброс состояния
export function resetPosts() {
  posts.set([])
  page.set(1)
  hasMore.set(true)
  error.set(null)
  total.set(0)
}