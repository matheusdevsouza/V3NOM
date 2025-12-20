import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Glow } from '../Glow/Glow';
import './About.css';

export const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const albumImgSrc = theme === 'light' ? '/images/brand/album-b.png' : '/images/brand/album-w.png';

  return (
    <section id="about" className="py-20 md:py-40 px-6 md:px-10 bg-current/5 relative overflow-hidden">
        <Glow width="450px" height="450px" top="15%" right="8%" delay="1.5s" />
        <Glow width="280px" height="280px" bottom="25%" left="12%" delay="0.5s" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-20 items-center relative z-10">
        <div className="order-2 md:order-none relative aspect-square w-full overflow-hidden about-image-container animate-element init-hidden mt-10 md:mt-0">
          <img 
            id="aboutAlbumImg" 
                  src={albumImgSrc} 
            alt="Vibe" 
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 about-image" 
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        
        <div className="order-1 md:order-none">
                <h2 className="text-[9px] tracking-[1.5em] uppercase font-bold mb-6 md:mb-8 contrast-text animate-element init-hidden">
            {t('about.label')}
          </h2>
          <h3 className="text-4xl md:text-7xl gothic-font mb-8 md:mb-12 animate-element init-hidden">
            {t('about.title')}
          </h3>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-80 animate-element init-hidden">
            {t('about.desc')}
          </p>
          <div className="mt-10 md:mt-16 animate-element init-hidden">
            <a 
                      href="https://open.spotify.com/intl-pt/album/2n7tTjN6PoCFv1x2LDAnuv?si=S1Z7SlfxQAChIXMFoyzTEA" 
                      target="_blank"
                      rel="noopener noreferrer"
              className="inline-block border border-current px-8 py-4 md:px-12 md:py-5 gothic-font text-xl md:text-2xl hover:bg-white hover:text-black transition-all rounded-xl"
            >
              {t('about.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
