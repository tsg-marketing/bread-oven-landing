import type { MixerProduct } from '../mixers/mixersCatalogUtils';

export type DoughProduct = MixerProduct;

export const CATEGORY_LABELS: Record<string, string> = {
  '380': 'Спиральные',
  '379': 'Лопастные',
  '378': 'Горизонтальные и вакуумные',
  '520': 'Горизонтальные',
  '521': 'Двухскоростные',
  '522': 'Для крутого теста',
  '523': 'Для пельменного теста',
  '553': 'Для пиццы',
};

export const categoryLabel = (id: string, fallback: string) => CATEGORY_LABELS[id] || fallback;

/** Бренд без русской транскрипции в скобках, единый регистр */
export const brandOf = (p: DoughProduct): string => {
  const raw = (p.vendor || p.params?.['Бренд'] || '').trim();
  if (!raw) return '';
  const base = raw.replace(/\s*\(.*?\)\s*/g, '').replace(/["«»]/g, '').trim();
  if (/сарапульск/i.test(raw)) return 'СЭГЗ';
  if (!base) return '';
  if (base === base.toUpperCase() && base.length > 3) return base.charAt(0) + base.slice(1).toLowerCase();
  return base;
};

const KEY_GROUPS: { label: string; words: string[] }[] = [
  { label: 'Объём дежи', words: ['объем дежи', 'объём дежи', 'емкость дежи', 'объем емкости'] },
  { label: 'Загрузка теста', words: ['масса теста', 'загрузка теста'] },
  { label: 'Загрузка муки', words: ['масса муки'] },
  { label: 'Производительность', words: ['производительность'] },
  { label: 'Мощность', words: ['мощность'] },
  { label: 'Напряжение', words: ['напряжение'] },
];

const unitOf = (key: string) => {
  const m = key.match(/\(([^)]+)\)\s*:?\s*$/);
  return m ? m[1].replace(/\.$/, '') : '';
};

/** Ключевые показатели для карточки (до 5) */
export const keyParams = (params: Record<string, string>): [string, string][] => {
  const entries = Object.entries(params || {});
  const out: [string, string][] = [];
  for (const g of KEY_GROUPS) {
    const found = entries.find(([k]) => g.words.some((w) => k.toLowerCase().includes(w)));
    if (!found) continue;
    const unit = unitOf(found[0]);
    const val = found[1].trim().replace(/(\d)[.,](\d*?)0+(?=\D|$)/g, (_m, a, b) => (b ? `${a},${b}` : a));
    out.push([g.label, unit && !val.toLowerCase().includes(unit.toLowerCase().split('/')[0]) ? `${val} ${unit}` : val]);
    if (out.length >= 5) break;
  }
  return out;
};

const VOL_WORDS = [
  'объем дежи',
  'емкость дежи',
  'объем емкости',
  'емкость месильного корыта',
  'объем чаши',
  'объем (л)',
  'объем корыта',
  'объем бункера',
];

/** Объём дежи в литрах или null */
export const volumeOf = (p: DoughProduct): number | null => {
  for (const [k, v] of Object.entries(p.params || {})) {
    const kl = k.toLowerCase().replace(/ё/g, 'е');
    if (!VOL_WORDS.some((w) => kl.includes(w))) continue;
    const m = String(v).match(/\d+(?:[.,]\d+)?/);
    if (m) return parseFloat(m[0].replace(',', '.'));
  }
  return null;
};

export const VOLUME_RANGES: { id: string; label: string; min: number; max: number }[] = [
  { id: 'v1', label: 'до 30 л', min: 0, max: 30 },
  { id: 'v2', label: '30–60 л', min: 30, max: 60 },
  { id: 'v3', label: '60–100 л', min: 60, max: 100 },
  { id: 'v4', label: '100–200 л', min: 100, max: 200 },
  { id: 'v5', label: 'от 200 л', min: 200, max: Infinity },
];

export const volumeRangeOf = (p: DoughProduct): string => {
  const v = volumeOf(p);
  if (v === null) return 'none';
  return VOLUME_RANGES.find((r) => v >= r.min && v < r.max)?.id || 'none';
};
