import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { sendLead } from '@/lib/sendLead';
import ConsentNote from '../ConsentNote';

const MixersLeadForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', volume: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErr('');
    try {
      await sendLead({
        name: form.name,
        phone: form.phone,
        source: 'mixers-form',
        payload: {
          volume: form.volume,
          comment: form.comment,
          productName: 'Подбор миксера',
        },
      });
      setSent(true);
    } catch {
      setErr('Не удалось отправить. Попробуйте ещё раз или позвоните нам.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="lead" className="py-24 bg-coal-mid">
      <div className="container">
        <div
          className="max-w-2xl mx-auto rounded-3xl border p-6 md:p-10 shadow-2xl"
          style={{ background: 'hsl(var(--coal))', borderColor: 'hsl(var(--coal-light))' }}
        >
          {!sent ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fire to-fire-dark flex items-center justify-center mb-5 shadow-lg shadow-fire/40">
                <Icon name="Send" size={24} className="text-white" />
              </div>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase text-white mb-2">
                Подберём миксер под вашу задачу и бюджет
              </h2>
              <p className="text-white/70 mb-6">
                Оставьте контакты — подберём оптимальную модель по объёму, продукту и бюджету.
              </p>

              <form onSubmit={submit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Имя"
                    className="w-full bg-coal-mid border-2 border-coal-light focus:border-fire rounded-xl px-4 py-3.5 text-white outline-none transition"
                  />
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Телефон"
                    className="w-full bg-coal-mid border-2 border-coal-light focus:border-fire rounded-xl px-4 py-3.5 text-white outline-none transition"
                  />
                </div>
                <input
                  value={form.volume}
                  onChange={(e) => setForm({ ...form, volume: e.target.value })}
                  placeholder="Объём производства (кг/смену) или нужный объём дежи"
                  className="w-full bg-coal-mid border-2 border-coal-light focus:border-fire rounded-xl px-4 py-3.5 text-white outline-none transition"
                />
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Комментарий"
                  rows={3}
                  className="w-full bg-coal-mid border-2 border-coal-light focus:border-fire rounded-xl px-4 py-3.5 text-white outline-none transition resize-none"
                />
                {err && <div className="text-sm text-red-400">{err}</div>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-fire to-fire-dark font-semibold text-white hover:shadow-lg hover:shadow-fire/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? 'Отправляем...' : 'Отправить заявку'}
                  <Icon name="Send" size={16} />
                </button>
                <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                  <Icon name="Clock" size={14} className="text-fire" />
                  Перезвоним в течение 15 минут в рабочее время.
                </div>
                <ConsentNote className="text-center" tone="light" />
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire to-ember mx-auto mb-4 flex items-center justify-center">
                <Icon name="Check" size={30} className="text-white" />
              </div>
              <h3 className="font-oswald text-2xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="text-white/70">Наш менеджер свяжется с вами в ближайшее время.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MixersLeadForm;
