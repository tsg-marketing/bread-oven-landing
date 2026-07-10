import { useEffect, useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import Service from '@/components/landing/Service';
import About from '@/components/landing/About';
import MixersHero from '@/components/landing/mixers/MixersHero';
import MixersTypes from '@/components/landing/mixers/MixersTypes';
import MixersCatalog from '@/components/landing/mixers/MixersCatalog';
import MixersWhy from '@/components/landing/mixers/MixersWhy';
import MixersBrands from '@/components/landing/mixers/MixersBrands';
import MixersQuiz from '@/components/landing/mixers/MixersQuiz';
import MixersQuizModal from '@/components/landing/mixers/MixersQuizModal';
import MixersQuizTeaser from '@/components/landing/mixers/MixersQuizTeaser';
import MixersFAQ from '@/components/landing/mixers/MixersFAQ';
import MixersLeadForm from '@/components/landing/mixers/MixersLeadForm';

const Mixers = () => {
  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('mixers');
  const [leadPayload, setLeadPayload] = useState<Record<string, unknown> | undefined>();
  const [leadTitle, setLeadTitle] = useState('Оставьте заявку');

  const openLead = (source: string, payload?: Record<string, unknown>, title?: string) => {
    setLeadSource(source);
    setLeadPayload(payload);
    setLeadTitle(title || 'Оставьте заявку');
    setLeadOpen(true);
  };

  const scrollToCatalog = () => {
    document.getElementById('assortment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Автооткрытие квиза 1 раз за сессию через 30 секунд после захода
  useEffect(() => {
    if (sessionStorage.getItem('mixers_quiz_shown')) return;
    const t = setTimeout(() => {
      sessionStorage.setItem('mixers_quiz_shown', '1');
      setQuizOpen(true);
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={() => openLead('mixers-header')} />
      <main>
        <MixersHero onQuiz={() => setQuizOpen(true)} onCatalog={scrollToCatalog} />
        <MixersTypes onCatalog={scrollToCatalog} />
        <MixersCatalog onLead={(src, payload) => openLead(src, payload, 'Оставьте заявку')} />
        <MixersWhy />
        <MixersBrands />
        <MixersQuiz />
        <Service />
        <About />
        <MixersFAQ />
        <MixersLeadForm />
      </main>
      <Footer />

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        source={leadSource}
        payload={leadPayload}
        title={leadTitle}
      />
      <MixersQuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <MixersQuizTeaser onOpen={() => setQuizOpen(true)} />
    </div>
  );
};

export default Mixers;
