import { useState } from 'react';
import { Loader } from './components/Loader/Loader';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Eclipse } from './components/Eclipse/Eclipse';
import { Tracks } from './components/Tracks/Tracks';
import { About } from './components/About/About';
import { Video } from './components/Video/Video';
import { Shop } from './components/Shop/Shop';
import { FAQ } from './components/FAQ/FAQ';
import { Footer } from './components/Footer/Footer';
import { AudioModal } from './components/AudioModal/AudioModal';
import { useLenis } from './hooks/useLenis';
import { useGSAP } from './hooks/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Track } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLenis();

  useGSAP(() => {
    gsap.to('header', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      startAt: { y: -100 },
      delay: 0.8 
    });

    const animateElements = gsap.utils.toArray('.animate-element');
    animateElements.forEach((element: any, index: number) => {
        if (element.closest('#faq')) return; 
        
        gsap.fromTo(element, 
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: (index % 3) * 0.1
            }
        );
    });

    const trackItems = gsap.utils.toArray('.track-item');
    trackItems.forEach((track: any) => {
       gsap.fromTo(track, 
           { x: -50, opacity: 0 },
           {
               scrollTrigger: {
                   trigger: track,
                   start: "top 85%", 
                   toggleActions: "play none none reverse" 
               },
               x: 0,
               opacity: 1,
               duration: 1,
               ease: "expo.out"
           }
       );
   });

    gsap.fromTo(".merch-card", 
        { scale: 0.9, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#shopGrid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: "back.out(1.2)"
        }
    );

    gsap.fromTo("#footerBigText", 
        { y: "20%", opacity: 0, scale: 0.95 },
        { 
            scrollTrigger: { 
                trigger: "footer", 
                start: "top bottom", 
                end: "bottom bottom", 
                scrub: 1 
            }, 
            y: "0%", 
            opacity: 0.1, 
            scale: 1 
        }
    );

  }, []);

  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTrack(null), 500); 
  };

  return (
    <div className="antialiased">
      <Loader />
      <Header />
      <Hero />
      <Eclipse />
      <Tracks onTrackClick={handleTrackClick} />
      <About />
      <Video />
      <Shop />
      <FAQ />
      <Footer />
      
      <AudioModal 
        track={selectedTrack} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default App;
