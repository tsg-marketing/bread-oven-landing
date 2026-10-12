import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const items = [
  {
    q: 'Чем спиральный тестомес отличается от лопастного?',
    a: 'Спиральный рассчитан на дрожжевое и сдобное тесто влажностью от 55% — для хлеба, булочек, пиццы. Лопастной (с Z-образными лопастями) месит крутое и вязкое тесто: пельменное, песочное, пряничное, бараночное.',
  },
  {
    q: 'Какой объём дежи нужен?',
    a: 'Ориентируйтесь на разовую загрузку теста: обычно она составляет около 60–65% объёма дежи. Для небольшой пиццерии хватит 10–30 л, для пекарни — 40–120 л, для хлебозавода — от 200 л.',
  },
  {
    q: 'Для чего нужен вакуумный тестомес?',
    a: 'Вакуум удаляет воздух из теста — оно получается плотным, эластичным и однородным. Это важно при промышленном выпуске лапши, пельменей и макаронных изделий.',
  },
  {
    q: 'Что такое откатная и опрокидывающаяся дежа?',
    a: 'Откатную дежу на колёсах после замеса увозят к месту разделки. Опрокидывающаяся выгружает тесто прямо на рабочий стол или в воронку тестоделителя — без ручного труда.',
  },
  {
    q: '220 или 380 В?',
    a: 'Компактные модели до 20–30 л часто работают от 220 В. Производственные тестомесы — как правило от 380 В.',
  },
  {
    q: 'Есть ли гарантия и сервис?',
    a: 'Да. Оборудование поставляется с официальной гарантией производителя, а покупатели получают приоритетное обслуживание в нашем собственном сервисном центре.',
  },
];

const DoughFAQ = () => (
  <section id="faq" className="py-24 bg-coal-mid relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative max-w-4xl">
      <div className="text-center mb-10">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
          Часто <span className="text-fire-gradient">спрашивают</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {items.map((it, i) => (
          <AccordionItem
            key={i}
            value={`q-${i}`}
            className="bg-coal border border-coal-light rounded-2xl px-6 shadow-sm data-[state=open]:border-fire/40 transition"
          >
            <AccordionTrigger className="text-white hover:text-fire text-left font-oswald text-xl md:text-2xl py-5 leading-snug">
              {it.q}
            </AccordionTrigger>
            <AccordionContent className="text-white/80 text-base md:text-lg pb-5 leading-relaxed">{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default DoughFAQ;
