import Icon from '@/components/ui/icon';
import MixerGallery from './MixerGallery';
import { MixerProduct, formatPrice } from './mixersCatalogUtils';

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
              <MixerGallery pictures={product.pictures} alt={product.name} />
            </div>
            <div>
              <h3 className="font-oswald text-2xl md:text-3xl text-white mb-2">{product.name}</h3>
              {product.vendor && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coal border border-fire/30 text-fire text-xs mb-4">
                  <Icon name="BadgeCheck" size={14} />
                  {product.vendor}
                </div>
              )}
              <div className="mb-4">
                <div className="text-xs text-white/50">Цена</div>
                {formatPrice(product.price) ? (
                  <div className="font-oswald text-3xl font-bold text-fire">{formatPrice(product.price)}</div>
                ) : (
                  <div className="font-oswald text-2xl font-bold text-white/70">По запросу</div>
                )}
              </div>
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

export default MixerModal;
