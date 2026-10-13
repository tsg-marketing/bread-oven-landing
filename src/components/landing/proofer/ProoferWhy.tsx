import Icon from '@/components/ui/icon';

const features = [
  { icon: 'Thermometer', title: 'Точная температура', text: 'Автоматика держит заданный режим 25–45 °С с точностью до градусов — тесто бродит одинаково в каждой партии.' },
  { icon: 'Droplets', title: 'Контроль влажности', text: 'Система пароувлажнения поддерживает 50–95% влажности: поверхность заготовок не подсыхает и не покрывается корочкой.' },
  { icon: 'Wind', title: 'Равномерный обдув', text: 'Увлажнённый воздух подаётся снизу вверх и распределяется по всей камере — заготовки на верхних и нижних уровнях поднимаются одинаково.' },
  { icon: 'ShieldCheck', title: 'Нержавеющая сталь', text: 'Камера и облицовка из пищевой нержавейки, утеплённые стенки и двойной стеклопакет на двери снижают теплопотери.' },
  { icon: 'Lightbulb', title: 'Подсветка и смотровое окно', text: 'Процесс расстойки видно через стеклянную дверь — не нужно открывать камеру и сбивать микроклимат.' },
  { icon: 'Puzzle', title: 'Сборно-разборный корпус', text: 'Крупные шкафы поставляются в разобранном виде и проходят в стандартные дверные проёмы. Сборка и запуск — за 1 рабочий день.' },
];

const ProoferWhy = () => (
  <section id="why" className="py-24 bg-coal relative overflow-hidden">
    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        На что смотреть <span className="text-fire-gradient">при выборе</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Правильная расстойка — половина успеха выпечки. Шкаф создаёт идеальный микроклимат для брожения без постоянного контроля пекаря.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.title} className="bg-coal-mid rounded-2xl p-6 border border-coal-light card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center mb-4 shadow-lg shadow-fire/30">
              <Icon name={f.icon} size={22} className="text-white" />
            </div>
            <h3 className="font-oswald text-xl text-white mb-2">{f.title}</h3>
            <p className="text-white/70">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProoferWhy;
