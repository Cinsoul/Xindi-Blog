import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Layers,
  Zap,
  Lock,
  MessageSquare,
  Code2,
  FileText,
  Percent,
  LayoutGrid,
  Plus,
  Compass,
  FolderGit2,
  TrendingUp,
  Search,
  BarChart2,
  PenTool,
  Mic,
  ArrowUp,
  User,
  PanelLeft,
} from 'lucide-react';
import { ArtheraLogo } from './ArtheraLogo';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [activeNav, setActiveNav] = useState<string>('New Chat');
  const [activeProject, setActiveProject] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('');
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickActions = [
    { label: 'Research', icon: Search, prompt: 'Synthesize multi-asset macro liquidity report...' },
    { label: 'Analyze', icon: BarChart2, prompt: 'Analyze Q3 treasury yields and portfolio volatility...' },
    { label: 'Build', icon: Code2, prompt: 'Build real-time websocket order book visualizer...' },
    { label: 'Create', icon: PenTool, prompt: 'Draft interactive product requirements spec...' },
    { label: 'Explore', icon: LayoutGrid, prompt: 'Explore agent workflows and connected tools...' },
  ];

  const handleActionClick = (prompt: string) => {
    setPromptText(prompt);
    setSubmittedQuery(prompt);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[28px] sm:rounded-[32px] max-w-[1060px] w-full p-6 sm:p-9 lg:p-11 border border-black/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.12)] relative my-auto overflow-hidden text-[#0B0F17]"
        >
          {/* Top Row: Eyebrow Tag & Clean Close Button */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7280] select-none">
              FOUNDER PROJECT
            </span>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 text-[#6B7280] hover:text-[#0B0F17] transition-colors rounded-full hover:bg-black/5"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          {/* Main Top / Middle Section: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Branding, Title, Subtitle, Description & Tags */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Squircle Brand Logo */}
              <div className="mb-4">
                <ArtheraLogo size={72} />
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-[38px] font-bold tracking-tight text-[#0B0F17] leading-[1.15] mb-2">
                Arthera / Aria
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-[17px] text-[#4B5563] font-normal leading-snug mb-4">
                A unified AI workspace for thinking, building and getting things done.
              </p>

              {/* Detailed Description */}
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                Aria brings chat, work, code, files and connected tools into one intelligent workspace — designed to move from intent to execution without breaking context.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {['AI', 'Productivity', 'Developer Tools'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 rounded-full bg-[#F3F4F6] text-[#4B5563] text-xs font-medium select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: macOS Window UI Mockup of Arthera */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-black/[0.08] shadow-[0_16px_36px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col select-none">
                {/* Window Titlebar */}
                <div className="h-9 px-3.5 bg-[#F9FAFB] border-b border-black/[0.05] flex items-center justify-between">
                  {/* macOS 3 dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/30" />
                  </div>

                  {/* Window Right Action Icons */}
                  <div className="flex items-center gap-2.5 text-[#94A3B8]">
                    <PanelLeft size={13} className="hover:text-[#475569] cursor-pointer" />
                    <div className="w-5 h-5 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#475569]">
                      <User size={11} />
                    </div>
                  </div>
                </div>

                {/* Window Inner Body: Sidebar + Main Area */}
                <div className="grid grid-cols-12 min-h-[300px]">
                  {/* Mockup Left Sidebar (4 cols) */}
                  <div className="col-span-4 p-3 bg-[#FAFBFD] border-r border-black/[0.05] flex flex-col justify-between text-[11px]">
                    <div>
                      {/* Brand Header */}
                      <div className="flex items-center gap-1.5 px-1.5 pb-3 pt-0.5 font-bold text-[#0B0F17]">
                        <ArtheraLogo size={18} />
                        <span className="tracking-tight text-[12px]">Arthera</span>
                      </div>

                      {/* Navigation Items */}
                      <div className="space-y-0.5">
                        {[
                          { id: 'New Chat', label: 'New Chat', icon: MessageSquare },
                          { id: 'Work', label: 'Work', icon: MessageSquare },
                          { id: 'Code', label: 'Code', icon: Code2 },
                          { id: 'Files', label: 'Files', icon: FileText },
                          { id: 'Tools', label: 'Tools', icon: Percent },
                          { id: 'Apps', label: 'Apps', icon: LayoutGrid },
                        ].map((item) => {
                          const Icon = item.icon;
                          const isActive = activeNav === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveNav(item.id)}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-left ${
                                isActive
                                  ? 'bg-[#EEF1F6] text-[#0B0F17] font-medium'
                                  : 'text-[#64748B] hover:bg-black/[0.03]'
                              }`}
                            >
                              <Icon size={12} className="shrink-0 stroke-[2]" />
                              <span className="truncate">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Projects Section */}
                      <div className="mt-4 pt-2 border-t border-black/[0.04]">
                        <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase">
                          <span>Projects</span>
                          <Plus size={11} className="hover:text-[#0B0F17] cursor-pointer" />
                        </div>

                        <div className="space-y-0.5">
                          {[
                            { id: 'p1', label: 'Investment Research', icon: FolderGit2 },
                            { id: 'p2', label: 'Website Development', icon: Code2 },
                            { id: 'p3', label: 'Market Analysis', icon: TrendingUp },
                            { id: 'p4', label: 'New Project', icon: Compass },
                          ].map((p) => {
                            const Icon = p.icon;
                            const isPActive = activeProject === p.id;
                            return (
                              <button
                                key={p.id}
                                onClick={() => setActiveProject(p.id)}
                                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-[10.5px] transition-colors text-left truncate ${
                                  isPActive
                                    ? 'bg-[#EEF1F6] text-[#0B0F17] font-medium'
                                    : 'text-[#64748B] hover:text-[#0B0F17]'
                                }`}
                              >
                                <Icon size={11} className="shrink-0 text-[#94A3B8]" />
                                <span className="truncate">{p.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mockup Main Canvas (8 cols) */}
                  <div className="col-span-8 p-5 sm:p-6 flex flex-col items-center justify-center text-center bg-white">
                    {/* Centered Welcome Greeting */}
                    <div className="mb-5">
                      <h4 className="text-base sm:text-lg font-bold text-[#0B0F17] tracking-tight">
                        Good afternoon, Xindi.
                      </h4>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        What would you like to work on today?
                      </p>
                    </div>

                    {/* Search / Task Input Container */}
                    <div className="w-full max-w-[380px] rounded-xl border border-black/[0.08] bg-[#FAFAFC] px-3 py-2 flex items-center gap-2 shadow-xs mb-3.5">
                      <button
                        className="text-[#94A3B8] hover:text-[#475569] shrink-0"
                        title="Add attachment"
                      >
                        <Plus size={13} />
                      </button>

                      <input
                        type="text"
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        placeholder="Ask anything, or create a new task..."
                        className="w-full bg-transparent text-xs text-[#0B0F17] placeholder-[#94A3B8] outline-none"
                      />

                      <div className="flex items-center gap-1.5 shrink-0 text-[#94A3B8]">
                        <Mic size={13} className="hover:text-[#475569] cursor-pointer" />
                        <button
                          onClick={() => {
                            if (promptText) setSubmittedQuery(promptText);
                          }}
                          className="w-6 h-6 rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#475569] flex items-center justify-center transition-colors"
                        >
                          <ArrowUp size={11} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    {/* Quick Action Suggestion Chips */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[390px]">
                      {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.label}
                            onClick={() => handleActionClick(action.prompt)}
                            className="px-2.5 py-1 rounded-md bg-[#F4F5F7] hover:bg-[#E9EBEF] text-[10.5px] font-medium text-[#475569] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Icon size={11} className="text-[#64748B]" />
                            <span>{action.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Subtle execution feedback if interacted */}
                    {submittedQuery && (
                      <div className="mt-3 text-[10.5px] text-emerald-600 font-medium animate-fade-in flex items-center gap-1">
                        <span>✓ Workspace initialized with context</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: 3 Feature Columns matching Figure 2 1:1 */}
          <div className="mt-8 sm:mt-10 pt-7 sm:pt-8 border-t border-black/[0.06] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">
            {/* Pillar 1: Unified Workspace */}
            <div className="py-4 md:py-0 md:pr-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F5F7] border border-black/[0.04] flex items-center justify-center text-[#0B0F17] shrink-0">
                <Layers size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-[#0B0F17] mb-1">
                  Unified Workspace
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Chat, files, code and tools share one persistent working context.
                </p>
              </div>
            </div>

            {/* Pillar 2: From Reasoning to Action */}
            <div className="py-4 md:py-0 md:px-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F5F7] border border-black/[0.04] flex items-center justify-center text-[#0B0F17] shrink-0">
                <Zap size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-[#0B0F17] mb-1">
                  From Reasoning to Action
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Turn ideas into real outputs without switching environments.
                </p>
              </div>
            </div>

            {/* Pillar 3: Privacy by Design */}
            <div className="py-4 md:py-0 md:pl-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F5F7] border border-black/[0.04] flex items-center justify-center text-[#0B0F17] shrink-0">
                <Lock size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-[#0B0F17] mb-1">
                  Privacy by Design
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Your data, your control. Built for long-term trust.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

