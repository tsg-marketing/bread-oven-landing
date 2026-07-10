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
export const volumeOf = (p: MixerProduct): string => paramByWord(p.params, 'объ') || paramByWord(p.params, 'дежа') || paramByWord(p.params, 'дежи');
export const powerOf = (p: MixerProduct): string => paramByWord(p.params, 'мощн');

export const uniqSorted = (values: string[]): string[] => {
  const set = new Set(values.filter((v) => v && v.trim()));
  return Array.from(set).sort((a, b) =>
    a.localeCompare(b, 'ru', { numeric: true, sensitivity: 'base' }),
  );
};
