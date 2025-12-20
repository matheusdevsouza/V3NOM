import { useEffect, useRef, useState, useCallback } from 'react';
import { Track } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import './AudioModal.css';

interface AudioModalProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
}

const VOLUME_STORAGE_KEY = 'v3nom-audio-volume';
const DEFAULT_VOLUME = 0.5; 
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const AudioModal = ({ track, isOpen, onClose }: AudioModalProps) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    const parsed = savedVolume ? parseFloat(savedVolume) : DEFAULT_VOLUME;
    return Number.isFinite(parsed) ? clamp01(parsed) : DEFAULT_VOLUME;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track?.audioFile) return;

    const audio = new Audio(track.audioFile);
    audio.preload = 'metadata';
    audio.volume = volume;
    audio.loop = isLooping;
    audioRef.current = audio;
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    const handleLoadedMetadata = () => {
      const d = audio.duration;
      setDuration(Number.isFinite(d) ? d : 0);
    };

    const handleTimeUpdate = () => {
      const d = audio.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      const ct = audio.currentTime;
      const pct = (ct / d) * 100;
      setCurrentTime(ct);
      setProgress(Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0);
    };

    const handleEnded = () => {
      if (!audio.loop) {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        audio.currentTime = 0;
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, [track?.audioFile]);

  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = clamp01(volume);
    }
    localStorage.setItem(VOLUME_STORAGE_KEY, clamp01(volume).toString());
  }, [volume]);

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

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Erro ao reproduzir áudio:', error);
      });
    }
  }, [isPlaying]);

  const toggleLoop = useCallback(() => {
    setIsLooping(prev => !prev);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(Number.isFinite(newVolume) ? clamp01(newVolume) : DEFAULT_VOLUME);
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * audioRef.current.duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  }, []);

  const handleClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
    onClose();
  }, [onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      );
    } else if (volume < 0.5) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      );
    }
  };

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
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div id="playerView">
          <div className="text-center mb-12">
            <h4 className="text-xs tracking-[0.5em] opacity-50 uppercase mb-4">{t('modal.playing')}</h4>
            <h2 className="text-3xl md:text-6xl font-black gothic-font uppercase tracking-tighter">{track.title}</h2>
          </div>

          <div ref={waveformRef} id="waveform" className="mb-12"></div>

          <div className="flex flex-col items-center gap-8 w-full">
            <div className="w-full">
              <div 
                className="w-full h-1 progress-bar-bg rounded-full overflow-hidden relative group cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full progress-bar-fill transition-all duration-200 ease-linear relative" 
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 progress-bar-fill rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(128,128,128,0.5)]"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs opacity-50">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={toggleLoop}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLooping 
                    ? 'opacity-100 scale-110' 
                    : 'opacity-40 hover:opacity-70'
                }`}
                title={isLooping ? 'Desativar loop' : 'Ativar loop'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button onClick={togglePlay} className="play-btn-themed">
                {!isPlaying ? (
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                )}
              </button>

              <div className="volume-control">
                <button
                  className="p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                  title="Volume"
                  type="button"
                >
                  {getVolumeIcon()}
                </button>
                <input
                  className="volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center items-center">
              <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="modal-btn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.59 17.357c-.225.369-.706.488-1.074.264-2.905-1.774-6.561-2.174-10.866-1.192-.422.096-.844-.17-.941-.593s.17-.843.593-.941c4.707-1.076 8.741-.611 11.984 1.369.371.226.49.707.266 1.076zm1.493-3.264c-.283.458-.883.606-1.341.324-3.322-2.041-8.385-2.633-12.312-1.441-.515.156-1.066-.135-1.222-.65-.155-.515.135-1.066.65-1.222 4.484-1.361 10.063-.701 13.9 1.658.458.283.606.883.324 1.341zm.134-3.4c-3.985-2.367-10.553-2.585-14.351-1.432-.611.186-1.255-.164-1.441-.774s.164-1.255.774-1.441c4.354-1.321 11.597-1.063 16.12 1.623.549.326.732 1.034.406 1.583s-1.034.732-1.584.407z"/>
                </svg>
                <span>{t('modal.spotify')}</span>
              </a>
              
              <a href={`https://music.youtube.com/search?q=${encodeURIComponent(`MC Lan V3NOM ${track.title}`)}`} target="_blank" rel="noopener noreferrer" className="modal-btn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <span>{t('modal.youtube')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
