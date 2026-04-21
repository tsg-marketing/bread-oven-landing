import { useState } from 'react';
import Icon from '@/components/ui/icon';

const Header = ({ onLead }: { onLead: (source: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-coal/85 backdrop-blur-xl border-b border-coal-light">
      <div className="container flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember via-fire to-fire-dark flex items-center justify-center shadow-lg shadow-fire/30">
            <Icon name="Wheat" size={22} className="text-coal" />
          </div>
          <div className="leading-tight">
            <div className="font-oswald text-xl font-bold tracking-wider text-white">ТЕХНО<span className="text-fire-gradient">СИБ</span></div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">печное оборудование</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm text-white/70">
          <span className="opacity-40 cursor-default">Меню появится позже</span>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+70000000000" className="text-sm text-white/80 hover:text-fire transition flex items-center gap-2">
            <Icon name="Phone" size={14} />
            +7 (000) 000-00-00
          </a>
          <button
            onClick={() => onLead('header')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-white text-sm font-semibold hover:shadow-lg hover:shadow-fire/40 transition"
          >
            Оставить заявку
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="menu">
          <Icon name={open ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-coal-mid border-t border-coal-light animate-fade-in-up">
          <div className="container py-4 flex flex-col gap-3">
            <a href="tel:+70000000000" className="text-white/80">+7 (000) 000-00-00</a>
            <button
              onClick={() => { setOpen(false); onLead('header'); }}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-fire to-fire-dark text-white font-semibold"
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
