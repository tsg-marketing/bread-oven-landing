import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { sendLead } from '@/lib/sendLead';
import ConsentCheckbox from './ConsentCheckbox';

export type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  source?: string;
  title?: string;
  subtitle?: string;
  payload?: Record<string, unknown>;
};

const inputClass =
  'w-full border-2 focus:border-fire rounded-xl px-4 py-3.5 outline-none transition placeholder:text-black/35';
const inputStyle = {
  background: '#fff',
  borderColor: 'hsl(var(--coal-light))',
  color: 'hsl(var(--ink))',
} as const;
const labelClass = 'block text-xs font-bold uppercase tracking-wider mb-1.5';
const labelStyle = { color: 'hsl(var(--ink) / 0.55)' } as const;

const LeadModal = ({
  open,
  onClose,
  source = 'lead-modal',
  title = 'Оставить заявку',
  subtitle,
  payload,
}: LeadModalProps) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const productName =
    (payload?.productName as string) || (payload?.product_name as string) || '';

  useEffect(() => {
    if (open) {
      setSent(false);
      setErr('');
      setAgree(false);
      setForm({ name: '', phone: '', email: '' });
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErr('');
    try {
      await sendLead({
        name: form.name,
        phone: form.phone,
        email: form.email,
        source,
        payload,
      });
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
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/5 hover:bg-fire hover:text-white transition flex items-center justify-center"
          style={{ color: 'hsl(var(--ink) / 0.6)' }}
        >
          <Icon name="X" size={18} />
        </button>

        {!sent ? (
          <>
            <h3
              className="font-oswald text-3xl font-bold mb-2 pr-8"
              style={{ color: 'hsl(var(--ink))' }}
            >
              {title}
            </h3>
            {productName ? (
              <p className="text-sm mb-6" style={{ color: 'hsl(var(--ink) / 0.6)' }}>
                По товару: <span className="font-bold" style={{ color: 'hsl(var(--ink))' }}>{productName}</span>
              </p>
            ) : (
              <p className="text-sm mb-6" style={{ color: 'hsl(var(--ink) / 0.6)' }}>
                {subtitle || 'Менеджер перезвонит и ответит на все вопросы.'}
              </p>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className={labelClass} style={labelStyle}>
                  Имя <span className="text-fire">*</span>
                </label>
                <input
                  ref={nameRef}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Петров"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Телефон <span className="text-fire">*</span>
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              {err && <div className="text-sm text-red-500">{err}</div>}

              <ConsentCheckbox checked={agree} onChange={setAgree} />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ color: '#fff' }}
              >
                {submitting ? 'Отправляем...' : 'Отправить'}
              </button>
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
