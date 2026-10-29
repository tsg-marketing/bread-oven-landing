import { useState } from 'react';
import { useMeta } from '@/lib/useMeta';
import { useSessionPopup } from '@/lib/useSessionPopup';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import Contacts from '@/components/landing/Contacts';
import RollingHero from '@/components/landing/rolling/RollingHero';
import RollingTypes from '@/components/landing/rolling/RollingTypes';
import RollingCatalog from '@/components/landing/rolling/RollingCatalog';
import RollingBenefits from '@/components/landing/rolling/RollingBenefits';
import RollingWhy from '@/components/landing/rolling/RollingWhy';
import RollingQuiz from '@/components/landing/rolling/RollingQuiz';
import RollingQuizModal from '@/components/landing/rolling/RollingQuizModal';
import RollingQuizTeaser from '@/components/landing/rolling/RollingQuizTeaser';
import RollingFAQ from '@/components/landing/rolling/RollingFAQ';

const Testoraskatka = () => {
  useMeta({
    title: 'Тестораскаточные машины для пекарен, кафе и производств — ТЕХНОСИБ',
    description:
      'Напольные, настольные и автоматические тестораскатки, машины для крутого теста и лапшерезки. Подбор под задачу, официальная гарантия, доставка по России и сервис.',
    image: 'https://pekarnoe.t-sib.ru/og/rolling.jpg',
    url: 'https://pekarnoe.t-sib.ru/testoraskatka',
    canonical: 'https://t-sib.ru/catalog/khlebopekarnoe-i-konditerskoe-oborudovanie/testoraskatochnye-mashiny/',
  });

  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('rolling');
  const [catFilter, setCatFilter] = useState('floor');
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
      <Header onLead={() => openLead('rolling-header')} />
      <main>
        <RollingHero onQuiz={() => setQuizOpen(true)} onCatalog={scrollToCatalog} />
        <RollingTypes
          onCatalog={(c) => {
            setCatFilter(c);
            scrollToCatalog();
          }}
        />
        <RollingCatalog onLead={openLead} cat={catFilter} setCat={setCatFilter} />
        <RollingBenefits />
        <RollingWhy />
        <RollingQuiz />
        <Service />
        <About />
        <RollingFAQ />
        <Contacts what="модель тестораскатки" source="rolling-contacts" />
      </main>
      <Footer />

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        source={leadSource}
        payload={leadPayload}
        title="Оставить заявку"
      />
      <RollingQuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <RollingQuizTeaser onOpen={() => setQuizOpen(true)} />
    </div>
  );
};

export default Testoraskatka;