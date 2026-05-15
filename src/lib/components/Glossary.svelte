<script>
  import { onMount } from 'svelte';
  import BlobGrid from './BlobGrid.svelte';
  import { fetchPolishes } from '../fetchPolishes.js';
  import { polishCount } from '../stores.js';

  let polishes = [];
  let loading  = true;
  let error    = null;

  onMount(async () => {
    try {
      polishes = await fetchPolishes();
      polishCount.set(polishes.length);
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
</script>


<div class="glossary-page">
  {#if loading}
    <div class="loading-center">
      <svg class="loading-bottle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340.98 676.45">
        <path fill="#e0e0e0" d="M262.04,312.34l-.61-.17c-25.19-3.57-48.52-5.34-69.54-5.99-12.42-.39-25.64-.43-39.59,0-21.03.65-44.35,2.42-69.54,5.99l-.61.17c-56.16,13.29-58.37,74.22-55.51,122.54,1.46,31.01,4.44,61.79,9.62,92.3,7.33,43.2,10.45,64.88,16.51,74.45,40.1,63.27,198.54,63.27,238.64,0,6.06-9.57,9.18-31.26,16.51-74.45,5.18-30.52,8.16-61.3,9.62-92.3,2.86-48.32.65-109.25-55.51-122.54Z"/>
        <path fill="#1a1a1a" d="M248.26,65.75c-.03-2.39-.42-4.56-1.08-6.52-7.07-20.96-47.18-25.12-68.6-25.83v-.07c-.95-.03-3.26-.08-6.5-.06-3.24-.02-5.55.03-6.5.06v.07c-21.41.71-61.53,4.87-68.6,25.83-.66,1.96-1.05,4.13-1.08,6.52-4.94,82.87-9.88,165.74-14.83,248.6,25.68,6.76,61.56,13.17,104.38,11.56,30.56-1.15,56.83-6.08,77.6-11.56-4.94-82.87-9.88-165.74-14.83-248.6Z"/>
      </svg>
      <p class="loading-text">Loading the collection...</p>
    </div>
  {:else if error}
    <p class="status error">Couldn't load the sheet: {error}</p>
  {:else}
    <BlobGrid {polishes} />
  {/if}
</div>

<style>
  .glossary-page {
    max-width: 860px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 2rem;
  }

  .loading-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh;
    gap: 1rem;
  }

  .loading-bottle {
    width: 48px;
    animation: bob 1.2s ease-in-out infinite;
  }

  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }

  .loading-text {
    font-size: 13px;
    color: var(--color-text-secondary);
  }

  .status.error {
    margin-top: 2rem;
    font-size: 14px;
    color: #c0392b;
  }
</style>