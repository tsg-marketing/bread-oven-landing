import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const SITE = 'https://pekarnoe.t-sib.ru';
const utm = (path: string, n: number) =>
  `${SITE}${path}${path.includes('?') ? '&' : '?'}utm_source=email&utm_medium=cold&utm_campaign=new_arrivals&utm_content=letter${n}`;

const SIGNATURE = `С уважением,
Сметанина Елена Викторовна
Руководитель отдела продаж хлебопекарного и кондитерского оборудования
8-800-533-88-12
${SITE}/`;

type Letter = {
  n: number;
  when: string;
  subjects: string[];
  preheader: string;
  body: (n: number) => string;
};

const LETTERS: Letter[] = [
  {
    n: 1,
    when: 'День 1',
    subjects: [
      'Новое оборудование для пекарни уже на складе',
      '7 новинок для хлебопекарного цеха — в наличии',
      'Печи, миксеры и тестомесы HOMAT и ТЕХНОСИБ поступили на склад',
    ],
    preheader: 'Ротационная и подовая печи, миксер на 80 л, тестомес на 80 кг теста, расстойка и отсадочная машина.',
    body: (n) => `Здравствуйте!

Меня зовут Елена Сметанина, я руковожу отделом продаж хлебопекарного и кондитерского оборудования компании «Техно-Сиб».

На склад поступила новая партия оборудования HOMAT и ТЕХНОСИБ. Пишу вам, потому что эти модели закрывают основные участки пекарни и кондитерского цеха — от замеса до выпечки:

1. Печь ротационно-конвекционная HOMAT HM-710ER — 10 противней 400×600 мм, 18 кВт / 380 В. Вращающийся стеллаж, конвекция и пароувлажнение, 60 программ до 5 этапов, автооткрытие дверцы.

2. Печь подовая HOMAT MW-32 — 3 яруса, 6 противней 400×600 мм, 19 кВт / 380 В. Независимое управление и свой парогенератор в каждом ярусе: можно печь разные изделия одновременно.

3. Печь подовая ТЕХНОСИБ TSZEO-2C+P с расстоечным шкафом — 4 противня в печи и 12 в расстойке, 19 кВт / 380 В. Мини-цех в одном корпусе: тесто подходит, пока печётся предыдущая партия.

4. Планетарный миксер HOMAT HM-80L — чаша 80 л, 10 скоростей (133–400 об/мин), 3,9 кВт. Инверторное управление, венчик, лопатка и крюк в комплекте.

5. Спиральный тестомес HOMAT HM-80T — до 80 кг теста / 50 кг муки за цикл, 2 скорости, 5,3 кВт. Автоматический и ручной режимы, толчковый режим Jog.

6. Шкаф расстоечный ТЕХНОСИБ TSZP-18S — 18 противней 400×600 мм, 1,25 кВт / 220 В. Автоматически держит температуру и влажность.

7. Отсадочная машина ТЕХНОСИБ TSZCD-400DQ — 2 бункера (40 л + 25 л), до 6000 изделий в час, 1,2 кВт / 220 В. Печенье, капкейки, бисквитные заготовки.

Фото и полные характеристики новинок:
${utm('/#new-arrivals', n)}

Количество каждой модели ограничено. Если какая-то из них вам интересна — ответьте на это письмо, и я пришлю цену, сроки поставки и условия под вашу задачу.

${SIGNATURE}`,
  },
  {
    n: 2,
    when: 'День 4',
    subjects: [
      'Не только новинки: всё для пекарни в одном месте',
      'Подберём оборудование под ваш цех — от замеса до выпечки',
      'Печи, тестомесы, тестораскатки и расстойки — в одном каталоге',
    ],
    preheader: 'Новинки на складе плюс полный ассортимент хлебопекарного и кондитерского оборудования.',
    body: (n) => `Здравствуйте!

На прошлой неделе я писала вам о новом оборудовании HOMAT и ТЕХНОСИБ, которое поступило к нам на склад. Сегодня коротко расскажу, что ещё мы можем предложить, чтобы вы могли собрать оснащение цеха у одного поставщика.

Печи для выпечки — ротационные, конвекционные, подовые и комбинированные, от компактных моделей для кафе до печей для хлебозаводов:
${utm('/', n)}

Планетарные миксеры — для кремов, бисквитов, начинок и мягкого теста, настольные и напольные:
${utm('/mixers', n)}

Тестомесы — спиральные, с подкатной и фиксированной дежой, для любых объёмов замеса:
${utm('/testomesi', n)}

Тестораскаточные машины — для слоёного, дрожжевого и песочного теста, пиццы и пельменного теста:
${utm('/testoraskatka', n)}

Расстоечные шкафы — на противни и под тележки, с автоматическим контролем температуры и влажности:
${utm('/rasstoechnye-shkafy', n)}

Отсадочные машины — для печенья, эклеров, капкейков и бисквитных заготовок:
${utm('/otsadochnye-mashiny', n)}

А из новинок, которые уже на складе, напомню две самые востребованные модели:
— печь ротационно-конвекционная HOMAT HM-710ER на 10 противней, 60 программ выпечки;
— спиральный тестомес HOMAT HM-80T на 80 кг теста за цикл.
Все новинки: ${utm('/#new-arrivals', n)}

Если пришлёте, что вы выпекаете и в каком объёме, мы подберём комплект оборудования и подготовим коммерческое предложение. Можно просто ответить на это письмо или позвонить по номеру 8-800-533-88-12.

${SIGNATURE}`,
  },
  {
    n: 3,
    when: 'День 8',
    subjects: [
      'Забронировать новинку за вами?',
      'Последнее письмо о новинках на складе',
      'Пока модели в наличии — успейте забронировать',
    ],
    preheader: 'Партия ограничена. Пришлю цену и сроки за один ответ.',
    body: (n) => `Здравствуйте!

Это моё последнее письмо о новой партии оборудования, больше не буду отвлекать.

Модели из новой поставки разбирают быстро, а следующая партия будет не скоро. Сейчас в наличии:
— печи HOMAT HM-710ER, HOMAT MW-32 и ТЕХНОСИБ TSZEO-2C+P с расстойкой;
— планетарный миксер HOMAT HM-80L на 80 л;
— спиральный тестомес HOMAT HM-80T на 80 кг теста;
— расстоечный шкаф ТЕХНОСИБ TSZP-18S на 18 противней;
— отсадочная машина ТЕХНОСИБ TSZCD-400DQ с двумя бункерами.

Посмотреть фото и характеристики: ${utm('/#new-arrivals', n)}

Если планируете запуск или обновление цеха, ответьте одним словом — например, «печь» или «тестомес». Я пришлю цену, сроки и условия поставки и при необходимости забронирую оборудование за вами.

Если сейчас это неактуально, просто сохраните ссылку на наш каталог хлебопекарного и кондитерского оборудования, он пригодится в будущем:
${utm('/', n)}

${SIGNATURE}`,
  },
];

const CopyButton = ({ text, label = 'Копировать' }: { text: string; label?: string }) => {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        });
      }}
      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium bg-white hover:bg-fire/5 transition"
      style={{ borderColor: 'hsl(var(--ink) / 0.15)', color: 'hsl(var(--ink))' }}
    >
      <Icon name={done ? 'Check' : 'Copy'} size={15} className={done ? 'text-fire' : ''} />
      {done ? 'Скопировано' : label}
    </button>
  );
};

const MailTemplates = () => {
  useEffect(() => {
    document.title = 'Шаблоны писем — новинки на складе';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-coal-mid py-10" style={{ color: 'hsl(var(--ink))' }}>
      <div className="container max-w-4xl">
        <h1 className="font-oswald text-3xl md:text-4xl font-bold uppercase">Холодная рассылка: новинки на складе</h1>
        <p className="mt-3 text-base" style={{ color: 'hsl(var(--ink) / 0.7)' }}>
          Цепочка из 3 писем. Каждое следующее отправляется только тем, кто не ответил на предыдущее. Ссылки уже размечены
          метками, поэтому переходы из каждого письма будут видны в аналитике отдельно.
        </p>

        <div className="mt-8 space-y-8">
          {LETTERS.map((l) => {
            const body = l.body(l.n);
            return (
              <section key={l.n} className="bg-white rounded-3xl border-2 border-fire/20 p-6 md:p-8 shadow-xl shadow-fire/5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-fire to-ember text-xs font-bold uppercase" style={{ color: '#fff' }}>
                    Письмо {l.n}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: 'hsl(var(--ink) / 0.6)' }}>
                    {l.when}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-xs uppercase tracking-wider font-bold text-fire">Варианты темы</div>
                  <ul className="mt-2 space-y-2">
                    {l.subjects.map((s) => (
                      <li key={s} className="flex items-center justify-between gap-3 rounded-xl bg-coal-mid px-4 py-2.5">
                        <span className="font-semibold">{s}</span>
                        <CopyButton text={s} label="Тема" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <div className="text-xs uppercase tracking-wider font-bold text-fire">Прехедер</div>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-coal-mid px-4 py-2.5">
                    <span>{l.preheader}</span>
                    <CopyButton text={l.preheader} label="Прехедер" />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs uppercase tracking-wider font-bold text-fire">Текст письма</div>
                    <CopyButton text={body} label="Копировать письмо" />
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-[15px] leading-relaxed rounded-xl border p-5" style={{ borderColor: 'hsl(var(--ink) / 0.1)' }}>
                    {body}
                  </pre>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MailTemplates;
