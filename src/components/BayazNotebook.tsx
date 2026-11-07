import React, { useState } from 'react';
import { ALL_ASHAR } from '../data/literatureData';
import { Sher, BookmarkItem, WordGloss } from '../types';
import { SherCard } from './SherCard';
import { 
  Bookmark, 
  Download, 
  Trash2, 
  FileEdit, 
  Sparkles, 
  BookOpen, 
  Check, 
  Copy,
  PenTool
} from 'lucide-react';

interface BayazNotebookProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (sherId: string) => void;
  onUpdateNote: (sherId: string, note: string) => void;
  onPlayRecitation: (sher: Sher) => void;
  onOpenWordGloss: (gloss: WordGloss) => void;
  onOpenFolioExporter: (sher: Sher) => void;
  onGoToReader: () => void;
}

export const BayazNotebook: React.FC<BayazNotebookProps> = ({
  bookmarks,
  onRemoveBookmark,
  onUpdateNote,
  onPlayRecitation,
  onOpenWordGloss,
  onOpenFolioExporter,
  onGoToReader,
}) => {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [currentNoteText, setCurrentNoteText] = useState<string>('');
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  // Match bookmarked IDs with Sher objects
  const bookmarkedAshar = bookmarks
    .map((b) => {
      const sher = ALL_ASHAR.find((s) => s.id === b.sherId);
      return sher ? { sher, bookmark: b } : null;
    })
    .filter((item): item is { sher: Sher; bookmark: BookmarkItem } => item !== null);

  const handleStartEditNote = (sherId: string, initialNote: string = '') => {
    setEditingNoteId(sherId);
    setCurrentNoteText(initialNote);
  };

  const handleSaveNote = (sherId: string) => {
    onUpdateNote(sherId, currentNoteText);
    setEditingNoteId(null);
  };

  const handleCopyEntireBayaz = () => {
    if (bookmarkedAshar.length === 0) return;
    const content = bookmarkedAshar
      .map(({ sher, bookmark }, idx) => {
        return `[شعر ${idx + 1}]\n${sher.misra1}\n${sher.misra2}\n— ${sher.poetNameUrdu} (${sher.behr})\n${
          bookmark.personalNote ? `حاشیہ: ${bookmark.personalNote}\n` : ''
        }`;
      })
      .join('\n───────────────────────\n\n');

    navigator.clipboard.writeText(`📜 بیاضِ خاص · گنجینۂ ادب\n\n${content}`);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <section className="text-right border-b border-[#E2D9C8] dark:border-[#233152] pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="flex items-center gap-2 font-sans text-xs">
          {bookmarkedAshar.length > 0 && (
            <button
              onClick={handleCopyEntireBayaz}
              className="px-4 py-2 bg-[#FCF9F2] dark:bg-[#0B1325] text-[#131E3A] dark:text-[#FCF9F2] border border-[#C5A059] rounded-[4px] hover:bg-[#E2D9C8]/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
              <span>{copiedAll ? 'پوری بیاض نقل ہوئی!' : 'تمام بیاض نقل کریں (Copy All)'}</span>
            </button>
          )}
        </div>

        <div>
          <div className="flex items-center justify-end gap-2 text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD] uppercase tracking-widest mb-1">
            <span>ذاتی انتخاب و بیاضِ اشعار</span>
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
          </div>
          <h1 className="font-nastaliq text-3xl sm:text-4xl lg:text-5xl text-[#131E3A] dark:text-[#FCF9F2] leading-relaxed">
            بیاضِ خاص (Personal Anthology)
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#45464D] dark:text-[#C6C6CE] max-w-xl mt-1">
            Your curated literary notebook. Add marginal thoughts (حاشیہ), preserve timeless couplets, and export illuminated folios.
          </p>
        </div>
      </section>

      {/* Content */}
      {bookmarkedAshar.length > 0 ? (
        <div className="space-y-8">
          {bookmarkedAshar.map(({ sher, bookmark }) => (
            <div
              key={sher.id}
              className="p-4 sm:p-6 rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] space-y-4 shadow-xs"
            >
              {/* The Sher Card */}
              <SherCard
                sher={sher}
                isBookmarked={true}
                onPlayRecitation={onPlayRecitation}
                onToggleBookmark={() => onRemoveBookmark(sher.id)}
                onOpenWordGloss={onOpenWordGloss}
                onOpenFolioExporter={onOpenFolioExporter}
                fontSizeUrdu={24}
              />

              {/* Personal Note / Hashia Section */}
              <div className="p-3.5 bg-[#FCF9F2] dark:bg-[#0B1325] rounded-[4px] border border-[#E2D9C8] dark:border-[#233152] text-right font-sans text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    {editingNoteId !== sher.id ? (
                      <button
                        onClick={() => handleStartEditNote(sher.id, bookmark.personalNote)}
                        className="text-[#1B4D3E] dark:text-[#9ED1BD] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <PenTool className="w-3 h-3" />
                        <span>{bookmark.personalNote ? 'حاشیہ میں ترمیم' : 'ذاتی حاشیہ درج کریں'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSaveNote(sher.id)}
                        className="px-2.5 py-1 bg-[#131E3A] text-[#FCF9F2] rounded text-[11px] font-bold cursor-pointer"
                      >
                        محفوظ کریں
                      </button>
                    )}
                  </div>

                  <span className="font-semibold text-[#131E3A] dark:text-[#FCF9F2] flex items-center gap-1">
                    <span>حاشیہ و تاثراتِ قاری (Reader Marginalia):</span>
                    <FileEdit className="w-3.5 h-3.5 text-[#C5A059]" />
                  </span>
                </div>

                {editingNoteId === sher.id ? (
                  <textarea
                    value={currentNoteText}
                    onChange={(e) => setCurrentNoteText(e.target.value)}
                    placeholder="اس شعر کے بارے میں اپنے احساسات یا حوالہ تحریر فرمائیں..."
                    className="w-full p-2 rounded bg-[#F4EFE6] dark:bg-[#111A30] border border-[#C5A059] text-xs text-right focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    rows={3}
                    dir="rtl"
                  />
                ) : (
                  <p className="text-[#45464D] dark:text-[#C6C6CE] leading-relaxed italic" dir="rtl">
                    {bookmark.personalNote || 'کوئی حاشیہ درج نہیں ہوا۔ ترمیم کے بٹن سے اپنی رائے شامل کریں۔'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 sm:p-16 text-center rounded-[8px] bg-[#F4EFE6] dark:bg-[#111A30] border-2 border-dashed border-[#E2D9C8] dark:border-[#233152] space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
            <Bookmark className="w-8 h-8" />
          </div>

          <h3 className="font-nastaliq text-3xl text-[#131E3A] dark:text-[#FCF9F2]">
            آپ کی بیاض ابھی تشنۂ کلام ہے
          </h3>

          <p className="font-serif text-sm sm:text-base text-[#76777E] dark:text-[#A4823E] max-w-md mx-auto leading-relaxed">
            مطالعۂ کلام کے دوران کسی بھی شعر پر نشانِ بیاض (Bookmark) دبا کر اسے یہاں ہمیشہ کے لیے محفوظ کیا جا سکتا ہے۔
          </p>

          <div className="pt-2">
            <button
              onClick={onGoToReader}
              className="px-6 py-2.5 text-xs font-semibold text-[#FCF9F2] bg-[#131E3A] hover:bg-[#1B4D3E] border border-[#C5A059] rounded-[4px] transition-colors cursor-pointer font-sans shadow-sm"
            >
              مطالعۂ کلام کی طرف رجوع کریں
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
