import Icon from '@/components/ui/icon';

const features = [
  { icon: 'ShieldCheck', title: 'Пищевая нержавеющая сталь', text: 'Дежа, спираль, отсекатель и крышка — из нержавейки. Легко мыть, тесто не налипает.' },
  { icon: 'Gauge', title: 'Две скорости', text: 'Первая — для смешивания сырья, вторая — для интенсивного замеса до эластичной массы.' },
  { icon: 'RefreshCcw', title: 'Реверс', text: 'Обратное вращение упрощает выгрузку теста и очистку месильного органа.' },
  { icon: 'Timer', title: 'Таймеры замеса', text: 'Время работы задаётся на таймерах — стабильный результат от партии к партии.' },
  { icon: 'ArrowDownToLine', title: 'Удобная выгрузка', text: 'Откатная или опрокидывающаяся дежа — тесто сразу на стол или в воронку делителя.' },
  { icon: 'Lock', title: 'Безопасность', text: 'Защитная крышка дежи и блокировка — машина остановится на любом этапе замеса.' },
];

const DoughWhy = () => (
  <section id="why" className="py-24 bg-coal relative overflow-hidden">
    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        На что смотреть <span className="text-fire-gradient">при выборе</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Возможности, которые отличают профессиональный тестомес от бытовой техники.
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

export default DoughWhy;
