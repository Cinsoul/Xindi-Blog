import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ArtheraLogo } from './ArtheraLogo';

interface FeaturedProjectProps {
  onOpenProjectModal: () => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  onOpenProjectModal,
}) => {
  return (
    <section id="featured" className="py-12 sm:py-16 relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-2 select-none">
              FEATURED PROJECT
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-[#0B0F17] leading-[1.12]">
              Building tools <br className="hidden sm:inline" />
              for a more open world.
            </h2>
          </div>

          <button
            onClick={onOpenProjectModal}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B0F17] hover:text-[#2F6BFF] transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 stroke-[2.5]"
            />
          </button>
        </div>

        {/* Featured Project Showcase Card matching 1:1 image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={onOpenProjectModal}
          className="cursor-pointer group relative rounded-[24px] bg-white border border-black/[0.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px] items-stretch">
            {/* Left Column: Project Details (lg: 6 cols) */}
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-11 flex flex-col justify-between">
              <div>
                {/* Squircle App Icon */}
                <div className="mb-5">
                  <ArtheraLogo size={64} />
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold tracking-tight text-[#0B0F17] mb-2">
                  Arthera / Aria
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-[#4B5563] leading-relaxed max-w-[390px] mb-6">
                  A unified AI workspace for chat, work and code. Connect your tools, ideas and data — all in one place.
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {['AI', 'Productivity', 'Developer Tools'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-[#F1F3F7] text-[#4B5563] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Round Arrow Button */}
              <div className="pt-6">
                <div className="w-10 h-10 rounded-full border border-black/[0.1] bg-white group-hover:bg-[#0B0F17] group-hover:text-white group-hover:border-[#0B0F17] flex items-center justify-center text-[#0B0F17] transition-all shadow-sm">
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Right Column: 3D Perspective Floating UI Cards (lg: 6 cols) */}
            <div className="lg:col-span-6 relative bg-gradient-to-br from-[#EEF4FF] via-[#F5F8FE] to-[#FAFBFD] p-6 sm:p-10 flex items-center justify-center overflow-hidden min-h-[260px] lg:min-h-auto">
              {/* Perspective Visual Mockup */}
              <div className="relative w-full max-w-[420px] h-[220px] sm:h-[240px] flex items-center justify-center">
                {/* Tilted Floating Sticker Card: Think Build Create Together */}
                <motion.div
                  whileHover={{ y: -4, rotate: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-2 sm:left-6 top-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_12px_30px_rgba(30,58,138,0.08)] border border-white/80 -rotate-6 select-none"
                >
                  <div className="font-handwriting text-lg sm:text-xl text-[#334155] leading-[1.2]">
                    <div className="font-semibold text-[#1E293B]">Think</div>
                    <div className="font-semibold text-[#1E293B]">Build</div>
                    <div className="font-semibold text-[#2F6BFF]">Create</div>
                    <div className="font-bold text-[#1E293B]">Together</div>
                  </div>
                </motion.div>

                {/* Perspective Tilted Tablet / Browser Window */}
                <motion.div
                  whileHover={{ y: -4, rotate: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 sm:right-4 top-4 w-[240px] sm:w-[280px] h-[180px] sm:h-[200px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.08)] border border-black/[0.06] p-3 flex flex-col justify-between rotate-6 select-none"
                >
                  {/* Window Controls header */}
                  <div className="flex items-center gap-1.5 pb-2 border-b border-black/[0.04]">
                    <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                    <span className="w-2 h-2 rounded-full bg-[#E2E8F0]" />
                    <span className="w-2 h-2 rounded-full bg-[#E2E8F0]" />
                  </div>

                  {/* Window Content: Centered Monogram & Clean UI Lines */}
                  <div className="flex-1 flex flex-col items-center justify-center py-2">
                    <div className="mb-2 drop-shadow-sm">
                      <ArtheraLogo size={44} />
                    </div>

                    <div className="h-1.5 w-16 bg-[#E2E8F0] rounded-full mb-1" />
                    <div className="h-1 w-24 bg-[#F1F5F9] rounded-full" />
                  </div>

                  {/* Window Bottom status bar */}
                  <div className="h-2 w-full bg-[#F8FAFC] rounded-lg" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
