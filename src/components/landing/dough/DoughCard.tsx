import Icon from '@/components/ui/icon';
import MixerGallery from '../mixers/MixerGallery';
import { formatPrice } from '../mixers/mixersCatalogUtils';
import { DoughProduct, brandOf, categoryLabel, keyParams } from './doughUtils';

const DoughCard = ({ p, onOpen, onLead }: { p: DoughProduct; onOpen: () => void; onLead: () => void }) => {
  const params = keyParams(p.params);
  const priceText = formatPrice(p.price);
  const brand = brandOf(p);

  return (
    <article className="card-hover group bg-coal-mid rounded-2xl overflow-hidden border border-coal-light animate-fade-in-up flex flex-col">
      <MixerGallery pictures={p.pictures} alt={p.name} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-fire/10 text-fire font-semibold">
            {categoryLabel(p.categoryId, p.categoryName)}
          </span>
          {brand && (
            <span className="text-xs px-2.5 py-1 rounded-full border border-coal-light text-white/70">{brand}</span>
          )}
        </div>
        <h3 className="font-oswald text-xl md:text-2xl text-white mb-3 leading-tight line-clamp-2">{p.name}</h3>
        <div className="flex-1">
          {params.length > 0 && (
            <div className="grid grid-cols-1 gap-1.5 mb-3">
              {params.map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-3 text-sm border-b border-coal-light/60 pb-1.5">
                  <span className="text-white/60">{k}</span>
                  <span className="text-white font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2">
          {priceText ? (
            <div className="font-oswald text-2xl md:text-3xl font-bold text-fire">{priceText}</div>
          ) : (
            <div className="text-white/60 text-base">Цена по запросу</div>
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

export default DoughCard;
