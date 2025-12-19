import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import './Header.css';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const themeIcon = theme === 'light' ? (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 640 640">
      <path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z" />
    </svg>
  ) : (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 640 640">
      <path d="M210.2 53.9C217.6 50.8 226 51.7 232.7 56.1L320.5 114.3L408.3 56.1C415 51.7 423.4 50.9 430.8 53.9C438.2 56.9 443.4 63.5 445 71.3L465.9 174.5L569.1 195.4C576.9 197 583.5 202.4 586.5 209.7C589.5 217 588.7 225.5 584.3 232.2L526.1 320L584.3 407.8C588.7 414.5 589.5 422.9 586.5 430.3C583.5 437.7 576.9 443.1 569.1 444.6L465.8 465.4L445 568.7C443.4 576.5 438 583.1 430.7 586.1C423.4 589.1 414.9 588.3 408.2 583.9L320.4 525.7L232.6 583.9C225.9 588.3 217.5 589.1 210.1 586.1C202.7 583.1 197.3 576.5 195.8 568.7L175 465.4L71.7 444.5C63.9 442.9 57.3 437.5 54.3 430.2C51.3 422.9 52.1 414.4 56.5 407.7L114.7 320L56.5 232.2C52.1 225.5 51.3 217.1 54.3 209.7C57.3 202.3 63.9 196.9 71.7 195.4L175 174.6L195.9 71.3C197.5 63.5 202.9 56.9 210.2 53.9zM239.6 320C239.6 275.6 275.6 239.6 320 239.6C364.4 239.6 400.4 275.6 400.4 320C400.4 364.4 364.4 400.4 320 400.4C275.6 400.4 239.6 364.4 239.6 320zM448.4 320C448.4 249.1 390.9 191.6 320 191.6C249.1 191.6 191.6 249.1 191.6 320C191.6 390.9 249.1 448.4 320 448.4C390.9 448.4 448.4 390.9 448.4 320z" />
    </svg>
  );

  const themeLabel = theme === 'light' ? 'DARK MATTER' : 'LIGHT MATTER';
  const langLabels: Record<string, string> = { pt: 'PT', en: 'EN', es: 'ES' };

  return (
    <>
      <header className="fixed top-0 w-full z-50 py-4 px-6 md:py-2 md:px-10 flex justify-between items-center header-blur init-hidden">
        <div className="flex items-center gap-4 relative z-50">
          <img 
            src="/images/brand/logo-minimalist.png" 
            alt="V3NOM" 
            className="v3nom-logo-nav" 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        <nav className="hidden md:flex gap-12 text-[10px] tracking-[0.5em] uppercase font-bold">
          <a href="#eclipse" className="nav-link opacity-50">{t('nav.eclipse')}</a>
          <a href="#tracks" className="nav-link opacity-50">{t('nav.tracks')}</a>
          <a href="#shop" className="nav-link opacity-50">{t('nav.shop')}</a>
          <a href="#about" className="nav-link opacity-50">{t('nav.about')}</a>
          <a href="#faq" className="nav-link opacity-50">{t('nav.faq')}</a>
        </nav>

        <div className="flex gap-3 md:gap-4 items-center">
          <div className="lang-container relative">
            <button
              className="lang-toggle"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <span className="text-[10px] tracking-widest">{langLabels[language]}</span>
            </button>
            {langDropdownOpen && (
              <div className="lang-dropdown active">
                <div
                  className={`lang-option ${language === 'pt' ? 'selected' : ''}`}
                  onClick={() => {
                    setLanguage('pt');
                    setLangDropdownOpen(false);
                  }}
                >
                  Português
                </div>
                <div
                  className={`lang-option ${language === 'en' ? 'selected' : ''}`}
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                >
                  English
                </div>
                <div
                  className={`lang-option ${language === 'es' ? 'selected' : ''}`}
                  onClick={() => {
                    setLanguage('es');
                    setLangDropdownOpen(false);
                  }}
                >
                  Español
                </div>
              </div>
            )}
          </div>

          <button className="theme-toggle" onClick={toggleTheme}>
            <span className="theme-icon-container">{themeIcon}</span>
            <span className="text-[10px] tracking-widest theme-label-text hidden md:block">
              {themeLabel}
            </span>
          </button>

          <MobileMenu />
        </div>
      </header>
    </>
  );
};
