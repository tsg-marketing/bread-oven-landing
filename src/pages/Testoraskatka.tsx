import { useEffect, useState } from 'react';
import { useMeta } from '@/lib/useMeta';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import Contacts from '@/components/landing/Contacts';
import RollingHero from '@/components/landing/rolling/RollingHero';
import RollingTypes from '@/components/landing/rolling/RollingTypes';
import RollingCatalog from '@/components/landing/rolling/RollingCatalog';
import RollingWhy from '@/components/landing/rolling/RollingWhy';
import RollingQuiz from '@/components/landing/rolling/RollingQuiz';
import RollingQuizModal from '@/components/landing/rolling/RollingQuizModal';
import RollingQuizTeaser from '@/components/landing/rolling/RollingQuizTeaser';
import RollingFAQ from '@/components/landing/rolling/RollingFAQ';

const Testoraskatka = () => {
  useMeta({
    title: 'Тестораскаточные машины для пекарен, кафе и производств — ТЕХНОСИБ',
    description:
      'Напольные, настольные и автоматические тестораскатки, машины для крутого теста и лапшерезки. Flamic, Danler, Hualian, Foodatlas, Miratek. Официальная гарантия и сервис.',
    image: 'https://pekarnoe.t-sib.ru/rolling/hero.webp',
    url: 'https://pekarnoe.t-sib.ru/testoraskatka',
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

  useEffect(() => {
    if (sessionStorage.getItem('rolling_quiz_shown')) return;
    const t = setTimeout(() => {
      sessionStorage.setItem('rolling_quiz_shown', '1');
      setQuizOpen(true);
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={() => openLead('rolling-header')} />
      <main>
        <RollingHero onQuiz={() => setQuizOpen(true)} onCatalog={scrollToCatalog} />
        <RollingCatalog onLead={openLead} cat={catFilter} setCat={setCatFilter} />
        <RollingTypes
          onCatalog={(c) => {
            setCatFilter(c);
            scrollToCatalog();
          }}
        />
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