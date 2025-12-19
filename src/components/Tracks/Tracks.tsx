import { useLanguage } from '@/contexts/LanguageContext';
import { TRACKS } from '@/utils/constants';
import { Glow } from '../Glow/Glow';
import './Tracks.css';

interface TracksProps {
  onTrackClick: (track: typeof TRACKS[0]) => void;
}

export const Tracks = ({ onTrackClick }: TracksProps) => {
  const { t } = useLanguage();

  return (
    <section id="tracks" className="py-20 md:py-40 px-6 md:px-10 overflow-hidden relative">
        <Glow width="500px" height="500px" top="30%" left="5%" delay="1s" />
        <Glow width="350px" height="350px" bottom="10%" right="10%" delay="3s" />
        <div className="max-w-5xl mx-auto mb-16 md:mb-32 text-center relative z-10">
            <h2 className="text-[9px] tracking-[1.5em] uppercase font-bold mb-4 contrast-text animate-element init-hidden">
              {t('tracks.subtitle')}
            </h2>
            <h3 className="text-5xl md:text-8xl gothic-font animate-element init-hidden">
              {t('tracks.title')}
            </h3>
        </div>

        <div className="max-w-5xl mx-auto space-y-0">
            {TRACKS.map((track) => (
              <a 
                key={track.id}
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="track-item flex items-center justify-between py-6 md:py-10 group cursor-pointer"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('.track-icon-img')) {
                    e.preventDefault();
                    onTrackClick(track);
                  }
                }}
              >
                  <div className="flex items-center gap-6 md:gap-12">
                      <span className="gothic-font text-xl md:text-3xl opacity-40 group-hover:opacity-100 transition-opacity">{track.number}.</span>
                      <h4 className="text-2xl md:text-6xl font-black uppercase tracking-tighter leading-none">{track.title}</h4>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                      <span className="text-[8px] md:text-[10px] font-mono tracking-widest uppercase contrast-text">{track.streams} Streams</span>
                      <img src="/images/icons/arrow-up-right.svg" className="w-4 h-4 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 track-icon-img" alt="Abrir" />
                  </div>
              </a>
            ))}
        </div>
    </section>
  );
};
