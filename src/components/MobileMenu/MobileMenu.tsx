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
        aria-label="Alternar Menu"
        aria-expanded={isOpen}
      >
        <div className="hamburger-box">
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </div>
      </button>

      <div
        id="mobileMenu"
        className={`fixed inset-0 flex flex-col md:hidden ${isOpen ? 'open' : 'closed'}`}
        aria-hidden={!isOpen}
      >
        <div className="mobile-menu-header">
          <img 
            src="/images/brand/logo-minimalist.png" 
            alt="V3NOM" 
            className="mobile-menu-logo"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          <button
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Fechar Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <a 
            href="#eclipse" 
            className="mobile-link" 
            onClick={closeMenu}
          >
            {t('nav.eclipse')}
          </a>
          <a 
            href="#tracks" 
            className="mobile-link" 
            onClick={closeMenu}
          >
            {t('nav.tracks')}
          </a>
          <a 
            href="#shop" 
            className="mobile-link" 
            onClick={closeMenu}
          >
            {t('nav.shop')}
          </a>
          <a 
            href="#about" 
            className="mobile-link" 
            onClick={closeMenu}
          >
            {t('nav.about')}
          </a>
          <a 
            href="#faq" 
            className="mobile-link" 
            onClick={closeMenu}
          >
            {t('nav.faq')}
          </a>
        </nav>
      </div>
    </>
  );
};
