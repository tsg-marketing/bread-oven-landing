import Icon from '@/components/ui/icon';

const types = [
  {
    icon: 'CupSoda',
    title: 'Настольные',
    volume: '5–10 л',
    who: 'Кофейни, бары, малые кондитерские',
  },
  {
    icon: 'Store',
    title: 'Компактные напольные',
    volume: '15–30 л',
    who: 'Кафе, пекарни, кондитерские цеха',
  },
  {
    icon: 'Factory',
    title: 'Производственные',
    volume: '40–80 л',
    who: 'Рестораны, хлебопекарни, цеха',
  },
  {
    icon: 'Building2',
    title: 'Промышленные',
    volume: '100–600 л',
    who: 'Фабрики, крупные производства',
  },
];

const MixersTypes = ({ onCatalog }: { onCatalog: () => void }) => {
  return (
    <section id="types" className="py-24 bg-coal-mid">
      <div className="container">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          Какой миксер <span className="text-fire-gradient">вам нужен</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl">
          Выберите класс оборудования под объём производства — от настольных моделей до промышленных линий.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {types.map((t, i) => (
            <button
              key={t.title}
              onClick={onCatalog}
              style={{ animationDelay: `${i * 80}ms` }}
              className="text-left animate-fade-in-up bg-coal rounded-2xl border border-coal-light p-6 hover:border-fire hover:shadow-xl hover:shadow-fire/10 transition group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Icon name={t.icon} size={28} className="text-white" />
              </div>
              <div className="font-oswald text-xl md:text-2xl uppercase text-white mb-1">{t.title}</div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fire/10 border border-fire/30 text-fire text-sm font-semibold mb-3">
                <Icon name="CircleGauge" size={14} />
                {t.volume}
              </div>
              <div className="text-white/70 text-sm leading-snug">{t.who}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixersTypes;
