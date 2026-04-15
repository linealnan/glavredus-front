<script>
  const currentYear = new Date().getFullYear()
</script>

<footer class="footer">
  <div class="container footer-content">
    <p class="copyright">
      © {currentYear} glavredus. Поиск групп ВКонтакте.
    </p>
    <p class="disclaimer">
      Демо-версия. Использует моковые данные.
    </p>
  </div>
</footer>

<style>
  .footer {
    margin-top: auto;
    padding: 24px 0;
    border-top: 1px solid var(--border);
    background: var(--surface);
  }

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  .copyright {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
  }

  .disclaimer {
    font-size: 12px;
    color: var(--text-secondary);
    opacity: 0.7;
    margin: 0;
  }

  @media (max-width: 480px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>