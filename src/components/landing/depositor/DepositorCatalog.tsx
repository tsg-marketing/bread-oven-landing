import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../../backend/func2url.json';
import { withCleanParams } from '@/lib/cleanParams';
import MixerModal from '../mixers/MixerModal';
import DepositorCard from './DepositorCard';
import { DepositorProduct, PERF_LABELS, PERF_ORDER, SERIES, brandOf, seriesOf } from './depositorUtils';

const priceNum = (p: DepositorProduct) => {
  const n = Number(p.price);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const Tab = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition whitespace-nowrap ${
      active
        ? 'bg-gradient-to-r from-fire to-fire-dark border-transparent text-white shadow-lg shadow-fire/30'
        : 'bg-coal-mid border-coal-light text-white/80 hover:border-fire/60'
    }`}
  >
    {children}
  </button>
);

const FilterRow = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">{title}</div>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const count = <T,>(list: T[], key: (x: T) => string) => {
  const m = new Map<string, number>();
  list.forEach((x) => {
    const k = key(x);
    if (k) m.set(k, (m.get(k) || 0) + 1);
  });
  return m;
};

type Props = {
  onLead: (source: string, payload?: Record<string, unknown>) => void;
  perf: string;
  setPerf: (c: string) => void;
};

const DepositorCatalog = ({ onLead, perf, setPerf }: Props) => {
  const [list, setList] = useState<DepositorProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [brand, setBrand] = useState('');
  const [series, setSeries] = useState('');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<DepositorProduct | null>(null);

  useEffect(() => {
    fetch(func2url['depositor-catalog'])
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

  const byQuery = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? list.filter((p) => p.name.toLowerCase().includes(q)) : list;
  }, [list, query]);

  const brands = useMemo(
    () => Array.from(count(list, brandOf).entries()).sort((a, b) => b[1] - a[1]),
    [list]
  );
  const seriesCounts = useMemo(() => count(list, seriesOf), [list]);
  const perfCounts = useMemo(() => count(list, (p) => p.performanceGroup || ''), [list]);

  const filtered = useMemo(() => {
    const res = byQuery.filter(
      (p) =>
        (!brand || brandOf(p) === brand) &&
        (!series || seriesOf(p) === series) &&
        (!perf || p.performanceGroup === perf)
    );
    return [...res].sort((a, b) => {
      const pa = priceNum(a);
      const pb = priceNum(b);
      if (pa && pb) return pa - pb;
      if (pa) return -1;
      if (pb) return 1;
      return 0;
    });
  }, [byQuery, brand, series, perf]);

  const hasFilters = !!(brand || series || perf || query);
  const reset = () => {
    setBrand('');
    setSeries('');
    setPerf('');
    setQuery('');
  };

  return (
    <section id="assortment" className="relative py-24 bg-coal overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[140px]" />
      <div className="container relative">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          Каталог <span className="text-fire-gradient">отсадочных машин</span>
        </h2>
        <p className="text-white/70 text-lg mb-8">
          {!loading && !error ? `${filtered.length} из ${list.length} моделей` : 'Загружаем актуальный ассортимент'} — от
          пневматических депозиторов для кремов и начинок до автоматов для печенья с двумя бункерами.
        </p>

        {!loading && !error && (
          <div className="space-y-4 mb-8">
            <div className="relative max-w-md">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию, например Droplet или ОМД"
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
              <FilterRow title="Бренд">
                <Tab active={!brand} onClick={() => setBrand('')}>
                  Все бренды
                </Tab>
                {brands.map(([b, n]) => (
                  <Tab key={b} active={brand === b} onClick={() => setBrand(b)}>
                    {b} <span className="opacity-70">({n})</span>
                  </Tab>
                ))}
              </FilterRow>
            )}

            <FilterRow title="Модель">
              <Tab active={!series} onClick={() => setSeries('')}>
                Все модели
              </Tab>
              {SERIES.filter((s) => seriesCounts.has(s.id)).map((s) => (
                <Tab key={s.id} active={series === s.id} onClick={() => setSeries(s.id)}>
                  {s.label} <span className="opacity-70">({seriesCounts.get(s.id)})</span>
                </Tab>
              ))}
            </FilterRow>

            {perfCounts.size > 1 && (
              <FilterRow title="Производительность">
                <Tab active={!perf} onClick={() => setPerf('')}>
                  Любая
                </Tab>
                {PERF_ORDER.filter((g) => perfCounts.has(g)).map((g) => (
                  <Tab key={g} active={perf === g} onClick={() => setPerf(g)}>
                    {PERF_LABELS[g]} <span className="opacity-70">({perfCounts.get(g)})</span>
                  </Tab>
                ))}
              </FilterRow>
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
                {hasFilters && (
                  <div className="mt-4">
                    <button
                      onClick={reset}
                      className="px-5 py-2.5 rounded-xl border-2 border-coal-light text-white hover:border-fire transition"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {filtered.map((p) => (
                  <DepositorCard
                    key={p.id}
                    p={p}
                    onOpen={() => setModal(p)}
                    onLead={() => onLead('depositor-catalog', { productId: p.id, productName: p.name })}
                  />
                ))}
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
            onLead('depositor-catalog-modal', { productId: p.id, productName: p.name });
          }}
        />
      )}
    </section>
  );
};

export default DepositorCatalog;
