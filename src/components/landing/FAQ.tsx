import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const items = [
  { q: 'Какую печь выбрать для пекарни на 200 кг хлеба в смену?', a: 'Оптимальны 3-ярусные подовые или ротационные печи с производительностью 200–300 кг/смена. Конкретную модель технолог подберёт под ваше помещение, электроснабжение и ассортимент.' },
  { q: 'В чём разница между каменным подом и обычным листом?', a: 'Каменный под аккумулирует тепло и отдаёт мягкое инфракрасное излучение — выпечка получает пышный мякиш и хрустящую корочку. Обычный лист греет только снизу и быстрее остывает.' },
  { q: 'Что лучше — электрическая или газовая печь?', a: 'Электрические — проще в подключении и стабильнее по температуре. Газовые — дешевле в эксплуатации при большом объёме. Выбор зависит от инфраструктуры объекта.' },
  { q: 'Нужно ли отдельное пароувлажнение или достаточно ручного?', a: 'Для профессиональной выпечки хлеба встроенный парогенератор обязателен. Ручное увлажнение не даёт стабильной корочки и увеличивает брак.' },
  { q: 'Можно ли на ярусной печи печь пиццу и хлеб одновременно?', a: 'Да. Каждый ярус работает независимо — можно задать 280°С для хлеба в нижней камере и 250°С для пиццы в верхней.' },
  { q: 'Какое подключение требуется (220/380 В)?', a: 'До 5 кВт — 220 В, выше — 380 В трёхфазное. Для большинства профессиональных печей нужна 380 В.' },
  { q: 'Сколько времени занимает доставка и монтаж?', a: 'Доставка по РФ — 3–10 дней в зависимости от региона. Монтаж и пусконаладка — 1–2 дня на объекте.' },
  { q: 'Есть ли рассрочка / лизинг?', a: 'Да, работаем с несколькими лизинговыми компаниями и предоставляем рассрочку. Условия обсуждаются индивидуально.' },
  { q: 'Можно ли модернизировать печь (добавить ярус)?', a: 'Для серий Stone и «Иртыш» — да, можно наращивать ярусы без замены оборудования.' },
  { q: 'Какая печь подойдёт для торгового зала супермаркета?', a: 'Конвекционная или небольшая подовая печь с малой теплоотдачей во внешнюю среду. Подберём модель, которая не будет нагревать зал.' },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-coal-mid relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[140px]" />
      <div className="container relative max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
            <span className="w-8 h-px bg-fire" /> FAQ <span className="w-8 h-px bg-fire" />
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Часто <span className="text-fire-gradient">спрашивают</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((it, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="bg-white border border-coal-light rounded-2xl px-6 shadow-sm data-[state=open]:border-fire/40 transition"
            >
              <AccordionTrigger className="text-white hover:text-fire text-left font-oswald text-lg py-5">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 pb-5 leading-relaxed">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;