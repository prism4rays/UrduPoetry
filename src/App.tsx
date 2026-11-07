import React, { useState, useEffect } from 'react';
import { GHAZALS_CATALOG, POETS_LIST, ALL_ASHAR } from './data/literatureData';
import { Ghazal, Poet, Sher, BookmarkItem, WordGloss } from './types';
import { TopNav } from './components/TopNav';
import { HomeView } from './components/HomeView';
import { ReaderView } from './components/ReaderView';
import { PoetsDirectory } from './components/PoetsDirectory';
import { BaitBaziExplorer } from './components/BaitBaziExplorer';
import { BayazNotebook } from './components/BayazNotebook';
import { AudioDockPlayer } from './components/AudioDockPlayer';
import { LexiconModal } from './components/LexiconModal';
import { AroozGuideModal } from './components/AroozGuideModal';
import { FolioExporterModal } from './components/FolioExporterModal';
import { recitationEngine } from './utils/audioEngine';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'reader' | 'poets' | 'baitbazi' | 'bayaz'>('home');
  const [currentGhazal, setCurrentGhazal] = useState<Ghazal>(GHAZALS_CATALOG[0]);
  const [activeSher, setActiveSher] = useState<Sher | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Bookmarks state with localStorage persistence
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('ganjina_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default seed with Ghalib's first couplet
    return [
      {
        id: 'b-seed-1',
        sherId: 'ghalib-dil-e-nadan-1',
        ghazalId: 'ghalib-dil-e-nadan',
        addedAt: new Date().toISOString(),
        personalNote: 'شہکار مطلع۔ دردِ عشق کی لازوال تصویر کشی۔',
      },
    ];
  });

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ganjina_theme');
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  // Modal states
  const [activeGloss, setActiveGloss] = useState<WordGloss | null>(null);
  const [activeFolioSher, setActiveFolioSher] = useState<Sher | null>(null);
  const [isAroozOpen, setIsAroozOpen] = useState<boolean>(false);

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ganjina_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ganjina_theme', 'light');
    }
  }, [isDark]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ganjina_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // safe fallback
    }
  }, [bookmarks]);

  // Audio Playback Handlers
  const handlePlayRecitation = (sher: Sher) => {
    if (activeSher?.id === sher.id && isPlaying) {
      recitationEngine.pause();
      setIsPlaying(false);
    } else {
      setActiveSher(sher);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      recitationEngine.pause();
      setIsPlaying(false);
    } else {
      if (!activeSher) {
        setActiveSher(currentGhazal.ashar[0] || ALL_ASHAR[0]);
      }
      setIsPlaying(true);
    }
  };

  const handleNextSher = () => {
    if (!activeSher) return;
    const parentGhazal = GHAZALS_CATALOG.find((g) => g.id === activeSher.ghazalId) || currentGhazal;
    const currentIndex = parentGhazal.ashar.findIndex((s) => s.id === activeSher.id);
    if (currentIndex >= 0 && currentIndex < parentGhazal.ashar.length - 1) {
      setActiveSher(parentGhazal.ashar[currentIndex + 1]);
      setIsPlaying(true);
    } else {
      // Loop or stop
      setIsPlaying(false);
    }
  };

  const handlePrevSher = () => {
    if (!activeSher) return;
    const parentGhazal = GHAZALS_CATALOG.find((g) => g.id === activeSher.ghazalId) || currentGhazal;
    const currentIndex = parentGhazal.ashar.findIndex((s) => s.id === activeSher.id);
    if (currentIndex > 0) {
      setActiveSher(parentGhazal.ashar[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  const handleCloseAudio = () => {
    recitationEngine.stopSpeaking();
    recitationEngine.stopAmbientDrone();
    setIsPlaying(false);
    setActiveSher(null);
  };

  // Bookmark toggler
  const isBookmarked = (sherId: string): boolean => {
    return bookmarks.some((b) => b.sherId === sherId);
  };

  const handleToggleBookmark = (sher: Sher) => {
    if (isBookmarked(sher.id)) {
      setBookmarks(bookmarks.filter((b) => b.sherId !== sher.id));
    } else {
      const newBookmark: BookmarkItem = {
        id: `bm-${Date.now()}`,
        sherId: sher.id,
        ghazalId: sher.ghazalId,
        addedAt: new Date().toISOString(),
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const handleUpdateNote = (sherId: string, note: string) => {
    setBookmarks(
      bookmarks.map((b) => (b.sherId === sherId ? { ...b, personalNote: note } : b))
    );
  };

  const handleRemoveBookmark = (sherId: string) => {
    setBookmarks(bookmarks.filter((b) => b.sherId !== sherId));
  };

  // Navigation callbacks
  const handleSelectGhazal = (ghazal: Ghazal) => {
    setCurrentGhazal(ghazal);
    setCurrentTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPoet = (poet: Poet) => {
    const ghazal = GHAZALS_CATALOG.find((g) => g.poetId === poet.id) || GHAZALS_CATALOG[0];
    setCurrentGhazal(ghazal);
    setCurrentTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2] dark:bg-[#0B1325] text-[#1C1C18] dark:text-[#FCF9F2] wasli-paper-texture transition-colors duration-300">
      {/* Top Bar Contract (3 zones) */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomeView
            onSelectGhazal={handleSelectGhazal}
            onSelectPoet={handleSelectPoet}
            onOpenAroozGuide={() => setIsAroozOpen(true)}
            onPlayRecitation={handlePlayRecitation}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onOpenWordGloss={(gloss) => setActiveGloss(gloss)}
            onOpenFolioExporter={(sher) => setActiveFolioSher(sher)}
          />
        )}

        {currentTab === 'reader' && (
          <ReaderView
            currentGhazal={currentGhazal}
            onSelectGhazal={(g) => setCurrentGhazal(g)}
            activeSherId={isPlaying ? activeSher?.id || null : null}
            onPlayRecitation={handlePlayRecitation}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onOpenWordGloss={(gloss) => setActiveGloss(gloss)}
            onOpenFolioExporter={(sher) => setActiveFolioSher(sher)}
            onOpenAroozGuide={() => setIsAroozOpen(true)}
          />
        )}

        {currentTab === 'poets' && (
          <PoetsDirectory
            onSelectPoet={handleSelectPoet}
            onSelectGhazal={handleSelectGhazal}
          />
        )}

        {currentTab === 'baitbazi' && (
          <BaitBaziExplorer
            onPlayRecitation={handlePlayRecitation}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onOpenWordGloss={(gloss) => setActiveGloss(gloss)}
            onOpenFolioExporter={(sher) => setActiveFolioSher(sher)}
          />
        )}

        {currentTab === 'bayaz' && (
          <BayazNotebook
            bookmarks={bookmarks}
            onRemoveBookmark={handleRemoveBookmark}
            onUpdateNote={handleUpdateNote}
            onPlayRecitation={handlePlayRecitation}
            onOpenWordGloss={(gloss) => setActiveGloss(gloss)}
            onOpenFolioExporter={(sher) => setActiveFolioSher(sher)}
            onGoToReader={() => setCurrentTab('reader')}
          />
        )}
      </main>

      {/* Floating Bottom Audio Dock Player */}
      <AudioDockPlayer
        activeSher={activeSher}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNextSher={handleNextSher}
        onPrevSher={handlePrevSher}
        onClose={handleCloseAudio}
      />

      {/* Lexicon / Farhang Modal */}
      <LexiconModal
        gloss={activeGloss}
        onClose={() => setActiveGloss(null)}
      />

      {/* Prosodic Meter / Ilm-e-Arooz Modal */}
      <AroozGuideModal
        isOpen={isAroozOpen}
        onClose={() => setIsAroozOpen(false)}
      />

      {/* Illuminated Folio Exporter Modal */}
      <FolioExporterModal
        sher={activeFolioSher}
        onClose={() => setActiveFolioSher(null)}
      />

      {/* Archival Footer */}
      <footer className="mt-auto border-t border-[#E2D9C8] dark:border-[#233152] bg-[#F4EFE6]/90 dark:bg-[#111A30]/90 text-xs font-sans text-[#76777E] dark:text-[#A4823E] py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <p className="font-nastaliq text-lg text-[#131E3A] dark:text-[#FCF9F2]">
              گنجینۂ ادب · وقفِ علم و تحقیق
            </p>
            <p className="text-[11px] font-sans">
              Archival Treasury of Urdu Literature · Dedicated to Classical Research & Preservation
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <button
              onClick={() => setIsAroozOpen(true)}
              className="hover:text-[#131E3A] dark:hover:text-[#FCF9F2] underline cursor-pointer"
            >
              اصولِ عروض
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('baitbazi')}
              className="hover:text-[#131E3A] dark:hover:text-[#FCF9F2] underline cursor-pointer"
            >
              بیت بازی
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('poets')}
              className="hover:text-[#131E3A] dark:hover:text-[#FCF9F2] underline cursor-pointer"
            >
              شعراء
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
