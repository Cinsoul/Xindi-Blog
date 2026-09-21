import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Linkedin, Github, Mail } from 'lucide-react';
import { FooterHeadphoneAvatar, FooterPaperPlane } from './AvatarVisuals';

interface ContactSectionProps {
  onOpenConnect: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenConnect,
}) => {
  return (
    <footer id="contact" className="pt-12 sm:pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Main Connect Grid matching 1:1 image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center border-t border-black/[0.06] pt-12 sm:pt-16">
          {/* Left Column: Heading & CTAs (lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-2 select-none">
              LET'S CONNECT
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-[#0B0F17] leading-[1.12] mb-3">
              Always open <br />
              to new conversations.
            </h2>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-[360px] mb-6">
              Whether it's about AI, finance, product, or just a good chat — feel free to reach out!
            </p>

            {/* Action Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                onClick={onOpenConnect}
                id="footer-say-hello-btn"
                className="px-5 py-2.5 rounded-full bg-[#0B0F17] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>Say Hello</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </button>

              <a
                href="https://www.linkedin.com/in/xindi-wang19990526/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="px-4 py-2.5 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0B0F17] text-xs font-semibold border border-black/[0.04] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Linkedin size={14} className="text-[#0A66C2] fill-current" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://x.com/xindi_w"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                title="X Profile (@xindi_w)"
                className="p-2.5 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0B0F17] border border-black/[0.04] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] flex items-center justify-center"
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
                title="GitHub Profile (Cinsoul)"
                className="p-2.5 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0B0F17] border border-black/[0.04] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] flex items-center justify-center"
              >
                <Github size={14} className="stroke-[2]" />
              </a>

              <a
                href="mailto:cinsoul9@gmail.com"
                aria-label="Email (cinsoul9@gmail.com)"
                title="Email: cinsoul9@gmail.com"
                className="p-2.5 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0B0F17] border border-black/[0.04] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] flex items-center justify-center"
              >
                <Mail size={14} className="stroke-[2]" />
              </a>
            </div>
          </div>

          {/* Center Column: 3D Headphone Character with Handwritten Note (lg: 4 cols) */}
          <div className="lg:col-span-4 flex items-center justify-center relative my-4 lg:my-0">
            {/* Handwritten Note: Better Ideas Together. */}
            <div className="font-handwriting text-2xl sm:text-[26px] leading-[1.1] text-[#1E293B] -rotate-6 select-none mr-1 sm:mr-3">
              <div>Better</div>
              <div className="pl-3 font-semibold">Ideas</div>
              <div className="pl-5 font-bold text-[#1E293B]">Together.</div>
            </div>

            {/* Headphone Character */}
            <div className="relative">
              <FooterHeadphoneAvatar />
            </div>
          </div>

          {/* Right Column: Metadata & Copyright (lg: 3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end text-left lg:text-right space-y-6">
            {/* Based in Worldwide with Paper Plane */}
            <div className="flex flex-col items-start lg:items-end">
              <div className="flex items-center gap-2">
                <div>
                  <div className="text-[11px] text-[#6B7280]">Based in</div>
                  <div className="text-sm font-bold text-[#0B0F17]">Worldwide</div>
                </div>
                <FooterPaperPlane />
              </div>
            </div>

            {/* Open to */}
            <div className="flex flex-col items-start lg:items-end">
              <div className="text-[11px] text-[#6B7280]">Open to</div>
              <div className="text-xs font-semibold text-[#0B0F17] mt-0.5">
                Internships · Collaborations · Interesting Ideas
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-2 text-[11px] text-[#6B7280] leading-relaxed">
              <div>Built with curiosity</div>
              <div>© 2026 Xindi Wang. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
