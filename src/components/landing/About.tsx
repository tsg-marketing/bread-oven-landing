import Icon from '@/components/ui/icon';

const stats = [
  { v: '15+', l: 'лет на рынке' },
  { v: '150+', l: 'моделей печей' },
  { v: '1 200+', l: 'довольных клиентов' },
  { v: '85', l: 'регионов поставок' },
];

const values = [
  { icon: 'Factory', t: 'Прямые поставки', d: 'Работаем напрямую с заводами — Hualian, Miratek, Lewant, ХПЭ, «Иртыш». Никаких перекупщиков.' },
  { icon: 'Users', t: 'Опытные технологи', d: 'Каждого клиента ведёт инженер-технолог с опытом работы в пекарнях от 10 лет.' },
  { icon: 'ShieldCheck', t: 'Ответственность', d: 'Гарантия до 3 лет, собственный сервис, склад запчастей в Москве и Новосибирске.' },
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
          <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
            <span className="w-8 h-px bg-fire" /> О КОМПАНИИ <span className="w-8 h-px bg-fire" />
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-6" style={{ color: 'hsl(var(--ink))' }}>
            О компании <span className="text-fire-gradient">ТЕХНОСИБ</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'hsl(var(--ink) / 0.7)' }}>
            Поставляем промышленное хлебопекарное, кондитерское и вакуум-упаковочное
            оборудование по всей России и СНГ. Помогаем запускать пекарни и пиццерии
            с нуля — от подбора печи до ввода в эксплуатацию.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <div
              key={s.l}
              className="bg-white rounded-2xl p-6 text-center border shadow-sm"
              style={{ borderColor: 'hsl(var(--coal-light))' }}
            >
              <div className="font-oswald text-3xl md:text-4xl font-bold text-fire-gradient mb-1">
                {s.v}
              </div>
              <div className="text-sm" style={{ color: 'hsl(var(--ink) / 0.6)' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {values.map((v) => (
            <div
              key={v.t}
              className="bg-white rounded-2xl p-7 border shadow-sm card-hover"
              style={{ borderColor: 'hsl(var(--coal-light))' }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fire/15 to-ember/10 border border-fire/30 flex items-center justify-center mb-4">
                <Icon name={v.icon} size={24} className="text-fire" />
              </div>
              <h3 className="font-oswald text-xl mb-2" style={{ color: 'hsl(var(--ink))' }}>
                {v.t}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--ink) / 0.65)' }}>
                {v.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
