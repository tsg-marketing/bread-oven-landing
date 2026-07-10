const points = [
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/f2e51933-d6c3-426f-ab71-27d86abca240.jpg',
    title: 'Планетарное вращение',
    text: 'Насадка движется вокруг своей оси и вокруг дежи — продукт промешивается равномерно по всему объёму.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/8cac0c56-6cd1-47b3-807e-13a593897892.jpg',
    title: '3 насадки в комплекте',
    text: 'Венчик (кремы, взбивание), лопатка/битер (смешивание), крюк или спираль (тесто).',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/d69306c9-25ac-477e-acc2-9f559c04c2a5.jpg',
    title: 'Универсальность',
    text: 'От воздушных меренг и бисквита до плотного дрожжевого теста и фарша.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/5c113a41-80ff-4908-98e6-ce6b586ad471.jpg',
    title: 'Нержавеющая сталь',
    text: 'Дежа и рабочие части из пищевой стали, соответствуют санитарным нормам.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/8863e834-7f51-4a7c-a383-5491372a3388.jpg',
    title: 'Регулировка скорости',
    text: 'От 3 фиксированных скоростей до плавного вариатора и программ.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/a6ade408-b9dd-446f-8a9e-e1477e1e4437.jpg',
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
              className="animate-fade-in-up bg-coal-mid rounded-2xl border border-coal-light overflow-hidden hover:border-fire/40 transition flex flex-col"
            >
              <div className="aspect-square bg-white overflow-hidden flex items-center justify-center p-4 max-w-[200px] mx-auto w-full">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="font-oswald text-xl text-white mb-2">{p.title}</div>
                <div className="text-white/70 text-base leading-snug">{p.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixersWhy;