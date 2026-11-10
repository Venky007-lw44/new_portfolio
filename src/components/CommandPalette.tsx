import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Mail, Moon, Sun, Volume2, VolumeX, Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playClickSound, playSuccessSound } from '../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject: (projectId: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Quick Actions';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject,
  darkMode,
  setDarkMode,
  soundEnabled,
  onToggleSound,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollTo = (elementId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Venkat',
      subtitle: 'Student profile, CSE AIML focus, and bio',
      icon: <Terminal className="w-4 h-4 text-red-500" />,
      action: () => scrollTo('about'),
      shortcut: 'G A',
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Explore Projects Vault',
      subtitle: 'LeafScan AI, AlgoVision, CampusConnect and tools',
      icon: <Layers className="w-4 h-4 text-red-500" />,
      action: () => scrollTo('projects'),
      shortcut: 'G P',
    },
    {
      id: 'nav-lab',
      category: 'Navigation',
      title: 'Interactive AIML & Algorithm Lab',
      subtitle: 'Tune gradient descent or watch sorting visualization',
      icon: <Sparkles className="w-4 h-4 text-red-500" />,
      action: () => scrollTo('architecture'),
      shortcut: 'G L',
    },
    {
      id: 'nav-academics',
      category: 'Navigation',
      title: 'NIAT X Joy University Track',
      subtitle: 'Semester progression, milestones, and education',
      icon: <BookOpen className="w-4 h-4 text-red-500" />,
      action: () => scrollTo('experience'),
      shortcut: 'G E',
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Get in Touch / Contact',
      subtitle: 'Send direct message or student inquiry',
      icon: <Mail className="w-4 h-4 text-red-500" />,
      action: () => scrollTo('contact'),
      shortcut: 'G C',
    },

    // Projects direct
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: `proj-${p.id}`,
      category: 'Projects' as const,
      title: p.title,
      subtitle: `${p.categoryLabel} — ${p.subtitle}`,
      icon: <ArrowRight className="w-4 h-4 text-red-400" />,
      action: () => {
        onClose();
        scrollTo('projects');
        setTimeout(() => onSelectProject(p.id), 250);
      },
    })),

    // Quick Actions
    {
      id: 'act-resume',
      category: 'Quick Actions',
      title: 'View Student Resume',
      subtitle: 'Open full academic CV, print or save PDF',
      icon: <FileText className="w-4 h-4 text-red-500" />,
      action: () => {
        onClose();
        onOpenResume();
      },
      shortcut: 'R',
    },
    {
      id: 'act-copy-email',
      category: 'Quick Actions',
      title: 'Copy Student Email',
      subtitle: PORTFOLIO_DATA.email,
      icon: <Mail className="w-4 h-4 text-red-500" />,
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.email);
        playSuccessSound();
        onClose();
      },
    },
    {
      id: 'act-theme',
      category: 'Quick Actions',
      title: darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle theme preference',
      icon: darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-red-400" />,
      action: () => {
        setDarkMode((prev) => !prev);
        playClickSound(750);
      },
    },
    {
      id: 'act-sound',
      category: 'Quick Actions',
      title: soundEnabled ? 'Mute Tactile Audio FX' : 'Enable Tactile Audio FX',
      subtitle: 'Web Audio UI clicks',
      icon: soundEnabled ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-red-500" />,
      action: () => {
        onToggleSound();
        playClickSound(800);
      },
    },
  ], [darkMode, soundEnabled]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Keyboard navigation within list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
        playClickSound(700, 0.02);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
        playClickSound(700, 0.02);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          playClickSound(900, 0.04);
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#070103] border border-neutral-200 dark:border-rose-950/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-rose-950/70 bg-neutral-50 dark:bg-black/60 gap-3">
          <Search className="w-4 h-4 text-red-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search commands, projects, lab, or press Esc to close..."
            className="w-full text-sm font-sans bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-rose-950/30">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-400 font-tech">
              No matching commands found for "{query}"
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playClickSound(850);
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-rose-950/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-black/20 text-white'
                          : 'bg-neutral-100 dark:bg-rose-950/40 text-red-500'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-sm font-bold truncate">
                        {item.title}
                      </div>
                      <div
                        className={`text-xs truncate font-sans ${
                          isSelected ? 'text-rose-100' : 'text-neutral-400 dark:text-rose-200/60'
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span
                      className={`text-[10px] font-tech uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-black/20 text-white'
                          : 'bg-neutral-100 dark:bg-rose-950/30 text-neutral-500 dark:text-rose-200/50'
                      }`}
                    >
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd
                        className={`hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                          isSelected
                            ? 'border-white/30 text-white bg-black/20'
                            : 'border-neutral-200 dark:border-rose-950/70 text-neutral-400 bg-neutral-50 dark:bg-black/40'
                        }`}
                      >
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-neutral-200 dark:border-rose-950/70 bg-neutral-50 dark:bg-black/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="font-tech text-red-500 font-semibold">Venkat Studio Command</span>
        </div>
      </div>
    </div>
  );
};
