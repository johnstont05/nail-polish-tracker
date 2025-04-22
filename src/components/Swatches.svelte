<script>
  import { onMount } from "svelte";

  let polishes = [];
  let selectedColor = "all colors";
  let colorCategories = [];

  const sheetUrl =
    "https://api.sheetbest.com/sheets/15473abe-cdd3-4f73-8112-ae74a8f75f32";

  onMount(async () => {
    const res = await fetch(sheetUrl);
    polishes = await res.json();

    // extract unique color categories from the sheet
    const colors = new Set(
      polishes.map((p) => p.color?.toLowerCase()).filter(Boolean)
    );
    colorCategories = ["all colors", ...Array.from(colors)];
  });

  // Filter the polishes by selected color category
  $: filteredPolishes =
    selectedColor === "all colors"
      ? polishes
      : polishes.filter((p) => p.color?.toLowerCase() === selectedColor);
</script>

<div class="filter">
  <select id="color-filter" bind:value={selectedColor}>
    {#each colorCategories as color}
      <option value={color}>{color}</option>
    {/each}
  </select>
</div>

<div class="shelf">
  {#each filteredPolishes as polish}
    <div class="bottle">
      <div class="cap"></div>
      <div class="glass" style="background-color: {polish.hex}"></div>
      <div class="label">
        <strong>{polish.name}</strong>
        <em>{polish.brand}</em>
        <small>{polish.type}</small>
      </div>
    </div>
  {/each}
</div>

<style>
  .shelf {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 1.5rem;
    padding: 2rem;
    justify-items: center;
  }

  .filter {
    display: flex;
    justify-content: center; /* Center the dropdown horizontally */
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    font-family: sans-serif;
    margin: 0 auto;
  }

  .filter select {
    padding: 0.5rem;
    font-size: 0.9rem;
    background-color: white; /* Set background to white */
    border: 1.5px solid black;
    border-radius: 4px;
    color: #000000;
    padding: 0.5rem;
    font-size: 0.9rem;
    font-weight: bold;

  }

  .bottle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    background: #fdfdfd;
    border-radius: 1rem;
    padding: 0.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .bottle:hover {
    transform: scale(1.05);
  }

  .cap {
    width: 40px;
    height: 16px;
    background: #222;
    border-radius: 4px 4px 0 0;
    margin-bottom: 2px;
  }

  .glass {
    width: 40px;
    height: 60px;
    border: 2px solid #aaa;
    border-radius: 0 0 6px 6px;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  }

  .label {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.65rem;
    line-height: 1.2;
  }

  .label strong {
    display: block;
    font-size: 0.7rem;
    color: #111;
  }

  .label em {
    display: block;
    font-style: normal;
    color: #555;
  }

  .label small {
    color: #888;
    font-size: 0.6rem;
  }
</style>
