<script>
  import { searchQuery } from '../stores/search.js'
  
  let inputValue = $state('')
  let inputError = $state(false)
  
  const MIN_QUERY_LENGTH = 2
  
  function handleSearch() {
    const trimmed = inputValue.trim()
    
    if (trimmed.length < MIN_QUERY_LENGTH) {
      inputError = true
      return
    }
    
    inputError = false
    searchQuery.set(trimmed)
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  
  function handleInput() {
    if (inputError && inputValue.trim().length >= MIN_QUERY_LENGTH) {
      inputError = false
    }
  }
</script>

<div class="search-container">
  <div class="search-wrapper" class:error={inputError}>
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
      <path d="M16 16L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <input 
      type="text" 
      class="search-input"
      placeholder="Введите название группы..."
      bind:value={inputValue}
      onkeydown={handleKeydown}
      oninput={handleInput}
    />
    <button class="search-button" onclick={handleSearch}>
      Найти
    </button>
  </div>
  {#if inputError}
    <p class="error-text">Минимум {MIN_QUERY_LENGTH} символа для поиска</p>
  {/if}
</div>

<style>
  .search-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 12px;
    padding: 4px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .search-wrapper:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(81, 129, 184, 0.2);
  }

  .search-wrapper.error {
    border-color: var(--accent);
  }

  .search-wrapper.error:focus-within {
    box-shadow: 0 0 0 3px rgba(255, 92, 92, 0.2);
  }

  .search-icon {
    width: 20px;
    height: 20px;
    color: var(--text-secondary);
    margin-left: 12px;
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 12px;
    color: var(--text-primary);
    font-size: 15px;
  }

  .search-input::placeholder {
    color: var(--text-secondary);
  }

  .search-button {
    background: var(--primary);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    transition: background 0.2s ease, transform 0.1s ease;
  }

  .search-button:hover {
    background: var(--primary-hover);
  }

  .search-button:active {
    transform: scale(0.98);
  }

  .error-text {
    color: var(--accent);
    font-size: 12px;
    margin-top: 8px;
    padding-left: 4px;
  }

  @media (max-width: 480px) {
    .search-wrapper {
      flex-wrap: wrap;
    }

    .search-input {
      width: 100%;
      order: 1;
    }

    .search-button {
      order: 2;
      width: 100%;
      margin-top: 8px;
    }
  }
</style>