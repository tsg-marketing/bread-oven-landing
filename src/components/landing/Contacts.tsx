import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';

export type ContactsRef = {
  focus: (source?: string) => void;
};

const CONTACT_INFO = [
  { icon: 'Phone', label: 'Телефон', value: '+7 (383) 200-00-00', href: 'tel:+73832000000' },
  { icon: 'Mail', label: 'Email', value: 'info@tehnosib.ru', href: 'mailto:info@tehnosib.ru' },
  { icon: 'MapPin', label: 'Адрес', value: 'г. Новосибирск, ул. Станционная, 60', href: null },
  { icon: 'Clock', label: 'Режим работы', value: 'Пн–Пт 9:00–18:00', href: null },
];

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
    <section
      ref={sectionRef}
      id="contacts"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, hsl(var(--coal-mid)) 0%, hsl(var(--coal)) 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-fire/15 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-ember/10 blur-[120px]" />
      </div>

      <div className="container relative max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
            <span className="w-8 h-px bg-fire" /> ОСТАВЬТЕ ЗАЯВКУ <span className="w-8 h-px bg-fire" />
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-4" style={{ color: 'hsl(var(--ink))' }}>
            Не знаете, какую печь выбрать? <br />
            <span className="text-fire-gradient">Мы поможем</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(var(--ink) / 0.7)' }}>
            Технолог-эксперт подберёт модель под ваши объёмы, помещение и бюджет за 15 минут. Бесплатно.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Контактная информация */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_INFO.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border shadow-sm hover:shadow-md transition"
                style={{ borderColor: 'hsl(var(--coal-light))' }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fire/15 to-ember/10 border border-fire/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} size={20} className="text-fire" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--ink) / 0.5)' }}>
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="font-semibold hover:text-fire transition block truncate"
                      style={{ color: 'hsl(var(--ink))' }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="font-semibold" style={{ color: 'hsl(var(--ink))' }}>
                      {c.value}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <a
                href="https://wa.me/73832000000"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <Icon name="MessageCircle" size={18} />
                WhatsApp
              </a>
              <a
                href="https://t.me/tehnosib"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#0088cc] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <Icon name="Send" size={18} />
                Telegram
              </a>
            </div>
          </div>

          {/* Форма */}
          <div
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 border shadow-lg"
            style={{ borderColor: 'hsl(var(--coal-light))' }}
          >
            {!sent ? (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="font-oswald text-2xl font-bold mb-2" style={{ color: 'hsl(var(--ink))' }}>
                  Получите подбор печи за 15 минут
                </h3>
                <p className="text-sm mb-4" style={{ color: 'hsl(var(--ink) / 0.6)' }}>
                  Оставьте контакты — технолог-эксперт перезвонит и подберёт оптимальное решение.
                </p>
                <input
                  ref={nameRef}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Имя"
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
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
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
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark font-semibold hover:shadow-lg hover:shadow-fire/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ color: '#fff' }}
                >
                  {submitting ? 'Отправляем...' : 'Отправить'} <Icon name="Send" size={18} />
                </button>
                <p className="text-xs text-center" style={{ color: 'hsl(var(--ink) / 0.45)' }}>
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            ) : (
              <div className="text-center py-10 animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-5 flex items-center justify-center animate-pulse-glow">
                  <Icon name="CheckCheck" size={32} className="text-white" />
                </div>
                <h3 className="font-oswald text-2xl mb-2" style={{ color: 'hsl(var(--ink))' }}>
                  Заявка отправлена!
                </h3>
                <p style={{ color: 'hsl(var(--ink) / 0.6)' }}>
                  Технолог-эксперт свяжется с вами в течение 15 минут.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

Contacts.displayName = 'Contacts';

export default Contacts;
