import React from 'react';
import { motion } from 'motion/react';

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    year: '2024',
    company: 'Balenciaga',
    role: 'Internship Application',
    description: 'Exploring the intersection of fashion, culture and technology.',
  },
  {
    year: '2025',
    company: 'Goldman Sachs',
    role: 'Research Internship Application',
    description: 'Deepening my understanding of global markets and economics.',
  },
  {
    year: '2025',
    company: 'Barclays',
    role: 'Sales & Trading Application',
    description: 'Focusing on options, futures and market structure.',
  },
  {
    year: '2026+',
    company: 'Building\nArthera',
    role: '',
    description: 'Working towards AGI and a more connected world.',
  },
];

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Eyebrow & Headline (lg: 4 cols) */}
          <div className="lg:col-span-4">
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-2 select-none">
              EXPERIENCE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#0B0F17] leading-[1.12]">
              A journey <br />
              of continuous growth.
            </h2>
          </div>

          {/* Right Column: Horizontal Timeline (lg: 8 cols) */}
          <div className="lg:col-span-8 pt-2">
            {/* Horizontal Line with 4 Blue Dots on Desktop */}
            <div className="relative mb-4 hidden lg:block">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1.5px] bg-[#E2E8F0]" />

              {/* 4 Evenly Spaced Dots */}
              <div className="grid grid-cols-4 relative z-10">
                {experiences.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] ring-4 ring-white" />
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Milestone Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiences.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="flex flex-col"
                >
                  {/* Mobile indicator dot */}
                  <div className="lg:hidden flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2F6BFF]" />
                    <span className="text-xs font-medium text-[#6B7280]">{item.year}</span>
                  </div>

                  {/* Desktop Year */}
                  <div className="hidden lg:block text-xs font-medium text-[#6B7280] mb-2">
                    {item.year}
                  </div>

                  {/* Company Name */}
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#0B0F17] leading-snug whitespace-pre-line">
                    {item.company}
                  </h3>

                  {/* Role (if present) */}
                  {item.role && (
                    <div className="text-xs font-medium text-[#4B5563] mt-0.5">
                      {item.role}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-[#6B7280] leading-relaxed mt-2.5">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
