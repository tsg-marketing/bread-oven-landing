import Icon from '@/components/ui/icon';
import MixerGallery from './MixerGallery';
import { MixerProduct, formatPrice, pickParams } from './mixersCatalogUtils';

const MixerCard = ({
  p,
  onOpen,
  onLead,
}: {
  p: MixerProduct;
  onOpen: () => void;
  onLead: () => void;
}) => {
  const params = pickParams(p.params);
  const priceText = formatPrice(p.price);
  return (
    <article className="card-hover group bg-coal-mid rounded-2xl overflow-hidden border border-coal-light animate-fade-in-up flex flex-col">
      <MixerGallery pictures={p.pictures} alt={p.name} />
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
        <div className="mt-3">
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

export default MixerCard;
