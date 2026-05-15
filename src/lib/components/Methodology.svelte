<script>
  export let methodology = null;
</script>

{#if methodology}
<section class="methodology-container">
  <div class="title">{methodology.headline}</div>
  {#each methodology.text as item}
    <p>{@html item.value}</p>
  {/each}
</section>
{/if}

<style>
  .methodology-container {
    max-width: 640px;
    font-family: var(--sans);
    width: 100%;
    margin: 3rem auto 2rem;
    padding: 0 1.5rem;
    border: 1.5px solid var(--black);
    border-radius: 5px;
    font-size: 14px;
    color: var(--black);
    text-align: left;
  }

  .title {
    font-size: var(--22px);
    font-weight: 600;
    color: var(--black);
    padding: 1.25rem 0;
    display: block;
    font-weight: bold;
  }

  p {
    margin: 0 0 0.75rem;
    line-height: 1.3;
    font-size: var(--14px);
  }

  .methodology-container :global(a) {
    color: var(--black);
    text-decoration: underline;
    text-decoration-color: var(--black);
    text-underline-offset: 3px;
    font-weight: normal;
  }


  @media (max-width: 600px) {
    .methodology-container {
      padding: 0 1.25rem;
    }
  }
</style>
