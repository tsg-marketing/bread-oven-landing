import Icon from '@/components/ui/icon';

const brands = [
  {
    name: 'Starmix',
    ru: 'Стармикс',
    text: 'Самая широкая линейка от 10 до 600 л, сенсорные и программируемые модели, дежа под давлением для промышленности.',
  },
  {
    name: 'Hurakan',
    ru: 'Хуракан',
    text: 'Оптимальная цена/качество, модели от 5 до 60 л для кафе и кондитерских.',
  },
  {
    name: 'Danler',
    ru: 'Данлер',
    text: 'Надёжные ремни, низкий уровень шума, объёмы 7–100 л.',
  },
  {
    name: 'Miratek',
    ru: 'Миратек',
    text: 'Универсальные миксеры с ременной передачей и повышенными оборотами.',
  },
  {
    name: 'Hualian',
    ru: 'Хуалянь',
    text: 'Бюджетные шестерёнчатые миксеры серии B, гарантия до 12 месяцев.',
  },
];

const MixersBrands = () => {
  return (
    <section id="brands" className="py-24 bg-coal-mid">
      <div className="container">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          Бренды <span className="text-fire-gradient">в ассортименте</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl">
          Работаем напрямую с производителями — официальная поставка, гарантия и сервис.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map((b, i) => (
            <div
              key={b.name}
              style={{ animationDelay: `${i * 70}ms` }}
              className="animate-fade-in-up bg-coal rounded-2xl border border-coal-light p-6 hover:border-fire/40 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center flex-shrink-0">
                  <Icon name="BadgeCheck" size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-oswald text-2xl text-white leading-none">{b.name}</div>
                  <div className="text-fire text-sm">{b.ru}</div>
                </div>
              </div>
              <p className="text-white/70 text-base leading-snug">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixersBrands;
