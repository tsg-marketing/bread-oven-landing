import Icon from '@/components/ui/icon';

const About = () => {
  return (
    <section id="about" className="py-24 bg-coal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-fire/10 blur-[150px]" />
      <div className="container relative max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 text-fire text-sm font-semibold mb-3">
          <span className="w-8 h-px bg-fire" /> О КОМПАНИИ <span className="w-8 h-px bg-fire" />
        </div>
        <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-6">
          О компании <span className="text-fire-gradient">ТЕХНОСИБ</span>
        </h2>

        <div className="mt-10 bg-coal-mid rounded-3xl border border-coal-light p-10 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-fire/10 blur-3xl" />
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ember via-fire to-fire-dark flex items-center justify-center mb-5 animate-pulse-glow">
              <Icon name="Building2" size={36} className="text-coal" />
            </div>
            <p className="text-white/70 max-w-xl">
              Информация о компании будет предоставлена позже. Мы поставляем промышленное хлебопекарное, кондитерское и вакуум-упаковочное оборудование по всей России и СНГ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
