import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Github, ExternalLink, Layers, Sparkles, Code2, LayoutGrid, Terminal, Eye } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { playClickSound, playPopSound } from '../utils/sound';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'code'>('grid');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cardCodeView, setCardCodeView] = useState<{ [key: string]: boolean }>({});

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const toggleCardCode = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    playClickSound(750, 0.03);
    setCardCodeView((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  return (
    <section id="projects" className="py-24 border-t border-neutral-200 dark:border-rose-950/70 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Multi-Control Interface */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-tech font-semibold tracking-widest uppercase text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shadow-[0_0_8px_#dc2626]" />
              <span>Engineered Projects & Source Code</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Projects Vault & Implementation
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-xl text-sm md:text-base font-sans">
              Hands-on software and machine learning models created during my B.Tech studies at NIAT X Joy University.
            </p>
          </div>

          {/* Controls: Category Filter + View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100/90 dark:bg-rose-950/30 backdrop-blur-md rounded-xl border border-neutral-200 dark:border-rose-950/60">
              {[
                { id: 'all', label: 'All', count: PORTFOLIO_DATA.projects.length },
                { id: 'ai', label: 'AI & ML', count: PORTFOLIO_DATA.projects.filter((p) => p.category === 'ai').length },
                { id: 'web', label: 'Web Dev', count: PORTFOLIO_DATA.projects.filter((p) => p.category === 'web').length },
                { id: 'coding', label: 'Core Coding', count: PORTFOLIO_DATA.projects.filter((p) => p.category === 'coding').length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClickSound(700);
                    setSelectedCategory(tab.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-tech uppercase tracking-wider font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === tab.id
                      ? 'bg-red-600 text-white shadow-sm shadow-red-950/50'
                      : 'text-neutral-600 dark:text-rose-200/70 hover:text-red-500'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                      selectedCategory === tab.id ? 'bg-black/25 text-white' : 'text-neutral-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Grid vs Code Inspector */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100/90 dark:bg-rose-950/30 backdrop-blur-md rounded-xl border border-neutral-200 dark:border-rose-950/60">
              <button
                onClick={() => {
                  playClickSound(650);
                  setViewMode('grid');
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-red-500'
                }`}
                title="Bento Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  playClickSound(650);
                  setViewMode('code');
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'code'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-red-500'
                }`}
                title="Code Matrix View"
              >
                <Code2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Bento Box Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const isFeatured = index === 0 && selectedCategory === 'all';
              const isShowingCode = cardCodeView[project.id];

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    playPopSound();
                    setActiveProject(project);
                  }}
                  className={`group cursor-pointer rounded-2xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/70 overflow-hidden hover:border-red-600/60 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-[0_8px_35px_-6px_rgba(220,38,38,0.28)] flex flex-col ${
                    isFeatured ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  {/* Media or Code View Window */}
                  <div className={`relative overflow-hidden bg-black ${isFeatured ? 'aspect-[21/9]' : 'aspect-video'}`}>
                    {isShowingCode && project.codeSnippet ? (
                      <div className="w-full h-full p-4 bg-[#0a0204] font-mono text-xs overflow-y-auto text-neutral-300">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-950/60 text-[11px] text-red-400 font-tech">
                          <span>{project.codeSnippet.language.toUpperCase()} IMPLEMENTATION</span>
                          <span>Source Preview</span>
                        </div>
                        <pre className="text-[11px] leading-relaxed text-rose-100 whitespace-pre-wrap font-mono">
                          {project.codeSnippet.code}
                        </pre>
                      </div>
                    ) : (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      </>
                    )}

                    {/* Quick Code Flip Pill (stops propagation) */}
                    {project.codeSnippet && (
                      <button
                        onClick={(e) => toggleCardCode(e, project.id)}
                        className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-tech uppercase tracking-wider text-white hover:bg-red-600 transition-colors border border-rose-900/60 flex items-center gap-1 z-10"
                        title="Toggle Code / Visual preview"
                      >
                        {isShowingCode ? <Eye className="w-3 h-3" /> : <Code2 className="w-3 h-3 text-red-400" />}
                        <span>{isShowingCode ? 'Visual' : 'Code'}</span>
                      </button>
                    )}

                    {/* Top Right Inspect Badge */}
                    <div className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white group-hover:bg-red-600 group-hover:text-white transition-colors border border-rose-950/80 z-10">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    {/* Caption on media */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs font-tech font-semibold tracking-wider uppercase text-rose-300">
                        {project.categoryLabel}
                      </div>
                      <div className="font-display text-lg md:text-xl font-bold text-white mt-0.5">
                        {project.title}
                      </div>
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-tech font-medium text-neutral-500 dark:text-rose-200/60">
                        {project.subtitle}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2 font-sans">
                        {project.description}
                      </p>
                    </div>

                    {/* Metrics Ribbon */}
                    <div className="pt-3 border-t border-neutral-100 dark:border-rose-950/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                        <span className="font-display font-bold text-neutral-900 dark:text-white">
                          {project.metrics[0].value}
                        </span>
                        <span className="font-tech text-[11px]">{project.metrics[0].label}</span>
                      </div>

                      <span className="text-xs font-tech uppercase tracking-wider text-red-600 dark:text-red-400 group-hover:underline inline-flex items-center gap-1">
                        Case Study →
                      </span>
                    </div>

                    {/* Clean unboxed tags */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <React.Fragment key={tag}>
                          <span>{tag}</span>
                          {i < Math.min(project.tags.length, 4) - 1 && (
                            <span className="text-neutral-300 dark:text-rose-950" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Interactive Code Matrix Table */}
        {viewMode === 'code' && (
          <div className="rounded-2xl bg-white/90 dark:bg-[#070103]/90 backdrop-blur-md border border-neutral-200 dark:border-rose-950/80 overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-rose-950/70 bg-neutral-50/80 dark:bg-black/60 flex items-center justify-between">
              <span className="text-xs font-tech font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Technical Repository & Source Matrix
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {filteredProjects.length} Projects Loaded
              </span>
            </div>

            <div className="divide-y divide-neutral-100 dark:divide-rose-950/40">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    playPopSound();
                    setActiveProject(project);
                  }}
                  className="p-6 hover:bg-neutral-50/80 dark:hover:bg-rose-950/20 cursor-pointer transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-1 min-w-0 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                        {project.title}
                      </span>
                      <span className="text-[10px] font-tech uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950/40 text-red-400 border border-rose-900/40">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-neutral-400">
                      {project.tags.map((t) => (
                        <span key={t} className="bg-neutral-100 dark:bg-black/60 px-2 py-0.5 rounded border border-neutral-200 dark:border-rose-950/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <div className="font-display text-base font-bold text-red-500 dark:text-red-400">
                        {project.metrics[0].value}
                      </div>
                      <div className="text-[11px] font-tech text-neutral-400">
                        {project.metrics[0].label}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-tech font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Lightbox */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
};
