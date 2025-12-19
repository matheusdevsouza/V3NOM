import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import './MobileMenu.css';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <button
        id="hamburgerBtn"
        className={`md:hidden relative z-50 p-2 focus:outline-none ml-2 ${isOpen ? 'menu-open' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className="hamburger-line line-1 w-full h-[2px] bg-current block"></span>
          <span className="hamburger-line line-2 w-full h-[2px] bg-current block"></span>
          <span className="hamburger-line line-3 w-full h-[2px] bg-current block"></span>
        </div>
      </button>

      <div
        id="mobileMenu"
        className={`fixed inset-0 z-40 backdrop-blur-xl flex flex-col justify-center items-center md:hidden ${isOpen ? 'open' : 'closed'}`}
      >
        <nav className="flex flex-col gap-8 text-center mb-10">
          <a href="#eclipse" className="mobile-link text-xl font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" onClick={closeMenu}>
            {t('nav.eclipse')}
          </a>
          <a href="#tracks" className="mobile-link text-xl font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" onClick={closeMenu}>
            {t('nav.tracks')}
          </a>
          <a href="#shop" className="mobile-link text-xl font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" onClick={closeMenu}>
            {t('nav.shop')}
          </a>
          <a href="#about" className="mobile-link text-xl font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" onClick={closeMenu}>
            {t('nav.about')}
          </a>
          <a href="#faq" className="mobile-link text-xl font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity" onClick={closeMenu}>
            {t('nav.faq')}
          </a>
        </nav>
      </div>
    </>
  );
};

