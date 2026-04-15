<script>
  // Header component
</script>

<header class="header">
  <div class="container header-content">
    <div class="logo">
      <svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/>
        <path d="M10 16L14 20L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h1 class="logo-text">glavredus</h1>
    </div>
    <p class="tagline">Поиск групп ВКонтакте</p>
  </div>
</header>

<style>
  .header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 20px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    color: var(--primary);
  }

  .logo-text {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.5px;
  }

  .tagline {
    color: var(--text-secondary);
    font-size: 14px;
  }

  @media (max-width: 480px) {
    .header-content {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .tagline {
      font-size: 12px;
    }
  }
</style>