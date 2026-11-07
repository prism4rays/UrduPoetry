/**
 * Core types for Ganjina-e-Adab (Urdu Literature Treasury)
 */

export interface WordGloss {
  word: string;
  pronunciation: string;
  meaningUrdu: string;
  meaningEnglish: string;
  origin: 'Persian' | 'Arabic' | 'Sanskrit' | 'Urdu/Hindi' | 'Turkic';
  exampleNote?: string;
}

export interface Sher {
  id: string;
  ghazalId: string;
  misra1: string; // مصرعِ اولیٰ
  misra2: string; // مصرعِ ثانی
  transliteration1: string;
  transliteration2: string;
  translation: string;
  poetId: string;
  poetNameUrdu: string;
  poetNameLatin: string;
  behr: string; // Poetic Meter
  behrFormula: string; // e.g., فاعلاتن فاعلاتن فاعلاتن فاعلن
  radeef?: string; // ردیف
  qafia?: string; // قافیہ
  sharh?: string; // Commentary / Exegesis
  glossary?: WordGloss[];
  theme: 'Ishq' | 'Falsafa' | 'Tasawwuf' | 'Inqilab' | 'Dard' | 'Zindagi';
  firstLetterMisra1: string;
  lastLetterMisra2: string;
  durationSeconds?: number;
}

export interface Ghazal {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  poetId: string;
  era: string;
  collection: string; // Dewan / Book title
  year?: string;
  genre: 'Ghazal' | 'Nazm' | 'Rubai' | 'Marsiya';
  behrName: string;
  radeef: string;
  qafiaExample: string;
  ashar: Sher[];
  overview: string;
  isCachedOffline?: boolean;
}

export interface Poet {
  id: string;
  nameUrdu: string;
  nameLatin: string;
  takhallus: string; // Pen name (تخلص)
  dates: string;
  city: string;
  school: 'Dabistan-e-Delhi' | 'Dabistan-e-Lucknow' | 'Taraqqi Pasand' | 'Jadidiyat';
  bio: string;
  bioUrdu: string;
  majorWorks: string[];
  famousSher: {
    misra1: string;
    misra2: string;
  };
  portraitUrl: string;
  totalGhazalsCount: number;
}

export interface ReadingSettings {
  fontSizeUrdu: number; // in px, e.g. 24
  lineHeightScale: number; // multiplier, e.g. 2.4
  showTransliteration: boolean;
  showTranslation: boolean;
  showAerab: boolean; // diacritics
  theme: 'wasli' | 'night' | 'emerald' | 'sepia';
  fontFamily: 'nastaliq' | 'serif';
}

export interface BookmarkItem {
  id: string;
  sherId: string;
  ghazalId: string;
  addedAt: string;
  personalNote?: string;
}
