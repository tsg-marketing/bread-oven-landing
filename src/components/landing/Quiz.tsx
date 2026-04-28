import { useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';
import ConsentNote from './ConsentNote';

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
    <div className="bg-white border border-coal-light rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-fire to-ember transition-all duration-500"
        style={{ width: `${progress}%` }}
      />

      {phase === 'quiz' && (
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-5">
            <span className="text-base font-semibold" style={{ color: '#000' }}>
              Шаг {step + 1} из {questions.length}
            </span>
            <span className="text-base text-fire-gradient font-bold">{Math.round(progress)}%</span>
          </div>
          <h3
            className={`font-oswald ${compact ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-6`}
            style={{ color: '#000' }}
          >
            {current.q}
          </h3>
          <div className={`grid ${gridCols} gap-3`}>
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
                  className={`group text-left flex items-center gap-3 p-4 rounded-xl border-2 transition ${
                    selected
                      ? 'bg-fire/10 border-fire'
                      : 'bg-white border-coal-light hover:border-fire/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fire/20 to-ember/10 border border-fire/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={o.icon} size={24} className="text-fire" />
                  </div>
                  <span className="font-bold flex-1 text-base md:text-lg" style={{ color: '#000' }}>
                    {o.label}
                  </span>
                  {current.type === 'multi' ? (
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        selected ? 'bg-fire border-fire' : 'border-black/40'
                      }`}
                    >
                      {selected && <Icon name="Check" size={16} className="text-white" />}
                    </div>
                  ) : (
                    <Icon
                      name="ChevronRight"
                      size={22}
                      className="group-hover:text-fire transition"
                      style={{ color: '#000' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-base font-semibold hover:text-fire flex items-center gap-1"
                style={{ color: '#000' }}
              >
                <Icon name="ArrowLeft" size={16} /> Назад
              </button>
            ) : (
              <span />
            )}
            {current.type === 'multi' && (
              <button
                onClick={submitMulti}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-white font-bold text-base hover:shadow-lg hover:shadow-fire/40 transition flex items-center gap-2"
              >
                Далее <Icon name="ArrowRight" size={18} />
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
          <h3 className="font-oswald text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: '#000' }}>
            Подборка готова!
          </h3>
          <p className="text-center text-base mb-5" style={{ color: '#000' }}>
            Оставьте контакты — пришлём подборку и КП.
          </p>

          <form onSubmit={submit} className="space-y-3">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ваше имя"
              className="w-full bg-white border-2 border-coal-light focus:border-fire rounded-xl px-4 py-3 outline-none transition text-base"
              style={{ color: '#000' }}
            />
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Телефон"
              className="w-full bg-white border-2 border-coal-light focus:border-fire rounded-xl px-4 py-3 outline-none transition text-base"
              style={{ color: '#000' }}
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
              className="w-full text-sm hover:text-fire"
              style={{ color: '#000' }}
            >
              Пройти заново
            </button>
            <ConsentNote className="text-center" tone="light" />
          </form>
        </div>
      )}

      {phase === 'sent' && (
        <div className="animate-fade-in-up text-center py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
            <Icon name="PartyPopper" size={28} className="text-white" />
          </div>
          <h3 className="font-oswald text-3xl font-bold mb-2" style={{ color: '#000' }}>Заявка принята!</h3>
          <p className="text-base mb-5" style={{ color: '#000' }}>
            Технолог-эксперт свяжется с вами в ближайшее время.
          </p>
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl border-2 border-coal-light hover:border-fire transition font-semibold"
            style={{ color: '#000' }}
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
    <section
      id="quiz"
      className="py-24 relative overflow-hidden bg-coal-mid"
    >
      <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-fire/15 blur-[140px]" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-ember/10 blur-[120px]" />

      <div className="container relative">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="font-oswald text-4xl md:text-6xl font-black uppercase leading-tight" style={{ color: 'hsl(var(--ink))' }}>
            Выбери идеальную печь <br className="hidden md:block" />
            <span className="text-fire-gradient">для своей пекарни!</span>
          </h2>
          <p className="text-lg mt-4" style={{ color: 'hsl(var(--steel))' }}>
            Ответь на 4 простых вопроса — технолог пришлёт подборку моделей и КП с ценами.
          </p>
        </div>

        <div className="max-w-3xl mx-auto p-[3px] rounded-3xl bg-gradient-to-br from-fire via-amber-400 to-ember shadow-2xl shadow-fire/25">
          <div className="rounded-[22px] bg-white">
            <QuizInner onDone={onDone} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;