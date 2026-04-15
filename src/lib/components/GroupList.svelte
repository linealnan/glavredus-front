<script>
  import GroupCard from './GroupCard.svelte'
  
  let { groups = [], loading = false, error = null, hasMore = false, onLoadMore = () => {} } = $props()
</script>

<div class="group-list">
  {#if error}
    <div class="error-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>
      <p>{error}</p>
    </div>
  {:else if groups.length === 0 && !loading}
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M8 8l6 6M14 8l-6 6"/>
      </svg>
      <p>Введите название группы для поиска</p>
      <span>Минимум 2 символа</span>
    </div>
  {:else}
    <div class="groups-grid">
      {#each groups as group (group.id)}
        <GroupCard {group} />
      {/each}
    </div>
    
    {#if hasMore}
      <div class="load-more">
        <button class="load-more-btn" onclick={onLoadMore} disabled={loading}>
          {#if loading}
            <span class="spinner"></span>
            Загрузка...
          {:else}
            Загрузить ещё
          {/if}
        </button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .group-list {
    min-height: 300px;
  }

  .groups-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .error-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    color: var(--text-secondary);
  }

  .error-state svg {
    width: 48px;
    height: 48px;
    color: var(--accent);
    margin-bottom: 16px;
  }

  .empty-state svg {
    width: 64px;
    height: 64px;
    color: var(--border);
    margin-bottom: 16px;
  }

  .error-state p,
  .empty-state p {
    font-size: 16px;
    color: var(--text-primary);
    margin: 0 0 8px 0;
  }

  .empty-state span {
    font-size: 13px;
  }

  .load-more {
    display: flex;
    justify-content: center;
    padding: 32px 0;
  }

  .load-more-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-primary);
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .load-more-btn:hover:not(:disabled) {
    border-color: var(--primary);
    background: var(--surface-hover);
  }

  .load-more-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 1024px) {
    .groups-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .groups-grid {
      grid-template-columns: 1fr;
    }
  }
</style>