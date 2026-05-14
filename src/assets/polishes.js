// polishes.js
// Static metadata. In your real app, replace `polishes` with data
// fetched from your Google Sheet (passed in via load() + page data).

export const FAMILY_ORDER = ['reds', 'pinks', 'purples', 'blues', 'greens', 'nudes', 'darks'];

export const FAMILY_LABELS = {
  reds:    'Reds & corals',
  pinks:   'Pinks',
  purples: 'Purples',
  blues:   'Blues & teals',
  greens:  'Greens',
  nudes:   'Nudes & neutrals',
  darks:   'Darks',
};

export const FAMILY_COLORS = {
  reds:    '#C0111F',
  pinks:   '#E87DAA',
  purples: '#8855AA',
  blues:   '#4477BB',
  greens:  '#4A8C5C',
  nudes:   '#C8A882',
  darks:   '#2A1A2E',
};

export const FINISH_COLORS = {
  cream:   '#D4A882',
  shimmer: '#9977BB',
  glitter: '#E8507A',
};

// ── Sample data ──────────────────────────────────────────────────────────────
// Replace with `export let polishes` passed from +page.svelte via your Sheet.

export const polishes = [
  { name: 'Cherry Bomb',              brand: 'OPI',   hex: '#C0111F', family: 'reds',    finish: 'cream'   },
  { name: 'Malaga Wine',              brand: 'OPI',   hex: '#8B1A1A', family: 'reds',    finish: 'cream'   },
  { name: 'Big Apple Red',            brand: 'OPI',   hex: '#CC2200', family: 'reds',    finish: 'cream'   },
  { name: 'Cajun Shrimp',             brand: 'OPI',   hex: '#D94B35', family: 'reds',    finish: 'cream'   },
  { name: 'Strawberry Margarita',     brand: 'Essie', hex: '#E84060', family: 'reds',    finish: 'shimmer' },
  { name: 'Fishnet Stockings',        brand: 'Essie', hex: '#B22222', family: 'reds',    finish: 'shimmer' },
  { name: 'Bubble Bath',              brand: 'OPI',   hex: '#F2B8C6', family: 'pinks',   finish: 'cream'   },
  { name: 'Mod About You',            brand: 'OPI',   hex: '#E87DAA', family: 'pinks',   finish: 'cream'   },
  { name: 'Pink Flamenco',            brand: 'Essie', hex: '#F06090', family: 'pinks',   finish: 'cream'   },
  { name: 'Limo-scene',               brand: 'Essie', hex: '#D45A8A', family: 'pinks',   finish: 'shimmer' },
  { name: 'Sugar Daddy',              brand: 'OPI',   hex: '#F7C5D0', family: 'pinks',   finish: 'cream'   },
  { name: 'Kiss on the Chic',         brand: 'OPI',   hex: '#E8507A', family: 'pinks',   finish: 'glitter' },
  { name: 'Tickle My France-y',       brand: 'OPI',   hex: '#F5A0B5', family: 'pinks',   finish: 'cream'   },
  { name: 'Princesses Rule',          brand: 'OPI',   hex: '#FFC0CB', family: 'pinks',   finish: 'glitter' },
  { name: 'Do You Lilac It?',         brand: 'OPI',   hex: '#B89FCC', family: 'purples', finish: 'cream'   },
  { name: 'Purple with a Purpose',    brand: 'OPI',   hex: '#7B3F8C', family: 'purples', finish: 'cream'   },
  { name: 'Violet Beauregarde',       brand: 'Zoya',  hex: '#6A3890', family: 'purples', finish: 'cream'   },
  { name: 'Wisteria',                 brand: 'Essie', hex: '#9977BB', family: 'purples', finish: 'shimmer' },
  { name: 'Van Cleef',                brand: 'OPI',   hex: '#4B2060', family: 'purples', finish: 'cream'   },
  { name: 'Grape Set Match',          brand: 'OPI',   hex: '#8855AA', family: 'purples', finish: 'glitter' },
  { name: 'Ski Teal We Drop',         brand: 'OPI',   hex: '#2E8B8B', family: 'blues',   finish: 'cream'   },
  { name: 'Dating a Royal',           brand: 'Essie', hex: '#1A50A0', family: 'blues',   finish: 'cream'   },
  { name: 'Blue My Mind',             brand: 'Essie', hex: '#6699CC', family: 'blues',   finish: 'shimmer' },
  { name: 'Unfor-greta-bly Blue',     brand: 'OPI',   hex: '#4477BB', family: 'blues',   finish: 'cream'   },
  { name: 'Push & Shove',             brand: 'OPI',   hex: '#355070', family: 'blues',   finish: 'cream'   },
  { name: 'Keeping Suzi at Bay',      brand: 'OPI',   hex: '#7EC8C8', family: 'blues',   finish: 'glitter' },
  { name: 'Suzi & the 7 Dusseldorfs', brand: 'OPI',   hex: '#4A8C5C', family: 'greens',  finish: 'cream'   },
  { name: 'This Gal is Fabulous',     brand: 'OPI',   hex: '#7BB57B', family: 'greens',  finish: 'shimmer' },
  { name: 'Jade is the New Black',    brand: 'OPI',   hex: '#295C45', family: 'greens',  finish: 'cream'   },
  { name: 'Envy the Adventure',       brand: 'Zoya',  hex: '#6BAA60', family: 'greens',  finish: 'glitter' },
  { name: 'Turquoise & Caicos',       brand: 'Essie', hex: '#40B0A0', family: 'greens',  finish: 'shimmer' },
  { name: 'Tiramisu for Two',         brand: 'OPI',   hex: '#C8A882', family: 'nudes',   finish: 'cream'   },
  { name: 'Bare My Soul',             brand: 'Essie', hex: '#E8C8A8', family: 'nudes',   finish: 'cream'   },
  { name: 'Sand Tropez',              brand: 'Essie', hex: '#D4A882', family: 'nudes',   finish: 'cream'   },
  { name: "Don't Treat Me Like a Fool", brand: 'OPI', hex: '#BCA08A', family: 'nudes',   finish: 'shimmer' },
  { name: 'Samoan Sand',              brand: 'OPI',   hex: '#D8B898', family: 'nudes',   finish: 'cream'   },
  { name: 'Ballet Slippers',          brand: 'Essie', hex: '#F0DDD8', family: 'nudes',   finish: 'cream'   },
  { name: 'Coconut Creme',            brand: 'Zoya',  hex: '#F5EBD8', family: 'nudes',   finish: 'cream'   },
  { name: 'Lincoln Park After Dark',  brand: 'OPI',   hex: '#2A1A2E', family: 'darks',   finish: 'cream'   },
  { name: 'Black Cherry Chutney',     brand: 'OPI',   hex: '#3D1020', family: 'darks',   finish: 'shimmer' },
  { name: 'Midnight in Moscow',       brand: 'OPI',   hex: '#2C1840', family: 'darks',   finish: 'shimmer' },
  { name: 'Matte About You',          brand: 'Essie', hex: '#1A1A2E', family: 'darks',   finish: 'cream'   },
  { name: 'Starry Night',             brand: 'Zoya',  hex: '#1C2040', family: 'darks',   finish: 'glitter' },
  { name: 'Vampsterdam',              brand: 'OPI',   hex: '#5C1020', family: 'darks',   finish: 'cream'   },
  { name: 'Black Onyx',               brand: 'OPI',   hex: '#111111', family: 'darks',   finish: 'cream'   },
  { name: 'Russian Navy',             brand: 'Essie', hex: '#1A2A50', family: 'darks',   finish: 'cream'   },
  { name: 'Licorice',                 brand: 'OPI',   hex: '#0D0D0D', family: 'darks',   finish: 'glitter' },
];
