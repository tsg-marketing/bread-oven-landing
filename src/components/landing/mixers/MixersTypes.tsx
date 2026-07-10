import Icon from '@/components/ui/icon';

const types = [
  {
    icon: 'CupSoda',
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/5f9c3fe2-c07b-48f9-a095-2b16ddfa576f.jpg',
    title: 'Настольные',
    volume: '5–10 л',
    who: 'кофейнях, барах, малых кондитерских',
  },
  {
    icon: 'Store',
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/50b58470-a222-4a34-ae7f-aa45551511f0.jpg',
    title: 'Компактные напольные',
    volume: '15–30 л',
    who: 'кафе, ресторанах, кондитерских цехах',
  },
  {
    icon: 'Factory',
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/a67c94e0-5461-41db-a533-21c6f0146cfa.jpg',
    title: 'Производственные',
    volume: '40–80 л',
    who: 'хлебопекарнях, ресторанах, цехах',
  },
  {
    icon: 'Building2',
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/cbdbb417-a570-418a-896e-2c15f20f42c9.jpg',
    title: 'Промышленные',
    volume: '100–600 л',
    who: 'фабриках, крупных производствах',
  },
];

const MixersTypes = ({ onCatalog }: { onCatalog: () => void }) => {
  return (
    <section id="types" className="py-24 bg-coal-mid">
      <div className="container">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          Миксеры, <span className="text-fire-gradient">которые мы продаём</span>
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
              className="text-left animate-fade-in-up bg-coal rounded-2xl border border-coal-light overflow-hidden hover:border-fire hover:shadow-xl hover:shadow-fire/10 transition group flex flex-col"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                <img
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 w-11 h-11 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center shadow-lg">
                  <Icon name={t.icon} size={22} className="text-white" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-oswald text-xl md:text-2xl uppercase text-white mb-2">{t.title}</div>
                <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-fire/10 border border-fire/30 text-fire text-sm font-semibold mb-3">
                  <Icon name="CircleGauge" size={14} />
                  {t.volume}
                </div>
                <div className="text-white/70 text-sm leading-snug">
                  <span className="text-white/50">Используется в </span>
                  {t.who}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixersTypes;