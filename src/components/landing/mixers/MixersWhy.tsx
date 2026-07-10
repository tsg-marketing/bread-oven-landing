import Icon from '@/components/ui/icon';

const points = [
  {
    icon: 'Orbit',
    title: 'Планетарное вращение',
    text: 'Насадка движется вокруг своей оси и вокруг дежи — продукт промешивается равномерно по всему объёму.',
  },
  {
    icon: 'Utensils',
    title: '3 насадки в комплекте',
    text: 'Венчик (кремы, взбивание), лопатка/битер (смешивание), крюк или спираль (тесто).',
  },
  {
    icon: 'Layers',
    title: 'Универсальность',
    text: 'От воздушных меренг и бисквита до плотного дрожжевого теста и фарша.',
  },
  {
    icon: 'Sparkles',
    title: 'Нержавеющая сталь',
    text: 'Дежа и рабочие части из пищевой стали, соответствуют санитарным нормам.',
  },
  {
    icon: 'SlidersHorizontal',
    title: 'Регулировка скорости',
    text: 'От 3 фиксированных скоростей до плавного вариатора и программ.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Безопасность',
    text: 'Защитная решётка/крышка, аварийная остановка, отключение при подъёме дежи.',
  },
];

const MixersWhy = () => {
  return (
    <section id="why" className="py-24 bg-coal">
      <div className="container">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-10">
          Почему именно <span className="text-fire-gradient">планетарный миксер</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((p, i) => (
            <div
              key={p.title}
              style={{ animationDelay: `${i * 70}ms` }}
              className="animate-fade-in-up bg-coal-mid rounded-2xl border border-coal-light p-6 hover:border-fire/40 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center mb-4">
                <Icon name={p.icon} size={24} className="text-white" />
              </div>
              <div className="font-oswald text-xl text-white mb-2">{p.title}</div>
              <div className="text-white/70 text-base leading-snug">{p.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixersWhy;
