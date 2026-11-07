import React, { useState } from 'react';
import { POETS_LIST, GHAZALS_CATALOG } from '../data/literatureData';
import { Poet, Ghazal } from '../types';
import { BookOpen, MapPin, Calendar, ArrowLeft, Search, Sparkles } from 'lucide-react';

interface PoetsDirectoryProps {
  onSelectPoet: (poet: Poet) => void;
  onSelectGhazal: (ghazal: Ghazal) => void;
}

export const PoetsDirectory: React.FC<PoetsDirectoryProps> = ({
  onSelectGhazal,
}) => {
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPoetModal, setSelectedPoetModal] = useState<Poet | null>(null);

  const filteredPoets = POETS_LIST.filter((poet) => {
    const matchesSchool = selectedSchool === 'all' || poet.school === selectedSchool;
    const matchesSearch =
      !searchQuery.trim() ||
      poet.nameUrdu.includes(searchQuery) ||
      poet.nameLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poet.takhallus.includes(searchQuery) ||
      poet.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSchool && matchesSearch;
  });

  const handleOpenGhazalForPoet = (poetId: string) => {
    const ghazal = GHAZALS_CATALOG.find((g) => g.poetId === poetId) || GHAZALS_CATALOG[0];
    onSelectGhazal(ghazal);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <section className="text-right border-b border-[#E2D9C8] dark:border-[#233152] pb-6">
        <span className="text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD] uppercase tracking-widest flex items-center justify-end gap-1.5 mb-1">
          <span>تذکرہ نگاری و سوانحِ شعراء</span>
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
        </span>
        <h1 className="font-nastaliq text-3xl sm:text-4xl lg:text-5xl text-[#131E3A] dark:text-[#FCF9F2] leading-relaxed">
          تذکرۂ اساتذۂ سخن (Directory of Master Poets)
        </h1>
        <p className="font-serif text-sm sm:text-base text-[#45464D] dark:text-[#C6C6CE] max-w-2xl mt-1">
          Biographies, literary schools, historical eras, and major diwans of the luminaries who forged classical and modern Urdu literature.
        </p>

        {/* Filters and Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="شاعر، تخلص یا شہر تلاش کریں..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-[4px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] focus:border-[#C5A059] text-xs text-right"
              dir="rtl"
            />
            <Search className="w-3.5 h-3.5 text-[#76777E] absolute left-2.5 top-2.5" />
          </div>

          {/* School Filter Tabs */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'تمام مکاتبِ فکر (All)' },
              { id: 'Dabistan-e-Delhi', label: 'دبستانِ دہلی' },
              { id: 'Taraqqi Pasand', label: 'ترقی پسند تحریک' },
              { id: 'Jadidiyat', label: 'جدیدیت' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSchool(tab.id)}
                className={`px-3 py-1.5 rounded-[4px] border transition-colors cursor-pointer ${
                  selectedSchool === tab.id
                    ? 'bg-[#131E3A] text-[#FCF9F2] border-[#C5A059] font-bold'
                    : 'bg-[#FCF9F2] dark:bg-[#0B1325] border-[#E2D9C8] dark:border-[#233152] text-[#45464D] dark:text-[#C6C6CE] hover:border-[#C5A059]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Poets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoets.map((poet) => (
          <article
            key={poet.id}
            className="p-6 rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059] transition-all text-right shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Avatar and Dates */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="text-left font-sans text-xs text-[#76777E] dark:text-[#A4823E] space-y-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{poet.dates}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{poet.city}</span>
                  </div>
                </div>

                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-sm shrink-0">
                  <img
                    src={poet.portraitUrl}
                    alt={poet.nameLatin}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Names and Takhallus */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs rounded bg-[#FCF9F2] dark:bg-[#0B1325] text-[#1B4D3E] dark:text-[#9ED1BD] border border-[#E2D9C8] dark:border-[#233152] font-nastaliq-tight">
                  تخلص: {poet.takhallus}
                </span>
                <h3 className="font-nastaliq text-2xl text-[#131E3A] dark:text-[#FCF9F2]">
                  {poet.nameUrdu}
                </h3>
              </div>

              <p className="font-sans text-xs text-[#76777E] dark:text-[#A4823E] mb-3">
                {poet.nameLatin}
              </p>

              {/* Bio summary */}
              <p className="font-serif text-xs sm:text-sm text-[#45464D] dark:text-[#C6C6CE] leading-relaxed mb-4 line-clamp-3">
                {poet.bio}
              </p>

              {/* Famous couplet box */}
              <div className="p-3 bg-[#FCF9F2] dark:bg-[#0B1325] rounded-[4px] border border-[#E2D9C8] dark:border-[#233152] mb-4">
                <span className="block text-[11px] font-sans text-[#C5A059] mb-1">
                  مشہور شعر:
                </span>
                <p className="font-nastaliq-tight text-sm text-[#131E3A] dark:text-[#FCF9F2] truncate" dir="rtl">
                  {poet.famousSher.misra1}
                </p>
                <p className="font-nastaliq-tight text-sm text-[#131E3A] dark:text-[#FCF9F2] truncate" dir="rtl">
                  {poet.famousSher.misra2}
                </p>
              </div>
            </div>

            {/* Actions: View Bio & Read Diwan */}
            <div className="pt-3 border-t border-[#E2D9C8] dark:border-[#233152] flex items-center justify-between gap-2 font-sans text-xs">
              <button
                onClick={() => setSelectedPoetModal(poet)}
                className="text-[#76777E] dark:text-[#A4823E] hover:text-[#131E3A] dark:hover:text-[#FCF9F2] underline cursor-pointer"
              >
                تفصیلی سوانح حیات
              </button>

              <button
                onClick={() => handleOpenGhazalForPoet(poet.id)}
                className="px-3 py-1.5 bg-[#131E3A] dark:bg-[#1B4D3E] text-[#FCF9F2] hover:bg-[#1B4D3E] rounded-[4px] border border-[#C5A059] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>دیوان پڑھیں</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Poet Detail Modal */}
      {selectedPoetModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-xl bg-[#FCF9F2] dark:bg-[#111A30] border border-[#C5A059] rounded-[6px] shadow-2xl p-6 sm:p-8 text-right overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between gap-4 border-b border-[#E2D9C8] dark:border-[#233152] pb-4 mb-4">
              <button
                onClick={() => setSelectedPoetModal(null)}
                className="px-3 py-1 rounded bg-[#F4EFE6] dark:bg-[#0B1325] text-xs font-sans text-[#76777E] hover:text-[#131E3A]"
              >
                بند کریں
              </button>
              <h3 className="font-nastaliq text-3xl text-[#131E3A] dark:text-[#FCF9F2]">
                {selectedPoetModal.nameUrdu}
              </h3>
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#45464D] dark:text-[#C6C6CE]">
              <p className="font-nastaliq-tight text-base sm:text-lg text-[#131E3A] dark:text-[#FCF9F2] leading-relaxed" dir="rtl">
                {selectedPoetModal.bioUrdu}
              </p>

              <p className="font-serif leading-relaxed text-[#1C1C18] dark:text-[#E5E2DB]">
                {selectedPoetModal.bio}
              </p>

              <div className="p-4 bg-[#F4EFE6] dark:bg-[#0B1325] rounded-[4px] border border-[#E2D9C8] dark:border-[#233152]">
                <h4 className="font-semibold text-[#131E3A] dark:text-[#FCF9F2] mb-2">
                  اہم تصانیف و دیوان (Major Works):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPoetModal.majorWorks.map((work, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#FCF9F2] dark:bg-[#14203B] rounded border border-[#E2D9C8] text-xs text-[#1B4D3E] dark:text-[#9ED1BD] font-nastaliq-tight"
                    >
                      {work}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#E2D9C8] dark:border-[#233152] flex justify-end">
              <button
                onClick={() => {
                  const pId = selectedPoetModal.id;
                  setSelectedPoetModal(null);
                  handleOpenGhazalForPoet(pId);
                }}
                className="px-5 py-2 bg-[#131E3A] text-[#FCF9F2] hover:bg-[#1B4D3E] rounded-[4px] border border-[#C5A059] text-xs font-sans font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>دیوان کے تمام اشعار کھولیں</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
