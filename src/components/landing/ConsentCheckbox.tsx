const POLICY_URL = 'https://t-sib.ru/assets/politika_t-sib16.05.25.pdf';
const CONSENT_URL = 'https://t-sib.ru/assets/soglasie_t-sib16.05.25.pdf';

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
  tone?: 'dark' | 'light';
};

/** Чекбокс-согласие на обработку ПД. Ставится перед кнопкой «Отправить». */
const ConsentCheckbox = ({ checked, onChange, className = '', tone = 'dark' }: Props) => {
  const textColor = tone === 'light' ? 'rgba(255,255,255,0.6)' : 'hsl(var(--ink) / 0.6)';
  const linkColor = tone === 'light' ? 'rgba(255,255,255,0.85)' : 'hsl(var(--ink) / 0.85)';

  return (
    <label className={`flex items-start gap-2.5 cursor-pointer select-none ${className}`}>
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-2 accent-fire cursor-pointer"
        style={{ borderColor: 'hsl(var(--coal-light))' }}
      />
      <span className="text-[11px] leading-snug" style={{ color: textColor }}>
        Отправляя форму, я соглашаюсь с{' '}
        <a
          href={POLICY_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="underline hover:text-fire transition"
          style={{ color: linkColor }}
        >
          политикой обработки персональных данных
        </a>{' '}
        и даю{' '}
        <a
          href={CONSENT_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="underline hover:text-fire transition"
          style={{ color: linkColor }}
        >
          согласие на обработку персональных данных
        </a>
        .
      </span>
    </label>
  );
};

export default ConsentCheckbox;
