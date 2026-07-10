import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../../backend/func2url.json';
import MixerModal from './MixerModal';
import MixerCard from './MixerCard';
import MixerFilters from './MixerFilters';
import {
  MixerProduct,
  brandOf,
  volumeNumOf,
  powerNumOf,
  priceNumOf,
  uniqSorted,
} from './mixersCatalogUtils';

export type { MixerProduct } from './mixersCatalogUtils';

const MixersCatalog = ({ onLead }: { onLead: (source: string, payload?: Record<string, unknown>) => void }) => {
  const [list, setList] = useState<MixerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(6);
  const [modal, setModal] = useState<MixerProduct | null>(null);

  const [fVolumeMin, setFVolumeMin] = useState('');
  const [fVolumeMax, setFVolumeMax] = useState('');
  const [fPowerMin, setFPowerMin] = useState('');
  const [fPowerMax, setFPowerMax] = useState('');
  const [fBrand, setFBrand] = useState('');

  useEffect(() => {
    fetch(func2url['mixers-catalog'])
      .then((r) => r.json())
      .then((data) => {
        setList(data.planetary || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить каталог');
        setLoading(false);
      });
  }, []);

  const brandOptions = useMemo(() => uniqSorted(list.map(brandOf)), [list]);

  const filtered = useMemo(() => {
    const vMin = fVolumeMin !== '' ? Number(fVolumeMin) : null;
    const vMax = fVolumeMax !== '' ? Number(fVolumeMax) : null;
    const pMin = fPowerMin !== '' ? Number(fPowerMin) : null;
    const pMax = fPowerMax !== '' ? Number(fPowerMax) : null;

    const result = list.filter((p) => {
      if (fBrand && brandOf(p) !== fBrand) return false;

      if (vMin !== null || vMax !== null) {
        const v = volumeNumOf(p);
        if (v === null) return false;
        if (vMin !== null && v < vMin) return false;
        if (vMax !== null && v > vMax) return false;
      }

      if (pMin !== null || pMax !== null) {
        const pw = powerNumOf(p);
        if (pw === null) return false;
        if (pMin !== null && pw < pMin) return false;
        if (pMax !== null && pw > pMax) return false;
      }

      return true;
    });

    // Сортировка по цене по возрастанию; товары без цены — в конце
    return [...result].sort((a, b) => {
      const pa = priceNumOf(a);
      const pb = priceNumOf(b);
      if (pa !== null && pb !== null) return pa - pb;
      if (pa !== null) return -1;
      if (pb !== null) return 1;
      return 0;
    });
  }, [list, fVolumeMin, fVolumeMax, fPowerMin, fPowerMax, fBrand]);

  useEffect(() => setVisible(6), [fVolumeMin, fVolumeMax, fPowerMin, fPowerMax, fBrand]);

  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible]);
  const canMore = visible < filtered.length;
  const hasFilters = !!(fVolumeMin || fVolumeMax || fPowerMin || fPowerMax || fBrand);
  const resetFilters = () => {
    setFVolumeMin('');
    setFVolumeMax('');
    setFPowerMin('');
    setFPowerMax('');
    setFBrand('');
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
          <MixerFilters
            fVolumeMin={fVolumeMin}
            fVolumeMax={fVolumeMax}
            fPowerMin={fPowerMin}
            fPowerMax={fPowerMax}
            fBrand={fBrand}
            setFVolumeMin={setFVolumeMin}
            setFVolumeMax={setFVolumeMax}
            setFPowerMin={setFPowerMin}
            setFPowerMax={setFPowerMax}
            setFBrand={setFBrand}
            brandOptions={brandOptions}
            hasFilters={hasFilters}
            resetFilters={resetFilters}
          />
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