import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const SESSION_KEY = 'quiz-teaser-shown';

const QuizTeaser = ({ onOpen }: { onOpen: () => void }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="hidden md:block">
      <button
        onClick={() => {
          onOpen();
          setVisible(false);
        }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[95] bg-gradient-to-r from-fire to-fire-dark text-white rounded-l-2xl shadow-2xl shadow-fire/40 hover:shadow-fire/60 transition px-3 py-5 flex flex-col items-center gap-2 animate-fade-in-up"
        style={{ writingMode: 'vertical-rl' }}
        aria-label="Подобрать печь"
      >
        <Icon name="Sparkles" size={18} />
        <span className="font-oswald font-bold tracking-wider text-sm uppercase">
          Подобрать печь · бесплатно
        </span>
      </button>
      <button
        onClick={() => setVisible(false)}
        aria-label="Скрыть"
        className="fixed right-2 top-[calc(50%-130px)] z-[96] w-7 h-7 rounded-full bg-coal text-white/80 hover:text-white hover:bg-fire transition flex items-center justify-center shadow-lg"
      >
        <Icon name="X" size={14} />
      </button>
    </div>
  );
};

export default QuizTeaser;
