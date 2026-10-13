import { useEffect, useState } from 'react';
import { useMeta } from '@/lib/useMeta';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import Contacts from '@/components/landing/Contacts';
import ProoferHero from '@/components/landing/proofer/ProoferHero';
import ProoferTypes from '@/components/landing/proofer/ProoferTypes';
import ProoferCatalog from '@/components/landing/proofer/ProoferCatalog';
import ProoferWhy from '@/components/landing/proofer/ProoferWhy';
import ProoferQuiz from '@/components/landing/proofer/ProoferQuiz';
import ProoferQuizModal from '@/components/landing/proofer/ProoferQuizModal';
import ProoferQuizTeaser from '@/components/landing/proofer/ProoferQuizTeaser';
import ProoferFAQ from '@/components/landing/proofer/ProoferFAQ';

const Proofers = () => {
  useMeta({
    title: 'Расстоечные шкафы для пекарен, кафе и хлебозаводов — ТЕХНОСИБ',
    description:
      'Расстоечные шкафы под конвекционную печь, на противни и под тележки. Точная температура и влажность, официальная гарантия, доставка по России и сервис.',
    image: 'https://pekarnoe.t-sib.ru/og/proofers.jpg',
    url: 'https://pekarnoe.t-sib.ru/rasstoechnye-shkafy',
  });

  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('proofer');
  const [catFilter, setCatFilter] = useState('');
  const [leadPayload, setLeadPayload] = useState<Record<string, unknown> | undefined>();

  const openLead = (source: string, payload?: Record<string, unknown>) => {
    setLeadSource(source);
    setLeadPayload(payload);
    setLeadOpen(true);
  };

  const scrollToCatalog = () => {
    document.getElementById('assortment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (sessionStorage.getItem('proofer_quiz_shown')) return;
    const t = setTimeout(() => {
      sessionStorage.setItem('proofer_quiz_shown', '1');
      setQuizOpen(true);
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={() => openLead('proofer-header')} />
      <main>
        <ProoferHero onQuiz={() => setQuizOpen(true)} onCatalog={scrollToCatalog} />
        <ProoferCatalog onLead={openLead} capacity={catFilter} setCapacity={setCatFilter} />
        <ProoferTypes
          onCatalog={(c) => {
            setCatFilter(c);
            scrollToCatalog();
          }}
        />
        <ProoferWhy />
        <ProoferQuiz />
        <Service />
        <About />
        <ProoferFAQ />
        <Contacts what="модель расстоечного шкафа" source="proofer-contacts" />
      </main>
      <Footer />

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        source={leadSource}
        payload={leadPayload}
        title="Оставить заявку"
      />
      <ProoferQuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <ProoferQuizTeaser onOpen={() => setQuizOpen(true)} />
    </div>
  );
};

export default Proofers;
