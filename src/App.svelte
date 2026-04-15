<script>
  import Header from './lib/components/Header.svelte'
  import SearchBar from './lib/components/SearchBar.svelte'
  import FilterBar from './lib/components/FilterBar.svelte'
  import GroupList from './lib/components/GroupList.svelte'
  import GroupModal from './lib/components/GroupModal.svelte'
  import Footer from './lib/components/Footer.svelte'
  
  import { 
    searchQuery, 
    groups, 
    loading, 
    error, 
    filterType, 
    filterSort,
    offset, 
    hasMore,
    resetSearch,
    PAGE_SIZE
  } from './lib/stores/search.js'
  
  import { searchGroups } from './lib/utils/mockData.js'
  
  // Выполняем поиск
  async function performSearch() {
    const query = $searchQuery
    
    if (!query || query.length < 2) return
    
    loading.set(true)
    error.set(null)
    
    try {
      const result = await searchGroups(
        query,
        { type: $filterType, sort: $filterSort },
        0,
        PAGE_SIZE
      )
      
      groups.set(result.groups)
      hasMore.set(result.hasMore)
      offset.set(PAGE_SIZE)
    } catch (e) {
      error.set('Произошла ошибка при поиске. Попробуйте ещё раз.')
      console.error(e)
    } finally {
      loading.set(false)
    }
  }
  
  // Загрузка дополнительных результатов
  async function loadMore() {
    if ($loading || !$hasMore) return
    
    loading.set(true)
    
    try {
      const result = await searchGroups(
        $searchQuery,
        { type: $filterType, sort: $filterSort },
        $offset,
        PAGE_SIZE
      )
      
      groups.update(current => [...current, ...result.groups])
      hasMore.set(result.hasMore)
      offset.update(v => v + PAGE_SIZE)
    } catch (e) {
      error.set('Не удалось загрузить больше результатов.')
    } finally {
      loading.set(false)
    }
  }
  
  // Следим за изменением поискового запроса
  $effect(() => {
    if ($searchQuery && $searchQuery.length >= 2) {
      performSearch()
    }
  })
  
  // Следим за изменением фильтров
  $effect(() => {
    // Перезапускаем поиск при изменении фильтров
  })
</script>

<div class="app">
  <Header />
  
  <main class="main">
    <div class="container">
      <SearchBar />
      <FilterBar />
      <GroupList 
        groups={$groups} 
        loading={$loading}
        error={$error}
        hasMore={$hasMore}
        onLoadMore={loadMore}
      />
    </div>
  </main>
  
  <Footer />
  <GroupModal />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex: 1;
    padding: 32px 0;
  }

  @media (max-width: 640px) {
    .main {
      padding: 20px 0;
    }
  }
</style>