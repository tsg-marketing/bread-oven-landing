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
  { icon: 'Zap', v: 'в 4–5 раз', t: 'быстрее ручного замеса' },
  { icon: 'Wallet', v: 'до 1 ставки', t: 'экономии на персонале' },
  { icon: 'CalendarCheck', v: '6–12 мес.', t: 'типичная окупаемость' },
];

const WHITE = { color: '#fff' };

const DoughBenefits = () => (
  <section id="benefits" className="py-24 bg-coal-mid relative overflow-hidden">
    <div className="absolute -top-20 left-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fire/10 border border-fire/30 text-fire text-sm font-semibold mb-4">
          <Icon name="Sparkles" size={16} />
          Ручной замес против тестомеса
        </div>
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          Выгоды <span className="text-fire-gradient">автоматических тестомесов</span>
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Разница видна уже в первую смену — быстрее, стабильнее и без тяжёлого ручного труда.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {highlights.map((h) => (
          <div
            key={h.t}
            className="relative rounded-2xl p-6 bg-gradient-to-br from-fire to-fire-dark shadow-xl shadow-fire/25 overflow-hidden card-hover"
          >
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10" />
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Icon name={h.icon} size={24} style={WHITE} />
            </div>
            <div className="font-oswald text-4xl font-bold mb-1" style={WHITE}>
              {h.v}
            </div>
            <div className="text-base" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {h.t}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-white border border-coal-light shadow-2xl shadow-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr>
                <th className="p-5 w-[34%] bg-coal-mid text-sm uppercase tracking-wider font-semibold text-white/50">
                  Критерий
                </th>
                <th className="p-5 w-[33%] bg-coal-mid border-l border-coal-light">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-coal-light/70 flex items-center justify-center">
                      <Icon name="Hand" size={20} className="text-white/60" />
                    </div>
                    <div>
                      <div className="font-oswald text-lg uppercase text-white/70">Ручной замес</div>
                      <div className="text-xs font-normal text-white/50">как сейчас</div>
                    </div>
                  </div>
                </th>
                <th className="p-5 w-[33%] bg-gradient-to-r from-fire to-fire-dark">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon name="Cog" size={20} style={WHITE} />
                    </div>
                    <div>
                      <div className="font-oswald text-lg uppercase" style={WHITE}>
                        Тестомес
                      </div>
                      <div className="text-xs font-normal" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        профессиональное оборудование
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-coal-light group">
                  <td className="p-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-fire/10 border border-fire/25 flex items-center justify-center flex-shrink-0 group-hover:bg-fire/20 transition">
                        <Icon name={r.icon} size={20} className="text-fire" />
                      </div>
                      <span className="font-semibold text-white text-base md:text-lg">{r.label}</span>
                    </div>
                  </td>
                  <td className="p-5 align-middle border-l border-coal-light">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="X" size={14} className="text-red-500" />
                      </span>
                      <span className="text-white/60">{r.hand}</span>
                    </div>
                  </td>
                  <td className="p-5 align-middle bg-fire/[0.06] border-l-2 border-fire/40">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} style={WHITE} />
                      </span>
                      <span className="text-white font-semibold">{r.auto}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

export default DoughBenefits;
