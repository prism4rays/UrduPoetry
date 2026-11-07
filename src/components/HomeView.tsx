import React from 'react';
import { 
  POETS_LIST, 
  GHAZALS_CATALOG, 
  CURATED_COLLECTIONS, 
  HERO_MANUSCRIPT_IMG, 
  DEWAN_BINDING_IMG 
} from '../data/literatureData';
import { Ghazal, Poet, Sher, WordGloss } from '../types';
import { SherCard } from './SherCard';
import { 
  BookOpen, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Feather, 
  ArrowLeft,
  Headphones,
  Scroll
} from 'lucide-react';

interface HomeViewProps {
  onSelectGhazal: (ghazal: Ghazal) => void;
  onSelectPoet: (poet: Poet) => void;
  onOpenAroozGuide: () => void;
  onPlayRecitation: (sher: Sher) => void;
  onToggleBookmark: (sher: Sher) => void;
  isBookmarked: (sherId: string) => boolean;
  onOpenWordGloss: (gloss: WordGloss) => void;
  onOpenFolioExporter: (sher: Sher) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectGhazal,
  onSelectPoet,
  onOpenAroozGuide,
  onPlayRecitation,
  onToggleBookmark,
  isBookmarked,
  onOpenWordGloss,
  onOpenFolioExporter,
}) => {
  // Featured Sher of the Day (Ghalib's iconic couplet)
  const featuredGhazal = GHAZALS_CATALOG[0];
  const featuredSher = featuredGhazal.ashar[0];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Editorial Hero Marquee */}
      <section className="relative overflow-hidden rounded-[8px] border border-[#E2D9C8] dark:border-[#233152] bg-[#F4EFE6] dark:bg-[#111A30] shadow-[0_4px_20px_-4px_rgba(19,30,58,0.08)]">
        {/* Background image with measured contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_MANUSCRIPT_IMG}
            alt="Mughal illuminated manuscript of classical Urdu literature"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 dark:opacity-20 filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4EFE6] via-[#F4EFE6]/80 to-[#F4EFE6]/40 dark:from-[#111A30] dark:via-[#111A30]/85 dark:to-[#111A30]/50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-16 text-right max-w-4xl mx-auto">
          {/* Archival Offline-First Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#1B4D3E]/40 text-[#1B4D3E] dark:text-[#9ED1BD] text-xs font-sans mb-4 shadow-xs">
            <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>گنجینۂ ادب · نسخۂ مصدقہ و محفوظ (Offline Archival Repository)</span>
          </div>

          <h1 className="font-nastaliq text-4xl sm:text-5xl lg:text-6xl text-[#131E3A] dark:text-[#FCF9F2] leading-[1.8] sm:leading-[1.9] tracking-wide mb-2 text-wrap-balance">
            اردو کلاسیکی و جدید شاعری کا مستند سفینہ
          </h1>

          <p className="font-serif text-base sm:text-lg text-[#45464D] dark:text-[#C6C6CE] leading-relaxed max-w-2xl mb-8">
            An illuminated repository of classical ghazals, revolutionary nazms, and profound couplets. Rendered in authentic Nastaliq typography with metrical prosody (Ilm-e-Arooz), synchronized audio recitation, and scholarly lexicons.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-start sm:justify-start gap-3 font-sans">
            <button
              onClick={() => onSelectGhazal(featuredGhazal)}
              className="px-6 py-3 text-sm font-semibold text-[#FCF9F2] bg-[#131E3A] hover:bg-[#1B4D3E] border border-[#C5A059] rounded-[4px] shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>دیوانِ غالب کھولیں (Read Dewan-e-Ghalib)</span>
            </button>

            <button
              onClick={onOpenAroozGuide}
              className="px-5 py-3 text-sm font-medium text-[#131E3A] dark:text-[#FCF9F2] bg-[#FCF9F2] dark:bg-[#0B1325] border border-[#C5A059] hover:bg-[#E2D9C8]/40 dark:hover:bg-[#233152] rounded-[4px] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#C5A059]" />
              <span>رہنمائے علمِ عروض (Prosody Guide)</span>
            </button>
          </div>

          {/* Operational Utility Ribbon */}
          <div className="mt-8 pt-6 border-t border-[#E2D9C8]/70 dark:border-[#233152]/70 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#76777E] dark:text-[#A4823E]">
            <div className="flex items-center gap-4">
              <span>۸ اساتذۂ سخن</span>
              <span>·</span>
              <span>مستند بحور و تقطیع</span>
              <span>·</span>
              <span>صوتی تحت اللفظ قرأت</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#1B4D3E] dark:text-[#9ED1BD]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>تمام متون بغیر انٹرنیٹ کے محفوظ ہیں</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Sher of the Day (شعرِ امروز) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-[#E2D9C8] dark:border-[#233152] pb-3 text-right">
          <div className="flex items-center gap-2 text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>منتخب شعرِ امروز · با تذہیب و خطاطی</span>
          </div>
          <h2 className="font-nastaliq text-2xl sm:text-3xl text-[#131E3A] dark:text-[#FCF9F2]">
            شعرِ امروز (Sher of the Day)
          </h2>
        </div>

        <SherCard
          sher={featuredSher}
          isBookmarked={isBookmarked(featuredSher.id)}
          onPlayRecitation={onPlayRecitation}
          onToggleBookmark={onToggleBookmark}
          onOpenWordGloss={onOpenWordGloss}
          onOpenFolioExporter={onOpenFolioExporter}
          fontSizeUrdu={26}
        />
      </section>

      {/* Section: Curated Collections (مجموعہ ہائے کلام) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4 border-b border-[#E2D9C8] dark:border-[#233152] pb-3 text-right">
          <button
            onClick={() => onSelectGhazal(GHAZALS_CATALOG[1])}
            className="text-xs font-sans font-medium text-[#1B4D3E] dark:text-[#9ED1BD] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>تمام مجموعے دیکھیں</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <h2 className="font-nastaliq text-2xl sm:text-3xl text-[#131E3A] dark:text-[#FCF9F2]">
            منتخب مجموعہ ہائے کلام (Curated Anthologies)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURATED_COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              onClick={() => onSelectGhazal(GHAZALS_CATALOG[idx % GHAZALS_CATALOG.length])}
              className="p-6 rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059] transition-all cursor-pointer group text-right shadow-xs hover:shadow-md relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-sans text-[#76777E] dark:text-[#A4823E]">
                  {col.count} کلام محفوظ
                </span>
                <span className="px-2 py-0.5 text-xs rounded bg-[#FCF9F2] dark:bg-[#0B1325] text-[#1B4D3E] dark:text-[#9ED1BD] border border-[#E2D9C8] dark:border-[#233152] font-nastaliq-tight">
                  {col.badgeUrdu}
                </span>
              </div>

              <h3 className="font-nastaliq text-2xl text-[#131E3A] dark:text-[#FCF9F2] group-hover:text-[#1B4D3E] dark:group-hover:text-[#D4AF37] transition-colors mb-2">
                {col.titleUrdu}
              </h3>

              <p className="font-serif italic text-xs text-[#76777E] dark:text-[#A4823E] mb-2 font-sans">
                {col.titleEnglish}
              </p>

              <p className="font-sans text-xs text-[#45464D] dark:text-[#C6C6CE] leading-relaxed">
                {col.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Master Poets (اساتذۂ سخن) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4 border-b border-[#E2D9C8] dark:border-[#233152] pb-3 text-right">
          <span className="text-xs font-sans text-[#76777E] dark:text-[#A4823E]">
            دہلی، لکھنؤ، لاہور اور کراچی کے ادوار
          </span>
          <h2 className="font-nastaliq text-2xl sm:text-3xl text-[#131E3A] dark:text-[#FCF9F2]">
            اساتذۂ سخن (Master Poets)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POETS_LIST.slice(0, 6).map((poet) => (
            <div
              key={poet.id}
              onClick={() => onSelectPoet(poet)}
              className="p-5 rounded-[6px] bg-[#F4EFE6] dark:bg-[#111A30] border border-[#E2D9C8] dark:border-[#233152] hover:border-[#C5A059] transition-all cursor-pointer group text-right flex flex-col justify-between"
            >
              <div>
                {/* Poet Portrait Avatar & Dates */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-sans text-[#76777E] dark:text-[#A4823E]">
                    {poet.dates}
                  </span>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-sm shrink-0">
                    <img
                      src={poet.portraitUrl}
                      alt={poet.nameLatin}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="font-nastaliq text-2xl text-[#131E3A] dark:text-[#FCF9F2] group-hover:text-[#1B4D3E] dark:group-hover:text-[#D4AF37] transition-colors">
                  {poet.nameUrdu}
                </h3>
                <p className="font-sans text-xs text-[#76777E] dark:text-[#A4823E] mb-3">
                  {poet.nameLatin} · {poet.city}
                </p>

                {/* Famous Sher Snippet */}
                <div className="p-3 bg-[#FCF9F2] dark:bg-[#0B1325] border-r-2 border-[#C5A059] rounded-l-[4px] text-right mb-4">
                  <p className="font-nastaliq-tight text-sm text-[#131E3A] dark:text-[#FCF9F2] leading-loose truncate" dir="rtl">
                    {poet.famousSher.misra1}
                  </p>
                  <p className="font-nastaliq-tight text-sm text-[#131E3A] dark:text-[#FCF9F2] leading-loose truncate" dir="rtl">
                    {poet.famousSher.misra2}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2D9C8]/60 dark:border-[#233152]/60 flex items-center justify-between text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD]">
                <span>{poet.totalGhazalsCount} کلام</span>
                <span className="group-hover:-translate-x-1 transition-transform flex items-center gap-1 font-medium">
                  <span>دیوان ملاحظہ کریں</span>
                  <ArrowLeft className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Antique Dewan Binding Presentation Spotlight */}
      <section className="p-6 sm:p-10 rounded-[8px] bg-[#131E3A] text-[#FCF9F2] border border-[#C5A059] shadow-lg flex flex-col md:flex-row items-center gap-8 text-right">
        <div className="w-full md:w-1/2 relative rounded-[6px] overflow-hidden border border-[#C5A059]/60 shadow-md">
          <img
            src={DEWAN_BINDING_IMG}
            alt="Leather bound antique Dewan of Urdu poetry"
            referrerPolicy="no-referrer"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131E3A]/80 to-transparent" />
          <div className="absolute bottom-3 right-3 text-right font-sans text-xs text-[#D4AF37]">
            نسخۂ نایاب · دیوانِ غالب مع قلمدان
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <span className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] flex items-center justify-end gap-1.5">
            <span>تاریخی مخطوطات و اشاعت</span>
            <Scroll className="w-4 h-4" />
          </span>

          <h3 className="font-nastaliq text-3xl sm:text-4xl text-[#FCF9F2] leading-loose">
            مغل دربار سے عصری جامعات تک
          </h3>

          <p className="font-serif text-sm sm:text-base text-[#E5E2DB] leading-relaxed">
            گنجینۂ ادب میں تمام اشعار معتبر نسخوں، دیوانوں اور تحقیقی متون سے حاصل کیے گئے ہیں۔ اشعار کی بحر، اوزان اور تقطیع کا باریک بینی سے جائزہ لیا گیا ہے تاکہ محققین اور شائقینِ سخن کو خالص ترین ادبی تجربہ میسر آئے۔
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-start gap-3 font-sans">
            <button
              onClick={() => onSelectGhazal(GHAZALS_CATALOG[2])}
              className="px-5 py-2.5 text-xs font-semibold text-[#131E3A] bg-[#D4AF37] hover:bg-[#E9C176] rounded-[4px] transition-colors cursor-pointer"
            >
              فیض احمد فیض کی نظمیں پڑھیں
            </button>
            <button
              onClick={() => onSelectGhazal(GHAZALS_CATALOG[1])}
              className="px-5 py-2.5 text-xs font-medium text-[#FCF9F2] bg-transparent border border-[#C5A059] hover:bg-[#C5A059]/20 rounded-[4px] transition-colors cursor-pointer"
            >
              علامہ اقبال کا کلام
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
