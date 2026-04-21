import Icon from '@/components/ui/icon';

const stats = [
  { v: '25', l: 'лет на рынке', d: 'Опыт и экспертиза в упаковочном оборудовании' },
  { v: '2 города', l: 'Офисы', d: 'Москва и Новосибирск' },
  { v: 'Проверенные', l: 'партнёры', d: 'Из Европы, России и Китая' },
];

const values = [
  { icon: 'PackageCheck', t: 'Комплексные решения', d: 'От подбора оборудования до сервисного обслуживания' },
  { icon: 'Truck', t: 'Быстрая доставка', d: 'Собственная логистика по всей России и СНГ' },
  { icon: 'Wrench', t: 'Сервисная поддержка', d: 'Гарантийное и постгарантийное обслуживание' },
  { icon: 'MessageSquareQuote', t: 'Экспертная консультация', d: 'Помощь в выборе оптимального решения' },
];

const offices = [
  { city: 'Москва', addr: 'ш. Энтузиастов, д. 56, стр. 32, офис 115' },
  { city: 'Новосибирск', addr: 'ул. Электрозаводская, 2 к1, офис 304, 314' },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: 'hsl(var(--coal))' }}
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-fire/8 blur-[150px] pointer-events-none" />
      <div className="container relative max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-4" style={{ color: 'hsl(var(--ink))' }}>
            О компании <span className="text-fire-gradient">ТЕХНОСИБ</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium" style={{ color: 'hsl(var(--ink) / 0.8)' }}>
            Ваш надежный партнер с 2001 года
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {stats.map((s) => (
            <div
              key={s.l}
              className="bg-white rounded-2xl p-6 text-center border shadow-sm"
              style={{ borderColor: 'hsl(var(--coal-light))' }}
            >
              <div className="font-oswald text-4xl md:text-5xl font-bold text-fire-gradient mb-2">
                {s.v}
              </div>
              <div className="text-lg font-semibold mb-1" style={{ color: 'hsl(var(--ink))' }}>
                {s.l}
              </div>
              <div className="text-sm" style={{ color: 'hsl(var(--ink) / 0.6)' }}>
                {s.d}
              </div>
            </div>
          ))}
        </div>

        <div
          className="bg-white rounded-2xl p-8 md:p-10 border shadow-sm mb-12 space-y-4 text-lg md:text-xl leading-relaxed"
          style={{ borderColor: 'hsl(var(--coal-light))', color: 'hsl(var(--ink) / 0.8)' }}
        >
          <p>
            Компания «Техно&nbsp;Сиб» — надежный поставщик и партнер в сфере профессионального
            пищевого и фасовочно-упаковочного оборудования. Мы работаем с 2001 года и уже
            25 лет помогаем предприятиям эффективно оснащать производства и склады пищевым
            и упаковочным оборудованием, предоставляем сервисное обслуживание, а также
            реализуем упаковочные и расходные материалы.
          </p>
          <p>
            Мы сотрудничаем с ведущими заводами-производителями Европы, России и Китая,
            подбирая решения под задачи и бюджет клиента.
          </p>
          <p>
            Собственные офисы продаж, склады, сервисная служба и отлаженная логистика
            в Москве и Новосибирске позволяют нам оперативно выполнять поставки и поддерживать
            оборудование на территории России и стран СНГ.
          </p>
          <p>
            Экспертиза наших специалистов помогает решать задачи любого уровня сложности —
            от подбора единичной позиции до комплексного оснащения. «Техно&nbsp;Сиб» всегда
            предложит оптимальное решение для вашего бизнеса и обеспечит надежную поддержку
            на всех этапах работы.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {values.map((v) => (
            <div
              key={v.t}
              className="bg-white rounded-2xl p-7 border shadow-sm card-hover"
              style={{ borderColor: 'hsl(var(--coal-light))' }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fire/15 to-ember/10 border border-fire/30 flex items-center justify-center mb-4">
                <Icon name={v.icon} size={26} className="text-fire" />
              </div>
              <h3 className="font-oswald text-xl md:text-2xl mb-2" style={{ color: 'hsl(var(--ink))' }}>
                {v.t}
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'hsl(var(--ink) / 0.7)' }}>
                {v.d}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {offices.map((o) => (
            <div
              key={o.city}
              className="bg-white rounded-2xl p-6 border shadow-sm flex items-start gap-4"
              style={{ borderColor: 'hsl(var(--coal-light))' }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-oswald text-xl md:text-2xl mb-1" style={{ color: 'hsl(var(--ink))' }}>
                  {o.city}
                </div>
                <div className="text-base md:text-lg" style={{ color: 'hsl(var(--ink) / 0.75)' }}>
                  {o.addr}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
