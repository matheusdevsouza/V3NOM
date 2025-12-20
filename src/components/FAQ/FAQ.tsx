import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Glow } from '../Glow/Glow';
import './FAQ.css';

export const FAQ = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    { q: 'faq.q1', a: 'faq.a1' },
    { q: 'faq.q2', a: 'faq.a2' },
    { q: 'faq.q3', a: 'faq.a3' },
    { q: 'faq.q4', a: 'faq.a4' },
    { q: 'faq.q5', a: 'faq.a5' },
    { q: 'faq.q6', a: 'faq.a6' },
    { q: 'faq.q7', a: 'faq.a7' },
    { q: 'faq.q8', a: 'faq.a8' },
    { q: 'faq.q9', a: 'faq.a9' },
    { q: 'faq.q10', a: 'faq.a10' },
  ];

  return (
    <section id="faq" className="py-12 md:py-40 px-6 md:px-10 relative overflow-hidden">
        <Glow width="400px" height="400px" top="10%" right="10%" delay="0.8s" />
        <Glow width="300px" height="300px" bottom="20%" left="8%" delay="2.2s" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[9px] tracking-[1.5em] uppercase font-bold mb-4 contrast-text">
            {t('faq.subtitle')}
          </h2>
          <h3 className="text-4xl md:text-7xl gothic-font">
            {t('faq.title')}
          </h3>
        </div>

        <div className="space-y-0">
          {faqItems.map((item, index) => (
                  <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                      <div className="faq-question" onClick={() => toggleItem(index)}>
                <h4 className="text-lg md:text-3xl font-black uppercase tracking-tight">
                  {t(item.q)}
                </h4>
                <svg className="faq-icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className="faq-answer">
                          <p className="text-sm md:text-lg leading-relaxed contrast-text">
                            {t(item.a)}
                          </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
