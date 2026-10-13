import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const items = [
  {
    q: 'Чем напольная тестораскатка отличается от настольной?',
    a: 'Напольная стоит на собственной станине и чаще всего имеет широкие складные транспортёры — подходит для пекарен и цехов. Настольная компактнее, ставится на стол и рассчитана на кафе, рестораны и небольшие пекарни.',
  },
  {
    q: 'Какое тесто можно раскатывать?',
    a: 'Реверсивные машины работают со слоёным, дрожжевым и песочным тестом. Для пельменей, вареников, чебуреков и самсы лучше брать модели для крутого теста с усиленными валками. Для лапши — тестораскатки-лапшерезки.',
  },
  {
    q: 'Какая длина и ширина ленты нужны?',
    a: 'Ширина ленты определяет максимальную ширину пласта (обычно 450–650 мм), длина столов — размер заготовки. Для кафе хватит 450–500 мм, для пекарни и кондитерской лучше 500–650 мм с длиной столов от 1000 мм.',
  },
  {
    q: 'Зачем нужна автоматическая тестораскатка?',
    a: 'Автоматическая машина сама меняет направление лент и уменьшает зазор по заданной программе. Оператору остаётся только положить тесто — это экономит время и даёт одинаковый результат в каждой партии.',
  },
  {
    q: 'Что даёт регулировка скорости лент?',
    a: 'Модели с вариатором позволяют независимо менять скорость на входе и выходе. Это помогает аккуратно раскатывать тонкие и нежные пласты без разрывов.',
  },
  {
    q: 'Есть ли гарантия и сервис?',
    a: 'Да. Оборудование поставляется с официальной гарантией производителя, а покупатели получают приоритетное обслуживание в нашем собственном сервисном центре.',
  },
];

const RollingFAQ = () => (
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

export default RollingFAQ;
