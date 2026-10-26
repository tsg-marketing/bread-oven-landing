import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../../backend/func2url.json';
import { withCleanParams } from '@/lib/cleanParams';
import { clearProductHash, useProductHash } from '@/hooks/use-product-hash';
import MixerModal from './MixerModal';
import MixerCard from './MixerCard';
import {
  MixerProduct,
  brandOf,
  priceNumOf,
  normalizeParams,
  segmentOf,
  brandLabel,
  VOLUME_SEGMENTS,
  DEFAULT_SEGMENT,
} from './mixersCatalogUtils';

export type { MixerProduct } from './mixersCatalogUtils';

const Tab = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-3.5 py-2 rounded-lg text-sm md:text-base font-semibold border-2 transition whitespace-nowrap ${
      active
        ? 'bg-gradient-to-r from-fire to-fire-dark border-transparent text-white shadow-lg shadow-fire/30'
        : 'bg-coal-mid border-coal-light text-white/80 hover:border-fire/60'
    }`}
  >
    {children}
  </button>
);

const MixersCatalog = ({ onLead }: { onLead: (source: string, payload?: Record<string, unknown>) => void }) => {
  const [list, setList] = useState<MixerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(6);
  const [modal, setModal] = useState<MixerProduct | null>(null);
  useProductHash(list, setModal);

  const [seg, setSeg] = useState(DEFAULT_SEGMENT);
  const [brand, setBrand] = useState('');

  useEffect(() => {
    fetch(func2url['mixers-catalog'])
      .then((r) => r.json())
      .then((data) => {
        const items: MixerProduct[] = withCleanParams(data.planetary || []);
        setList(items.map((p) => ({ ...p, params: normalizeParams(p.params) })));
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить каталог');
        setLoading(false);
      });
  }, []);

  const segments = useMemo(() => {
    const m = new Map<string, number>();
    list.forEach((p) => {
      const s = segmentOf(p);
      m.set(s, (m.get(s) || 0) + 1);
    });
    return VOLUME_SEGMENTS.filter((s) => m.get(s.id)).map((s) => ({ ...s, count: m.get(s.id) || 0 }));
  }, [list]);

  const bySeg = useMemo(() => (seg ? list.filter((p) => segmentOf(p) === seg) : list), [list, seg]);

  const brands = useMemo(() => {
    const m = new Map<string, number>();
    bySeg.forEach((p) => {
      const b = brandOf(p);
      if (b) m.set(b, (m.get(b) || 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [bySeg]);

  useEffect(() => {
    if (brand && !brands.some(([b]) => b === brand)) setBrand('');
  }, [brands, brand]);

  const filtered = useMemo(() => {
    const res = brand ? bySeg.filter((p) => brandOf(p) === brand) : bySeg;
    return [...res].sort((a, b) => {
      const pa = priceNumOf(a);
      const pb = priceNumOf(b);
      if (pa !== null && pb !== null) return pa - pb;
      if (pa !== null) return -1;
      if (pb !== null) return 1;
      return 0;
    });
  }, [bySeg, brand]);

  useEffect(() => setVisible(6), [seg, brand]);

  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible]);
  const canMore = visible < filtered.length;
  const hasFilters = !!brand || seg !== DEFAULT_SEGMENT;
  const resetFilters = () => {
    setSeg(DEFAULT_SEGMENT);
    setBrand('');
  };

  return (
    <section id="assortment" className="relative py-24 bg-coal overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[140px]" />
      <div className="container relative">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          Ассортимент <span className="text-fire-gradient">миксеров</span>
        </h2>
        <p className="text-white/70 text-lg mb-8">
          Планетарные миксеры{!loading && !error ? ` — ${filtered.length} из ${list.length} моделей` : ''} в наличии и под заказ.
        </p>

        {!loading && !error && (
          <div className="space-y-5 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Объём дежи</div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {segments.map((s) => (
                  <Tab key={s.id} active={seg === s.id} onClick={() => setSeg(s.id)}>
                    {s.label} <span className="opacity-70">({s.count})</span>
                  </Tab>
                ))}
                <Tab active={!seg} onClick={() => setSeg('')}>
                  Все <span className="opacity-70">({list.length})</span>
                </Tab>
              </div>
            </div>
            {brands.length > 1 && (
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Бренд</div>
                <div className="flex flex-wrap gap-2">
                  <Tab active={!brand} onClick={() => setBrand('')}>
                    Все бренды
                  </Tab>
                  {brands.map(([b, n]) => (
                    <Tab key={b} active={brand === b} onClick={() => setBrand(b)}>
                      {brandLabel(b)} <span className="opacity-70">({n})</span>
                    </Tab>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-coal-mid rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        )}

        {error && <div className="text-fire">{error}</div>}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center text-white/50 py-20">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 text-fire/50" />
                {list.length === 0 ? 'В этой категории пока нет товаров' : 'По выбранным фильтрам ничего не найдено'}
                {hasFilters && list.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={resetFilters}
                      className="px-5 py-2.5 rounded-xl border border-coal-light text-white hover:border-fire transition"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shown.map((p) => (
                    <MixerCard
                      key={p.id}
                      p={p}
                      onOpen={() => setModal(p)}
                      onLead={() => onLead('mixers-catalog', { productId: p.id, productName: p.name })}
                    />
                  ))}
                </div>
                {canMore && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setVisible(visible + 6)}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-white font-bold text-base hover:shadow-2xl hover:shadow-fire/40 transition flex items-center gap-2"
                    >
                      Показать больше
                      <Icon name="ChevronDown" size={18} />
                    </button>
                  </div>
                )}
              </>
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
            onLead('mixers-modal', { productId: p.id, productName: p.name });
          }}
        />
      )}
    </section>
  );
};

export default MixersCatalog;