import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';

export type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  source?: string;
  title?: string;
  subtitle?: string;
  payload?: Record<string, unknown>;
};

const LeadModal = ({
  open,
  onClose,
  source = 'lead-modal',
  title = 'Оставьте заявку',
  subtitle = 'Менеджер перезвонит и ответит на все вопросы.',
  payload,
}: LeadModalProps) => {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSent(false);
      setErr('');
      setForm({ name: '', phone: '' });
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErr('');
    try {
      const res = await fetch(func2url.lead, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          source,
          payload,
        }),
      });
      if (!res.ok) throw new Error('fail');
      setSent(true);
    } catch {
      setErr('Не удалось отправить. Попробуйте ещё раз или позвоните нам.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-coal text-white hover:bg-fire transition flex items-center justify-center"
        >
          <Icon name="X" size={18} />
        </button>

        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center mb-4 shadow-lg shadow-fire/40">
              <Icon name="Send" size={24} className="text-white" />
            </div>
            <h3
              className="font-oswald text-2xl md:text-3xl font-bold mb-2"
              style={{ color: 'hsl(var(--ink))' }}
            >
              {title}
            </h3>
            <p className="text-sm mb-5" style={{ color: 'hsl(var(--ink) / 0.65)' }}>
              {subtitle}
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input
                ref={nameRef}
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ваше имя"
                className="w-full border-2 focus:border-fire rounded-xl px-4 py-3.5 outline-none transition"
                style={{
                  background: 'hsl(var(--coal-mid))',
                  borderColor: 'hsl(var(--coal-light))',
                  color: 'hsl(var(--ink))',
                }}
              />
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Телефон"
                className="w-full border-2 focus:border-fire rounded-xl px-4 py-3.5 outline-none transition"
                style={{
                  background: 'hsl(var(--coal-mid))',
                  borderColor: 'hsl(var(--coal-light))',
                  color: 'hsl(var(--ink))',
                }}
              />
              {err && <div className="text-sm text-red-500">{err}</div>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fire to-fire-dark font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ color: '#fff' }}
              >
                {submitting ? 'Отправляем...' : 'Отправить'}
                <Icon name="Send" size={16} />
              </button>
              <p className="text-xs text-center" style={{ color: 'hsl(var(--ink) / 0.45)' }}>
                Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-4 flex items-center justify-center">
              <Icon name="Check" size={30} className="text-white" />
            </div>
            <h3
              className="font-oswald text-2xl font-bold mb-2"
              style={{ color: 'hsl(var(--ink))' }}
            >
              Заявка принята!
            </h3>
            <p className="text-sm mb-5" style={{ color: 'hsl(var(--ink) / 0.65)' }}>
              Наш менеджер свяжется с вами в ближайшее время.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border-2 font-semibold transition"
              style={{ borderColor: 'hsl(var(--coal-light))', color: 'hsl(var(--ink))' }}
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
