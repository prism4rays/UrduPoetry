import React from 'react';
import { WordGloss } from '../types';
import { X, BookA, Bookmark, Sparkles } from 'lucide-react';

interface LexiconModalProps {
  gloss: WordGloss | null;
  onClose: () => void;
}

export const LexiconModal: React.FC<LexiconModalProps> = ({ gloss, onClose }) => {
  if (!gloss) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lexicon-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-md bg-[#FCF9F2] dark:bg-[#111A30] border border-[#C5A059] rounded-[6px] shadow-2xl p-6 sm:p-8 text-right overflow-hidden">
        {/* Subtle decorative gold inner border */}
        <div className="absolute inset-1 border border-[#C5A059]/25 pointer-events-none rounded-[4px]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-[#76777E] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-white rounded-[4px] cursor-pointer"
          title="بند کریں"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-end gap-2 text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD] mb-3">
          <span>لغت و فرحنگِ الفاظ</span>
          <BookA className="w-4 h-4 text-[#C5A059]" />
        </div>

        {/* Main Word in Nastaliq */}
        <div className="text-center my-4 py-2 border-y border-[#E2D9C8] dark:border-[#233152]">
          <h3 id="lexicon-title" className="font-nastaliq text-3xl sm:text-4xl text-[#131E3A] dark:text-[#FCF9F2] leading-loose">
            {gloss.word}
          </h3>
          <p className="font-serif italic text-sm text-[#C5A059] -mt-1 font-sans">
            [{gloss.pronunciation}]
          </p>
        </div>

        {/* Meaning in Urdu */}
        <div className="space-y-3 font-sans text-sm">
          <div>
            <span className="block text-xs font-semibold text-[#76777E] dark:text-[#A4823E] mb-1">
              مفہوم و معانی (Urdu Meaning):
            </span>
            <p className="font-nastaliq-tight text-base sm:text-lg text-[#1C1C18] dark:text-[#E5E2DB]" dir="rtl">
              {gloss.meaningUrdu}
            </p>
          </div>

          {/* Meaning in English */}
          <div className="pt-2 border-t border-dashed border-[#E2D9C8] dark:border-[#233152] text-left">
            <span className="block text-xs font-semibold text-[#76777E] dark:text-[#A4823E] mb-1">
              English Translation & Context:
            </span>
            <p className="font-serif text-[15px] text-[#45464D] dark:text-[#C6C6CE]">
              {gloss.meaningEnglish}
            </p>
          </div>

          {/* Linguistic Origin */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#76777E] dark:text-[#A4823E]">
            <span className="px-2 py-0.5 bg-[#F4EFE6] dark:bg-[#0B1325] border border-[#E2D9C8] dark:border-[#233152] rounded">
              ماخذ و اشتقاق: {gloss.origin}
            </span>
            <span className="flex items-center gap-1 text-[#1B4D3E] dark:text-[#9ED1BD]">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              مستند اداریہ
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="mt-6 pt-3 border-t border-[#E2D9C8] dark:border-[#233152]">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-medium text-[#FCF9F2] bg-[#131E3A] hover:bg-[#1B4D3E] rounded-[4px] border border-[#C5A059] transition-colors cursor-pointer font-sans"
          >
            مطالعہ جاری رکھیں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
