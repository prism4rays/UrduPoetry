import React, { useState } from 'react';
import { ALL_ASHAR, BAIT_BAZI_LETTERS } from '../data/literatureData';
import { Sher, WordGloss } from '../types';
import { SherCard } from './SherCard';
import { Sparkles, Dice5, Volume2, Search, ArrowRight } from 'lucide-react';

interface BaitBaziExplorerProps {
  onPlayRecitation: (sher: Sher) => void;
  onToggleBookmark: (sher: Sher) => void;
  isBookmarked: (sherId: string) => boolean;
  onOpenWordGloss: (gloss: WordGloss) => void;
  onOpenFolioExporter: (sher: Sher) => void;
}

export const BaitBaziExplorer: React.FC<BaitBaziExplorerProps> = ({
  onPlayRecitation,
  onToggleBookmark,
  isBookmarked,
  onOpenWordGloss,
  onOpenFolioExporter,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('ے');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchWord, setSearchWord] = useState<string>('');

  // Filter couplets matching the selected letter or theme
  const matchingAshar = ALL_ASHAR.filter((sher) => {
    const matchesLetter =
      !selectedLetter ||
      sher.lastLetterMisra2 === selectedLetter ||
      sher.firstLetterMisra1 === selectedLetter;

    const matchesTheme = selectedTheme === 'all' || sher.theme === selectedTheme;

    const matchesSearch =
      !searchWord.trim() ||
      sher.misra1.includes(searchWord) ||
      sher.misra2.includes(searchWord) ||
      sher.poetNameUrdu.includes(searchWord);

    return matchesLetter && matchesTheme && matchesSearch;
  });

  const handleRandomLetter = () => {
    const randomL = BAIT_BAZI_LETTERS[Math.floor(Math.random() * BAIT_BAZI_LETTERS.length)];
    setSelectedLetter(randomL);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <section className="text-right border-b border-[#E2D9C8] dark:border-[#233152] pb-6">
        <div className="flex items-center justify-end gap-2 text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD] uppercase tracking-widest mb-1">
          <span>روایتی بزمِ مشاعرہ و مقابلۂ شعر خوانی</span>
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
        </div>
        <h1 className="font-nastaliq text-3xl sm:text-4xl lg:text-5xl text-[#131E3A] dark:text-[#FCF9F2] leading-relaxed">
          بیت بازی و گنجینۂ اشعار (Bait Bazi Explorer)
        </h1>
        <p className="font-serif text-sm sm:text-base text-[#45464D] dark:text-[#C6C6CE] max-w-2xl mt-1">
          Urdu poetry competition & rhyme finder. Select the terminating letter of the opponent's misra to uncover authentic couplets in authentic Nastaliq.
        </p>
      </section>

      {/* Letter Selector Ribbon & Randomizer */}
      <div className="p-6 rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] space-y-4 text-right">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleRandomLetter}
            className="px-3 py-1.5 bg-[#FCF9F2] dark:bg-[#0B1325] text-xs font-sans font-medium text-[#131E3A] dark:text-[#FCF9F2] border border-[#C5A059] rounded-[4px] hover:bg-[#E2D9C8]/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Dice5 className="w-4 h-4 text-[#C5A059]" />
            <span>اتفاقی حرف منتخب کریں (Random Letter)</span>
          </button>

          <span className="font-sans text-xs text-[#76777E] dark:text-[#A4823E]">
            حرفِ آخر یا حرفِ اول منتخب فرمائیں:
          </span>
        </div>

        {/* Letters Grid / Row */}
        <div className="flex flex-wrap items-center justify-end gap-2" dir="rtl">
          {BAIT_BAZI_LETTERS.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-11 h-11 rounded-[4px] border font-nastaliq text-2xl transition-all cursor-pointer flex items-center justify-center ${
                selectedLetter === letter
                  ? 'bg-[#131E3A] text-[#D4AF37] border-[#C5A059] font-bold shadow-sm scale-105 ring-1 ring-[#C5A059]'
                  : 'bg-[#FCF9F2] dark:bg-[#0B1325] text-[#131E3A] dark:text-[#FCF9F2] border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059]'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Theme & Text Search */}
        <div className="pt-4 border-t border-[#E2D9C8]/70 dark:border-[#233152]/70 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs">
          {/* Theme Filters */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 w-full md:w-auto">
            <span className="text-[#76777E] dark:text-[#A4823E] ml-1">موضوع:</span>
            {[
              { id: 'all', label: 'تمام موضوعات' },
              { id: 'Ishq', label: 'عشق و محبت' },
              { id: 'Falsafa', label: 'فلسفہ و فکر' },
              { id: 'Inqilab', label: 'انقلاب و بیداری' },
              { id: 'Tasawwuf', label: 'تصوف' },
              { id: 'Dard', label: 'درد و ہجر' },
            ].map((th) => (
              <button
                key={th.id}
                onClick={() => setSelectedTheme(th.id)}
                className={`px-2.5 py-1 rounded-[4px] border transition-colors cursor-pointer ${
                  selectedTheme === th.id
                    ? 'bg-[#1B4D3E] text-[#FCF9F2] border-[#1B4D3E] font-medium'
                    : 'bg-[#FCF9F2] dark:bg-[#0B1325] border-[#E2D9C8] dark:border-[#233152] text-[#45464D] dark:text-[#C6C6CE]'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-60">
            <input
              type="text"
              placeholder="شعر میں لفظ تلاش کریں..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-[4px] bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#E2D9C8] dark:border-[#233152] focus:border-[#C5A059] text-xs text-right"
              dir="rtl"
            />
            <Search className="w-3.5 h-3.5 text-[#76777E] absolute left-2.5 top-2" />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2D9C8] dark:border-[#233152] pb-2 text-right">
          <span className="text-xs font-sans text-[#76777E] dark:text-[#A4823E]">
            {matchingAshar.length} موزوں اشعار برائے حرفِ «{selectedLetter}»
          </span>
          <h2 className="font-nastaliq text-2xl text-[#131E3A] dark:text-[#FCF9F2]">
            اشعارِ بیت بازی
          </h2>
        </div>

        {matchingAshar.length > 0 ? (
          <div className="space-y-6">
            {matchingAshar.map((sher) => (
              <SherCard
                key={sher.id}
                sher={sher}
                isBookmarked={isBookmarked(sher.id)}
                onPlayRecitation={onPlayRecitation}
                onToggleBookmark={onToggleBookmark}
                onOpenWordGloss={onOpenWordGloss}
                onOpenFolioExporter={onOpenFolioExporter}
                fontSizeUrdu={24}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152]">
            <p className="font-nastaliq text-2xl text-[#131E3A] dark:text-[#FCF9F2] mb-2">
              حرفِ «{selectedLetter}» کے تحت کوئی شعر اس موضوع میں موجود نہیں۔
            </p>
            <p className="font-sans text-xs text-[#76777E]">
              دیگر حروف یا موضوع منتخب کر کے دیکھیں۔
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
