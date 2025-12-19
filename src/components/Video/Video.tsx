import { useLanguage } from '@/contexts/LanguageContext';
import { VIDEO_URL } from '@/utils/constants';
import { Glow } from '../Glow/Glow';
import './Video.css';

export const Video = () => {
  const { t } = useLanguage();

  return (
    <section id="video" className="py-12 md:py-32 px-6 md:px-10 relative overflow-hidden">
        <Glow width="550px" height="550px" top="10%" right="15%" delay="0.5s" />
        <Glow width="350px" height="350px" bottom="10%" left="10%" delay="2.5s" />

        <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-[9px] tracking-[1.5em] uppercase font-bold mb-4 md:mb-6 contrast-text animate-element init-hidden">
                  {t('video.label')}
                </h2>
                <h3 className="text-3xl md:text-6xl gothic-font animate-element init-hidden">
                  {t('video.title')}
                </h3>
            </div>
            
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl group animate-element init-hidden">
                <iframe 
                  className="w-full h-full relative z-10" 
                  src={VIDEO_URL}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
            </div>
        </div>
    </section>
  );
};
