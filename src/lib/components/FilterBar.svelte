<script>
  import { filterType, filterSort, searchQuery, groups, loading, resetSearch } from '../stores/search.js'
  
  function handleTypeChange(event) {
    filterType.set(event.target.value)
    // Перезапускаем поиск при изменении фильтра
    if ($searchQuery) {
      resetSearch()
      searchQuery.set($searchQuery)
    }
  }
  
  function handleSortChange(event) {
    filterSort.set(event.target.value)
    // Перезапускаем поиск при изменении сортировки
    if ($searchQuery) {
      resetSearch()
      searchQuery.set($searchQuery)
    }
  }
</script>

<div class="filters">
  <div class="filter-group">
    <label class="filter-label" for="type-select">Тип группы</label>
    <select 
      id="type-select" 
      class="filter-select"
      value={$filterType}
      onchange={handleTypeChange}
      disabled={$loading}
    >
      <option value="all">Все группы</option>
      <option value="open">Открытые</option>
      <option value="closed">Закрытые</option>
    </select>
  </div>
  
  <div class="filter-group">
    <label class="filter-label" for="sort-select">Сортировка</label>
    <select 
      id="sort-select" 
      class="filter-select"
      value={$filterSort}
      onchange={handleSortChange}
      disabled={$loading}
    >
      <option value="default">По умолчанию</option>
      <option value="members">По участникам</option>
      <option value="growth">По активности</option>
    </select>
  </div>
  
  <div class="results-count">
    {#if $groups.length > 0}
      Найдено: <strong>{$groups.length}</strong>
    {/if}
  </div>
</div>

<style>
  .filters {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: 24px;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-label {
    font-size: 13px;
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .filter-select {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 32px 8px 12px;
    color: var(--text-primary);
    font-size: 14px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23939393' d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: border-color 0.2s ease;
  }

  .filter-select:hover {
    border-color: var(--text-secondary);
  }

  .filter-select:focus {
    outline: none;
    border-color: var(--primary);
  }

  .filter-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .results-count {
    margin-left: auto;
    font-size: 13px;
    color: var(--text-secondary);
  }

  .results-count strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
      align-items: flex-start;
    }

    .filter-group {
      width: 100%;
    }

    .filter-select {
      flex: 1;
    }

    .results-count {
      margin-left: 0;
    }
  }
</style>