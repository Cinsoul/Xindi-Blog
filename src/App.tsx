/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { FeaturedProject } from './components/FeaturedProject';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ThingsICareAbout } from './components/ThingsICareAbout';
import { ContactSection } from './components/ContactSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { AvatarManagerModal } from './components/AvatarManagerModal';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const [blogModalOpen, setBlogModalOpen] = useState<boolean>(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOpenAvatar = () => setAvatarModalOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret hotkey Alt+A or Option+A to reopen if ever needed
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        setAvatarModalOpen(prev => !prev);
      }
    };
    window.addEventListener('open-avatar-manager', handleOpenAvatar);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-avatar-manager', handleOpenAvatar);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#0B0F17] selection:bg-[#2F6BFF]/15 selection:text-[#2F6BFF] relative font-sans">
      {/* Background Soft Ambient Light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(47,107,255,0.04),transparent_70%)] pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar
        onOpenConnect={() => setContactModalOpen(true)}
        onOpenBlog={() => setBlogModalOpen(true)}
      />

      {/* Main Page Content matching 1:1 design */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero onOpenConnect={() => setContactModalOpen(true)} />

        {/* 2. About Me Section */}
        <AboutSection />

        {/* 3. Featured Project: Arthera / Aria */}
        <FeaturedProject
          onOpenProjectModal={() => setProjectModalOpen(true)}
        />

        {/* 4. Experience Timeline */}
        <ExperienceTimeline />

        {/* 5. Things I Care About (Beyond Work) */}
        <ThingsICareAbout />

        {/* 6. Contact & Footer */}
        <ContactSection onOpenConnect={() => setContactModalOpen(true)} />
      </main>

      {/* Interactive Modals */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />

      <BlogModal
        isOpen={blogModalOpen}
        onClose={() => setBlogModalOpen(false)}
      />

      {/* 3D Avatar Manager & Auto-Cropper Modal */}
      <AvatarManagerModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
      />
    </div>
  );
}
