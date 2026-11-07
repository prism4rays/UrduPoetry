import React, { useState, useEffect } from 'react';
import { Sher } from '../types';
import { recitationEngine } from '../utils/audioEngine';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  X, 
  Music2, 
  RotateCcw
} from 'lucide-react';

interface AudioDockPlayerProps {
  activeSher: Sher | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextSher?: () => void;
  onPrevSher?: () => void;
  onClose: () => void;
}

export const AudioDockPlayer: React.FC<AudioDockPlayerProps> = ({
  activeSher,
  isPlaying,
  onTogglePlay,
  onNextSher,
  onPrevSher,
  onClose,
}) => {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(0.9);
  const [ambientDrone, setAmbientDrone] = useState<boolean>(true);

  useEffect(() => {
    if (activeSher && isPlaying) {
      recitationEngine.reciteCouplet(
        activeSher.misra1,
        activeSher.misra2,
        speed,
        (p) => setProgress(p),
        () => {
          if (onNextSher) {
            onNextSher();
          }
        }
      );
    } else if (!isPlaying) {
      recitationEngine.pause();
    }
  }, [activeSher, isPlaying, speed]);

  const handleToggleDrone = () => {
    if (ambientDrone) {
      recitationEngine.stopAmbientDrone();
      setAmbientDrone(false);
    } else {
      recitationEngine.startAmbientDrone();
      setAmbientDrone(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    setProgress(newProgress);
  };

  if (!activeSher) return null;

  return (
    <aside
      aria-label="Recitation audio controls"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#131E3A] text-[#FCF9F2] border-t-[1.5px] border-[#C5A059] shadow-[0_-6px_24px_rgba(11,19,37,0.4)] backdrop-blur-md px-4 py-3 sm:px-8 sm:py-4 transition-all duration-300"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Active Couplet Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="w-10 h-10 rounded-full bg-[#1B4D3E] border border-[#C5A059] flex items-center justify-center shrink-0 text-[#D4AF37]">
            <Music2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="truncate text-right md:text-right flex-1 min-w-0 pr-2">
            <p className="font-nastaliq-tight text-sm sm:text-base text-[#FCF9F2] truncate" dir="rtl">
              {activeSher.misra1}
            </p>
            <p className="font-sans text-xs text-[#C5A059] flex items-center gap-1.5 justify-end">
              <span>{activeSher.poetNameUrdu}</span>
              <span>·</span>
              <span className="text-[#9ED1BD]">{activeSher.behr}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 text-[#A4823E] hover:text-[#FCF9F2] rounded"
            title="بند کریں"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Calligraphic Waveform Scrubber & Controls */}
        <div className="w-full md:max-w-md flex flex-col items-center gap-1.5">
          {/* Main playback buttons */}
          <div className="flex items-center gap-3">
            {onPrevSher && (
              <button
                onClick={onPrevSher}
                className="p-1.5 text-[#C5A059] hover:text-[#FCF9F2] transition-colors rounded cursor-pointer"
                title="پچھلا شعر (Previous couplet)"
              >
                <SkipBack className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#131E3A] hover:bg-[#E9C176] active:scale-95 transition-transform flex items-center justify-center shadow-md cursor-pointer font-bold"
              title={isPlaying ? 'وقفہ (Pause)' : 'تحت اللفظ جاری رکھیں (Play)'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            {onNextSher && (
              <button
                onClick={onNextSher}
                className="p-1.5 text-[#C5A059] hover:text-[#FCF9F2] transition-colors rounded cursor-pointer"
                title="اگلا شعر (Next couplet)"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Calligraphic Ink Stroke Waveform Scrubber */}
          <div
            onClick={handleSeek}
            className="relative w-full h-8 flex items-center cursor-pointer group px-2 select-none"
            title="قرأت کا مقام تبدیل کریں"
          >
            {/* Background calligraphic stroke track */}
            <div className="relative w-full h-[3px] bg-[#2E384D] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1B4D3E] via-[#C5A059] to-[#D4AF37] transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* Simulated ink brush wave peaks */}
            <div className="absolute inset-x-2 inset-y-1 flex items-center justify-between pointer-events-none opacity-40">
              {[12, 18, 8, 22, 14, 28, 10, 24, 16, 20, 8, 26, 12, 18, 9, 22].map((h, i) => (
                <div
                  key={i}
                  className={`w-[2px] rounded-full bg-[#C5A059] transition-all ${
                    isPlaying ? 'animate-ink-pulse' : ''
                  }`}
                  style={{
                    height: `${isPlaying ? Math.max(6, (h * (0.6 + Math.sin(i + progress * 8) * 0.4))) : h * 0.6}px`,
                    animationDelay: `${i * 75}ms`,
                  }}
                />
              ))}
            </div>

            {/* Ornamental Teardrop Gold Playhead */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-5 pointer-events-none transition-all duration-100"
              style={{ left: `${Math.max(2, Math.min(98, progress * 100))}%` }}
            >
              <svg viewBox="0 0 16 20" fill="none" className="w-full h-full drop-shadow">
                {/* Teardrop calligraphic ink nib */}
                <path
                  d="M8 0C8 0 16 9 16 13C16 16.866 12.4183 20 8 20C3.58172 20 0 16.866 0 13C0 9 8 0 8 0Z"
                  fill="#D4AF37"
                />
                <circle cx="8" cy="13" r="2.5" fill="#131E3A" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side controls: Ambient Tanpura Drone & Speed & Close */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Tanpura drone toggle */}
          <button
            onClick={handleToggleDrone}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors ${
              ambientDrone
                ? 'border-[#C5A059] text-[#D4AF37] bg-[#C5A059]/10'
                : 'border-[#2E384D] text-[#76777E]'
            }`}
            title={ambientDrone ? 'تانپورہ / ریاض دھیما کریں' : 'تانپورہ کا راگ آن کریں'}
          >
            {ambientDrone ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="font-sans">تانپورہ ساز</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-[#0B1325] px-2 py-0.5 rounded border border-[#2E384D] text-xs font-sans">
            <span className="text-[#A4823E] mr-1">رفتار:</span>
            {[0.8, 0.9, 1.0].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded ${
                  speed === s ? 'bg-[#C5A059] text-[#131E3A] font-bold' : 'text-[#FCF9F2] hover:text-[#D4AF37]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Close Dock */}
          <button
            onClick={onClose}
            className="p-1.5 text-[#A4823E] hover:text-[#FCF9F2] transition-colors rounded cursor-pointer"
            title="کھلاڑی بند کریں"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
