import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, Check, Sparkles, MessageSquare, Linkedin, Github, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Collaboration');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const topics = ['Collaboration', 'Arthera / AI Systems', 'Investment / Advisory', 'Casual Chat'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSent(true);
    // Fire celebratory confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2F6BFF', '#10B981', '#6366F1'],
    });

    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('cinsoul9@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-black/10 shadow-2xl relative text-[#0B0F17]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#667085] hover:text-[#0B0F17] bg-black/5 hover:bg-black/10 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF0FF] text-[#2F6BFF] text-[10px] font-semibold tracking-wider uppercase mb-2">
              <Sparkles size={11} />
              <span>Get in Touch</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0B0F17]">
              Let's Start a Conversation
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              Drop a note directly to Xindi or connect via social channels.
            </p>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <Check size={28} />
              </div>
              <h4 className="text-lg font-bold text-[#0B0F17] mb-1">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-[#667085]">
                Thanks for reaching out. I'll get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Topic Pills */}
              <div>
                <label className="block text-xs font-semibold text-[#0B0F17] mb-2">
                  Topic
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {topics.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        topic === t
                          ? 'bg-[#2F6BFF] text-white shadow-sm'
                          : 'bg-[#F1F3F7] text-[#667085] hover:bg-[#E4E7EC]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B0F17] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-black/[0.08] text-xs text-[#0B0F17] focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0F17] mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-black/[0.08] text-xs text-[#0B0F17] focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#0B0F17] mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you're working on or exploring..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-black/[0.08] text-xs text-[#0B0F17] focus:outline-none focus:border-[#2F6BFF] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0B0F17] hover:bg-[#1E293B] text-white text-xs font-medium shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send size={13} />
              </button>

              {/* Quick direct email & social icons row */}
              <div className="pt-3.5 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#667085]">
                <div className="flex items-center gap-1.5">
                  <span>Direct:</span>
                  <a
                    href="mailto:cinsoul9@gmail.com"
                    className="font-mono text-[#2F6BFF] hover:underline font-medium"
                    title="Send email to cinsoul9@gmail.com"
                  >
                    cinsoul9@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 hover:bg-black/10 text-[#475569] transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Social icons in modal */}
                <div className="flex items-center gap-3 text-[#64748B]">
                  <a
                    href="https://www.linkedin.com/in/xindi-wang19990526/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="hover:text-[#0B0F17] hover:scale-110 transition-all p-1"
                  >
                    <Linkedin size={15} />
                  </a>
                  <a
                    href="https://x.com/xindi_w"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X (Twitter)"
                    title="X (@xindi_w)"
                    className="hover:text-[#0B0F17] hover:scale-110 transition-all p-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/Cinsoul"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="hover:text-[#0B0F17] hover:scale-110 transition-all p-1"
                  >
                    <Github size={15} />
                  </a>
                  <a
                    href="mailto:cinsoul9@gmail.com"
                    aria-label="Email"
                    title="Email"
                    className="hover:text-[#0B0F17] hover:scale-110 transition-all p-1"
                  >
                    <Mail size={15} />
                  </a>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
