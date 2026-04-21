import { useRef } from 'react';
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
import Contacts, { ContactsRef } from '@/components/landing/Contacts';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const contactsRef = useRef<ContactsRef>(null);

  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContacts = (source = 'contacts') => {
    contactsRef.current?.focus(source);
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--coal))', color: 'hsl(var(--ink))' }}>
      <Header onLead={scrollToContacts} />
      <main>
        <Hero onQuiz={scrollToQuiz} onKp={() => scrollToContacts('hero-kp')} />
        <Advantages />
        <Catalog onLead={(src) => scrollToContacts(src)} />
        <Comparison />
        <Quiz />
        <Technologies />
        <Warranty />
        <Service />
        <About />
        <FAQ />
        <Contacts ref={contactsRef} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;