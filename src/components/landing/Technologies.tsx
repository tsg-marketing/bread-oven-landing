import Icon from '@/components/ui/icon';

const techs = [
  {
    icon: 'Layers3',
    t: 'Независимые ярусы = параллельная работа',
    d: 'Каждая камера — отдельная печь с раздельной регулировкой верхних и нижних ТЭНов. Одновременно пеките хлеб при 280°С и деликатные булочки при 180°С.',
  },
  {
    icon: 'Square',
    t: 'Каменный под = премиальное качество выпечки',
    d: 'Камень накапливает тепло и отдаёт мягкое инфракрасное излучение. Результат: пышный мякиш, хрустящая корочка, минимальный упёк.',
  },
  {
    icon: 'Droplets',
    t: 'Пароувлажнение для идеальной корочки',
    d: 'Усиленный парогенератор из стальных шаров + редукционный узел обеспечивают стабильную подачу пара даже при падении давления воды в системе.',
  },
  {
    icon: 'ShieldCheck',
    t: 'Нержавеющая сталь и энергоэффективность',
    d: 'Корпус из нержавейки AISI 304. Теплоизоляция из экологичного базальтового волокна без фенола. Экономия электроэнергии до 20% по сравнению с устаревшими моделями.',
  },
  {
    icon: 'Blocks',
    t: 'Модульность: масштабируйте по мере роста',
    d: 'Серии Stone и «Иртыш» позволяют добавлять или убирать ярусы без замены оборудования. Начните с 2 ярусов — расширьтесь до 3–4, когда увеличится спрос.',
  },
  {
    icon: 'Zap',
    t: 'Электричество или газ — выбор за вами',
    d: 'Печи выпускаются в обоих исполнениях. Оптимизируйте эксплуатационные расходы под инфраструктуру объекта.',
  },
];

const Technologies = () => {
  return (
    <section id="tech" className="py-24 bg-coal-mid relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px] -translate-y-1/2" />
      <div className="container relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
            <span className="w-8 h-px bg-fire" /> ТЕХНОЛОГИИ <span className="w-8 h-px bg-fire" />
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Ключевые технологии <span className="text-fire-gradient">ярусных печей</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {techs.map((t, i) => (
            <div
              key={t.t}
              style={{ animationDelay: `${i * 80}ms` }}
              className="card-hover group bg-coal rounded-2xl p-7 border border-coal-light flex gap-5 animate-fade-in-up"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center group-hover:scale-110 transition">
                  <Icon name={t.icon} size={24} className="text-white" />
                </div>
                <div className="mt-2 text-center text-xs font-oswald text-fire-gradient font-bold">
                  0{i + 1}
                </div>
              </div>
              <div>
                <h3 className="font-oswald text-xl text-white mb-2 leading-tight">{t.t}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{t.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
