import Icon from '@/components/ui/icon';

const MixersQuizTeaser = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="hidden md:block">
      <button
        onClick={onOpen}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[95] rounded-l-2xl shadow-2xl transition px-3 py-5 flex flex-col items-center gap-2 animate-fade-in-up hover:brightness-110"
        style={{
          writingMode: 'vertical-rl',
          background: 'linear-gradient(180deg, #ff6a1a 0%, #e2500c 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(226,80,12,0.55)',
        }}
        aria-label="Подобрать миксер"
      >
        <Icon name="Sparkles" size={20} className="text-white" />
        <span className="font-oswald font-extrabold tracking-wide text-[15px] uppercase text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          Подобрать миксер · бесплатно
        </span>
      </button>
    </div>
  );
};

export default MixersQuizTeaser;