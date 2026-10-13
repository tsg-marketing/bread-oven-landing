import Icon from '@/components/ui/icon';

const types = [
  {
    img: '/rolling/floor.webp',
    cat: 'floor',
    title: 'Напольные реверсивные',
    text: 'Два реверсивных транспортёра и валки с регулируемым зазором. Раскатывают слоёное, дрожжевое и песочное тесто, складные столы экономят место в цехе.',
    tags: ['Круассаны', 'Слойки', 'Кондитерская'],
  },
  {
    img: '/rolling/table.webp',
    cat: 'table',
    title: 'Настольные',
    text: 'Компактные машины для кафе, ресторанов и небольших пекарен. Те же функции раскатки, но устанавливаются на рабочий стол.',
    tags: ['Кафе', 'Пиццерия', 'Мини-пекарня'],
  },
  {
    img: '/rolling/auto.webp',
    cat: 'auto',
    title: 'Автоматические',
    text: 'Программируемая раскатка с сенсорной панелью: машина сама меняет направление и зазор между валками. Для крупных пекарен и кондитерских производств.',
    tags: ['Программы', 'Слоёное тесто', 'Производство'],
  },
  {
    img: '/rolling/hard.webp',
    cat: 'hard',
    title: 'Для крутого теста',
    text: 'Прочная конструкция валков справляется с плотным тестом для пельменей, вареников, мантов, чебуреков и самсы.',
    tags: ['Пельмени', 'Вареники', 'Чебуреки'],
  },
  {
    img: '/rolling/noodle.webp',
    cat: 'noodle',
    title: 'Тестораскатки-лапшерезки',
    text: 'Раскатывают пласт и сразу нарезают лапшу. Для спагетти, домашней лапши, равиоли и макаронных изделий.',
    tags: ['Лапша', 'Паста', 'Равиоли'],
  },
  {
    img: '/rolling/lavash.webp',
    cat: 'lavash',
    title: 'Для лаваша и пиццы',
    text: 'Машины для раскатки тонких круглых и листовых заготовок — лаваша, основ для пиццы и лепёшек.',
    tags: ['Лаваш', 'Пицца', 'Лепёшки'],
  },
];

const RollingTypes = ({ onCatalog }: { onCatalog: (cat: string) => void }) => (
  <section id="types" className="py-24 bg-coal-mid">
    <div className="container">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        Какие бывают <span className="text-fire-gradient">тестораскатки</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Выбор зависит от вида теста, объёма выпуска и свободного места на кухне или в цехе.
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

export default RollingTypes;
