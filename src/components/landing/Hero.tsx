import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/bucket/2d2334c4-5b43-4c5e-bfb9-01feec608bc6.png';

type Bullet = { icon: string; bold: string; rest: string };

const bullets: Bullet[] = [
  {
    icon: 'Layers',
    bold: 'Полная линейка печей для выпечки',
    rest: ' — 150+ моделей, 5 типов, все масштабы бизнеса',
  },
  { icon: 'Award', bold: 'Лучшие', rest: ' мировые и российские бренды' },
  {
    icon: 'Plug',
    bold: 'Электричество, газ или дизель',
    rest: ' — выбирайте оптимальный энергоноситель',
  },
  { icon: 'Truck', bold: 'Доставка по всей России', rest: ' и собственная сервисная служба' },
];

type Offer = { icon: string; title: string; subtitle: string };

const offers: Offer[] = [
  { icon: 'BadgePercent', title: 'Скидка до 12%', subtitle: 'при заказе до конца месяца' },
  { icon: 'Calendar', title: 'Рассрочка 0%', subtitle: 'на 6 месяцев без переплат' },
  { icon: 'Wrench', title: 'Монтаж в подарок', subtitle: 'при покупке от 500 000 ₽' },
  { icon: 'ShieldCheck', title: 'Гарантия 3 года', subtitle: 'на всё оборудование' },
];

const Hero = ({ onQuiz, onKp }: { onQuiz: () => void; onKp: () => void }) => {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden pt-24"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--coal)) 0%, hsl(var(--coal-mid)) 50%, hsl(var(--cream)) 100%)',
      }}
    >
      {/* Фоновое фото для мобилки */}
      <div
        className="lg:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--coal)/0.92) 0%, hsl(var(--coal-mid)/0.85) 50%, hsl(var(--cream)/0.7) 100%), url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fire/20 blur-[120px] animate-fire" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-ember/20 blur-[140px] animate-fire delay-300" />
      </div>

      <div className="container relative z-10 py-6 md:py-8 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="animate-fade-in-up">
          <h1
            className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-[1.02] mb-3 md:mb-4"
            style={{ color: 'hsl(var(--ink))' }}
          >
            Профессиональные печи для{' '}
            <span className="text-fire-gradient">хлебозаводов, пекарен и пиццерий</span>
          </h1>

          <ul className="space-y-2 mb-4 md:mb-5">
            {bullets.map((b, i) => (
              <li
                key={b.bold}
                style={{ animationDelay: `${i * 100}ms` }}
                className="flex items-start gap-3 animate-fade-in-up"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fire/15 to-ember/10 border border-fire/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={b.icon} size={20} className="text-fire" />
                </div>
                <span className="text-lg md:text-xl" style={{ color: 'hsl(var(--ink))' }}>
                  <span className="font-bold">{b.bold}</span>
                  <span style={{ color: 'hsl(var(--ink) / 0.85)' }}>{b.rest}</span>
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

        <div className="relative animate-fade-in-up delay-200 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-fire/20 to-ember/15 blur-3xl rounded-full" />
          <div
            className="relative rounded-3xl overflow-hidden border bg-white shadow-2xl shadow-fire/10"
            style={{ borderColor: 'hsl(var(--coal-light))' }}
          >
            <img
              src={HERO_IMG}
              alt="Профессиональная конвекционная печь"
              className="w-full h-[420px] object-contain bg-white p-4"
            />
          </div>
        </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-10">
          {offers.map((o, i) => (
            <div
              key={o.title}
              style={{ animationDelay: `${i * 80}ms`, borderColor: 'hsl(var(--coal-light))' }}
              className="animate-fade-in-up bg-white rounded-2xl border-2 p-4 md:p-5 flex items-center gap-3 hover:border-fire hover:shadow-lg hover:shadow-fire/10 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center flex-shrink-0">
                <Icon name={o.icon} size={24} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="font-oswald font-bold text-base md:text-lg uppercase leading-tight" style={{ color: 'hsl(var(--ink))' }}>
                  {o.title}
                </div>
                <div className="text-xs md:text-sm leading-snug" style={{ color: 'hsl(var(--ink) / 0.7)' }}>
                  {o.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;