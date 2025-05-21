<script>
  import { createEventDispatcher } from "svelte";
  export let polishes = [];

  const dispatch = createEventDispatcher();

  function pickRandomPolish() {
    if (polishes.length > 0) {
      const randomPolish = polishes[Math.floor(Math.random() * polishes.length)];
      dispatch("pick", { polish: randomPolish });
    }
  }
</script>

<button class="random-button" on:click={pickRandomPolish}>
  🎲 pick a polish
</button>

<style>
  .random-button {
    background: black;
    color: white;
    font-weight: bold;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .random-button:hover {
    background: #333;
  }
</style>