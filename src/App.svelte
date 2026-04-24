<script>
  import Header from './lib/components/Header.svelte'
  import SearchBar from './lib/components/SearchBar.svelte'
  import PostList from './lib/components/PostList.svelte'
  import Footer from './lib/components/Footer.svelte'
  
  // Post search (API)
  import {
    searchQuery,
    posts,
    loading as postsLoading,
    error as postsError,
    total,
    page,
    hasMore as postsHasMore,
    resetPosts,
        PAGE_SIZE
  } from './lib/stores/posts'
  import { searchPosts } from './lib/api'

  // Выполняем поиск постов (API)
  async function performPostSearch(query) {
    if (!query || query.length < 2) return

    postsLoading.set(true)
    postsError.set(null)
    searchQuery.set(query)
    resetPosts()

    try {
      const result = await searchPosts(query)

      if (result.error) {
        postsError.set(result.error)
      } else {
        posts.set(result.results)
        total.set(result.total)
        postsHasMore.set(result.results.length >= PAGE_SIZE)
        page.set(2)
    }
    } catch (e) {
      postsError.set('Не удалось выполнить поиск. Попробуйте ещё раз.')
      console.error(e)
    } finally {
      postsLoading.set(false)
    }
  }
  
  // Загрузка дополнительных постов
  async function loadMorePosts() {
    if ($postsLoading || !$postsHasMore) return
    // API не поддерживает пагинацию в текущей версии
    postsHasMore.set(false)
  }

  // Обработчик поиска из SearchBar
  function handleSearch(query) {
    performPostSearch(query)
  }
</script>

<div class="app">
  <Header />
  
  <main class="main">
    <div class="container">
      <SearchBar onSearch={handleSearch} />

      <PostList
        posts={$posts}
        loading={$postsLoading}
        error={$postsError}
        hasMore={$postsHasMore}
        onLoadMore={loadMorePosts}
      />
</div>
  </main>
  
  <Footer />
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

  .search-mode {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    }

  .mode-btn {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .mode-btn:hover {
    border-color: var(--primary);
    color: var(--text-primary);
  }

  .mode-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
  }

  @media (max-width: 640px) {
    .main {
      padding: 20px 0;
    }
  }
</style>