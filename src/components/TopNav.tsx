import React from 'react';
import { BookMarked, Moon, Sun, Feather } from 'lucide-react';

interface TopNavProps {
  currentTab: 'home' | 'reader' | 'poets' | 'baitbazi' | 'bayaz';
  onSelectTab: (tab: 'home' | 'reader' | 'poets' | 'baitbazi' | 'bayaz') => void;
  isDark: boolean;
  onToggleTheme: () => void;
  bookmarkCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F2]/95 dark:bg-[#0B1325]/95 backdrop-blur border-b border-[#E2D9C8] dark:border-[#233152] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-right whitespace-nowrap shrink-0 group cursor-pointer focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-[4px] bg-[#131E3A] border border-[#C5A059] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#1B4D3E] transition-colors">
            <Feather className="w-4 h-4" />
          </div>
          <div>
            <span className="font-nastaliq text-xl sm:text-2xl text-[#131E3A] dark:text-[#FCF9F2] font-semibold tracking-wide block leading-snug">
              گنجینۂ ادب
            </span>
            <span className="font-serif text-[11px] uppercase tracking-widest text-[#76777E] dark:text-[#A4823E] block -mt-1 font-sans">
              Ganjina-e-Adab
            </span>
          </div>
        </button>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer font-sans ${
              currentTab === 'home'
                ? 'text-[#131E3A] dark:text-[#D4AF37] border-b-2 border-[#C5A059] font-semibold'
                : 'text-[#45464D] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-[#FCF9F2]'
            }`}
          >
            دیوانِ عام (Home)
          </button>

          <button
            onClick={() => onSelectTab('reader')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer font-sans ${
              currentTab === 'reader'
                ? 'text-[#131E3A] dark:text-[#D4AF37] border-b-2 border-[#C5A059] font-semibold'
                : 'text-[#45464D] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-[#FCF9F2]'
            }`}
          >
            مطالعۂ کلام (Reader)
          </button>

          <button
            onClick={() => onSelectTab('poets')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer font-sans ${
              currentTab === 'poets'
                ? 'text-[#131E3A] dark:text-[#D4AF37] border-b-2 border-[#C5A059] font-semibold'
                : 'text-[#45464D] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-[#FCF9F2]'
            }`}
          >
            تذکرۂ شعراء (Poets)
          </button>

          <button
            onClick={() => onSelectTab('baitbazi')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer font-sans ${
              currentTab === 'baitbazi'
                ? 'text-[#131E3A] dark:text-[#D4AF37] border-b-2 border-[#C5A059] font-semibold'
                : 'text-[#45464D] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-[#FCF9F2]'
            }`}
          >
            بیت بازی (Bait Bazi)
          </button>

          <button
            onClick={() => onSelectTab('bayaz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer font-sans flex items-center gap-1.5 ${
              currentTab === 'bayaz'
                ? 'text-[#131E3A] dark:text-[#D4AF37] border-b-2 border-[#C5A059] font-semibold'
                : 'text-[#45464D] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-[#FCF9F2]'
            }`}
          >
            <span>بیاضِ خاص (My Bayaz)</span>
            {bookmarkCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#C5A059] text-[#131E3A] font-bold text-[10px] rounded-full">
                {bookmarkCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-[#45464D] dark:text-[#FCF9F2] hover:bg-[#E2D9C8]/40 dark:hover:bg-[#233152] rounded-[4px] transition-colors"
            title={isDark ? 'روزینہ مطالعہ (Switch to Parchment Day)' : 'شبینہ مطالعہ (Switch to Lapis Night)'}
            aria-label="Toggle light or dark theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#131E3A]" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onSelectTab('reader')}
            className="px-4 py-2 text-xs font-medium text-[#FCF9F2] bg-[#131E3A] dark:bg-[#1B4D3E] border border-[#C5A059] rounded-[4px] hover:bg-[#1B4D3E] dark:hover:bg-[#376757] transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-2 cursor-pointer font-sans"
          >
            <BookMarked className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>مطالعہ شروع کریں</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="lg:hidden flex items-center justify-around px-2 py-2 border-t border-[#E2D9C8] dark:border-[#233152] bg-[#F4EFE6]/70 dark:bg-[#111A30]/70 text-xs font-sans">
        <button
          onClick={() => onSelectTab('home')}
          className={`py-1 px-2 rounded ${currentTab === 'home' ? 'font-bold text-[#131E3A] dark:text-[#D4AF37]' : 'text-[#76777E]'}`}
        >
          دیوان
        </button>
        <button
          onClick={() => onSelectTab('reader')}
          className={`py-1 px-2 rounded ${currentTab === 'reader' ? 'font-bold text-[#131E3A] dark:text-[#D4AF37]' : 'text-[#76777E]'}`}
        >
          مطالعہ
        </button>
        <button
          onClick={() => onSelectTab('poets')}
          className={`py-1 px-2 rounded ${currentTab === 'poets' ? 'font-bold text-[#131E3A] dark:text-[#D4AF37]' : 'text-[#76777E]'}`}
        >
          شعراء
        </button>
        <button
          onClick={() => onSelectTab('baitbazi')}
          className={`py-1 px-2 rounded ${currentTab === 'baitbazi' ? 'font-bold text-[#131E3A] dark:text-[#D4AF37]' : 'text-[#76777E]'}`}
        >
          بیت بازی
        </button>
        <button
          onClick={() => onSelectTab('bayaz')}
          className={`py-1 px-2 rounded flex items-center gap-1 ${currentTab === 'bayaz' ? 'font-bold text-[#131E3A] dark:text-[#D4AF37]' : 'text-[#76777E]'}`}
        >
          <span>بیاض</span>
          {bookmarkCount > 0 && <span className="text-[10px] bg-[#C5A059] px-1 rounded-full text-white">{bookmarkCount}</span>}
        </button>
      </div>
    </header>
  );
};
