import { useEffect, useState } from 'react';
import { useMeta } from '@/lib/useMeta';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import Contacts from '@/components/landing/Contacts';
import DoughHero from '@/components/landing/dough/DoughHero';
import DoughTypes from '@/components/landing/dough/DoughTypes';
import DoughCatalog from '@/components/landing/dough/DoughCatalog';
import DoughWhy from '@/components/landing/dough/DoughWhy';
import DoughQuiz from '@/components/landing/dough/DoughQuiz';
import DoughQuizModal from '@/components/landing/dough/DoughQuizModal';
import DoughQuizTeaser from '@/components/landing/dough/DoughQuizTeaser';
import DoughFAQ from '@/components/landing/dough/DoughFAQ';

const DoughMixers = () => {
  useMeta({
    title: 'Тестомесы для пекарен, пиццерий и производств — ТЕХНОСИБ',
    description:
      'Спиральные, лопастные, горизонтальные и вакуумные тестомесы: дежа от 10 до 420 л. Logiudice Forni, Apach, Hurakan, Danler, Miratek. Официальная гарантия и сервис.',
    image: 'https://cdn.poehali.dev/projects/dd4f9dfb-21af-43ef-9911-ef437189e13f/files/155147c6-a2df-4750-bf62-ddf2f0f61e80.jpg',
    url: 'https://pekarnoe.t-sib.ru/dough-mixers',
  });

  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('dough');
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
    if (sessionStorage.getItem('dough_quiz_shown')) return;
    const t = setTimeout(() => {
      sessionStorage.setItem('dough_quiz_shown', '1');
      setQuizOpen(true);
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={() => openLead('dough-header')} />
      <main>
        <DoughHero onQuiz={() => setQuizOpen(true)} onCatalog={scrollToCatalog} />
        <DoughTypes
          onCatalog={(c) => {
            setCatFilter(c);
            scrollToCatalog();
          }}
        />
        <DoughCatalog onLead={openLead} cat={catFilter} setCat={setCatFilter} />
        <DoughWhy />
        <DoughQuiz />
        <Service />
        <About />
        <DoughFAQ />
        <Contacts what="модель тестомеса" source="dough-contacts" />
      </main>
      <Footer />

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        source={leadSource}
        payload={leadPayload}
        title="Оставить заявку"
      />
      <DoughQuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <DoughQuizTeaser onOpen={() => setQuizOpen(true)} />
    </div>
  );
};

export default DoughMixers;