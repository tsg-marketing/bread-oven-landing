import { useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Advantages from '@/components/landing/Advantages';
import Catalog from '@/components/landing/Catalog';
import Comparison from '@/components/landing/Comparison';
import Quiz from '@/components/landing/Quiz';
import Technologies from '@/components/landing/Technologies';
import Warranty from '@/components/landing/Warranty';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import FAQ from '@/components/landing/FAQ';
import Contacts from '@/components/landing/Contacts';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import QuizModal from '@/components/landing/QuizModal';
import QuizTeaser from '@/components/landing/QuizTeaser';

const Index = () => {
  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('lead');
  const [leadPayload, setLeadPayload] = useState<Record<string, unknown> | undefined>();
  const [leadTitle, setLeadTitle] = useState('Оставьте заявку');

  const openLead = (source: string, payload?: Record<string, unknown>, title?: string) => {
    setLeadSource(source);
    setLeadPayload(payload);
    setLeadTitle(title || 'Оставьте заявку');
    setLeadOpen(true);
  };

  const openQuiz = () => setQuizOpen(true);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={() => openLead('header')} />
      <main>
        <Hero onQuiz={openQuiz} onKp={() => openLead('hero-kp', undefined, 'Запросить КП')} />
        <Advantages />
        <Catalog onLead={(src, payload) => openLead(src, payload, 'Оставьте заявку')} />
        <Comparison />
        <Quiz />
        <Technologies />
        <Warranty />
        <Service />
        <About />
        <FAQ />
        <Contacts />
      </main>
      <Footer />

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        source={leadSource}
        payload={leadPayload}
        title={leadTitle}
      />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <QuizTeaser onOpen={openQuiz} />
    </div>
  );
};

export default Index;