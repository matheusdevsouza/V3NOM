export interface Track {
  id: string;
  number: string;
  title: string;
  spotifyUrl: string;
  streams: string;
  lyrics?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  code: string;
  description: string;
  price: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}


