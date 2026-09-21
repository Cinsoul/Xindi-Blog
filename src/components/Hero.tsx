import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Linkedin, Github, Mail } from 'lucide-react';
import { HeroAvatarScene } from './AvatarVisuals';

interface HeroProps {
  onOpenConnect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConnect }) => {
  const scrollToWork = () => {
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Typography & CTAs (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start z-10 pt-2 sm:pt-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7280] mb-3 select-none"
            >
              BUILDER · LEARNER · EXPLORER
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0B0F17] leading-[1.08] mb-5"
            >
              Turning Ideas <br />
              Into Real Impact.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-[15px] sm:text-base text-[#4B5563] leading-relaxed max-w-[430px] mb-8"
            >
              I'm Xindi, a builder passionate about AI, finance and real-world applications. I love turning complex problems into simple, useful products.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex items-center gap-3.5 mb-9"
            >
              <button
                onClick={scrollToWork}
                id="hero-view-work-btn"
                className="px-6 py-3 rounded-full bg-[#0B0F17] hover:bg-[#1E293B] text-white text-xs sm:text-[13px] font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 group"
              >
                <span>View My Work</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 stroke-[2.5]"
                />
              </button>

              <button
                onClick={onOpenConnect}
                id="hero-get-in-touch-btn"
                className="px-6 py-3 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0B0F17] text-xs sm:text-[13px] font-semibold border border-black/[0.04] shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get In Touch</span>
              </button>
            </motion.div>

            {/* Social Icons Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex items-center gap-5 text-[#4B5563]"
            >
              <a
                href="https://www.linkedin.com/in/xindi-wang19990526/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="hover:text-[#0B0F17] hover:scale-110 transition-all duration-150"
              >
                <Linkedin size={18} className="stroke-[1.8]" />
              </a>

              {/* X (Twitter) icon */}
              <a
                href="https://x.com/xindi_w"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                title="X Profile (@xindi_w)"
                className="hover:text-[#0B0F17] hover:scale-110 transition-all duration-150"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://github.com/Cinsoul"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub Profile"
                className="hover:text-[#0B0F17] hover:scale-110 transition-all duration-150"
              >
                <Github size={18} className="stroke-[1.8]" />
              </a>

              <a
                href="mailto:cinsoul9@gmail.com"
                aria-label="Email (cinsoul9@gmail.com)"
                title="Email: cinsoul9@gmail.com"
                className="hover:text-[#0B0F17] hover:scale-110 transition-all duration-150"
              >
                <Mail size={18} className="stroke-[1.8]" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Character Workspace Scene (7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end items-end relative">
            <HeroAvatarScene />
          </div>
        </div>
      </div>
    </section>
  );
};
