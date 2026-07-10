import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/icon';
import { PLACEHOLDER, proxify } from './mixersCatalogUtils';

/** Полноэкранный просмотр фото с листанием (картинка целиком, без обрезки) */
const Lightbox = ({
  sources,
  alt,
  startIdx,
  onClose,
}: {
  sources: string[];
  alt: string;
  startIdx: number;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i - 1 + sources.length) % sources.length);
  const next = () => setIdx((i) => (i + 1) % sources.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources.length]);

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[130] bg-black/95 backdrop-blur flex items-center justify-center p-4 md:p-10 animate-fade-in-up"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full bg-gradient-to-r from-fire to-fire-dark text-white font-semibold flex items-center gap-2 shadow-lg shadow-fire/40 transition"
      >
        <Icon name="X" size={18} />
        Закрыть
      </button>

      <img
        src={sources[idx]}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[85vh] w-auto h-auto object-contain rounded-xl bg-white"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
        }}
      />

      {sources.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предыдущее фото"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-fire transition shadow-lg"
          >
            <Icon name="ChevronLeft" size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следующее фото"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-fire transition shadow-lg"
          >
            <Icon name="ChevronRight" size={28} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full bg-white/15 text-white text-sm">
              {idx + 1} / {sources.length}
            </div>
            <div className="flex gap-1.5">
              {sources.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  aria-label={`Фото ${i + 1}`}
                  className={`h-2 rounded-full transition ${i === idx ? 'bg-fire w-5' : 'bg-white/40 w-2 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>,
    document.body,
  );
};

const MixerGallery = ({ pictures, alt }: { pictures: string[]; alt: string }) => {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const sources = useMemo(
    () => (pictures.length ? pictures.map((p) => (p ? proxify(p) : PLACEHOLDER)) : [PLACEHOLDER]),
    [pictures],
  );

  return (
    <>
      <div className="relative aspect-square overflow-hidden bg-white group">
        {sources.map((s, i) => (
          <img
            key={i}
            src={s}
            alt={alt}
            loading="eager"
            onClick={() => setLightbox(true)}
            className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-200 cursor-zoom-in group-hover:scale-105 ${
              i === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
            }}
          />
        ))}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightbox(true);
          }}
          style={{ background: 'rgba(20,15,10,0.65)', color: '#fff' }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur border border-white/20 flex items-center justify-center hover:!bg-fire transition"
        >
          <Icon name="Maximize2" size={15} />
        </button>

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

      {lightbox && (
        <Lightbox sources={sources} alt={alt} startIdx={idx} onClose={() => setLightbox(false)} />
      )}
    </>
  );
};

export default MixerGallery;