export const Footer = () => {
  return (
    <footer className="relative overflow-hidden h-[40vh] md:h-[55vh] flex flex-col justify-end bg-transparent pb-8 md:pb-12 px-6 md:px-10">
        <div className="absolute inset-0 w-full flex items-end justify-center footer-mask overflow-hidden pointer-events-none">
             <h2 className="gothic-font text-[22vw] md:text-[24vw] leading-[0.7] select-none whitespace-nowrap opacity-10 pb-6 md:pb-10" id="footerBigText">
                V3NOM
            </h2>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end w-full">
            <div className="text-[8px] tracking-[0.3em] uppercase font-medium contrast-text w-full md:w-auto text-center md:text-left">
                © 2025 MC LAN — V3NOM
            </div>

            <div className="flex gap-8 items-center mt-6 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                <a href="https://www.instagram.com/mclan" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg className="w-5 h-5 fill-current opacity-50 hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/>
                    </svg>
                </a>
                
                <a href="https://x.com/mclan23" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <svg className="w-5 h-5 fill-current opacity-50 hover:opacity-100 transition-opacity" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>

                <a href="https://open.spotify.com/intl-pt/artist/4mb1xtQVGSK5dh8AbtwBiR?si=IdxUZvU7Qz6SqDf6LpbJHw" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                    <svg className="w-5 h-5 fill-current opacity-50 hover:opacity-100 transition-opacity" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.59 17.357c-.225.369-.706.488-1.074.264-2.905-1.774-6.561-2.174-10.866-1.192-.422.096-.844-.17-.941-.593s.17-.843.593-.941c4.707-1.076 8.741-.611 11.984 1.369.371.226.49.707.266 1.076zm1.493-3.264c-.283.458-.883.606-1.341.324-3.322-2.041-8.385-2.633-12.312-1.441-.515.156-1.066-.135-1.222-.65-.155-.515.135-1.066.65-1.222 4.484-1.361 10.063-.701 13.9 1.658.458.283.606.883.324 1.341zm.134-3.4c-3.985-2.367-10.553-2.585-14.351-1.432-.611.186-1.255-.164-1.441-.774s.164-1.255.774-1.441c4.354-1.321 11.597-1.063 16.12 1.623.549.326.732 1.034.406 1.583s-1.034.732-1.584.407z"/></svg>
                </a>
            </div>
        </div>
    </footer>
  );
};
