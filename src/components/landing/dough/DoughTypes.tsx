import Icon from '@/components/ui/icon';

const types = [
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/155147c6-a2df-4750-bf62-ddf2f0f61e80.jpg',
    title: 'Спиральные',
    text: 'Спираль и дежа вращаются навстречу друг другу — тесто промешивается равномерно по всему объёму. Для дрожжевого, сдобного, опарного и безопарного теста влажностью от 55%.',
    tags: ['Хлеб и булочки', 'Пицца', 'Сдоба'],
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/61f7e1cd-2a8b-4d4e-90aa-c623d046eb1b.jpg',
    title: 'Лопастные и горизонтальные',
    text: 'Z-образные месильные органы имитируют ручной замес. Справляются с крутым и вязким тестом: пельменным, песочным, пряничным, бараночным.',
    tags: ['Пельмени', 'Пряники', 'Баранки'],
  },
  {
    img: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/9653a395-7b49-426a-900f-fd930fb992a0.jpg',
    title: 'Вакуумные',
    text: 'Замес в вакууме даёт плотное, эластичное тесто без пузырьков воздуха. Решение для промышленного выпуска лапши, пельменей и макаронных изделий.',
    tags: ['Лапша', 'Пельмени', 'Промышленность'],
  },
];

const DoughTypes = ({ onCatalog }: { onCatalog: () => void }) => (
  <section id="types" className="py-24 bg-coal-mid">
    <div className="container">
      <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
        Какие бывают <span className="text-fire-gradient">тестомесы</span>
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-2xl">
        Тип месильного органа определяет, с каким тестом машина справится лучше всего.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {types.map((t, i) => (
          <article
            key={t.title}
            style={{ animationDelay: `${i * 80}ms` }}
            className="card-hover bg-coal rounded-2xl overflow-hidden border border-coal-light flex flex-col animate-fade-in-up"
          >
            <img src={t.img} alt={t.title} className="w-full aspect-[4/3] object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-oswald text-2xl text-white mb-3">{t.title}</h3>
              <p className="text-white/70 mb-4 flex-1">{t.text}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-fire/10 text-fire font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={onCatalog}
                className="self-start text-fire font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Смотреть модели <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default DoughTypes;
