import React, { useState } from 'react';
import { Sher, WordGloss } from '../types';
import { ShamsaDivider } from './ShamsaDivider';
import { 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  BookOpen, 
  Sparkles,
  Info
} from 'lucide-react';

interface SherCardProps {
  sher: Sher;
  isActiveAudio?: boolean;
  isBookmarked?: boolean;
  showTransliteration?: boolean;
  showTranslation?: boolean;
  fontSizeUrdu?: number;
  onPlayRecitation?: (sher: Sher) => void;
  onToggleBookmark?: (sher: Sher) => void;
  onOpenWordGloss?: (wordGloss: WordGloss) => void;
  onOpenFolioExporter?: (sher: Sher) => void;
}

export const SherCard: React.FC<SherCardProps> = ({
  sher,
  isActiveAudio = false,
  isBookmarked = false,
  showTransliteration = true,
  showTranslation = true,
  fontSizeUrdu = 24,
  onPlayRecitation,
  onToggleBookmark,
  onOpenWordGloss,
  onOpenFolioExporter,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSharh, setShowSharh] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${sher.misra1}\n${sher.misra2}\n— ${sher.poetNameUrdu} (${sher.poetNameLatin})\nبحر: ${sher.behr}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      className={`relative w-full transition-all duration-300 rounded-[6px] overflow-hidden ${
        isActiveAudio
          ? 'bg-[#FDFBF7] dark:bg-[#14203B] shadow-[0_4px_24px_-4px_rgba(197,160,89,0.25)] ring-2 ring-[#C5A059]'
          : 'bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059]/60 shadow-[0_2px_8px_-2px_rgba(19,30,58,0.06)]'
      }`}
      style={{
        boxShadow: isActiveAudio
          ? 'inset 0 0 0 1px #C5A059, 0 6px 20px -4px rgba(19, 30, 58, 0.12)'
          : undefined,
      }}
    >
      {/* Top subtle archival gold corner indicators */}
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#C5A059]/40 pointer-events-none" />
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C5A059]/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C5A059]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#C5A059]/40 pointer-events-none" />

      {/* Main Couplet Content */}
      <div className="px-6 py-6 sm:px-10 sm:py-8 text-center">
        {/* Active recitation banner tag if playing */}
        {isActiveAudio && (
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mb-3 rounded-full text-xs font-sans font-medium text-[#1B4D3E] dark:text-[#9ED1BD] bg-[#BAEED9]/40 border border-[#1B4D3E]/30 animate-pulse">
            <Volume2 className="w-3.5 h-3.5" />
            <span>تحت اللفظ قرأت جاری ہے... (Active Recitation)</span>
          </div>
        )}

        {/* Misra 1 (مصرعِ اولیٰ) */}
        <p
          className="font-nastaliq text-[#131E3A] dark:text-[#FCF9F2] text-center font-normal tracking-wide transition-all select-text"
          style={{
            fontSize: `${fontSizeUrdu}px`,
            lineHeight: `${fontSizeUrdu * 2.45}px`,
          }}
          dir="rtl"
        >
          {sher.misra1}
        </p>

        {/* Shamsa Rosette Flourish Divider */}
        <ShamsaDivider size="md" variant={isActiveAudio ? 'gold' : 'gold'} />

        {/* Misra 2 (مصرعِ ثانی) */}
        <p
          className="font-nastaliq text-[#131E3A] dark:text-[#FCF9F2] text-center font-normal tracking-wide transition-all select-text"
          style={{
            fontSize: `${fontSizeUrdu}px`,
            lineHeight: `${fontSizeUrdu * 2.45}px`,
          }}
          dir="rtl"
        >
          {sher.misra2}
        </p>

        {/* Interactive Lexicon Chips if present */}
        {sher.glossary && sher.glossary.length > 0 && onOpenWordGloss && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2 border-t border-[#E2D9C8]/60 dark:border-[#233152]/60">
            <span className="text-xs font-sans text-[#76777E] dark:text-[#A4823E] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              فرحنگِ الفاظ (Lexicon):
            </span>
            {sher.glossary.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onOpenWordGloss(item)}
                className="px-2.5 py-1 text-xs rounded-[4px] bg-[#FCF9F2] dark:bg-[#0B1325] text-[#1B4D3E] dark:text-[#9ED1BD] border border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059] transition-colors font-nastaliq-tight cursor-pointer"
                title={`${item.pronunciation} — کلک کر کے معنی دیکھیں`}
              >
                {item.word} · <span className="font-sans text-[11px] opacity-80">{item.pronunciation}</span>
              </button>
            ))}
          </div>
        )}

        {/* Latin Transliteration (if toggled) */}
        {showTransliteration && (
          <div className="mt-4 pt-3 text-center border-t border-dashed border-[#E2D9C8]/70 dark:border-[#233152]/70">
            <p className="font-serif italic text-sm text-[#45464D] dark:text-[#C6C6CE] leading-relaxed">
              "{sher.transliteration1}"
            </p>
            <p className="font-serif italic text-sm text-[#45464D] dark:text-[#C6C6CE] leading-relaxed">
              "{sher.transliteration2}"
            </p>
          </div>
        )}

        {/* Literary English Translation (if toggled) */}
        {showTranslation && (
          <div className="mt-3 max-w-xl mx-auto text-center">
            <p className="font-serif text-sm sm:text-[15px] text-[#1C1C18] dark:text-[#E5E2DB] leading-relaxed">
              {sher.translation}
            </p>
          </div>
        )}

        {/* Sharh (Scholarly Commentary) Collapsible */}
        {sher.sharh && (
          <div className="mt-4">
            <button
              onClick={() => setShowSharh(!showSharh)}
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#1B4D3E] dark:text-[#9ED1BD] hover:underline"
            >
              <Info className="w-3.5 h-3.5" />
              {showSharh ? 'شرح و تفہیم مخفی کریں (Hide Commentary)' : 'شرح و تفہیم ملاحظہ فرمائیں (View Literary Commentary)'}
            </button>
            {showSharh && (
              <div className="mt-2 p-3.5 text-right rounded-[4px] bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#E2D9C8] dark:border-[#233152] text-xs sm:text-sm text-[#45464D] dark:text-[#C6C6CE] leading-relaxed">
                <span className="font-semibold block mb-1 text-[#131E3A] dark:text-[#FCF9F2]">نکتۂ شعر و تفہیم:</span>
                {sher.sharh}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Metadata & Action Ribbon */}
      <footer className="px-5 py-3 bg-[#FCF9F2]/80 dark:bg-[#0B1325]/70 border-t border-[#E2D9C8] dark:border-[#233152] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Poetic Metrics & Attribution */}
        <div className="flex flex-wrap items-center gap-2 text-[#1B4D3E] dark:text-[#9ED1BD] font-sans">
          <span className="font-semibold">{sher.poetNameUrdu}</span>
          <span className="text-[#C5A059]">·</span>
          <span>بحر: {sher.behr}</span>
          {sher.radeef && (
            <>
              <span className="text-[#C5A059]">·</span>
              <span>ردیف: {sher.radeef}</span>
            </>
          )}
          {sher.qafia && (
            <>
              <span className="text-[#C5A059]">·</span>
              <span>قافیہ: {sher.qafia}</span>
            </>
          )}
        </div>

        {/* Right: Functional Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Recite Audio Button */}
          {onPlayRecitation && (
            <button
              onClick={() => onPlayRecitation(sher)}
              className={`p-2 rounded-[4px] transition-colors ${
                isActiveAudio
                  ? 'bg-[#131E3A] text-[#D4AF37]'
                  : 'text-[#131E3A] dark:text-[#FCF9F2] hover:bg-[#E2D9C8]/50 dark:hover:bg-[#233152]'
              }`}
              title="تحت اللفظ سنیں (Listen to recitation)"
              aria-label="Play recitation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}

          {/* Bookmark Button */}
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(sher)}
              className={`p-2 rounded-[4px] transition-colors ${
                isBookmarked
                  ? 'text-[#C5A059]'
                  : 'text-[#76777E] dark:text-[#C6C6CE] hover:text-[#131E3A] hover:bg-[#E2D9C8]/50 dark:hover:bg-[#233152]'
              }`}
              title={isBookmarked ? 'بیاض سے خارج کریں' : 'بیاض میں محفوظ کریں (Save to Bayaz)'}
              aria-label="Bookmark couplet"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          )}

          {/* Copy Text Button */}
          <button
            onClick={handleCopy}
            className="p-2 text-[#76777E] dark:text-[#C6C6CE] hover:text-[#131E3A] hover:bg-[#E2D9C8]/50 dark:hover:bg-[#233152] rounded-[4px] transition-colors"
            title="متن نقل کریں (Copy couplet)"
            aria-label="Copy couplet text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <BookOpen className="w-4 h-4" />}
          </button>

          {/* Folio Exporter / Social Card Button */}
          {onOpenFolioExporter && (
            <button
              onClick={() => onOpenFolioExporter(sher)}
              className="p-2 text-[#76777E] dark:text-[#C6C6CE] hover:text-[#C5A059] hover:bg-[#E2D9C8]/50 dark:hover:bg-[#233152] rounded-[4px] transition-colors"
              title="خوبصورت خطاطی کارڈ تیار کریں (Create Illuminated Folio Card)"
              aria-label="Share as illuminated card"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </article>
  );
};
