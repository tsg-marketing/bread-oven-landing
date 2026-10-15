import Icon from '@/components/ui/icon';


const WHITE = { color: '#fff' };

export type PainGainItem = { icon: string; pain: string; gain: string };

type Props = {
  badge: string;
  title: string;
  accent: string;
  subtitle: string;
  withoutLabel: string;
  withLabel: string;
  items: PainGainItem[];
};

const PainGain = ({ badge, title, accent, subtitle, withoutLabel, withLabel, items }: Props) => (
  <section id="benefits" className="py-24 bg-coal-mid relative overflow-hidden">
    <div className="absolute -top-20 left-0 w-[500px] h-[500px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-fire/10 blur-[140px]" />
    <div className="container relative">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fire/10 border border-fire/30 text-fire text-sm font-semibold mb-4">
          <Icon name="Sparkles" size={16} />
          {badge}
        </div>
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3">
          {title} <span className="text-fire-gradient">{accent}</span>
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="rounded-3xl bg-white border border-coal-light shadow-2xl shadow-black/5 overflow-hidden">
        <div className="hidden md:grid grid-cols-2">
          <div className="p-5 bg-coal-mid flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Icon name="TriangleAlert" size={20} className="text-red-500" />
            </div>
            <div>
              <div className="font-oswald text-lg uppercase text-white/70">{withoutLabel}</div>
              <div className="text-xs text-white/50">с чем сталкиваются пекарни</div>
            </div>
          </div>
          <div className="p-5 bg-gradient-to-r from-fire to-fire-dark flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="BadgeCheck" size={20} style={WHITE} />
            </div>
            <div>
              <div className="font-oswald text-lg uppercase" style={WHITE}>
                {withLabel}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>
                что вы получаете
              </div>
            </div>
          </div>
        </div>

        {items.map((it) => (
          <div key={it.gain} className="grid md:grid-cols-2 border-t border-coal-light group">
            <div className="p-5 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="X" size={15} className="text-red-500" />
              </span>
              <span className="text-white/60 text-base md:text-lg">
                <span className="md:hidden block text-xs uppercase tracking-wider text-white/40 mb-1">Проблема</span>
                {it.pain}
              </span>
            </div>
            <div className="p-5 flex items-start gap-3 bg-fire/[0.06] md:border-l-2 border-fire/40">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center flex-shrink-0 shadow-md shadow-fire/30 group-hover:scale-110 transition">
                <Icon name={it.icon} size={18} style={WHITE} />
              </span>
              <span className="text-white font-semibold text-base md:text-lg">
                <span className="md:hidden block text-xs uppercase tracking-wider text-fire mb-1">Решение</span>
                {it.gain}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PainGain;
