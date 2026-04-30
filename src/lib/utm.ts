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

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const domain =
    typeof window !== 'undefined' && window.location.hostname.split('.').length > 1
      ? `; domain=.${window.location.hostname.replace(/^www\./, '')}`
      : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax${domain}`;
}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
}

export function captureUtmFromUrl(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const firstTouch = getCookie('utm_first');
    let firstTouchObj: Record<string, string> = {};
    if (firstTouch) {
      try {
        firstTouchObj = JSON.parse(firstTouch);
      } catch {
        firstTouchObj = {};
      }
    }

    const lastTouchObj: Record<string, string> = {};
    let hasUtm = false;

    UTM_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) {
        hasUtm = true;
        setCookie(key, val, COOKIE_DAYS);
        lastTouchObj[key] = val;
      }
    });

    if (hasUtm) {
      setCookie('utm_last', JSON.stringify(lastTouchObj), COOKIE_DAYS);
      if (!firstTouch) {
        setCookie('utm_first', JSON.stringify(lastTouchObj), COOKIE_DAYS);
      }
      const referrer = document.referrer || '';
      setCookie('utm_referrer', referrer, COOKIE_DAYS);
      setCookie('utm_landing', window.location.href, COOKIE_DAYS);
    }
  } catch {
    /* noop */
  }
}

export function getUtmData(): Record<string, string> {
  const data: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const v = getCookie(key);
    if (v) data[key] = v;
  });
  const ref = getCookie('utm_referrer');
  const landing = getCookie('utm_landing');
  if (ref) data.utm_referrer = ref;
  if (landing) data.utm_landing = landing;

  const first = getCookie('utm_first');
  const last = getCookie('utm_last');
  if (first) {
    try {
      data.utm_first = first;
    } catch {
      /* noop */
    }
  }
  if (last) {
    try {
      data.utm_last = last;
    } catch {
      /* noop */
    }
  }
  return data;
}
