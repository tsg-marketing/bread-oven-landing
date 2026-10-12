const HIDDEN_WORDS = ['наличи'];

const isHidden = (text: string) => {
  const t = text.toLowerCase();
  return HIDDEN_WORDS.some((w) => t.includes(w));
};

export function cleanParams<T extends Record<string, unknown> | undefined | null>(params: T): T {
  if (!params || typeof params !== 'object') return params;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    if (isHidden(k) || isHidden(String(v ?? ''))) continue;
    out[k] = v;
  }
  return out as T;
}

export function withCleanParams<P extends { params?: Record<string, unknown> }>(items: P[]): P[] {
  return (items || []).map((p) => ({ ...p, params: cleanParams(p.params) as P['params'] }));
}
