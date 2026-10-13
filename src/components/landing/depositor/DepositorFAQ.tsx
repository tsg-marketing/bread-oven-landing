import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const items = [
  {
    q: 'Чем отсадочная машина отличается от депозитора?',
    a: 'Отсадочная машина формует изделия из теста — печенье, пряники, зефир — через насадки и часто режет их струной. Депозитор дозирует жидкие и кремообразные массы: бисквитное и заварное тесто, кремы, джемы, начинки.',
  },
  {
    q: 'Какое тесто можно отсаживать?',
    a: 'Песочное, сдобное, овсяное, пряничное, бисквитное и заварное тесто, а также безе, суфле, кремы, джемы и начинки. Для густого теста подходят машины с валковым дозированием, для жидких масс — поршневые модели и депозиторы.',
  },
  {
    q: 'Можно ли делать изделия из двух видов теста?',
    a: 'Да. Двухбункерные машины ОМД-2, Сура-ПД600, Droplet 400 UNIVERSAL и TSZCD-400DQ выпускают двухцветное печенье, пряники «зебра» и изделия с начинкой.',
  },
  {
    q: 'Как выбрать производительность?',
    a: 'Для кондитерской и небольшой пекарни достаточно машины до 25 циклов в минуту. Для цеха — модели на 30–40 циклов или до 200 кг/ч. Для серийного выпуска на фабрике — поршневые и конвейерные машины от 90 циклов в минуту.',
  },
  {
    q: 'Нужно ли электричество для депозитора?',
    a: 'Пневматические депозиторы Danler NFS-1000 работают на сжатом воздухе и не требуют электрического подключения — нужен только компрессор.',
  },
  {
    q: 'Есть ли гарантия и сервис?',
    a: 'Да. Оборудование поставляется с официальной гарантией поставщика, а покупатели получают приоритетное обслуживание в нашем собственном сервисном центре.',
  },
];

const DepositorFAQ = () => (
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

export default DepositorFAQ;
