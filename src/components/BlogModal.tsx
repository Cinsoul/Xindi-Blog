import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, ArrowRight, BookOpen } from 'lucide-react';
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

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose }) => {
  const [activeEssay, setActiveEssay] = useState<ThoughtEssay | null>(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.08] z-10 my-8 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B0F17] text-white flex items-center justify-center">
                <BookOpen size={15} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B0F17]">Notes & Essays</h3>
                <p className="text-xs text-[#6B7280]">Thoughts on AI, finance and product craft</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (activeEssay) {
                  setActiveEssay(null);
                } else {
                  onClose();
                }
              }}
              className="p-2 rounded-full hover:bg-black/5 text-[#6B7280] hover:text-[#0B0F17] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto pr-1">
            {activeEssay ? (
              <div>
                <button
                  onClick={() => setActiveEssay(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F6BFF] mb-4 hover:underline"
                >
                  ← Back to all essays
                </button>
                <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold text-[#0B0F17]">{activeEssay.category}</span>
                  <span>·</span>
                  <span>{activeEssay.date}</span>
                  <span>·</span>
                  <span>{activeEssay.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0B0F17] mb-6 leading-tight">
                  {activeEssay.title}
                </h2>
                <div className="text-sm text-[#374151] leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {activeEssay.content}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {essays.map((essay) => (
                  <div
                    key={essay.id}
                    onClick={() => setActiveEssay(essay)}
                    className="group p-5 rounded-2xl bg-[#F8F9FA] hover:bg-[#F1F3F7] border border-black/[0.04] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                      <span className="font-medium text-[#2F6BFF]">{essay.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {essay.readTime}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#0B0F17] group-hover:text-[#2F6BFF] transition-colors mb-2">
                      {essay.title}
                    </h4>
                    <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed mb-3">
                      {essay.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#0B0F17] group-hover:translate-x-0.5 transition-transform">
                      <span>Read essay</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
