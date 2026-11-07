import React from 'react';
import { X, BookOpen, Compass, Award } from 'lucide-react';

interface AroozGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AroozGuideModal: React.FC<AroozGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="arooz-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl bg-[#FCF9F2] dark:bg-[#111A30] border border-[#C5A059] rounded-[6px] shadow-2xl p-6 sm:p-8 text-right overflow-y-auto max-h-[90vh]">
        <div className="absolute inset-1 border border-[#C5A059]/25 pointer-events-none rounded-[4px]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-[#76777E] dark:text-[#C6C6CE] hover:text-[#131E3A] dark:hover:text-white rounded-[4px] cursor-pointer"
          title="بند کریں"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-end gap-2 text-xs font-sans text-[#1B4D3E] dark:text-[#9ED1BD] mb-2">
          <span>شعبۂ تحقیق و تنقید</span>
          <Compass className="w-4 h-4 text-[#C5A059]" />
        </div>

        <h3 id="arooz-title" className="font-nastaliq text-2xl sm:text-3xl text-[#131E3A] dark:text-[#FCF9F2] pb-2 border-b border-[#E2D9C8] dark:border-[#233152]">
          رہنمائے علمِ عروض و اوزانِ شاعری (Prosodic Meter Guide)
        </h3>

        <div className="mt-4 space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-[#45464D] dark:text-[#C6C6CE]">
          <p>
            علمِ عروض وہ بنیادی پیمانہ ہے جس کے ذریعے شاعری کے موزوں یا ناموزوں ہونے کا پتہ لگایا جاتا ہے۔ اردو شاعری میں اوزان کا سرچشمہ عربی اور فارسی عروض ہے، جسے حضرت خلیل بن احمد بصری نے مرتب کیا تھا۔
          </p>

          <div className="p-3.5 bg-[#F4EFE6] dark:bg-[#0B1325] border border-[#E2D9C8] dark:border-[#233152] rounded-[4px]">
            <h4 className="font-semibold text-[#131E3A] dark:text-[#FCF9F2] mb-1 flex items-center justify-end gap-1.5">
              <span>بنیادی ارکان (Metrical Feet / Afa'eel):</span>
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mt-2 font-nastaliq-tight text-sm">
              <div className="p-2 bg-[#FCF9F2] dark:bg-[#14203B] rounded border border-[#E2D9C8]/70">فاعِلاتُن (2212)</div>
              <div className="p-2 bg-[#FCF9F2] dark:bg-[#14203B] rounded border border-[#E2D9C8]/70">مَفاعِیلُن (2221)</div>
              <div className="p-2 bg-[#FCF9F2] dark:bg-[#14203B] rounded border border-[#E2D9C8]/70">مُستَفْعِلُن (2212)</div>
              <div className="p-2 bg-[#FCF9F2] dark:bg-[#14203B] rounded border border-[#E2D9C8]/70">فَعُولُن (221)</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#131E3A] dark:text-[#FCF9F2] border-b border-[#E2D9C8] pb-1">
              اہم اصطلاحات:
            </h4>
            <ul className="space-y-2 list-none pr-0">
              <li className="flex items-start justify-end gap-2">
                <div>
                  <strong className="text-[#131E3A] dark:text-[#FCF9F2]">بحر (Bahr):</strong> وہ مقررہ آہنگ یا وزن جس پر پوری غزل یا نظم کی تان بندھی ہوتی ہے۔
                </div>
                <span className="text-[#C5A059] mt-0.5">•</span>
              </li>
              <li className="flex items-start justify-end gap-2">
                <div>
                  <strong className="text-[#131E3A] dark:text-[#FCF9F2]">تقطیع (Taqtee):</strong> کسی شعر کے الفاظ کے ہجے توڑ کر بحر کے ارکان کے ساتھ ملانا۔
                </div>
                <span className="text-[#C5A059] mt-0.5">•</span>
              </li>
              <li className="flex items-start justify-end gap-2">
                <div>
                  <strong className="text-[#131E3A] dark:text-[#FCF9F2]">ردیف (Radeef):</strong> وہ لفظ یا الفاظ جو شعر کے دونوں مصرعوں کے آخر میں بلا تغیر دہرائے جائیں۔
                </div>
                <span className="text-[#C5A059] mt-0.5">•</span>
              </li>
              <li className="flex items-start justify-end gap-2">
                <div>
                  <strong className="text-[#131E3A] dark:text-[#FCF9F2]">قافیہ (Qafia):</strong> ردیف سے پہلے آنے والے ہم وزن اور ہم آواز الفاظ (جیسے ہوا، دوا، وفا)۔
                </div>
                <span className="text-[#C5A059] mt-0.5">•</span>
              </li>
            </ul>
          </div>

          <div className="p-3 bg-[#BAEED9]/30 border border-[#1B4D3E]/30 rounded text-xs text-[#1B4D3E] dark:text-[#9ED1BD] flex items-center justify-end gap-2">
            <span>تمام غزلیں گنجینۂ ادب میں تصدیق شدہ بحور و زحافات کے ساتھ درج ہیں۔</span>
            <Award className="w-4 h-4 text-[#1B4D3E]" />
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-[#E2D9C8] dark:border-[#233152]">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-[#FCF9F2] bg-[#131E3A] hover:bg-[#1B4D3E] rounded-[4px] border border-[#C5A059] transition-colors cursor-pointer font-sans"
          >
            فہم مکمل ہوا (Close Guide)
          </button>
        </div>
      </div>
    </div>
  );
};
