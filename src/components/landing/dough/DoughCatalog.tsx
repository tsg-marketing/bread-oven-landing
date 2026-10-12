import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../../backend/func2url.json';
import { withCleanParams } from '@/lib/cleanParams';
import MixerModal from '../mixers/MixerModal';
import DoughCard from './DoughCard';
import { DoughProduct, brandOf, categoryLabel } from './doughUtils';

type Cat = { id: string; name: string; count: number };

const priceNum = (p: DoughProduct) => {
  const n = Number(p.price);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const Tab = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-sm md:text-base font-semibold border-2 transition whitespace-nowrap ${
      active
        ? 'bg-gradient-to-r from-fire to-fire-dark border-transparent text-white shadow-lg shadow-fire/30'
        : 'bg-coal-mid border-coal-light text-white/80 hover:border-fire/60'
    }`}
  >
    {children}
  </button>
);

const DoughCatalog = ({ onLead }: { onLead: (source: string, payload?: Record<string, unknown>) => void }) => {
  const [list, setList] = useState<DoughProduct[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cat, setCat] = useState('');
  const [brand, setBrand] = useState('');
  const [visible, setVisible] = useState(9);
  const [modal, setModal] = useState<DoughProduct | null>(null);

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

  const byCat = useMemo(() => (cat ? list.filter((p) => p.categoryId === cat) : list), [list, cat]);

  const brands = useMemo(() => {
    const m = new Map<string, number>();
    byCat.forEach((p) => {
      const b = brandOf(p);
      if (b) m.set(b, (m.get(b) || 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [byCat]);

  const filtered = useMemo(() => {
    const res = brand ? byCat.filter((p) => brandOf(p) === brand) : byCat;
    return [...res].sort((a, b) => priceNum(b) - priceNum(a));
  }, [byCat, brand]);

  useEffect(() => setVisible(9), [cat, brand]);
  useEffect(() => {
    if (brand && !brands.some(([b]) => b === brand)) setBrand('');
  }, [brands, brand]);

  const shown = filtered.slice(0, visible);

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
            <div>
              <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Тип</div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <Tab active={!cat} onClick={() => setCat('')}>
                  Все <span className="opacity-70">({list.length})</span>
                </Tab>
                {cats.map((c) => (
                  <Tab key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
                    {categoryLabel(c.id, c.name)} <span className="opacity-70">({c.count})</span>
                  </Tab>
                ))}
              </div>
            </div>
            {brands.length > 1 && (
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Бренд</div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <Tab active={!brand} onClick={() => setBrand('')}>
                    Все бренды
                  </Tab>
                  {brands.map(([b, n]) => (
                    <Tab key={b} active={brand === b} onClick={() => setBrand(b)}>
                      {b} <span className="opacity-70">({n})</span>
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
                Ничего не найдено
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {visible < filtered.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisible(visible + 9)}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-white font-semibold hover:shadow-xl hover:shadow-fire/40 transition flex items-center gap-2"
                >
                  Показать ещё
                  <span className="opacity-70">({filtered.length - visible})</span>
                  <Icon name="ChevronDown" size={18} />
                </button>
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
            onLead('dough-catalog-modal', { productId: p.id, productName: p.name });
          }}
        />
      )}
    </section>
  );
};

export default DoughCatalog;
