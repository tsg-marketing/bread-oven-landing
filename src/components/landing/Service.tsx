import Icon from '@/components/ui/icon';

const items = [
  { icon: 'Warehouse', t: 'Наличие на складах', d: 'В Новосибирске и Москве' },
  { icon: 'Truck', t: 'Доставка РФ и СНГ', d: 'Экспресс-отправка со склада в день оплаты' },
  { icon: 'GraduationCap', t: 'Обучение персонала', d: 'Инструктаж на объекте клиента включён' },
  { icon: 'CreditCard', t: 'Лизинг и рассрочка', d: 'Гибкие условия оплаты и финансирования' },
];

const Service = () => {
  return (
    <section id="service" className="py-24 bg-coal-mid relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Сервис и <span className="text-fire-gradient">доставка</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <div
              key={it.t}
              style={{ animationDelay: `${i * 90}ms` }}
              className="card-hover relative bg-white rounded-2xl p-6 border border-coal-light shadow-sm animate-fade-in-up"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fire/20 to-ember/10 border border-fire/30 flex items-center justify-center mb-5">
                <Icon name={it.icon} size={24} className="text-fire" />
              </div>
              <h3 className="font-oswald text-xl md:text-2xl text-white mb-2 leading-tight">{it.t}</h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;