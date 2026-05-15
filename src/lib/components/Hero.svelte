<script>
  import { pickRandomTrigger, polishCount } from '../stores.js';
  export let description = "There's nothing worse than getting home from the store with a new nail polish and realizing you already own something similar. This is my fix — every shade I own, so next time I'm at the store I actually know what's on my shelf. Click or hover over any bottle to see more information.";
  export let byline = '';
  export let date = '';
  function fireRandom() { pickRandomTrigger.update(n => n + 1); }
</script>

<div class="hero-wrap">
  <h1 class="hero-title">The <b>Gloss</b>ary</h1>
</div>

<p>{@html description}</p>

{#if byline || date}
  <p class="byline">
    {#if byline}<span class="by">{@html byline}</span>{/if}
    {#if byline && date}<span class="sep"> | </span>{/if}
    {#if date}<time>{date}</time>{/if}
  </p>
{/if}

<button class="random-btn" on:click={fireRandom}>Pick a random shade</button>


<style>
  .hero-wrap {
    position: relative;
    margin: 2.5rem 0 2rem;
    text-align: center;
  }

  .hero-title {
    font-family: var(--display);
    font-size: var(--80px);
    font-weight: normal;
    letter-spacing: -0.03em;
    line-height: 1;
    margin: 0;
    color: var(--black);
    display: inline-block;
  }

  .hero-title b {
    font-weight: 900;
  }

  p {
    font-size: var(--18px);
    font-family: var(--sans);
    font-weight: normal;
    text-align: center;
    max-width: 850px;
    margin: 0 auto;
    color: var(--black);
    line-height: 1.3;
    margin-bottom: 1rem;
    text-wrap: pretty;
  }

  .byline {
    font-family: var(--sans);
    font-size: var(--14px);
    color: var(--black);
    text-align: center;
    margin: 0;
    margin-bottom: 2rem;
    max-width: none;
    width: 100%;
    line-height: 1.45;
  }

  .by { font-weight: 600; }
  .sep { opacity: 0.4; }
  time { opacity: 0.7; }

  .byline :global(a) {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--black);
    text-underline-offset: 3px;
  }

  .random-btn {
    display: block;
    margin: 1.5rem auto 0;
    font-family: var(--sans);
    font-size: var(--16px);
    font-weight: 500;
    color: var(--white);
    background: var(--black);
    border: none;
    border-radius: 5px;
    padding: 0.65rem 0.65rem;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .random-btn:hover { opacity: 0.75; }

  @media (max-width: 600px) {
    .hero-title { font-size: var(--40px); }
    p { font-size: var(--16px); padding: 0 1.25rem; }
  }
</style>
