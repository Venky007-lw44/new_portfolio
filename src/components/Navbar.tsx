import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Search, Volume2, VolumeX, Sparkles, FileText } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenCommand: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenResume,
  onOpenContact,
  onOpenCommand,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'architecture', 'experience', 'skills', 'contact'];
      const scrollY = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'architecture', label: 'AIML Lab' },
    { id: 'experience', label: 'Academics' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-6 py-3 transition-all duration-300">
      <div className="max-w-6xl mx-auto rounded-2xl bg-white/80 dark:bg-[#070103]/85 backdrop-blur-2xl border border-neutral-200/90 dark:border-rose-950/70 shadow-xl shadow-black/10 dark:shadow-red-950/20 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Wordmark & University Tag */}
        <a
          href="#"
          onClick={() => playClickSound(650)}
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_12px_#dc2626]" />
            <span className="absolute w-4 h-4 rounded-full bg-red-600/30 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-neutral-900 dark:text-white group-hover:text-red-500 transition-colors whitespace-nowrap">
              Venkat Reddy Vaddi
            </span>
            <span className="text-[10px] font-tech text-neutral-500 dark:text-rose-200/70 -mt-0.5 hidden sm:block">
              NIAT X Joy University · CSE (AI & ML)
            </span>
          </div>
        </a>

        {/* Center Pill Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100/80 dark:bg-black/50 p-1 rounded-xl border border-neutral-200/50 dark:border-rose-950/50">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => playClickSound(750)}
                className={`px-3 py-1 text-xs font-tech font-semibold tracking-wider uppercase rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm shadow-red-950/60'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-red-500 hover:bg-neutral-200/60 dark:hover:bg-rose-950/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Tools & Actions Zone */}
        <div className="flex items-center gap-2 shrink-0">
          {/* ⌘K Command Palette Button */}
          <button
            onClick={() => {
              playClickSound(800);
              onOpenCommand();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-tech text-neutral-600 dark:text-neutral-300 hover:text-red-500 bg-neutral-100 dark:bg-rose-950/40 border border-neutral-200 dark:border-rose-950/70 transition-colors shadow-sm"
            title="Open command palette (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden lg:inline text-[11px] font-mono">⌘K</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              playClickSound(900);
            }}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio feedback'}
            className="p-1.5 sm:p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-rose-950/40 transition-colors"
            title={soundEnabled ? 'Mute UI sounds' : 'Enable UI sounds'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-red-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-400" />
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => {
              playClickSound(700);
              setDarkMode((prev) => !prev);
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 sm:p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-rose-950/40 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-rose-500" />}
          </button>

          {/* Student Resume Action */}
          <button
            onClick={() => {
              playClickSound(850);
              onOpenResume();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-200 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-neutral-300 dark:border-rose-950/80"
          >
            <FileText className="w-3.5 h-3.5 text-red-500" />
            <span>Resume</span>
          </button>

          {/* Get in touch CTA */}
          <button
            onClick={() => {
              playClickSound(850);
              onOpenContact();
            }}
            className="px-3.5 py-1.5 text-xs font-tech font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-rose-950 rounded-xl shadow-sm shadow-red-950/50 transition-all border border-red-500/40"
          >
            Contact
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-red-500 transition-colors ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-white/95 dark:bg-[#070103]/95 backdrop-blur-2xl border border-neutral-200 dark:border-rose-950/80 shadow-2xl space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => {
                  playClickSound(750);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-xs font-tech font-semibold tracking-wider uppercase rounded-xl transition-colors text-center ${
                  activeSection === link.id
                    ? 'bg-red-600 text-white'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-rose-950/40'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-200 dark:border-rose-950/60 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-semibold uppercase tracking-wider text-neutral-800 dark:text-white"
            >
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>View Resume</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommand();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech text-red-500"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Command Bar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
