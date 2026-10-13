import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../../backend/func2url.json';
import { withCleanParams } from '@/lib/cleanParams';
import MixerModal from '../mixers/MixerModal';
import ProoferCard from './ProoferCard';
import { CAPACITY_LABELS, CAPACITY_ORDER, ProoferProduct, brandOf } from './prooferUtils';

const priceNum = (p: ProoferProduct) => {
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
  capacity: string;
  setCapacity: (c: string) => void;
};

const ProoferCatalog = ({ onLead, capacity, setCapacity }: Props) => {
  const [list, setList] = useState<ProoferProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [brand, setBrand] = useState('');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(8);
  const [modal, setModal] = useState<ProoferProduct | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(func2url['proofer-catalog'])
      .then((r) => r.json())
      .then((data) => {
        setList(withCleanParams(data.items || []));
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить каталог');
        setLoading(false);
      });
  }, []);

  const byCat = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((p) => !q || p.name.toLowerCase().includes(q));
  }, [list, query]);

  const brands = useMemo(() => {
    const m = new Map<string, number>();
    byCat.forEach((p) => {
      const b = brandOf(p);
      if (b) m.set(b, (m.get(b) || 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [byCat]);

  const byBrand = useMemo(() => (brand ? byCat.filter((p) => brandOf(p) === brand) : byCat), [byCat, brand]);

  const capacities = useMemo(() => {
    const m = new Map<string, number>();
    byBrand.forEach((p) => {
      if (p.capacityGroup) m.set(p.capacityGroup, (m.get(p.capacityGroup) || 0) + 1);
    });
    return CAPACITY_ORDER.filter((c) => m.has(c)).map((c) => [c, m.get(c) || 0] as [string, number]);
  }, [byBrand]);

  const byCapacity = useMemo(
    () => (capacity ? byBrand.filter((p) => p.capacityGroup === capacity) : byBrand),
    [byBrand, capacity]
  );

  const filtered = useMemo(() => {
    const res = byCapacity;
    return [...res].sort((a, b) => {
      const pa = priceNum(a);
      const pb = priceNum(b);
      if (pa && pb) return pa - pb;
      if (pa) return -1;
      if (pb) return 1;
      return 0;
    });
  }, [byCapacity]);

  useEffect(() => setVisible(8), [brand, capacity, query]);
  useEffect(() => {
    if (brand && !brands.some(([b]) => b === brand)) setBrand('');
  }, [brands, brand]);
  useEffect(() => {
    if (capacity && !capacities.some(([c]) => c === capacity)) setCapacity('');
  }, [capacities, capacity, setCapacity]);

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
          Каталог <span className="text-fire-gradient">расстоечных шкафов</span>
        </h2>
        <p className="text-white/70 text-lg mb-8">
          {!loading && !error ? `${filtered.length} из ${list.length} моделей` : 'Загружаем актуальный ассортимент'} — от компактных
          шкафов под конвекционную печь до камер на несколько тележек для хлебозаводов.
        </p>

        {!loading && !error && (
          <div className="space-y-4 mb-8">
            <div className="relative max-w-md">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию, например ШРТ или ИРТЫШ"
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
            {capacities.length > 1 && (
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Вместимость</div>
                <div className="flex flex-wrap gap-2">
                  <Tab small active={!capacity} onClick={() => setCapacity('')}>
                    Любая
                  </Tab>
                  {capacities.map(([c, n]) => (
                    <Tab small key={c} active={capacity === c} onClick={() => setCapacity(c)}>
                      {CAPACITY_LABELS[c]} <span className="opacity-70">({n})</span>
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
                {(capacity || brand) && (
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setCapacity('');
                        setBrand('');
                      }}
                      className="px-5 py-2.5 rounded-xl border-2 border-coal-light text-white hover:border-fire transition"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {shown.map((p) => (
                  <ProoferCard
                    key={p.id}
                    p={p}
                    onOpen={() => setModal(p)}
                    onLead={() => onLead('proofer-catalog', { productId: p.id, productName: p.name })}
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
          onClose={() => setModal(null)}
          onLead={(p) => {
            setModal(null);
            onLead('proofer-catalog-modal', { productId: p.id, productName: p.name });
          }}
        />
      )}
    </section>
  );
};

export default ProoferCatalog;
