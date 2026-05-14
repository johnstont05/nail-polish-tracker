import Papa from 'papaparse';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGsYIc_m9_3z0jxxW35-Xyrque-8crsN1bAhTZmrfSUSdoiUxKWpL8U-PkK7UBFjvtpz4vukN_xRux/pub?output=csv';

const TYPE_TO_FINISH = {
  solid:    'solid',
  metallic: 'metallic',
  glitter:  'glitter',
};

function hexToHsl(hex) {
  // expand shorthand (#abc → #aabbcc)
  const full = hex.length === 4
    ? '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3]
    : hex;
  let r = parseInt(full.slice(1, 3), 16) / 255;
  let g = parseInt(full.slice(3, 5), 16) / 255;
  let b = parseInt(full.slice(5, 7), 16) / 255;
  if (isNaN(r) || isNaN(g) || isNaN(b)) return { h: 0, s: 0, l: 0 };
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hexToFamily(hex) {
  const { h, s, l } = hexToHsl(hex);
  if (l < 15)                    return 'black';
  if (s < 8  && l > 75)          return 'silver';
  if (s < 8)                     return 'gray';
  if (l > 85 && s < 45)          return 'neutral'; // very pale / sheer
  if (s < 15 && l > 55)          return 'neutral'; // muted nude/beige
  if (h < 15 || h >= 345)        return 'red';
  if (h < 45)                    return 'orange';
  if (h < 70)                    return 'yellow';
  if (h < 165)                   return 'green';
  if (h < 255)                   return 'blue';
  if (h < 290)                   return 'purple';
  return 'pink';
}

export async function fetchPolishes() {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const text = await res.text();

  const { data, errors } = Papa.parse(text, { header: true, skipEmptyLines: true });
  if (errors.length) console.warn('CSV parse warnings:', errors);

  return data
    .filter((row) => row.name?.trim() && row.hex?.trim())
    .map((row) => {
      const type = row.type?.trim().toLowerCase() ?? '';
      const hex  = row.hex.trim();
      const { l } = hexToHsl(hex);
      return {
        name:      row.name.trim(),
        brand:     row.brand?.trim() ?? '',
        hex,
        image:     row.image?.trim() ?? '',
        family:    hexToFamily(hex),
        finish:    TYPE_TO_FINISH[type] ?? 'solid',
        lightness: l,
      };
    });
}
