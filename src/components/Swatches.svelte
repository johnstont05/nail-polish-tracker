<script>
  import { onMount } from "svelte";
  import Papa from "papaparse";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";
  import Randomizer from "./Randomizer.svelte";

  let polishes = [];
  let selectedCategory = "all colors";
  let selectedPolish = null;
  let colorCategories = [];

  let polishRefs = [];

  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSGsYIc_m9_3z0jxxW35-Xyrque-8crsN1bAhTZmrfSUSdoiUxKWpL8U-PkK7UBFjvtpz4vukN_xRux/pub?gid=0&single=true&output=csv";

  onMount(async () => {
    const res = await fetch(sheetUrl);
    const csvText = await res.text();
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    polishes = parsed.data;

    const colors = new Set(
      polishes.map((p) => p.color?.toLowerCase()).filter(Boolean)
    );
    colorCategories = ["all colors", ...Array.from(colors)];
  });

  $: filteredPolishes = selectedPolish
    ? polishes.filter((p) => p.name === selectedPolish.name)
    : selectedCategory === "all colors"
      ? polishes
      : polishes.filter((p) => p.color?.toLowerCase() === selectedCategory);

  function setPolishRef(index) {
    return (el) => {
      polishRefs[index] = el;
    };
  }

  function flashFirstVisiblePolish() {
    setTimeout(() => {
      const el = polishRefs[0];
      if (el) {
        el.classList.add("flash");
        el.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          el.classList.remove("flash");
        }, 1000);
      }
    }, 100);
  }

  function handleRandomPick(e) {
    selectedPolish = e.detail.polish;
    selectedCategory = "all colors"; // override category
    flashFirstVisiblePolish();
  }

  // Reset selectedPolish when dropdown changes
  $: if (selectedCategory !== "all colors" && selectedPolish) {
    selectedPolish = null;
  }

  $: polishRefSetters = filteredPolishes.map((_, i) => (el) => polishRefs[i] = el);
</script>

<div class="filter">
  <select bind:value={selectedCategory}>
    {#each colorCategories as color}
      <option value={color}>{color}</option>
    {/each}
  </select>

  <Randomizer {polishes} on:pick={handleRandomPick} />
</div>

<div class="shelf">
{#each filteredPolishes as polish, i (polish.name)}
  <div
    bind:this={polishRefSetters[i]}
    class="dot"
    style="background-color: {polish.hex}"
    data-tooltip="{polish.name} · {polish.brand} · {polish.type}"
  ></div>
{/each}
</div>

<style>
  .shelf {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
    justify-items: center;
  }

  .dot {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #000;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .dot:hover {
    transform: scale(1.1);
  }

  .flash {
    box-shadow: 0 0 0 5px yellow;
  }

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    font-family: sans-serif;
    margin: 0 auto;
  }

  .filter select {
    padding: 0.5rem;
    font-size: 0.9rem;
    background-color: white;
    border: 1.5px solid black;
    border-radius: 4px;
    font-weight: bold;
    color: #000;
  }
</style>