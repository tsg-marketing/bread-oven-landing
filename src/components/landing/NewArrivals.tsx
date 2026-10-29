import { useEffect, useState } from 'react';
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
};

const proxify = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, '') === 't-sib.ru') {
      return `${func2url['image-proxy']}?url=${encodeURIComponent(u.toString())}`;
    }
  } catch {
    /* noop */
  }
  return url;
};

const ARRIVALS: Arrival[] = [
  {
    id: '9029',
    name: 'Печь ротационно-конвекционная электрическая HM-710ER (10 ур.)',
    short: 'HOMAT HM-710ER',
    tag: 'Ротационная',
    image: 'https://t-sib.ru/upload/iblock/5e6/pdt7plv5cys4ac3r6ms1yd909idlsbak.jpg',
    description:
      'Компактная ротационная печь на 10 противней: вращающийся стеллаж, конвекция и пар — равномерная выпечка на всех уровнях.',
    specs: [
      { icon: 'Layers', label: 'Уровней', value: '10' },
      { icon: 'LayoutGrid', label: 'Противень', value: '400×600 мм' },
      { icon: 'Zap', label: 'Мощность', value: '18 кВт / 380 В' },
      { icon: 'Settings', label: 'Программ', value: '60' },
    ],
  },
  {
    id: '9030',
    name: 'Печь подовая MW32',
    short: 'HOMAT MW-32',
    tag: 'Подовая',
    image: 'https://t-sib.ru/upload/iblock/ab4/z1802xwz5jul1x3vmrdqiazs71jlq3ve.jpg',
    description:
      'Три независимых яруса: в каждом свои температура, время и пар. Хлеб, сдоба и кондитерка одновременно по разным рецептам.',
    specs: [
      { icon: 'Layers', label: 'Ярусов / противней', value: '3 / 6' },
      { icon: 'LayoutGrid', label: 'Противень', value: '400×600 мм' },
      { icon: 'Zap', label: 'Мощность', value: '19 кВт / 380 В' },
      { icon: 'Droplets', label: 'Пар', value: 'В каждом ярусе' },
    ],
  },
  {
    id: '9048',
    name: 'Печь подовая электрическая TSZEO-2C+P (с расстоечным шкафом)',
    short: 'ТЕХНОСИБ TSZEO-2C+P',
    tag: 'Печь + расстойка',
    image: 'https://t-sib.ru/upload/iblock/15f/7brc4bqfm1mrwekiu3co0ezmg45qbiky.jpg',
    description:
      'Мини-цех в одном корпусе: конвекционная печь с пароувлажнением и расстоечный шкаф снизу. Для пекарен у дома и кофеен.',
    specs: [
      { icon: 'Layers', label: 'Уровней / противней', value: '2 / 4' },
      { icon: 'Thermometer', label: 'Управление', value: 'Цифровое' },
      { icon: 'Zap', label: 'Мощность', value: '11,1 кВт / 380 В' },
      { icon: 'Box', label: 'Расстойка', value: 'В комплекте' },
    ],
  },
];

const PhotoSlider = ({ pictures, alt, tag }: { pictures: string[]; alt: string; tag: string }) => {
  const [i, setI] = useState(0);
  const total = pictures.length;
  const many = total > 1;

  useEffect(() => {
    if (!many) return;
    const t = setTimeout(() => setI((v) => (v + 1) % total), 4000);
    return () => clearTimeout(t);
  }, [i, many, total]);

  return (
    <div className="relative h-52 xl:h-56 bg-white overflow-hidden group">
      <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {pictures.map((src, k) => (
          <img key={src + k} src={proxify(src)} alt={alt} loading="lazy" className="w-full h-full shrink-0 object-contain p-3" />
        ))}
      </div>
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-fire to-ember text-[11px] font-bold uppercase animate-pulse-glow" style={{ color: '#fff' }}>
        Новинка
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-coal-mid border border-coal-light text-[11px] font-semibold">
        {tag}
      </span>
      {many && (
        <>
          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={() => setI((i - 1 + total) % total)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-fire hover:text-white transition"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button
            type="button"
            aria-label="Следующее фото"
            onClick={() => setI((i + 1) % total)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-fire hover:text-white transition"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {pictures.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Фото ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? 'w-5 bg-fire' : 'w-1.5 bg-black/20'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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
      <div className="rounded-xl p-4 text-center bg-fire/10 border border-fire/30">
        <div className="flex items-center justify-center gap-2 font-oswald text-lg font-bold">
          <Icon name="CircleCheck" size={20} className="text-fire" /> Заявка принята!
        </div>
        <p className="text-xs mt-1" style={{ color: 'hsl(var(--ink) / 0.65)' }}>
          Пришлём цену и условия поставки {item.short} в ближайшее время.
        </p>
      </div>
    );
  }

  const inputCls =
    'w-full min-w-0 rounded-lg px-3 py-2.5 text-sm outline-none border-2 border-coal-light focus:border-fire bg-white transition placeholder:text-black/35';

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Имя"
          className={inputCls}
          style={{ color: 'hsl(var(--ink))' }}
        />
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Телефон"
          className={inputCls}
          style={{ color: 'hsl(var(--ink))' }}
        />
      </div>
      {err && <div className="text-xs text-red-500">{err}</div>}
      <ConsentCheckbox checked={agree} onChange={setAgree} className="text-[11px] leading-snug" />
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-sm font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ color: '#fff' }}
      >
        {submitting ? 'Отправляем...' : 'Узнать цену и сроки'}
        <Icon name="Send" size={15} style={{ color: '#fff' }} />
      </button>
    </form>
  );
};

const NewArrivals = () => {
  const [pics, setPics] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch(func2url['catalog'])
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string[]> = {};
        (data.items || []).forEach((it: { id: string; pictures?: string[] }) => {
          if (ARRIVALS.some((a) => a.id === String(it.id)) && it.pictures?.length) {
            map[String(it.id)] = Array.from(new Set(it.pictures));
          }
        });
        setPics(map);
      })
      .catch(() => undefined);
  }, []);

  return (
    <section id="new-arrivals" className="relative py-14 md:py-16 bg-coal-mid overflow-hidden">
      <div className="absolute -top-24 left-1/4 w-[480px] h-[480px] rounded-full bg-fire/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[420px] h-[420px] rounded-full bg-ember/25 blur-[140px] pointer-events-none" />

      <div className="container relative">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-fire to-ember text-xs font-bold uppercase tracking-wider mb-3 shadow-lg shadow-fire/30" style={{ color: '#fff' }}>
              <Icon name="Sparkles" size={14} style={{ color: '#fff' }} /> Новые поступления
            </span>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase">
              Уникальное <span className="text-fire-gradient">оборудование</span>
            </h2>
          </div>
          <p className="max-w-md text-sm" style={{ color: 'hsl(var(--ink) / 0.65)' }}>
            Новинки, которые только поступили на склад. Количество ограничено — успейте забронировать.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARRIVALS.map((item) => (
            <article
              key={item.id}
              className="card-hover relative bg-white rounded-2xl overflow-hidden border-2 border-fire/25 hover:border-fire shadow-xl shadow-fire/10 flex flex-col transition"
            >
              <div className="h-1.5 bg-gradient-to-r from-fire via-ember to-fire" />
              <PhotoSlider pictures={pics[item.id] || [item.image]} alt={item.name} tag={item.tag} />

              <div className="p-4 flex flex-col flex-1 gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-fire">{item.short}</div>
                  <h3 className="font-oswald text-lg font-bold leading-tight mt-0.5">{item.name}</h3>
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'hsl(var(--ink) / 0.7)' }}>
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {item.specs.map((s) => (
                    <div key={s.label} className="rounded-lg px-2.5 py-2 bg-coal-mid flex items-center gap-2">
                      <Icon name={s.icon} size={16} className="text-fire shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wide leading-none" style={{ color: 'hsl(var(--ink) / 0.5)' }}>
                          {s.label}
                        </div>
                        <div className="text-xs font-semibold truncate mt-0.5">{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={`#product-${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-fire hover:underline w-fit"
                >
                  Все характеристики <Icon name="ArrowRight" size={13} />
                </a>

                <div className="mt-auto">
                  <ArrivalForm item={item} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
