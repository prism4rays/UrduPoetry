import React, { useState } from 'react';
import { GHAZALS_CATALOG, POETS_LIST } from '../data/literatureData';
import { Ghazal, Sher, WordGloss, ReadingSettings } from '../types';
import { SherCard } from './SherCard';
import { 
  BookOpen, 
  Settings2, 
  Volume2, 
  Sparkles, 
  Feather, 
  CheckCircle2, 
  ChevronDown, 
  Compass,
  Search
} from 'lucide-react';

interface ReaderViewProps {
  currentGhazal: Ghazal;
  onSelectGhazal: (ghazal: Ghazal) => void;
  activeSherId: string | null;
  onPlayRecitation: (sher: Sher) => void;
  onToggleBookmark: (sher: Sher) => void;
  isBookmarked: (sherId: string) => boolean;
  onOpenWordGloss: (gloss: WordGloss) => void;
  onOpenFolioExporter: (sher: Sher) => void;
  onOpenAroozGuide: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  currentGhazal,
  onSelectGhazal,
  activeSherId,
  onPlayRecitation,
  onToggleBookmark,
  isBookmarked,
  onOpenWordGloss,
  onOpenFolioExporter,
  onOpenAroozGuide,
}) => {
  const [settings, setSettings] = useState<ReadingSettings>({
    fontSizeUrdu: 24,
    lineHeightScale: 2.45,
    showTransliteration: true,
    showTranslation: true,
    showAerab: true,
    theme: 'wasli',
    fontFamily: 'nastaliq',
  });

  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const poet = POETS_LIST.find((p) => p.id === currentGhazal.poetId) || POETS_LIST[0];

  const filteredAshar = currentGhazal.ashar.filter((sher) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      sher.misra1.includes(query) ||
      sher.misra2.includes(query) ||
      sher.translation.toLowerCase().includes(query) ||
      sher.transliteration1.toLowerCase().includes(query) ||
      sher.transliteration2.toLowerCase().includes(query)
    );
  });

  const handlePlayFullGhazal = () => {
    if (currentGhazal.ashar.length > 0) {
      onPlayRecitation(currentGhazal.ashar[0]);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Ghazal Switcher & Settings Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] shadow-xs">
        {/* Ghazal Dropdown Selector */}
        <div className="relative w-full sm:w-auto">
          <select
            value={currentGhazal.id}
            onChange={(e) => {
              const selected = GHAZALS_CATALOG.find((g) => g.id === e.target.value);
              if (selected) onSelectGhazal(selected);
            }}
            className="w-full sm:w-72 px-4 py-2 text-sm font-nastaliq-tight text-[#131E3A] dark:text-[#FCF9F2] bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#C5A059] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer"
            dir="rtl"
          >
            {GHAZALS_CATALOG.map((g) => (
              <option key={g.id} value={g.id}>
                {g.titleUrdu} ({g.poetId === 'ghalib' ? 'غالب' : g.poetId === 'iqbal' ? 'اقبال' : g.poetId === 'faiz' ? 'فیض' : 'میر'})
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls: Play Full, Reader Settings, Prosody */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end font-sans">
          <button
            onClick={handlePlayFullGhazal}
            className="px-4 py-2 text-xs font-semibold text-[#FCF9F2] bg-[#131E3A] dark:bg-[#1B4D3E] hover:bg-[#1B4D3E] border border-[#C5A059] rounded-[4px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>پوری غزل سنیں (Play All)</span>
          </button>

          <button
            onClick={onOpenAroozGuide}
            className="px-3 py-2 text-xs font-medium text-[#131E3A] dark:text-[#FCF9F2] bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059] rounded-[4px] transition-colors flex items-center gap-1 cursor-pointer"
            title="بحر و تقطیع کی تفصیل"
          >
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">علمِ عروض</span>
          </button>

          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className={`p-2 rounded-[4px] border transition-colors cursor-pointer ${
              showSettingsDrawer
                ? 'bg-[#131E3A] text-[#D4AF37] border-[#C5A059]'
                : 'bg-[#FCF9F2] dark:bg-[#0B1325] border-[#E2D9C8] dark:border-[#233152] text-[#45464D] dark:text-[#FCF9F2]'
            }`}
            title="مطالعہ کی ترتیبات (Reading Settings)"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reader Settings Drawer (if opened) */}
      {showSettingsDrawer && (
        <div className="p-5 rounded-[6px] bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#C5A059] shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-xs text-right">
          {/* Nastaliq Font Size Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#131E3A] dark:text-[#FCF9F2]">
                {settings.fontSizeUrdu}px
              </span>
              <span className="text-[#76777E] dark:text-[#A4823E]">حجمِ خطاطی (Urdu Font Size):</span>
            </div>
            <input
              type="range"
              min="20"
              max="34"
              step="2"
              value={settings.fontSizeUrdu}
              onChange={(e) => setSettings({ ...settings, fontSizeUrdu: Number(e.target.value) })}
              className="w-full accent-[#C5A059] cursor-pointer"
            />
          </div>

          {/* Toggle Switches */}
          <div className="space-y-2">
            <label className="flex items-center justify-end gap-2 cursor-pointer">
              <span className="text-[#45464D] dark:text-[#C6C6CE]">انگریزی ترجمہ دکھائیں (Translation)</span>
              <input
                type="checkbox"
                checked={settings.showTranslation}
                onChange={(e) => setSettings({ ...settings, showTranslation: e.target.checked })}
                className="accent-[#C5A059] rounded"
              />
            </label>
            <label className="flex items-center justify-end gap-2 cursor-pointer">
              <span className="text-[#45464D] dark:text-[#C6C6CE]">رومن تلفظ دکھائیں (Transliteration)</span>
              <input
                type="checkbox"
                checked={settings.showTransliteration}
                onChange={(e) => setSettings({ ...settings, showTransliteration: e.target.checked })}
                className="accent-[#C5A059] rounded"
              />
            </label>
          </div>

          {/* Search within Ghazal */}
          <div>
            <span className="block text-[#76777E] dark:text-[#A4823E] mb-1">تلاش برائے شعر یا معنی:</span>
            <div className="relative">
              <input
                type="text"
                placeholder="مصرع یا ترجمہ تلاش کریں..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-[4px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] focus:border-[#C5A059] text-xs text-right"
              />
              <Search className="w-3.5 h-3.5 text-[#76777E] absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>
      )}

      {/* Manuscript Folio Header */}
      <section className="relative p-6 sm:p-10 rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border-2 border-[#E2D9C8] dark:border-[#233152] text-right shadow-sm overflow-hidden">
        {/* Subtle Gold Leaf Corner Vignettes */}
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]" />
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]" />

        {/* Archival metadata tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-sans">
          <div className="flex items-center gap-1.5 text-[#1B4D3E] dark:text-[#9ED1BD] bg-[#FCF9F2] dark:bg-[#0B1325] px-3 py-1 rounded border border-[#1B4D3E]/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
            <span>نسخۂ مصدقہ · محفوظ آف لائن</span>
          </div>

          <div className="text-[#76777E] dark:text-[#A4823E] flex items-center gap-2">
            <span>{currentGhazal.collection}</span>
            <span>·</span>
            <span>{currentGhazal.era}</span>
          </div>
        </div>

        {/* Ghazal Title */}
        <h1 className="font-nastaliq text-3xl sm:text-4xl lg:text-5xl text-[#131E3A] dark:text-[#FCF9F2] leading-relaxed mb-3">
          {currentGhazal.titleUrdu}
        </h1>

        <p className="font-serif italic text-sm text-[#76777E] dark:text-[#A4823E] mb-4 font-sans">
          "{currentGhazal.titleEnglish}" — {poet.nameLatin}
        </p>

        {/* Prosody & Structure Details Bar */}
        <div className="p-4 bg-[#FCF9F2] dark:bg-[#0B1325] rounded-[4px] border border-[#E2D9C8] dark:border-[#233152] flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD]">
          <div>
            <span className="font-semibold text-[#131E3A] dark:text-[#FCF9F2]">شاعر: </span>
            <span>{poet.nameUrdu} ({poet.takhallus})</span>
          </div>

          <div>
            <span className="font-semibold text-[#131E3A] dark:text-[#FCF9F2]">بحر: </span>
            <span>{currentGhazal.behrName}</span>
          </div>

          {currentGhazal.radeef && (
            <div>
              <span className="font-semibold text-[#131E3A] dark:text-[#FCF9F2]">ردیف: </span>
              <span>"{currentGhazal.radeef}"</span>
            </div>
          )}

          <div>
            <span className="font-semibold text-[#131E3A] dark:text-[#FCF9F2]">قوافی: </span>
            <span>{currentGhazal.qafiaExample}</span>
          </div>
        </div>

        {/* Curatorial Overview */}
        <p className="mt-4 font-serif text-sm text-[#45464D] dark:text-[#C6C6CE] leading-relaxed">
          {currentGhazal.overview}
        </p>
      </section>

      {/* Couplets List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2D9C8] dark:border-[#233152] pb-2 text-right">
          <span className="text-xs font-sans text-[#76777E] dark:text-[#A4823E]">
            {filteredAshar.length} اشعار دستیاب
          </span>
          <h2 className="font-nastaliq text-2xl text-[#131E3A] dark:text-[#FCF9F2]">
            متنِ غزل مع شرح و تقطیع
          </h2>
        </div>

        {filteredAshar.map((sher) => (
          <SherCard
            key={sher.id}
            sher={sher}
            isActiveAudio={activeSherId === sher.id}
            isBookmarked={isBookmarked(sher.id)}
            showTransliteration={settings.showTransliteration}
            showTranslation={settings.showTranslation}
            fontSizeUrdu={settings.fontSizeUrdu}
            onPlayRecitation={onPlayRecitation}
            onToggleBookmark={onToggleBookmark}
            onOpenWordGloss={onOpenWordGloss}
            onOpenFolioExporter={onOpenFolioExporter}
          />
        ))}

        {filteredAshar.length === 0 && (
          <div className="p-12 text-center rounded bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152]">
            <p className="font-nastaliq text-xl text-[#76777E]">اس تلاش کے مطابق کوئی شعر نہیں ملا۔</p>
          </div>
        )}
      </section>
    </div>
  );
};
