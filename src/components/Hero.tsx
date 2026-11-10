import React, { useState, useEffect } from 'react';
import { ArrowDown, Check, Copy, FileText, Sparkles, MapPin, Terminal, Code2, BookOpen, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playClickSound, playSuccessSound } from '../utils/sound';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact }) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'focus' | 'bash'>('profile');
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'Exploring Computer Vision & AI Models',
    'Student @ NIAT X Joy University',
    'Learning Python & Algorithms',
    'Building Web Applications & Tools',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    playSuccessSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="about" className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typographic & Code Terminal Station */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Campus Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-rose-950/40 border border-neutral-200 dark:border-rose-900/60 text-xs font-tech font-semibold tracking-wider uppercase text-neutral-800 dark:text-rose-200">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#dc2626]" />
              <span>NIAT X Joy University · CSE (AI & ML)</span>
            </div>

            {/* Display Headline */}
            <div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.08] [text-wrap:balance]">
                Hi, I'm <span className="text-red-600 dark:text-red-500">Venkat Reddy Vaddi</span>.
              </h1>
              <div className="h-8 mt-2 flex items-center">
                <span className="font-tech text-base sm:text-lg font-semibold tracking-wide text-neutral-600 dark:text-rose-200/90 transition-all duration-300">
                  → {roles[roleIndex]}
                </span>
              </div>
            </div>

            {/* Bio paragraph */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl font-normal">
              {PORTFOLIO_DATA.bio}
            </p>

            {/* Interactive Student Terminal Widget */}
            <div className="rounded-2xl bg-neutral-950/90 dark:bg-[#070103]/95 border border-neutral-300/40 dark:border-rose-950/90 shadow-xl overflow-hidden font-mono text-xs">
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/80 dark:bg-black/80 border-b border-neutral-800 dark:border-rose-950/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] text-neutral-400 font-tech">student_env ~ zsh</span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1">
                  {[
                    { id: 'profile', label: 'student.py' },
                    { id: 'focus', label: 'interests.json' },
                    { id: 'bash', label: 'status.sh' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playClickSound(700, 0.02);
                        setActiveTab(tab.id as typeof activeTab);
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-tech tracking-wide transition-colors ${
                        activeTab === tab.id
                          ? 'bg-rose-950/80 text-red-400 border border-rose-900/60'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 text-neutral-300 font-mono space-y-1.5 overflow-x-auto">
                {activeTab === 'profile' && (
                  <>
                    <div className="text-neutral-500"># Computer Science & Engineering Undergraduate</div>
                    <div><span className="text-rose-400">class</span> <span className="text-amber-300">UndergradStudent</span>:</div>
                    <div className="pl-4">name = <span className="text-emerald-400">"Venkat Reddy Vaddi"</span></div>
                    <div className="pl-4">college = <span className="text-emerald-400">"NIAT X Joy University"</span></div>
                    <div className="pl-4">program = <span className="text-emerald-400">"B.Tech CSE with AI & ML"</span></div>
                    <div className="pl-4">level = <span className="text-emerald-400">"Enthusiastic Beginner Programmer"</span></div>
                    <div className="pl-4">core_languages = [<span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"C"</span>, <span className="text-emerald-400">"JavaScript"</span>]</div>
                  </>
                )}

                {activeTab === 'focus' && (
                  <>
                    <div className="text-neutral-500">// Machine Learning & Development Areas</div>
                    <div>{'{'}</div>
                    <div className="pl-4"><span className="text-rose-400">"primary_field"</span>: <span className="text-emerald-400">"Artificial Intelligence & ML"</span>,</div>
                    <div className="pl-4"><span className="text-rose-400">"active_topics"</span>: [</div>
                    <div className="pl-8"><span className="text-emerald-400">"Scikit-learn"</span>, <span className="text-emerald-400">"Computer Vision (CNN basics)"</span>,</div>
                    <div className="pl-8"><span className="text-emerald-400">"Gradient Descent Optimization"</span>, <span className="text-emerald-400">"Data Structures"</span></div>
                    <div className="pl-4">],</div>
                    <div className="pl-4"><span className="text-rose-400">"target_role"</span>: <span className="text-emerald-400">"Software Engineer Intern / AI Apprentice"</span></div>
                    <div>{'}'}</div>
                  </>
                )}

                {activeTab === 'bash' && (
                  <>
                    <div className="text-neutral-500">$ check_student_availability</div>
                    <div><span className="text-red-500">➜</span> <span className="text-neutral-300">Location:</span> Joy University Campus, India</div>
                    <div><span className="text-red-500">➜</span> <span className="text-neutral-300">Internship Window:</span> Available for Summer/Fall Internships</div>
                    <div><span className="text-red-500">➜</span> <span className="text-neutral-300">Hackathon Teammate:</span> Ready to collaborate</div>
                    <div className="text-emerald-400 pt-1">✔ System ready: contact venkatvaddi1329@gmail.com</div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={() => playClickSound(800)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-tech font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-rose-950 rounded-xl shadow-lg shadow-red-950/40 transition-all border border-red-500/30"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  playClickSound(800);
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-tech font-semibold uppercase tracking-wider text-neutral-800 dark:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 border border-neutral-300 dark:border-rose-950/80 rounded-xl transition-all"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>View CV / Resume</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-red-500 bg-neutral-100/60 dark:bg-black/40 border border-neutral-200 dark:border-rose-950/70 rounded-xl transition-colors"
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-red-500 font-medium font-sans">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{PORTFOLIO_DATA.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Holographic Portrait Card */}
          <div className="lg:col-span-5">
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              {/* Outer atmospheric red/maroon halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-red-600/30 via-rose-950/60 to-transparent rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative rounded-3xl overflow-hidden border border-neutral-300 dark:border-rose-950/90 bg-black/90 shadow-2xl backdrop-blur-xl">
                {/* Header Badge */}
                <div className="px-5 py-3 bg-neutral-900/90 dark:bg-black/90 border-b border-neutral-200/20 dark:border-rose-950/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-tech font-semibold tracking-wider uppercase text-neutral-300">
                      Joy University Campus
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-red-400">B.Tech CSE</span>
                </div>

                {/* Photo Container */}
                <div className="relative aspect-square overflow-hidden bg-black">
                  {!imgError ? (
                    <img
                      src="/assets/aistudio/Screenshot_2026-09-18_113603_9e215e94.png"
                      alt="Venkat Reddy Vaddi — Student @ NIAT X Joy University"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('/public/')) {
                          target.src = '/public/assets/aistudio/Screenshot_2026-09-18_113603_9e215e94.png';
                        } else {
                          setImgError(true);
                        }
                      }}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black text-center">
                      <div className="w-16 h-16 rounded-full bg-rose-950 text-red-400 flex items-center justify-center font-bold text-2xl mb-4 border border-rose-900/60">
                        VRV
                      </div>
                      <div className="text-lg font-bold text-white font-display">Venkat Reddy Vaddi</div>
                      <div className="text-xs text-neutral-400 mt-1 font-tech">CSE (AI & ML) Student</div>
                    </div>
                  )}

                  {/* Gradient Card Scrim */}
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="font-display text-base font-bold text-white">Venkat Reddy Vaddi</div>
                    <div className="text-xs font-tech text-rose-200/90 mt-0.5">
                      B.Tech in CSE (Artificial Intelligence & Machine Learning)
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                      <MapPin className="w-3 h-3 text-red-500" />
                      <span>Joy University, Tamil Nadu · Open for Internships</span>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Pill Footer */}
                <div className="px-5 py-3 bg-neutral-900/60 dark:bg-rose-950/20 border-t border-neutral-200/20 dark:border-rose-950/70 flex items-center justify-between text-xs font-tech">
                  <span className="text-neutral-400">Academic Status</span>
                  <span className="text-red-400 font-semibold uppercase tracking-wider">Active Undergraduate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Metric Row */}
        <div className="mt-16 pt-10 border-t border-neutral-200 dark:border-rose-950/70 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/60 dark:bg-[#070103]/60 backdrop-blur-md border border-neutral-200 dark:border-rose-950/60 hover:border-red-600/50 transition-colors space-y-1"
            >
              <div className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-tech uppercase tracking-wider text-neutral-500 dark:text-rose-200/60 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
