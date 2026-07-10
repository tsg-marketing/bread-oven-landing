import Icon from '@/components/ui/icon';

const MixerFilters = ({
  fVolume,
  fBrand,
  fPower,
  setFVolume,
  setFBrand,
  setFPower,
  volumeOptions,
  brandOptions,
  powerOptions,
  hasFilters,
  resetFilters,
}: {
  fVolume: string;
  fBrand: string;
  fPower: string;
  setFVolume: (v: string) => void;
  setFBrand: (v: string) => void;
  setFPower: (v: string) => void;
  volumeOptions: string[];
  brandOptions: string[];
  powerOptions: string[];
  hasFilters: boolean;
  resetFilters: () => void;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-8">
      <div className="relative flex-1">
        <Icon name="Ruler" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fire pointer-events-none" />
        <select
          value={fVolume}
          onChange={(e) => setFVolume(e.target.value)}
          className="w-full appearance-none bg-coal-mid border border-coal-light focus:border-fire rounded-xl pl-9 pr-9 py-3 text-white outline-none transition cursor-pointer"
        >
          <option style={{ color: '#111' }} value="">Объём — любой</option>
          {volumeOptions.map((v) => (
            <option style={{ color: '#111' }} key={v} value={v}>{v}</option>
          ))}
        </select>
        <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
      </div>

      <div className="relative flex-1">
        <Icon name="BadgeCheck" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fire pointer-events-none" />
        <select
          value={fBrand}
          onChange={(e) => setFBrand(e.target.value)}
          className="w-full appearance-none bg-coal-mid border border-coal-light focus:border-fire rounded-xl pl-9 pr-9 py-3 text-white outline-none transition cursor-pointer"
        >
          <option style={{ color: '#111' }} value="">Бренд — любой</option>
          {brandOptions.map((v) => (
            <option style={{ color: '#111' }} key={v} value={v}>{v}</option>
          ))}
        </select>
        <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
      </div>

      <div className="relative flex-1">
        <Icon name="Zap" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fire pointer-events-none" />
        <select
          value={fPower}
          onChange={(e) => setFPower(e.target.value)}
          className="w-full appearance-none bg-coal-mid border border-coal-light focus:border-fire rounded-xl pl-9 pr-9 py-3 text-white outline-none transition cursor-pointer"
        >
          <option style={{ color: '#111' }} value="">Мощность — любая</option>
          {powerOptions.map((v) => (
            <option style={{ color: '#111' }} key={v} value={v}>{v}</option>
          ))}
        </select>
        <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
      </div>

      {hasFilters && (
        <button
          onClick={resetFilters}
          className="px-4 py-3 rounded-xl border border-coal-light text-white/80 hover:border-fire hover:text-white transition flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Icon name="X" size={16} />
          Сбросить
        </button>
      )}
    </div>
  );
};

export default MixerFilters;
