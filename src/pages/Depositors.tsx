import { useState } from 'react';
import { useMeta } from '@/lib/useMeta';
import { useSessionPopup } from '@/lib/useSessionPopup';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import Contacts from '@/components/landing/Contacts';
import DepositorHero from '@/components/landing/depositor/DepositorHero';
import DepositorTypes from '@/components/landing/depositor/DepositorTypes';
import DepositorCatalog from '@/components/landing/depositor/DepositorCatalog';
import DepositorBenefits from '@/components/landing/depositor/DepositorBenefits';
import DepositorWhy from '@/components/landing/depositor/DepositorWhy';
import DepositorQuiz from '@/components/landing/depositor/DepositorQuiz';
import DepositorQuizModal from '@/components/landing/depositor/DepositorQuizModal';
import DepositorQuizTeaser from '@/components/landing/depositor/DepositorQuizTeaser';
import DepositorFAQ from '@/components/landing/depositor/DepositorFAQ';

const Depositors = () => {
  useMeta({
    title: 'Отсадочные машины для печенья, пряников и кремов — ТЕХНОСИБ',
    description:
      'Отсадочные машины и кондитерские депозиторы для пекарен, кондитерских и производств. Печенье, пряники, зефир, кремы и начинки. Гарантия, доставка по России и сервис.',
    image: 'https://pekarnoe.t-sib.ru/og/depositors.jpg',
    url: 'https://pekarnoe.t-sib.ru/otsadochnye-mashiny',
  });

  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('depositor');
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

  useSessionPopup(() => setQuizOpen(true));

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={() => openLead('depositor-header')} />
      <main>
        <DepositorHero onQuiz={() => setQuizOpen(true)} onCatalog={scrollToCatalog} />
        <DepositorCatalog onLead={openLead} perf={catFilter} setPerf={setCatFilter} />
        <DepositorTypes
          onCatalog={(c) => {
            setCatFilter(c);
            scrollToCatalog();
          }}
        />
        <DepositorBenefits />
        <DepositorWhy />
        <DepositorQuiz />
        <Service />
        <About />
        <DepositorFAQ />
        <Contacts what="модель отсадочной машины" source="depositor-contacts" />
      </main>
      <Footer />

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        source={leadSource}
        payload={leadPayload}
        title="Оставить заявку"
      />
      <DepositorQuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <DepositorQuizTeaser onOpen={() => setQuizOpen(true)} />
    </div>
  );
};

export default Depositors;
