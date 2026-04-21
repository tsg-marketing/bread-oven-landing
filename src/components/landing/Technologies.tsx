const techs = [
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/25d424a7-1217-4377-ac5b-c386406d1993.jpg',
    t: 'Независимые ярусы = параллельная работа',
    d: 'Каждая камера — отдельная печь с раздельной регулировкой верхних и нижних ТЭНов. Одновременно пеките хлеб при 280°С и деликатные булочки при 180°С.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/a8ee2310-f4b7-470c-aa4a-c89a76ac63b7.jpg',
    t: 'Каменный под = премиальное качество выпечки',
    d: 'Камень накапливает тепло и отдаёт мягкое инфракрасное излучение. Результат: пышный мякиш, хрустящая корочка, минимальный упёк.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/43e27b41-8ade-4a7e-b462-d87dffff0ee1.jpg',
    t: 'Пароувлажнение для идеальной корочки',
    d: 'Усиленный парогенератор из стальных шаров + редукционный узел обеспечивают стабильную подачу пара даже при падении давления воды в системе.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/fbbe7d93-35a4-4554-9973-1bf961ef3e51.jpg',
    t: 'Нержавеющая сталь и энергоэффективность',
    d: 'Корпус из нержавейки AISI 304. Теплоизоляция из экологичного базальтового волокна без фенола. Экономия электроэнергии до 20% по сравнению с устаревшими моделями.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/5744f67b-ec97-4716-b881-c746194ab21a.jpg',
    t: 'Модульность: масштабируйте по мере роста',
    d: 'Серии Stone и «Иртыш» позволяют добавлять или убирать ярусы без замены оборудования. Начните с 2 ярусов — расширьтесь до 3–4, когда увеличится спрос.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/642ad85f-0f53-4ad8-a880-c31588c3fb30.jpg',
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
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Ключевые технологии <span className="text-fire-gradient">ярусных печей</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {techs.map((t, i) => (
            <div
              key={t.t}
              style={{ animationDelay: `${i * 80}ms` }}
              className="card-hover group bg-white rounded-2xl p-5 md:p-6 border border-coal-light shadow-sm flex gap-5 animate-fade-in-up"
            >
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-fire/30 shadow-lg shadow-fire/10 group-hover:scale-105 transition">
                  <img
                    src={t.img}
                    alt={t.t}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-oswald text-2xl md:text-3xl text-white mb-3 leading-tight">
                  {t.t}
                </h3>
                <p className="text-white/75 text-lg md:text-xl leading-relaxed">{t.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
