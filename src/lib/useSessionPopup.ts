import { useEffect } from 'react';

const START_KEY = 'tsib_session_start';
const SHOWN_KEY = 'tsib_popup_shown';
const DELAY = 30000;

/** Открывает всплывающее окно 1 раз за сессию через 30 секунд после начала сессии (на любой странице сайта) */
export function useSessionPopup(open: () => void) {
  useEffect(() => {
    if (sessionStorage.getItem(SHOWN_KEY)) return;
    let start = Number(sessionStorage.getItem(START_KEY));
    if (!start) {
      start = Date.now();
      sessionStorage.setItem(START_KEY, String(start));
    }
    const left = Math.max(0, DELAY - (Date.now() - start));
    const t = setTimeout(() => {
      if (sessionStorage.getItem(SHOWN_KEY)) return;
      sessionStorage.setItem(SHOWN_KEY, '1');
      open();
    }, left);
    return () => clearTimeout(t);
  }, []);
}
