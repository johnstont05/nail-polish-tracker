<script>
  import BlobSwatch from './BlobSwatch.svelte';
  import { POLISH_ORDER } from '../polishOrder.js';
  import { pickRandomTrigger } from '../stores.js';

  export let polishes = [];

  $: sorted = [...polishes].sort((a, b) => {
    const ai = POLISH_ORDER.indexOf(a.hex);
    const bi = POLISH_ORDER.indexOf(b.hex);
    return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
  });

  let selectedIdx = /** @type {number | null} */ (null);

  function handleSelect(e) {
    selectedIdx = e.detail.index;
  }

  function pickRandom() {
    if (!sorted.length) return;
    const pick = Math.floor(Math.random() * sorted.length);
    selectedIdx = pick;
    setTimeout(() => {
      document.querySelector(`[data-orig-idx="${selectedIdx}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  $: if ($pickRandomTrigger) pickRandom();
</script>

<!-- Shelf -->
<div class="shelf-grid">
  {#each sorted as p, origIdx (origIdx)}
    <div data-orig-idx={origIdx}>
      <BlobSwatch
        polish={p}
        index={origIdx}
        selected={selectedIdx === origIdx}
        on:select={handleSelect}
      />
    </div>
  {/each}
</div>


<style>
  /* bottles: fixed row height so the shelf gradient lines up with each row */
  .shelf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
    grid-auto-rows: 112px;
    column-gap: 14px;
    row-gap: 20px;
    align-items: end;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 100px,
      var(--color-border-secondary) 100px,
      var(--color-border-secondary) 108px,
      transparent 108px,
      transparent 132px
    );
    padding-bottom: 20px;
  }

  @media (max-width: 600px) {
    .shelf-grid {
      grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
      grid-auto-rows: 88px;
      column-gap: 8px;
      row-gap: 16px;
      background-image: repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 78px,
        var(--color-border-secondary) 78px,
        var(--color-border-secondary) 85px,
        transparent 85px,
        transparent 104px
      );
    }
  }

</style>