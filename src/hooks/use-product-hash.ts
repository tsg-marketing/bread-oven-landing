import { useEffect } from 'react';

/** Открывает карточку товара по якорю #product-{id} (переход из фида / прямая ссылка) */
export function useProductHash<T extends { id: string }>(
  items: T[],
  open: (item: T) => void,
  sectionId = 'assortment',
) {
  useEffect(() => {
    if (!items.length) return;
    const openFromHash = () => {
      const m = (window.location.hash || '').match(/^#product-(.+)$/);
      if (!m) return;
      const id = decodeURIComponent(m[1]);
      const found = items.find((it) => it.id === id);
      if (!found) return;
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      open(found);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [items, open, sectionId]);
}

export function clearProductHash() {
  if (window.location.hash.startsWith('#product-')) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}
