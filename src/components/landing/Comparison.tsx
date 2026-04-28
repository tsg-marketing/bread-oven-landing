type Row = {
  category: string;
  segment: string;
  heat: string;
  tiers: string;
  load: string;
  perf: string;
  temp: string;
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
  },
  {
    category: 'Подовые электрические среднего класса (с листом)',
    segment: 'Пекарни, кондитерские, пиццерии, супермаркеты',
    heat: 'Электрический',
    tiers: '3',
    load: 'Лист 600×400',
    perf: 'Средняя (универсальная)',
    temp: '+20…+300',
  },
  {
    category: 'Хлебопекарные ярусные ХПЭ',
    segment: 'Пекарни малой/средней мощности, кондитерские цеха, ОП',
    heat: 'Электрический',
    tiers: '1–4',
    load: 'Хлебная форма №7: 24 / 48 / 72 / 96 шт',
    perf: '160 / 350 / 500 / 700 кг хлеба за смену',
    temp: '100–280',
  },
  {
    category: 'Ярусные подовые с противнями (электро/газ)',
    segment: 'Пекарни и кондитерские цеха',
    heat: 'Электрический / Газовый',
    tiers: '2–6',
    load: '4 / 9 противней',
    perf: '17–39 кг/ч',
    temp: 'автоматически регулируется',
  },
  {
    category: 'Мини-подовые с каменным подом и расстойкой',
    segment: 'Небольшие пекарни, кондитерские, ритейл, ОП',
    heat: 'Электрический',
    tiers: '2–3',
    load: 'Каменный под 600×900 мм',
    perf: 'Малая/средняя',
    temp: 'регулируемая',
  },
  {
    category: 'Полноразмерные подовые с каменным подом и расстойкой',
    segment: 'Пекарни, кондитерские, ритейл, кафетерии',
    heat: 'Электрический',
    tiers: '2–3',
    load: 'Каменный под 1200×900 мм',
    perf: 'Средняя/высокая',
    temp: 'регулируемая',
  },
];

const headers: { key: keyof Row; label: string }[] = [
  { key: 'category', label: 'Категория' },
  { key: 'segment', label: 'Назначение / сегмент' },
  { key: 'heat', label: 'Тип нагрева' },
  { key: 'tiers', label: 'Кол-во ярусов' },
  { key: 'load', label: 'Загрузка' },
  { key: 'perf', label: 'Производительность' },
  { key: 'temp', label: 'Температура, °C' },
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
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-gradient-to-r from-coal to-coal-mid text-white">
                {headers.map((h) => (
                  <th
                    key={h.key as string}
                    className="p-3 md:p-4 font-oswald uppercase tracking-wide text-[11px] md:text-sm border-b-2 border-fire/40 align-top"
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
                  <td className="p-3 md:p-4 align-top" style={{ color: 'hsl(var(--ink))' }}>
                    <div className="font-oswald font-bold text-fire-gradient text-sm md:text-base leading-tight">
                      {r.category}
                    </div>
                  </td>
                  <td className="p-3 md:p-4 align-top text-xs md:text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                    {r.segment}
                  </td>
                  <td className="p-3 md:p-4 align-top text-xs md:text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                    {r.heat}
                  </td>
                  <td className="p-3 md:p-4 align-top text-xs md:text-sm font-semibold" style={{ color: 'hsl(var(--ink))' }}>
                    {r.tiers}
                  </td>
                  <td className="p-3 md:p-4 align-top text-xs md:text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                    {r.load}
                  </td>
                  <td className="p-3 md:p-4 align-top text-xs md:text-sm font-semibold" style={{ color: 'hsl(var(--ink))' }}>
                    {r.perf}
                  </td>
                  <td className="p-3 md:p-4 align-top text-xs md:text-sm" style={{ color: 'hsl(var(--ink) / 0.85)' }}>
                    {r.temp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
