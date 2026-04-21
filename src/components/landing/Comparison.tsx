import Icon from '@/components/ui/icon';

type Row = {
  category: string;
  segment: string;
  heat: string;
  tiers: string;
  load: string;
  perf: string;
  temp: string;
  stone: string;
  steam: string;
  control: string;
  proofer: string;
  warranty: string;
};

const rows: Row[] = [
  {
    category: 'Настольные печи для пиццы',
    segment: 'Кафе, фаст-фуд, пиццерии, фудкорты',
    heat: 'Электрический',
    tiers: '1–2',
    load: 'Камень 400×400 (1–2 шт)',
    perf: 'Малая (разогрев / 1–2 пиццы за цикл)',
    temp: 'до 300–350',
    stone: 'Пекарский / керамический камень',
    steam: 'Нет',
    control: 'Механическое + термостаты + таймер',
    proofer: 'Нет',
    warranty: '12 мес.',
  },
  {
    category: 'Подовые электрические среднего класса (с листом)',
    segment: 'Пекарни, кондитерские, пиццерии, супермаркеты',
    heat: 'Электрический',
    tiers: '3',
    load: 'Лист 600×400',
    perf: 'Средняя (универсальная)',
    temp: '+20…+300',
    stone: 'Каменный под (опция)',
    steam: 'Опционально',
    control: 'Электромеханическое',
    proofer: 'Нет',
    warranty: '12 мес.',
  },
  {
    category: 'Хлебопекарные ярусные ХПЭ',
    segment: 'Пекарни малой/средней мощности, кондитерские цеха, ОП',
    heat: 'Электрический',
    tiers: '1–4',
    load: 'Хлебная форма №7: 24 / 48 / 72 / 96 шт',
    perf: '160 / 350 / 500 / 700 кг хлеба за смену',
    temp: '100–280',
    stone: 'Без каменного пода',
    steam: 'Ручное',
    control: 'Электромеханическое (2 термодатчика на камеру)',
    proofer: 'Нет',
    warranty: '12 мес.',
  },
  {
    category: 'Ярусные подовые с противнями (электро/газ)',
    segment: 'Пекарни и кондитерские цеха',
    heat: 'Электрический / Газовый',
    tiers: '2–6 (ярусы по 2/4/6/9 противней)',
    load: '4 / 9 противней',
    perf: '17–39 кг/ч',
    temp: 'автоматически регулируется',
    stone: 'Без каменного пода (стандарт)',
    steam: 'Опционально',
    control: 'Автоматическое + цифровой таймер на ярус',
    proofer: 'Нет',
    warranty: '12 мес.',
  },
  {
    category: 'Мини-подовые с каменным подом и расстойкой',
    segment: 'Небольшие пекарни, кондитерские, ритейл, ОП',
    heat: 'Электрический',
    tiers: '2–3',
    load: 'Каменный под 600×900 мм',
    perf: 'Малая/средняя',
    temp: 'регулируемая',
    stone: 'Вулканический камень',
    steam: 'Усиленный парогенератор + редукционный узел',
    control: 'Автономная панель на каждый ярус',
    proofer: 'Встроенный, 12 листов 600×400',
    warranty: '36 мес.',
  },
  {
    category: 'Полноразмерные подовые с каменным подом и расстойкой',
    segment: 'Пекарни, кондитерские, ритейл, кафетерии',
    heat: 'Электрический',
    tiers: '2–3',
    load: 'Каменный под 1200×900 мм',
    perf: 'Средняя/высокая',
    temp: 'регулируемая',
    stone: 'Вулканический камень / пекарский камень 20 мм',
    steam: 'Усиленный парогенератор',
    control: 'Автономная панель на каждый ярус, цифровой блок',
    proofer: 'Встроенный, 24 листа 600×400',
    warranty: '36 мес.',
  },
];

const headers: { key: keyof Row; label: string; w?: string }[] = [
  { key: 'category', label: 'Категория (тип печи)', w: 'min-w-[220px]' },
  { key: 'segment', label: 'Назначение / сегмент', w: 'min-w-[220px]' },
  { key: 'heat', label: 'Тип нагрева', w: 'min-w-[150px]' },
  { key: 'tiers', label: 'Кол-во ярусов', w: 'min-w-[130px]' },
  { key: 'load', label: 'Загрузка (лист / форма / противень)', w: 'min-w-[220px]' },
  { key: 'perf', label: 'Производительность', w: 'min-w-[200px]' },
  { key: 'temp', label: 'Температура, °C', w: 'min-w-[150px]' },
  { key: 'stone', label: 'Под / камень', w: 'min-w-[200px]' },
  { key: 'steam', label: 'Пароувлажнение', w: 'min-w-[180px]' },
  { key: 'control', label: 'Управление', w: 'min-w-[220px]' },
  { key: 'proofer', label: 'Расстоечный шкаф', w: 'min-w-[180px]' },
  { key: 'warranty', label: 'Гарантия', w: 'min-w-[110px]' },
];

const Comparison = () => {
  return (
    <section id="comparison" className="py-24 bg-coal-mid relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Сравнение <span className="text-fire-gradient">типов печей</span>
          </h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto">
            Все ключевые параметры в одной таблице — выберите категорию под ваши задачи.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-coal-light bg-white shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-coal to-coal-mid text-white">
                  {headers.map((h) => (
                    <th
                      key={h.key as string}
                      className={`p-4 font-oswald uppercase tracking-wide text-xs md:text-sm border-b-2 border-fire/40 align-top ${h.w || ''}`}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.category}
                    className={`transition hover:bg-fire/5 ${
                      i % 2 ? 'bg-coal-mid/5' : 'bg-white'
                    }`}
                    style={{ borderTop: '1px solid hsl(var(--coal-light))' }}
                  >
                    <td className="p-4 align-top" style={{ color: 'hsl(var(--ink))' }}>
                      <div className="font-oswald font-bold text-fire-gradient text-base md:text-lg leading-tight">
                        {r.category}
                      </div>
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.segment}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.heat}
                    </td>
                    <td className="p-4 align-top text-sm font-semibold" style={{ color: 'hsl(var(--ink))' }}>
                      {r.tiers}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.load}
                    </td>
                    <td className="p-4 align-top text-sm font-semibold" style={{ color: 'hsl(var(--ink))' }}>
                      {r.perf}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.temp}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.stone}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.steam}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.control}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                      {r.proofer}
                    </td>
                    <td className="p-4 align-top">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-fire/10 border border-fire/40 text-fire text-xs font-semibold whitespace-nowrap">
                        <Icon name="ShieldCheck" size={12} />
                        {r.warranty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="p-4 border-t flex items-center gap-2 text-sm"
            style={{ borderColor: 'hsl(var(--coal-light))', background: 'hsl(var(--coal-mid) / 0.06)', color: 'hsl(var(--ink) / 0.7)' }}
          >
            <Icon name="Info" size={14} className="text-fire" />
            Прокрутите таблицу вправо, чтобы увидеть все параметры.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
