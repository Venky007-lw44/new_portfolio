import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-rose-950/70 bg-white/80 dark:bg-[#060103]/85 backdrop-blur-xl py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-display text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]" />
            <span>{PORTFOLIO_DATA.name}</span>
          </div>
          <div className="text-xs font-tech text-neutral-500 dark:text-rose-200/70 mt-1">
            CSE (AI & ML) Student · NIAT X Joy University
          </div>
        </div>

        {/* Clean Nav Links */}
        <div className="flex items-center gap-6 text-xs font-tech font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
          <a href="#about" className="hover:text-red-500 transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-red-500 transition-colors">
            Projects
          </a>
          <a href="#architecture" className="hover:text-red-500 transition-colors">
            AIML Lab
          </a>
          <a href="#experience" className="hover:text-red-500 transition-colors">
            Education
          </a>
          <a href="#skills" className="hover:text-red-500 transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-red-500 transition-colors">
            Contact
          </a>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-mono">
            © {new Date().getFullYear()} Venkat Reddy Vaddi
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-rose-950/40 transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
