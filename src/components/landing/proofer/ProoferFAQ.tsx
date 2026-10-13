import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const items = [
  {
    q: 'Зачем нужен расстоечный шкаф?',
    a: 'Перед выпечкой тесто должно подняться. В шкафу автоматически поддерживаются нужные температура и влажность — заготовки расстаиваются быстрее, равномерно и не подсыхают, а качество не зависит от погоды и сквозняков в цехе.',
  },
  {
    q: 'Как выбрать вместимость?',
    a: 'Ориентируйтесь на печь: вместимость шкафа должна покрывать загрузку печи. Под конвекционную печь на 4–10 противней подойдут компактные шкафы ШРТ, PS68M, PS78M. Для ротационной печи — камеры на целые тележки.',
  },
  {
    q: 'Какие температура и влажность нужны для расстойки?',
    a: 'Обычно 30–40 °С и 75–85% влажности. Шкафы в каталоге работают в диапазоне 25–45 °С (некоторые — до 85 °С для подогрева) и 50–95% влажности, поэтому подходят для хлеба, сдобы, круассанов и слоёного теста.',
  },
  {
    q: 'Можно ли поставить шкаф под конвекционную печь?',
    a: 'Да. Тепловые шкафы ШРТ и шкафы PUSHKIN PS68M/PS78M специально сделаны под конвекционные печи и встают под них единой колонной, экономя место на кухне.',
  },
  {
    q: 'Пройдёт ли большой шкаф в дверной проём?',
    a: 'Крупные шкафы ИРТЫШ, ЭлСи РОСА и Proofer поставляются в разобранном виде, собираются из модулей прямо в цехе.',
  },
  {
    q: 'Есть ли гарантия и сервис?',
    a: 'Да. Оборудование поставляется с официальной гарантией поставщика, а покупатели получают приоритетное обслуживание в нашем собственном сервисном центре.',
  },
];

const ProoferFAQ = () => (
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

export default ProoferFAQ;
