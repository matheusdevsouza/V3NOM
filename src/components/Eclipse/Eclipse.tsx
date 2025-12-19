import { useLanguage } from '@/contexts/LanguageContext';
import { Glow } from '../Glow/Glow';

export const Eclipse = () => {
  const { t } = useLanguage();

  return (
    <section id="eclipse" className="min-h-[70vh] flex flex-col justify-center px-6 md:px-10 py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
        <Glow width="400px" height="400px" top="10%" left="15%" delay="0s" />
        <Glow width="300px" height="300px" bottom="20%" right="20%" delay="2s" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-[9px] tracking-[1.5em] uppercase font-bold mb-8 md:mb-12 contrast-text animate-element init-hidden">
              {t('eclipse.title')}
            </h2>
            <p className="gothic-font text-3xl md:text-6xl leading-tight animate-element init-hidden">
              {t('eclipse.text')}
            </p>
        </div>
    </section>
  );
};
