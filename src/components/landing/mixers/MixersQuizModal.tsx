import Icon from '@/components/ui/icon';
import { MixersQuizInner } from './MixersQuiz';

const MixersQuizModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl my-8 relative">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-gradient-to-r from-fire to-fire-dark text-white hover:shadow-xl hover:shadow-fire/40 transition flex items-center justify-center shadow-lg"
        >
          <Icon name="X" size={18} />
        </button>
        <div className="mb-4 text-center">
          <h3 className="font-oswald text-2xl md:text-3xl font-bold uppercase text-fire drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Подберём миксер <span className="text-amber-300">за 30 секунд</span>
          </h3>
          <p className="text-white mt-2 text-sm font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Ответьте на 4 вопроса — покажем 2–3 подходящие модели и цену.
          </p>
        </div>
        <MixersQuizInner onDone={() => setTimeout(onClose, 2500)} />
      </div>
    </div>
  );
};

export default MixersQuizModal;
