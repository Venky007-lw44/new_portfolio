/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ArchitectureLab } from './components/ArchitectureLab';
import { SkillsPhilosophy } from './components/SkillsPhilosophy';
import { Experience } from './components/Experience';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { toggleSound, isSoundEnabled, playPopSound } from './utils/sound';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Sync dark class on document.documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for Command Palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playPopSound();
        setIsCommandOpen((prev) => !prev);
      } else if (!isInput && (e.key === 'r' || e.key === 'R') && !isCommandOpen) {
        e.preventDefault();
        playPopSound();
        setIsResumeOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen]);

  const handleToggleSound = () => {
    const updated = toggleSound();
    setSoundEnabled(updated);
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectFromCommand = (projectId: string) => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden text-neutral-900 dark:text-white transition-colors selection:bg-red-600/30 selection:text-red-300 ${
      darkMode ? 'bg-aesthetic-pattern' : 'bg-aesthetic-light'
    }`}>
      {/* Background ambient aesthetic lighting effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Right Deep Maroon / Ruby Glow */}
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-red-600/15 via-rose-950/25 to-transparent blur-[140px] animate-ambient-slow" />
        
        {/* Mid-Left Crimson / Wine Glow */}
        <div className="absolute top-[35%] -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-rose-950/30 via-red-900/15 to-transparent blur-[130px] animate-ambient-reverse" />
        
        {/* Bottom-Right Maroon Void Glow */}
        <div className="absolute -bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-rose-950/35 via-red-950/15 to-transparent blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
          onOpenCommand={() => setIsCommandOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        <main className="flex-1">
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenContact={handleOpenContact}
          />
          <Projects />
          <ArchitectureLab />
          <SkillsPhilosophy />
          <Experience />
          <ContactSection />
        </main>

        <Footer />
      </div>

      {/* Student Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectProject={handleSelectProjectFromCommand}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
}
