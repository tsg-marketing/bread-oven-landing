import { useState } from 'react';
import Icon from '@/components/ui/icon';

const Header = ({ onLead }: { onLead: (source: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
      style={{
        background: 'hsl(var(--coal) / 0.9)',
        borderColor: 'hsl(var(--coal-light))',
      }}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/files/ca89fddf-7bc6-4cd1-9d5f-5696c3edbc2d.jpg"
            alt="ТЕХНОСИБ"
            className="h-10 md:h-11 w-auto bg-white rounded-md p-1"
          />
          <div className="hidden sm:block leading-tight max-w-[260px]">
            <div className="text-[11px] md:text-xs" style={{ color: 'hsl(var(--ink) / 0.7)' }}>
              Профессиональное пищевое<br />и упаковочное оборудование
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm" style={{ color: 'hsl(var(--ink) / 0.75)' }}>
          <a href="#catalog" className="nav-link hover:text-fire transition">Каталог</a>
          <a href="#tech" className="nav-link hover:text-fire transition">Технологии</a>
          <a href="#warranty" className="nav-link hover:text-fire transition">Гарантия</a>
          <a href="#service" className="nav-link hover:text-fire transition">Сервис</a>
          <a href="#about" className="nav-link hover:text-fire transition">О компании</a>
          <a href="#faq" className="nav-link hover:text-fire transition">FAQ</a>
          <a href="#contacts" className="nav-link hover:text-fire transition">Контакты</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+78005004054" className="text-sm hover:text-fire transition flex items-center gap-2" style={{ color: 'hsl(var(--ink) / 0.8)' }}>
            <Icon name="Phone" size={14} />
            8-800-500-40-54
          </a>
          <button
            onClick={() => onLead('header')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-sm font-semibold hover:shadow-lg hover:shadow-fire/40 transition"
            style={{ color: '#fff' }}
          >
            Оставить заявку
          </button>
        </div>

        <button
          className="md:hidden"
          style={{ color: 'hsl(var(--ink))' }}
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <Icon name={open ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t animate-fade-in-up"
          style={{ background: 'hsl(var(--coal-mid))', borderColor: 'hsl(var(--coal-light))' }}
        >
          <div className="container py-4 flex flex-col gap-3">
            <a href="#catalog" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.8)' }}>Каталог</a>
            <a href="#tech" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.8)' }}>Технологии</a>
            <a href="#warranty" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.8)' }}>Гарантия</a>
            <a href="#service" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.8)' }}>Сервис</a>
            <a href="#about" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.8)' }}>О компании</a>
            <a href="#contacts" onClick={() => setOpen(false)} style={{ color: 'hsl(var(--ink) / 0.8)' }}>Контакты</a>
            <a href="tel:+78005004054" style={{ color: 'hsl(var(--ink) / 0.8)' }}>8-800-500-40-54</a>
            <button
              onClick={() => { setOpen(false); onLead('header'); }}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-fire to-fire-dark font-semibold"
              style={{ color: '#fff' }}
            >
              Оставить заявку
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;