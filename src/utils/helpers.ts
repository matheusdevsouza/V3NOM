export const getSpotifyId = (url: string): string | null => {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

export const formatStreams = (streams: string): string => {
  return `${streams} Streams`;
};

export const scrollToSection = (sectionId: string, offset: number = -80): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};



