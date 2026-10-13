import type { MixerProduct } from '../mixers/mixersCatalogUtils';

export type DepositorProduct = MixerProduct & {
  performance?: string;
  performanceGroup?: string;
  hoppers?: number;
};

export const PERF_LABELS: Record<string, string> = {
  low: 'До 25 циклов/мин',
  mid: '30–40 циклов/мин, до 200 кг/ч',
  high: 'От 40 циклов/мин',
};

export const PERF_ORDER = ['low', 'mid', 'high'];

export const SERIES: { id: string; label: string; match: RegExp }[] = [
  { id: 'droplet', label: 'Droplet 400', match: /droplet/i },
  { id: 'nfs', label: 'NFS-1000', match: /nfs-1000/i },
  { id: 'omd', label: 'ОМД-2', match: /омд/i },
  { id: 'mok', label: 'МОК', match: /мок/i },
  { id: 'sura', label: 'Сура-ПД600', match: /сура/i },
  { id: 'tk', label: 'TK-P400/600', match: /tk-p/i },
  { id: 'zcd', label: 'TSZCD-400DQ', match: /zcd/i },
];

export const seriesOf = (p: DepositorProduct) => SERIES.find((s) => s.match.test(p.name))?.id || '';

export const brandOf = (p: DepositorProduct): string => (p.vendor || '').trim();

const KEY_GROUPS: { label: string; words: string[] }[] = [
  { label: 'Бункер', words: ['объем бункера', 'вместимость бункера'] },
  { label: 'Дюзы / сопла', words: ['количество дюз', 'количество сопел', 'дозы'] },
  { label: 'Противень', words: ['ширина противня', 'ширина используемого противня', 'размер противня', 'рабочая ширина стола'] },
  { label: 'Дозирование', words: ['диапазон дозирования'] },
  { label: 'Мощность', words: ['мощность'] },
  { label: 'Напряжение', words: ['напряжение'] },
  { label: 'Габариты', words: ['габариты', 'размер (дхшхв)'] },
];

const unitOf = (key: string) => {
  const m = key.match(/\(([^)]+)\)\s*:?\s*$/);
  return m ? m[1].replace(/\.$/, '') : '';
};

const cleanVal = (v: string) => v.replace(/^(\d+)\.0+$/, '$1');

export const keyParams = (p: DepositorProduct): [string, string][] => {
  const entries = Object.entries(p.params || {});
  const out: [string, string][] = [];
  if (p.performance) out.push(['Производительность', p.performance]);
  if (p.hoppers) out.push(['Бункеров', String(p.hoppers)]);
  for (const g of KEY_GROUPS) {
    const found = entries.find(([k]) => g.words.some((w) => k.toLowerCase().includes(w)));
    if (!found) continue;
    const unit = unitOf(found[0].replace(/:\s*$/, ''));
    const val = cleanVal(found[1].trim());
    out.push([g.label, unit && !val.toLowerCase().includes(unit.toLowerCase().split('/')[0]) ? `${val} ${unit}` : val]);
    if (out.length >= 6) break;
  }
  return out;
};
