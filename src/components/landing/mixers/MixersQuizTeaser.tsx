import Icon from '@/components/ui/icon';

const MixersQuizTeaser = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="hidden md:block">
      <button
        onClick={onOpen}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[95] bg-gradient-to-r from-fire to-fire-dark text-white rounded-l-2xl shadow-2xl shadow-fire/40 hover:shadow-fire/60 transition px-3 py-5 flex flex-col items-center gap-2 animate-fade-in-up"
        style={{ writingMode: 'vertical-rl' }}
        aria-label="Подобрать миксер"
      >
        <Icon name="Sparkles" size={18} />
        <span className="font-oswald font-bold tracking-wider text-sm uppercase">
          Подобрать миксер · бесплатно
        </span>
      </button>
    </div>
  );
};

export default MixersQuizTeaser;
