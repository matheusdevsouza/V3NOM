import { useLanguage } from '@/contexts/LanguageContext';
import { MERCH_ITEMS } from '@/utils/constants';
import { Glow } from '../Glow/Glow';
import './Shop.css';

export const Shop = () => {
  const { t } = useLanguage();

  return (
    <section id="shop" className="py-20 md:py-40 px-6 md:px-10 relative overflow-hidden">
        <Glow width="380px" height="380px" top="20%" left="3%" delay="2.5s" />
        <Glow width="320px" height="320px" bottom="15%" right="5%" delay="1s" />
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 text-left relative z-10">
            <h2 className="text-[9px] tracking-[1.5em] uppercase font-bold mb-4 contrast-text animate-element init-hidden">
              {t('shop.subtitle')}
            </h2>
            <h3 className="text-4xl md:text-7xl gothic-font animate-element init-hidden">
              {t('shop.title')}
            </h3>
        </div>

        <div id="shopGrid" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
            {MERCH_ITEMS.map((item, index) => (
              <div key={item.id} className="merch-card group cursor-pointer init-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="merch-image"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="merch-overlay absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                      <div className="w-full">
                          <div className="flex justify-between items-end border-b border-white/20 pb-4">
                              <div>
                                  <p className="text-[10px] font-mono opacity-80 uppercase mb-1">{item.code}</p>
                                  <h4 className="gothic-font text-2xl md:text-4xl">
                                    {t(`shop.item${index + 1}.name`) || item.name}
                                  </h4>
                                  <p className="text-[9px] tracking-widest opacity-40 uppercase mt-1">
                                    {t(`shop.item${index + 1}.desc`) || item.description}
                                  </p>
                              </div>
                              <span className="text-xl md:text-2xl font-black">{item.price}</span>
                          </div>
                      </div>
                  </div>
              </div>
            ))}
        </div>
    </section>
  );
};
