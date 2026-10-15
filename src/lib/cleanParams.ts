const HIDDEN_WORDS = ['наличи'];

const isHidden = (text: string) => {
  const t = text.toLowerCase();
  return HIDDEN_WORDS.some((w) => t.includes(w));
};

/** Значение пустое или равно нулю: «0», «0.0000», «0 кВт», «-» */
const isEmptyOrZero = (value: unknown) => {
  const t = String(value ?? '').trim();
  if (!t || t === '-' || t === '—') return true;
  return /^0+(?:[.,]0+)?(?:\s*[^\d\s][^\d]*)?$/.test(t);
};

export function cleanParams<T extends Record<string, unknown> | undefined | null>(params: T): T {
  if (!params || typeof params !== 'object') return params;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    if (isHidden(k) || isHidden(String(v ?? '')) || isEmptyOrZero(v)) continue;
    out[k] = v;
  }
  return out as T;
}

export function withCleanParams<P extends { params?: Record<string, unknown> }>(items: P[]): P[] {
  return (items || []).map((p) => ({ ...p, params: cleanParams(p.params) as P['params'] }));
}
