import type { MixerProduct } from '../mixers/mixersCatalogUtils';

export type ProoferProduct = MixerProduct & {
  capacity?: string;
  capacityNum?: number;
  capacityGroup?: string;
};

export const CATEGORY_LABELS: Record<string, string> = {
  compact: 'Под конвекционную печь',
  cabinet: 'Шкафы на противни',
  trolley: 'Под тележки',
  stand: 'Подставки под печи',
};

export const CAPACITY_LABELS: Record<string, string> = {
  small: 'До 8 противней',
  large: '10–18 противней',
  trolley: 'Под тележки',
};

export const CAPACITY_ORDER = ['small', 'large', 'trolley'];

export const categoryLabel = (id: string, fallback: string) => CATEGORY_LABELS[id] || fallback;

export const brandOf = (p: ProoferProduct): string => (p.vendor || '').trim();

const KEY_GROUPS: { label: string; words: string[] }[] = [
  { label: 'Температура', words: ['температура (', 'рабочая температура', 'диапазон регулирования температуры', 'диапазон автоматического поддержания температуры'] },
  { label: 'Влажность', words: ['влажност'] },
  { label: 'Противень', words: ['размеры противня', 'размер противня', 'размер вмещаемых'] },
  { label: 'Мощность', words: ['мощность'] },
  { label: 'Напряжение', words: ['напряжение'] },
  { label: 'Габариты', words: ['размеры (', 'габариты'] },
];

const unitOf = (key: string) => {
  const m = key.match(/\(([^)]+)\)\s*:?\s*$/);
  return m ? m[1].replace(/\.$/, '') : '';
};

export const keyParams = (p: ProoferProduct): [string, string][] => {
  const entries = Object.entries(p.params || {});
  const out: [string, string][] = [];
  if (p.capacity) out.push(['Вместимость', p.capacity]);
  for (const g of KEY_GROUPS) {
    const found = entries.find(([k]) => g.words.some((w) => k.toLowerCase().includes(w)));
    if (!found) continue;
    const unit = unitOf(found[0].replace(/:\s*$/, ''));
    const val = found[1].trim();
    out.push([g.label, unit && !val.toLowerCase().includes(unit.toLowerCase().split('/')[0]) ? `${val} ${unit}` : val]);
    if (out.length >= 5) break;
  }
  return out;
};
