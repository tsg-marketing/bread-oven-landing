import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../../backend/func2url.json';
import { withCleanParams } from '@/lib/cleanParams';
import { clearProductHash, useProductHash } from '@/hooks/use-product-hash';
import MixerModal from '../mixers/MixerModal';
import DoughCard from './DoughCard';
import { DoughProduct, VOLUME_RANGES, brandOf, categoryLabel, volumeRangeOf } from './doughUtils';

type Cat = { id: string; name: string; count: number };

const priceNum = (p: DoughProduct) => {
  const n = Number(p.price);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const Tab = ({
  active,
  onClick,
  children,
  small = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`${small ? 'px-3 py-1.5 rounded-lg text-sm' : 'px-4 py-2.5 rounded-xl text-sm md:text-base'} font-semibold border-2 transition whitespace-nowrap ${
      active
        ? 'bg-gradient-to-r from-fire to-fire-dark border-transparent text-white shadow-lg shadow-fire/30'
        : 'bg-coal-mid border-coal-light text-white/80 hover:border-fire/60'
    }`}
  >
    {children}
  </button>
);

type Props = {
  onLead: (source: string, payload?: Record<string, unknown>) => void;
  cat: string;
  setCat: (c: string) => void;
};

const DoughCatalog = ({ onLead, cat, setCat }: Props) => {
  const [list, setList] = useState<DoughProduct[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [brand, setBrand] = useState('');
  const [query, setQuery] = useState('');
  const [vol, setVol] = useState('v2');
  const [visible, setVisible] = useState(8);
  const [modal, setModal] = useState<DoughProduct | null>(null);
  useProductHash(list, setModal);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(func2url['dough-catalog'])
      .then((r) => r.json())
      .then((data) => {
        setList(withCleanParams(data.items || []));
        setCats(data.categories || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить каталог');
        setLoading(false);
      });
  }, []);

  const byCat = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((p) => (!cat || p.categoryId === cat) && (!q || p.name.toLowerCase().includes(q)));
  }, [list, cat, query]);

  const brands = useMemo(() => {
    const m = new Map<string, number>();
    byCat.forEach((p) => {
      const b = brandOf(p);
      if (b) m.set(b, (m.get(b) || 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [byCat]);

  const byBrand = useMemo(() => (brand ? byCat.filter((p) => brandOf(p) === brand) : byCat), [byCat, brand]);

  const volumes = useMemo(() => {
    const m = new Map<string, number>();
    byBrand.forEach((p) => {
      const r = volumeRangeOf(p);
      m.set(r, (m.get(r) || 0) + 1);
    });
    const res = VOLUME_RANGES.filter((r) => m.get(r.id)).map((r) => ({ id: r.id, label: r.label, count: m.get(r.id) || 0 }));
    if (m.get('none')) res.push({ id: 'none', label: 'Не указан', count: m.get('none') || 0 });
    return res;
  }, [byBrand]);

  const filtered = useMemo(() => {
    const res = vol ? byBrand.filter((p) => volumeRangeOf(p) === vol) : byBrand;
    return [...res].sort((a, b) => {
      const pa = priceNum(a);
      const pb = priceNum(b);
      if (pa && pb) return pa - pb;
      if (pa) return -1;
      if (pb) return 1;
      return 0;
    });
  }, [byBrand, vol]);

  useEffect(() => setVisible(8), [cat, brand, query, vol]);
  useEffect(() => {
    if (loading) return;
    if (vol && !volumes.some((v) => v.id === vol)) setVol('');
  }, [volumes, vol, loading]);
  useEffect(() => {
    if (brand && !brands.some(([b]) => b === brand)) setBrand('');
  }, [brands, brand]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasMore) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => v + 8);
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, visible]);

  return (
    <section id="assortment" className="relative py-24 bg-coal overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[140px]" />
      <div className="container relative">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          Каталог <span className="text-fire-gradient">тестомесов</span>
        </h2>
        <p className="text-white/70 text-lg mb-8">
          {!loading && !error ? `${filtered.length} из ${list.length} моделей` : 'Загружаем актуальный ассортимент'} — от компактных
          для пиццерий до промышленных вакуумных машин.
        </p>

        {!loading && !error && (
          <div className="space-y-4 mb-8">
            <div className="relative max-w-md">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию, например IRIS или ZHM"
                className="w-full bg-white border-2 border-coal-light focus:border-fire rounded-xl pl-11 pr-10 py-3 outline-none transition"
                style={{ color: 'hsl(var(--ink))' }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Очистить"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-fire"
                >
                  <Icon name="X" size={18} />
                </button>
              )}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Тип</div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {cats.map((c) => (
                  <Tab key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
                    {categoryLabel(c.id, c.name)} <span className="opacity-70">({c.count})</span>
                  </Tab>
                ))}
                <Tab active={!cat} onClick={() => setCat('')}>
                  Все <span className="opacity-70">({list.length})</span>
                </Tab>
              </div>
            </div>
            {brands.length > 1 && (
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Бренд</div>
                <div className="flex flex-wrap gap-2">
                  <Tab small active={!brand} onClick={() => setBrand('')}>
                    Все бренды
                  </Tab>
                  {brands.map(([b, n]) => (
                    <Tab small key={b} active={brand === b} onClick={() => setBrand(b)}>
                      {b} <span className="opacity-70">({n})</span>
                    </Tab>
                  ))}
                </div>
              </div>
            )}
            {volumes.length > 1 && (
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Объём дежи</div>
                <div className="flex flex-wrap gap-2">
                  <Tab small active={!vol} onClick={() => setVol('')}>
                    Любой объём
                  </Tab>
                  {volumes.map((v) => (
                    <Tab small key={v.id} active={vol === v.id} onClick={() => setVol(v.id)}>
                      {v.label} <span className="opacity-70">({v.count})</span>
                    </Tab>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-coal-mid rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        )}

        {error && <div className="text-fire">{error}</div>}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center text-white/50 py-20">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 text-fire/50" />
                Ничего не найдено
                {cat && query && (
                  <div className="mt-4">
                    <button
                      onClick={() => setCat('')}
                      className="px-5 py-2.5 rounded-xl border-2 border-coal-light text-white hover:border-fire transition"
                    >
                      Искать во всех типах
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {shown.map((p) => (
                  <DoughCard
                    key={p.id}
                    p={p}
                    onOpen={() => setModal(p)}
                    onLead={() => onLead('dough-catalog', { productId: p.id, productName: p.name })}
                  />
                ))}
              </div>
            )}
            {hasMore && (
              <div ref={sentinel} className="flex justify-center items-center gap-2 mt-8 py-4 text-white/50 text-sm">
                <Icon name="Loader2" size={18} className="animate-spin text-fire" />
                Загружаем ещё модели…
              </div>
            )}
          </>
        )}
      </div>

      {modal && (
        <MixerModal
          product={modal}
          onClose={() => {
            setModal(null);
            clearProductHash();
          }}
          onLead={(p) => {
            setModal(null);
            clearProductHash();
            onLead('dough-catalog-modal', { productId: p.id, productName: p.name });
          }}
        />
      )}
    </section>
  );
};

export default DoughCatalog;
