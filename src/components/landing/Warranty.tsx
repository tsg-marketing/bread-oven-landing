import Icon from '@/components/ui/icon';

const blocks = [
  {
    icon: 'ShieldCheck',
    t: 'Гарантия до 3 лет',
    d: 'На всё оборудование с бесплатной пусконаладкой',
  },
  {
    icon: 'Award',
    t: 'Сертификация CE, ISO 9001',
    d: 'Соответствие международным стандартам качества',
  },
  {
    icon: 'FileCheck',
    t: 'Декларация соответствия',
    d: 'Документы для работы на территории РФ и СНГ',
  },
];

const Warranty = () => {
  return (
    <section id="warranty" className="py-24 bg-coal relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
            <span className="w-8 h-px bg-fire" /> ГАРАНТИЯ <span className="w-8 h-px bg-fire" />
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Работаем <span className="text-fire-gradient">по документам</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {blocks.map((b, i) => (
            <div
              key={b.t}
              style={{ animationDelay: `${i * 100}ms` }}
              className="card-hover relative bg-white rounded-2xl p-7 border border-coal-light shadow-sm overflow-hidden animate-fade-in-up"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-fire/10 blur-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center mb-5">
                  <Icon name={b.icon} size={28} className="text-white" />
                </div>
                <h3 className="font-oswald text-2xl text-white mb-2 leading-tight">{b.t}</h3>
                <p className="text-white/65">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Warranty;