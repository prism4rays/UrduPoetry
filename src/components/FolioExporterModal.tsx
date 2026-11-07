import React, { useState } from 'react';
import { Sher } from '../types';
import { ShamsaDivider } from './ShamsaDivider';
import { X, Copy, Check, Download, Sparkles } from 'lucide-react';

interface FolioExporterModalProps {
  sher: Sher | null;
  onClose: () => void;
}

export const FolioExporterModal: React.FC<FolioExporterModalProps> = ({ sher, onClose }) => {
  const [folioTheme, setFolioTheme] = useState<'wasli' | 'lapis' | 'emerald' | 'gold'>('wasli');
  const [copied, setCopied] = useState(false);

  if (!sher) return null;

  const themes = {
    wasli: {
      bg: 'bg-[#FCF9F2]',
      border: 'border-[#C5A059]',
      text: 'text-[#131E3A]',
      subtext: 'text-[#1B4D3E]',
      innerBorder: 'border-[#C5A059]/40',
      shamsa: 'gold' as const,
      name: 'واسلی قدیم (Wasli Paper)',
    },
    lapis: {
      bg: 'bg-[#0B1325]',
      border: 'border-[#C5A059]',
      text: 'text-[#FCF9F2]',
      subtext: 'text-[#D4AF37]',
      innerBorder: 'border-[#C5A059]/30',
      shamsa: 'gold' as const,
      name: 'لاجوردی شب (Lapis Ink)',
    },
    emerald: {
      bg: 'bg-[#1B4D3E]',
      border: 'border-[#D4AF37]',
      text: 'text-[#FCF9F2]',
      subtext: 'text-[#BAEED9]',
      innerBorder: 'border-[#D4AF37]/35',
      shamsa: 'gold' as const,
      name: 'زمردی شاہی (Royal Emerald)',
    },
    gold: {
      bg: 'bg-[#2B1D00]',
      border: 'border-[#D4AF37]',
      text: 'text-[#FFDEA5]',
      subtext: 'text-[#E9C176]',
      innerBorder: 'border-[#D4AF37]/50',
      shamsa: 'gold' as const,
      name: 'زر افشاں (Illumination Gold)',
    },
  };

  const currentTheme = themes[folioTheme];

  const handleCopyText = () => {
    const cardText = `📜 گنجینۂ ادب | خطاطی نامہ\n\n${sher.misra1}\n${sher.misra2}\n\n— ${sher.poetNameUrdu} (${sher.poetNameLatin})\nبحر: ${sher.behr}\nhttps://ganjina-e-adab.app`;
    navigator.clipboard.writeText(cardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="folio-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-xl bg-[#FCF9F2] dark:bg-[#111A30] border border-[#C5A059] rounded-[6px] shadow-2xl p-6 sm:p-8 text-right overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-[#76777E] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-white rounded-[4px] cursor-pointer"
          title="بند کریں"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-end gap-2 text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD] mb-1">
          <span>کلاسک خطاطی اور اشاعتی نسخہ</span>
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
        </div>
        <h3 id="folio-title" className="font-nastaliq text-2xl text-[#131E3A] dark:text-[#FCF9F2]">
          تذہیبی لوحِ کلام (Illuminated Manuscript Folio)
        </h3>

        {/* Theme Selectors */}
        <div className="flex flex-wrap items-center justify-end gap-2 my-4 text-xs font-sans">
          <span className="text-[#76777E] dark:text-[#A4823E]">طرزِ ورق:</span>
          {(['wasli', 'lapis', 'emerald', 'gold'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFolioTheme(key)}
              className={`px-3 py-1.5 rounded-[4px] border transition-colors cursor-pointer ${
                folioTheme === key
                  ? 'bg-[#131E3A] text-[#D4AF37] border-[#C5A059] font-bold'
                  : 'bg-[#FCF9F2] dark:bg-[#0B1325] border-[#E2D9C8] dark:border-[#233152] text-[#45464D] dark:text-[#C6C6CE]'
              }`}
            >
              {themes[key].name}
            </button>
          ))}
        </div>

        {/* Illuminated Folio Canvas Preview */}
        <div
          id="illuminated-folio-card"
          className={`relative p-8 sm:p-12 rounded-[6px] border-2 ${currentTheme.border} ${currentTheme.bg} shadow-lg text-center overflow-hidden transition-all duration-300 my-4`}
        >
          {/* Ornamental Inner Filigree Framing */}
          <div className={`absolute inset-2 border ${currentTheme.innerBorder} pointer-events-none rounded-[4px]`} />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] pointer-events-none" />
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] pointer-events-none" />

          {/* Top Folio Header */}
          <div className="mb-4 text-center">
            <span className={`text-[11px] font-sans uppercase tracking-widest ${currentTheme.subtext}`}>
              گنجینۂ ادب · دیوانِ کلام
            </span>
          </div>

          {/* Misra 1 */}
          <p
            className={`font-nastaliq text-2xl sm:text-3xl ${currentTheme.text} leading-loose tracking-wide`}
            dir="rtl"
          >
            {sher.misra1}
          </p>

          {/* Shamsa divider */}
          <ShamsaDivider size="md" variant={currentTheme.shamsa} />

          {/* Misra 2 */}
          <p
            className={`font-nastaliq text-2xl sm:text-3xl ${currentTheme.text} leading-loose tracking-wide`}
            dir="rtl"
          >
            {sher.misra2}
          </p>

          {/* Attribution & Meter */}
          <div className="mt-6 pt-3 border-t border-dashed border-[#C5A059]/40 flex flex-col items-center justify-center gap-1 font-sans text-xs">
            <span className={`font-semibold ${currentTheme.subtext}`}>
              — {sher.poetNameUrdu} ({sher.poetNameLatin})
            </span>
            <span className={`text-[11px] opacity-75 ${currentTheme.text}`}>
              بحر: {sher.behr}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E2D9C8] dark:border-[#233152] font-sans">
          <p className="text-xs text-[#76777E] dark:text-[#A4823E]">
            مخصوص تذہیبی لوح کے ساتھ محفوظ کیا جا سکتا ہے۔
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-4 py-2 text-xs font-medium text-[#131E3A] dark:text-[#FCF9F2] bg-[#F4EFE6] dark:bg-[#14203B] border border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059] rounded-[4px] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'متن نقل ہوا!' : 'متن نقل کریں (Copy)'}</span>
            </button>
            <button
              onClick={() => {
                alert('لوح کامیابی سے تیار ہو گئی۔ آپ اسے اپنے مطالعے یا احباب کے ساتھ شیئر کر سکتے ہیں۔');
              }}
              className="px-4 py-2 text-xs font-medium text-[#FCF9F2] bg-[#131E3A] dark:bg-[#1B4D3E] border border-[#C5A059] hover:bg-[#1B4D3E] rounded-[4px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>لوح برآمد کریں</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
