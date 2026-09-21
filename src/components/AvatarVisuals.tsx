import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Hook to subscribe to user uploaded or custom 3D character images
export const useAvatarImage = (key: string) => {
  const [imgUrl, setImgUrl] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`custom_${key}_avatar`);
    }
    return null;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const stored = localStorage.getItem(`custom_${key}_avatar`);
      setImgUrl(stored || null);
    };

    window.addEventListener('avatar-storage-updated', handleUpdate);
    return () => window.removeEventListener('avatar-storage-updated', handleUpdate);
  }, [key]);

  return imgUrl;
};

// ==========================================
// 1. HERO 3D CHARACTER & DESK WORKSPACE SCENE
// ==========================================
export const HeroAvatarScene: React.FC = () => {
  const customImg = useAvatarImage('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt & Specular Sheen States
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Inspiration Click Easter Egg States
  const [currentIdea, setCurrentIdea] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; char: string; scale: number }>>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalized from center [-1, 1]
    const normX = ((clientX / rect.width) - 0.5) * 2;
    const normY = ((clientY / rect.height) - 0.5) * 2;

    // Smooth subtle 3D tilt (max 7 deg)
    setTilt({
      rotateX: -normY * 6,
      rotateY: normX * 7.5,
    });

    // Light reflection specular glare position (0 to 100%)
    setGlare({
      x: (clientX / rect.width) * 100,
      y: (clientY / rect.height) * 100,
      opacity: 0.5,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  // Click Easter Egg: Spring bounce + inspiration pop-up
  const triggerInspiration = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 450);

    const ideas = [
      { icon: '💡', text: 'Turning ideas into real impact' },
      { icon: '✨', text: 'Clean craft & thoughtful design' },
      { icon: '🚀', text: 'Building products that matter' },
      { icon: '☕', text: 'Deep flow state: 100% focused' },
      { icon: '🧠', text: 'Bridging AI with real-world problems' },
      { icon: '⚡', text: 'Stay curious, keep shipping' },
    ];
    const picked = ideas[Math.floor(Math.random() * ideas.length)];
    setCurrentIdea(`${picked.icon} ${picked.text}`);

    // Create 5 floating micro sparkles
    const chars = ['✨', '✦', '💡', '★', '💫'];
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 140,
      y: -25 - Math.random() * 55,
      char: chars[i % chars.length],
      scale: 0.8 + Math.random() * 0.5,
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setCurrentIdea(null);
      setSparkles([]);
    }, 2500);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={triggerInspiration}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[560px] mx-auto select-none flex flex-col items-center justify-end group cursor-pointer"
    >
      {/* 1. Ambient Backlight Glow & Tech Aura (Z-Behind) */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none overflow-visible">
        {/* Soft Multi-stop Radial Aura */}
        <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-tr from-sky-400/20 via-indigo-500/15 to-amber-300/15 blur-3xl opacity-60 dark:opacity-40 transition-opacity duration-700 group-hover:opacity-90" />
        
        {/* Futuristic Concentric Pulse Wave on Hover */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: [0.8, 1.28], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full border border-sky-400/30 dark:border-sky-300/25 pointer-events-none"
          />
        )}
      </div>

      {/* 2. Main 3D Stage with Preserved Depth */}
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isClicked ? 0.96 : isHovered ? 1.015 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 180,
          mass: 0.6,
        }}
        className="w-full relative flex flex-col items-center justify-end"
      >
        {/* 3. Ambient Micro-Gravity Floating & Breathing Cycle */}
        <motion.div
          animate={{
            y: [-3.5, 3.5, -3.5],
            rotateZ: [-0.25, 0.25, -0.25],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full relative flex items-end justify-center"
        >
          {/* Hand-drawn annotation above laptop: Good Ideas Better People :) (Floating at translateZ: 42px) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              transform: 'translateZ(42px)',
              transformStyle: 'preserve-3d',
            }}
            className="absolute top-2 sm:top-6 right-2 sm:right-6 z-20 pointer-events-none flex flex-col items-end drop-shadow-sm"
          >
            <div className="flex items-center gap-3">
              {/* Handwritten curved arrow pointing up-right */}
              <svg
                width="56"
                height="44"
                viewBox="0 0 70 55"
                fill="none"
                stroke="currentColor"
                className="text-[#1E293B] -rotate-6 translate-y-2"
              >
                <path
                  d="M 10 46 C 24 38, 42 28, 56 12"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M 42 13 L 56 12 L 53 26"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Handwritten text lines matching screenshot */}
              <div className="text-left font-handwriting leading-[1.05] text-[#1E293B] tracking-tight">
                <div className="text-2xl sm:text-[28px] pl-0">Good</div>
                <div className="text-2xl sm:text-[28px] pl-3 font-semibold">Ideas</div>
                <div className="text-2xl sm:text-[28px] pl-6 font-semibold">Better</div>
                <div className="text-2xl sm:text-[28px] pl-8">People</div>
                <div className="text-xl sm:text-2xl pl-12 font-bold text-[#1E293B]">:)</div>
              </div>
            </div>
          </motion.div>

          {/* 4. Click Inspiration Pop-Up Bubble & Floating Sparkles (Floating at translateZ: 64px) */}
          <AnimatePresence>
            {currentIdea && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.85, y: -35 }}
                transition={{ type: 'spring', damping: 16, stiffness: 260 }}
                style={{
                  transform: 'translateZ(64px)',
                }}
                className="absolute top-10 sm:top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              >
                <div className="px-4 py-2 rounded-full bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md shadow-xl border border-sky-400/30 text-xs sm:text-sm font-medium text-[#0B0F17] dark:text-white flex items-center gap-2 whitespace-nowrap shadow-sky-500/10">
                  <span>{currentIdea}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Sparkle Micro-Particles */}
          <AnimatePresence>
            {sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                initial={{ opacity: 1, scale: 0.3, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 0.8, 0],
                  scale: [0.3, sp.scale, 0.2],
                  x: sp.x,
                  y: sp.y,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                style={{ transform: 'translateZ(58px)' }}
                className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none text-base sm:text-lg z-30 select-none"
              >
                {sp.char}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 5. 3D Character Content (Custom Image or SVG Scene) (translateZ: 16px) */}
          <div
            style={{
              transform: 'translateZ(16px)',
              transformStyle: 'preserve-3d',
            }}
            className="w-full relative flex items-end justify-center"
          >
            {customImg ? (
              <div className="w-full relative flex items-end justify-center pt-8">
                <img
                  src={customImg}
                  alt="Hero 3D Character Desk Scene"
                  className="w-full h-auto max-h-[520px] object-contain rounded-3xl drop-shadow-2xl select-none"
                />
              </div>
            ) : (
              /* Main 3D Scene SVG */
              <svg
                viewBox="0 0 540 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto max-h-[520px] drop-shadow-xl overflow-visible"
              >
              <defs>
                {/* Skin Shading Gradients */}
                <radialGradient id="heroFaceGlow" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFF3EC" />
                  <stop offset="45%" stopColor="#FDE1D3" />
                  <stop offset="85%" stopColor="#F5C7B2" />
                  <stop offset="100%" stopColor="#E9B29B" />
                </radialGradient>

                <linearGradient id="heroJawShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F7C4AF" />
                  <stop offset="100%" stopColor="#D99E86" />
                </linearGradient>

            {/* Hair Gradients */}
            <linearGradient id="heroHairDark" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#2E241E" />
              <stop offset="40%" stopColor="#1B1512" />
              <stop offset="100%" stopColor="#0B0907" />
            </linearGradient>

            <linearGradient id="heroHairHighlight" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#55443B" />
              <stop offset="100%" stopColor="#2A201A" />
            </linearGradient>

            {/* Navy Overshirt */}
            <linearGradient id="heroNavyShirt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A374A" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>

            {/* Apple Laptop Metallic Body */}
            <linearGradient id="macbookSilver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAEAEA" />
              <stop offset="35%" stopColor="#DFE2E6" />
              <stop offset="70%" stopColor="#C8CCD2" />
              <stop offset="100%" stopColor="#AFB5BE" />
            </linearGradient>

            <linearGradient id="appleLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E8691" />
              <stop offset="100%" stopColor="#565F6B" />
            </linearGradient>

            {/* Wooden Desk Surface */}
            <linearGradient id="woodDeskSurface" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E9D7C3" />
              <stop offset="25%" stopColor="#DFCCA9" />
              <stop offset="75%" stopColor="#D2BB94" />
              <stop offset="100%" stopColor="#BAA278" />
            </linearGradient>

            <linearGradient id="woodDeskEdge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9C835E" />
              <stop offset="100%" stopColor="#7B6546" />
            </linearGradient>

            {/* Book Spines */}
            <linearGradient id="book1Spine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ECEAE4" />
              <stop offset="50%" stopColor="#F9F8F5" />
              <stop offset="100%" stopColor="#D9D5CB" />
            </linearGradient>

            <linearGradient id="book2Spine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E5DFD5" />
              <stop offset="50%" stopColor="#F4EEE4" />
              <stop offset="100%" stopColor="#D0C8BC" />
            </linearGradient>

            <linearGradient id="book3Spine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D8D3CC" />
              <stop offset="50%" stopColor="#EDE8E1" />
              <stop offset="100%" stopColor="#C4BEB5" />
            </linearGradient>

            <linearGradient id="book4Spine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CFC9BE" />
              <stop offset="50%" stopColor="#E2DDD2" />
              <stop offset="100%" stopColor="#B8B1A4" />
            </linearGradient>
          </defs>

          {/* ================= BACKGROUND AMBIENT GLOW ================= */}
          <circle cx="340" cy="180" r="140" fill="#EBF2FE" opacity="0.6" />
          <circle cx="370" cy="150" r="80" fill="#FFFFFF" opacity="0.8" />

          {/* ================= CHARACTER BODY ================= */}
          <g id="character-body">
            {/* Outer Navy Shirt & Shoulders */}
            {/* Left Shoulder */}
            <path
              d="M 230 350 C 240 300, 275 270, 315 258 L 335 340 Z"
              fill="url(#heroNavyShirt)"
            />
            {/* Right Shoulder (leaning towards hand) */}
            <path
              d="M 335 258 C 375 265, 420 288, 435 340 L 330 350 Z"
              fill="url(#heroNavyShirt)"
            />
            <path
              d="M 220 340 C 235 295, 270 260, 320 250 L 350 250 C 400 260, 440 295, 450 340 L 450 430 L 220 430 Z"
              fill="url(#heroNavyShirt)"
            />

            {/* Inner White Tee Collar & Supreme Box Logo */}
            <path
              d="M 305 252 C 320 270, 350 270, 365 252 C 380 275, 345 320, 305 252 Z"
              fill="#FFFFFF"
            />
            <path
              d="M 312 258 C 324 274, 348 274, 358 258 L 360 295 C 345 312, 325 312, 310 295 Z"
              fill="#F8FAFC"
            />

            {/* Red Supreme Box Logo on Collar / Tee */}
            <g transform="translate(322, 272) rotate(2)">
              <rect width="28" height="11" rx="2" fill="#E11D48" />
              <text
                x="14"
                y="8.5"
                fill="#FFFFFF"
                fontSize="6.8"
                fontFamily="sans-serif"
                fontWeight="bold"
                fontStyle="italic"
                textAnchor="middle"
                letterSpacing="-0.2"
              >
                preme
              </text>
            </g>

            {/* Delicate Silver Chain Necklace */}
            <path
              d="M 318 254 C 328 288, 342 288, 352 254"
              stroke="#CBD5E1"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Neck */}
            <path
              d="M 315 220 C 315 250, 355 250, 355 220 Z"
              fill="url(#heroJawShadow)"
            />
            <path
              d="M 318 215 C 318 245, 352 245, 352 215 Z"
              fill="url(#heroFaceGlow)"
            />

            {/* Right Arm & Elbow (Elbow rests on table, hand props chin) */}
            <path
              d="M 380 290 C 400 320, 420 370, 425 430 L 380 430 C 375 385, 365 330, 355 300 Z"
              fill="url(#heroNavyShirt)"
            />
            {/* Forearm angled up to chin */}
            <path
              d="M 380 320 L 415 240 C 418 230, 410 220, 400 220 L 375 240 Z"
              fill="url(#heroFaceGlow)"
              opacity="0.9"
            />
            <path
              d="M 408 215 C 415 210, 425 218, 420 230 C 416 240, 400 265, 395 275 L 380 270 C 385 255, 400 225, 408 215 Z"
              fill="url(#heroFaceGlow)"
            />

            {/* Hand fingers gently supporting right cheek/chin */}
            <g id="hand-under-chin">
              {/* Fingers curved under jaw */}
              <path
                d="M 390 205 C 402 198, 412 208, 405 218 C 398 226, 388 228, 380 220 Z"
                fill="url(#heroFaceGlow)"
              />
              <path
                d="M 394 195 C 404 190, 412 198, 406 206 C 400 214, 390 216, 382 210 Z"
                fill="#FDE1D3"
              />
              <path
                d="M 386 218 C 392 225, 402 225, 400 232 C 395 238, 382 238, 376 226 Z"
                fill="#F5C7B2"
              />
            </g>

            {/* ================= HEAD & FACE ================= */}
            {/* Ears */}
            {/* Left Ear */}
            <path
              d="M 284 165 C 274 168, 274 192, 286 195 Z"
              fill="url(#heroJawShadow)"
            />
            <path
              d="M 285 170 C 278 174, 278 188, 286 190 Z"
              fill="#E9B29B"
            />
            {/* Right Ear */}
            <path
              d="M 384 165 C 394 168, 394 192, 382 195 Z"
              fill="url(#heroJawShadow)"
            />

            {/* Head Silhouette */}
            <path
              d="M 286 170 C 284 125, 310 95, 335 95 C 360 95, 386 125, 384 170 C 384 210, 365 228, 335 228 C 305 228, 286 210, 286 170 Z"
              fill="url(#heroFaceGlow)"
            />

            {/* Rosy Cheek Blush */}
            <ellipse cx="304" cy="184" rx="14" ry="7" fill="#FCA5A5" opacity="0.35" />
            <ellipse cx="366" cy="184" rx="14" ry="7" fill="#FCA5A5" opacity="0.35" />

            {/* Eyebrows */}
            <path
              d="M 296 148 C 305 144, 318 145, 324 149"
              stroke="#2E241E"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M 346 149 C 352 145, 365 144, 374 148"
              stroke="#2E241E"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Big Pixar Style Eyes (Lively & Friendly) */}
            {/* Left Eye */}
            <g id="left-eye">
              <ellipse cx="312" cy="164" rx="11" ry="12" fill="#FFFFFF" />
              {/* Dark Iris */}
              <circle cx="313" cy="163" r="8" fill="#1C140E" />
              <circle cx="313" cy="163" r="6.8" fill="#3D291D" />
              <circle cx="313" cy="163" r="4.5" fill="#110B07" />
              {/* Specular Highlights */}
              <circle cx="311" cy="160" r="2.8" fill="#FFFFFF" />
              <circle cx="315" cy="166" r="1.2" fill="#FFFFFF" opacity="0.8" />
              {/* Eyelid line */}
              <path
                d="M 300 162 C 305 153, 319 153, 324 162"
                stroke="#2B211A"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Right Eye */}
            <g id="right-eye">
              <ellipse cx="358" cy="164" rx="11" ry="12" fill="#FFFFFF" />
              {/* Dark Iris */}
              <circle cx="357" cy="163" r="8" fill="#1C140E" />
              <circle cx="357" cy="163" r="6.8" fill="#3D291D" />
              <circle cx="357" cy="163" r="4.5" fill="#110B07" />
              {/* Specular Highlights */}
              <circle cx="355" cy="160" r="2.8" fill="#FFFFFF" />
              <circle cx="359" cy="166" r="1.2" fill="#FFFFFF" opacity="0.8" />
              {/* Eyelid line */}
              <path
                d="M 346 162 C 351 153, 365 153, 370 162"
                stroke="#2B211A"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Cute Nose */}
            <path
              d="M 333 172 C 334 177, 336 179, 338 178 C 340 177, 340 174, 337 172"
              fill="#D99E86"
            />
            <circle cx="335" cy="177" r="1.5" fill="#C4846B" />

            {/* Warm Friendly Smile */}
            <path
              d="M 324 195 C 332 203, 342 203, 350 196"
              stroke="#994D38"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Smile dimples */}
            <path
              d="M 321 193 C 322 195, 323 197, 324 197"
              stroke="#D99E86"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M 353 194 C 352 196, 351 197, 350 197"
              stroke="#D99E86"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* ================= STYLISH 3D BLACK HAIR ================= */}
            <g id="character-hair">
              {/* Back volume */}
              <path
                d="M 282 170 C 275 140, 282 100, 310 80 C 335 62, 370 70, 388 95 C 400 115, 396 150, 386 172 C 378 150, 372 135, 360 125 C 335 105, 305 125, 282 170 Z"
                fill="url(#heroHairDark)"
              />
              {/* Front Fringe / Bangs (Volumetric Pixar tufts) */}
              <path
                d="M 284 140 C 290 105, 325 80, 355 82 C 380 84, 392 105, 390 135 C 385 120, 372 110, 358 112 C 335 115, 310 128, 298 145 Z"
                fill="url(#heroHairHighlight)"
              />
              <path
                d="M 296 130 C 310 115, 335 110, 350 120 C 338 126, 322 130, 308 142 Z"
                fill="url(#heroHairDark)"
              />
              <path
                d="M 325 90 C 342 85, 368 92, 376 110 C 365 105, 350 106, 338 114 Z"
                fill="#42332B"
              />
              {/* Side Taper */}
              <path
                d="M 284 150 C 282 165, 284 175, 288 180 C 287 170, 288 160, 292 152 Z"
                fill="url(#heroHairDark)"
              />
            </g>
          </g>

          {/* ================= WOODEN DESK ================= */}
          <g id="wooden-desk">
            {/* Desk Top Surface */}
            <polygon
              points="140,430 540,430 540,470 140,470"
              fill="url(#woodDeskSurface)"
            />
            {/* Desk Bevel Edge */}
            <polygon
              points="140,470 540,470 540,486 140,486"
              fill="url(#woodDeskEdge)"
            />
            {/* Desk surface light reflections */}
            <line
              x1="160"
              y1="432"
              x2="520"
              y2="432"
              stroke="#FFF2E2"
              strokeWidth="2"
              opacity="0.8"
            />
          </g>

          {/* ================= 4 HARDCOVER BOOKS STACK ================= */}
          {/* Labeled: AI, Finance, Product, A Better Tomorrow */}
          <g id="book-stack" transform="translate(198, 300)">
            {/* Book 4 (Bottom): "A Better Tomorrow" */}
            <g transform="translate(0, 96)">
              {/* Book shadow */}
              <rect x="0" y="24" width="105" height="4" rx="2" fill="#8B7355" opacity="0.3" />
              {/* Cover/spine */}
              <rect x="0" y="0" width="104" height="24" rx="3" fill="url(#book4Spine)" stroke="#AFA799" strokeWidth="1" />
              <line x1="12" y1="0" x2="12" y2="24" stroke="#A69E90" strokeWidth="1" />
              <text
                x="56"
                y="16"
                fill="#2B2723"
                fontSize="8.5"
                fontFamily="sans-serif"
                fontWeight="600"
                textAnchor="middle"
                letterSpacing="0.2"
              >
                A Better Tomorrow
              </text>
            </g>

            {/* Book 3: "Product" */}
            <g transform="translate(4, 68)">
              <rect x="0" y="0" width="98" height="26" rx="3" fill="url(#book3Spine)" stroke="#BCB5AA" strokeWidth="1" />
              <line x1="12" y1="0" x2="12" y2="26" stroke="#B0A89C" strokeWidth="1" />
              <text
                x="54"
                y="17"
                fill="#221E1A"
                fontSize="10"
                fontFamily="sans-serif"
                fontWeight="700"
                textAnchor="middle"
                letterSpacing="0.4"
              >
                Product
              </text>
            </g>

            {/* Book 2: "Finance" */}
            <g transform="translate(2, 38)">
              <rect x="0" y="0" width="100" height="28" rx="3" fill="url(#book2Spine)" stroke="#CBC4B7" strokeWidth="1" />
              <line x1="12" y1="0" x2="12" y2="28" stroke="#BFB7A8" strokeWidth="1" />
              <text
                x="54"
                y="18.5"
                fill="#1C1814"
                fontSize="11"
                fontFamily="sans-serif"
                fontWeight="700"
                textAnchor="middle"
                letterSpacing="0.4"
              >
                Finance
              </text>
            </g>

            {/* Book 1 (Top): "AI" */}
            <g transform="translate(10, 10)">
              <rect x="0" y="0" width="88" height="26" rx="3" fill="url(#book1Spine)" stroke="#D8D3C7" strokeWidth="1" />
              <line x1="12" y1="0" x2="12" y2="26" stroke="#CCC6B8" strokeWidth="1" />
              <text
                x="48"
                y="17.5"
                fill="#161310"
                fontSize="12.5"
                fontFamily="sans-serif"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="0.6"
              >
                AI
              </text>
            </g>
          </g>

          {/* ================= SILVER APPLE MACBOOK LAPTOP ================= */}
          <g id="silver-macbook" transform="translate(390, 260)">
            {/* Screen Lid Back angled view */}
            <polygon
              points="10,20 135,28 120,170 0,165"
              fill="url(#macbookSilver)"
              stroke="#9DA3AC"
              strokeWidth="1.2"
            />
            {/* Metallic rim reflection */}
            <line x1="10" y1="20" x2="135" y2="28" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
            <line x1="135" y1="28" x2="120" y2="170" stroke="#CBD0D8" strokeWidth="1.5" />

            {/* Apple Logo in Center of MacBook Lid */}
            <g transform="translate(62, 86) rotate(3) scale(0.9)">
              {/* Apple Body with classic bite */}
              <path
                d="M 12 6 C 14 3, 17 4, 18 6 C 21 4, 24 4, 25 7 C 26 10, 24 14, 22 17 C 20 20, 19 22, 17 22 C 15 22, 14 20, 12 20 C 10 20, 9 22, 7 22 C 5 22, 4 19, 2 17 C -0.5 13, -0.5 8, 2 5 C 4 3, 7 3, 9 5 C 10 6, 11 6, 12 6 Z"
                fill="url(#appleLogoGrad)"
              />
              {/* Apple Leaf */}
              <path
                d="M 14 0 C 16 2, 15 5, 12 6 C 11 4, 12 1, 14 0 Z"
                fill="url(#appleLogoGrad)"
              />
            </g>

            {/* Laptop Base keyboard deck edge */}
            <polygon
              points="-15,165 135,170 145,178 -10,175"
              fill="#C4C8D0"
              stroke="#A8ADB6"
              strokeWidth="1"
            />
            {/* Laptop shadow on wood */}
            <polygon
              points="-18,175 148,178 142,185 -22,182"
              fill="#7A6546"
              opacity="0.35"
            />
          </g>

          {/* Small Espresso Cup next to laptop */}
          <g id="espresso-cup" transform="translate(508, 412)">
            <ellipse cx="12" cy="18" rx="14" ry="4" fill="#6B5336" opacity="0.4" />
            {/* Saucer */}
            <ellipse cx="12" cy="17" rx="12" ry="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
            {/* Cup Body */}
            <path
              d="M 4 8 C 4 15, 7 16, 12 16 C 17 16, 20 15, 20 8 Z"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            {/* Coffee inside */}
            <ellipse cx="12" cy="8" rx="7" ry="2.2" fill="#3E2723" />
            {/* Handle */}
            <path
              d="M 20 9 C 24 9, 24 14, 20 14"
              stroke="#CBD5E1"
              strokeWidth="1.8"
              fill="none"
            />
          </g>
        </svg>
      )}

          {/* Specular Sheen / Glare Layer that glides across the 3D surface */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 360px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.08) 40%, transparent 75%)`,
              mixBlendMode: 'overlay',
              transform: 'translateZ(30px)',
            }}
          />
        </div>

        {/* End of Ambient Floating & Breathing */}
      </motion.div>

      {/* End of Main 3D Stage */}
    </motion.div>
  </div>
);
};


// ==========================================
// 2. ABOUT ME WINKING PEACE-SIGN AVATAR
// ==========================================
export const AboutWinkAvatar: React.FC = () => {
  const customImg = useAvatarImage('about');
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: -(y - 0.5) * 12,
      rotateY: (x - 0.5) * 14,
    });
    setGlare({
      x: x * 100,
      y: y * 100,
      opacity: 0.45,
    });
  };

  const handleClick = () => {
    setIsClicked(true);
    setShowBubble(true);
    setTimeout(() => setIsClicked(false), 400);
    setTimeout(() => setShowBubble(false), 2400);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ rotateX: 0, rotateY: 0 });
        setGlare((p) => ({ ...p, opacity: 0 }));
      }}
      onClick={handleClick}
      style={{ perspective: 800 }}
      className="relative w-36 sm:w-44 lg:w-48 aspect-square select-none shrink-0 cursor-pointer group"
    >
      {/* Soft Ambient Warm Glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-amber-300/20 via-pink-400/15 to-sky-300/15 blur-2xl opacity-60 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Floating thought bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -16 }}
            exit={{ opacity: 0, scale: 0.8, y: -25 }}
            transition={{ type: 'spring', damping: 15, stiffness: 250 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#1E293B]/95 shadow-xl border border-pink-400/30 text-xs font-semibold text-[#0B0F17] dark:text-white flex items-center gap-1.5 shadow-pink-500/10"
          >
            <span>✌️ Keep Creating & Exploring!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isClicked ? 0.94 : isHovered ? 1.04 : 1,
          y: [-2.5, 2.5, -2.5],
        }}
        transition={{
          y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
          scale: { type: 'spring', damping: 20, stiffness: 200 },
          rotateX: { type: 'spring', damping: 22, stiffness: 200 },
          rotateY: { type: 'spring', damping: 22, stiffness: 200 },
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative flex items-center justify-center"
      >
        {customImg ? (
          <img
            src={customImg}
            alt="About Wink Avatar"
            className="w-full h-full object-contain drop-shadow-xl rounded-2xl"
          />
        ) : (
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-lg overflow-visible"
          >
            <defs>
              <radialGradient id="winkFace" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#FFF3EC" />
                <stop offset="60%" stopColor="#FDE1D3" />
                <stop offset="100%" stopColor="#F5C7B2" />
              </radialGradient>
              <linearGradient id="winkHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2E241E" />
                <stop offset="100%" stopColor="#0F0C0A" />
              </linearGradient>
              <linearGradient id="winkNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A374A" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
            </defs>

            {/* Shoulders & White Tee */}
            <path
              d="M 35 180 C 45 145, 80 135, 100 135 C 120 135, 155 145, 165 180 Z"
              fill="url(#winkNavy)"
            />
            <path
              d="M 85 136 C 95 146, 105 146, 115 136 L 112 160 C 104 165, 96 165, 88 160 Z"
              fill="#FFFFFF"
            />

            {/* Neck */}
            <path d="M 90 115 L 90 140 L 110 140 L 110 115 Z" fill="#F5C7B2" />

            {/* Ears */}
            <circle cx="68" cy="100" r="10" fill="#FDE1D3" />
            <circle cx="132" cy="100" r="10" fill="#FDE1D3" />

            {/* Head */}
            <path
              d="M 70 98 C 68 62, 85 45, 100 45 C 115 45, 132 62, 130 98 C 130 125, 115 134, 100 134 C 85 134, 70 125, 70 98 Z"
              fill="url(#winkFace)"
            />

            {/* Cheeks */}
            <ellipse cx="80" cy="108" rx="8" ry="4" fill="#FCA5A5" opacity="0.4" />
            <ellipse cx="120" cy="108" rx="8" ry="4" fill="#FCA5A5" opacity="0.4" />

            {/* Left Eye: WINKING (Playful arc) */}
            <path
              d="M 78 95 C 83 99, 90 99, 94 95"
              stroke="#2B211A"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Wink eyelash accent */}
            <line x1="88" y1="98" x2="88" y2="102" stroke="#2B211A" strokeWidth="2" strokeLinecap="round" />

            {/* Right Eye: OPEN & WIDE */}
            <ellipse cx="114" cy="94" rx="7.5" ry="8" fill="#FFFFFF" />
            <circle cx="114" cy="94" r="5.5" fill="#1C140E" />
            <circle cx="113" cy="92" r="2" fill="#FFFFFF" />
            <path
              d="M 106 91 C 110 86, 118 86, 122 91"
              stroke="#2B211A"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Eyebrows */}
            <path d="M 78 84 C 84 81, 91 82, 94 85" stroke="#2E241E" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 107 83 C 112 80, 120 81, 124 84" stroke="#2E241E" strokeWidth="2.4" strokeLinecap="round" />

            {/* Nose & Big Grin */}
            <circle cx="100" cy="104" r="1.4" fill="#C4846B" />
            <path
              d="M 90 114 C 96 122, 104 122, 110 114"
              stroke="#994D38"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hair */}
            <path
              d="M 66 90 C 62 65, 75 40, 100 38 C 125 40, 138 65, 134 90 C 130 75, 120 56, 100 58 C 80 56, 70 75, 66 90 Z"
              fill="url(#winkHair)"
            />
            <path
              d="M 72 75 C 80 55, 105 48, 120 54 C 112 60, 98 62, 85 75 Z"
              fill="#45342B"
            />

            {/* Right Hand Making PEACE SIGN (V-sign: ✌️) */}
            <g id="peace-sign" transform="translate(136, 102) rotate(-6)">
              {/* Palm */}
              <circle cx="14" cy="24" r="11" fill="url(#winkFace)" />
              {/* Index Finger */}
              <rect x="5" y="0" width="7" height="20" rx="3.5" fill="url(#winkFace)" stroke="#F5C7B2" strokeWidth="0.8" />
              {/* Middle Finger (Spread V) */}
              <g transform="translate(18, 2) rotate(22)">
                <rect x="0" y="0" width="7" height="20" rx="3.5" fill="url(#winkFace)" stroke="#F5C7B2" strokeWidth="0.8" />
              </g>
              {/* Folded Ring & Pinky Fingers */}
              <rect x="10" y="18" width="8" height="9" rx="4" fill="#E9B29B" />
              {/* Thumb crossed over */}
              <rect x="6" y="19" width="10" height="7" rx="3.5" fill="#FDE1D3" />
            </g>
          </svg>
        )}

        {/* Specular Sheen Glare */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 140px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </div>
  );
};


// ==========================================
// 3. FOOTER HEADPHONE FLOW-STATE AVATAR
// ==========================================
export const FooterHeadphoneAvatar: React.FC = () => {
  const customImg = useAvatarImage('footer');
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [notes, setNotes] = useState<Array<{ id: number; x: number; y: number; char: string }>>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: -(y - 0.5) * 11,
      rotateY: (x - 0.5) * 13,
    });
    setGlare({
      x: x * 100,
      y: y * 100,
      opacity: 0.45,
    });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);

    const chars = ['🎵', '🎶', '🎧', '✨', '☕'];
    const newNotes = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 90,
      y: -25 - Math.random() * 45,
      char: chars[i % chars.length],
    }));
    setNotes(newNotes);
    setTimeout(() => setNotes([]), 2200);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ rotateX: 0, rotateY: 0 });
        setGlare((p) => ({ ...p, opacity: 0 }));
      }}
      onClick={handleClick}
      style={{ perspective: 800 }}
      className="relative w-40 sm:w-48 lg:w-56 aspect-square select-none flex items-center justify-center cursor-pointer group"
    >
      {/* Soft Ambient Lo-Fi Aura */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/15 to-violet-500/20 blur-2xl opacity-60 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Floating Notes Easter Egg */}
      <AnimatePresence>
        {notes.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.25, x: n.x, y: n.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none text-base sm:text-lg z-30 select-none"
          >
            {n.char}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isClicked ? 0.94 : isHovered ? 1.04 : 1,
          y: [-3, 3, -3],
          rotateZ: [-1.2, 1.2, -1.2],
        }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          scale: { type: 'spring', damping: 20, stiffness: 200 },
          rotateX: { type: 'spring', damping: 22, stiffness: 200 },
          rotateY: { type: 'spring', damping: 22, stiffness: 200 },
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative flex items-center justify-center"
      >
        {customImg ? (
          <img
            src={customImg}
            alt="Footer Headphone Avatar"
            className="w-full h-full object-contain drop-shadow-xl rounded-2xl"
          />
        ) : (
          <svg
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            <defs>
              <radialGradient id="hpFace" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#FFF3EC" />
                <stop offset="60%" stopColor="#FDE1D3" />
                <stop offset="100%" stopColor="#F5C7B2" />
              </radialGradient>
              <linearGradient id="hpHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2E241E" />
                <stop offset="100%" stopColor="#0F0C0A" />
              </linearGradient>
              <linearGradient id="hpSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="hpCushion" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            {/* Shoulders / Denim Jacket */}
            <path
              d="M 45 195 C 55 160, 90 148, 110 148 C 130 148, 165 160, 175 195 Z"
              fill="#1E293B"
            />
            {/* White Inner Tee */}
            <path
              d="M 94 150 C 102 160, 118 160, 126 150 L 122 174 C 114 180, 106 180, 98 174 Z"
              fill="#FFFFFF"
            />

            {/* Neck */}
            <path d="M 100 128 L 100 152 L 120 152 L 120 128 Z" fill="#F5C7B2" />

            {/* Head Silhouette */}
            <path
              d="M 80 110 C 78 75, 92 56, 110 56 C 128 56, 142 75, 140 110 C 140 136, 126 146, 110 146 C 94 146, 80 136, 80 110 Z"
              fill="url(#hpFace)"
            />

            {/* Cheeks */}
            <ellipse cx="90" cy="118" rx="8" ry="4" fill="#FCA5A5" opacity="0.45" />
            <ellipse cx="130" cy="118" rx="8" ry="4" fill="#FCA5A5" opacity="0.45" />

            {/* Peaceful Closed Eyes (Flow state: ⌒ ⌒) */}
            <path
              d="M 88 106 C 93 100, 101 100, 105 106"
              stroke="#2B211A"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 115 106 C 119 100, 127 100, 132 106"
              stroke="#2B211A"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Eyebrows */}
            <path d="M 87 95 C 93 92, 100 93, 103 96" stroke="#2E241E" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 117 96 C 120 93, 127 92, 133 95" stroke="#2E241E" strokeWidth="2.4" strokeLinecap="round" />

            {/* Nose & Joyful Content Smile */}
            <circle cx="110" cy="115" r="1.5" fill="#C4846B" />
            <path
              d="M 100 124 C 106 132, 114 132, 120 124"
              stroke="#994D38"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hair */}
            <path
              d="M 76 102 C 72 75, 85 50, 110 48 C 135 50, 148 75, 144 102 C 140 85, 130 68, 110 70 C 90 68, 80 85, 76 102 Z"
              fill="url(#hpHair)"
            />

            {/* ================= OVER-EAR HEADPHONES ================= */}
            {/* Headband spanning across top of head */}
            <path
              d="M 68 108 C 65 52, 155 52, 152 108"
              stroke="url(#hpSilver)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 82 72 C 95 62, 125 62, 138 72"
              stroke="url(#hpCushion)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Ear Cushion (Dark & Padded) */}
            <rect x="64" y="94" width="14" height="32" rx="7" fill="url(#hpCushion)" />
            {/* Left Ear Outer Cup (Silver metallic finish) */}
            <rect x="58" y="96" width="9" height="28" rx="4.5" fill="url(#hpSilver)" stroke="#64748B" strokeWidth="0.8" />

            {/* Right Ear Cushion */}
            <rect x="142" y="94" width="14" height="32" rx="7" fill="url(#hpCushion)" />
            {/* Right Ear Outer Cup */}
            <rect x="153" y="96" width="9" height="28" rx="4.5" fill="url(#hpSilver)" stroke="#64748B" strokeWidth="0.8" />
          </svg>
        )}

        {/* Specular Glare */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 160px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4), transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </div>
  );
};


// ==========================================
// 4. FOOTER PAPER PLANE WITH DOTTED TRAIL
// ==========================================
export const FooterPaperPlane: React.FC = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg
        width="44"
        height="44"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#94A3B8]"
      >
        {/* Dotted trail */}
        <path
          d="M 4 44 C 12 36, 18 38, 22 28 C 26 18, 30 24, 36 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2.5 3.5"
          strokeLinecap="round"
        />
        {/* Paper Plane pointing North-East */}
        <g transform="translate(24, 6) rotate(15)">
          <polygon
            points="0,14 18,0 8,18 7,12"
            fill="#FFFFFF"
            stroke="#64748B"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <line x1="18" y1="0" x2="7" y2="12" stroke="#64748B" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
};
