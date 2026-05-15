<script>
  import { fade, fly } from 'svelte/transition';

  export let polish = null;
  export let index = 0;
</script>

{#if polish}
  <div class="pick-result" in:fly={{ y: 10, duration: 250 }} out:fade={{ duration: 150 }}>
    <svg class="circle-preview" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill={polish.hex} />
    </svg>

    <div class="pick-info">
      <p class="pick-name">{polish.name}</p>
      <p class="pick-brand">{polish.brand}</p>
      <span class="pick-badge">{polish.finish}</span>
    </div>
  </div>
{/if}

<style>
  .pick-result {
    margin-top: 1.5rem;
    padding: 16px 20px;
    border-radius: var(--border-radius-lg, 12px);
    border: 0.5px solid var(--color-border-secondary);
    background: var(--color-background-secondary);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .circle-preview {
    flex-shrink: 0;
    width: 52px;
    height: 52px;
  }

  .pick-name {
    font-family: var(--sans);
    font-style: italic;
    font-size: 18px;
    color: var(--color-text-primary);
    line-height: 1.1;
  }

  .pick-brand {
    font-size: 12px;
    color: var(--color-text-secondary);
    margin-top: 2px;
  }

  .pick-badge {
    display: inline-block;
    margin-top: 5px;
    font-size: 11px;
    padding: 2px 7px;
    border-radius: 99px;
    background: var(--color-background-primary);
    border: 0.5px solid var(--color-border-secondary);
    color: var(--color-text-secondary);
  }
</style>