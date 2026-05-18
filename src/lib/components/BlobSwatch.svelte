<script>
  import { createEventDispatcher } from 'svelte';

  export let polish;
  export let index;
  export let selected = false;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('select', { polish, index });
  }

  let hovered = false;
  let tooltipX = 0;
  let tooltipY = 0;
  let tooltipFlipped = false;
  let positioned = false;

  $: tooltipVisible = hovered && positioned;

  function onMouseEnter(e) { hovered = true; updateTooltip(e); positioned = true; }
  function onMouseMove(e)  { updateTooltip(e); }
  function onMouseLeave()  { hovered = false; positioned = false; }
  function updateTooltip(e) {
    const rawX = e.clientX + 12;
    tooltipFlipped = rawX + 170 > window.innerWidth;
    tooltipX = tooltipFlipped ? e.clientX - 178 : rawX;
    tooltipY = e.clientY + 12;
    if (tooltipY + 200 > window.innerHeight) tooltipY = e.clientY - 200;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="np-swatch"
  class:selected
  on:click={handleClick}
  on:mouseenter={onMouseEnter}
  on:mousemove={onMouseMove}
  on:mouseleave={onMouseLeave}
  role="button"
  tabindex="0"
  aria-label="{polish.name} by {polish.brand}, {polish.finish}"
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340.98 676.45" class="bottle-svg">
    <defs>
      {#if polish.finish === 'metallic'}
        <linearGradient id="metallic-{index}" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stop-color="white" stop-opacity="0.9" />
          <stop offset="20%"  stop-color="white" stop-opacity="0.4" />
          <stop offset="45%"  stop-color="white" stop-opacity="0.05" />
          <stop offset="70%"  stop-color="black" stop-opacity="0.12" />
          <stop offset="100%" stop-color="white" stop-opacity="0.3" />
        </linearGradient>
      {:else if polish.finish === 'glitter'}
        <pattern id="glitter-{index}" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <line x1="8"  y1="5"  x2="8"  y2="11" stroke="white" stroke-width="1.2" stroke-opacity="0.9"/>
          <line x1="5"  y1="8"  x2="11" y2="8"  stroke="white" stroke-width="1.2" stroke-opacity="0.9"/>
          <line x1="34" y1="28" x2="34" y2="34" stroke="white" stroke-width="1"   stroke-opacity="0.7"/>
          <line x1="31" y1="31" x2="37" y2="31" stroke="white" stroke-width="1"   stroke-opacity="0.7"/>
        </pattern>
      {/if}
    </defs>

    <g>
      <!-- body base color -->
      <path
        fill={polish.hex}
        d="M262.04,312.34l-.61-.17c-25.19-3.57-48.52-5.34-69.54-5.99-12.42-.39-25.64-.43-39.59,0-21.03.65-44.35,2.42-69.54,5.99l-.61.17c-56.16,13.29-58.37,74.22-55.51,122.54,1.46,31.01,4.44,61.79,9.62,92.3,7.33,43.2,10.45,64.88,16.51,74.45,40.1,63.27,198.54,63.27,238.64,0,6.06-9.57,9.18-31.26,16.51-74.45,5.18-30.52,8.16-61.3,9.62-92.3,2.86-48.32.65-109.25-55.51-122.54Z"
      />
      <!-- finish overlay -->
      {#if polish.finish === 'metallic'}
        <path
          fill="url(#metallic-{index})"
          d="M262.04,312.34l-.61-.17c-25.19-3.57-48.52-5.34-69.54-5.99-12.42-.39-25.64-.43-39.59,0-21.03.65-44.35,2.42-69.54,5.99l-.61.17c-56.16,13.29-58.37,74.22-55.51,122.54,1.46,31.01,4.44,61.79,9.62,92.3,7.33,43.2,10.45,64.88,16.51,74.45,40.1,63.27,198.54,63.27,238.64,0,6.06-9.57,9.18-31.26,16.51-74.45,5.18-30.52,8.16-61.3,9.62-92.3,2.86-48.32.65-109.25-55.51-122.54Z"
        />
      {:else if polish.finish === 'glitter'}
        <path
          fill="url(#glitter-{index})"
          d="M262.04,312.34l-.61-.17c-25.19-3.57-48.52-5.34-69.54-5.99-12.42-.39-25.64-.43-39.59,0-21.03.65-44.35,2.42-69.54,5.99l-.61.17c-56.16,13.29-58.37,74.22-55.51,122.54,1.46,31.01,4.44,61.79,9.62,92.3,7.33,43.2,10.45,64.88,16.51,74.45,40.1,63.27,198.54,63.27,238.64,0,6.06-9.57,9.18-31.26,16.51-74.45,5.18-30.52,8.16-61.3,9.62-92.3,2.86-48.32.65-109.25-55.51-122.54Z"
        />
      {/if}
    </g>

    <g>
      <path
        fill="#1a1a1a"
        d="M248.26,65.75c-.03-2.39-.42-4.56-1.08-6.52-7.07-20.96-47.18-25.12-68.6-25.83v-.07c-.95-.03-3.26-.08-6.5-.06-3.24-.02-5.55.03-6.5.06v.07c-21.41.71-61.53,4.87-68.6,25.83-.66,1.96-1.05,4.13-1.08,6.52-4.94,82.87-9.88,165.74-14.83,248.6,25.68,6.76,61.56,13.17,104.38,11.56,30.56-1.15,56.83-6.08,77.6-11.56-4.94-82.87-9.88-165.74-14.83-248.6Z"
      />
    </g>
  </svg>
</div>

{#if tooltipVisible}
  <div class="np-tooltip" style="left:{tooltipX}px; top:{tooltipY}px" aria-hidden="true">
    {#if polish.image}
      <img class="np-tooltip-img" src={polish.image} alt={polish.name} />
    {/if}
    <span class="np-badge">{polish.finish}</span>
    <div class="np-tooltip-name">{polish.name}</div>
    <div class="np-tooltip-brand">{polish.brand}</div>
  </div>
{/if}

<style>
  .np-swatch {
    cursor: pointer;
    position: relative;
    transition: transform 0.15s ease;
    display: flex;
    align-items: flex-end;
  }

  .bottle-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .np-swatch:hover {
    transform: scale(1.08) translateY(-4px);
    z-index: 10;
  }

  .np-swatch.selected {
    transform: scale(1.1) translateY(-8px);
    z-index: 20;
    filter:
      drop-shadow(1px 0 0 #1a1a1a)
      drop-shadow(-1px 0 0 #1a1a1a)
      drop-shadow(0 1px 0 #1a1a1a)
      drop-shadow(0 -1px 0 #1a1a1a);
  }

  .np-swatch:focus-visible {
    outline: 2px solid var(--color-text-primary);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .np-tooltip {
    position: fixed;
    background: var(--white);
    border: 1.5px solid var(--black);
    border-radius: 5px;
    padding: 10px 12px;
    z-index: 9999;
    pointer-events: none;
    width: 170px;
    box-sizing: border-box;
    line-height: 1.3;
  }

  .np-badge {
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: var(--12px);
    padding: 2px 3px;
    border-radius: 5px;
    background: var(--black);
    color: var(--white);
  }

  .np-tooltip-img {
    display: block;
    width: 100%;
    height: 120px;
    object-fit: contain;
    border-radius: 6px;
    margin-bottom: 8px;
  }

  .np-tooltip-name {
    font-weight: 500;
    font-size: var(--16px);
    color: var(--color-text-primary);
    margin-bottom: 2px;
  }

  .np-tooltip-brand {
    color: var(--color-text-secondary);
    font-size: var(--14px);
  }

</style>
