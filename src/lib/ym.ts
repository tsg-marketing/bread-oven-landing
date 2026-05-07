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
