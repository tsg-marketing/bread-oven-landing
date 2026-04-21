import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { QuizInner } from './Quiz';

const SESSION_KEY = 'quiz-teaser-shown';

const QuizTeaser = () => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <>
      {/* Свернутая правая шторка-кнопка */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[95] bg-gradient-to-r from-fire to-fire-dark text-white rounded-l-2xl shadow-2xl shadow-fire/40 hover:shadow-fire/60 transition px-3 py-5 flex flex-col items-center gap-2 animate-fade-in-up"
          style={{ writingMode: 'vertical-rl' }}
          aria-label="Подобрать печь"
        >
          <Icon name="Sparkles" size={18} />
          <span className="font-oswald font-bold tracking-wider text-sm uppercase">
            Подобрать печь · бесплатно
          </span>
        </button>
      )}

      {/* Закрыть шторку полностью */}
      {!expanded && (
        <button
          onClick={() => setOpen(false)}
          aria-label="Скрыть"
          className="fixed right-2 top-[calc(50%-130px)] z-[96] w-7 h-7 rounded-full bg-coal text-white/80 hover:text-white hover:bg-fire transition flex items-center justify-center shadow-lg"
        >
          <Icon name="X" size={14} />
        </button>
      )}

      {/* Развернутая боковая панель с квизом */}
      {expanded && (
        <>
          <div
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm animate-fade-in-up"
          />
          <aside
            className="fixed right-0 top-0 bottom-0 z-[115] w-full sm:w-[420px] bg-coal border-l border-coal-light shadow-2xl overflow-y-auto animate-fade-in-up"
          >
            <div className="sticky top-0 bg-coal/95 backdrop-blur border-b border-coal-light p-4 flex items-center justify-between z-10">
              <div className="font-oswald text-lg text-white">
                Подбор <span className="text-fire-gradient">печи</span>
              </div>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Закрыть"
                className="w-9 h-9 rounded-full bg-coal-mid border border-coal-light text-white hover:bg-fire transition flex items-center justify-center"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-4">
              <QuizInner compact onDone={() => setTimeout(() => setExpanded(false), 2500)} />
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default QuizTeaser;
