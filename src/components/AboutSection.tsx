import React from 'react';
import { motion } from 'motion/react';
import { AboutWinkAvatar } from './AvatarVisuals';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Main Enclosed Card */}
        <div className="rounded-[24px] bg-[#F8F9FA] border border-black/[0.06] p-7 sm:p-11 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Narrative & Signature (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Eyebrow */}
                <div className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-3">
                  ABOUT ME
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#0B0F17] leading-[1.15] mb-4">
                  Curious about <br />
                  a smarter future.
                </h2>

                {/* Body paragraph matching 1:1 text from image */}
                <p className="text-sm sm:text-[14.5px] text-[#4B5563] leading-relaxed max-w-[380px] mb-8">
                  I'm a student and independent builder interested in AI, finance, and global markets. I enjoy building products, exploring new technologies, and connecting with people who are passionate about making an impact.
                </p>
              </div>

              {/* Handwritten Signature matching image */}
              <div className="pt-2">
                <svg
                  width="130"
                  height="50"
                  viewBox="0 0 160 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible"
                >
                  {/* Handwritten Xindi with pen flourish */}
                  <text
                    x="8"
                    y="36"
                    fontFamily="Caveat, cursive"
                    fontSize="46"
                    fontWeight="600"
                    fill="#111827"
                    transform="rotate(-5, 8, 36)"
                  >
                    Xindi
                  </text>
                  {/* Underline flourish swoop */}
                  <path
                    d="M 12 44 C 45 42, 90 40, 150 28"
                    stroke="#111827"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 115 32 C 135 29, 148 27, 155 24"
                    stroke="#111827"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Right Column: 4 Pillars & Quote Card (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* 4 Pillars in a row with subtle dividers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06]">
                {/* 01 Student */}
                <div className="pt-2 sm:pt-0 sm:pr-3">
                  <div className="text-xs font-medium text-[#9CA3AF] mb-1">01</div>
                  <div className="text-sm font-bold text-[#0B0F17] mb-0.5">Student</div>
                  <div className="text-xs text-[#6B7280]">Always learning</div>
                </div>

                {/* 02 Builder */}
                <div className="pt-2 sm:pt-0 sm:px-3">
                  <div className="text-xs font-medium text-[#9CA3AF] mb-1">02</div>
                  <div className="text-sm font-bold text-[#0B0F17] mb-0.5">Builder</div>
                  <div className="text-xs text-[#6B7280]">From 0 to 1</div>
                </div>

                {/* 03 Explorer */}
                <div className="pt-2 sm:pt-0 sm:px-3">
                  <div className="text-xs font-medium text-[#9CA3AF] mb-1">03</div>
                  <div className="text-sm font-bold text-[#0B0F17] mb-0.5">Explorer</div>
                  <div className="text-xs text-[#6B7280]">Global mindset</div>
                </div>

                {/* 04 Optimist */}
                <div className="pt-2 sm:pt-0 sm:pl-3">
                  <div className="text-xs font-medium text-[#9CA3AF] mb-1">04</div>
                  <div className="text-sm font-bold text-[#0B0F17] mb-0.5">Optimist</div>
                  <div className="text-xs text-[#6B7280]">A better tomorrow</div>
                </div>
              </div>

              {/* Quote Card with Winking Character */}
              <div className="rounded-2xl bg-white border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
                {/* Left side: Quote symbol & copy */}
                <div className="flex-1 flex flex-col items-start">
                  {/* Quote icon symbol */}
                  <div className="text-3xl text-[#9CA3AF]/60 font-serif leading-none select-none mb-1">
                    “
                  </div>
                  <p className="text-sm sm:text-[15px] font-medium text-[#374151] leading-relaxed max-w-[360px]">
                    "Technology is most powerful when it makes people's lives simpler, freer, and more meaningful."
                  </p>
                </div>

                {/* Right side: 3D Winking Peace-Sign Character */}
                <div className="shrink-0 flex items-center justify-center">
                  <AboutWinkAvatar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
