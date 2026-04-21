import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';

export type Product = {
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
  performance: string;
  params: Record<string, string>;
};

type Category = { id: string; name: string };

const PLACEHOLDER =
  'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/c1ea403c-627b-4ade-9eed-225abbe3518b.jpg';

/** Цена в рублях с разделением разрядов неразрывным пробелом */
const formatPrice = (raw: string | number): string | null => {
  const n = Number(raw);
  if (!raw || !Number.isFinite(n) || n <= 0) return null;
  return `${new Intl.NumberFormat('ru-RU').format(Math.round(n)).replace(/\s/g, '\u00A0')}\u00A0₽`;
};

/** Поиск значения параметра по части слова в названии (без учёта регистра) */
const findParamByKey = (params: Record<string, string>, needle: string): string => {
  const n = needle.toLowerCase();
  for (const [k, v] of Object.entries(params || {})) {
    if (k.toLowerCase().includes(n) && v) return v;
  }
  return '';
};

const ProductGallery = ({
  pictures,
  alt,
  onImageClick,
}: {
  pictures: string[];
  alt: string;
  onImageClick?: () => void;
}) => {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const src = pictures[idx] || PLACEHOLDER;

  const handleClick = () => {
    if (onImageClick) onImageClick();
    else if (pictures.length > 0) setLightbox(true);
  };

  return (
    <>
      <div className="relative aspect-square overflow-hidden bg-white group">
        <img
          src={src}
          alt={alt}
          onClick={handleClick}
          className="w-full h-full object-contain p-4 cursor-pointer group-hover:scale-105 transition duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
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
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition ${i === idx ? 'bg-fire w-4' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4 animate-fade-in-up"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(false);
            }}
            className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-fire to-fire-dark text-white font-semibold flex items-center gap-2 shadow-lg shadow-fire/40 hover:shadow-xl transition z-10"
          >
            <Icon name="X" size={18} />
            Закрыть
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full rounded-xl"
          />
          {pictures.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx((idx - 1 + pictures.length) % pictures.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-fire transition"
              >
                <Icon name="ChevronLeft" size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx((idx + 1) % pictures.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-fire transition"
              >
                <Icon name="ChevronRight" size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

const ProductModal = ({
  product,
  onClose,
  onLead,
}: {
  product: Product;
  onClose: () => void;
  onLead: (p: Product) => void;
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
              <ProductGallery pictures={product.pictures} alt={product.name} />
            </div>
            <div>
              <h3 className="font-oswald text-2xl md:text-3xl text-white mb-2">{product.name}</h3>
              {product.vendor && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coal border border-fire/30 text-fire text-xs mb-4">
                  <Icon name="BadgeCheck" size={14} />
                  {product.vendor}
                </div>
              )}
              {formatPrice(product.price) && (
                <div className="mb-4">
                  <div className="text-xs text-white/50">Цена</div>
                  <div className="font-oswald text-3xl font-bold text-fire-gradient">
                    {formatPrice(product.price)}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onLead(product)}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-white font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center gap-2"
                >
                  <Icon name="Send" size={16} />
                  Оставить заявку
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
              <h4 className="font-oswald text-lg text-white mb-3">Описание</h4>
              <div
                className="text-white/70 text-sm leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Catalog = ({ onLead }: { onLead: (source: string, payload?: Record<string, unknown>) => void }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Product | null>(null);

  useEffect(() => {
    fetch(func2url.catalog)
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить каталог');
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (activeCat !== 'all') list = list.filter((i) => i.categoryId === activeCat);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.vendor.toLowerCase().includes(q) ||
          (i.performance || '').toLowerCase().includes(q),
      );
    }
    // Сортировка: сначала с ценой по возрастанию, затем товары без цены
    return [...list].sort((a, b) => {
      const pa = Number(a.price);
      const pb = Number(b.price);
      const aHas = Number.isFinite(pa) && pa > 0;
      const bHas = Number.isFinite(pb) && pb > 0;
      if (aHas && bHas) return pa - pb;
      if (aHas) return -1;
      if (bHas) return 1;
      return 0;
    });
  }, [items, activeCat, search]);

  return (
    <section id="catalog" className="relative py-24 bg-coal overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[140px]" />
      <div className="container relative">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
              Каталог <span className="text-fire-gradient">печей</span>
            </h2>
            <p className="text-white/60 mt-3 max-w-2xl">
              Актуальный ассортимент из нашего фида. Цены и наличие обновляются автоматически.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="flex gap-2 flex-wrap flex-1">
            <button
              onClick={() => setActiveCat('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                activeCat === 'all'
                  ? 'bg-gradient-to-r from-fire to-fire-dark text-white border-transparent shadow-lg shadow-fire/30'
                  : 'bg-coal-mid text-white/70 border-coal-light hover:border-fire/40 hover:text-white'
              }`}
            >
              Все ({items.length})
            </button>
            {categories.map((c) => {
              const count = items.filter((i) => i.categoryId === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                    activeCat === c.id
                      ? 'bg-gradient-to-r from-fire to-fire-dark text-white border-transparent shadow-lg shadow-fire/30'
                      : 'bg-coal-mid text-white/70 border-coal-light hover:border-fire/40 hover:text-white'
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>
          <div className="relative lg:w-80">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию, бренду, производительности..."
              className="w-full bg-coal-mid border border-coal-light focus:border-fire rounded-full pl-9 pr-4 py-2 text-sm text-white outline-none transition"
            />
          </div>
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
            {filtered.length === 0 ? (
              <div className="text-center text-white/50 py-20">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 text-fire/50" />
                По вашему запросу ничего не найдено
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => {
                  const priceText = formatPrice(p.price);
                  const allParams = Object.entries(p.params || {}).filter(([, v]) => v);
                  return (
                    <article
                      key={p.id}
                      style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                      className="card-hover group bg-coal-mid rounded-2xl overflow-hidden border border-coal-light animate-fade-in-up flex flex-col"
                    >
                      <ProductGallery pictures={p.pictures} alt={p.name} onImageClick={() => setModal(p)} />

                      <div className="p-5 flex flex-col flex-1">
                        {p.vendor && (
                          <div className="mb-2">
                            <span className="px-2.5 py-1 rounded-full bg-fire/10 border border-fire/30 text-fire text-xs uppercase font-medium">
                              {p.vendor}
                            </span>
                          </div>
                        )}
                        <h3 className="font-oswald text-xl md:text-2xl text-white mb-3 leading-tight line-clamp-2">
                          {p.name}
                        </h3>

                        {p.performance && (
                          <div className="flex items-center gap-2 text-base text-white mb-3">
                            <Icon name="Gauge" size={18} className="text-fire flex-shrink-0" />
                            <span>
                              <span className="text-white/80">Производительность:</span>{' '}
                              <span className="font-semibold">{p.performance}</span>
                            </span>
                          </div>
                        )}

                        {allParams.length > 0 && (
                          <div className="mb-3 grid grid-cols-1 gap-1.5">
                            {allParams.map(([k, v]) => (
                              <div
                                key={k}
                                className="flex items-start gap-2 text-base"
                              >
                                <Icon name="Dot" size={18} className="text-fire flex-shrink-0 mt-0.5" />
                                <div className="text-white leading-snug">
                                  <span className="text-white/80">{k}:</span>{' '}
                                  <span className="font-semibold">{v}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {priceText && (
                          <div className="mb-3 pt-3 border-t border-coal-light">
                            <div className="text-xs uppercase tracking-wider text-white/50 mb-1">
                              Цена
                            </div>
                            <div className="font-oswald text-3xl font-bold text-fire-gradient">
                              {priceText}
                            </div>
                          </div>
                        )}

                        <div className={`mt-auto flex items-center gap-2 ${priceText ? '' : 'pt-3 border-t border-coal-light'}`}>
                          <button
                            onClick={() => setModal(p)}
                            className="flex-1 px-4 py-3 rounded-lg bg-coal border border-coal-light text-white text-base hover:border-fire transition flex items-center justify-center gap-2"
                          >
                            Подробнее
                            <Icon name="ArrowRight" size={16} />
                          </button>
                          <button
                            onClick={() => onLead('catalog', { productId: p.id, productName: p.name })}
                            className="px-4 py-3 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-white text-base font-semibold hover:shadow-lg hover:shadow-fire/30 transition flex items-center gap-2"
                          >
                            <Icon name="Send" size={16} />
                            Заявка
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {modal && (
        <ProductModal
          product={modal}
          onClose={() => setModal(null)}
          onLead={(p) => {
            setModal(null);
            onLead('catalog-modal', { productId: p.id, productName: p.name });
          }}
        />
      )}
    </section>
  );
};

export default Catalog;