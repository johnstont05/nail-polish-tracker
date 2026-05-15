import AML from 'archieml';
import { writeFileSync } from 'fs';

const DOC_ID = '1cvWc-p2nPo-kY4rrJQe0GqUQs76adiJi2kDZFvnvvig';
const OUT = 'src/data/content.json';

function extractLinks(html) {
  let processed = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '');

  const linkMap = new Map();
  let counter = 0;

  processed = processed.replace(
    /<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, inner) => {
      const text = inner.replace(/<[^>]+>/g, '');
      const decodedHref = href.replace(/&amp;/g, '&');
      let url = decodedHref;
      try {
        const u = new URL(decodedHref);
        url = u.searchParams.get('q') ?? decodedHref;
      } catch {}
      const token = `__LINK_${counter++}__`;
      linkMap.set(token, `<a href="${url}">${text}</a>`);
      return token;
    }
  );

  processed = processed
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

  for (const [token, link] of linkMap) {
    processed = processed.replace(token, link);
  }

  return processed;
}

console.log('Fetching Google Doc...');
const res = await fetch(`https://docs.google.com/document/d/${DOC_ID}/export?format=html`);
if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

const html = await res.text();
const data = AML.load(extractLinks(html));

writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`Saved to ${OUT}`);
console.log(data);
