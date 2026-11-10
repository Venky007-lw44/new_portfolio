import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, MapPin, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const text = `# ${PORTFOLIO_DATA.name}
${PORTFOLIO_DATA.title}
Email: ${PORTFOLIO_DATA.email} | Location: ${PORTFOLIO_DATA.location}

## Summary
${PORTFOLIO_DATA.bio}

## Experience
${PORTFOLIO_DATA.experiences
  .map(
    (e) => `### ${e.role} — ${e.company} (${e.period})
${e.summary}
${e.achievements.map((a) => `- ${a}`).join('\n')}
Technologies: ${e.technologies.join(', ')}`
  )
  .join('\n\n')}

## Education
B.S. in Computer Science & Engineering
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0c0406] border border-neutral-200 dark:border-rose-950/70 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-200 dark:border-rose-950/70 bg-neutral-50 dark:bg-black/80 shrink-0">
          <div className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Student Curriculum Vitae</span>
            <span className="text-rose-900">·</span>
            <span className="text-neutral-500 dark:text-rose-200/70 font-normal">Venkat Reddy Vaddi</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-neutral-300 dark:border-rose-950/70"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-neutral-300 dark:border-rose-950/70"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-red-500 dark:hover:text-white transition-colors ml-2"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="overflow-y-auto p-8 sm:p-12 space-y-8 print:p-0 print:m-0 bg-white dark:bg-[#0c0406] text-neutral-900 dark:text-white">
          {/* Header */}
          <div className="border-b border-neutral-200 dark:border-rose-950 pb-6 flex items-start justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Venkat Reddy Vaddi</h1>
              <p className="text-base text-red-600 dark:text-red-400 font-medium mt-1 font-tech">
                Student · B.Tech in CSE (AI & ML) @ NIAT X Joy University
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-3 font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  <span>venkatvaddi1329@gmail.com</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Joy University, Tamil Nadu / India</span>
                </span>
                <span>·</span>
                <span>Open for Internships</span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-neutral-200 dark:border-rose-900 shadow-sm hidden sm:block">
              <img
                src="/assets/aistudio/Screenshot_2026-09-18_113603_9e215e94.png"
                alt="Venkat Reddy Vaddi"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/public/')) {
                    target.src = '/public/assets/aistudio/Screenshot_2026-09-18_113603_9e215e94.png';
                  }
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Academic Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2 font-mono">
              Academic Summary
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Enthusiastic and motivated Computer Science and Engineering undergraduate student specializing in Artificial Intelligence and Machine Learning at NIAT X Joy University. Beginner programmer with strong foundational training in Python, C, Data Structures, Web Development, and foundational Machine Learning models. Eager to contribute to software development internships, hackathons, and innovative collaborative projects.
            </p>
          </div>

          {/* Core Technical Strengths */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 font-mono">
              Technical Skill Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                  Programming Languages
                </span>
                <span className="text-neutral-600 dark:text-rose-200/80 font-mono">
                  Python (Core & OOP), C Language, JavaScript (ES6+), Java (Basics), SQL (Basics)
                </span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                  AI & Machine Learning (Curriculum)
                </span>
                <span className="text-neutral-600 dark:text-rose-200/80 font-mono">
                  NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, Linear Regression, KNN, Decision Trees
                </span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                  Web Development (Beginner)
                </span>
                <span className="text-neutral-600 dark:text-rose-200/80 font-mono">
                  HTML5, CSS3, Tailwind CSS, React (Basics), DOM Manipulation, Responsive Design
                </span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                  Developer Tools & Core CS
                </span>
                <span className="text-neutral-600 dark:text-rose-200/80 font-mono">
                  Git & GitHub, VS Code, Linux Basics, Data Structures & Algorithms, Object-Oriented Programming
                </span>
              </div>
            </div>
          </div>

          {/* Academic & Project Milestones */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-4 font-mono">
              Academic Learning Experience & Projects
            </h2>
            <div className="space-y-6">
              {PORTFOLIO_DATA.experiences.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {exp.role} — <span className="text-red-500 dark:text-red-400">{exp.company}</span>
                    </h3>
                    <span className="text-xs text-neutral-500 dark:text-rose-200/70 font-mono">{exp.period}</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">{exp.summary}</p>
                  <ul className="list-disc list-inside text-xs text-neutral-700 dark:text-neutral-300 space-y-1 pl-1">
                    {exp.achievements.map((ach, achIdx) => (
                      <li key={achIdx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="border-t border-neutral-200 dark:border-rose-950/70 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2 font-mono">
              Education & Institution
            </h2>
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline text-xs gap-1">
              <div>
                <span className="font-bold text-neutral-900 dark:text-white">
                  Bachelor of Technology (B.Tech) in Computer Science and Engineering
                </span>
                <div className="text-red-600 dark:text-red-400 font-medium mt-0.5">
                  Specialization: Artificial Intelligence & Machine Learning (AI & ML)
                </div>
                <div className="text-neutral-500 dark:text-rose-200/70 mt-0.5">
                  NIAT X Joy University
                </div>
              </div>
              <span className="text-red-500 font-mono">Enrolled Student</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
