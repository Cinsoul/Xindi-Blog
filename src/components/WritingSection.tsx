import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Tag, X, ChevronRight } from 'lucide-react';
import { ThoughtEssay } from '../types';

const essays: ThoughtEssay[] = [
  {
    id: 'unified-workspaces',
    title: 'Why Unified Workspaces Will Replace Fragmented Toolchains',
    date: 'Sep 2026',
    readTime: '4 min read',
    category: 'Product & AI',
    excerpt:
      'The modern knowledge worker loses 30% of cognitive bandwidth context-switching between chat, code editors, and docs. A look into unified agent canvases.',
    content: `Context fragmentation is the silent killer of creative engineering velocity. 

When developers and founders build with LLMs today, they toggle constantly between standalone chat interfaces, terminal windows, code review environments, and scattered note apps.

With Arthera, we are anchoring all three primitives—conversational reasoning, deterministic code execution, and persistent visual canvases—into a singular high-bandwidth canvas. 

When intelligence is spatial rather than isolated in ephemeral message threads, systems become significantly faster to build, test, and iterate.`,
  },
  {
    id: 'financial-ai-agents',
    title: 'The Intersection of Autonomous LLMs and Market Microstructure',
    date: 'Jul 2026',
    readTime: '6 min read',
    category: 'Finance & Systems',
    excerpt:
      'How quantitative reasoning and real-time execution graphs bridge the gap between financial theory and low-latency algorithmic trading.',
    content: `Financial markets are fundamentally information synthesis machines operating under probabilistic uncertainty.

Traditional quantitative strategies rely on rigid statistical parameterization. Modern multi-agent systems, however, can digest unstructured SEC filings, real-time macroeconomic feeds, and order book dynamics simultaneously.

The key challenge is not intelligence generation—it is deterministic risk boundaries and sub-millisecond execution verification.`,
  },
  {
    id: 'zero-friction-design',
    title: 'Zero-Friction Product Design: Restraint as a Competitive Moat',
    date: 'May 2026',
    readTime: '3 min read',
    category: 'Design Philosophy',
    excerpt:
      'True craftsmanship means removing unnecessary UI noise. Why Apple, Linear, and OpenAI win through quiet typographic discipline.',
    content: `Great software feels inevitable. When you interact with a pristine tool, you don't notice the borders, the shadows, or the decorative accents—you only feel your thoughts translating into reality at the speed of light.

Eliminating cognitive load requires saying no to 99% of feature bloat. Keep the typography mathematical, keep the contrast intentional, and let the core value speak with clarity.`,
  },
];

export const WritingSection: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState<ThoughtEssay | null>(null);

  return (
    <section id="writing" className="py-20 sm:py-28 relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#667085] dark:text-[#94A3B8] mb-2">
              Writing &amp; Thinking
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0B0F17] dark:text-white leading-[1.1]">
              Reflections on <br className="hidden sm:inline" />
              systems, AI &amp; finance.
            </h2>
          </div>
          <p className="text-sm text-[#667085] dark:text-[#94A3B8] max-w-xs">
            Short essays on building 0-to-1 products, market mechanics, and intelligence architectures.
          </p>
        </div>

        {/* Editorial Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {essays.map((essay, index) => (
            <motion.div
              key={essay.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedEssay(essay)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-[#0E131F] border border-black/[0.06] dark:border-white/[0.06] p-7 flex flex-col justify-between hover:border-[#2F6BFF]/40 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#94A3B8] dark:text-[#64748B] mb-4">
                  <span className="font-mono">{essay.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{essay.readTime}</span>
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#EAF0FF] dark:bg-[#1E2B4D] text-[#2F6BFF] dark:text-[#60A5FA] text-[10px] font-semibold tracking-wider uppercase mb-3">
                  {essay.category}
                </div>

                <h3 className="text-lg font-bold text-[#0B0F17] dark:text-white group-hover:text-[#2F6BFF] transition-colors leading-snug mb-3">
                  {essay.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#667085] dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                  {essay.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-xs font-semibold text-[#0B0F17] dark:text-white group-hover:text-[#2F6BFF]">
                <span>Read Essay</span>
                <ChevronRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedEssay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEssay(null)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0F141E] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 border border-black/10 dark:border-white/10 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedEssay(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-[#667085] hover:text-[#0B0F17] dark:text-[#94A3B8] dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-xs text-[#667085] dark:text-[#94A3B8] mb-4">
                <span className="font-mono">{selectedEssay.date}</span>
                <span>·</span>
                <span>{selectedEssay.readTime}</span>
                <span>·</span>
                <span className="text-[#2F6BFF] font-medium">{selectedEssay.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F17] dark:text-white mb-6 leading-snug">
                {selectedEssay.title}
              </h2>

              <div className="prose dark:prose-invert max-w-none text-[#334155] dark:text-[#CBD5E1] text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {selectedEssay.content}
              </div>

              <div className="mt-8 pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B0F17] dark:bg-white text-white dark:text-[#0B0F17] flex items-center justify-center text-xs font-bold font-mono">
                    XW
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B0F17] dark:text-white">
                      Xindi Wang
                    </div>
                    <div className="text-[11px] text-[#667085] dark:text-[#94A3B8]">
                      Author · Arthera
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEssay(null)}
                  className="px-5 py-2 rounded-full bg-[#F1F3F7] dark:bg-[#1A2232] text-xs font-medium text-[#0B0F17] dark:text-white hover:bg-[#E2E8F0]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
