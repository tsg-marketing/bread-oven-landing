import Icon from '@/components/ui/icon';

const items = [
  { icon: 'Layers3', t: 'Более 20 моделей ярусных печей', d: 'В наличии и под заказ — выберите под нужный объём' },
  { icon: 'LayoutGrid', t: '5 типов печей', d: 'Подовые, кондитерские, ротационные, конвекционные' },
  { icon: 'Award', t: 'Ведущие бренды', d: 'Hualian, Miratek, Lewant, ХПЭ, «Иртыш», ООО НПФ' },
  { icon: 'Wheat', t: 'От 160 до 700 кг хлеба в смену', d: 'Под любые объёмы производства' },
  { icon: 'ShieldCheck', t: 'До 3 лет гарантии', d: 'Завода-изготовителя на всё оборудование' },
  { icon: 'Truck', t: 'Доставка по России', d: 'Любой транспортной компанией' },
  { icon: 'Wrench', t: 'Собственный сервис', d: 'Гарантийное и послегарантийное обслуживание' },
];

const Advantages = () => {
  return (
    <section id="advantages" className="py-24 bg-coal-mid relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-fire/10 blur-[120px]" />
      <div className="container relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
            <span className="w-8 h-px bg-fire" /> ПРЕИМУЩЕСТВА <span className="w-8 h-px bg-fire" />
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Наши <span className="text-fire-gradient">преимущества</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div
              key={it.t}
              style={{ animationDelay: `${i * 70}ms` }}
              className="card-hover group relative bg-coal rounded-2xl p-7 border border-coal-light overflow-hidden animate-fade-in-up"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-fire/5 blur-2xl group-hover:bg-fire/15 transition" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fire/20 to-ember/10 border border-fire/30 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                  <Icon name={it.icon} size={24} className="text-fire" />
                </div>
                <h3 className="font-oswald text-xl text-white mb-2 leading-tight">{it.t}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
