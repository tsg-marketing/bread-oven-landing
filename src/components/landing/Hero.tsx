import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/8af4f5f5-129c-4c95-9297-21832c485655.jpg';

const bullets = [
  { icon: 'Layers', t: 'Полная линейка печей для выпечки — 150+ моделей, 5 типов, все масштабы бизнеса' },
  { icon: 'Award', t: 'Лучшие мировые и российские бренды' },
  { icon: 'Plug', t: 'Электричество, газ или дизель — выбирайте оптимальный энергоноситель' },
  { icon: 'Truck', t: 'Доставка по всей России и собственная сервисная служба' },
];

const Hero = ({ onQuiz, onKp }: { onQuiz: () => void; onKp: () => void }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-coal noise-overlay pt-16">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fire/30 blur-[120px] animate-fire" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-ember/25 blur-[140px] animate-fire delay-300" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coal-mid border border-fire/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-fire animate-pulse" />
            <span className="text-sm text-white/80">Хлебопекарное и кондитерское оборудование</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-[1.02] text-white mb-6">
            Профессиональные печи<br />
            для <span className="text-fire-gradient">пекарен и пиццерий</span>
          </h1>

          <ul className="space-y-3 mb-8">
            {bullets.map((b, i) => (
              <li
                key={b.t}
                style={{ animationDelay: `${i * 100}ms` }}
                className="flex items-start gap-3 animate-fade-in-up"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fire/20 to-ember/10 border border-fire/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={b.icon} size={16} className="text-fire" />
                </div>
                <span className="text-white/85 text-base md:text-lg">{b.t}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onQuiz}
              className="group px-7 py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-white font-semibold hover:shadow-2xl hover:shadow-fire/40 transition flex items-center gap-2"
            >
              <Icon name="Sparkles" size={18} />
              Получить подбор печи
              <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={onKp}
              className="px-7 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-fire/50 transition flex items-center gap-2"
            >
              <Icon name="FileText" size={18} />
              Запросить КП
            </button>
          </div>
        </div>

        <div className="relative animate-fade-in-up delay-200">
          <div className="absolute inset-0 bg-gradient-to-tr from-fire/30 to-ember/20 blur-3xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden border border-coal-light shadow-2xl shadow-fire/20">
            <img src={HERO_IMG} alt="Хлебопекарная печь" className="w-full h-[520px] object-cover" />
            <div className="absolute top-4 right-4 bg-coal/85 backdrop-blur-lg border border-fire/30 rounded-xl px-3 py-2 flex items-center gap-2">
              <Icon name="ImageIcon" size={14} className="text-fire" />
              <span className="text-xs text-white">Фото появится позже</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
