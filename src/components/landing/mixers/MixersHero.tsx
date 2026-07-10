import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/bucket/fb821cdb-ceb6-4681-a6b4-3e007b781d15.png';

const facts = [
  { icon: 'CircleGauge', text: 'Объём дежи от 5 до 600 л' },
  { icon: 'Award', text: 'Starmix, Hurakan, Danler, Miratek, Hualian' },
  { icon: 'ShieldCheck', text: 'Гарантия до 12 месяцев' },
  { icon: 'Truck', text: 'Официальная поставка и сервис' },
];

const MixersHero = ({ onQuiz, onCatalog }: { onQuiz: () => void; onCatalog: () => void }) => {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center overflow-hidden pt-24"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--coal)) 0%, hsl(var(--coal-mid)) 50%, hsl(var(--cream)) 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fire/20 blur-[120px] animate-fire" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-ember/20 blur-[140px] animate-fire delay-300" />
      </div>

      <div className="container relative z-10 py-8 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1
              className="font-oswald text-3xl md:text-5xl font-bold uppercase leading-[1.05] mb-4"
              style={{ color: 'hsl(var(--ink))' }}
            >
              Планетарные миксеры для{' '}
              <span className="text-fire-gradient">пекарен, кондитерских и пищевых производств</span>
            </h1>

            <p className="text-lg md:text-xl mb-6 max-w-xl" style={{ color: 'hsl(var(--ink) / 0.8)' }}>
              100+ моделей в наличии и под заказ: взбивание кремов, замес теста, приготовление начинок и муссов — с равномерным планетарным вращением без «мёртвых зон».
            </p>

            <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
              {facts.map((f) => (
                <div key={f.text} className="flex items-center gap-2.5" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center flex-shrink-0">
                    <Icon name={f.icon} size={18} className="text-white" />
                  </div>
                  <span className="text-sm md:text-base font-medium">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onQuiz}
                className="group px-7 py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark font-semibold hover:shadow-2xl hover:shadow-fire/40 transition flex items-center gap-2"
                style={{ color: '#fff' }}
              >
                <Icon name="Sparkles" size={18} />
                Подобрать миксер
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={onCatalog}
                className="px-7 py-4 rounded-xl border-2 font-semibold transition flex items-center gap-2 bg-white hover:bg-fire/5"
                style={{ borderColor: 'hsl(var(--ink) / 0.15)', color: 'hsl(var(--ink))' }}
              >
                <Icon name="LayoutGrid" size={18} />
                Смотреть каталог
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200">
            <div className="absolute inset-0 bg-gradient-to-tr from-fire/20 to-ember/15 blur-3xl rounded-full" />
            <div
              className="relative rounded-3xl overflow-hidden border bg-white shadow-2xl shadow-fire/10"
              style={{ borderColor: 'hsl(var(--coal-light))' }}
            >
              <img
                src={HERO_IMG}
                alt="Планетарный миксер"
                className="w-full h-[420px] lg:h-[520px] object-contain bg-white p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MixersHero;