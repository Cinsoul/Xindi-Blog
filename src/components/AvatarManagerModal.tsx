import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Image as ImageIcon,
  Scissors,
  Wand2,
  Smile,
  Layers,
} from 'lucide-react';

interface AvatarManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAvatarsUpdated?: () => void;
}

export interface ExtractedAvatar {
  id: string;
  name: string;
  location: string;
  dataUrl: string | null;
  storageKey: string;
}

export const AvatarManagerModal: React.FC<AvatarManagerModalProps> = ({
  isOpen,
  onClose,
  onAvatarsUpdated,
}) => {
  const [avatars, setAvatars] = useState<Record<string, string | null>>({});
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sprites' | 'upload' | 'prompts'>('sprites');

  // Load all stored avatars on open
  const loadAvatars = () => {
    const keys = [
      'custom_hero_avatar',
      'custom_about_avatar',
      'custom_footer_avatar',
      'custom_coffee_avatar',
      'custom_photo_avatar',
      'custom_cat_avatar',
      'custom_laptop_avatar',
      'custom_standing_avatar',
      'custom_smile_avatar',
      'custom_laugh_avatar',
    ];
    const loaded: Record<string, string | null> = {};
    for (const key of keys) {
      loaded[key] = localStorage.getItem(key);
    }
    setAvatars(loaded);
  };

  useEffect(() => {
    if (isOpen) {
      loadAvatars();
      setStatusMessage(null);
    }
  }, [isOpen]);

  // Handle Sprite Sheet / Mockup Upload
  const handleSmartUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage('正在解析图像与智能裁切...');

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const W = img.naturalWidth;
        const H = img.naturalHeight;
        const ratio = W / H;

        // Crop helper function
        const crop = (sx: number, sy: number, sw: number, sh: number): string => {
          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(sw);
          canvas.height = Math.floor(sh);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
          }
          return canvas.toDataURL('image/png');
        };

        // Determine if it's the Sprite Sheet (square-ish ~0.9 - 1.2) or full tall mockup (< 0.8)
        if (ratio > 0.7) {
          // SPRITE SHEET CUTTING (Left: Full body; Right: 3x3 Grid of 9 poses)
          // 1. Standing character (left)
          const standingCrop = crop(0, 0, W * 0.33, H * 0.99);

          // Row 1 (y: 8% to 35%)
          const smileCrop = crop(W * 0.33, H * 0.08, W * 0.22, H * 0.28);
          const winkCrop = crop(W * 0.54, H * 0.08, W * 0.23, H * 0.28);
          const heroThinkingCrop = crop(W * 0.77, H * 0.08, W * 0.23, H * 0.28);

          // Row 2 (y: 36% to 64%)
          const laughCrop = crop(W * 0.33, H * 0.36, W * 0.22, H * 0.28);
          const laptopCrop = crop(W * 0.54, H * 0.39, W * 0.23, H * 0.25);
          const coffeeCrop = crop(W * 0.77, H * 0.36, W * 0.23, H * 0.28);

          // Row 3 (y: 65% to 94%)
          const headphoneCrop = crop(W * 0.33, H * 0.65, W * 0.22, H * 0.29);
          const photoCrop = crop(W * 0.54, H * 0.65, W * 0.23, H * 0.29);
          const catCrop = crop(W * 0.77, H * 0.65, W * 0.23, H * 0.29);

          // Store all to localStorage
          localStorage.setItem('custom_hero_avatar', heroThinkingCrop);
          localStorage.setItem('custom_about_avatar', winkCrop);
          localStorage.setItem('custom_footer_avatar', headphoneCrop);
          localStorage.setItem('custom_coffee_avatar', coffeeCrop);
          localStorage.setItem('custom_photo_avatar', photoCrop);
          localStorage.setItem('custom_cat_avatar', catCrop);
          localStorage.setItem('custom_laptop_avatar', laptopCrop);
          localStorage.setItem('custom_standing_avatar', standingCrop);
          localStorage.setItem('custom_smile_avatar', smileCrop);
          localStorage.setItem('custom_laugh_avatar', laughCrop);

          setStatusMessage('🎉 成功识别 Q版角色表情包合集！已精准切出 10 套 3D 形象并全站应用！');
        } else {
          // TALL WEBPAGE MOCKUP CUTTING
          const heroCrop = crop(W * 0.44, H * 0.03, W * 0.54, H * 0.285);
          const aboutCrop = crop(W * 0.69, H * 0.38, W * 0.22, H * 0.13);
          const footerCrop = crop(W * 0.50, H * 0.835, W * 0.24, H * 0.155);

          localStorage.setItem('custom_hero_avatar', heroCrop);
          localStorage.setItem('custom_about_avatar', aboutCrop);
          localStorage.setItem('custom_footer_avatar', footerCrop);

          setStatusMessage('🎉 成功从整页设计稿切出 3 个 3D 角色形象并已应用！');
        }

        loadAvatars();
        setIsProcessing(false);
        onAvatarsUpdated?.();
        window.dispatchEvent(new Event('avatar-storage-updated'));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Set a specific pose as the Hero avatar
  const setAsHero = (base64: string, name: string) => {
    localStorage.setItem('custom_hero_avatar', base64);
    loadAvatars();
    setStatusMessage(`已将「${name}」设为主页 Hero 形象！`);
    onAvatarsUpdated?.();
    window.dispatchEvent(new Event('avatar-storage-updated'));
  };

  // Reset all
  const handleResetAll = () => {
    const keys = [
      'custom_hero_avatar',
      'custom_about_avatar',
      'custom_footer_avatar',
      'custom_coffee_avatar',
      'custom_photo_avatar',
      'custom_cat_avatar',
      'custom_laptop_avatar',
      'custom_standing_avatar',
      'custom_smile_avatar',
      'custom_laugh_avatar',
    ];
    for (const key of keys) {
      localStorage.removeItem(key);
    }
    loadAvatars();
    setStatusMessage('已恢复所有默认形象');
    onAvatarsUpdated?.();
    window.dispatchEvent(new Event('avatar-storage-updated'));
  };

  const copyPromptText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(key);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const spriteCards = [
    {
      id: 'hero',
      key: 'custom_hero_avatar',
      name: '托腮灵感 (💡)',
      target: 'Hero 首页首屏',
      desc: '经典思考造型，契合 Turning Ideas into Impact',
    },
    {
      id: 'about',
      key: 'custom_about_avatar',
      name: '眨眼比耶 (✌️)',
      target: 'About Me 卡片',
      desc: '元气自信，契合科技人文引言',
    },
    {
      id: 'footer',
      key: 'custom_footer_avatar',
      name: '沉浸音乐 (🎧)',
      target: 'Contact 联络区',
      desc: '专注心流，契合 Better Ideas Together',
    },
    {
      id: 'coffee',
      key: 'custom_coffee_avatar',
      name: '喝冰咖啡 (☕)',
      target: 'Beyond Work: Good Coffee',
      desc: '手拿吸管冰咖啡，Fuel for ideas',
    },
    {
      id: 'photo',
      key: 'custom_photo_avatar',
      name: '手持单反 (📷)',
      target: 'Beyond Work: Photography',
      desc: '单反相机拍照，Capture moments',
    },
    {
      id: 'cat',
      key: 'custom_cat_avatar',
      name: '抱布偶猫 (🐱)',
      target: 'Beyond Work: Cats (Taco)',
      desc: '怀抱猫咪加爱心，Taco 🐾',
    },
    {
      id: 'laptop',
      key: 'custom_laptop_avatar',
      name: '电脑敲代码 (💻)',
      target: '可切换至 Hero / 开发者',
      desc: '在苹果笔记本后探出双眼专注工作',
    },
    {
      id: 'standing',
      key: 'custom_standing_avatar',
      name: '全身立绘 (🚶)',
      target: '个人品牌全身',
      desc: '牛仔外套 + Supreme 白 Tee + 工装裤',
    },
    {
      id: 'laugh',
      key: 'custom_laugh_avatar',
      name: '开怀大笑 (😄)',
      target: '备选表情',
      desc: '闭眼阳光大笑，极具感染力',
    },
    {
      id: 'smile',
      key: 'custom_smile_avatar',
      name: '自信微笑 (😊)',
      target: '备选正装/头像',
      desc: '温和端正的青年创始人肖像',
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-black/[0.08] z-10 my-6 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06] mb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0B0F17] text-white flex items-center justify-center shadow-sm">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B0F17] flex items-center gap-2">
                  <span>3D Q版形象管理系统</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold border border-blue-200/60">
                    支持9格表情包一键切分
                  </span>
                </h3>
                <p className="text-xs text-[#6B7280]">
                  一键导入您的 Q版 3D 形象合集图，全站各模块自动精准裁切应用
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#6B7280] hover:text-[#0B0F17] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* ONE-CLICK IMPORT HERO BOX (PRIMARY ACTION) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EFF6FF] via-[#F5F8FF] to-[#F8F9FE] border border-[#2F6BFF]/25 relative overflow-hidden mb-4 shrink-0 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#2F6BFF] text-white flex items-center justify-center shrink-0 shadow-md mt-0.5 sm:mt-0">
                  <Scissors size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B0F17] flex items-center gap-2">
                    <span>⚡ 一键上传 Q版形象图（自动精准切出全部 10 套动作）</span>
                  </h4>
                  <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                    将您刚刚发的那张 <strong>Q版形象合集（全身立绘 + 9个表情）</strong> 或 <strong>网页完整截图</strong> 丢进来，本地 Canvas 引擎会瞬间精准切出对应角色并分配到 Hero、About、Beyond Work (咖啡/猫咪/摄影) 与 Footer！
                  </p>
                </div>
              </div>

              <label className="shrink-0 px-4 py-2.5 rounded-xl bg-[#2F6BFF] hover:bg-[#2557D6] text-white text-xs font-semibold cursor-pointer shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                <Wand2 size={15} />
                <span>{isProcessing ? '正在处理裁切...' : '立即选择图片切分'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSmartUpload}
                  disabled={isProcessing}
                />
              </label>
            </div>

            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs text-blue-900 bg-blue-100/70 border border-blue-200 rounded-lg p-2.5 flex items-center gap-2"
              >
                <Check size={14} className="text-blue-600 shrink-0" />
                <span className="font-medium">{statusMessage}</span>
              </motion.div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mb-3 shrink-0 border-b border-black/[0.05] pb-2">
            <button
              onClick={() => setActiveTab('sprites')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'sprites'
                  ? 'bg-[#0B0F17] text-white'
                  : 'text-[#6B7280] hover:text-[#0B0F17] hover:bg-black/5'
              }`}
            >
              <Layers size={13} />
              <span>各区域形象预览与分配 ({Object.values(avatars).filter(Boolean).length}/10 已加载)</span>
            </button>

            <button
              onClick={() => setActiveTab('prompts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'prompts'
                  ? 'bg-[#0B0F17] text-white'
                  : 'text-[#6B7280] hover:text-[#0B0F17] hover:bg-black/5'
              }`}
            >
              <Sparkles size={13} />
              <span>AI 生成提示词</span>
            </button>
          </div>

          {/* Scrollable Gallery Content */}
          <div className="flex-1 overflow-y-auto pr-1">
            {activeTab === 'sprites' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {spriteCards.map((card) => {
                  const currentImg = avatars[card.key];
                  const isCurrentHero = currentImg && avatars['custom_hero_avatar'] === currentImg;

                  return (
                    <div
                      key={card.id}
                      className="p-2.5 rounded-2xl bg-[#F8F9FA] border border-black/[0.06] flex flex-col items-center text-center relative group hover:border-[#2F6BFF]/40 transition-colors"
                    >
                      {/* Image Preview Box */}
                      <div className="w-full aspect-square rounded-xl bg-white border border-black/[0.08] overflow-hidden flex items-center justify-center relative mb-2 shadow-inner">
                        {currentImg ? (
                          <img
                            src={currentImg}
                            alt={card.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-[#9CA3AF] p-2">
                            <ImageIcon size={20} className="opacity-40 mb-1" />
                            <span className="text-[10px]">待切分导入</span>
                          </div>
                        )}

                        {/* Hover Overlay Button to Set as Hero */}
                        {currentImg && card.id !== 'hero' && (
                          <button
                            onClick={() => setAsHero(currentImg, card.name)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 cursor-pointer p-1"
                          >
                            <Smile size={16} />
                            <span>设为主页Hero</span>
                          </button>
                        )}
                      </div>

                      {/* Name & Target Badge */}
                      <div className="text-xs font-bold text-[#0B0F17] leading-tight mb-0.5 truncate max-w-full">
                        {card.name}
                      </div>
                      <div className="text-[10px] font-semibold text-[#2F6BFF] bg-[#2F6BFF]/10 px-2 py-0.5 rounded-full mb-1 truncate max-w-full">
                        {card.target}
                      </div>
                      <p className="text-[9.5px] text-[#6B7280] line-clamp-2 leading-tight">
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'prompts' && (
              <div className="space-y-3.5 py-1">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/70 text-xs text-blue-900 leading-relaxed">
                  💡 以下提示词可在 Midjourney v6、Flux.1 或 Stable Diffusion 中生成与原图完全一致的高精 3D 角色。
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-black/[0.06] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E293B]">
                      3D Q版角色多表情动作合集（Sprite Sheet Prompt）
                    </span>
                    <button
                      onClick={() =>
                        copyPromptText(
                          'spritesheet',
                          'Character design sticker sheet of a cute stylish young Asian male tech founder, 3D Pixar Disney animated style, multiple emotions and poses: 1 full body standing in denim blue overshirt, Supreme red box logo white t-shirt, khaki cargo pants, white sneakers, backpack; and 9 expressions: winking with peace sign, resting chin on hand thinking with lightbulb, sipping iced coffee through straw, coding behind apple macbook, wearing over-ear headphones listening to music with notes, holding camera, hugging cute cat, cheerful laughing, and smiling. Clean white background, 8k resolution, octane render, vivid detail, character turnaround sheet --ar 1:1 --v 6.0'
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-black/[0.08] text-[11px] font-medium text-[#0B0F17] hover:bg-[#F3F4F6] transition-colors"
                    >
                      {copiedPrompt === 'spritesheet' ? (
                        <>
                          <Check size={12} className="text-green-600" />
                          <span className="text-green-600 font-semibold">已复制</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>复制合集 Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#4B5563] font-mono leading-relaxed bg-white p-3 rounded-lg border border-black/[0.03] select-all">
                    Character design sticker sheet of a cute stylish young Asian male tech founder, 3D Pixar Disney animated style, multiple emotions and poses: 1 full body standing in denim blue overshirt, Supreme red box logo white t-shirt, khaki cargo pants, white sneakers, backpack; and 9 expressions: winking with peace sign, resting chin on hand thinking with lightbulb, sipping iced coffee through straw, coding behind apple macbook, wearing over-ear headphones listening to music with notes, holding camera, hugging cute cat, cheerful laughing, and smiling. Clean white background, 8k resolution, octane render, vivid detail, character turnaround sheet --ar 1:1 --v 6.0
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-3.5 mt-3 border-t border-black/[0.06] flex items-center justify-between shrink-0">
            <button
              onClick={handleResetAll}
              className="text-xs text-[#6B7280] hover:text-[#DC2626] transition-colors font-medium flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>清除/重置形象</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#0B0F17] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              保存并完成
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
