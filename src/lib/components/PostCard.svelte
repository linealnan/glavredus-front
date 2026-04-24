<script>
  import { truncate } from '../utils/format.js'
  
  let { post } = $props()
</script>

<article class="post-card">
  <div class="post-header">
    <div class="group-info">
      <h3 class="group-name">{post.group_name}</h3>
      <a 
        href={post.url} 
        target="_blank" 
        rel="noopener noreferrer"
        class="post-link"
      >
        Открыть пост →
      </a>
    </div>
  </div>
  
  <p class="post-text">
    {truncate(post.text, 300)}
  </p>
  
  <div class="post-footer">
    <span class="post-id">ID: {post.id}</span>
    <a 
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      class="vk-btn"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.528-2.04-1.708-1.056-.96-1.512-1.128-1.812-1.128-.312 0-.528.12-.528.36v1.944c0 .264-.144.384-.792.384-1.176 0-2.544-.72-3.528-2.16-1.512-1.872-1.872-3.24-1.872-4.104 0-.264.12-.528.36-.648.24-.144.528-.168.768-.168h1.44c.336 0 .504.12.648.36.6 1.44 1.608 2.64 2.544 2.64.264 0 .432-.12.432-.36v-.432c-.048-.24-.168-.36-.36-.36-.168 0-.432.096-.72.336-.96.792-1.584 1.632-1.584 2.496 0 .264.12.504.36.6.216.072.432.12.648.12.528 0 .864-.264 1.152-.792.384-.72.576-1.44.576-1.704 0-.24-.12-.432-.36-.432h-.432c-.216.048-.432.192-.576.432-.168.264-.24.528-.24.792 0 .36.168.72.48.96.48.36 1.104.792 1.728 1.2 1.152.744 1.872 1.296 2.16 2.136.264.792.12 1.56-.456 2.136-.48.48-1.176.72-1.944.72z"/>
      </svg>
      Открыть
    </a>
  </div>
</article>

<style>
  .post-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .post-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: var(--primary);
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .group-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .group-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .post-link {
    font-size: 13px;
    color: var(--primary);
    text-decoration: none;
  }

  .post-link:hover {
    text-decoration: underline;
  }

  .post-text {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }

  .post-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }

  .post-id {
    font-size: 12px;
    color: var(--text-secondary);
    font-family: monospace;
  }

  .vk-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--primary);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s ease;
  }

  .vk-btn:hover {
    background: var(--primary-hover);
    color: white;
  }

  .vk-btn svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 480px) {
    .post-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .vk-btn {
      justify-content: center;
    }
  }
</style>