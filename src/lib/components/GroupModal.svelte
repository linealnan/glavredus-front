<script>
  import { selectedGroup } from '../stores/search.js'
  import { formatMembers } from '../utils/format.js'
  
  function closeModal() {
    selectedGroup.set(null)
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal()
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $selectedGroup}
  <div class="modal-backdrop" onclick={handleBackdropClick} role="dialog" aria-modal="true">
    <div class="modal">
      <button class="close-btn" onclick={closeModal} aria-label="Закрыть">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="modal-header">
        <img 
          src={$selectedGroup.avatar} 
          alt={$selectedGroup.name}
          class="modal-avatar"
        />
        <div class="modal-title">
          <h2>
            {#if $selectedGroup.is_verified}
              <span class="verified-badge" title="Подтверждённая группа">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 6.5l-4.5 4.5-2-2L4.5 11.5 7 14l5.5-5.5-1-1z"/>
                </svg>
              </span>
            {/if}
            {$selectedGroup.name}
          </h2>
          <span class="screen-name">@{$selectedGroup.screen_name}</span>
        </div>
      </div>
      
      <div class="modal-stats">
        <div class="stat">
          <span class="stat-value">{formatMembers($selectedGroup.members_count)}</span>
          <span class="stat-label">участников</span>
        </div>
        <div class="stat">
          <span class="stat-value" class:status-open={!$selectedGroup.is_closed} class:status-closed={$selectedGroup.is_closed}>
            {$selectedGroup.is_closed ? 'Закрытая' : 'Открытая'}
          </span>
          <span class="stat-label">тип группы</span>
        </div>
        <div class="stat">
          <span class="stat-value">{$selectedGroup.activity}</span>
          <span class="stat-label">категория</span>
        </div>
      </div>
      
      <div class="modal-section">
        <h3>Описание</h3>
        <p>{$selectedGroup.description}</p>
      </div>
      
      <div class="modal-actions">
        <a 
          href="https://vk.com/{$selectedGroup.screen_name}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="vk-link"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.528-2.04-1.708-1.056-.96-1.512-1.128-1.812-1.128-.312 0-.528.12-.528.36v1.944c0 .264-.144.384-.792.384-1.176 0-2.544-.72-3.528-2.16-1.512-1.872-1.872-3.24-1.872-4.104 0-.264.12-.528.36-.648.24-.144.528-.168.768-.168h1.44c.336 0 .504.12.648.36.6 1.44 1.608 2.64 2.544 2.64.264 0 .432-.12.432-.36v-.432c-.048-.24-.168-.36-.36-.36-.168 0-.432.096-.72.336-.96.792-1.584 1.632-1.584 2.496 0 .264.12.504.36.6.216.072.432.12.648.12.528 0 .864-.264 1.152-.792.384-.72.576-1.44.576-1.704 0-.24-.12-.432-.36-.432h-.432c-.216.048-.432.192-.576.432-.168.264-.24.528-.24.792 0 .36.168.72.48.96.48.36 1.104.792 1.728 1.2 1.152.744 1.872 1.296 2.16 2.136.264.792.12 1.56-.456 2.136-.48.48-1.176.72-1.944.72z"/>
          </svg>
          Открыть группу
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal {
    background: var(--surface);
    border-radius: 20px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--surface-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    z-index: 1;
  }

  .close-btn:hover {
    background: var(--border);
    color: var(--text-primary);
  }

  .close-btn svg {
    width: 18px;
    height: 18px;
  }

  .modal-header {
    display: flex;
    gap: 16px;
    padding: 24px;
    padding-right: 60px;
  }

  .modal-avatar {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    object-fit: cover;
    background: var(--border);
    flex-shrink: 0;
  }

  .modal-title h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .verified-badge {
    color: var(--primary);
  }

  .verified-badge svg {
    width: 18px;
    height: 18px;
  }

  .screen-name {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .modal-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 0 24px 24px;
    border-bottom: 1px solid var(--border);
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2px;
  }

  .stat-value.status-open {
    color: #4bb34b;
  }

  .stat-value.status-closed {
    color: var(--accent);
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .modal-section {
    padding: 24px;
  }

  .modal-section h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
    margin: 0 0 8px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .modal-section p {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-primary);
    margin: 0;
  }

  .modal-actions {
    padding: 0 24px 24px;
  }

  .vk-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--primary);
    color: white;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    transition: background 0.2s ease;
    text-decoration: none;
  }

  .vk-link:hover {
    background: var(--primary-hover);
    color: white;
  }

  .vk-link svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    .modal {
      max-height: 95vh;
    }

    .modal-header {
      padding: 20px;
      padding-right: 50px;
    }

    .modal-avatar {
      width: 60px;
      height: 60px;
    }

    .modal-title h2 {
      font-size: 18px;
    }

    .modal-stats {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .stat:last-child {
      grid-column: span 2;
    }
  }
</style>