import { useCallback, useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';
import { sendLead } from '@/lib/sendLead';
import ConsentCheckbox from './ConsentCheckbox';

type Arrival = {
  id: string;
  name: string;
  short: string;
  tag: string;
  image: string;
  description: string;
  specs: { icon: string; label: string; value: string }[];
  highlights: string[];
};

const proxify = (url: string) => `${func2url['image-proxy']}?url=${encodeURIComponent(url)}`;

const ARRIVALS: Arrival[] = [
  {
    id: '9029',
    name: 'Печь ротационно-конвекционная электрическая HM-710ER (10 ур.)',
    short: 'HOMAT HM-710ER',
    tag: 'Ротационная печь',
    image: proxify('https://t-sib.ru/upload/iblock/5e6/pdt7plv5cys4ac3r6ms1yd909idlsbak.jpg'),
    description:
      'Компактная ротационная печь на 10 противней: вращающийся стеллаж, конвекция и пароувлажнение дают равномерную выпечку хлеба, багетов и кондитерки на всех уровнях. Помещается даже в небольшой цех.',
    specs: [
      { icon: 'Layers', label: 'Уровней', value: '10' },
      { icon: 'LayoutGrid', label: 'Противень', value: '400×600 мм' },
      { icon: 'Zap', label: 'Мощность', value: '18 кВт / 380 В' },
      { icon: 'Box', label: 'Габариты', value: '900×1265×1770 мм' },
    ],
    highlights: [
      '60 программ до 5 этапов каждая',
      'Встроенная стеллажная тележка',
      'Автооткрытие дверцы после цикла',
    ],
  },
  {
    id: '9030',
    name: 'Печь подовая MW32',
    short: 'HOMAT MW-32',
    tag: 'Подовая печь',
    image: proxify('https://t-sib.ru/upload/iblock/ab4/z1802xwz5jul1x3vmrdqiazs71jlq3ve.jpg'),
    description:
      'Три независимых яруса по два противня: в каждом свои температура, время и пар. Можно одновременно печь хлеб, сдобу и кондитерку по разным рецептам без потери качества.',
    specs: [
      { icon: 'Layers', label: 'Ярусов / противней', value: '3 / 6' },
      { icon: 'LayoutGrid', label: 'Противень', value: '400×600 мм' },
      { icon: 'Zap', label: 'Мощность', value: '19 кВт / 380 В' },
      { icon: 'Box', label: 'Габариты', value: '1110×1245×1770 мм' },
    ],
    highlights: [
      'Раздельный верхний и нижний нагрев',
      'Парогенератор в каждом ярусе',
      '60 программ выпечки, подсветка камер',
    ],
  },
  {
    id: '9048',
    name: 'Печь подовая электрическая TSZEO-2C+P (с расстоечным шкафом)',
    short: 'ТЕХНОСИБ TSZEO-2C+P',
    tag: 'Печь + расстойка',
    image: proxify('https://t-sib.ru/upload/iblock/15f/7brc4bqfm1mrwekiu3co0ezmg45qbiky.jpg'),
    description:
      'Готовый мини-цех в одном корпусе: конвекционная печь с пароувлажнением и расстоечный шкаф снизу. Идеально для пекарен у дома, кафе и кофеен — багеты, круассаны и хлеб с хрустящей корочкой.',
    specs: [
      { icon: 'Layers', label: 'Уровней / противней', value: '2 / 4' },
      { icon: 'Thermometer', label: 'Управление', value: 'Цифровое' },
      { icon: 'Zap', label: 'Мощность', value: '11,1 кВт / 380 В' },
      { icon: 'Box', label: 'Габариты', value: '1190×1200×2015 мм' },
    ],
    highlights: [
      'Расстоечный шкаф в комплекте',
      'Пароувлажнение для корочки',
      'Корпус из нержавеющей стали',
    ],
  },
];

const AUTOPLAY_MS = 7000;

const ArrivalForm = ({ item }: { item: Arrival }) => {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErr('');
    try {
      await sendLead({
        name: form.name,
        phone: form.phone,
        source: 'new-arrivals',
        payload: { productId: item.id, productName: item.name },
      });
      setSent(true);
    } catch {
      setErr('Не удалось отправить. Попробуйте ещё раз или позвоните нам.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl p-6 text-center bg-white/10 border border-white/20">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-3 flex items-center justify-center">
          <Icon name="Check" size={26} style={{ color: '#fff' }} />
        </div>
        <div className="font-oswald text-xl font-bold mb-1" style={{ color: '#fff' }}>
          Заявка принята!
        </div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Пришлём цену и условия поставки {item.short} в ближайшее время.
        </p>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-xl px-4 py-3 outline-none border-2 border-white/15 focus:border-ember bg-white/10 transition placeholder:text-white/40';

  return (
    <form onSubmit={submit} className="rounded-2xl p-5 bg-white/[0.07] border border-white/15 space-y-3">
      <div className="font-oswald text-lg font-bold uppercase" style={{ color: '#fff' }}>
        Узнать цену и сроки поставки
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Ваше имя"
          className={inputCls}
          style={{ color: '#fff' }}
        />
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+7 (___) ___-__-__"
          className={inputCls}
          style={{ color: '#fff' }}
        />
      </div>
      {err && <div className="text-sm text-red-300">{err}</div>}
      <ConsentCheckbox checked={agree} onChange={setAgree} tone="light" />
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fire to-ember font-semibold hover:shadow-lg hover:shadow-fire/50 transition flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ color: '#fff' }}
      >
        {submitting ? 'Отправляем...' : 'Получить предложение'}
        <Icon name="Send" size={16} />
      </button>
    </form>
  );
};

const NewArrivals = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = ARRIVALS.length;

  const go = useCallback((i: number) => setIndex((i + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      id="new-arrivals"
      className="relative py-20 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1c130d 0%, #2a170b 55%, #3a1c08 100%)' }}
    >
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-fire/30 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[520px] h-[520px] rounded-full bg-ember/20 blur-[150px] pointer-events-none" />

      <div className="container relative">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-fire to-ember text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#fff' }}>
            <Icon name="Sparkles" size={14} style={{ color: '#fff' }} /> Новые поступления
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase" style={{ color: '#fff' }}>
            Уникальное <span className="text-fire-gradient">оборудование</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Новинки, которые только поступили на склад. Количество ограничено — успейте забронировать.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40 bg-white/[0.04] backdrop-blur">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {ARRIVALS.map((item, i) => (
                <article
                  key={item.id}
                  className="w-full shrink-0 grid lg:grid-cols-2 gap-8 p-6 md:p-10"
                  aria-hidden={i !== index}
                >
                  <div className="relative rounded-2xl bg-white overflow-hidden flex items-center justify-center min-h-[300px] lg:min-h-[520px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="max-h-[480px] w-full object-contain p-6"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-fire to-ember text-xs font-bold uppercase animate-pulse-glow" style={{ color: '#fff' }}>
                      Новинка
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 text-xs font-semibold" style={{ color: '#fff' }}>
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wider text-ember mb-2">{item.short}</div>
                      <h3 className="font-oswald text-2xl md:text-3xl font-bold leading-tight" style={{ color: '#fff' }}>
                        {item.name}
                      </h3>
                      <p className="mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        {item.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {item.specs.map((s) => (
                        <div key={s.label} className="rounded-xl p-3 bg-white/[0.06] border border-white/10 flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center shrink-0">
                            <Icon name={s.icon} size={18} style={{ color: '#fff' }} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
                              {s.label}
                            </div>
                            <div className="font-semibold text-sm" style={{ color: '#fff' }}>{s.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                          <Icon name="CircleCheck" size={16} className="text-ember shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`#product-${item.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember hover:underline w-fit"
                    >
                      Все характеристики <Icon name="ArrowRight" size={14} />
                    </a>

                    <ArrivalForm item={item} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Предыдущая"
            onClick={() => go(index - 1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-fire to-fire-dark items-center justify-center shadow-lg shadow-fire/40 hover:scale-110 transition"
          >
            <Icon name="ChevronLeft" size={24} style={{ color: '#fff' }} />
          </button>
          <button
            type="button"
            aria-label="Следующая"
            onClick={() => go(index + 1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-fire to-fire-dark items-center justify-center shadow-lg shadow-fire/40 hover:scale-110 transition"
          >
            <Icon name="ChevronRight" size={24} style={{ color: '#fff' }} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          {ARRIVALS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                i === index
                  ? 'bg-gradient-to-r from-fire to-ember border-transparent shadow-lg shadow-fire/30'
                  : 'border-white/20 hover:border-ember'
              }`}
              style={{ color: i === index ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              {item.short}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
