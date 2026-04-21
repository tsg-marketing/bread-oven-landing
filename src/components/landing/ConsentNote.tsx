const POLICY_URL = 'https://t-sib.ru/assets/politika_t-sib16.05.25.pdf';
const CONSENT_URL = 'https://t-sib.ru/assets/soglasie_t-sib16.05.25.pdf';

const ConsentNote = ({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) => {
  const color = tone === 'light' ? 'rgba(255,255,255,0.55)' : 'hsl(var(--ink) / 0.55)';
  const linkColor = tone === 'light' ? 'rgba(255,255,255,0.8)' : 'hsl(var(--ink) / 0.8)';
  return (
    <p className={`text-[11px] leading-snug ${className}`} style={{ color }}>
      Отправляя форму, я соглашаюсь с{' '}
      <a
        href={POLICY_URL}
        target="_blank"
        rel="noreferrer"
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
        className="underline hover:text-fire transition"
        style={{ color: linkColor }}
      >
        согласие на обработку персональных данных
      </a>
      .
    </p>
  );
};

export default ConsentNote;
