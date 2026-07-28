import { getUtmData } from './utm';
import { getYaClientId, ymGoal } from './ym';

export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  source: string;
  payload?: Record<string, unknown>;
};

export async function sendLead(data: LeadInput): Promise<void> {
  const body: Record<string, unknown> = {
    name: data.name,
    phone: data.phone,
    email: data.email || '',
    source: data.source,
    page: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    sent_at: new Date().toISOString(),
  };

  const utm = getUtmData();
  if (Object.keys(utm).length) {
    Object.assign(body, utm);
    body.utm = utm;
  }

  if (data.payload && typeof data.payload === 'object') {
    Object.assign(body, data.payload);
    body.payload = data.payload;
    const p = data.payload as Record<string, unknown>;
    if (p.productName) body.product_name = p.productName;
    if (p.productId) body.product_id = p.productId;
    if (p.answers) body.quiz_answers = p.answers;
  }

  // ClientID Метрики — опционально, не блокирует отправку при сбое
  const yaClientId = await getYaClientId().catch(() => '');
  if (yaClientId) {
    body.yaClientId = yaClientId;
    const prevMessage = typeof body.message === 'string' ? body.message : '';
    body.message = prevMessage
      ? `${prevMessage}\nClientID: ${yaClientId}`
      : `ClientID: ${yaClientId}`;
  }

  const res = await fetch('/api/b24-send-lead.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('fail');

  ymGoal('send_form', { source: data.source });
}