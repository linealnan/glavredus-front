import { randomBetween } from './format.js'

// Возможные названия групп
const namePrefixes = [
  'Клуб', 'Сообщество', 'Школа', 'Академия', 'Центр', 'Мастерская', 
  'Объединение', 'Кружок', 'Лекторий', 'Хаб', 'Коворкинг', 'Форум',
  'Новости', 'Мир', 'Страна', 'Город', 'Район', 'Улица', 'Дом'
]

const nameMain = [
  'программистов', 'дизайнеров', 'маркетологов', 'предпринимателей', 
  'студентов', 'школьников', 'родителей', 'путешественников', 
  'фотографов', 'музыкантов', 'художников', 'писателей', 
  'спортсменов', 'геймеров', 'киноманов', 'книголюбов', 'кулинаров',
  'садоводов', 'автомобилистов', 'айтишников', 'фрилансеров',
  'инвесторов', 'криптоэнтузиастов', 'стартаперов', 'волонтёров',
  'писателей', 'блогеров', 'видеомейкеров', 'SMMщиков', 'таргетологов'
]

const nameSuffixes = [
  '', 'Москва', 'СПб', 'Россия', 'Украина', 'Беларусь', 'Казахстан',
  'онлайн', '24/7', 'VIP', 'Premium', 'Elite', 'Pro', 'Plus'
]

const activities = [
  'Обучение программированию',
  'Новости технологий',
  'Дизайн интерфейсов',
  'Маркетинг и реклама',
  'Бизнес и стартапы',
  'Путешествия по миру',
  'Фото и видеосъёмка',
  'Музыка и творчество',
  'Спорт и здоровье',
  'Кулинария и рецепты',
  'Садоводство и дача',
  'Автомобили и тюнинг',
  'Игры и киберспорт',
  'Книги и литература',
  'Кино и сериалы',
  'Наука и образование',
  'Психология и саморазвитие',
  'Финансы и инвестиции',
  'Криптовалюты и блокчейн',
  'Волонтёрство и благотворительность'
]

// Генерация случайного названия группы
function generateGroupName() {
  const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)]
  const main = nameMain[Math.floor(Math.random() * nameMain.length)]
  const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)]
  
  return `${prefix} ${main}${suffix ? ' ' + suffix : ''}`
}

// Генерация случайного описания
function generateDescription() {
  const descriptions = [
    'Присоединяйтесь к нашему сообществу единомышленников! Мы проводим регулярные встречи, мастер-классы и обмен опытом.',
    'Лучшее место для тех, кто хочет развиваться и находить новые контакты. Ждём именно тебя!',
    'Официальное сообщество любителей. Здесь вы найдёте единомышленников и полезную информацию.',
    'Добро пожаловать! Мы создаём пространство для общения, обучения и развития.',
    'Наша миссия - объединять людей и помогать им достигать целей. Присоединяйтесь!'
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Генерация URL аватара (используем picsum для демо)
function generateAvatar(id) {
  // Используем разные изображения на основе id
  const seed = id * 7 + 100
  return `https://picsum.photos/seed/${seed}/200`
}

// Генерация списка групп
export function generateMockGroups(query, count = 20, startId = 0) {
  const groups = []
  const queryLower = query.toLowerCase()
  
  for (let i = 0; i < count; i++) {
    const id = startId + i
    const isClosed = Math.random() < 0.15 // 15% закрытых групп
    const isVerified = Math.random() < 0.1 // 10% верифицированных
    
    // Генерируем название с учётом запроса
    let name = generateGroupName()
    if (query && Math.random() < 0.5) {
      // В 50% случаев добавляем ключевое слово в название
      name = `${query.charAt(0).toUpperCase() + query.slice(1)} ${name.split(' ').slice(1).join(' ')}`
    }
    
    // Проверяем, соответствует ли название запросу
    const matchesQuery = !query || name.toLowerCase().includes(queryLower)
    
    if (matchesQuery || !query) {
      groups.push({
        id,
        name,
        screen_name: `club${id}`,
        description: generateDescription(),
        avatar: generateAvatar(id),
        members_count: randomBetween(50, 500000),
        is_closed: isClosed,
        is_verified: isVerified ? true : null,
        activity: activities[Math.floor(Math.random() * activities.length)]
      })
    }
  }
  
  // Сортируем по названию для консистентности
  groups.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  
  return groups
}

// Поиск групп (имитация API)
export async function searchGroups(query, filters, offset = 0, limit = 20) {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 800))
  
  let groups = generateMockGroups(query, limit + 10, offset)
  
  // Применяем фильтр типа
  if (filters.type === 'open') {
    groups = groups.filter(g => !g.is_closed)
  } else if (filters.type === 'closed') {
    groups = groups.filter(g => g.is_closed)
  }
  
  // Применяем сортировку
  if (filters.sort === 'members') {
    groups.sort((a, b) => b.members_count - a.members_count)
  }
  
  // Ограничиваем количество
  groups = groups.slice(0, limit)
  
  // Проверяем, есть ли ещё результаты
  const hasMore = groups.length === limit
  
  return { groups, hasMore }
}