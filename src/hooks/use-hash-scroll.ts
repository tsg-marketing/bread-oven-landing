import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Прокручивает к разделу по якорю (#new-arrivals и т.п.) после загрузки страницы и при смене якоря */
export function useHashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = decodeURIComponent((hash || '').replace(/^#/, ''));
    if (!id || id.startsWith('product-')) return;

    let tries = 0;
    let timer: number | undefined;
    const go = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: tries === 0 ? 'smooth' : 'auto', block: 'start' });
        if (tries < 3) {
          tries += 1;
          timer = window.setTimeout(go, 600);
        }
        return;
      }
      if (tries++ < 20) timer = window.setTimeout(go, 150);
    };
    timer = window.setTimeout(go, 50);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
}
