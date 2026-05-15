<script>
  import { pickRandomTrigger, polishCount } from '../stores.js';
  function fireRandom() { pickRandomTrigger.update(n => n + 1); }
</script>

<h1 class="hero-title">The <span class="hero-gloss">Gloss</span>ary</h1>

<p>There's nothing worse than getting home with a new polish and realizing you already own it. This is my fix — every shade I own, so next time I'm at the store I actually know what's on my shelf. Click or hover over any bottle to see more information or <button class="inline-pick" on:click={fireRandom}>pick a random shade </button>.</p>


<style>
  .hero-title {
    font-family: var(--sans);
    font-size: var(--64px);
    font-weight: normal;
    letter-spacing: -0.03em;
    line-height: 1;
    margin: 2.5rem 0 2rem;
    color: var(--color-text-primary);
    text-align: center;
  }

  .hero-gloss {
    font-weight: 900;
    color: black;
  }

  p {
    font-size: var(--20px);
    font-family: var(--sans);
    font-weight: normal;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    color: var(--color-text-secondary);
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  .inline-pick {
    display: inline;
    font: inherit;
    font-size: inherit;
    color: var(--color-text-primary);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: #000;
    text-underline-offset: 3px;
    font-weight: bold;
  }

  .inline-pick:hover {
    opacity: 0.6;
  }

</style>
