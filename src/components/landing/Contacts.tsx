import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';

export type ContactsRef = {
  focus: (source?: string) => void;
};

const Contacts = forwardRef<ContactsRef>((_, ref) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const [source, setSource] = useState('contacts');
  const nameRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useImperativeHandle(ref, () => ({
    focus: (src) => {
      if (src) setSource(src);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => nameRef.current?.focus(), 500);
    },
  }));

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
          email: form.email,
          source,
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
    <section ref={sectionRef} id="contacts" className="py-24 bg-coal relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-fire/25 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-ember/15 blur-[120px]" />
      </div>

      <div className="container relative max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
            <span className="w-8 h-px bg-fire" /> ОСТАВЬТЕ ЗАЯВКУ <span className="w-8 h-px bg-fire" />
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-4">
            Не знаете, какую печь выбрать? <br />
            <span className="text-fire-gradient">Мы поможем</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Технолог-эксперт подберёт модель под ваши объёмы, помещение и бюджет за 15 минут. Бесплатно.
          </p>
        </div>

        <div className="bg-coal-mid rounded-3xl p-8 md:p-10 border border-coal-light">
          {!sent ? (
            <form onSubmit={submit} className="space-y-4">
              <input
                ref={nameRef}
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Имя"
                className="w-full bg-coal border border-coal-light focus:border-fire rounded-xl px-4 py-3.5 text-white outline-none"
              />
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Телефон"
                className="w-full bg-coal border border-coal-light focus:border-fire rounded-xl px-4 py-3.5 text-white outline-none"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-coal border border-coal-light focus:border-fire rounded-xl px-4 py-3.5 text-white outline-none"
              />
              {err && <div className="text-sm text-red-400">{err}</div>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-white font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? 'Отправляем...' : 'Отправить'} <Icon name="Send" size={18} />
              </button>
              <p className="text-xs text-white/40 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          ) : (
            <div className="text-center py-10 animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-5 flex items-center justify-center animate-pulse-glow">
                <Icon name="CheckCheck" size={32} className="text-coal" />
              </div>
              <h3 className="font-oswald text-2xl text-white mb-2">Заявка отправлена!</h3>
              <p className="text-white/60">Технолог-эксперт свяжется с вами в течение 15 минут.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

Contacts.displayName = 'Contacts';

export default Contacts;
