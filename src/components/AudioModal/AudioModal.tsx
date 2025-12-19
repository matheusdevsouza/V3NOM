import { useEffect, useRef, useState, useCallback } from 'react';
import { Track } from '@/types';
import { getSpotifyId } from '@/utils/helpers';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import './AudioModal.css';

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    Spotify?: any;
  }
}

interface AudioModalProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AudioModal = ({ track, isOpen, onClose }: AudioModalProps) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const embedControllerRef = useRef<any>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewTimerRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const currentTrackIdRef = useRef<string | null>(null);

  const createSpotifyController = useCallback((IFrameAPI: any) => {
    if (!containerRef.current || embedControllerRef.current) return;
    
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    if (containerRef.current) {
      const container = containerRef.current;
      const children = Array.from(container.children);
      children.forEach(child => container.removeChild(child));
      container.appendChild(element);
    }
    
    const options = {
      width: '100%',
      height: '100%',
      uri: 'spotify:track:51J7XgUeRMyVfe02DpsGo3'
    };
    
    const callback = (EmbedController: any) => {
      embedControllerRef.current = EmbedController;
      
      EmbedController.addListener('playback_update', (e: any) => {
        const { position, duration, isPaused } = e.data;
        
        setIsPlaying(!isPaused);
        
        if (duration > 0) {
          const progressPercent = (position / duration) * 100;
          setProgress(progressPercent);
          
          if (position >= 30000 && !isPaused && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            EmbedController.pause();
            setIsPlaying(false);
            setProgress(0); 
            if (previewTimerRef.current) {
              clearTimeout(previewTimerRef.current);
              previewTimerRef.current = null;
            }
          }
        }
      });
      
      EmbedController.addListener('ready', () => {
        if (embedControllerRef.current) {
          embedControllerRef.current.pause();
        }
      });
    };

    try {
      IFrameAPI.createController(element, options, callback);
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    if (!document.getElementById('spotify-iframe-api')) {
      const script = document.createElement('script');
      script.id = 'spotify-iframe-api';
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      document.body.appendChild(script);
    }

    const handleSpotifyReady = (IFrameAPI: any) => {
      if (containerRef.current) {
        createSpotifyController(IFrameAPI);
      } else {
        const checkContainer = setInterval(() => {
          if (containerRef.current) {
            createSpotifyController(IFrameAPI);
            clearInterval(checkContainer);
          }
        }, 100);
        setTimeout(() => clearInterval(checkContainer), 5000);
      }
    };

    if ((window as any).Spotify && (window as any).Spotify.Player) {
      handleSpotifyReady((window as any).Spotify);
    } else {
      window.onSpotifyIframeApiReady = handleSpotifyReady;
    }

    return () => {
      if (window.onSpotifyIframeApiReady === handleSpotifyReady) {
        window.onSpotifyIframeApiReady = undefined as any;
      }
    };
  }, [createSpotifyController]);

  useEffect(() => {
    if (isOpen && !embedControllerRef.current) {
      const checkApi = setInterval(() => {
        if ((window as any).Spotify && containerRef.current) {
          createSpotifyController((window as any).Spotify);
          clearInterval(checkApi);
        }
      }, 100);
      
      setTimeout(() => clearInterval(checkApi), 5000);
      
      return () => clearInterval(checkApi);
    }
  }, [isOpen, createSpotifyController]);

  useEffect(() => {
    if (isOpen && track) {
      const spotifyId = getSpotifyId(track.spotifyUrl);
      
      if (spotifyId && spotifyId !== currentTrackIdRef.current) {
        currentTrackIdRef.current = spotifyId;
        
        if (embedControllerRef.current) {
          embedControllerRef.current.loadUri(`spotify:track:${spotifyId}`);
          setIsPlaying(false);
          hasPlayedRef.current = false;
          setProgress(0);
          
          if (previewTimerRef.current) {
            clearTimeout(previewTimerRef.current);
            previewTimerRef.current = null;
          }
          
          setTimeout(() => {
            if (embedControllerRef.current) {
              embedControllerRef.current.pause();
            }
          }, 200);
        } else {
          const checkController = setInterval(() => {
            if (embedControllerRef.current && spotifyId) {
              embedControllerRef.current.loadUri(`spotify:track:${spotifyId}`);
              setIsPlaying(false);
              hasPlayedRef.current = false;
              setProgress(0);
              clearInterval(checkController);
            }
          }, 100);
          
          setTimeout(() => clearInterval(checkController), 5000);
          
          return () => clearInterval(checkController);
        }
      }
    }
    
    if (!isOpen) {
      hasPlayedRef.current = false;
      setIsPlaying(false);
      setProgress(0);
      currentTrackIdRef.current = null;
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
        previewTimerRef.current = null;
      }
      if (embedControllerRef.current) {
        embedControllerRef.current.pause();
      }
    }
  }, [isOpen, track]);

  useEffect(() => {
    if (!isOpen || !waveformRef.current) return;
    
    if (waveformRef.current.children.length === 0) {
      for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'w-1 rounded-full transition-all duration-300';
        bar.style.height = '20%';
        bar.style.background = 'var(--modal-text)';
        bar.style.opacity = '0.4';
        waveformRef.current.appendChild(bar);
      }
    } else {
      const bars = waveformRef.current.children;
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i] as HTMLElement;
        bar.style.height = '20%';
        bar.style.opacity = '0.4';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !waveformRef.current) return;

    if (!isPlaying) {
      const bars = waveformRef.current.children;
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i] as HTMLElement;
        bar.style.height = '20%';
        bar.style.opacity = '0.4';
        bar.style.transition = 'all 0.3s ease-out';
      }
      return;
    }

    const interval = setInterval(() => {
      if (waveformRef.current && isPlaying) {
        const bars = waveformRef.current.children;
        for (let i = 0; i < bars.length; i++) {
          const bar = bars[i] as HTMLElement;
          bar.style.height = Math.random() * 100 + '%';
          bar.style.opacity = (0.5 + Math.random() * 0.5).toString();
          const randomDelay = Math.random() * 50;
          bar.style.transition = `all ${100 + randomDelay}ms ease-out`;
        }
      }
    }, 100); 

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  useEffect(() => {
    if (waveformRef.current) {
      const bars = waveformRef.current.children;
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i] as HTMLElement;
        bar.style.background = 'var(--modal-text)';
        if (!isPlaying) {
          bar.style.opacity = '0.4';
        }
      }
    }
  }, [theme, isPlaying]);

  const togglePlay = () => {
    if (!embedControllerRef.current) {
      return;
    }
    
    try {
      if (!isPlaying && hasPlayedRef.current) {
        const spotifyId = track ? getSpotifyId(track.spotifyUrl) : null;
        if (spotifyId) {
          embedControllerRef.current.loadUri(`spotify:track:${spotifyId}`);
          setProgress(0);
          hasPlayedRef.current = false;
          setTimeout(() => {
            if (embedControllerRef.current) {
              embedControllerRef.current.togglePlay();
            }
          }, 300);
          return;
        }
      }
      
      const wasPlaying = isPlaying;
      embedControllerRef.current.togglePlay();
      
      if (!wasPlaying) {
        hasPlayedRef.current = false;
        
        if (previewTimerRef.current) {
          clearTimeout(previewTimerRef.current);
        }
        
        previewTimerRef.current = window.setTimeout(() => {
          if (embedControllerRef.current && !hasPlayedRef.current) {
            embedControllerRef.current.pause();
            setIsPlaying(false);
            hasPlayedRef.current = true;
            setProgress(0); 
          }
        }, 30000);
      } else {
        if (previewTimerRef.current) {
          clearTimeout(previewTimerRef.current);
          previewTimerRef.current = null;
        }
      }
    } catch (error) {
    }
  };

  const handleClose = useCallback(() => {
    embedControllerRef.current?.pause();
    setIsPlaying(false);
    hasPlayedRef.current = false;
    setProgress(0);
    
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  if (!isOpen || !track) return null;

  return (
    <div id="audioModal" className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl transition-all duration-500 p-4">
        <div className="w-full max-w-2xl p-8 md:p-12 relative rounded-2xl modal-container-border">
            <button onClick={handleClose} className="absolute top-0 right-0 p-4 opacity-50 hover:opacity-100 transition-opacity z-50">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div id="playerView">
                <div className="text-center mb-12">
                    <h4 className="text-xs tracking-[0.5em] opacity-50 uppercase mb-4">{t('modal.playing')}</h4>
                    <h2 className="text-3xl md:text-6xl font-black gothic-font uppercase tracking-tighter">{track.title}</h2>
                </div>

                <div ref={waveformRef} id="waveform" className="mb-12"></div>

                <div className="flex flex-col items-center gap-8 w-full">
                    <div className="w-full h-1 progress-bar-bg rounded-full overflow-hidden relative group cursor-pointer">
                        <div className="h-full progress-bar-fill transition-all duration-200 ease-linear relative" style={{ width: `${progress}%` }}>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 progress-bar-fill rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(128,128,128,0.5)]"></div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <button onClick={togglePlay} className="play-btn-themed">
                            {!isPlaying ? (
                              <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            ) : (
                              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center items-center">
                        <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="modal-btn">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.59 17.357c-.225.369-.706.488-1.074.264-2.905-1.774-6.561-2.174-10.866-1.192-.422.096-.844-.17-.941-.593s.17-.843.593-.941c4.707-1.076 8.741-.611 11.984 1.369.371.226.49.707.266 1.076zm1.493-3.264c-.283.458-.883.606-1.341.324-3.322-2.041-8.385-2.633-12.312-1.441-.515.156-1.066-.135-1.222-.65-.155-.515.135-1.066.65-1.222 4.484-1.361 10.063-.701 13.9 1.658.458.283.606.883.324 1.341zm.134-3.4c-3.985-2.367-10.553-2.585-14.351-1.432-.611.186-1.255-.164-1.441-.774s.164-1.255.774-1.441c4.354-1.321 11.597-1.063 16.12 1.623.549.326.732 1.034.406 1.583s-1.034.732-1.584.407z"/></svg>
                            <span>{t('modal.spotify')}</span>
                        </a>
                        
                        <a href={`https://music.youtube.com/search?q=${encodeURIComponent(`MC Lan V3NOM ${track.title}`)}`} target="_blank" rel="noopener noreferrer" className="modal-btn">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                            <span>{t('modal.youtube')}</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <div ref={containerRef} className="absolute opacity-0 pointer-events-none overflow-hidden" style={{ bottom: 0, right: 0, width: '352px', height: '352px', visibility: 'hidden' }}></div>
        </div>
    </div>
  );
};
