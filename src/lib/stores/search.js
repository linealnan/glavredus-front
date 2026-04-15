import { writable } from 'svelte/store'

// Типы групп
export const filterType = writable('all')
export const filterSort = writable('default')

// Поисковый запрос
export const searchQuery = writable('')

// Результаты поиска
export const groups = writable([])
export const loading = writable(false)
export const error = writable(null)

// Пагинация
export const offset = writable(0)
export const hasMore = writable(true)

// Выбранная группа для модального окна
export const selectedGroup = writable(null)

// Лимит на страницу
export const PAGE_SIZE = 20

// Сброс состояния
export function resetSearch() {
  groups.set([])
  offset.set(0)
  hasMore.set(true)
  error.set(null)
}