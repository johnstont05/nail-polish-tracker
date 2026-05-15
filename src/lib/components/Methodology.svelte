<script>
  let open = false;
</script>

<section class="methodology-container">
  <div class="toggle-label">How I made this</div>

  <div class="content">
    <p>I don't want to buy similar polishes to what I already own — the store lighting makes every color look different from what's at home. So I built this: a live catalog of every shade on my shelf, matched to its actual hex color, that I can pull up while I'm shopping.</p>
    <p>Each polish is logged in a Google Sheet with its name, brand, hex value, finish type, and a swatch photo. The app fetches that sheet directly and renders every bottle as a custom SVG illustration I drew myself.</p>

    {#if open}
      <p>The bottles are sorted manually — I keep a flat list of hex values in the order I want them to appear on the shelf. Changing the order is as simple as rearranging that list. The finish type (solid, metallic, or glitter) is stored in the sheet and rendered as an overlay on the SVG: a diagonal gradient for metallics, scattered sparkle crosses for glitters.</p>
      <p>Built with Svelte and Vite, deployed on Netlify. No backend — just a public Google Sheets CSV export and a bit of color math to derive each polish's color family from its hex value.</p>
      <button class="read-more read-less" on:click={() => open = false}>Read less <span class="caret">▾</span></button>
    {:else}
      <button class="read-more" on:click={() => open = true}>Read more ▾</button>
    {/if}
  </div>
</section>

<style>
  .methodology-container {
    max-width: 640px;
    font-family: var(--sans);
    width: 100%;
    margin: 3rem auto 2rem;
    border-top: 1.5px solid var(--color-border-secondary);
    font-size: 14px;
    color: var(--color-text-secondary);
    text-align: left;
  }

  .toggle-label {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-primary);
    padding: 1.25rem 0;
    display: block;
  }

  .content {
    padding-bottom: 1.25rem;
  }

  p {
    margin: 0 0 0.75rem;
    line-height: 1.6;
  }

  .read-more {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    color: var(--color-text-primary);
    font-weight: 600;
    padding: 0.25rem 0;
    text-decoration: underline;
    text-decoration-color: #ec6aa3;
    text-underline-offset: 3px;
  }

  .read-more:hover {
    text-decoration-color: #000;
  }

  .read-less {
    display: block;
    margin-top: 0.5rem;
  }

  .read-less .caret {
    display: inline-block;
    transform: rotate(180deg);
  }
</style>
