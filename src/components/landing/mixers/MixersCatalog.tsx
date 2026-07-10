import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../../backend/func2url.json';

export type MixerProduct = {
  id: string;
  name: string;
  vendor: string;
  price: string;
  currency: string;
  url: string;
  description: string;
  picture: string;
  pictures: string[];
  categoryId: string;
  categoryName: string;
  available: boolean;
  group: string;
  params: Record<string, string>;
};

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f4f1ec"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9a8f80">Фото товара</text></svg>',
  );

const proxify = (url: string): string => {
  if (!url) return url;
  try {
    const u = new URL(url, window.location.origin);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 't-sib.ru') {
      return `${func2url['image-proxy']}?url=${encodeURIComponent(u.toString())}`;
    }
    return url;
  } catch {
    return url;
  }
};

/** Отбор 5 параметров: сперва Бренд, затем производительность/бак/объём/мощность, потом добираем остальными */
const KEY_WORDS = ['производ', 'бак', 'объ', 'дежа', 'дежи', 'мощн'];
const pickParams = (params: Record<string, string>): [string, string][] => {
  const all = Object.entries(params || {}).filter(([, v]) => v && String(v).trim());
  const result: [string, string][] = [];
  const used = new Set<string>();

  const brand = all.find(([k]) => k.toLowerCase().includes('бренд'));
  if (brand) {
    result.push(brand);
    used.add(brand[0]);
  }
  for (const kw of KEY_WORDS) {
    for (const pair of all) {
      if (used.has(pair[0])) continue;
      if (pair[0].toLowerCase().includes(kw)) {
        result.push(pair);
        used.add(pair[0]);
        break;
      }
    }
    if (result.length >= 5) break;
  }
  for (const pair of all) {
    if (result.length >= 5) break;
    if (used.has(pair[0])) continue;
    result.push(pair);
    used.add(pair[0]);
  }
  return result.slice(0, 5);
};

const Gallery = ({ pictures, alt }: { pictures: string[]; alt: string }) => {
  const [idx, setIdx] = useState(0);
  const sources = useMemo(
    () => (pictures.length ? pictures.map((p) => (p ? proxify(p) : PLACEHOLDER)) : [PLACEHOLDER]),
    [pictures],
  );
  return (
    <div className="relative aspect-square overflow-hidden bg-white group">
      {sources.map((s, i) => (
        <img
          key={i}
          src={s}
          alt={alt}
          loading="eager"
          className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:scale-105 ${
            i === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
      ))}
      {pictures.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx - 1 + pictures.length) % pictures.length);
            }}
            style={{ background: 'rgba(20,15,10,0.65)', color: '#fff' }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur border border-white/20 flex items-center justify-center hover:!bg-fire transition"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx + 1) % pictures.length);
            }}
            style={{ background: 'rgba(20,15,10,0.65)', color: '#fff' }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur border border-white/20 flex items-center justify-center hover:!bg-fire transition"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {pictures.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition ${i === idx ? 'bg-fire w-4' : 'bg-white/50 w-1.5'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const MixerModal = ({
  product,
  onClose,
  onLead,
}: {
  product: MixerProduct;
  onClose: () => void;
  onLead: (p: MixerProduct) => void;
}) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-coal-mid border border-coal-light rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-coal-mid/95 backdrop-blur border-b border-coal-light p-4 flex items-center justify-between z-10">
          <div className="text-xs text-white/50 uppercase tracking-wider">{product.categoryName}</div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-coal border border-coal-light text-white hover:bg-fire transition flex items-center justify-center"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl overflow-hidden border border-coal-light">
              <Gallery pictures={product.pictures} alt={product.name} />
            </div>
            <div>
              <h3 className="font-oswald text-2xl md:text-3xl text-white mb-2">{product.name}</h3>
              {product.vendor && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coal border border-fire/30 text-fire text-xs mb-4">
                  <Icon name="BadgeCheck" size={14} />
                  {product.vendor}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => onLead(product)}
                  style={{ background: 'hsl(var(--fire))' }}
                  className="px-6 py-3.5 rounded-xl font-bold text-base uppercase tracking-wide shadow-lg shadow-fire/40 hover:scale-[1.03] transition flex items-center gap-2"
                >
                  <Icon name="Phone" size={18} style={{ color: '#fff' }} />
                  <span style={{ color: '#fff' }}>Получить консультацию</span>
                </button>
              </div>
            </div>
          </div>

          {Object.keys(product.params).length > 0 && (
            <div className="mb-6">
              <h4 className="font-oswald text-2xl text-white mb-4">Характеристики</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(product.params).map(([k, v]) => (
                  <div key={k} className="bg-coal rounded-lg p-4 border border-coal-light">
                    <div className="text-sm text-white/60 mb-1">{k}</div>
                    <div className="text-lg text-white font-medium">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.description && (
            <div>
              <h4 className="font-oswald text-2xl text-white mb-4">Описание</h4>
              <div
                className="text-white/85 text-lg leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({
  p,
  onOpen,
  onLead,
}: {
  p: MixerProduct;
  onOpen: () => void;
  onLead: () => void;
}) => {
  const params = pickParams(p.params);
  return (
    <article className="card-hover group bg-coal-mid rounded-2xl overflow-hidden border border-coal-light animate-fade-in-up flex flex-col">
      <Gallery pictures={p.pictures} alt={p.name} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-oswald text-xl md:text-2xl text-white mb-3 leading-tight line-clamp-2">{p.name}</h3>
          {params.length > 0 && (
            <div className="mb-3 grid grid-cols-1 gap-1.5">
              {params.map(([k, v]) => (
                <div key={k} className="flex items-start gap-2 text-base">
                  <Icon name="Dot" size={18} className="text-fire flex-shrink-0 mt-0.5" />
                  <div className="text-white leading-snug">
                    <span className="text-white/70">{k}:</span> <span className="font-semibold">{v}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onOpen}
            className="flex-1 px-4 py-3 rounded-lg bg-coal border border-coal-light text-white text-base hover:border-fire transition flex items-center justify-center gap-2"
          >
            Подробнее
            <Icon name="ArrowRight" size={16} />
          </button>
          <button
            onClick={onLead}
            className="px-4 py-3 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-white text-base font-semibold hover:shadow-lg hover:shadow-fire/30 transition flex items-center gap-2"
          >
            <Icon name="Send" size={16} />
            Заявка
          </button>
        </div>
      </div>
    </article>
  );
};

const MixersCatalog = ({ onLead }: { onLead: (source: string, payload?: Record<string, unknown>) => void }) => {
  const [planetary, setPlanetary] = useState<MixerProduct[]>([]);
  const [dough, setDough] = useState<MixerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'planetary' | 'dough'>('planetary');
  const [visible, setVisible] = useState(6);
  const [modal, setModal] = useState<MixerProduct | null>(null);

  useEffect(() => {
    fetch(func2url['mixers-catalog'])
      .then((r) => r.json())
      .then((data) => {
        setPlanetary(data.planetary || []);
        setDough(data.dough || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить каталог');
        setLoading(false);
      });
  }, []);

  useEffect(() => setVisible(6), [tab]);

  const list = tab === 'planetary' ? planetary : dough;
  const shown = useMemo(() => list.slice(0, visible), [list, visible]);
  const canMore = visible < list.length;

  return (
    <section id="assortment" className="relative py-24 bg-coal overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[140px]" />
      <div className="container relative">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-8">
          Ассортимент <span className="text-fire-gradient">миксеров</span>
        </h2>

        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setTab('planetary')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition border ${
              tab === 'planetary'
                ? 'bg-gradient-to-r from-fire to-fire-dark text-white border-transparent shadow-lg shadow-fire/30'
                : 'bg-coal-mid text-white/70 border-coal-light hover:border-fire/40 hover:text-white'
            }`}
          >
            Планетарные миксеры ({planetary.length})
          </button>
          <button
            onClick={() => setTab('dough')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition border ${
              tab === 'dough'
                ? 'bg-gradient-to-r from-fire to-fire-dark text-white border-transparent shadow-lg shadow-fire/30'
                : 'bg-coal-mid text-white/70 border-coal-light hover:border-fire/40 hover:text-white'
            }`}
          >
            Тестомесы ({dough.length})
          </button>
        </div>

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
            {list.length === 0 ? (
              <div className="text-center text-white/50 py-20">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 text-fire/50" />
                В этой категории пока нет товаров
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shown.map((p) => (
                    <Card
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
          onClose={() => setModal(null)}
          onLead={(p) => {
            setModal(null);
            onLead('mixers-modal', { productId: p.id, productName: p.name });
          }}
        />
      )}
    </section>
  );
};

export default MixersCatalog;