import Icon from '@/components/ui/icon';

const features = [
  { icon: 'Target', title: 'Точное дозирование', text: 'Серводвигатели и поршневые дозаторы дают одинаковые вес и форму каждого изделия — без брака и перерасхода сырья.' },
  { icon: 'MonitorSmartphone', title: 'Сенсорное управление', text: 'Программы для разных рецептов сохраняются в памяти — от 30 до 100 вариантов. Переход на новый продукт за пару касаний.' },
  { icon: 'Shapes', title: 'Сложные формы', text: 'Вращение насадок, протяжка противня и реверс: розочки, полоски, палочки, «курабье» и двухцветные изделия.' },
  { icon: 'Layers', title: 'Два бункера', text: 'Двухбункерные модели отсаживают изделия из двух видов теста или тесто с начинкой — заменяют сразу несколько машин.' },
  { icon: 'Scissors', title: 'Струнная резка', text: 'Аккуратно отделяет заготовки из плотного теста — пряники и овсяное печенье сохраняют ровную форму.' },
  { icon: 'ShieldCheck', title: 'Нержавеющая сталь', text: 'Корпус из пищевой нержавейки SUS 304, быстросъёмные узлы и соединения CLAMP для лёгкой санитарной обработки.' },
];

const DepositorWhy = () => (
  <section id="why" className="py-24 bg-coal relative overflow-hidden">
    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        На что смотреть <span className="text-fire-gradient">при выборе</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Отсадочная машина заменяет ручную работу кондитера с мешком: изделия получаются одинаковыми, а выпуск растёт в разы.
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

export default DepositorWhy;
