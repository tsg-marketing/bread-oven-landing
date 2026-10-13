import Icon from '@/components/ui/icon';

const types = [
  {
    img: '/proofer/compact.webp',
    cat: 'compact',
    title: 'Под конвекционную печь',
    text: 'Компактные тепловые шкафы на 4–12 противней. Ставятся под конвекционную печь и образуют единую колонну — экономят место на кухне и в мини-пекарне.',
    tags: ['Кафе', 'Мини-пекарня', 'Нержавеющая сталь'],
  },
  {
    img: '/proofer/cabinet.webp',
    cat: 'cabinet',
    title: 'Шкафы на противни',
    text: 'Отдельностоящие камеры на 10–18 противней или под хлебные формы. Автоматически держат температуру и влажность, есть подсветка и смотровое окно.',
    tags: ['Пекарня', 'Кондитерская', 'Хлебные формы'],
  },
  {
    img: '/proofer/trolley.webp',
    cat: 'trolley',
    title: 'Под тележки',
    text: 'Камеры для расстойки целыми тележками — в пару к ротационным печам. Сборно-разборный корпус, равномерная подача увлажнённого воздуха по всему объёму.',
    tags: ['Хлебозавод', 'Ротационная печь', 'Большие партии'],
  },
  {
    img: '/proofer/stand.webp',
    cat: 'stand',
    title: 'Подставки под печи',
    text: 'Подставки из нержавеющей стали под конвекционные печи с направляющими для гастроёмкостей 600×400 мм. Выдерживают до 200 кг.',
    tags: ['Конвекционная печь', 'Хранение', 'GN 600×400'],
  },
];

const ProoferTypes = ({ onCatalog }: { onCatalog: (cat: string) => void }) => (
  <section id="types" className="py-24 bg-coal-mid">
    <div className="container">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        Мы предлагаем следующие виды <span className="text-fire-gradient">расстоечных шкафов</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Выбор зависит от печи, с которой будет работать шкаф, объёма выпуска и свободного места в цехе.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {types.map((t, i) => (
          <article
            key={t.title}
            style={{ animationDelay: `${i * 80}ms` }}
            className="card-hover bg-coal rounded-2xl overflow-hidden border border-coal-light flex flex-col animate-fade-in-up"
          >
            <img src={t.img} alt={t.title} className="w-full aspect-[4/3] object-contain bg-white p-4" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-oswald text-2xl text-white mb-3">{t.title}</h3>
              <p className="text-white/70 mb-4 flex-1">{t.text}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-fire/10 text-fire font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onCatalog(t.cat)}
                className="self-start text-fire font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Смотреть модели <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProoferTypes;
