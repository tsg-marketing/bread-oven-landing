import type { MixerProduct } from '../mixers/mixersCatalogUtils';

export type RollingProduct = MixerProduct;

export const CATEGORY_LABELS: Record<string, string> = {
  floor: 'Напольные',
  table: 'Настольные',
  auto: 'Автоматические',
  hard: 'Для крутого теста',
  noodle: 'Лапшерезки',
  lavash: 'Для лаваша и пиццы',
};

export const categoryLabel = (id: string, fallback: string) => CATEGORY_LABELS[id] || fallback;

/** Бренд без русской транскрипции в скобках, единый регистр */
export const brandOf = (p: RollingProduct): string => {
  const raw = (p.vendor || p.params?.['Бренд'] || '').trim();
  if (!raw) return '';
  const base = raw.replace(/\s*\(.*?\)\s*/g, '').replace(/["«»]/g, '').trim();
  if (!base) return '';
  if (/^foodatlas$/i.test(base)) return 'Foodatlas';
  if (base === base.toUpperCase() && base.length > 3) return base.charAt(0) + base.slice(1).toLowerCase();
  return base;
};

const KEY_GROUPS: { label: string; words: string[] }[] = [
  { label: 'Толщина раскатки', words: ['толщина раскат'] },
  { label: 'Ширина валка', words: ['ширина валка', 'ширина рабочей', 'ширина ленты'] },
  { label: 'Лента', words: ['размер конвейерной', 'габариты транспортерной'] },
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
    const unit = unitOf(found[0].replace(/:\s*$/, ''));
    const val = found[1].trim().replace(/(\d)[.,](\d*?)0+(?=\D|$)/g, (_m, a, b) => (b ? `${a},${b}` : a));
    out.push([g.label, unit && !val.toLowerCase().includes(unit.toLowerCase().split('/')[0]) ? `${val} ${unit}` : val]);
    if (out.length >= 5) break;
  }
  return out;
};
