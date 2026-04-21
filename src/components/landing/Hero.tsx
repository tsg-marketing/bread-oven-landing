import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/bucket/2d2334c4-5b43-4c5e-bfb9-01feec608bc6.png';

const bullets = [
  { icon: 'Layers', t: 'Полная линейка печей для выпечки — 150+ моделей, 5 типов, все масштабы бизнеса' },
  { icon: 'Award', t: 'Лучшие мировые и российские бренды' },
  { icon: 'Plug', t: 'Электричество, газ или дизель — выбирайте оптимальный энергоноситель' },
  { icon: 'Truck', t: 'Доставка по всей России и собственная сервисная служба' },
];

const Hero = ({ onQuiz, onKp }: { onQuiz: () => void; onKp: () => void }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--coal)) 0%, hsl(var(--coal-mid)) 50%, hsl(var(--cream)) 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fire/20 blur-[120px] animate-fire" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-ember/20 blur-[140px] animate-fire delay-300" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-fire/30 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-fire animate-pulse" />
            <span className="text-sm text-coal-mid" style={{ color: 'hsl(var(--ink) / 0.8)' }}>
              Хлебопекарное и кондитерское оборудование
            </span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-[1.02] mb-6" style={{ color: 'hsl(var(--ink))' }}>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fire/15 to-ember/10 border border-fire/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={b.icon} size={16} className="text-fire" />
                </div>
                <span className="text-base md:text-lg" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                  {b.t}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onQuiz}
              className="group px-7 py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark font-semibold hover:shadow-2xl hover:shadow-fire/40 transition flex items-center gap-2"
              style={{ color: '#fff' }}
            >
              <Icon name="Sparkles" size={18} />
              Получить подбор печи
              <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={onKp}
              className="px-7 py-4 rounded-xl border-2 font-semibold transition flex items-center gap-2 bg-white hover:bg-fire/5"
              style={{ borderColor: 'hsl(var(--ink) / 0.15)', color: 'hsl(var(--ink))' }}
            >
              <Icon name="FileText" size={18} />
              Запросить КП
            </button>
          </div>
        </div>

        <div className="relative animate-fade-in-up delay-200">
          <div className="absolute inset-0 bg-gradient-to-tr from-fire/20 to-ember/15 blur-3xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden border bg-white shadow-2xl shadow-fire/10" style={{ borderColor: 'hsl(var(--coal-light))' }}>
            <img src={HERO_IMG} alt="Профессиональная конвекционная печь Danler" className="w-full h-[520px] object-contain bg-white p-6" />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-lg border border-fire/30 rounded-xl px-3 py-2 flex items-center gap-2 shadow">
              <Icon name="BadgeCheck" size={14} className="text-fire" />
              <span className="text-xs font-semibold" style={{ color: 'hsl(var(--ink))' }}>
                В наличии
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-lg border rounded-xl px-4 py-2 shadow" style={{ borderColor: 'hsl(var(--coal-light))' }}>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: 'hsl(var(--ink) / 0.5)' }}>
                Конвекционная печь
              </div>
              <div className="font-oswald font-bold text-lg" style={{ color: 'hsl(var(--ink))' }}>
                DANLER · 10 уровней
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
