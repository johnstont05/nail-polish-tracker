<script>
  // @ts-nocheck
  import Hero       from '$lib/components/Hero.svelte';
  import Glossary   from '$lib/components/Glossary.svelte';
  import Methodology from '$lib/components/Methodology.svelte';
  import contentData from './data/content.json';

  const content = contentData.content ?? [];
  const heroBlock     = content.find(b => b.type === 'hero')?.value;
  const polishesBlock = content.find(b => b.type === 'polishes')?.value;
</script>

<Hero
  description={heroBlock?.description}
  byline={heroBlock?.byline}
  date={heroBlock?.date}
/>

<Glossary />

<Methodology methodology={polishesBlock?.methodology} />
