declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}

const COUNTER_ID = 109091625;

export function ymGoal(goal: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      if (params) window.ym(COUNTER_ID, 'reachGoal', goal, params);
      else window.ym(COUNTER_ID, 'reachGoal', goal);
    }
  } catch {
    /* noop */
  }
}

/**
 * ClientID Яндекс.Метрики через официальный API с резервом из cookie _ym_uid.
 * Никогда не блокирует и не роняет отправку заявки — при ошибке вернёт ''.
 */
export function getYaClientId(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return resolve('');
    }

    const fromCookie = (): string => {
      const m = document.cookie.match(/(?:^|;\s*)_ym_uid=([^;]+)/);
      return m ? decodeURIComponent(m[1]) : '';
    };

    const ym = window.ym;
    if (typeof ym !== 'function') return resolve(fromCookie());

    let done = false;
    const finish = (v?: string) => {
      if (!done) {
        done = true;
        resolve(v || fromCookie());
      }
    };

    try {
      ym(COUNTER_ID, 'getClientID', (id: unknown) => finish(String(id)));
    } catch {
      return finish('');
    }
    setTimeout(() => finish(''), 600);
  });
}