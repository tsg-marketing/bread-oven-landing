import { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LeadModal from '@/components/landing/LeadModal';
import QuizModal from '@/components/landing/QuizModal';
import MixersHero from '@/components/landing/mixers/MixersHero';
import MixersTypes from '@/components/landing/mixers/MixersTypes';
import MixersCatalog from '@/components/landing/mixers/MixersCatalog';
import MixersWhy from '@/components/landing/mixers/MixersWhy';
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

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={() => openLead('mixers-header')} />
      <main>
        <MixersHero onQuiz={() => setQuizOpen(true)} onCatalog={scrollToCatalog} />
        <MixersTypes onCatalog={scrollToCatalog} />
        <MixersCatalog onLead={(src, payload) => openLead(src, payload, 'Оставьте заявку')} />
        <MixersWhy />
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
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default Mixers;
