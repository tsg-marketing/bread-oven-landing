import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { ymGoal } from '@/lib/ym';

const EQUIPMENT = [
  { href: '/mixers', label: 'Планетарные миксеры', icon: 'CakeSlice' },
  { href: '/testomesi', label: 'Тестомесы', icon: 'Wheat' },
  { href: '/testoraskatka', label: 'Тестораскаточные машины', icon: 'Layers' },
  { href: '/rasstoechnye-shkafy', label: 'Расстоечные шкафы', icon: 'Thermometer' },
  { href: '/otsadochnye-mashiny', label: 'Отсадочные машины', icon: 'Cookie' },
];

const Header = ({ onLead }: { onLead: (source: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
      style={{
        background: 'hsl(var(--coal) / 0.92)',
        borderColor: 'hsl(var(--coal-light))',
      }}
    >
      <div className="container flex items-center justify-between gap-6 h-24">
        {/* Логотип + слоган под ним */}
        <a href="/#home" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="https://cdn.poehali.dev/files/ca89fddf-7bc6-4cd1-9d5f-5696c3edbc2d.jpg"
            alt="Техно-Сиб"
            className="h-12 md:h-14 w-auto bg-white rounded-lg p-1.5 shadow-md"
          />
          <div className="hidden sm:flex flex-col leading-tight max-w-[240px]">
            <span
              className="text-[12px] md:text-[13px]"
              style={{ color: 'hsl(var(--ink) / 0.8)' }}
            >
              Профессиональное пищевое и упаковочное оборудование
            </span>
          </div>
        </a>

        {/* Навигация по центру */}
        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-[15px] font-medium flex-1 justify-center"
          style={{ color: 'hsl(var(--ink) / 0.85)' }}
        >
          <a href="/#catalog" className="nav-link hover:text-fire transition whitespace-nowrap">
            Каталог
          </a>
          <div className="relative group">
            <button className="nav-link hover:text-fire transition whitespace-nowrap flex items-center gap-1">
              Оборудование
              <Icon name="ChevronDown" size={14} className="group-hover:rotate-180 transition" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block group-focus-within:block z-50">
              <div
                className="min-w-[230px] rounded-xl border shadow-xl p-2 bg-white"
                style={{ borderColor: 'hsl(var(--coal-light))' }}
              >
                {EQUIPMENT.map((e) => (
                  <a
                    key={e.href}
                    href={e.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-fire/10 hover:text-fire transition whitespace-nowrap"
                    style={{ color: 'hsl(var(--ink))' }}
                  >
                    <Icon name={e.icon} size={16} className="text-fire" />
                    {e.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="/#tech" className="nav-link hover:text-fire transition whitespace-nowrap">
            Технологии
          </a>
          <a href="/#warranty" className="nav-link hover:text-fire transition whitespace-nowrap">
            Гарантия
          </a>
          <a href="/#service" className="nav-link hover:text-fire transition whitespace-nowrap">
            Сервис
          </a>
          <a href="/#about" className="nav-link hover:text-fire transition whitespace-nowrap">
            О&nbsp;компании
          </a>
          <a href="/#faq" className="nav-link hover:text-fire transition whitespace-nowrap">
            FAQ
          </a>
          <a href="/#contacts" className="nav-link hover:text-fire transition whitespace-nowrap">
            Контакты
          </a>
        </nav>

        {/* Правый блок: контакты сверху, кнопка снизу */}
        <div className="hidden md:flex items-stretch gap-4 flex-shrink-0">
          <div className="flex flex-col items-end justify-center gap-1 leading-tight">
            <a
              href="tel:+78005338812"
              onClick={() => ymGoal('click_phone', { place: 'header' })}
              className="text-[15px] font-bold hover:text-fire transition flex items-center gap-1.5 whitespace-nowrap"
              style={{ color: 'hsl(var(--ink))' }}
            >
              <Icon name="Phone" size={14} className="text-fire" />
              8-800-533-88-12
            </a>
            <a
              href="mailto:pekarnoe@t-sib.ru"
              onClick={() => ymGoal('click_email', { place: 'header' })}
              className="text-[13px] hover:text-fire transition flex items-center gap-1.5 whitespace-nowrap"
              style={{ color: 'hsl(var(--ink) / 0.75)' }}
            >
              <Icon name="Mail" size={13} className="text-fire/80" />
              pekarnoe@t-sib.ru
            </a>
          </div>
          <button
            onClick={() => onLead('header')}
            className="group px-5 lg:px-6 rounded-xl bg-gradient-to-r from-fire to-fire-dark text-sm lg:text-[15px] font-semibold hover:shadow-xl hover:shadow-fire/40 transition flex items-center gap-2 whitespace-nowrap"
            style={{ color: '#fff' }}
          >
            <Icon name="Send" size={16} />
            Оставить заявку
          </button>
        </div>

        {/* Бургер для мобилки */}
        <button
          className="md:hidden"
          style={{ color: 'hsl(var(--ink))' }}
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div
          className="md:hidden border-t animate-fade-in-up"
          style={{ background: 'hsl(var(--coal-mid))', borderColor: 'hsl(var(--coal-light))' }}
        >
          <div className="container py-5 flex flex-col gap-3 text-lg font-medium">
            <a href="/#catalog" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.9)' }}>
              Каталог
            </a>
            <div>
              <div style={{ color: 'hsl(var(--ink) / 0.9)' }}>Оборудование</div>
              <div className="mt-2 pl-4 flex flex-col gap-2 text-base border-l-2 border-fire/40">
                {EQUIPMENT.map((e) => (
                  <a key={e.href} href={e.href} onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.8)' }}>
                    {e.label}
                  </a>
                ))}
              </div>
            </div>
            <a href="/#tech" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.9)' }}>
              Технологии
            </a>
            <a href="/#warranty" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.9)' }}>
              Гарантия
            </a>
            <a href="/#service" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.9)' }}>
              Сервис
            </a>
            <a href="/#about" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.9)' }}>
              О компании
            </a>
            <a href="/#contacts" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.9)' }}>
              Контакты
            </a>
            <div className="pt-3 border-t" style={{ borderColor: 'hsl(var(--coal-light))' }}>
              <a
                href="tel:+78005338812"
                onClick={() => ymGoal('click_phone', { place: 'header-mobile' })}
                className="flex items-center gap-2 py-2 font-bold"
                style={{ color: 'hsl(var(--ink))' }}
              >
                <Icon name="Phone" size={16} className="text-fire" />
                8-800-533-88-12
              </a>
              <a
                href="mailto:pekarnoe@t-sib.ru"
                onClick={() => ymGoal('click_email', { place: 'header-mobile' })}
                className="flex items-center gap-2 py-2"
                style={{ color: 'hsl(var(--ink) / 0.85)' }}
              >
                <Icon name="Mail" size={16} className="text-fire" />
                pekarnoe@t-sib.ru
              </a>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                onLead('header');
              }}
              className="w-full px-4 py-3.5 rounded-lg bg-gradient-to-r from-fire to-fire-dark font-semibold flex items-center justify-center gap-2"
              style={{ color: '#fff' }}
            >
              <Icon name="Send" size={16} />
              Оставить заявку
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;