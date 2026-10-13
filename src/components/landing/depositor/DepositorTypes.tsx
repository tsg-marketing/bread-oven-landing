import Icon from '@/components/ui/icon';

const types = [
  {
    img: '/depositor/deposit.webp',
    perf: 'low',
    title: 'До 25 циклов в минуту',
    text: 'Тестоотсадочные машины Danler Droplet 400 и пневматические депозиторы NFS-1000. Точная порция, до 100 программ в памяти, быстрая смена насадок.',
    tags: ['Кондитерская', 'Пекарня', 'Кремы и начинки'],
  },
  {
    img: '/depositor/cookie.webp',
    perf: 'mid',
    title: '30–40 циклов, до 200 кг/ч',
    text: 'Отсадочные машины ОМД-2, МОК и Сура-ПД600 для печенья, пряников и зефира. Струнная и диафрагменная резка, одно- и двухцветные изделия.',
    tags: ['Кондитерский цех', 'Печенье', 'Пряники «зебра»'],
  },
  {
    img: '/depositor/piston.webp',
    perf: 'high',
    title: 'От 90 циклов в минуту',
    text: 'Поршневые и конвейерные машины: до 96 циклов в минуту и до 6000 мелких изделий в час. Для серийного выпуска капкейков, бисквитов и десертов.',
    tags: ['Фабрика', 'Капкейки', 'Серийный выпуск'],
  },
];

const DepositorTypes = ({ onCatalog }: { onCatalog: (perf: string) => void }) => (
  <section id="types" className="py-24 bg-coal-mid">
    <div className="container">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        Мы предлагаем следующие виды <span className="text-fire-gradient">отсадочных машин</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Машину подбирают по производительности и типу массы: густое тесто для печенья, плотное пряничное или жидкие кремы
        и начинки.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((t, i) => (
          <article
            key={t.title}
            style={{ animationDelay: `${i * 80}ms` }}
            className="card-hover bg-coal rounded-2xl overflow-hidden border border-coal-light flex flex-col animate-fade-in-up"
          >
            <img src={t.img} alt={t.title} className="w-full aspect-[4/3] object-contain bg-white p-4" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-oswald text-2xl text-white mb-2">{t.title}</h3>
              <p className="text-white/70 mb-4 flex-1">{t.text}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-fire/10 text-fire font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onCatalog(t.perf)}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-white font-semibold hover:shadow-lg hover:shadow-fire/30 transition flex items-center justify-center gap-2"
              >
                Смотреть модели
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default DepositorTypes;
