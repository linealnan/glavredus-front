<script>
  import { formatMembers, truncate } from '../utils/format.js'
  import { selectedGroup } from '../stores/search.js'
  
  let { group } = $props()
  
  function openModal() {
    selectedGroup.set(group)
  }
</script>

<article class="group-card">
  <div class="card-header">
    <img 
      src={group.avatar} 
      alt={group.name}
      class="avatar"
      loading="lazy"
    />
    <div class="card-info">
      <h3 class="name">
        {#if group.is_verified}
          <span class="verified-badge" title="Подтверждённая группа">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 6.5l-4.5 4.5-2-2L4.5 11.5 7 14l5.5-5.5-1-1z"/>
            </svg>
          </span>
        {/if}
        {group.name}
      </h3>
      <span class="activity">{group.activity}</span>
    </div>
  </div>
  
  <p class="description">
    {truncate(group.description, 120)}
  </p>
  
  <div class="card-footer">
    <div class="stats">
      <span class="members">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9c4.41 0 8-2.69 8-6s-3.59-6-8-6-8 2.69-8 6 3.59 6 8 6zm0-10c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
        </svg>
        {formatMembers(group.members_count)}
      </span>
      <span class="status" class:closed={group.is_closed}>
        {group.is_closed ? 'Закрытая' : 'Открытая'}
      </span>
    </div>
    <button class="details-btn" onclick={openModal}>
      Подробнее
    </button>
  </div>
</article>

<style>
  .group-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .group-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: var(--primary);
  }

  .card-header {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    object-fit: cover;
    background: var(--border);
    flex-shrink: 0;
  }

  .card-info {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 4px 0;
    display: flex;
    align-items: center;
    gap: 6px;
    line-height: 1.3;
  }

  .verified-badge {
    color: var(--primary);
    flex-shrink: 0;
  }

  .verified-badge svg {
    width: 16px;
    height: 16px;
  }

  .activity {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .description {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }

  .stats {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
  }

  .members {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--text-primary);
    font-weight: 500;
  }

  .members svg {
    width: 16px;
    height: 16px;
    color: var(--text-secondary);
  }

  .status {
    color: #4bb34b;
    font-size: 12px;
  }

  .status.closed {
    color: var(--accent);
  }

  .details-btn {
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .details-btn:hover {
    background: var(--primary);
    color: white;
  }

  @media (max-width: 480px) {
    .avatar {
      width: 52px;
      height: 52px;
    }

    .name {
      font-size: 15px;
    }

    .card-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .stats {
      justify-content: space-between;
    }

    .details-btn {
      width: 100%;
    }
  }
</style>