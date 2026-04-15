/**
 * Форматирование числа участников
 * 1500 -> 1.5K
 * 15300 -> 15.3K
 * 1200000 -> 1.2M
 */
export function formatMembers(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return count.toString()
}

/**
 * Задержка для имитации API
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Генерация случайного числа в диапазоне
 */
export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Обрезание текста до максимальной длины
 */
export function truncate(text, maxLength) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}