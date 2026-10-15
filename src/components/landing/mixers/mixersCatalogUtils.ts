import func2url from '../../../../backend/func2url.json';

export type MixerProduct = {
  id: string;
  name: string;
  vendor: string;
  price: string;
  currency: string;
  url: string;
  description: string;
  picture: string;
  pictures: string[];
  categoryId: string;
  categoryName: string;
  available: boolean;
  group: string;
  params: Record<string, string>;
};

export const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f4f1ec"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9a8f80">Фото товара</text></svg>',
  );

export const proxify = (url: string): string => {
  if (!url) return url;
  try {
    const u = new URL(url, window.location.origin);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 't-sib.ru') {
      return `${func2url['image-proxy']}?url=${encodeURIComponent(u.toString())}`;
    }
    return url;
  } catch {
    return url;
  }
};

/** Отбор 5 параметров: сперва Бренд, затем производительность/бак/объём/мощность, потом добираем остальными */
const KEY_WORDS = ['производ', 'бак', 'объ', 'дежа', 'дежи', 'мощн'];
export const pickParams = (params: Record<string, string>): [string, string][] => {
  const all = Object.entries(params || {}).filter(([, v]) => v && String(v).trim());
  const result: [string, string][] = [];
  const used = new Set<string>();

  const brand = all.find(([k]) => k.toLowerCase().includes('бренд'));
  if (brand) {
    result.push(brand);
    used.add(brand[0]);
  }
  for (const kw of KEY_WORDS) {
    for (const pair of all) {
      if (used.has(pair[0])) continue;
      if (pair[0].toLowerCase().includes(kw)) {
        result.push(pair);
        used.add(pair[0]);
        break;
      }
    }
    if (result.length >= 5) break;
  }
  for (const pair of all) {
    if (result.length >= 5) break;
    if (used.has(pair[0])) continue;
    result.push(pair);
    used.add(pair[0]);
  }
  return result.slice(0, 5);
};

/** Цена в рублях с разделением разрядов неразрывным пробелом */
export const formatPrice = (raw: string | number): string | null => {
  const n = Number(raw);
  if (!raw || !Number.isFinite(n) || n <= 0) return null;
  return `${new Intl.NumberFormat('ru-RU').format(Math.round(n)).replace(/\s/g, '\u00A0')}\u00A0₽`;
};

/** Первое значение параметра, чьё название содержит слово (без учёта регистра) */
const paramByWord = (params: Record<string, string>, word: string): string => {
  const w = word.toLowerCase();
  for (const [k, v] of Object.entries(params || {})) {
    if (k.toLowerCase().includes(w) && v && String(v).trim()) return String(v).trim();
  }
  return '';
};

export const brandOf = (p: MixerProduct): string =>
  p.vendor?.trim() || paramByWord(p.params, 'бренд') || paramByWord(p.params, 'производител');
export const volumeOf = (p: MixerProduct): string =>
  p.params?.['Объем дежи'] || paramByWord(p.params, 'объем дежи') || paramByWord(p.params, 'емкость дежи') || p.params?.['Объем'] || '';
export const powerOf = (p: MixerProduct): string => paramByWord(p.params, 'мощн');

/** Извлекает первое число из строки (поддерживает запятую как разделитель), иначе null */
export const numFromStr = (raw: string): number | null => {
  if (!raw) return null;
  const m = String(raw).replace(',', '.').match(/-?\d+(\.\d+)?/);
  if (!m) return null;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : null;
};

export const volumeNumOf = (p: MixerProduct): number | null => numFromStr(volumeOf(p));
export const powerNumOf = (p: MixerProduct): number | null => numFromStr(powerOf(p));

export const priceNumOf = (p: MixerProduct): number | null => {
  const n = Number(p.price);
  return Number.isFinite(n) && n > 0 ? n : null;
};

export const uniqSorted = (values: string[]): string[] => {
  const set = new Set(values.filter((v) => v && v.trim()));
  return Array.from(set).sort((a, b) =>
    a.localeCompare(b, 'ru', { numeric: true, sensitivity: 'base' }),
  );
};

const plural = (n: number, one: string, few: string, many: string) => {
  if (!Number.isInteger(n)) return few;
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};

/** «5.0000» → «5», «7.5000» → «7,5» */
export const cleanNum = (v: string): string =>
  String(v).replace(/\d+\.\d+/g, (m) => String(Number(m)).replace('.', ','));

export const formatLiters = (n: number): string =>
  `${String(n).replace('.', ',')} ${plural(n, 'литр', 'литра', 'литров')}`;

const isVolumeKey = (k: string) => {
  const kl = k.toLowerCase();
  return /\(л\.?\)/.test(kl) && (kl.includes('объ') || kl.includes('емк') || kl.includes('ёмк'));
};

/** Приводит параметры к единому виду: без «.0000», объём — «5 литров» */
export const normalizeParams = (params: Record<string, string>): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(params || {})) {
    if (isVolumeKey(k)) {
      const n = numFromStr(v);
      const key = k.replace(/\s*\(л\.?\)\s*$/i, '').trim();
      if (key.toLowerCase() === 'объем' && out['Объем дежи']) continue;
      out[key] = n !== null && /^\s*\d+([.,]\d+)?\s*$/.test(v) ? formatLiters(n) : cleanNum(v);
    } else {
      out[k] = cleanNum(v);
    }
  }
  if (out['Объем'] && out['Объем дежи']) delete out['Объем'];
  if (out['Емкость дежи'] && !out['Объем дежи']) {
    out['Объем дежи'] = out['Емкость дежи'];
    delete out['Емкость дежи'];
  }
  return out;
};

export const VOLUME_SEGMENTS: { id: string; label: string; min: number; max: number }[] = [
  { id: 's', label: 'до 10 литров', min: 0, max: 12 },
  { id: 'm1', label: '15–30 литров', min: 12, max: 35 },
  { id: 'm', label: '40–60 литров', min: 35, max: 70 },
  { id: 'l', label: '80–120 литров', min: 70, max: 150 },
  { id: 'xl', label: 'от 200 литров', min: 150, max: Infinity },
];
export const DEFAULT_SEGMENT = 'm';

export const segmentOf = (p: MixerProduct): string => {
  const v = volumeNumOf(p);
  if (v === null) return 'none';
  return VOLUME_SEGMENTS.find((s) => v >= s.min && v < s.max)?.id || 'none';
};

/** Короткое имя бренда: «Starmix (Стармикс)» → «Starmix» */
export const brandLabel = (b: string): string => b.replace(/\s*\(.*\)\s*$/, '').trim() || b;
