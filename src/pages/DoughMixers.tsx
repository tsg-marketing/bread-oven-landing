import { useState } from 'react';
import { useMeta } from '@/lib/useMeta';
import { useSessionPopup } from '@/lib/useSessionPopup';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import Contacts from '@/components/landing/Contacts';
import DoughHero from '@/components/landing/dough/DoughHero';
import DoughTypes from '@/components/landing/dough/DoughTypes';
import DoughCatalog from '@/components/landing/dough/DoughCatalog';
import NewArrivals from '@/components/landing/NewArrivals';
import { arrivalsFor } from '@/components/landing/newArrivalsData';
import DoughBenefits from '@/components/landing/dough/DoughBenefits';
import DoughWhy from '@/components/landing/dough/DoughWhy';
import DoughQuiz from '@/components/landing/dough/DoughQuiz';
import DoughQuizModal from '@/components/landing/dough/DoughQuizModal';
import DoughQuizTeaser from '@/components/landing/dough/DoughQuizTeaser';
import DoughFAQ from '@/components/landing/dough/DoughFAQ';

const ARRIVALS = arrivalsFor('/testomesi');

const DoughMixers = () => {
  useMeta({
    title: 'Тестомесы для пекарен, пиццерий и производств — ТЕХНОСИБ',
    description:
      'Спиральные, лопастные, горизонтальные и вакуумные тестомесы с дежой от 10 до 420 л. Подбор под ваш объём теста, официальная гарантия, доставка по России и сервис.',
    image: 'https://pekarnoe.t-sib.ru/og/testomesi.jpg',
    url: 'https://pekarnoe.t-sib.ru/testomesi',
    canonical: 'https://t-sib.ru/catalog/khlebopekarnoe-i-konditerskoe-oborudovanie/testomesilnoe-oborudovanie/',
  });

  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('dough');
  const [catFilter, setCatFilter] = useState('380');
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
        <NewArrivals items={ARRIVALS} catalogKey="dough-catalog" source="dough-new-arrivals" />
        <DoughBenefits />
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