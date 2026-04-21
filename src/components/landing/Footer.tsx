import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer
      className="pt-16 pb-8 border-t"
      style={{
        background: 'linear-gradient(180deg, #1f1915 0%, #15100d 100%)',
        borderColor: 'rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.75)',
      }}
    >
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember via-fire to-fire-dark flex items-center justify-center">
                <Icon name="Wheat" size={22} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-oswald text-xl font-bold tracking-wider" style={{ color: '#fff' }}>
                  ТЕХНО<span className="text-fire-gradient">СИБ</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  печное оборудование
                </div>
              </div>
            </div>
            <p className="text-sm max-w-md" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Промышленное хлебопекарное, кондитерское и вакуум-упаковочное оборудование от проверенных производителей. Доставка по всей России, собственный сервис.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="tel:+73832000000"
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition hover:border-fire hover:text-fire"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
              >
                <Icon name="Phone" size={16} />
              </a>
              <a
                href="mailto:info@tehnosib.ru"
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition hover:border-fire hover:text-fire"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
              >
                <Icon name="Mail" size={16} />
              </a>
              <a
                href="https://wa.me/73832000000"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition hover:border-fire hover:text-fire"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
              >
                <Icon name="MessageCircle" size={16} />
              </a>
              <a
                href="https://t.me/tehnosib"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition hover:border-fire hover:text-fire"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
              >
                <Icon name="Send" size={16} />
              </a>
            </div>
          </div>

          <div>
            <div className="font-oswald mb-3 uppercase text-sm tracking-wider" style={{ color: '#fff' }}>
              Навигация
            </div>
            <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><a href="#catalog" className="hover:text-fire transition">Каталог</a></li>
              <li><a href="#tech" className="hover:text-fire transition">Технологии</a></li>
              <li><a href="#quiz" className="hover:text-fire transition">Подбор печи</a></li>
              <li><a href="#warranty" className="hover:text-fire transition">Гарантия</a></li>
              <li><a href="#service" className="hover:text-fire transition">Сервис</a></li>
              <li><a href="#faq" className="hover:text-fire transition">FAQ</a></li>
              <li><a href="#contacts" className="hover:text-fire transition">Контакты</a></li>
            </ul>
          </div>

          <div>
            <div className="font-oswald mb-3 uppercase text-sm tracking-wider" style={{ color: '#fff' }}>
              Офисы
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <Icon name="MapPin" size={16} className="text-fire flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium" style={{ color: '#fff' }}>Москва</div>
                  ш. Энтузиастов, д. 56, стр. 32, офис 115
                </div>
              </div>
              <div className="flex gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <Icon name="MapPin" size={16} className="text-fire flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium" style={{ color: '#fff' }}>Новосибирск</div>
                  ул. Станционная, 60, офис 304
                </div>
              </div>
              <div className="flex gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <Icon name="Phone" size={16} className="text-fire flex-shrink-0 mt-0.5" />
                <a href="tel:+73832000000" className="hover:text-fire transition">+7 (383) 200-00-00</a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
        >
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
