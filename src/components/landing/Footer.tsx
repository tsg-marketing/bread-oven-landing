import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-coal border-t border-coal-light pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember via-fire to-fire-dark flex items-center justify-center">
                <Icon name="Wheat" size={22} className="text-coal" />
              </div>
              <div className="leading-tight">
                <div className="font-oswald text-xl font-bold tracking-wider text-white">
                  ТЕХНО<span className="text-fire-gradient">СИБ</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">печное оборудование</div>
              </div>
            </div>
            <p className="text-white/60 text-sm max-w-md">
              Промышленное вакуум-упаковочное оборудование и хлебопекарные печи от проверенных производителей.
            </p>
          </div>

          <div>
            <div className="font-oswald text-white mb-3 uppercase text-sm tracking-wider">Навигация</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#catalog" className="hover:text-fire transition">Каталог</a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-fire transition">Подбор печи</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-fire transition">FAQ</a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-fire transition">Контакты</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-oswald text-white mb-3 uppercase text-sm tracking-wider">Офисы</div>
            <div className="space-y-4 text-sm">
              <div className="flex gap-2 text-white/70">
                <Icon name="MapPin" size={16} className="text-fire flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Москва</div>
                  ш. Энтузиастов, д. 56, стр. 32, офис 115
                </div>
              </div>
              <div className="flex gap-2 text-white/70">
                <Icon name="MapPin" size={16} className="text-fire flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Новосибирск</div>
                  ул. Электрозаводская, 2 к1, офис 304, 314
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-coal-light flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <div>© {new Date().getFullYear()} ТЕХНОСИБ. Все права защищены.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-fire transition">Политика конфиденциальности</a>
            <a href="#" className="hover:text-fire transition">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
