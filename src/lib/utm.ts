const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_group',
  'gclid',
  'yclid',
  'fbclid',
  'ymclid',
  'roistat',
] as const;

const COOKIE_DAYS = 90;
const LS_PREFIX = 'utm__';

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  try {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const secure =
      typeof window !== 'undefined' && window.location.protocol === 'https:'
        ? '; Secure'
        : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax${secure}`;
  } catch {
    /* noop */
  }
}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  try {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  } catch {
    return '';
  }
}

function lsSet(name: string, value: string, days: number) {
  try {
    if (typeof localStorage === 'undefined') return;
    const exp = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(LS_PREFIX + name, value);
    localStorage.setItem(LS_PREFIX + name + '__exp', String(exp));
  } catch {
    /* noop */
  }
}

function lsGet(name: string): string {
  try {
    if (typeof localStorage === 'undefined') return '';
    const expRaw = localStorage.getItem(LS_PREFIX + name + '__exp');
    if (expRaw) {
      const exp = Number(expRaw);
      if (Number.isFinite(exp) && exp < Date.now()) {
        localStorage.removeItem(LS_PREFIX + name);
        localStorage.removeItem(LS_PREFIX + name + '__exp');
        return '';
      }
    }
    return localStorage.getItem(LS_PREFIX + name) || '';
  } catch {
    return '';
  }
}

function storeSet(name: string, value: string) {
  setCookie(name, value, COOKIE_DAYS);
  lsSet(name, value, COOKIE_DAYS);
}

function storeGet(name: string): string {
  return getCookie(name) || lsGet(name);
}

export function captureUtmFromUrl(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const firstTouch = storeGet('utm_first');

    const lastTouchObj: Record<string, string> = {};
    let hasUtm = false;

    UTM_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) {
        hasUtm = true;
        storeSet(key, val);
        lastTouchObj[key] = val;
      }
    });

    if (hasUtm) {
      storeSet('utm_last', JSON.stringify(lastTouchObj));
      if (!firstTouch) {
        storeSet('utm_first', JSON.stringify(lastTouchObj));
      }
      const referrer = document.referrer || '';
      storeSet('utm_referrer', referrer);
      storeSet('utm_landing', window.location.href);
    }
  } catch {
    /* noop */
  }
}

export function getUtmData(): Record<string, string> {
  const data: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const v = storeGet(key);
    if (v) data[key] = v;
  });
  const ref = storeGet('utm_referrer');
  const landing = storeGet('utm_landing');
  if (ref) data.utm_referrer = ref;
  if (landing) data.utm_landing = landing;

  const first = storeGet('utm_first');
  const last = storeGet('utm_last');
  if (first) data.utm_first = first;
  if (last) data.utm_last = last;
  return data;
}
