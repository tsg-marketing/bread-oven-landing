import Icon from '@/components/ui/icon';
import MixerGallery from '../mixers/MixerGallery';
import { formatPrice } from '../mixers/mixersCatalogUtils';
import { CAPACITY_LABELS, ProoferProduct, brandOf, keyParams } from './prooferUtils';

const ProoferCard = ({ p, onOpen, onLead }: { p: ProoferProduct; onOpen: () => void; onLead: () => void }) => {
  const params = keyParams(p).slice(0, 4);
  const priceText = formatPrice(p.price);
  const brand = brandOf(p);

  return (
    <article className="card-hover group bg-coal-mid rounded-xl overflow-hidden border border-coal-light animate-fade-in-up flex flex-col">
      <MixerGallery pictures={p.pictures} alt={p.name} />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1 mb-2">
          {p.capacityGroup && CAPACITY_LABELS[p.capacityGroup] && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-fire/10 text-fire font-semibold">
              {CAPACITY_LABELS[p.capacityGroup]}
            </span>
          )}
          {brand && (
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-coal-light text-white/70">{brand}</span>
          )}
        </div>
        <h3 className="font-oswald text-lg text-white mb-2 leading-tight line-clamp-2 min-h-[2.5em]">{p.name}</h3>
        <div className="flex-1">
          {params.length > 0 && (
            <div className="grid grid-cols-1 gap-1 mb-2">
              {params.map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-2 text-xs border-b border-coal-light/60 pb-1">
                  <span className="text-white/60">{k}</span>
                  <span className="text-white font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2">
          {priceText ? (
            <div className="font-oswald text-xl md:text-2xl font-bold text-fire">{priceText}</div>
          ) : (
            <div className="text-white/60 text-sm">Цена по запросу</div>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          <button
            onClick={onOpen}
            className="w-full px-3 py-2 rounded-lg bg-coal border border-coal-light text-white text-sm hover:border-fire transition flex items-center justify-center gap-1.5"
          >
            Подробнее
            <Icon name="ArrowRight" size={14} />
          </button>
          <button
            onClick={onLead}
            className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-white text-sm font-semibold hover:shadow-lg hover:shadow-fire/30 transition flex items-center justify-center gap-1.5"
          >
            <Icon name="Send" size={14} />
            Заявка
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProoferCard;
