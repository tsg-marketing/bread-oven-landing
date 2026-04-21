import { useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';

type SingleQ = {
  id: string;
  q: string;
  type: 'single';
  options: { label: string; icon: string }[];
};
type MultiQ = {
  id: string;
  q: string;
  type: 'multi';
  options: { label: string; icon: string }[];
};
type Question = SingleQ | MultiQ;

const questions: Question[] = [
  {
    id: 'product',
    type: 'single',
    q: 'Тип изделий',
    options: [
      { label: 'Хлеб', icon: 'Wheat' },
      { label: 'Сдоба', icon: 'Croissant' },
      { label: 'Пицца', icon: 'Pizza' },
      { label: 'Мясо-рыба-овощи', icon: 'Drumstick' },
      { label: 'Всё вместе', icon: 'UtensilsCrossed' },
    ],
  },
  {
    id: 'volume',
    type: 'single',
    q: 'Планируемый объём',
    options: [
      { label: 'До 50 кг/смену', icon: 'Package' },
      { label: '50–200 кг/смену', icon: 'Package2' },
      { label: '200–500 кг/смену', icon: 'Boxes' },
      { label: '500+ кг/смену', icon: 'Container' },
    ],
  },
  {
    id: 'energy',
    type: 'single',
    q: 'Тип энергоносителя',
    options: [
      { label: 'Электричество 220В', icon: 'Plug' },
      { label: 'Электричество 380В', icon: 'PlugZap' },
      { label: 'Газ', icon: 'Flame' },
    ],
  },
  {
    id: 'extras',
    type: 'multi',
    q: 'Что ещё нужно? (можно несколько)',
    options: [
      { label: 'Пароувлажнение', icon: 'Droplets' },
      { label: 'Каменный под', icon: 'Square' },
      { label: 'Расстоечный шкаф', icon: 'Archive' },
      { label: 'Подставка', icon: 'Square' },
    ],
  },
];

export const QuizInner = ({
  onDone,
  compact = false,
}: {
  onDone?: () => void;
  compact?: boolean;
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [phase, setPhase] = useState<'quiz' | 'form' | 'sent'>('quiz');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const progress = ((step + (phase !== 'quiz' ? 1 : 0)) / (questions.length + 1)) * 100;
  const current = questions[step];

  const chooseSingle = (val: string) => {
    const next = { ...answers, [current.id]: val };
    setAnswers(next);
    if (step < questions.length - 1) setTimeout(() => setStep(step + 1), 200);
    else setTimeout(() => setPhase('form'), 200);
  };

  const toggleMulti = (val: string) => {
    const cur = (answers[current.id] as string[]) || [];
    const next = cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val];
    setAnswers({ ...answers, [current.id]: next });
  };

  const submitMulti = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setPhase('form');
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setPhase('quiz');
    setForm({ name: '', phone: '', email: '' });
    setErrorMsg('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch(func2url.lead, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          source: 'quiz',
          payload: { answers },
        }),
      });
      if (!res.ok) throw new Error('fail');
      setPhase('sent');
      onDone?.();
    } catch {
      setErrorMsg('Не удалось отправить. Попробуйте ещё раз или позвоните нам.');
    } finally {
      setSubmitting(false);
    }
  };

  const gridCols = compact ? 'grid-cols-1' : 'sm:grid-cols-2';

  return (
    <div className="bg-coal-mid border border-coal-light rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-fire to-ember transition-all duration-500"
        style={{ width: `${progress}%` }}
      />

      {phase === 'quiz' && (
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/50">
              Шаг {step + 1} из {questions.length}
            </span>
            <span className="text-sm text-fire-gradient font-bold">{Math.round(progress)}%</span>
          </div>
          <h3 className={`font-oswald ${compact ? 'text-xl' : 'text-2xl md:text-3xl'} text-white mb-5`}>
            {current.q}
          </h3>
          <div className={`grid ${gridCols} gap-2.5`}>
            {current.options.map((o) => {
              const selected =
                current.type === 'multi'
                  ? ((answers[current.id] as string[]) || []).includes(o.label)
                  : answers[current.id] === o.label;
              return (
                <button
                  key={o.label}
                  onClick={() =>
                    current.type === 'multi' ? toggleMulti(o.label) : chooseSingle(o.label)
                  }
                  className={`group text-left flex items-center gap-3 p-3 rounded-xl border transition ${
                    selected
                      ? 'bg-fire/10 border-fire'
                      : 'bg-coal border-coal-light hover:border-fire/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fire/20 to-ember/10 border border-fire/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={o.icon} size={18} className="text-fire" />
                  </div>
                  <span className="text-white font-medium flex-1 text-sm">{o.label}</span>
                  {current.type === 'multi' ? (
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        selected ? 'bg-fire border-fire' : 'border-white/30'
                      }`}
                    >
                      {selected && <Icon name="Check" size={14} className="text-white" />}
                    </div>
                  ) : (
                    <Icon
                      name="ChevronRight"
                      size={16}
                      className="text-white/30 group-hover:text-fire transition"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm text-white/50 hover:text-fire flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={14} /> Назад
              </button>
            ) : (
              <span />
            )}
            {current.type === 'multi' && (
              <button
                onClick={submitMulti}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-white font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center gap-2"
              >
                Далее <Icon name="ArrowRight" size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'form' && (
        <div className="animate-fade-in-up">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
            <Icon name="Check" size={24} className="text-white" />
          </div>
          <h3 className="font-oswald text-xl md:text-2xl text-white text-center mb-2">
            Подборка готова!
          </h3>
          <p className="text-white/60 text-center text-sm mb-5">
            Оставьте контакты — пришлём подборку и КП.
          </p>

          <form onSubmit={submit} className="space-y-3">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ваше имя"
              className="w-full bg-coal border border-coal-light focus:border-fire rounded-xl px-4 py-3 text-white outline-none transition"
            />
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Телефон"
              className="w-full bg-coal border border-coal-light focus:border-fire rounded-xl px-4 py-3 text-white outline-none transition"
            />
            {errorMsg && <div className="text-sm text-red-400">{errorMsg}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-white font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? 'Отправляем...' : 'Подобрать мою печь'}
              <Icon name="ArrowRight" size={18} />
            </button>
            <button
              type="button"
              onClick={reset}
              className="w-full text-sm text-white/40 hover:text-fire"
            >
              Пройти заново
            </button>
          </form>
        </div>
      )}

      {phase === 'sent' && (
        <div className="animate-fade-in-up text-center py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
            <Icon name="PartyPopper" size={28} className="text-white" />
          </div>
          <h3 className="font-oswald text-2xl text-white mb-2">Заявка принята!</h3>
          <p className="text-white/60 text-sm mb-5">
            Технолог-эксперт свяжется с вами в ближайшее время.
          </p>
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl border border-coal-light text-white hover:border-fire transition"
          >
            Пройти ещё раз
          </button>
        </div>
      )}
    </div>
  );
};

const Quiz = ({ onDone }: { onDone?: () => void }) => {
  return (
    <section id="quiz" className="py-24 bg-coal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-fire/20 blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-ember/15 blur-[120px]" />

      <div className="container relative">
        <div className="text-center mb-10">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            Подобрать <span className="text-fire-gradient">печь</span>
          </h2>
          <p className="text-white/60 mt-3">
            Ответьте на 4 вопроса — технолог подберёт оптимальные модели.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <QuizInner onDone={onDone} />
        </div>
      </div>
    </section>
  );
};

export default Quiz;
