import Icon from '@/components/ui/icon';

const rows = [
  { icon: 'Timer', label: 'Время замеса 50 кг теста', hand: '40–60 минут, 1–2 человека', auto: '8–12 минут, без участия человека' },
  { icon: 'Scale', label: 'Стабильность качества', hand: 'Зависит от усталости и опыта пекаря', auto: 'Одинаковое тесто в каждой партии — по таймеру' },
  { icon: 'Users', label: 'Персонал', hand: 'Отдельный сотрудник на замес', auto: 'Пекарь свободен для формовки и выпечки' },
  { icon: 'TrendingUp', label: 'Объём выпуска', hand: 'Упирается в физические силы людей', auto: 'От 10 до 400+ литров дежи за один цикл' },
  { icon: 'ShieldCheck', label: 'Гигиена', hand: 'Постоянный контакт рук с тестом', auto: 'Закрытая дежа из пищевой нержавейки' },
  { icon: 'HeartPulse', label: 'Нагрузка на сотрудников', hand: 'Тяжёлый ручной труд, риск травм', auto: 'Только загрузка сырья и выгрузка теста' },
];

const highlights = [
  { v: 'в 4–5 раз', t: 'быстрее ручного замеса' },
  { v: 'до 1 ставки', t: 'экономии на персонале' },
  { v: '6–12 мес.', t: 'типичная окупаемость' },
];

const DoughBenefits = () => (
  <section id="benefits" className="py-24 bg-coal-mid relative overflow-hidden">
    <div className="absolute -top-20 left-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        Выгоды <span className="text-fire-gradient">автоматических тестомесов</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Сравните ручной замес и работу профессионального тестомеса — разница видна уже в первую смену.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {highlights.map((h) => (
          <div key={h.t} className="bg-coal rounded-2xl p-6 border border-coal-light text-center">
            <div className="font-oswald text-3xl md:text-4xl font-bold text-fire-gradient mb-1">{h.v}</div>
            <div className="text-white/80">{h.t}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-coal-light overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.1fr_1fr_1fr] bg-coal text-sm uppercase tracking-wider font-semibold">
          <div className="p-4 text-white/50">Критерий</div>
          <div className="p-4 text-white/60 flex items-center gap-2">
            <Icon name="Hand" size={16} />
            Ручной замес
          </div>
          <div className="p-4 text-white bg-gradient-to-r from-fire to-fire-dark flex items-center gap-2">
            <Icon name="Cog" size={16} />
            Автоматический тестомес
          </div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid md:grid-cols-[1.1fr_1fr_1fr] ${i % 2 ? 'bg-coal' : 'bg-coal-mid'} border-t border-coal-light first:border-t-0 md:first:border-t`}
          >
            <div className="p-4 flex items-center gap-3 text-white font-semibold">
              <div className="w-10 h-10 rounded-lg bg-fire/15 border border-fire/30 flex items-center justify-center flex-shrink-0">
                <Icon name={r.icon} size={18} className="text-fire" />
              </div>
              {r.label}
            </div>
            <div className="px-4 pb-2 md:p-4 flex items-start gap-2 text-white/60">
              <Icon name="X" size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <span>
                <span className="md:hidden text-white/40">Вручную: </span>
                {r.hand}
              </span>
            </div>
            <div className="px-4 pb-4 md:p-4 flex items-start gap-2 text-white">
              <Icon name="Check" size={18} className="text-fire flex-shrink-0 mt-0.5" />
              <span>
                <span className="md:hidden text-white/50">Тестомес: </span>
                {r.auto}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DoughBenefits;
