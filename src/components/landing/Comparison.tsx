import Icon from '@/components/ui/icon';

const rows = [
  { type: 'Подовые', area: 'Хлеб, багеты', vol: '160–400 кг/см', quality: 'Премиум', note: 'Каменный под' },
  { type: 'Ярусные', area: 'Универсал', vol: '200–500 кг/см', quality: 'Высокое', note: 'Независимые ярусы' },
  { type: 'Ротационные', area: 'Сдоба, булочки', vol: '300–700 кг/см', quality: 'Высокое', note: 'Равномерный прогрев' },
  { type: 'Конвекционные', area: 'Пицца, кондитерка', vol: 'до 200 кг/см', quality: 'Стабильное', note: 'Компактность' },
  { type: 'Кондитерские', area: 'Торты, десерты', vol: 'до 150 кг/см', quality: 'Деликатное', note: 'Точный контроль t°' },
];

const Comparison = () => {
  return (
    <section id="comparison" className="py-24 bg-coal-mid relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Сравнение <span className="text-fire-gradient">типов печей</span>
          </h2>
        </div>

        <div className="rounded-2xl overflow-hidden border border-coal-light bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: 'hsl(var(--coal-mid))' }}>
                <tr className="text-left text-white/70 text-base uppercase tracking-wider">
                  <th className="p-5 font-medium">Тип печи</th>
                  <th className="p-5 font-medium">Применение</th>
                  <th className="p-5 font-medium">Объём</th>
                  <th className="p-5 font-medium">Качество</th>
                  <th className="p-5 font-medium">Особенности</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.type} className={`border-t border-coal-light text-white ${i % 2 ? 'bg-[hsl(var(--coal-mid))]/60' : ''}`}>
                    <td className="p-5 font-oswald text-fire-gradient font-bold text-xl">{r.type}</td>
                    <td className="p-5 text-lg text-white/85">{r.area}</td>
                    <td className="p-5 text-lg text-white/85">{r.vol}</td>
                    <td className="p-5 text-lg text-white/85">{r.quality}</td>
                    <td className="p-5 text-lg text-white/85">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-coal-light bg-coal-mid flex items-center gap-2 text-sm text-white/50">
            <Icon name="Info" size={14} className="text-fire" />
            Подробная таблица сравнения будет предоставлена позже
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;