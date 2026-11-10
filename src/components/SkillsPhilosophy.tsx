import React from 'react';
import { Terminal, ShieldCheck, Cpu, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SkillsPhilosophy: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-t border-neutral-200 dark:border-rose-950/70 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-xs font-tech font-semibold tracking-widest uppercase text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shadow-[0_0_8px_#dc2626]" />
            <span>Technical Foundations & Learning Mindset</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Skills Matrix & Learning Principles
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-xl text-sm md:text-base font-sans">
            Core coding languages, AI/ML tools, and software development methodologies learned at NIAT X Joy University.
          </p>
        </div>

        {/* 4 Learning Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {PORTFOLIO_DATA.philosophies.map((phil, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/70 shadow-sm hover:border-red-600/60 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_8px_30px_-6px_rgba(220,38,38,0.2)]"
            >
              <div className="text-xs font-tech font-semibold uppercase tracking-wider text-red-500 mb-2">
                0{idx + 1}. Principle
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {phil.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                {phil.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skill Domains (4 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/70 shadow-sm flex flex-col justify-between hover:border-red-600/60 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_8px_30px_-6px_rgba(220,38,38,0.2)]"
            >
              <div>
                <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-rose-200/60 mb-4 leading-relaxed font-sans">
                  {cat.description}
                </p>
              </div>

              {/* Unboxed skill tags */}
              <div className="pt-4 border-t border-neutral-100 dark:border-rose-950/60">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  {cat.skills.map((skill, sIdx) => (
                    <React.Fragment key={skill}>
                      <span className="hover:text-red-500 transition-colors">
                        {skill}
                      </span>
                      {sIdx < cat.skills.length - 1 && (
                        <span className="text-neutral-300 dark:text-rose-950" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
