import Icon from '@/components/ui/icon';

const MixerFilters = ({
  fVolumeMin,
  fVolumeMax,
  fPowerMin,
  fPowerMax,
  fBrand,
  setFVolumeMin,
  setFVolumeMax,
  setFPowerMin,
  setFPowerMax,
  setFBrand,
  brandOptions,
  hasFilters,
  resetFilters,
}: {
  fVolumeMin: string;
  fVolumeMax: string;
  fPowerMin: string;
  fPowerMax: string;
  fBrand: string;
  setFVolumeMin: (v: string) => void;
  setFVolumeMax: (v: string) => void;
  setFPowerMin: (v: string) => void;
  setFPowerMax: (v: string) => void;
  setFBrand: (v: string) => void;
  brandOptions: string[];
  hasFilters: boolean;
  resetFilters: () => void;
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-3 mb-4">
      {/* Объём дежи, л */}
      <div className="bg-coal-mid border border-coal-light rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2 text-white/80 text-sm font-medium">
          <Icon name="Ruler" size={16} className="text-fire" />
          Объём дежи, л
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={fVolumeMin}
            onChange={(e) => setFVolumeMin(e.target.value)}
            placeholder="от"
            className="w-full bg-coal border border-coal-light focus:border-fire rounded-lg px-3 py-2 text-white outline-none transition"
          />
          <span className="text-white/40">—</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={fVolumeMax}
            onChange={(e) => setFVolumeMax(e.target.value)}
            placeholder="до"
            className="w-full bg-coal border border-coal-light focus:border-fire rounded-lg px-3 py-2 text-white outline-none transition"
          />
        </div>
      </div>

      {/* Мощность, кВт */}
      <div className="bg-coal-mid border border-coal-light rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2 text-white/80 text-sm font-medium">
          <Icon name="Zap" size={16} className="text-fire" />
          Мощность
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={fPowerMin}
            onChange={(e) => setFPowerMin(e.target.value)}
            placeholder="от"
            className="w-full bg-coal border border-coal-light focus:border-fire rounded-lg px-3 py-2 text-white outline-none transition"
          />
          <span className="text-white/40">—</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={fPowerMax}
            onChange={(e) => setFPowerMax(e.target.value)}
            placeholder="до"
            className="w-full bg-coal border border-coal-light focus:border-fire rounded-lg px-3 py-2 text-white outline-none transition"
          />
        </div>
      </div>

      {/* Бренд */}
      <div className="bg-coal-mid border border-coal-light rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2 text-white/80 text-sm font-medium">
          <Icon name="BadgeCheck" size={16} className="text-fire" />
          Бренд
        </div>
        <div className="relative">
          <select
            value={fBrand}
            onChange={(e) => setFBrand(e.target.value)}
            className="w-full appearance-none bg-coal border border-coal-light focus:border-fire rounded-lg pl-3 pr-9 py-2 text-white outline-none transition cursor-pointer"
          >
            <option style={{ color: '#111' }} value="">Любой</option>
            {brandOptions.map((v) => (
              <option style={{ color: '#111' }} key={v} value={v}>{v}</option>
            ))}
          </select>
          <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
        </div>
      </div>

      {hasFilters && (
        <div className="md:col-span-3">
          <button
            onClick={resetFilters}
            className="px-4 py-2.5 rounded-xl border border-coal-light text-white/80 hover:border-fire hover:text-white transition flex items-center gap-2"
          >
            <Icon name="X" size={16} />
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default MixerFilters;
