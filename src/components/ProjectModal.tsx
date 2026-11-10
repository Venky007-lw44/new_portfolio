import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, BarChart2, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0c0305] border border-neutral-200 dark:border-rose-950 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-rose-950/70 shrink-0 bg-neutral-50 dark:bg-black/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
              {project.categoryLabel}
            </span>
            <span className="text-neutral-300 dark:text-rose-950">·</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Deep-Dive Case Study</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-rose-950/40 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 bg-white dark:bg-[#0c0305]">
          {/* Hero Preview Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neutral-200 dark:border-rose-950/80 shadow-md">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {project.title}
                </h2>
                <p className="text-sm font-tech uppercase tracking-wider text-rose-200 mt-1">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs text-neutral-500 dark:text-rose-300/70 mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-rose-950/60 space-y-2">
              <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                The Problem
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-rose-950/60 space-y-2">
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Engineered Solution
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Invariants */}
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-red-500" />
              <span>Key Architectural Decisions</span>
            </h3>
            <ul className="space-y-2.5">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack Tags */}
          <div className="pt-4 border-t border-neutral-200 dark:border-rose-950/60">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
              Technologies & Infrastructure
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-700 dark:text-rose-200/80 font-mono">
              {project.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {idx < project.tags.length - 1 && (
                    <span className="text-neutral-300 dark:text-rose-950" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 dark:bg-black border-t border-neutral-200 dark:border-rose-950/70 flex items-center justify-between shrink-0">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Designed & implemented by Venkat Reddy Vaddi
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-red-500 border border-neutral-300 dark:border-rose-950 rounded-lg transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-rose-950 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
