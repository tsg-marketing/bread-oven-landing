import Icon from '@/components/ui/icon';

const features = [
  { icon: 'Ruler', title: 'Точная толщина пласта', text: 'Зазор между валками регулируется ручкой или на цифровом дисплее — от 0,2 до 50 мм, одинаково по всей ширине.' },
  { icon: 'RefreshCcw', title: 'Реверс транспортёров', text: 'Направление движения лент переключается рычагом или педалью — тесто прокатывается туда-обратно без перекладывания.' },
  { icon: 'MonitorSmartphone', title: 'Сенсорное управление', text: 'Русифицированная панель с отображением зазора, программы раскатки и плавная регулировка скорости лент.' },
  { icon: 'FoldVertical', title: 'Складные столы', text: 'Боковые транспортёры поднимаются вертикально — в простое машина занимает минимум места.' },
  { icon: 'Sparkles', title: 'Простая чистка', text: 'Съёмные скребки, лотки для муки и неклейкое полотно лент — ежедневное обслуживание занимает минуты.' },
  { icon: 'Lock', title: 'Безопасность', text: 'Защитные решётки из нержавеющей стали: при подъёме решётки машина автоматически останавливается.' },
];

const RollingWhy = () => (
  <section id="why" className="py-24 bg-coal relative overflow-hidden">
    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        На что смотреть <span className="text-fire-gradient">при выборе</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Раскатка, которая раньше занимала часы ручного труда, сокращается до нескольких минут — при стабильном качестве пласта.
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

export default RollingWhy;
