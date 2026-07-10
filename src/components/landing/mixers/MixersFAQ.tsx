import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const items = [
  {
    q: 'Чем планетарный миксер отличается от спирального тестомеса?',
    a: 'Планетарный универсален — кремы, взбитые массы и тесто. Спиральный тестомес заточен под большие объёмы теста.',
  },
  {
    q: 'Можно ли месить дрожжевое тесто?',
    a: 'Да, крюком или спиралью. Но для регулярного тяжёлого замеса выбирайте модели с запасом мощности.',
  },
  {
    q: 'Какие насадки входят в комплект?',
    a: 'Как правило — венчик, лопатка и крюк (спираль).',
  },
  {
    q: '220 или 380 В?',
    a: 'Настольные и малые модели — 220 В. Производственные от 40–60 л — чаще 380 В.',
  },
  {
    q: 'Есть ли гарантия и сервис?',
    a: 'Да, официальная гарантия и сервисное обслуживание.',
  },
];

const MixersFAQ = () => {
  return (
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

export default MixersFAQ;
