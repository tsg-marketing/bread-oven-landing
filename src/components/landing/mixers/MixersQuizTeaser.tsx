import Icon from '@/components/ui/icon';

const MixersQuizTeaser = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="hidden md:block">
      <button
        onClick={onOpen}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[95] rounded-l-2xl shadow-2xl shadow-black/40 transition px-3 py-5 flex flex-col items-center gap-2 animate-fade-in-up border-2 border-r-0 border-fire hover:bg-fire"
        style={{ writingMode: 'vertical-rl', background: '#1c1613', color: '#ffffff' }}
        aria-label="Подобрать миксер"
      >
        <Icon name="Sparkles" size={20} className="text-fire" />
        <span className="font-oswald font-extrabold tracking-wide text-[15px] uppercase text-white">
          Подобрать миксер · бесплатно
        </span>
      </button>
    </div>
  );
};

export default MixersQuizTeaser;